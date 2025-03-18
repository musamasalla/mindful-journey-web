import { useState, useEffect } from "react"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts"
import { Calendar, Clock, PlusCircle, Edit2, Trash2, BarChart3, TrendingUp, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"

// Mock data for emotional wellness entries
const initialEntries = [
  {
    id: "entry-1",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6), // 6 days ago
    moodScore: 3,
    anxietyLevel: 7,
    sleepQuality: 5,
    energyLevel: 4,
    notes: "Feeling quite anxious today. Work deadlines are piling up, and I'm having trouble focusing."
  },
  {
    id: "entry-2",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    moodScore: 4,
    anxietyLevel: 6,
    sleepQuality: 6,
    energyLevel: 5,
    notes: "Slightly better today. Practiced deep breathing when feeling overwhelmed."
  },
  {
    id: "entry-3",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
    moodScore: 5,
    anxietyLevel: 5,
    sleepQuality: 7,
    energyLevel: 6,
    notes: "Slept better last night which helped my overall mood. Still worried about work but managing better."
  },
  {
    id: "entry-4",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    moodScore: 6,
    anxietyLevel: 4,
    sleepQuality: 7,
    energyLevel: 7,
    notes: "Had a good therapy session today which helped put things in perspective."
  },
  {
    id: "entry-5",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    moodScore: 7,
    anxietyLevel: 4,
    sleepQuality: 8,
    energyLevel: 8,
    notes: "Feeling much more positive. Went for a walk which boosted my mood."
  },
  {
    id: "entry-6",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    moodScore: 6,
    anxietyLevel: 5,
    sleepQuality: 6,
    energyLevel: 6,
    notes: "A bit of a setback today but using techniques from therapy to cope."
  },
]

// Mapping for scoring labels
const moodLabels = {
  1: "Very Low",
  2: "Low",
  3: "Somewhat Low",
  4: "Neutral",
  5: "Somewhat Good",
  6: "Good",
  7: "Very Good",
  8: "Great",
  9: "Excellent", 
  10: "Perfect"
}

const anxietyLabels = {
  1: "None",
  2: "Minimal",
  3: "Mild",
  4: "Moderate",
  5: "Noticeable",
  6: "Significant",
  7: "High",
  8: "Very High",
  9: "Severe",
  10: "Extreme"
}

const sleepLabels = {
  1: "Terrible",
  2: "Very Poor",
  3: "Poor",
  4: "Inadequate",
  5: "Fair",
  6: "Adequate",
  7: "Good",
  8: "Very Good",
  9: "Excellent",
  10: "Perfect"
}

const energyLabels = {
  1: "Exhausted",
  2: "Very Low",
  3: "Low",
  4: "Somewhat Low",
  5: "Moderate",
  6: "Somewhat High",
  7: "Good",
  8: "Energetic",
  9: "Very Energetic",
  10: "Extremely Energetic"
}

