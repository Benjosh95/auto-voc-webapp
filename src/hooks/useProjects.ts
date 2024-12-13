import { useQuery } from "@tanstack/react-query"
import API from "../api/api"
import { useDataFetching } from "./useDataFetching"
import { ERROR_FETCHING_PROJECTS } from "@/constants/messages"

interface UseQueryProps {
  filterObject?: { id?: string }
}

export const useProjects = ({ filterObject = {} }: UseQueryProps = {}) => {
  // single conceptual endpoint
  const getFilteredProjects = async () => {
    if (!filterObject || Object.keys(filterObject).length === 0) {
      // conditional api call
      return await API.getProjects()
    }
    // conditional api call
    return await API.getFilteredProjects(filterObject)
  }

  const {
    data: projects,
    isLoading: isLoadingProjects,
    refetch: refetchProjects,
    error: errorProjects,
    isError: isErrorProjects,
  } = useQuery({
    queryKey: ["projects", filterObject],
    queryFn: getFilteredProjects,
    // TODO: define fetching behavior 
  })

  // saves loading state in Zustand and handles error with a toast
  useDataFetching({ 
    isLoading: isLoadingProjects,
    isError: isErrorProjects,
    error: errorProjects,
    errorMessage: ERROR_FETCHING_PROJECTS,
  }) 

  return { projects, isLoadingProjects, refetchProjects, errorProjects }
}
