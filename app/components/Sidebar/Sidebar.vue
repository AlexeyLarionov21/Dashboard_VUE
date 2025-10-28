<template>
  <aside :class="[$style.sidebar, collapsed && $style.collapsed]">
    <div :class="$style.logoContainer">
      <button
        type="button"
        :class="$style.buttonCollapse"
        aria-label="Свернуть/развернуть меню"
        @click="toggle()"
      >
        <svg
          :class="[$style.icon, collapsed && $style.rotated]"
          viewBox="0 0 24 24"
          width="20"
          height="20"
        >
          <path
            d="M14.7 6.3a1 1 0 0 1 0 1.4L10.4 12l4.3 4.3a1 1 0 0 1-1.4 1.4l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 0 1 1.4 0z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
    <SidebarMenu />
  </aside>
</template>

<script setup lang="ts">
import { provide } from "vue";
import { useSidebar } from "@/composables/useSidebar";
import SidebarMenu from "./SidebarMenu/SidebarMenu.vue";

const { collapsed, toggle } = useSidebar();

provide("sidebarContext", { collapsed, toggle });
</script>

<style module lang="scss" src="./Sidebar.module.scss"></style>
