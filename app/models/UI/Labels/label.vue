<template>
  <span :class="[$style.label, $style[variant]]">
    <slot>{{ textMap[variant] }}</slot>
  </span>
</template>

<script setup lang="ts">
type Variant = "active" | "closed" | "canceled";
const textMap: Record<Variant, string> = {
  active: "Активна",
  closed: "Закрыта",
  canceled: "Отменена",
};

const props = withDefaults(
  defineProps<{
    variant?: Variant;
  }>(),
  {
    variant: "active",
  }
);
</script>

<style module src="./label.module.scss" lang="scss"></style>
