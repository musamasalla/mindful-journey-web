import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Calendar, Clock, FileText, Brain, AlertCircle } from "lucide-react"
import TherapyChat from "@/components/therapy/therapy-chat"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { motion } from "framer-motion"

// Therapy approaches for information panel
const therapyApproaches = [
  { id: "cbt", name: "Cognitive Behavioral Therapy", icon: Brain },
  { id: "dbt", name: "Dialectical Behavior Therapy", icon: Brain },
  { id: "mindfulness", name: "Mindfulness-Based Approaches", icon: Brain },
  { id: "solution", name: "Solution-Focused Therapy", icon: Brain },
]

const TherapySession = () => {
  const { sessionId } = useParams<{ sessionId: string }>()
  const [showCrisisResources, setShowCrisisResources] = useState(false)
  
  // For a real app, we would fetch session details from Supabase here
  const sessionDate = new Date()
  const sessionNumber = sessionId === "new" ? 1 : Math.floor(Math.random() * 10) + 1

  return (
    <div className="container mx-auto px-4 py-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">
            {sessionId === "new" ? "New Therapy Session" : `Therapy Session #${sessionNumber}`}
          </h1>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(sessionDate)}</span>
          <Clock className="ml-2 h-4 w-4" />
          <span>{sessionDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main chat area */}
        <div className="lg:col-span-2">
          <TherapyChat sessionId={sessionId} />
          
          {/* Crisis resources - conditionally shown */}
          {showCrisisResources && (
            <motion.div 
              className="mt-4 rounded-lg border bg-red-50 p-4 dark:bg-red-950"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex items-center gap-2 text-red-800 dark:text-red-300">
                <AlertCircle className="h-5 w-5" />
                <h3 className="font-semibold">Crisis Resources</h3>
              </div>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="font-medium">National Suicide Prevention Lifeline:</span>
                  <span>988 or 1-800-273-8255</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Crisis Text Line:</span>
                  <span>Text HOME to 741741</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Emergency Services:</span>
                  <span>911</span>
                </li>
              </ul>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2" 
                onClick={() => setShowCrisisResources(false)}
              >
                Hide Resources
              </Button>
            </motion.div>
          )}
          
          {!showCrisisResources && (
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
              onClick={() => setShowCrisisResources(true)}
            >
              <AlertCircle className="mr-2 h-4 w-4" />
              Show Crisis Resources
            </Button>
          )}
        </div>

        {/* Side panel with session information */}
        <div className="space-y-6">
          {/* Session info card */}
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <h2 className="mb-4 font-semibold">Session Information</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">AI Therapist</h3>
                <p className="mt-1">MindfulJourney Therapeutic Assistant</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Session Number</h3>
                <p className="mt-1">#{sessionNumber}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Duration</h3>
                <p className="mt-1">Unlimited</p>
              </div>
            </div>
            
            <div className="mt-4 border-t pt-4">
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Save Session Notes
              </Button>
            </div>
          </div>
          
          {/* Therapeutic approaches card */}
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <h2 className="mb-4 font-semibold">Therapeutic Approaches</h2>
            <div className="space-y-3">
              {therapyApproaches.map((approach) => (
                <div key={approach.id} className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-1.5">
                    <approach.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">{approach.name}</span>
                </div>
              ))}
            </div>
            
            <p className="mt-4 text-xs text-muted-foreground">
              Our AI therapist is trained in multiple evidence-based therapeutic approaches
              to provide personalized support for your unique needs.
            </p>
          </div>
          
          {/* Disclaimer */}
          <div className="rounded-lg border bg-muted/50 p-4">
            <h3 className="text-sm font-medium">Important Disclaimer</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              MindfulJourney is designed to provide support but is not a replacement for
              professional mental health treatment. In case of emergency, please contact
              local emergency services or crisis hotlines.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TherapySession