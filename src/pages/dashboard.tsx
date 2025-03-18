import { useState } from "react"
import { Link } from "react-router-dom"
import { 
  ArrowUpRight, 
  Calendar, 
  MessageSquare, 
  BookOpen, 
  Activity, 
  TrendingUp, 
  Clock, 
  Award, 
  BarChart3, 
  Lightbulb,
  AlarmClock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"

// Mock data
const upcomingActivities = [
  {
    id: "act-1",
    title: "Scheduled Therapy Session",
    time: new Date(Date.now() + 1000 * 60 * 60 * 24), // Tomorrow
    type: "session",
    description: "Follow-up on anxiety management strategies"
  },
  {
    id: "act-2",
    title: "Mindfulness Exercise",
    time: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours from now
    type: "mindfulness",
    description: "10-minute body scan meditation"
  },
  {
    id: "act-3",
    title: "Mood Check-in Reminder",
    time: new Date(Date.now() + 1000 * 60 * 60 * 6), // 6 hours from now
    type: "tracking",
    description: "Daily emotional wellness tracking"
  }
]

const recentSessions = [
  {
    id: "session-1",
    title: "Cognitive Restructuring",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    messageCount: 28,
    topInsight: "Identified thought patterns that contribute to workplace anxiety"
  },
  {
    id: "session-2",
    title: "Stress Management",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    messageCount: 32,
    topInsight: "Learned progressive muscle relaxation for physical tension"
  }
]

// Weekly mood average data for chart
const weeklyMood = [
  { day: "Mon", value: 5 },
  { day: "Tue", value: 4 },
  { day: "Wed", value: 6 },
  { day: "Thu", value: 5 },
  { day: "Fri", value: 7 },
  { day: "Sat", value: 7 },
  { day: "Sun", value: 6 }
]

// Practice streak data
const userStats = {
  sessionCount: 12,
  journalEntries: 24,
  streak: 8, // days
  minutesSpent: 248,
  lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
}

// Therapy goals
const userGoals = [
  { 
    id: "goal-1", 
    text: "Reduce workplace anxiety", 
    progress: 65 
  },
  { 
    id: "goal-2", 
    text: "Improve sleep quality", 
    progress: 40 
  },
  { 
    id: "goal-3", 
    text: "Develop mindfulness practice", 
    progress: 80 
  }
]

const therapeuticInsights = [
  "Your sleep quality improves on days you practice meditation.",
  "You report lower anxiety after journaling about work concerns.",
  "Your mood tends to dip on Tuesdays, when you have team meetings."
]

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-muted-foreground">
          Continue your therapeutic journey with MindfulJourney
        </p>
      </div>

      {/* Main dashboard grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Quick actions */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Link to="/therapy/session/new" className="group">
              <div className="flex h-full flex-col rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow">
                <div className="flex items-center justify-between">
                  <div className="rounded-full bg-primary/10 p-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <h2 className="mt-3 font-semibold">New Therapy Session</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Talk with your AI therapist about what's on your mind
                </p>
              </div>
            </Link>
            
            <Link to="/journal/new" className="group">
              <div className="flex h-full flex-col rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow">
                <div className="flex items-center justify-between">
                  <div className="rounded-full bg-primary/10 p-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <h2 className="mt-3 font-semibold">Journal Entry</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Record your thoughts, feelings and reflections
                </p>
              </div>
            </Link>
            
            <Link to="/emotional-wellness" className="group">
              <div className="flex h-full flex-col rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow">
                <div className="flex items-center justify-between">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <h2 className="mt-3 font-semibold">Track Wellness</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Log your daily mood, anxiety, and sleep metrics
                </p>
              </div>
            </Link>
          </div>
          
          {/* Upcoming activities */}
          <div className="rounded-lg border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Upcoming Activities</h2>
              <Button variant="ghost" size="sm" className="text-xs">
                View calendar
              </Button>
            </div>
            
            <div className="space-y-3">
              {upcomingActivities.map(activity => (
                <div key={activity.id} className="flex flex-col rounded-md border p-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`rounded-full p-2 ${
                      activity.type === 'session' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'mindfulness' ? 'bg-purple-100 text-purple-600' :
                      'bg-amber-100 text-amber-600'
                    }`}>
                      {activity.type === 'session' ? <MessageSquare className="h-4 w-4" /> :
                       activity.type === 'mindfulness' ? <Activity className="h-4 w-4" /> :
                       <BarChart3 className="h-4 w-4" />}
                    </div>
                    <div>
                      <h3 className="font-medium">{activity.title}</h3>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 sm:mt-0">
                    <AlarmClock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {formatDate(activity.time)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recent therapy sessions */}
          <div className="rounded-lg border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Therapy Sessions</h2>
              <Link to="/therapy/sessions">
                <Button variant="ghost" size="sm" className="text-xs">
                  View all sessions
                </Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentSessions.map(session => (
                <Link key={session.id} to={`/therapy/session/${session.id}`} className="group block">
                  <div className="rounded-md border p-4 transition-all hover:shadow">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{session.title}</h3>
                      <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(session.date)}</span>
                      <span className="text-muted-foreground/50">•</span>
                      <MessageSquare className="h-4 w-4" />
                      <span>{session.messageCount} messages</span>
                    </div>
                    <div className="mt-3 rounded-md bg-muted/20 p-2">
                      <p className="text-sm">
                        <span className="font-medium">Top insight:</span>{" "}
                        {session.topInsight}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
              
              <Link to="/therapy/session/new">
                <Button className="w-full">Start New Session</Button>
              </Link>
            </div>
          </div>
          
          {/* Therapeutic insights */}
          <div className="rounded-lg border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <h2 className="text-lg font-semibold">AI Therapy Insights</h2>
            </div>
            
            <div className="space-y-3">
              {therapeuticInsights.map((insight, index) => (
                <div key={index} className="rounded-md bg-muted/20 p-3">
                  <p className="text-sm">{insight}</p>
                </div>
              ))}
            </div>
            
            <p className="mt-4 text-sm text-muted-foreground">
              Insights are based on patterns observed in your therapy sessions, journal entries, and mood tracking data.
            </p>
          </div>
        </div>
        
        {/* Right column */}
        <div className="space-y-6">
          {/* User stats */}
          <div className="rounded-lg border bg-card p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Your Journey</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-md bg-muted/20 p-3 text-center">
                <div className="text-2xl font-bold text-primary">{userStats.sessionCount}</div>
                <p className="text-xs text-muted-foreground">Therapy Sessions</p>
              </div>
              
              <div className="rounded-md bg-muted/20 p-3 text-center">
                <div className="text-2xl font-bold text-primary">{userStats.journalEntries}</div>
                <p className="text-xs text-muted-foreground">Journal Entries</p>
              </div>
              
              <div className="rounded-md bg-muted/20 p-3 text-center">
                <div className="text-2xl font-bold text-primary">{userStats.streak}</div>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
              
              <div className="rounded-md bg-muted/20 p-3 text-center">
                <div className="text-2xl font-bold text-primary">{userStats.minutesSpent}</div>
                <p className="text-xs text-muted-foreground">Minutes in Therapy</p>
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Last activity: {formatDate(userStats.lastActivity)}</span>
            </div>
          </div>
          
          {/* Weekly mood chart */}
          <div className="rounded-lg border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Weekly Mood</h2>
              <Link to="/emotional-wellness">
                <Button variant="ghost" size="sm" className="text-xs">
                  View details
                </Button>
              </Link>
            </div>
            
            <div className="h-[160px]">
              <div className="flex h-full items-end justify-between">
                {weeklyMood.map((day, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-8 rounded-t-sm bg-primary/80" 
                      style={{ height: `${(day.value / 10) * 100}px` }}
                    ></div>
                    <span className="mt-2 text-xs text-muted-foreground">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-4 rounded-md bg-primary/10 p-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <p className="text-sm">
                  <span className="font-medium">Trending up:</span> Your mood has improved by 20% this week
                </p>
              </div>
            </div>
          </div>
          
          {/* Therapy goals */}
          <div className="rounded-lg border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Therapy Goals</h2>
              <Button variant="ghost" size="sm" className="text-xs">
                Edit goals
              </Button>
            </div>
            
            <div className="space-y-4">
              {userGoals.map(goal => (
                <div key={goal.id}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">{goal.text}</p>
                    <span className="text-xs font-medium">{goal.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div 
                      className="h-full rounded-full bg-primary" 
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <Link to="/profile/goals">
                <Button variant="outline" size="sm">Manage Goals</Button>
              </Link>
            </div>
          </div>
          
          {/* Achievements */}
          <div className="rounded-lg border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              <h2 className="text-lg font-semibold">Recent Achievements</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-md border p-3">
                <div className="rounded-full bg-amber-100 p-2 text-amber-600">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">7-Day Streak</h3>
                  <p className="text-sm text-muted-foreground">Consistent engagement for a week</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 rounded-md border p-3">
                <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Mindful Journaler</h3>
                  <p className="text-sm text-muted-foreground">Created 10+ journal entries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard