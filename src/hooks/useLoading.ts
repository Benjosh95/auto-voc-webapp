import { useEffect } from 'react';
import { useStore } from "../store/useStore"

export const useLoading = (isLoading: boolean) => {
  const { setIsLoading } = useStore()
  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);
};
