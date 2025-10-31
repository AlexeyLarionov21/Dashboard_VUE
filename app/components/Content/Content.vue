<template>
  <section :class="$style.content">
    <Header />
    <div v-if="$slots.actions">
      <slot name="actions" />
    </div>
    <div :class="$style.body">
      <slot />
    </div>
  </section>
</template>

<style module lang="scss" src="./Content.module.scss" />

<script setup lang="ts">
import Header from "./Header/Header.vue";
</script>
