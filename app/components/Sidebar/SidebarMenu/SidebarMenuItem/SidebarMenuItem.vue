<template>
  <NuxtLink :to="to" :class="$style.item" aria-label="Перейти в раздел">
    <div :class="$style.row">
      <span :class="$style.bar" aria-hidden="true"></span>
      <div :class="$style.content">
        <div :class="[$style.iconWrap, collapsed && $style.collapsed]">
          <div :class="$style.iconContainer">
            <img :src="icon" :alt="label" :class="$style.icon" />
          </div>
        </div>
        <span :class="$style.label" v-if="!collapsed">{{
          label || "label"
        }}</span>
      </div>
      <!-- контейнер -->
    </div>
    <!-- Ячейка -->
  </NuxtLink>
</template>

<script setup lang="ts">
import { inject, ref, type Ref } from "vue";

interface Props {
  label: string;
  to: string;
  icon?: string;
}
defineProps<Props>();

const sidebarContext = inject<{ collapsed: Ref<boolean>; toggle: () => void }>(
  "sidebarContext"
);
const collapsed = sidebarContext?.collapsed ?? ref(false);
</script>

<style module lang="scss" src="./SidebarMenuItem.module.scss"></style>
