<template>
  <div
    :class="[
      $style.customInputWrapper,
      props.externalInvalid ? $style.invalid : '',
    ]"
  >
    <input
      ref="inputRef"
      type="text"
      :class="$style.customInput"
      :value="displayValue"
      :placeholder="placeholder"
      @input="handleInput"
    />
    <button
      v-if="displayValue"
      :class="$style.clearButton"
      @click="clearInput"
      type="button"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M15 1L1 15M1 1L15 15"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  type: {
    type: String,
    validator: (value: string) => ["count", "price"].includes(value),
    default: "count",
  },
  externalInvalid: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const inputRef = ref<HTMLInputElement | null>(null);

const displayValue = computed(() => {
  if (!props.modelValue && props.modelValue !== 0 && props.modelValue !== "0")
    return "";
  return String(props.modelValue);
});
///
const placeholder = computed(() => {
  return props.type === "count" ? "0" : "0.00";
});
///

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let inputValue = target.value;

  inputValue = inputValue.replace(/[^\d.]/g, "");

  const dotCount = (inputValue.match(/\./g) || []).length;
  if (dotCount > 1) {
    const firstDotIndex = inputValue.indexOf(".");
    inputValue =
      inputValue.substring(0, firstDotIndex + 1) +
      inputValue.substring(firstDotIndex + 1).replace(/\./g, "");
  }
  // Ограничение на 2 символа после точки для price
  if (inputValue.includes(".")) {
    const parts = inputValue.split(".");
    if (parts[1] && parts[1].length > 2) {
      inputValue = parts[0] + "." + parts[1].substring(0, 2);
    }
  }

  emit("update:modelValue", inputValue);

  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.value = inputValue;
    }
  });
};

const clearInput = () => {
  emit("update:modelValue", "");
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.focus();
    }
  });
};
</script>

<style module lang="scss" src="./Input.module.scss" />
