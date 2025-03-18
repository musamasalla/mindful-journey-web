import { Link, useLocation } from "react-router-dom"
import {
  Home,
  Brain,
  PenLine,
  LineChart,
  LifeBuoy,
  User,
  LogOut,
  Moon,
  Sun,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { useTheme } from "./theme-provider"

interface SidebarProps {
  onNavItemClick?: () => void
}

const Sidebar = ({ onNavItemClick }: SidebarProps) => {
  const location = useLocation()
  const { theme, setTheme } = useTheme()

  const isActiveRoute = (route: string) => {
    return location.pathname === route
  }

  const navItems = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
    },
    {
      label: "Meditations",
      icon: Brain,
      href: "/meditations",
    },
    {
      label: "Journal",
      icon: PenLine,
      href: "/journal",
    },
    {
      label: "Mood Tracker",
      icon: LineChart,
      href: "/mood-tracker",
    },
    {
      label: "Resources",
      icon: LifeBuoy,
      href: "/resources",
    },
  ]

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 font-bold text-primary"
          onClick={onNavItemClick}
        >
          <Brain className="h-5 w-5" />
          <span>MindfulJourney</span>
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={onNavItemClick}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                isActiveRoute(item.href) ? "bg-accent text-accent-foreground" : "transparent"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t p-4">
        <nav className="grid gap-1">
          <Link
            to="/profile"
            onClick={onNavItemClick}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
              isActiveRoute("/profile") ? "bg-accent text-accent-foreground" : "transparent"
            )}
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>
          
          <Button
            variant="ghost"
            className="flex w-full justify-start gap-3 px-3"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <>
                <Sun className="h-4 w-4" />
                <span className="text-sm">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                <span className="text-sm">Dark Mode</span>
              </>
            )}
          </Button>
          
          <Button variant="ghost" className="flex w-full justify-start gap-3 px-3">
            <LogOut className="h-4 w-4" />
            <span className="text-sm">Sign Out</span>
          </Button>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar