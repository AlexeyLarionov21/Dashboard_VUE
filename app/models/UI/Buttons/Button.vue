<template>
  <button
    :class="[$style.button, isSend ? $style.send : $style.edit]"
    @click="onClick?.()"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  isSend?: boolean;
  onClick?: () => void;
}
defineProps<Props>();
</script>

<style module lang="scss" src="./Button.module.scss"></style>
