import { ref, computed } from "vue";
import IconRequest from "@/assets/icons/menuIc.png?url";

export const routeLabels: Record<string, { label: string; icon: string }> = {
  "/": { label: "Заявки", icon: IconRequest },
  // "/settings": { label: "Настройки", icon: IconSettings },
  // "/reports": { label: "Отчеты", icon: IconReports },
} as const;

export const getPageTitle = (path: string): string => {
  return routeLabels[path]?.label || "";
};

export function useNav() {
  const route = useRoute();

  const navItems = computed(() =>
    Object.entries(routeLabels).map(([path, data]) => ({
      path,
      label: data.label,
      icon: data.icon,
    }))
  );

  const currentTitle = computed(() => getPageTitle(route.path));

  return { navItems, currentTitle };
}
