import { useMutation, useQueryClient } from "@tanstack/react-query"
import { NewProject } from "@/types/project"
import { useDataFetching } from "./useDataFetching"
import { 
  ERROR_CREATING_PROJECT, 
  ERROR_DELETING_PROJECT, 
  ERROR_UNEXPECTED, 
  ERROR_UPDATING_PROJECT,
  SUCCESS_PROJECT_CREATED,
  SUCCESS_PROJECT_UPDATED,
  SUCCESS_PROJECT_DELETED
} from "@/constants/messages"
import API from "@/api/api"
import { useStore } from "@/store/useStore"

export const useProjectMutations = () => {
  const setCurrentProject = useStore((state) => state.setCurrentProject)
  const queryClient = useQueryClient()

  const createProjectMutation = useMutation({
    mutationFn: async (newProject: NewProject) => {
      const response = await API.createProject(newProject)
      return response
    },
    onSuccess: (createdProject) => {
      // Update global cache
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      
      // Set current project in global store
      setCurrentProject(createdProject)
    },
  })

  const updateProjectMutation = useMutation({
    mutationFn: ({ id, project }: { id: string; project: NewProject }) =>
      API.updateProject(id, project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
  })

  const deleteProjectMutation = useMutation({
    mutationFn: (projectId: string) => API.deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
  })

  // Handle loading, error and success states for all mutations
  useDataFetching({
    isLoading: 
      createProjectMutation.isPending || 
      updateProjectMutation.isPending || 
      deleteProjectMutation.isPending,
    isError: 
      createProjectMutation.isError || 
      updateProjectMutation.isError || 
      deleteProjectMutation.isError,
    error: 
      createProjectMutation.error || 
      updateProjectMutation.error || 
      deleteProjectMutation.error,
    errorMessage: 
      createProjectMutation.error ? ERROR_CREATING_PROJECT :
      updateProjectMutation.error ? ERROR_UPDATING_PROJECT :
      deleteProjectMutation.error ? ERROR_DELETING_PROJECT :
      ERROR_UNEXPECTED,
    isSuccess:
      createProjectMutation.isSuccess ||
      updateProjectMutation.isSuccess ||
      deleteProjectMutation.isSuccess,
    successMessage:
      createProjectMutation.isSuccess ? SUCCESS_PROJECT_CREATED :
      updateProjectMutation.isSuccess ? SUCCESS_PROJECT_UPDATED :
      deleteProjectMutation.isSuccess ? SUCCESS_PROJECT_DELETED :
      undefined
  })

  return {
    createProject: createProjectMutation.mutateAsync,
    updateProject: updateProjectMutation.mutate,
    deleteProject: deleteProjectMutation.mutate,
    isCreating: createProjectMutation.isPending,
    isUpdating: updateProjectMutation.isPending,
    isDeleting: deleteProjectMutation.isPending,
    createError: createProjectMutation.error,
    updateError: updateProjectMutation.error,
    deleteError: deleteProjectMutation.error,
  }
} 