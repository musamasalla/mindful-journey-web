import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Brain, CheckCircle2, Heart, Shield, Music, BookOpen } from "lucide-react"

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-calm-50 to-background py-20 dark:from-calm-950 dark:to-background md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-0 right-0 h-72 w-full md:h-96">
            <svg
              viewBox="0 0 1208 1024"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 h-full w-full opacity-10"
            >
              <g opacity="0.3">
                <circle cx="604" cy="512" r="400" stroke="currentColor" strokeWidth="2" />
                <circle cx="604" cy="512" r="300" stroke="currentColor" strokeWidth="2" />
                <circle cx="604" cy="512" r="200" stroke="currentColor" strokeWidth="2" />
                <circle cx="604" cy="512" r="100" stroke="currentColor" strokeWidth="2" />
              </g>
              <g opacity="0.3">
                <circle cx="604" cy="512" r="400" stroke="currentColor" strokeWidth="2" />
                <circle cx="604" cy="512" r="300" stroke="currentColor" strokeWidth="2" />
                <circle cx="604" cy="512" r="200" stroke="currentColor" strokeWidth="2" />
                <circle cx="604" cy="512" r="100" stroke="currentColor" strokeWidth="2" />
              </g>
            </svg>
          </div>
        </div>

        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                Your Journey to Mental Wellness
              </div>
            </motion.div>
            <motion.h1
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/tight"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              AI-Powered Mental Health Support{" "}
              <span className="text-primary">Personalized for You</span>
            </motion.h1>
            <motion.p
              className="max-w-[700px] text-muted-foreground md:text-xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Take control of your mental wellbeing with guided meditations, mood tracking, and
              personalized support, all in one place.
            </motion.p>
            <motion.div
              className="flex flex-col gap-2 min-[400px]:flex-row"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/auth/sign-up">
                <Button size="lg" variant="calm">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Features Designed for Your Mental Wellness
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Comprehensive tools to support your mental health journey every step of the way.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 transition-all hover:shadow-md">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Guided Meditations</h3>
              <p className="text-center text-muted-foreground">
                AI-generated meditations tailored to your specific emotional needs and situations.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 transition-all hover:shadow-md">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Mood Tracking</h3>
              <p className="text-center text-muted-foreground">
                Track your moods, identify patterns, and gain insights into your emotional wellbeing.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 transition-all hover:shadow-md">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Reflective Journal</h3>
              <p className="text-center text-muted-foreground">
                Express your thoughts with AI-guided prompts that encourage self-reflection and growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-calm-50 py-12 dark:bg-calm-950 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Benefits of MindfulJourney
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Our approach to mental wellness is evidence-based and focused on your needs.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 py-12 md:grid-cols-2">
            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-bold">Science-Backed Techniques</h3>
                <p className="text-muted-foreground">
                  All our mindfulness exercises and tools are based on established psychological practices.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-bold">Personalized to You</h3>
                <p className="text-muted-foreground">
                  AI tailors content to your specific needs, preferences, and mental health goals.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-bold">Privacy-Focused</h3>
                <p className="text-muted-foreground">
                  Your data is encrypted and secure. We prioritize your privacy and confidentiality.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-bold">Available Anytime</h3>
                <p className="text-muted-foreground">
                  Access support whenever you need it, whether it's day or night, at home or on-the-go.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Begin Your Mental Wellness Journey Today
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
              Join thousands of others who are taking control of their mental health with MindfulJourney.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/auth/sign-up">
                <Button size="lg" variant="calm">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/resources">
                <Button size="lg" variant="outline">
                  Browse Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home