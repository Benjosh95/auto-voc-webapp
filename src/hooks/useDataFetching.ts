import { CustomError } from "@/types/error"
import { useNotification } from "./useNotification"
import { useLoading } from "./useLoading"

interface UseDataFetchingParams {
  isLoading: boolean
  isError: boolean
  error: CustomError | null
  errorMessage: string
  isSuccess?: boolean
  successMessage?: string
}

export const useDataFetching = ({ 
  isLoading, 
  isError, 
  error, 
  errorMessage,
  isSuccess,
  successMessage 
}: UseDataFetchingParams) => {
  useNotification({ isError, error, errorMessage, isSuccess, successMessage })
  useLoading(isLoading)
}
