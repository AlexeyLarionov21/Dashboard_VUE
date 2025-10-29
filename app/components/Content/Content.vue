<template>
  <section :class="$style.content">
    <Header />
    <TableContainer />
  </section>
</template>

<style module lang="scss" src="./Content.module.scss" />

<script setup lang="ts">
import Header from "./Header/Header.vue";
import TableContainer from "./TableContainer/TableContainer.vue";
</script>
