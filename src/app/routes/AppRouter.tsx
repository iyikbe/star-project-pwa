import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { PublicLayout } from '../../components/layout/PublicLayout'
import { AuthLayout } from '../../components/layout/AuthLayout'
import { AppLayout } from '../../components/layout/AppLayout'
import { AdminLayout } from '../../components/layout/AdminLayout'

import { HomePage } from '../../features/public/HomePage'
import { AboutPage } from '../../features/public/AboutPage'

import { LoginPage } from '../../features/auth/LoginPage'
import { RegisterPage } from '../../features/auth/RegisterPage'

import { AccountPage } from '../../features/account/AccountPage'
import { AchievementsPage } from '../../features/account/AchievementsPage'
import { SettingsPage } from '../../features/account/SettingsPage'

import { StartPreferencePage } from '../../features/start-career/StartPreferencePage'
import { ProjectListingPage } from '../../features/start-career/ProjectListingPage'

import { CategoryPage } from '../../features/categories/CategoryPage'

import { ProjectDetailPage } from '../../features/projects/ProjectDetailPage'
import { ProjectWorkspacePage } from '../../features/projects/ProjectWorkspacePage'

import { SubmissionUploadPage } from '../../features/submissions/SubmissionUploadPage'
import { SubmissionResultPage } from '../../features/submissions/SubmissionResultPage'

import { NotificationsPage } from '../../features/notifications/NotificationsPage'
import { MessagesPage } from '../../features/notifications/MessagesPage'

import { SubscriptionPage } from '../../features/subscription/SubscriptionPage'

import { AdminDashboardPage } from '../../features/admin/AdminDashboardPage'
import { AdminUsersPage } from '../../features/admin/AdminUsersPage'
import { AdminProjectsPage } from '../../features/admin/AdminProjectsPage'
import { AdminProjectNewPage } from '../../features/admin/AdminProjectNewPage'
import { AdminCategoriesPage } from '../../features/admin/AdminCategoriesPage'
import { AdminLevelsPage } from '../../features/admin/AdminLevelsPage'
import { AdminPaymentsPage } from '../../features/admin/AdminPaymentsPage'
import { AdminSubmissionsPage } from '../../features/admin/AdminSubmissionsPage'
import { AdminSubmissionReviewPage } from '../../features/admin/AdminSubmissionReviewPage'
import { AdminNotificationsPage } from '../../features/admin/AdminNotificationsPage'
import { AdminAuditLogsPage } from '../../features/admin/AdminAuditLogsPage'
import { AdminSettingsPage } from '../../features/admin/AdminSettingsPage'

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      { path: '/account', element: <AccountPage /> },
      { path: '/start/preference', element: <StartPreferencePage /> },
      { path: '/start', element: <ProjectListingPage /> },
      { path: '/categories/:categorySlug', element: <CategoryPage /> },
      { path: '/projects/:projectId', element: <ProjectDetailPage /> },
      {
        path: '/projects/:projectId/workspace',
        element: <ProjectWorkspacePage />,
      },
      { path: '/projects/:projectId/submit', element: <SubmissionUploadPage /> },
      { path: '/projects/:projectId/result', element: <SubmissionResultPage /> },
      { path: '/notifications', element: <NotificationsPage /> },
      { path: '/messages', element: <MessagesPage /> },
      { path: '/achievements', element: <AchievementsPage /> },
      { path: '/subscription', element: <SubscriptionPage /> },
      { path: '/settings', element: <SettingsPage /> },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      { path: '/admin', element: <AdminDashboardPage /> },
      { path: '/admin/users', element: <AdminUsersPage /> },
      { path: '/admin/projects', element: <AdminProjectsPage /> },
      { path: '/admin/projects/new', element: <AdminProjectNewPage /> },
      { path: '/admin/categories', element: <AdminCategoriesPage /> },
      { path: '/admin/levels', element: <AdminLevelsPage /> },
      { path: '/admin/payments', element: <AdminPaymentsPage /> },
      { path: '/admin/submissions', element: <AdminSubmissionsPage /> },
      {
        path: '/admin/submissions/:submissionId',
        element: <AdminSubmissionReviewPage />,
      },
      { path: '/admin/notifications', element: <AdminNotificationsPage /> },
      { path: '/admin/audit-logs', element: <AdminAuditLogsPage /> },
      { path: '/admin/settings', element: <AdminSettingsPage /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
