<template>
  <span :class="[$style.label, $style[variant]]">
    <slot>{{ textMap[variant] }}</slot>
  </span>
</template>

<script setup lang="ts">
import type { ApplicationStatus } from "../../../../types/api";

type Variant = ApplicationStatus;

const textMap: Record<Variant, string> = {
  draft: "Активна",
};

const props = withDefaults(
  defineProps<{
    variant?: Variant;
  }>(),
  {
    variant: "draft",
  }
);
</script>

<style module src="./label.module.scss" lang="scss"></style>
