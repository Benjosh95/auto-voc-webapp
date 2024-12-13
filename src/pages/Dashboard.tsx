import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Star, 
  Clock, 
  Bell, 
  ArrowUpCircle, 
  ChevronRight,
  StarOff,
  ArrowRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

// Mock data - replace with real data later
const favoriteProjects = [
  { id: "1", name: "Pipeline Erweiterung Nord", projectNumber: "MR-23001", hasUpdate: true },
  { id: "2", name: "Verdichterstation Upgrade", projectNumber: "MR-23002", hasUpdate: false },
  { id: "3", name: "Leitungssanierung Süd", projectNumber: "MR-23003", hasUpdate: true },
]

const recentProjects = [
  { 
    id: "4", 
    name: "Netzausbau West", 
    projectNumber: "MR-23004", 
    lastModified: "vor 2 Stunden",
    modifiedBy: "Thomas Schmidt"
  },
  { 
    id: "5", 
    name: "Stationsmodernisierung", 
    projectNumber: "MR-23005", 
    lastModified: "vor 5 Stunden",
    modifiedBy: "Anna Müller"
  },
]

const notifications = [
  { 
    id: "1",
    projectId: "1",
    projectName: "Pipeline Erweiterung Nord",
    projectNumber: "MR-23001",
    type: "update",
    message: "Neue Version (2.1) verfügbar",
    timestamp: "vor 1 Tag"
  },
  { 
    id: "2",
    projectId: "3",
    projectName: "Leitungssanierung Süd",
    projectNumber: "MR-23003",
    type: "update",
    message: "Neue Version (1.5) verfügbar",
    timestamp: "vor 2 Tagen"
  },
]

const Dashboard = () => {
  return (
    <div className="px-2 max-w-[1600px] mx-auto">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Breadcrumb
            items={[
              { label: "Dashboard" }
            ]}
          />
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Favorite Projects Card */}
          <Card className="shadow-[0_8px_30px_rgb(0,60,116,0.12)] hover:shadow-[0_20px_50px_rgb(0,60,116,0.25)] 
            transition-all duration-500 bg-white/80 backdrop-blur-sm border border-slate-200/50">
            <CardHeader className="flex flex-row items-center justify-between px-8 py-6">
              <CardTitle className="text-xl font-medium text-[#003B5C] flex items-center gap-2">
                <Star className="h-5 w-5" />
                Favorisierte Projekte
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-[#003B5C]" asChild>
                <Link to="/projects">
                  Alle anzeigen
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="space-y-4">
                {favoriteProjects.map((project) => (
                  <div 
                    key={project.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <StarOff className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-pointer" />
                      <div>
                        <Link 
                          to={`/projects/${project.id}`}
                          className="font-medium text-[#003B5C] hover:text-[#003B5C]/80 transition-colors"
                        >
                          {project.name}
                        </Link>
                        <div className="text-sm text-slate-500">{project.projectNumber}</div>
                      </div>
                    </div>
                    {project.hasUpdate && (
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                        Update verfügbar
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Projects Card */}
          <Card className="shadow-[0_8px_30px_rgb(0,60,116,0.12)] hover:shadow-[0_20px_50px_rgb(0,60,116,0.25)] 
            transition-all duration-500 bg-white/80 backdrop-blur-sm border border-slate-200/50">
            <CardHeader className="flex flex-row items-center justify-between px-8 py-6">
              <CardTitle className="text-xl font-medium text-[#003B5C] flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Zuletzt bearbeitet
              </CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div 
                    key={project.id}
                    className="p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <Link 
                      to={`/projects/${project.id}`}
                      className="font-medium text-[#003B5C] hover:text-[#003B5C]/80 transition-colors"
                    >
                      {project.name}
                    </Link>
                    <div className="text-sm text-slate-500 mt-1">{project.projectNumber}</div>
                    <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                      <span>{project.lastModified}</span>
                      <span>•</span>
                      <span>{project.modifiedBy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notifications Card */}
          <Card className="shadow-[0_8px_30px_rgb(0,60,116,0.12)] hover:shadow-[0_20px_50px_rgb(0,60,116,0.25)] 
            transition-all duration-500 bg-white/80 backdrop-blur-sm border border-slate-200/50">
            <CardHeader className="flex flex-row items-center justify-between px-8 py-6">
              <CardTitle className="text-xl font-medium text-[#003B5C] flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Benachrichtigungen
              </CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className="p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <ArrowUpCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <Link 
                          to={`/projects/${notification.projectId}`}
                          className="font-medium text-[#003B5C] hover:text-[#003B5C]/80 transition-colors"
                        >
                          {notification.projectName}
                        </Link>
                        <div className="text-sm text-slate-500">{notification.projectNumber}</div>
                        <div className="mt-1 text-sm text-slate-600">{notification.message}</div>
                        <div className="mt-2 text-sm text-slate-500">{notification.timestamp}</div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-600" asChild>
                        <Link to={`/projects/${notification.projectId}`}>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
