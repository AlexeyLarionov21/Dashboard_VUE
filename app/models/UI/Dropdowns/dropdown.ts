import { ref, computed, watch } from "vue";
import type { Color } from "~~/types/colors";

interface Props {
  items: Color[];
  value?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: "",
});

const emit = defineEmits<{
  (e: "input", value: string): void;
  (e: "change", value: string): void;
}>();

const isOpen = ref(false);
const localValue = ref(props.value); // Локальное состояние

watch(
  () => props.value,
  (newVal) => {
    localValue.value = newVal;
  }
);

const selectedItem = computed(() => localValue.value);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  isOpen.value = false;
};

const selectItem = (item: string) => {
  localValue.value = item; // Сразу обновляем локально
  emit("input", item);
  emit("change", item);
  closeDropdown();
};

const vClickOutside = {
  mounted(el: HTMLElement, binding: any) {
    const clickHandler = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event);
      }
    };
    (el as any).clickOutsideHandler = clickHandler;
    document.body.addEventListener("click", clickHandler);
  },
  unmounted(el: HTMLElement) {
    const handler = (el as any).clickOutsideHandler;
    if (handler) {
      document.body.removeEventListener("click", handler);
    }
  },
};
