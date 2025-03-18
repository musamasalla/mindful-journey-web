import { Outlet, Navigate } from "react-router-dom"
import { motion } from "framer-motion"
import Sidebar from "../sidebar"
import { useState, useEffect } from "react"

interface DashboardLayoutProps {}

const DashboardLayout = ({}: DashboardLayoutProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true) // Normally would check auth state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  useEffect(() => {
    // Add event listener for ESC key to close mobile sidebar
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileSidebarOpen(false)
      }
    }
    window.addEventListener("keydown", handleEsc)

    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [])

  // This would be replaced with actual auth checking
  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile sidebar backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar for desktop */}
      <div className="hidden border-r lg:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-background transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onNavItemClick={() => setIsMobileSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header with menu button */}
        <header className="flex h-16 items-center border-b px-4 lg:hidden">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="mr-2 rounded-md p-2 hover:bg-accent"
            aria-label="Open sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">MindfulJourney</h1>
        </header>

        {/* Page content */}
        <motion.main
          className="flex-1 overflow-y-auto p-4 lg:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  )
}

export default DashboardLayout