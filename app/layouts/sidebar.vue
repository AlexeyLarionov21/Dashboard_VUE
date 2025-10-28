<template>
  <div class="app-shell">
    <div :class="['app-layout', collapsed && 'is-collapsed']">
      <Sidebar />
      <main class="layout__content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import { useSidebar } from "@/composables/useSidebar";

const { collapsed } = useSidebar();
</script>
