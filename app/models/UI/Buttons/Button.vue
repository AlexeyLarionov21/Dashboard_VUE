<template>
  <button :class="[$style.button, $style[variant]]" @click="onClick?.()">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  variant?: "edit" | "presend";
  isSend?: boolean;
  onClick?: () => void;
}

withDefaults(defineProps<Props>(), {
  variant: "edit",
});
</script>

<style module lang="scss" src="./Button.module.scss"></style>
