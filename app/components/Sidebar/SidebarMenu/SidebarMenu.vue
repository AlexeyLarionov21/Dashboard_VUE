<template>
  <SidebarMenuItem label="Заявки" :icon="IconRequest" />
</template>

<script setup lang="ts">
import SidebarMenuItem from "./SidebarMenuItem/SidebarMenuItem.vue";
import IconRequest from "../../../assets/icons/menuIc.svg";
</script>

<style module lang="scss" src="./SidebarMenu.module.scss"></style>
