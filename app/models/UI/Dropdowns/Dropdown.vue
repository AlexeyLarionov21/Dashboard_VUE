<template>
  <div :class="$style.wrap" v-click-outside="closeDropdown">
    <button
      :class="$style.dropdown"
      @click="toggleDropdown"
      @keydown.esc="closeDropdown"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
    >
      <span>{{ selectedItemDisplay }}</span>
      <svg
        :class="isOpen ? [$style.chevron, $style.rotated] : $style.chevron"
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        <path d="M4 6L8 10L12 6" stroke="currentColor" fill="none" />
      </svg>
    </button>

    <div
      v-if="isOpen"
      :class="$style.menu"
      role="listbox"
      aria-labelledby="dropdown-label"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        role="option"
        :aria-selected="item.id === selectedItem"
        :class="
          item.id === selectedItem
            ? [$style['option'], $style['is-selected']]
            : $style.option
        "
        @click="selectItem(item)"
        @keydown.enter="selectItem(item)"
        @keydown.space="selectItem(item)"
        tabindex="0"
      >
        <span :class="$style['option-content']">
          {{ item }}
          <svg
            v-if="item.id === selectedItem"
            :class="$style.checkmark"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M13.3334 4L6.00008 11.3333L2.66675 8"
              stroke="#ff8800"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { Color } from "~~/types/colors";

interface Props {
  items: Color[];
  currentItem?: string;
}

const props = withDefaults(defineProps<Props>(), {
  currentItem: "",
});

const isOpen = ref(false);
const localItem = ref(props.currentItem);

/////
const emit = defineEmits<{
  (e: "inputEvent", value: string): void;
  (e: "changeItem", value: string): void;
  (e: "validation", value: boolean): void;
}>();

watch(
  () => props.currentItem,
  (newItem) => {
    localItem.value = newItem;
  }
);
////

const selectedItemDisplay = computed(() => {
  const found = props.items.find((item) => item.id === localItem.value);
  return found ? found.name : "Select";
});

const selectedItem = computed(() => localItem.value);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  isOpen.value = false;
};

const selectItem = (item: Color) => {
  localItem.value = item.id;
  emit("inputEvent", item.id);
  emit("changeItem", item.id);
  closeDropdown(); //
};
///
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
///
</script>

<style module lang="scss" src="./Dropdown.module.scss"></style>