const EmotionalWellness = () => {
  const [entries, setEntries] = useState(initialEntries)
  const [chartData, setChartData] = useState<any[]>([])

  // Update chart data when entries change
  useEffect(() => {
    // Sort entries by date
    const sortedEntries = [...entries].sort((a, b) => a.date.getTime() - b.date.getTime())
    
    // Format for chart
    const formattedData = sortedEntries.map(entry => ({
      date: formatDate(entry.date),
      mood: entry.moodScore,
      anxiety: entry.anxietyLevel,
      sleep: entry.sleepQuality,
      energy: entry.energyLevel
    }))
    
    setChartData(formattedData)
  }, [entries])

  // Calculate averages for the week
  const calculateAverages = () => {
    if (entries.length === 0) return { mood: 0, anxiety: 0, sleep: 0, energy: 0 }
    
    const sum = entries.reduce((acc, entry) => {
      return {
        mood: acc.mood + entry.moodScore,
        anxiety: acc.anxiety + entry.anxietyLevel,
        sleep: acc.sleep + entry.sleepQuality,
        energy: acc.energy + entry.energyLevel
      }
    }, { mood: 0, anxiety: 0, sleep: 0, energy: 0 })
    
    const count = entries.length
    return {
      mood: Math.round((sum.mood / count) * 10) / 10,
      anxiety: Math.round((sum.anxiety / count) * 10) / 10,
      sleep: Math.round((sum.sleep / count) * 10) / 10,
      energy: Math.round((sum.energy / count) * 10) / 10
    }
  }
  
  const averages = calculateAverages()

  // Function to determine trend (up, down, or neutral)
  const calculateTrend = (metric: 'moodScore' | 'anxietyLevel' | 'sleepQuality' | 'energyLevel') => {
    if (entries.length < 2) return 'neutral'
    
    const sortedEntries = [...entries].sort((a, b) => a.date.getTime() - b.date.getTime())
    const first = sortedEntries[0][metric]
    const last = sortedEntries[sortedEntries.length - 1][metric]
    
    // For anxiety, a downward trend is positive
    if (metric === 'anxietyLevel') {
      if (last < first) return 'positive'
      if (last > first) return 'negative'
      return 'neutral'
    }
    
    // For other metrics, an upward trend is positive
    if (last > first) return 'positive'
    if (last < first) return 'negative'
    return 'neutral'
  }

  return (
    <div className="container mx-auto px-4 py-6 lg:px-8">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Emotional Wellness Tracking</h1>
          <p className="text-muted-foreground">
            Track and visualize your daily emotional state and wellness metrics
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Entry
        </Button>
      </div>

      {/* Chart section */}
      <div className="mb-8 rounded-lg border bg-card p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Weekly Trends</h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }} 
                tickFormatter={(value) => {
                  // Extract just the day or date part for cleaner display
                  return value.split(' at ')[0];
                }}
              />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="mood"
                name="Mood"
                stroke="#10b981"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="anxiety"
                name="Anxiety"
                stroke="#ef4444"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="sleep"
                name="Sleep"
                stroke="#6366f1"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="energy"
                name="Energy"
                stroke="#f59e0b"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-muted-foreground">Average Mood</h3>
            <div className={`rounded-full p-1 ${
              calculateTrend('moodScore') === 'positive' ? 'bg-green-100 text-green-600' :
              calculateTrend('moodScore') === 'negative' ? 'bg-red-100 text-red-600' :
              'bg-gray-100 text-gray-600'
            }`}>
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold">{averages.mood}</span>
            <span className="ml-2 text-sm text-muted-foreground">/ 10</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {averages.mood < 4 ? "Your mood has been low" : 
             averages.mood < 7 ? "Your mood has been moderate" : 
             "Your mood has been positive"}
          </p>
        </div>

        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-muted-foreground">Average Anxiety</h3>
            <div className={`rounded-full p-1 ${
              calculateTrend('anxietyLevel') === 'positive' ? 'bg-green-100 text-green-600' :
              calculateTrend('anxietyLevel') === 'negative' ? 'bg-red-100 text-red-600' :
              'bg-gray-100 text-gray-600'
            }`}>
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold">{averages.anxiety}</span>
            <span className="ml-2 text-sm text-muted-foreground">/ 10</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {averages.anxiety < 4 ? "Your anxiety has been low" : 
             averages.anxiety < 7 ? "Your anxiety has been moderate" : 
             "Your anxiety has been high"}
          </p>
        </div>

        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-muted-foreground">Average Sleep</h3>
            <div className={`rounded-full p-1 ${
              calculateTrend('sleepQuality') === 'positive' ? 'bg-green-100 text-green-600' :
              calculateTrend('sleepQuality') === 'negative' ? 'bg-red-100 text-red-600' :
              'bg-gray-100 text-gray-600'
            }`}>
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold">{averages.sleep}</span>
            <span className="ml-2 text-sm text-muted-foreground">/ 10</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {averages.sleep < 4 ? "Your sleep quality has been poor" : 
             averages.sleep < 7 ? "Your sleep quality has been fair" : 
             "Your sleep quality has been good"}
          </p>
        </div>

        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-muted-foreground">Average Energy</h3>
            <div className={`rounded-full p-1 ${
              calculateTrend('energyLevel') === 'positive' ? 'bg-green-100 text-green-600' :
              calculateTrend('energyLevel') === 'negative' ? 'bg-red-100 text-red-600' :
              'bg-gray-100 text-gray-600'
            }`}>
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold">{averages.energy}</span>
            <span className="ml-2 text-sm text-muted-foreground">/ 10</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {averages.energy < 4 ? "Your energy has been low" : 
             averages.energy < 7 ? "Your energy has been moderate" : 
             "Your energy has been high"}
          </p>
        </div>
      </div>

      {/* Entries list */}
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Recent Entries</h2>
        
        <div className="space-y-4">
          {entries.length > 0 ? (
            [...entries]
              .sort((a, b) => b.date.getTime() - a.date.getTime()) // Sort newest first
              .map((entry) => (
                <div key={entry.id} className="rounded-md border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{formatDate(entry.date)}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                    <div>
                      <p className="text-sm font-medium">Mood</p>
                      <div className="mt-1 flex items-center gap-2">
                        <div 
                          className="h-3 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" 
                          style={{ width: '100px' }}
                        >
                          <div 
                            className="h-3 w-3 translate-x-[-50%] rounded-full border-2 border-white bg-black" 
                            style={{ 
                              marginLeft: `${(entry.moodScore / 10) * 100}px`,
                              transform: 'translateX(-50%)'
                            }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">
                          {entry.moodScore}/10
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {moodLabels[entry.moodScore as keyof typeof moodLabels] || ''}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Anxiety</p>
                      <div className="mt-1 flex items-center gap-2">
                        <div 
                          className="h-3 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" 
                          style={{ width: '100px' }}
                        >
                          <div 
                            className="h-3 w-3 translate-x-[-50%] rounded-full border-2 border-white bg-black" 
                            style={{ 
                              marginLeft: `${(entry.anxietyLevel / 10) * 100}px`,
                              transform: 'translateX(-50%)'
                            }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">
                          {entry.anxietyLevel}/10
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {anxietyLabels[entry.anxietyLevel as keyof typeof anxietyLabels] || ''}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Sleep</p>
                      <div className="mt-1 flex items-center gap-2">
                        <div 
                          className="h-3 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" 
                          style={{ width: '100px' }}
                        >
                          <div 
                            className="h-3 w-3 translate-x-[-50%] rounded-full border-2 border-white bg-black" 
                            style={{ 
                              marginLeft: `${(entry.sleepQuality / 10) * 100}px`,
                              transform: 'translateX(-50%)'
                            }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">
                          {entry.sleepQuality}/10
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {sleepLabels[entry.sleepQuality as keyof typeof sleepLabels] || ''}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Energy</p>
                      <div className="mt-1 flex items-center gap-2">
                        <div 
                          className="h-3 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" 
                          style={{ width: '100px' }}
                        >
                          <div 
                            className="h-3 w-3 translate-x-[-50%] rounded-full border-2 border-white bg-black" 
                            style={{ 
                              marginLeft: `${(entry.energyLevel / 10) * 100}px`,
                              transform: 'translateX(-50%)'
                            }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">
                          {entry.energyLevel}/10
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {energyLabels[entry.energyLevel as keyof typeof energyLabels] || ''}
                      </p>
                    </div>
                  </div>
                  
                  {entry.notes && (
                    <div className="mt-4">
                      <p className="text-sm font-medium">Notes</p>
                      <p className="mt-1 text-sm text-muted-foreground">{entry.notes}</p>
                    </div>
                  )}
                </div>
              ))
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded-lg border bg-card p-8 text-center">
              <div className="rounded-full bg-primary/10 p-3">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-medium">No entries yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Start tracking your emotional wellness by adding your first entry
              </p>
              <Button className="mt-4">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Entry
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Insights section */}
      <div className="mt-8 rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">AI Insights</h2>
        </div>
        <p className="mt-4 rounded-lg bg-primary/5 p-4 text-sm">
          <strong>Based on your recent entries:</strong> Your mood and energy levels have been improving over the past week, which is a positive trend. Your anxiety has decreased slightly, likely correlating with your improved sleep quality. Keep practicing the relaxation techniques that seem to be working for you, especially before bedtime. Consider scheduling another therapy session to discuss the work stressors that triggered your anxiety at the beginning of the week.
        </p>
      </div>
    </div>
  )
}

export default EmotionalWellness