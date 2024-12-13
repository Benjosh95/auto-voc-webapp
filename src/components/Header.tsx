import CostEstimation from "./CostEstimation"
import { Button } from "@/components/ui/button"
import { useStore } from "@/store/useStore"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { FolderDot } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const Header = () => {
  const navigate = useNavigate()
  const currentProject = useStore((state) => state.currentProject)
  
  const handleProjectClick = () => {
    if (!currentProject?.id) {
      navigate("/projects")
    } else {
      navigate(`/projects/${currentProject.id}`)
    }
  }

  // Show project info if available
  const getProjectInfo = () => {
    if (currentProject) {
      const projectNumber = currentProject.projectNumber 
        ? `(${currentProject.projectNumber})` 
        : ""
      return (
        <button
          onClick={handleProjectClick}
          className={cn(
            "font-semibold text-xl text-[#003B5C] hover:text-[#003B5C]/80",
            "transition-colors duration-200",
            currentProject.id ? "cursor-pointer" : "cursor-default",
          )}
        >
          {currentProject.projectName} {projectNumber}
        </button>
      )
    }
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleProjectClick}
              className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-full border border-slate-200/50 
                shadow-sm text-slate-500 hover:bg-slate-100 transition-colors duration-200"
            >
              <FolderDot className="h-5 w-5 text-slate-400" />
              <span className="text-sm font-medium">Kein Projekt ausgewählt</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-slate-800 text-white border-none">
            <p>Wählen Sie ein Projekt aus, dass Sie verwalten möchten</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <header className="sticky top-0 z-50 h-20 border-b border-slate-200 bg-white px-6 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        {getProjectInfo()}
      </div>
      <CostEstimation />
    </header>
  )
}

export default Header 