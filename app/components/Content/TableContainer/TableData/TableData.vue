<script setup lang="ts">
import { dataColor } from "~~/types/colors";
import Dropdown from "~/models/UI/Dropdowns/Dropdown.vue";
import Input from "~/models/UI/Inputs/Input.vue";
import { ref } from "vue";

const selectedColor = ref(dataColor[0] || "");
const count = ref("");
const price = ref("");

interface Props {
  products: any[];
}
</script>

<template>
  <table :class="[common.table, local.table]">
    <thead>
      <tr>
        <th>Название</th>
        <th>Количество</th>
        <th>Цена</th>
        <th>Цвет</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>iPhone 16 Pro Max 256</td>
        <td><Input v-model="count" type="count" /></td>
        <td><Input v-model="price" type="price" /></td>
        <td>
          <client-only>
            <Dropdown :items="dataColor" v-model="selectedColor" />
          </client-only>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style
  module="common"
  lang="scss"
  src="@/components/shared/TableCommon.module.scss"
></style>

<style module="local" lang="scss" src="./TableData.module.scss" />
