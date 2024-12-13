import { NewProject, Project } from "@/types/project"
import { ERROR_CREATING_PROJECT, ERROR_UPDATING_PROJECT, ERROR_DELETING_PROJECT, ERROR_FETCHING_PROJECTS } from "@/constants/messages"

export const ProjectsAPI = {
  getProjects: async (): Promise<Project[]> => {
    try {
      const response = await fetch("http://localhost:3001/api/projects")
      if (!response.ok) {
        throw new Error(ERROR_FETCHING_PROJECTS)
      }
      return response.json()
    } catch (error) {
      throw new Error(ERROR_FETCHING_PROJECTS)
    }
  },

  getFilteredProjects: async (filters: { id?: string } = {}): Promise<Project[]> => {
    try {
      const queryParams = new URLSearchParams()
      let url = "http://localhost:3001/api/projects"

      if (filters.id) {
        url = `${url}/${filters.id}`
      }

      const finalUrl = queryParams.toString() ? `${url}?${queryParams.toString()}` : url

      const response = await fetch(finalUrl)
      if (!response.ok) {
        throw new Error(ERROR_FETCHING_PROJECTS)
      }
      return response.json()
    } catch (error) {
      throw new Error(ERROR_FETCHING_PROJECTS)
    }
  },

  createProject: async (newProject: NewProject): Promise<Project> => {
    try {
      const response = await fetch("http://localhost:3001/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      })

      if (!response.ok) {
        // Try to get error message from response
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || ERROR_CREATING_PROJECT)
      }

      return response.json()
    } catch (error) {
      // If it's already our custom error message, rethrow it
      if (error instanceof Error && error.message !== 'Failed to fetch') {
        throw error
      }
      // Otherwise, throw our custom error message
      throw new Error(ERROR_CREATING_PROJECT)
    }
  },

  updateProject: async (id: string, project: NewProject): Promise<Project> => {
    try {
      const response = await fetch(`http://localhost:3001/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || ERROR_UPDATING_PROJECT)
      }

      return response.json()
    } catch (error) {
      if (error instanceof Error && error.message !== 'Failed to fetch') {
        throw error
      }
      throw new Error(ERROR_UPDATING_PROJECT)
    }
  },

  deleteProject: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:3001/api/projects/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || ERROR_DELETING_PROJECT)
      }
    } catch (error) {
      if (error instanceof Error && error.message !== 'Failed to fetch') {
        throw error
      }
      throw new Error(ERROR_DELETING_PROJECT)
    }
  },
}
