import { createContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '../supabase'
import type { AuthState } from './auth-types'

type AuthContextType = AuthState & {
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: string | null }>
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
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setState(prev => ({
          ...prev,
          user: {
            id: session.user.id,
            email: session.user.email ?? '',
            role: 'parent',
            profile: null,
          },
          isAuthenticated: true,
          isLoading: false,
        }))
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
          setState(prev => ({
            ...prev,
            user: {
              id: session.user.id,
              email: session.user.email ?? '',
              role: 'parent',
              profile: null,
            },
            isAuthenticated: true,
            isLoading: false,
            error: null,
          }))
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
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setState(prev => ({ ...prev, error: error.message }))
      return { error: error.message }
    }
    return { error: null }
  }

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setState(prev => ({ ...prev, error: error.message }))
      return { error: error.message }
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

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}
