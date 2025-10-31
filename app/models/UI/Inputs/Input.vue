<template>
  <div :class="[$style.customInputWrapper, isInvalid ? $style.invalid : '']">
    <input
      ref="inputRef"
      type="text"
      :class="$style.customInput"
      :value="displayValue"
      :placeholder="placeholder"
      @input="handleInput"
      @blur="handleBlur"
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
import { ref, computed, watch, nextTick } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  type: {
    type: String,
    validator: (value: string) => ["integer", "decimal"].includes(value),
    default: "integer",
  },
});

const emit = defineEmits(["update:modelValue"]);

const inputRef = ref<HTMLInputElement | null>(null);
const isInvalid = ref(false); // чек на незаполненность

const displayValue = computed(() => {
  if (!props.modelValue && props.modelValue !== 0) return "";
  return String(props.modelValue);
});
///
const placeholder = computed(() => {
  return props.type === "integer" ? "0" : "0.00";
});
///

const validateInput = (value: string) => {
  if (value === "") return { isValid: true, value: "" };

  const decimalRegex = /^\d*\.?\d{0,2}$/;

  if (props.type === "integer") {
    const integerRegex = /^\d+$/;
    if (integerRegex.test(value)) {
      return { isValid: true, value };
    }

    const hasDecimal = value.includes(".");
    return { isValid: !hasDecimal && decimalRegex.test(value), value };
  }

  if (props.type === "decimal") {
    return { isValid: decimalRegex.test(value), value };
  }

  return { isValid: false, value };
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let inputValue = target.value;

  inputValue = inputValue.replace(/[^\d.]/g, ""); // прогон на фильтр цифр и точек

  const dotCount = (inputValue.match(/\./g) || []).length; // минус лишние точки
  if (dotCount > 1) {
    const firstDotIndex = inputValue.indexOf(".");
    inputValue =
      inputValue.substring(0, firstDotIndex + 1) +
      inputValue.substring(firstDotIndex + 1).replace(/\./g, "");
  }
  //// фильтр на 2 символа после запятьтой
  if (inputValue.includes(".")) {
    const parts = inputValue.split(".");
    if (parts[1] && parts[1].length > 2) {
      inputValue = parts[0] + "." + parts[1].substring(0, 2);
    }
  }
  ///
  const validation = validateInput(inputValue);
  emit("update:modelValue", inputValue);
  isInvalid.value = !validation.isValid;

  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.value = inputValue;
    }
  });
};

const handleBlur = () => {
  const validation = validateInput(displayValue.value); // чек на расфокус
  isInvalid.value = !validation.isValid;
};

const clearInput = () => {
  emit("update:modelValue", "");
  isInvalid.value = false;
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.focus();
    }
  });
};

watch(
  () => props.modelValue,
  (newItem) => {
    const validation = validateInput(String(newItem || ""));
    isInvalid.value = !validation.isValid;
  }
);
</script>

<style module lang="scss" src="./Input.module.scss" />
