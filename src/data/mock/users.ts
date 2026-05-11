export type MockUser = {
  studentId: string
  childName: string
  childInitials: string
  guardianName: string
  guardianInitials: string
  age: number
  region: string
  currentLevel: 'tiny' | 'baby' | 'junior' | 'young' | 'senior' | 'legendary' | 'mythical'
  currentCategory: 'chef'
  totalStars: number
  projectsCompleted: number
  aboutMe: string
}

export const CURRENT_USER: MockUser = {
  studentId: 'SP-2026-0048',
  childName: 'Lukas Müller',
  childInitials: 'LM',
  guardianName: 'Anna M.',
  guardianInitials: 'AM',
  age: 9,
  region: 'Kassel, Hessen',
  currentLevel: 'baby',
  currentCategory: 'chef',
  totalStars: 7,
  projectsCompleted: 5,
  aboutMe:
    'I love cooking with my mom and growing tomatoes in our garden. My favorite project so far was the Ice Cream Project!',
}

export const TEAMMATE_SOPHIE: MockUser = {
  studentId: 'SP-2026-0052',
  childName: 'Sophie K.',
  childInitials: 'SK',
  guardianName: 'Petra K.',
  guardianInitials: 'PK',
  age: 9,
  region: 'Kassel, Hessen',
  currentLevel: 'baby',
  currentCategory: 'chef',
  totalStars: 8,
  projectsCompleted: 6,
  aboutMe: '',
}