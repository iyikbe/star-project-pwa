import { createContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import { supabase } from '../supabase'
import { toUserProfile } from './auth-types'
import type { AuthState } from './auth-types'

type AuthContextType = AuthState & {
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: string | null }>
  refreshProfile: () => Promise<void>
}

const initialState: AuthState = {
  user: null,
  profile: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
}

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  signIn: async () => ({ error: 'AuthProvider not mounted' }),
  signUp: async () => ({ error: 'AuthProvider not mounted' }),
  signOut: async () => {},
  resetPassword: async () => ({ error: 'AuthProvider not mounted' }),
  refreshProfile: async () => {},
})

async function fetchUserProfile(userId: string) {
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()

  if (profileError || !profileData) {
    return null
  }

  const { data: childData } = await supabase
    .from('children')
    .select('*')
    .eq('profile_id', userId)
    .limit(1)
    .maybeSingle()

  return {
    profile: profileData,
    child: childData,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState)

  const loadProfile = useCallback(async (userId: string, email: string) => {
    const result = await fetchUserProfile(userId)

    if (result) {
      const userProfile = toUserProfile(result.profile, result.child)
      setState({
        user: {
          id: userId,
          email,
          role: result.profile.role,
          profile: userProfile,
        },
        profile: userProfile,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })
    } else {
      setState({
        user: null,
        profile: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'Profile not found. Please contact support.',
      })
    }
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadProfile(session.user.id, session.user.email ?? '')
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
        }))
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          loadProfile(session.user.id, session.user.email ?? '')
        } else {
          setState({
            user: null,
            profile: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          })
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [loadProfile])

  const signIn = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setState(prev => ({ ...prev, isLoading: false, error: error.message }))
      return { error: error.message }
    }
    return { error: null }
  }

  const signUp = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setState(prev => ({ ...prev, isLoading: false, error: error.message }))
      return { error: error.message }
    }
    if (!data.session) {
      setState(prev => ({ ...prev, isLoading: false }))
    }
    return { error: null }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setState({
      user: null,
      profile: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })
  }

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) return { error: error.message }
    return { error: null }
  }

  const refreshProfile = async () => {
    if (state.user) {
      await loadProfile(state.user.id, state.user.email)
    }
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      signIn,
      signUp,
      signOut,
      resetPassword,
      refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
