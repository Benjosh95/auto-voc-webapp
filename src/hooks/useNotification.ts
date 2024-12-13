import { useToast } from "@/components/hooks/use-toast"
import { CustomError } from "@/types/error"
import React from "react"

type NotificationType = "success" | "error" | "warning" | "info"

interface UseNotificationProps {
  isError?: boolean
  error?: CustomError | null
  errorMessage?: string
  isSuccess?: boolean
  successMessage?: string
}

export const useNotification = ({
  isError,
  error,
  errorMessage,
  isSuccess,
  successMessage,
}: UseNotificationProps) => {
  const { toast } = useToast()

  const showNotification = (
    message: string,
    type: NotificationType = "info"
  ) => {
    const variants = {
      success: "success",
      error: "destructive",
      warning: "default",
      info: "default",
    } as const

    toast({
      title: type.charAt(0).toUpperCase() + type.slice(1),
      description: message,
      variant: variants[type],
      duration: type === 'success' ? 3000 : 5000,
    })
  }

  // Move the notification logic into useEffect to prevent infinite renders
  React.useEffect(() => {
    // Handle Error Notifications
    if (isError && errorMessage) {
      const finalErrorMessage = error?.message || errorMessage
      showNotification(finalErrorMessage, "error")
    }

    // Handle Success Notifications
    if (isSuccess && successMessage) {
      showNotification(successMessage, "success")
    }
  }, [isError, error, errorMessage, isSuccess, successMessage])

  return { showNotification }
} 