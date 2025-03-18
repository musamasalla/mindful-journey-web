import { useState, useRef, useEffect } from "react"
import { Mic, MicOff, Send, StopCircle, Play, Keyboard, ChevronDown, AlertTriangle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { VoiceChatProvider, useVoiceChat } from "./voice-chat-context"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

export function TherapyChat() {
  // Wrap component with voice chat provider
  return (
    <VoiceChatProvider>
      <TherapyChatInner />
    </VoiceChatProvider>
  )
}

function TherapyChatInner() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [showCrisisResources, setShowCrisisResources] = useState(false)
  const [showSessionInfo, setShowSessionInfo] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Voice chat context
  const {
    isVoiceModeActive,
    toggleVoiceMode,
    state,
    transcript,
    startListening,
    stopListening,
    speakText,
    stopSpeaking,
    isPermissionGranted,
    error
  } = useVoiceChat()

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Initialize with system message
  useEffect(() => {
    const initialMessage = {
      id: "system-1",
      content: "Hello, I'm your AI therapist. I'm here to provide a safe space for you to discuss your thoughts, feelings, and challenges. How are you feeling today?",
      isUser: false,
      timestamp: new Date(),
    }
    setMessages([initialMessage])
  }, [])
  
  // Auto-read the latest AI message when in voice mode
  useEffect(() => {
    if (isVoiceModeActive && messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (!lastMessage.isUser) {
        speakText(lastMessage.content)
      }
    }
  }, [isVoiceModeActive, messages, speakText])

  const handleSendMessage = () => {
    if (input.trim() === "") return

    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      content: input,
      isUser: true,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = generateResponse(input)
      const aiMessage = {
        id: `ai-${Date.now()}`,
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      
      // If voice mode is active, read the response aloud
      if (isVoiceModeActive) {
        speakText(aiResponse)
      }
    }, 1000)
  }
  
  const handleSendVoiceMessage = () => {
    if (transcript.trim() === "") return
    
    // Add user message from transcript
    const userMessage = {
      id: `user-${Date.now()}`,
      content: transcript,
      isUser: true,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = generateResponse(transcript)
      const aiMessage = {
        id: `ai-${Date.now()}`,
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      
      // If voice mode is active, read the response aloud
      if (isVoiceModeActive) {
        speakText(aiResponse)
      }
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  
  const handleVoiceAction = () => {
    switch (state) {
      case "idle":
        startListening()
        break
      case "listening":
        stopListening()
        break
      case "speaking":
        stopSpeaking()
        break
      case "processing":
        // Do nothing while processing
        break
    }
  }
  
  const handleMessageClick = (message: Message) => {
    // Only read AI messages aloud when clicked in voice mode
    if (isVoiceModeActive && !message.isUser) {
      speakText(message.content)
    }
  }
  
  const getVoiceButtonIcon = () => {
    switch (state) {
      case "idle":
        return <Mic className="h-5 w-5" />
      case "listening":
        return <MicOff className="h-5 w-5" />
      case "processing":
        return <ChevronDown className="h-5 w-5" />
      case "speaking":
        return <StopCircle className="h-5 w-5" />
    }
  }

  // Simple response generator for demo purposes
  // In a real app, this would call an API
  const generateResponse = (userMessage: string) => {
    const lowercasedMessage = userMessage.toLowerCase()
    
    // Check for anxiety-related keywords
    if (lowercasedMessage.includes("anxious") || lowercasedMessage.includes("anxiety") || lowercasedMessage.includes("worried") || lowercasedMessage.includes("stress")) {
      return "It sounds like you're experiencing some anxiety. This is very common and there are effective ways to manage it. Can you tell me more about what situations trigger these feelings for you? And how does the anxiety manifest - physically, emotionally, or in your thoughts? Some people find deep breathing helpful in the moment. Would you like to try a quick breathing exercise together?"
    }
    
    // Check for depression-related keywords
    if (lowercasedMessage.includes("sad") || lowercasedMessage.includes("depressed") || lowercasedMessage.includes("depression") || lowercasedMessage.includes("hopeless") || lowercasedMessage.includes("unmotivated")) {
      return "I'm hearing that you're experiencing some feelings of sadness or low mood. Thank you for sharing that with me. How long have you been feeling this way? Have there been any changes in your life recently that might be contributing to these feelings? Remember that experiencing periods of sadness is part of being human, but if these feelings are persistent or interfering with your daily life, it might be helpful to discuss them with a healthcare provider."
    }
    
    // Check for sleep-related issues
    if (lowercasedMessage.includes("sleep") || lowercasedMessage.includes("insomnia") || lowercasedMessage.includes("tired") || lowercasedMessage.includes("exhausted")) {
      return "Sleep difficulties can have a significant impact on our mental health and overall wellbeing. What has your sleep pattern been like recently? Are you having trouble falling asleep, staying asleep, or waking up too early? Many people find that establishing a regular sleep routine and practicing good sleep hygiene can be helpful. Would you like to discuss some strategies that might improve your sleep quality?"
    }
    
    // Check for relationship issues
    if (lowercasedMessage.includes("relationship") || lowercasedMessage.includes("partner") || lowercasedMessage.includes("spouse") || lowercasedMessage.includes("boyfriend") || lowercasedMessage.includes("girlfriend") || lowercasedMessage.includes("marriage")) {
      return "Relationships can bring great joy but also present challenges at times. Could you share more about what you're experiencing in this relationship? What aspects have been difficult for you? Understanding our patterns of communication and attachment can often help us navigate relationship difficulties. How do you typically express your needs and feelings in this relationship?"
    }
    
    // Check for work-related stress
    if (lowercasedMessage.includes("work") || lowercasedMessage.includes("job") || lowercasedMessage.includes("career") || lowercasedMessage.includes("boss") || lowercasedMessage.includes("colleague")) {
      return "Work-related stress is something many people experience. Finding a healthy work-life balance can be challenging. What aspects of your work situation are most stressful for you? And how has this been affecting other areas of your life? Setting boundaries and practicing self-care are important when dealing with workplace stress. Would you like to explore some strategies that might help you manage this better?"
    }
    
    // Check for positive emotions
    if (lowercasedMessage.includes("happy") || lowercasedMessage.includes("good") || lowercasedMessage.includes("great") || lowercasedMessage.includes("wonderful") || lowercasedMessage.includes("better")) {
      return "I'm glad to hear there are positive aspects to how you're feeling. It's important to acknowledge and celebrate these moments. What do you think has contributed to these positive feelings? Identifying the activities, people, or circumstances that enhance our wellbeing can help us intentionally incorporate more of them into our lives. Would you like to explore ways to build on these positive experiences?"
    }
    
    // Check for greeting
    if (lowercasedMessage.includes("hello") || lowercasedMessage.includes("hi") || lowercasedMessage.includes("hey") || userMessage.length < 10) {
      return "Hello! I'm here to support you in your mental health journey. How can I help you today? We could talk about your current emotions, challenges you're facing, or specific areas of your life you'd like to work on. What's been on your mind recently?"
    }
    
    // Default response for other messages
    return "Thank you for sharing that with me. I appreciate your openness. Could you tell me more about how these experiences have been affecting you emotionally? Understanding the connection between our thoughts, feelings, and behaviors is often a helpful step in addressing our challenges. What would you like to focus on in our conversation today?"
  }

  return (
    <div className="flex h-full flex-col">
      {/* Chat header */}
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-primary/10 p-1">
            <div className="h-8 w-8 rounded-full bg-primary text-center text-lg font-semibold text-primary-foreground flex items-center justify-center">
              AI
            </div>
          </div>
          <div>
            <h3 className="font-semibold">AI Therapist</h3>
            <p className="text-xs text-muted-foreground">Here to support your mental wellbeing</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSessionInfo(true)}
          >
            <Info className="h-4 w-4" />
            <span className="ml-2 hidden sm:inline">Info</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCrisisResources(true)}
          >
            <AlertTriangle className="h-4 w-4" />
            <span className="ml-2 hidden sm:inline">Crisis Resources</span>
          </Button>
        </div>
      </div>
      
      {/* Voice mode indicator */}
      {isVoiceModeActive && (
        <div className="bg-blue-50 px-4 py-2 text-sm flex items-center justify-between">
          <div className="flex items-center">
            <Mic className="h-4 w-4 mr-2 text-blue-600" />
            <span className="text-blue-600 font-medium">Voice Mode Active</span>
          </div>
          
          {state === "listening" && (
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-red-500 mr-2 animate-pulse" />
              <span className="text-muted-foreground text-xs">Listening...</span>
            </div>
          )}
          
          {state === "speaking" && (
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse" />
              <span className="text-muted-foreground text-xs">Speaking...</span>
            </div>
          )}
        </div>
      )}
      
      {/* Permission error */}
      {error && isVoiceModeActive && (
        <div className="bg-red-50 px-4 py-2 text-sm text-red-600">
          <AlertTriangle className="h-4 w-4 inline mr-2" />
          {error}
        </div>
      )}

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex w-max max-w-[80%] flex-col rounded-lg px-4 py-2",
                message.isUser
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
              onClick={() => handleMessageClick(message)}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <span className="mt-1 text-right text-xs opacity-50">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>
      
      {/* Voice transcript (when listening) */}
      {isVoiceModeActive && state === "listening" && transcript && (
        <div className="border-t bg-muted/30 px-4 py-2">
          <p className="text-sm text-muted-foreground">{transcript}</p>
        </div>
      )}

      {/* Chat input */}
      <div className="border-t p-4">
        <div className="flex space-x-2">
          {/* Text input (when not in voice mode) */}
          {!isVoiceModeActive && (
            <>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="min-h-[80px] flex-1 resize-none"
              />
              <div className="flex flex-col space-y-2">
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  className="h-10 w-10 rounded-full p-0"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
                <Button
                  onClick={toggleVoiceMode}
                  variant="outline"
                  className="h-10 w-10 rounded-full p-0"
                  title="Switch to voice mode"
                >
                  <Mic className="h-4 w-4" />
                  <span className="sr-only">Voice Mode</span>
                </Button>
              </div>
            </>
          )}
          
          {/* Voice controls (when in voice mode) */}
          {isVoiceModeActive && (
            <>
              <Button
                onClick={handleVoiceAction}
                variant={state === "listening" ? "destructive" : "default"}
                className="h-12 w-12 rounded-full p-0"
                disabled={!isPermissionGranted}
              >
                {getVoiceButtonIcon()}
                <span className="sr-only">
                  {state === "idle" ? "Start Recording" : 
                   state === "listening" ? "Stop Recording" : 
                   state === "speaking" ? "Stop Speaking" : "Processing"}
                </span>
              </Button>
              
              <Button
                onClick={handleSendVoiceMessage}
                disabled={!transcript.trim()}
                className="flex-1"
              >
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
              
              <Button
                onClick={toggleVoiceMode}
                variant="outline"
                className="h-12 w-12 rounded-full p-0"
                title="Switch to text mode"
              >
                <Keyboard className="h-4 w-4" />
                <span className="sr-only">Text Mode</span>
              </Button>
            </>
          )}
        </div>
        
        {/* Voice mode instructions */}
        {isVoiceModeActive && (
          <p className="mt-2 text-center text-xs text-muted-foreground">
            {state === "idle" ? "Tap the microphone to start speaking" : 
             state === "listening" ? "Tap the microphone to stop recording" :
             state === "speaking" ? "Tap the stop button to stop playback" :
             "Processing your speech..."}
          </p>
        )}
      </div>
      
      {/* Session info modal */}
      {showSessionInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-[90vw] max-w-md overflow-y-auto rounded-lg bg-background p-6">
            <h2 className="mb-4 text-xl font-semibold">About Your AI Therapist</h2>
            <p className="mb-4">
              Your AI therapist is designed to provide evidence-based mental health support and a space for reflection and growth.
            </p>
            
            <h3 className="mb-2 font-medium">Therapeutic Approaches</h3>
            <ul className="mb-4 space-y-1">
              <li className="flex items-center">
                <span className="text-primary mr-2">•</span> Cognitive Behavioral Therapy (CBT)
              </li>
              <li className="flex items-center">
                <span className="text-primary mr-2">•</span> Dialectical Behavior Therapy (DBT)
              </li>
              <li className="flex items-center">
                <span className="text-primary mr-2">•</span> Acceptance and Commitment Therapy (ACT)
              </li>
              <li className="flex items-center">
                <span className="text-primary mr-2">•</span> Mindfulness-Based Approaches
              </li>
            </ul>
            
            <h3 className="mb-2 font-medium">Voice Mode Instructions</h3>
            <p className="mb-4">
              Use the microphone button to toggle voice mode. In voice mode, you can speak directly to your therapist and have their responses read aloud. You can also tap on any message to have it read to you.
            </p>
            
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setShowSessionInfo(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Crisis resources modal */}
      {showCrisisResources && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-[90vw] max-w-md overflow-y-auto rounded-lg bg-background p-6">
            <h2 className="mb-4 text-xl font-semibold">Crisis Resources</h2>
            <p className="mb-4">
              If you're experiencing a mental health crisis or having thoughts of harming yourself, please use these resources to get immediate help:
            </p>
            
            <div className="mb-4 space-y-3">
              <div className="rounded-lg border p-3">
                <h3 className="font-medium">988 Suicide & Crisis Lifeline</h3>
                <p className="text-sm text-muted-foreground">Call or text 988</p>
              </div>
              
              <div className="rounded-lg border p-3">
                <h3 className="font-medium">Crisis Text Line</h3>
                <p className="text-sm text-muted-foreground">Text HOME to 741741</p>
              </div>
              
              <div className="rounded-lg border p-3">
                <h3 className="font-medium">Emergency Services</h3>
                <p className="text-sm text-muted-foreground">Call 911</p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              This AI therapist is not a replacement for professional mental health treatment. In case of emergency, please seek immediate help.
            </p>
            
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setShowCrisisResources(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TherapyChat