import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  Folder, 
  LayoutDashboard, 
  Settings, 
  FolderPlus, 
  HelpCircle, 
  User, 
  ChartNoAxesCombined, 
  ChevronDown,
  TrendingUp
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import OgeLogo from "../assets/oge-logo.svg?react"
import { useState } from "react"

const mainRoutes = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard className="h-7 w-7 text-white/90" />,
    href: "/",
  },
  {
    label: "Projekte",
    icon: <Folder className="h-7 w-7 text-white/90" />,
    href: "/projects",
  },
  {
    label: "Neues Projekt",
    icon: <FolderPlus className="h-7 w-7 text-white/90" />,
    href: "/projects/new",
  },
  {
    label: "Inflationsdaten",
    icon: <TrendingUp className="h-7 w-7 text-white/90" />,
    href: "/inflation-data",
  },
]

const costReportingRoutes = [
  {
    label: "Kostenart",
    href: "/cost-reporting/cost-types",
  },
  {
    label: "PSP-Elemente",
    href: "/cost-reporting/psp-elements",
  },
  {
    label: "Kosteneskalation",
    href: "/cost-reporting/escalation",
  },
]

const Sidebar = () => {
  const location = useLocation()
  const [isReportingOpen, setIsReportingOpen] = useState(false)

  const isActiveRoute = (href: string) => {
    if (href === "/projects") {
      return location.pathname === "/projects" || 
             (location.pathname.startsWith("/projects/") && location.pathname !== "/projects/new")
    }
    if (href === "/cost-reporting") {
      return location.pathname.startsWith("/cost-reporting/")
    }
    return location.pathname === href
  }

  const getButtonClasses = (href: string) => cn(
    "w-full h-12 px-2",
    "text-white/80 hover:text-white hover:bg-white/10",
    "flex items-center",
    isActiveRoute(href) && [
      "bg-white/10 text-white",
      "before:absolute before:left-0 before:w-2 before:h-9 before:my-3 before:bg-white before:rounded-r",
    ]
  )

  return (
    <div className="flex flex-col w-68 bg-[#003B5C] min-h-screen">
      <div className="flex items-center h-20 px-4 bg-[#003B5C] border-b border-[#ffffff20]">
        <Link to="/" className="flex items-center">
          <div className="w-[52px] ml-2 flex justify-center">
            <OgeLogo className="size-12 text-white" />
          </div>
          <span className="ml-3 font-semibold text-white whitespace-nowrap">
            Budget Genius
          </span>
        </Link>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {mainRoutes.map((route) => (
            <Button
              key={route.href}
              variant="ghost"
              className={getButtonClasses(route.href)}
              asChild
            >
              <Link to={route.href}>
                <div className="flex items-center w-full">
                  <div className="w-[64px] flex items-center justify-center">
                    {route.icon}
                  </div>
                  <span className="text-base font-medium">
                    {route.label}
                  </span>
                </div>
              </Link>
            </Button>
          ))}

          {/* Kostenreporting Dropdown */}
          <div>
            <Button
              variant="ghost"
              className={cn(
                getButtonClasses("/cost-reporting"),
              )}
              onClick={() => setIsReportingOpen(!isReportingOpen)}
            >
              <div className="flex items-center">
                <div className="w-[64px] flex items-center justify-center">
                  <ChartNoAxesCombined className="h-7 w-7 text-white/90" />
                </div>
                <span className="text-base font-medium">Kostenreporting</span>
              </div>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform duration-200 ml-1 mr-2",
                isReportingOpen && "transform rotate-180"
              )} />
            </Button>

            <div className={cn(
              "overflow-hidden transition-all duration-200",
              isReportingOpen ? "mt-1" : "h-0"
            )}>
              <div className="relative ml-[38px] space-y-1 pl-4 pr-10 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-px before:bg-white/20">
                {costReportingRoutes.map((route) => (
                  <Button
                    key={route.href}
                    variant="ghost"
                    className={cn(
                      "h-10 px-4",
                      "text-white/70 hover:text-white hover:bg-white/10",
                      "flex items-center justify-start",
                      "relative",
                      isActiveRoute(route.href) && [
                        "bg-white/10 text-white",
                        "before:absolute before:left-0 before:w-1 before:h-6 before:my-2 before:bg-white before:rounded-r",
                      ],
                    )}
                    asChild
                  >
                    <Link to={route.href}>
                      <span className="text-sm font-medium">
                        {route.label}
                      </span>
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-4 space-y-2 mt-auto border-t border-[#ffffff20]">
        <Button
          variant="ghost"
          className={cn(
            getButtonClasses("/settings"),
          )}
          asChild
        >
          <Link to="/settings">
            <div className="flex items-center w-full">
              <div className="w-[64px] flex items-center justify-center">
                <Settings className="h-7 w-7 text-white/90" />
              </div>
              <span className="text-base font-medium">
                Einstellungen
              </span>
            </div>
          </Link>
        </Button>

        <Button
          variant="ghost"
          className={cn(
            getButtonClasses("/help"),
          )}
          asChild
        >
          <Link to="/help">
            <div className="flex items-center w-full">
              <div className="w-[64px] flex items-center justify-center">
                <HelpCircle className="h-7 w-7 text-white/90" />
              </div>
              <span className="text-base font-medium">
                Hilfe
              </span>
            </div>
          </Link>
        </Button>

        <Button
          variant="ghost"
          className={cn(
            getButtonClasses("/user-profile"),
          )}
          asChild
        >
          <Link to="/user-profile">
            <div className="flex items-center w-full">
              <div className="w-[64px] flex items-center justify-center">
                <User className="h-7 w-7 text-white/90" />
              </div>
              <span className="text-base font-medium">
                Max Mustermann
              </span>
            </div>
          </Link>

        </Button>
      </div>
    </div>
  )
}

export default Sidebar 