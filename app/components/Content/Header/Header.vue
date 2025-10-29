<template>
  <section :class="$style.header">
    <div :class="$style.container">
      <h2 :class="$style.label">{{ currentTitle }}</h2>
    </div>
  </section>
</template>

<style module lang="scss" src="./Header.module.scss" />

<script setup lang="ts">
import { useNav } from "@/composables/useNav";

const { currentTitle } = useNav();
</script>
