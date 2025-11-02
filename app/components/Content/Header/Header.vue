<template>
  <section :class="$style.header">
    <div :class="$style.container">
      <div :class="$style.buttonLeftContainer" v-if="$route.path !== '/'">
        <button
          :class="$style.backButton"
          aria-label="Come back to home"
          @click="$router.push('/')"
        >
          <IconBack :class="$style.icon" />
        </button>
      </div>
      <h2 :class="$style.label">{{ currentTitle || "Товары" }}</h2>
    </div>
  </section>
</template>

<style module lang="scss" src="./Header.module.scss" />

<script setup lang="ts">
import { useNav } from "@/composables/useNav";
import IconBack from "@/assets/icons/arrow_left.svg";

const { currentTitle } = useNav();
</script>
