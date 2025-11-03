<script setup lang="ts">
const props = defineProps<{
  onClick?: () => void;
}>();
</script>

<template>
  <button :class="$style.btnSave" @click="props.onClick">Сохранить</button>
</template>

<style module lang="scss" src="./SaveButton.module.scss" />
