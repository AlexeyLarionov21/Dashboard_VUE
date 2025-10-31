<script setup lang="ts"></script>

<template>
  <div :class="$style.tableContainer">
    <slot />
  </div>
</template>

<style module lang="scss" src="./TableContainer.module.scss" />
