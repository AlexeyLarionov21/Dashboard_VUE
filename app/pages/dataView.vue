<template>
  <Content>
    <div :class="$style.tabContainer">
      <SaveButton />
    </div>
    <TableContainer>
      <TableData />
    </TableContainer>
  </Content>
</template>

<script setup lang="ts">
import TableContainer from "@/components/Content/TableContainer/TableContainer.vue";
import TableData from "@/components/Content/TableContainer/TableData/TableData.vue";
import SaveButton from "~/models/UI/Buttons/SaveButton/SaveButton.vue";
</script>

<style module lang="scss" src="~/assets/css/dataView.module.scss" />
