import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { 
  ChevronLeft, 
  AlertTriangle, 
  MessageSquare, 
  Info, 
  ChevronDown, 
  Mic, 
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import TherapyChat from "@/components/therapy/therapy-chat"
import { VoiceChatProvider, useVoiceChat } from "@/components/therapy/voice-chat-context"

export function TherapySession() {
  const { sessionId } = useParams<{ sessionId: string }>()
  const [showCrisisResources, setShowCrisisResources] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  
  // Determine if this is a new session or an existing one
  const isNewSession = sessionId === "new"
  const sessionNumber = isNewSession ? "New" : sessionId?.replace("session-", "") || ""

  return (
    <VoiceChatProvider>
      <TherapySessionInner 
        sessionId={sessionId} 
        isNewSession={isNewSession} 
        sessionNumber={sessionNumber} 
        showCrisisResources={showCrisisResources}
        setShowCrisisResources={setShowCrisisResources}
        showInfo={showInfo}
        setShowInfo={setShowInfo}
      />
    </VoiceChatProvider>
  )
}

function TherapySessionInner({
  sessionId,
  isNewSession,
  sessionNumber,
  showCrisisResources,
  setShowCrisisResources,
  showInfo,
  setShowInfo
}: {
  sessionId?: string
  isNewSession: boolean
  sessionNumber: string
  showCrisisResources: boolean
  setShowCrisisResources: (show: boolean) => void
  showInfo: boolean
  setShowInfo: (show: boolean) => void
}) {
  const { isVoiceModeActive, toggleVoiceMode } = useVoiceChat()
  
  return (
    <div className="container mx-auto flex h-[calc(100vh-80px)] flex-col px-0 lg:h-[calc(100vh-100px)] lg:flex-row lg:gap-6 lg:px-8">
      {/* Mobile header */}
      <div className="flex items-center justify-between border-b p-4 lg:hidden">
        <Link
          to="/therapy/sessions"
          className="flex items-center text-sm font-medium text-muted-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Sessions
        </Link>
        
        <div className="flex items-center gap-2">
          {isVoiceModeActive && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 rounded-full px-3 py-1 text-xs"
              onClick={toggleVoiceMode}
            >
              <Mic className="h-3 w-3" />
              <span>Voice On</span>
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCrisisResources(true)}
          >
            <AlertTriangle className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowInfo(true)}
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 overflow-hidden rounded-md border lg:border-0">
        <TherapyChat />
      </div>

      {/* Side panel - only visible on desktop */}
      <div className="hidden w-80 flex-col gap-6 lg:flex">
        <div className="flex flex-col gap-4">
          <Link
            to="/therapy/sessions"
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Sessions
          </Link>
          
          <div className="rounded-lg border p-4">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">AI Therapist</h2>
                <p className="text-sm text-muted-foreground">
                  Session {sessionNumber}
                </p>
              </div>
            </div>
            
            <div className="mb-4 flex flex-col gap-2">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{new Date().toLocaleDateString()}</span>
              </p>
              
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Duration: Unlimited</span>
              </p>
            </div>
            
            <div className="mb-4">
              <Button
                variant={isVoiceModeActive ? "default" : "outline"}
                size="sm"
                className="w-full"
                onClick={toggleVoiceMode}
              >
                <Mic className="mr-2 h-4 w-4" />
                {isVoiceModeActive ? "Turn Off Voice Mode" : "Turn On Voice Mode"}
              </Button>
            </div>
            
            <div className="mb-4">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setShowCrisisResources(true)}
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Crisis Resources
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="mb-3 font-medium">Therapeutic Approaches</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Cognitive Behavioral Therapy
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Dialectical Behavior Therapy
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Acceptance & Commitment Therapy
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Mindfulness-Based Approaches
            </li>
          </ul>
        </div>

        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-xs text-muted-foreground">
            <strong>Disclaimer:</strong> This app is not a replacement for professional mental health treatment. In case of emergency, please contact a crisis helpline or seek immediate medical attention.
          </p>
        </div>
      </div>

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
                <p className="mt-1 text-xs text-muted-foreground">Available 24/7</p>
              </div>
              
              <div className="rounded-lg border p-3">
                <h3 className="font-medium">Crisis Text Line</h3>
                <p className="text-sm text-muted-foreground">Text HOME to 741741</p>
                <p className="mt-1 text-xs text-muted-foreground">Available 24/7</p>
              </div>
              
              <div className="rounded-lg border p-3">
                <h3 className="font-medium">Emergency Services</h3>
                <p className="text-sm text-muted-foreground">Call 911</p>
                <p className="mt-1 text-xs text-muted-foreground">For immediate danger</p>
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
      
      {/* Session info modal (mobile only) */}
      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 lg:hidden">
          <div className="max-h-[90vh] w-[90vw] max-w-md overflow-y-auto rounded-lg bg-background p-6">
            <h2 className="mb-4 text-xl font-semibold">Session Information</h2>
            
            <div className="mb-4">
              <h3 className="mb-2 font-medium">About Your AI Therapist</h3>
              <p className="text-sm">
                Your AI therapist is designed to provide evidence-based mental health support through conversation. While not a replacement for human professionals, it offers a space for reflection and therapeutic dialogue.
              </p>
            </div>
            
            <div className="mb-4">
              <h3 className="mb-2 font-medium">Voice Mode</h3>
              <p className="text-sm">
                Voice mode allows you to speak directly with your AI therapist and have responses read aloud to you. Toggle this feature using the microphone button in the chat interface.
              </p>
            </div>
            
            <div className="mb-4">
              <h3 className="mb-2 font-medium">Therapeutic Approaches</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <ChevronDown className="h-3 w-3 text-primary" />
                  Cognitive Behavioral Therapy (CBT)
                </li>
                <li className="flex items-center gap-2">
                  <ChevronDown className="h-3 w-3 text-primary" />
                  Dialectical Behavior Therapy (DBT)
                </li>
                <li className="flex items-center gap-2">
                  <ChevronDown className="h-3 w-3 text-primary" />
                  Acceptance and Commitment Therapy (ACT)
                </li>
                <li className="flex items-center gap-2">
                  <ChevronDown className="h-3 w-3 text-primary" />
                  Mindfulness-Based Approaches
                </li>
              </ul>
            </div>
            
            <p className="text-xs text-muted-foreground">
              <strong>Disclaimer:</strong> This app is not a replacement for professional mental health treatment. In case of emergency, please contact a crisis helpline or seek immediate medical attention.
            </p>
            
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setShowInfo(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TherapySession