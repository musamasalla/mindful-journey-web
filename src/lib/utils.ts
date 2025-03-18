import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date to a readable string
 * @param date The date to format
 * @returns A formatted date string like "Mar 18, 2025" or "Today at 2:30 PM"
 */
export function formatDate(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  // Format time
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const formattedHours = hours % 12 || 12
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
  const timeString = `${formattedHours}:${formattedMinutes} ${ampm}`
  
  // Different formats based on recency
  if (diffDays === 0) {
    // Today
    return `Today at ${timeString}`
  } else if (diffDays === 1) {
    // Yesterday
    return `Yesterday at ${timeString}`
  } else if (diffDays < 7) {
    // Within the last week
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' }
    return `${date.toLocaleDateString('en-US', options)} at ${timeString}`
  } else {
    // Older than a week
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }
    return date.toLocaleDateString('en-US', options)
  }
}

/**
 * Shortens a string to the specified length and adds an ellipsis
 * @param str The string to shorten
 * @param maxLength The maximum length of the returned string (including ellipsis)
 * @returns The shortened string with ellipsis if needed
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - 3) + '...'
}

/**
 * Delays execution for a specified amount of time
 * @param ms Time to delay in milliseconds
 * @returns A promise that resolves after the specified time
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Generates a random ID string
 * @param length Length of the ID
 * @returns A random string ID
 */
export function generateId(length = 10): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

/**
 * Extracts emotion keywords from text
 * @param text The text to analyze
 * @returns An array of extracted emotion keywords
 */
export function extractEmotionKeywords(text: string): string[] {
  const emotionKeywords = [
    'happy', 'sad', 'angry', 'anxious', 'scared', 'worried',
    'content', 'stressed', 'depressed', 'excited', 'frustrated',
    'overwhelmed', 'peaceful', 'hopeful', 'hopeless', 'joyful',
    'afraid', 'grateful', 'guilty', 'lonely', 'proud'
  ]
  
  const lowercaseText = text.toLowerCase()
  return emotionKeywords.filter(emotion => 
    lowercaseText.includes(emotion)
  )
}

/**
 * Groups sessions by date
 * @param sessions Array of sessions with date property
 * @returns Sessions grouped by date string
 */
export function groupSessionsByDate<T extends { date: Date }>(
  sessions: T[]
): Record<string, T[]> {
  return sessions.reduce((groups, session) => {
    const dateKey = formatDate(session.date).split(' at ')[0] // Remove time part
    if (!groups[dateKey]) {
      groups[dateKey] = []
    }
    groups[dateKey].push(session)
    return groups
  }, {} as Record<string, T[]>)
}