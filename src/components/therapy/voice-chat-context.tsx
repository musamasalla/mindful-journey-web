import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react"

// Voice chat state types
export type VoiceChatState = "idle" | "listening" | "processing" | "speaking"

interface VoiceChatContextType {
  isVoiceModeActive: boolean
  toggleVoiceMode: () => void
  state: VoiceChatState
  transcript: string
  startListening: () => void
  stopListening: () => void
  speakText: (text: string) => Promise<void>
  stopSpeaking: () => void
  isPermissionGranted: boolean
  error: string | null
}

const VoiceChatContext = createContext<VoiceChatContextType | undefined>(undefined)

export const useVoiceChat = () => {
  const context = useContext(VoiceChatContext)
  if (context === undefined) {
    throw new Error("useVoiceChat must be used within a VoiceChatProvider")
  }
  return context
}

export const VoiceChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVoiceModeActive, setIsVoiceModeActive] = useState(false)
  const [state, setState] = useState<VoiceChatState>("idle")
  const [transcript, setTranscript] = useState("")
  const [isPermissionGranted, setIsPermissionGranted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Refs
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null)
  
  // Check for browser support
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setError("Speech recognition is not supported in this browser.")
      setIsPermissionGranted(false)
      return
    }
    
    if (!("speechSynthesis" in window)) {
      setError("Speech synthesis is not supported in this browser.")
      return
    }
    
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    recognitionRef.current = new SpeechRecognition()
    
    if (recognitionRef.current) {
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = "en-US"
      
      recognitionRef.current.onstart = () => {
        setState("listening")
      }
      
      recognitionRef.current.onend = () => {
        if (state === "listening") {
          setState("idle")
        }
      }
      
      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex
        const transcript = event.results[current][0].transcript
        setTranscript(transcript)
      }
      
      recognitionRef.current.onerror = (event) => {
        if (event.error === "not-allowed") {
          setError("Microphone permission denied. Please enable microphone access.")
          setIsPermissionGranted(false)
        } else {
          setError(`Speech recognition error: ${event.error}`)
        }
        setState("idle")
      }
      
      // Check for permission
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          setIsPermissionGranted(true)
        })
        .catch(() => {
          setIsPermissionGranted(false)
          setError("Microphone permission denied. Please enable microphone access.")
        })
    }
    
    // Initialize speech synthesis
    speechSynthesisRef.current = new SpeechSynthesisUtterance()
    
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.onend = () => {
        setState("idle")
      }
      
      speechSynthesisRef.current.onerror = (event) => {
        setError(`Speech synthesis error: ${event.error}`)
        setState("idle")
      }
    }
    
    // Cleanup
    return () => {
      stopListening()
      stopSpeaking()
    }
  }, [])
  
  const toggleVoiceMode = useCallback(() => {
    stopListening()
    stopSpeaking()
    setIsVoiceModeActive(prev => !prev)
  }, [])
  
  const startListening = useCallback(() => {
    if (!isPermissionGranted || !recognitionRef.current) {
      setError("Speech recognition not available or permission denied.")
      return
    }
    
    try {
      setTranscript("")
      recognitionRef.current.start()
      setState("listening")
    } catch (err) {
      setError(`Could not start speech recognition: ${err}`)
    }
  }, [isPermissionGranted])
  
  const stopListening = useCallback(() => {
    if (recognitionRef.current && state === "listening") {
      try {
        recognitionRef.current.stop()
        setState("processing")
      } catch (err) {
        console.error("Error stopping recognition:", err)
      }
    }
  }, [state])
  
  const speakText = useCallback(async (text: string): Promise<void> => {
    if (!window.speechSynthesis || !speechSynthesisRef.current) {
      setError("Speech synthesis not available.")
      return Promise.reject(new Error("Speech synthesis not available."))
    }
    
    // Stop any ongoing speech
    stopSpeaking()
    
    return new Promise((resolve, reject) => {
      try {
        setState("speaking")
        
        // Find a female voice if available
        const voices = window.speechSynthesis.getVoices()
        const femaleVoice = voices.find(voice => 
          (voice.name.includes("female") || voice.name.includes("Female")) && 
          voice.lang.startsWith("en")
        )
        
        speechSynthesisRef.current!.voice = femaleVoice || null
        speechSynthesisRef.current!.text = text
        speechSynthesisRef.current!.rate = 0.9 // Slightly slower for therapy
        speechSynthesisRef.current!.pitch = 1.0
        
        speechSynthesisRef.current!.onend = () => {
          setState("idle")
          resolve()
        }
        
        speechSynthesisRef.current!.onerror = (event) => {
          setState("idle")
          setError(`Speech synthesis error: ${event.error}`)
          reject(new Error(`Speech synthesis error: ${event.error}`))
        }
        
        window.speechSynthesis.speak(speechSynthesisRef.current!)
      } catch (err) {
        setState("idle")
        setError(`Could not speak text: ${err}`)
        reject(err)
      }
    })
  }, [])
  
  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
      if (state === "speaking") {
        setState("idle")
      }
    }
  }, [state])
  
  const value = {
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
  }
  
  return (
    <VoiceChatContext.Provider value={value}>
      {children}
    </VoiceChatContext.Provider>
  )
}

// Add TypeScript interfaces for Web Speech API (may not be fully defined in all environments)
interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  abort: () => void
  onresult: (event: SpeechRecognitionEvent) => void
  onerror: (event: SpeechRecognitionErrorEvent) => void
  onend: () => void
  onstart: () => void
}

interface SpeechRecognitionErrorEvent {
  error: string
  message: string
}

interface SpeechRecognitionEvent {
  resultIndex: number
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string
        confidence: number
      }
    }
  }
}

// Extend window interface to include speech recognition
declare global {
  interface Window {
    SpeechRecognition?: typeof SpeechRecognition
    webkitSpeechRecognition?: typeof SpeechRecognition
  }
}

export default VoiceChatContext