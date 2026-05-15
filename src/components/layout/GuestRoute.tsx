import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../lib/auth/use-auth'

export function GuestRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sp-page-bg">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-sp-primary border-t-transparent"></div>
          <p className="mt-3 text-sm text-sp-text-muted">Loading...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/account" replace />
  }

  return <Outlet />
}
