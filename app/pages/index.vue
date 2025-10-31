<template>
  <Content>
    <TableContainer>
      <Table />
    </TableContainer>
  </Content>
</template>

<script setup lang="ts">
import TableContainer from "~/components/Content/TableContainer/TableContainer.vue";
import Table from "~/components/Content/TableContainer/Table/Table.vue";

definePageMeta({ layout: "sidebar" });
</script>
