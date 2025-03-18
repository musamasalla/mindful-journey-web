import { Link } from "react-router-dom"
import { Brain, Heart } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <span className="text-xl font-bold text-primary">MindfulJourney</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Supporting your mental health and wellness journey with AI-powered tools and resources.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground transition-colors hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-muted-foreground transition-colors hover:text-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground transition-colors hover:text-primary">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/resources/crisis" className="text-muted-foreground transition-colors hover:text-primary">
                  Crisis Support
                </Link>
              </li>
              <li>
                <Link to="/resources/mental-health" className="text-muted-foreground transition-colors hover:text-primary">
                  Mental Health Info
                </Link>
              </li>
              <li>
                <Link to="/resources/therapy" className="text-muted-foreground transition-colors hover:text-primary">
                  Find Therapy
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground transition-colors hover:text-primary">
                  Wellness Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-muted-foreground transition-colors hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground transition-colors hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-muted-foreground transition-colors hover:text-primary">
                  Medical Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-muted-foreground transition-colors hover:text-primary">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {currentYear} MindfulJourney. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            Made with <Heart className="h-3 w-3 text-red-500" /> for mental wellness
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer