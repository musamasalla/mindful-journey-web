import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const NotFound = () => {
  return (
    <div className="container flex min-h-[85vh] flex-col items-center justify-center px-4 py-12 md:px-6">
      <motion.div
        className="mb-8 rounded-full bg-primary/10 p-6 text-primary"
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-12 w-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
      </motion.div>
      <h1 className="mb-2 text-center text-4xl font-bold tracking-tight md:text-5xl">404</h1>
      <h2 className="mb-6 text-center text-3xl font-semibold md:text-4xl">Page Not Found</h2>
      <p className="mb-8 max-w-[600px] text-center text-muted-foreground">
        We couldn't find the page you're looking for. The page may have been moved, deleted, or never
        existed. Let's get you back on track.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Link to="/">
          <Button variant="calm" size="lg">
            Go Home
          </Button>
        </Link>
        <Link to="/resources">
          <Button variant="outline" size="lg">
            View Resources
          </Button>
        </Link>
      </div>
      
      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>Need assistance? Contact our support team at</p>
        <p className="mt-1 font-medium text-primary">support@mindfuljourney.com</p>
      </div>
    </div>
  )
}

export default NotFound