<template>
  <dataView :id="id" />
</template>

<script setup lang="ts">
import dataView from "./dataView.vue";

definePageMeta({
  validate: (route) => {
    if (!route.query.id) {
      throw createError({
        statusCode: 404,
        statusMessage: "Application ID is required",
      });
    }
    return true;
  },
});

const route = useRoute();
const id = computed(() => route.query.id as string);
</script>
