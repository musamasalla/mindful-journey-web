import { useState } from "react"
import { Link } from "react-router-dom"
import { Plus, Calendar, Search, MessageSquare, ArrowUpRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatDate } from "@/lib/utils"

// Sample session data (would come from Supabase in a real app)
const mockSessions = [
  {
    id: "session-1",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    title: "Initial Assessment",
    messageCount: 24,
    summary: "First session exploring current challenges and setting therapy goals",
    topics: ["anxiety", "work stress", "relationships"],
  },
  {
    id: "session-2",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    title: "CBT Techniques",
    messageCount: 32,
    summary: "Exploring cognitive distortions and introducing thought challenging techniques",
    topics: ["cognitive restructuring", "thought patterns", "cbt"],
  },
  {
    id: "session-3",
    date: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    title: "Stress Management",
    messageCount: 18,
    summary: "Practicing mindfulness and breathing techniques for anxiety management",
    topics: ["mindfulness", "anxiety", "breathing techniques"],
  },
]

const TherapySessions = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [sessions, setSessions] = useState(mockSessions)

  // Filter sessions based on search query
  const filteredSessions = sessions.filter(
    (session) =>
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.topics.some((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="container mx-auto px-4 py-6 lg:px-8">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Therapy Sessions</h1>
          <p className="text-muted-foreground">
            Review past sessions or start a new one with your AI therapist
          </p>
        </div>
        <Link to="/therapy/session/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Session
          </Button>
        </Link>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search sessions by title, summary or topic..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </div>

      {filteredSessions.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSessions.map((session) => (
            <Link
              to={`/therapy/session/${session.id}`}
              key={session.id}
              className="group rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow"
            >
              <div className="flex justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(session.date)}</span>
                </div>
                <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <h2 className="mt-2 font-semibold">{session.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{session.summary}</p>
              
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>{session.messageCount} messages</span>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {session.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex h-64 flex-col items-center justify-center rounded-lg border bg-card p-8 text-center">
          <div className="rounded-full bg-primary/10 p-3">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mt-4 text-lg font-medium">No sessions found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {searchQuery
              ? `No therapy sessions matching "${searchQuery}"`
              : "You haven't had any therapy sessions yet"}
          </p>
          <Link to="/therapy/session/new" className="mt-4">
            <Button>Start Your First Session</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default TherapySessions