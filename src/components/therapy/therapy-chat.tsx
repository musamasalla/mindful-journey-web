import { useEffect, useRef, useState } from "react"
import { Send, Mic, MicOff, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useVoiceChat } from "@/components/therapy/voice-chat-context"
import { useParams } from "react-router-dom"
import { supabase, saveSessionMessage, getSessionMessages } from "@/lib/supabase"
import { getCurrentUser } from "@/lib/supabase"

// Message types
type MessageRole = "system" | "user" | "assistant"

interface Message {
  id?: string
  role: MessageRole
  content: string
  created_at?: string
  is_voice?: boolean
}

export default function TherapyChat() {
  const { sessionId } = useParams<{ sessionId: string }>()
  const [userId, setUserId] = useState<string | null>(null)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const { 
    isVoiceModeActive, 
    toggleVoiceMode, 
    isListening, 
    startListening, 
    stopListening, 
    transcript, 
    speak 
  } = useVoiceChat()

  // Initialize chat with system message
  useEffect(() => {
    const systemMessage: Message = {
      role: "system",
      content: "I'm your AI therapist, here to provide support and guidance. What's on your mind today?",
    }
    setMessages([systemMessage])
    
    // Load user information
    const loadUser = async () => {
      const user = await getCurrentUser()
      if (user) {
        setUserId(user.id)
      }
    }
    
    loadUser()
    
    // Load existing messages if it's an existing session
    if (sessionId && sessionId !== "new") {
      loadSessionMessages()
    }
  }, [sessionId])
  
  // Load existing messages from Supabase
  const loadSessionMessages = async () => {
    if (!sessionId || sessionId === "new") return
    
    try {
      const { data, error } = await getSessionMessages(sessionId)
      
      if (error) {
        console.error("Error loading messages:", error)
        return
      }
      
      if (data && data.length > 0) {
        const formattedMessages: Message[] = data.map(msg => ({
          id: msg.id,
          role: msg.role as MessageRole,
          content: msg.content,
          created_at: msg.created_at,
          is_voice: msg.is_voice
        }))
        
        setMessages(formattedMessages)
      }
    } catch (error) {
      console.error("Error fetching messages:", error)
    }
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  // Update input when transcript changes
  useEffect(() => {
    if (transcript) {
      setInput(transcript)
    }
  }, [transcript])

  // Handle sending messages
  const sendMessage = async () => {
    if (!input.trim() || isSubmitting) return
    
    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      is_voice: isVoiceModeActive,
    }
    
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsSubmitting(true)
    
    try {
      // Save user message to Supabase if it's an existing session
      if (sessionId && sessionId !== "new" && userId) {
        await saveSessionMessage(sessionId, {
          role: "user",
          content: userMessage.content,
          is_voice: isVoiceModeActive,
        })
      }
      
      // Process with OpenAI (this is a placeholder for actual API integration)
      const response = await processWithOpenAI(userMessage.content)
      
      const assistantMessage: Message = {
        role: "assistant",
        content: response,
      }
      
      setMessages((prev) => [...prev, assistantMessage])
      
      // Save assistant message to Supabase if it's an existing session
      if (sessionId && sessionId !== "new" && userId) {
        await saveSessionMessage(sessionId, {
          role: "assistant",
          content: assistantMessage.content,
          is_voice: false,
        })
      }
      
      // Speak the response if voice mode is active
      if (isVoiceModeActive) {
        speak(response)
      }
    } catch (error) {
      console.error("Error processing message:", error)
      
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error processing your message. Please try again.",
        },
      ])
    } finally {
      setIsSubmitting(false)
    }
  }

  // Placeholder for OpenAI API integration
  const processWithOpenAI = async (content: string): Promise<string> => {
    // This is a placeholder for the actual API call
    // In a real implementation, you would call the OpenAI API here
    
    // For now, we'll simulate a response with a 1.5 second delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate a simple response based on keywords
        let response = ""
        
        const lowerContent = content.toLowerCase()
        
        if (lowerContent.includes("anxious") || lowerContent.includes("anxiety") || lowerContent.includes("worried")) {
          response = "It sounds like you're experiencing anxiety. This is a common emotion that many people face. Let's explore what triggers these feelings for you. Have you noticed any patterns or specific situations that tend to increase your anxiety? Sometimes, practicing deep breathing or grounding techniques can help in the moment. Would you like to try a brief breathing exercise together?"
        } 
        else if (lowerContent.includes("depress") || lowerContent.includes("sad") || lowerContent.includes("hopeless")) {
          response = "I'm hearing that you're feeling low right now. Depression can make everything feel more difficult and draining. Remember that your feelings are valid, and it's okay to not be okay sometimes. Can you tell me more about what you've been experiencing lately? Are there any small activities that have brought you even a tiny bit of relief or joy recently?"
        }
        else if (lowerContent.includes("sleep") || lowerContent.includes("tired") || lowerContent.includes("insomnia")) {
          response = "Sleep difficulties can significantly impact your mental health and daily functioning. Have you noticed any changes in your sleep patterns recently? Sometimes establishing a calming bedtime routine can help signal to your body that it's time to rest. This might include reducing screen time, gentle stretching, or practicing relaxation techniques before bed. Would you like to discuss specific strategies that might help improve your sleep quality?"
        }
        else if (lowerContent.includes("relationship") || lowerContent.includes("partner") || lowerContent.includes("family") || lowerContent.includes("friend")) {
          response = "Relationships can bring both joy and challenges into our lives. It sounds like you're navigating some relationship dynamics right now. Can you tell me more about the specific situation? Understanding your needs and boundaries in relationships is important, as is effective communication. Would it help to explore some communication strategies that might be helpful in this situation?"
        }
        else if (lowerContent.includes("work") || lowerContent.includes("stress") || lowerContent.includes("overwhelm")) {
          response = "It sounds like you're experiencing stress related to your work or responsibilities. Many people struggle with finding balance and managing the pressures of their daily obligations. Let's think about what aspects feel most overwhelming right now. Are there any small steps you could take to create more structure or boundaries? Sometimes even brief moments of mindfulness throughout the day can help reduce stress levels."
        }
        else if (lowerContent.includes("happy") || lowerContent.includes("good") || lowerContent.includes("better") || lowerContent.includes("grateful")) {
          response = "I'm so glad to hear you're experiencing positive emotions! Recognizing and savoring these good moments is actually a powerful practice for building resilience. What do you think contributed to these positive feelings? Identifying these factors can help you intentionally incorporate more of them into your routine. Would you like to explore ways to build on this positive momentum?"
        }
        else {
          response = "Thank you for sharing that with me. I appreciate your openness. Can you tell me more about how this has been affecting you? Understanding your experiences better will help us explore useful strategies or perspectives together."
        }
        
        resolve(response)
      }, 1500)
    })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage()
  }

  // Handle key press for sending message with Enter and adding new line with Shift+Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Handle voice button click
  const handleVoiceButtonClick = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  // Clear transcript 
  const clearTranscript = () => {
    setInput("")
  }

  return (
    <div className="flex h-full flex-col">
      {/* Chat messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4"
      >
        {messages.map((message, index) => {
          // Skip rendering the system message
          if (message.role === "system" && index === 0) return null

          return (
            <div
              key={index}
              className={`mb-4 ${
                message.role === "assistant" ? "flex justify-start" : "flex justify-end"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === "assistant"
                    ? "bg-muted text-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          )
        })}
        {isSubmitting && (
          <div className="mb-4 flex justify-start">
            <div className="max-w-[80%] rounded-lg bg-muted px-4 py-2 text-foreground">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 animate-pulse rounded-full bg-current"></div>
                <div className="h-2 w-2 animate-pulse rounded-full bg-current animation-delay-200"></div>
                <div className="h-2 w-2 animate-pulse rounded-full bg-current animation-delay-400"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Voice mode indicator */}
      {isVoiceModeActive && (
        <div className="border-t bg-muted/50 px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isListening ? (
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
                  <p className="text-sm">Listening...</p>
                </div>
              ) : (
                <p className="text-sm">Click the microphone icon to speak</p>
              )}
            </div>
            {transcript && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={clearTranscript}
                className="h-6 w-6"
              >
                <RotateCcw className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Chat input */}
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="min-h-[60px] flex-1 resize-none"
            disabled={isSubmitting || (isVoiceModeActive && isListening)}
          />
          <div className="flex flex-col gap-2">
            {isVoiceModeActive && (
              <Button
                type="button"
                size="icon"
                variant={isListening ? "default" : "outline"}
                onClick={handleVoiceButtonClick}
                className="h-12 w-12 rounded-full"
                disabled={isSubmitting}
              >
                {isListening ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </Button>
            )}
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isSubmitting}
              className="h-12 w-12 rounded-full"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}