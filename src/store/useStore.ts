import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { Project } from "@/types/project"

interface ProjectState {
  currentProject: Project | null
  setCurrentProject: (project: Project | null) => void
}

interface UIState {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  isSidebarOpen: boolean
  setSidebarOpen: (isOpen: boolean) => void
}

type StoreState = UIState & ProjectState

export const useStore = create<StoreState>()(
  devtools(
    (set) => ({
      // UI State
      isLoading: false,
      setIsLoading: (isLoading) => 
        set({ isLoading }, false, { type: 'setIsLoading', loading: isLoading }),
      isSidebarOpen: false,
      setSidebarOpen: (isOpen) => 
        set({ isSidebarOpen: isOpen }, false, { type: 'setSidebarOpen', isOpen }),
      
      // Project State
      currentProject: null,
      setCurrentProject: (project) => 
        set({ currentProject: project }, false, { type: 'setCurrentProject', project }),
    }),
    {
      name: "App Store",
      enabled: process.env.NODE_ENV === "development",
    }
  )
)
