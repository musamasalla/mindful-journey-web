import { createClient } from '@supabase/supabase-js'

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Check your environment variables.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Authentication helpers
export const signInWithEmail = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export const signUpWithEmail = async (email: string, password: string) => {
  return await supabase.auth.signUp({
    email,
    password,
  })
}

export const signOut = async () => {
  return await supabase.auth.signOut()
}

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser()
  return data.user
}

// Therapy session helpers
export const saveTherapySession = async (userId: string, data: any) => {
  return await supabase
    .from('therapy_sessions')
    .insert([
      {
        user_id: userId,
        ...data,
      },
    ])
    .select()
}

export const getTherapySessions = async (userId: string) => {
  return await supabase
    .from('therapy_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
}

export const getTherapySession = async (sessionId: string) => {
  return await supabase
    .from('therapy_sessions')
    .select('*')
    .eq('id', sessionId)
    .single()
}

export const updateTherapySession = async (sessionId: string, data: any) => {
  return await supabase
    .from('therapy_sessions')
    .update(data)
    .eq('id', sessionId)
}

// Journal entries helpers
export const saveJournalEntry = async (userId: string, data: any) => {
  return await supabase
    .from('journal_entries')
    .insert([
      {
        user_id: userId,
        ...data,
      },
    ])
    .select()
}

export const getJournalEntries = async (userId: string) => {
  return await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
}

export const updateJournalEntry = async (entryId: string, data: any) => {
  return await supabase
    .from('journal_entries')
    .update(data)
    .eq('id', entryId)
}

export const deleteJournalEntry = async (entryId: string) => {
  return await supabase
    .from('journal_entries')
    .delete()
    .eq('id', entryId)
}

// Emotional wellness tracking helpers
export const saveEmotionalEntry = async (userId: string, data: any) => {
  return await supabase
    .from('emotional_entries')
    .insert([
      {
        user_id: userId,
        ...data,
      },
    ])
    .select()
}

export const getEmotionalEntries = async (userId: string, startDate?: string, endDate?: string) => {
  let query = supabase
    .from('emotional_entries')
    .select('*')
    .eq('user_id', userId)
  
  if (startDate) {
    query = query.gte('date', startDate)
  }
  
  if (endDate) {
    query = query.lte('date', endDate)
  }
  
  return await query.order('date', { ascending: false })
}

// User profile helpers
export const getUserProfile = async (userId: string) => {
  return await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
}

export const updateUserProfile = async (userId: string, data: any) => {
  return await supabase
    .from('profiles')
    .update(data)
    .eq('id', userId)
}

// Session messages helpers
export const saveSessionMessage = async (sessionId: string, message: any) => {
  return await supabase
    .from('session_messages')
    .insert([
      {
        session_id: sessionId,
        ...message,
      },
    ])
    .select()
}

export const getSessionMessages = async (sessionId: string) => {
  return await supabase
    .from('session_messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true })
}

export default supabase