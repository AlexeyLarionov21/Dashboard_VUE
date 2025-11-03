import type { PresendApplication, PresendStorage } from "~~/types/presend";

export const usePresendStorage = () => {
  const getPresendApplications = (): PresendStorage => {
    if (typeof window === "undefined") return {};
    try {
      const presend = localStorage.getItem("presend");
      return presend ? JSON.parse(presend) : {};
    } catch {
      return {};
    }
  };

  const updatePresendStorage = (appData: PresendApplication): void => {
    if (typeof window === "undefined") return;

    const presend = getPresendApplications();
    presend[appData.id] = appData;

    localStorage.setItem("presend", JSON.stringify(presend));
  };

  const removeFromPresend = (appID: number): void => {
    if (typeof window === "undefined") return;

    const presend = getPresendApplications();
    delete presend[appID];

    localStorage.setItem("presend", JSON.stringify(presend));
  };

  return {
    getPresendApplications,
    updatePresendStorage,
    removeFromPresend,
  };
};
