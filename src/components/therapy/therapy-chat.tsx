import { useState, useRef, useEffect } from "react"
import { Send, Loader2, Bot, User, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { formatTime } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

// Types for therapy chat
type MessageRole = "system" | "user" | "assistant"

interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
}

interface TherapyChatProps {
  sessionId?: string
  initialSystemMessage?: string
}

// Helper function to generate IDs
const generateId = () => Math.random().toString(36).substring(2, 10)

// Sample initial system message for the AI therapist
const DEFAULT_SYSTEM_MESSAGE = 
  "I am a compassionate AI therapist trained in CBT, DBT, and other evidence-based " +
  "therapeutic approaches. I provide supportive, non-judgmental guidance to help you " +
  "navigate your challenges and develop healthy coping skills. I'll respect your boundaries " +
  "and work at your pace. Remember, I'm here to support your journey to better mental health."

const TherapyChat = ({ 
  sessionId = "new-session", 
  initialSystemMessage = DEFAULT_SYSTEM_MESSAGE 
}: TherapyChatProps) => {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFirstMessage, setIsFirstMessage] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Initialize chat with system message
  useEffect(() => {
    // In a real app, we would fetch previous messages from Supabase here if sessionId exists
    if (isFirstMessage) {
      setMessages([
        {
          id: generateId(),
          role: "system",
          content: initialSystemMessage,
          timestamp: new Date(),
        },
        {
          id: generateId(),
          role: "assistant",
          content: "Hello, I'm your AI therapist. How are you feeling today? Feel free to share what's on your mind, and we can explore it together.",
          timestamp: new Date(),
        },
      ])
      setIsFirstMessage(false)
    }
  }, [initialSystemMessage, isFirstMessage, sessionId])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Send message to AI therapist
  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to OpenAI or a Supabase function
      // For this demo, we'll simulate a response after a delay
      setTimeout(() => {
        const aiResponses = [
          "I understand that must be difficult for you. How long have you been feeling this way?",
          "Thank you for sharing that with me. Could you tell me more about when you first noticed these feelings?",
          "That sounds challenging. What strategies have you tried so far to cope with this situation?",
          "I hear that you're going through a lot right now. Let's explore some ways to help you manage these emotions.",
          "It takes courage to share these feelings. Have you noticed any patterns or triggers that seem to make these feelings stronger?",
          "I'm here to support you through this. What would be most helpful for you to focus on in our conversation today?"
        ]
        
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
        
        const assistantMessage: Message = {
          id: generateId(),
          role: "assistant",
          content: randomResponse,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])
        setIsLoading(false)
      }, 1500)
      
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  // Handle submit with Enter key (Shift+Enter for new line)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex h-full flex-col rounded-lg border bg-background">
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-1">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <span className="font-medium">AI Therapist</span>
        </div>
        <Button variant="ghost" size="icon" title="Session Information">
          <Info className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {messages
              .filter((message) => message.role !== "system")
              .map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <div className="mb-1 flex items-center gap-2">
                      {message.role === "assistant" ? (
                        <Bot className="h-3 w-3" />
                      ) : (
                        <User className="h-3 w-3" />
                      )}
                      <span className="text-xs font-medium">
                        {message.role === "assistant" ? "AI Therapist" : "You"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">AI Therapist is typing...</span>
            </motion.div>
          )}
          
          {/* Invisible element for auto-scrolling */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="min-h-[60px] resize-none"
            disabled={isLoading}
          />
          <Button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="self-end"
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Press Enter to send, Shift+Enter for a new line
        </p>
      </div>
    </div>
  )
}

export default TherapyChat