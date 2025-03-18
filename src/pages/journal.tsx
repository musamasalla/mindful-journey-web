import { useState } from "react"
import { Link } from "react-router-dom"
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Tag, 
  Edit2, 
  Trash2, 
  Book, 
  MessageSquare,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatDate, extractEmotionKeywords } from "@/lib/utils"

// Mock journal entries data
const mockEntries = [
  {
    id: "entry-1",
    title: "Processing therapy insights",
    content: "Today's therapy session was really insightful. We discussed how my anxiety about work deadlines might be connected to my perfectionism. I realized I've been setting unrealistic standards for myself, which has been making me feel constantly inadequate. My therapist suggested I try to recognize when I'm being too hard on myself and practice replacing critical thoughts with more compassionate ones. I'm going to try focusing on what I've accomplished each day rather than what I didn't get to.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    tags: ["therapy", "anxiety", "work", "insights"]
  },
  {
    id: "entry-2",
    title: "Difficult conversation with manager",
    content: "Had to talk with my manager today about feeling overwhelmed with my current workload. I was really nervous about it, but it went better than expected. She was understanding and we worked out a plan to redistribute some tasks. I'm still feeling a bit anxious about whether this will affect how she sees my capabilities, but also relieved to have spoken up. Using the assertiveness techniques from therapy helped - I stated my needs clearly without apologizing unnecessarily.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    tags: ["work", "communication", "anxiety", "boundaries"]
  },
  {
    id: "entry-3",
    title: "Progress with mindfulness practice",
    content: "I've been trying the 5-minute mindfulness meditation each morning for a week now. At first it was really hard to focus, but it's getting a little easier to bring my attention back when it wanders. Today I noticed I felt calmer during my morning commute, which is usually when I start worrying about the day ahead. I'm proud of sticking with this practice even though it's challenging. The breathing technique from the therapy app has been particularly helpful when I notice my chest tightening with stress.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // Yesterday
    tags: ["mindfulness", "progress", "meditation", "proud"]
  },
]

const JournalPage = () => {
  const [entries, setEntries] = useState(mockEntries)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedEntries, setExpandedEntries] = useState<Record<string, boolean>>({})
  
  // Filter entries based on search query
  const filteredEntries = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const toggleExpanded = (id: string) => {
    setExpandedEntries(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <div className="container mx-auto px-4 py-6 lg:px-8">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Therapy Journal</h1>
          <p className="text-muted-foreground">
            Record your thoughts, feelings, and insights from therapy
          </p>
        </div>
        <Link to="/journal/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </Link>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search entries by title, content or tag..."
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

      {filteredEntries.length > 0 ? (
        <div className="space-y-4">
          {filteredEntries
            .sort((a, b) => b.date.getTime() - a.date.getTime()) // Sort newest first
            .map((entry) => {
              const isExpanded = expandedEntries[entry.id] || false
              const emotions = extractEmotionKeywords(entry.content)
              
              return (
                <div key={entry.id} className="rounded-lg border bg-card p-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-lg font-semibold">{entry.title}</h2>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(entry.date)}</span>
                    </div>
                    
                    {emotions.length > 0 && (
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>Emotions: {emotions.join(", ")}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                      >
                        <Tag className="h-3 w-3" />
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <p className={`text-sm ${isExpanded ? '' : 'line-clamp-3'}`}>
                      {entry.content}
                    </p>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2 h-8 px-2 text-xs font-medium text-muted-foreground"
                      onClick={() => toggleExpanded(entry.id)}
                    >
                      {isExpanded ? "Show less" : "Read more"}
                      <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </Button>
                  </div>
                  
                  {isExpanded && (
                    <div className="mt-4 rounded-md bg-muted/20 p-3">
                      <h3 className="flex items-center gap-2 text-sm font-medium">
                        <MessageSquare className="h-4 w-4 text-primary" />
                        AI Therapist Reflection
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {entry.id === "entry-1" && (
                          "Great insight about the connection between perfectionism and anxiety. Recognizing unrealistic standards is an important step. Try the self-compassion exercises we discussed when you notice self-criticism. What small achievement can you celebrate today?"
                        )}
                        {entry.id === "entry-2" && (
                          "You demonstrated excellent boundary-setting and assertiveness! It's normal to worry about others' perceptions after setting boundaries. Remember that healthy workplace relationships involve open communication about capacity. Notice how the relief you felt confirms you made the right choice."
                        )}
                        {entry.id === "entry-3" && (
                          "Wonderful progress with your mindfulness practice! Consistency is more important than perfection with meditation. The fact that you're noticing real-world benefits during your commute is significant - these tangible results will help reinforce your practice. Consider journaling about other subtle changes you notice throughout your day."
                        )}
                      </p>
                    </div>
                  )}
                </div>
              )
            })
          }
        </div>
      ) : (
        <div className="flex h-64 flex-col items-center justify-center rounded-lg border bg-card p-8 text-center">
          <div className="rounded-full bg-primary/10 p-3">
            <Book className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mt-4 text-lg font-medium">No journal entries found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {searchQuery
              ? `No entries matching "${searchQuery}"`
              : "Start your therapeutic journey by creating your first journal entry"}
          </p>
          <Link to="/journal/new" className="mt-4">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Entry
            </Button>
          </Link>
        </div>
      )}
      
      {/* Tips section */}
      <div className="mt-8 rounded-lg border bg-muted/20 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Book className="h-5 w-5 text-primary" />
          Journaling Tips from Your AI Therapist
        </h2>
        <ul className="mt-4 space-y-3 text-sm">
          <li className="flex gap-2">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">1</div>
            <p><strong>Write freely without judgment:</strong> Let your thoughts flow without worrying about grammar, spelling, or how it sounds.</p>
          </li>
          <li className="flex gap-2">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">2</div>
            <p><strong>Use feeling words:</strong> Practice naming your emotions specifically (frustrated, relieved, hopeful) rather than general terms (good, bad).</p>
          </li>
          <li className="flex gap-2">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">3</div>
            <p><strong>Connect feelings to events:</strong> Note what happened before you felt a certain way to identify patterns and triggers.</p>
          </li>
          <li className="flex gap-2">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">4</div>
            <p><strong>Review previous entries:</strong> Look back periodically to observe patterns and track your progress in therapy.</p>
          </li>
          <li className="flex gap-2">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">5</div>
            <p><strong>Try therapy prompts:</strong> When stuck, use prompts like "Today I noticed...", "I'm worried about...", or "One thing I'm grateful for..."</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default JournalPage