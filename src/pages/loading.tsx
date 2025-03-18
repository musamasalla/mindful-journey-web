import { motion } from "framer-motion"
import { Brain } from "lucide-react"

const LoadingPage = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="mb-4 rounded-full bg-primary/10 p-4 text-primary"
      >
        <Brain className="h-8 w-8" />
      </motion.div>
      <h2 className="text-xl font-medium">Loading...</h2>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Taking a moment to gather your mindfulness resources
      </p>
    </div>
  )
}

export default LoadingPage