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
  role: 'parent' | 'admin'
  avatarInitials: string
  childId: string | null
  childName: string
  childInitials: string
  dateOfBirth: string
  studentId: string
  currentCategory: string | null
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

export function toUserProfile(
  profile: {
    id: string
    guardian_name: string
    guardian_email: string
    phone: string | null
    region: string
    role: 'parent' | 'admin'
    avatar_initials: string
  },
  child: {
    id: string
    child_name: string
    child_initials: string
    date_of_birth: string
    student_id: string
    current_category: string | null
    current_level: string
    total_stars: number
    projects_completed: number
    about_me: string
  } | null,
): UserProfile {
  return {
    id: profile.id,
    guardianName: profile.guardian_name,
    guardianEmail: profile.guardian_email,
    phone: profile.phone,
    region: profile.region,
    role: profile.role,
    avatarInitials: profile.avatar_initials,
    childId: child?.id ?? null,
    childName: child?.child_name ?? '',
    childInitials: child?.child_initials ?? '',
    dateOfBirth: child?.date_of_birth ?? '',
    studentId: child?.student_id ?? '',
    currentCategory: child?.current_category ?? null,
    currentLevel: child?.current_level ?? 'tiny',
    totalStars: child?.total_stars ?? 0,
    projectsCompleted: child?.projects_completed ?? 0,
    aboutMe: child?.about_me ?? '',
  }
}
