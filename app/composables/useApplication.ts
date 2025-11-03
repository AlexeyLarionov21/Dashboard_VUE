import type { Application } from "~~/types/api";

export const useApplicationStore = () => {
  const currentApplication = useState<Application | null>(
    "currentApplication",
    () => null
  );

  const setCurrentApplication = (app: Application) => {
    currentApplication.value = app;
  };

  const getCurrentApplication = () => {
    return currentApplication.value;
  };

  const clearCurrentApplication = () => {
    currentApplication.value = null;
  };

  return {
    currentApplication: readonly(currentApplication),
    setCurrentApplication,
    getCurrentApplication,
    clearCurrentApplication,
  };
};
