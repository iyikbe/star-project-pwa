export type AuthUser = {
  id: string
  email: string
  role: 'parent' | 'admin'
  profile: UserProfile | null
}

export type UserProfile = {
  id: string
  guardianName: string
  guardianEmail: string
  phone: string | null
  region: string
  childName: string
  childInitials: string
  childDateOfBirth: string
  studentId: string
  currentCategory: string
  currentLevel: string
  totalStars: number
  projectsCompleted: number
  aboutMe: string
}

export type AuthState = {
  user: AuthUser | null
  profile: UserProfile | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
}
