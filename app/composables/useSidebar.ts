import { ref } from "vue";

const collapsed = ref(false);
const toggle = () => (collapsed.value = !collapsed.value);

export function useSidebar() {
  return { collapsed, toggle };
}
