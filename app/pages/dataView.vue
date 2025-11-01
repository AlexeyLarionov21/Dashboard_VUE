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

interface Props {
  id: string;
}

const props = defineProps<Props>();

const { data: products } = await useFetch("/api/products", {
  key: `products-${props.id}`,
  default: () => [],
});

console.log("Products loaded:", products.value);
</script>

<style module lang="scss" src="~/assets/css/dataView.module.scss" />
