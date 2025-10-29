<template>
  <nav>
    <SidebarMenuItem
      v-for="item in navItems"
      :key="item.path"
      :to="item.path"
      :label="item.label"
      :icon="item.icon"
    />
  </nav>
</template>

<script setup lang="ts">
import SidebarMenuItem from "./SidebarMenuItem/SidebarMenuItem.vue";
import { useNav } from "@/composables/useNav";

const { navItems } = useNav();
</script>

<style module lang="scss" src="./SidebarMenu.module.scss"></style>
