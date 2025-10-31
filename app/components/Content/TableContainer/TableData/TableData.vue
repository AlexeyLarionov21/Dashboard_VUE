<script setup lang="ts">
import { dataColor } from "~/composables/data";
import Dropdown from "~/models/UI/Dropdowns/Dropdown.vue";
import Input from "~/models/UI/Inputs/Input.vue";
import { ref } from "vue";

const selectedColor = ref(dataColor[0] || "");
const integerValue = ref("");
const decimalValue = ref("");
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
        <td><Input v-model="integerValue" type="integer" /></td>
        <td><Input v-model="decimalValue" type="decimal" /></td>
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
