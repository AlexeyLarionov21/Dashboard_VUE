<script setup lang="ts">
import { dataColor } from "~~/types/colors";
import Dropdown from "~/models/UI/Dropdowns/Dropdown.vue";
import Input from "~/models/UI/Inputs/Input.vue";
import type { Product } from "~~/types/product";

interface Props {
  products: Product[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  "update:products": [products: Product[]];
}>();

const updateCount = (productId: number, value: string) => {
  // Проверка на дробь для count - если есть точка, не сохраняем
  if (value.includes(".")) {
    return;
  }
  
  const updated = props.products.map((product) =>
    product.id === productId
      ? { ...product, count: value === "" ? null : parseInt(value) || 0 }
      : product
  );
  emit("update:products", updated);
};

const updatePrice = (productId: number, value: string) => {
  const updated = props.products.map((product) =>
    product.id === productId
      ? { ...product, price: value === "" ? null : parseFloat(value) || 0 }
      : product
  );
  emit("update:products", updated);
};

const updateColor = (productId: number, colorId: string) => {
  const updated = props.products.map((product) =>
    product.id === productId ? { ...product, color: colorId } : product
  );
  emit("update:products", updated);
};
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
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.name }}</td>
        <td>
          <Input
            :modelValue="
              product.count === null || product.count === 0
                ? ''
                : product.count.toString()
            "
            v-on:update:model-value="(value) => updateCount(product.id, value)"
            type="count"
          />
        </td>
        <td>
          <Input
            :modelValue="
              product.price === null || product.price === 0
                ? ''
                : product.price.toString()
            "
            v-on:update:model-value="(value) => updatePrice(product.id, value)"
            type="price"
          />
        </td>
        <td>
          <client-only>
            <Dropdown
              :items="dataColor"
              :currentItem="product.color"
              v-on:change-item="(colorId: string) => updateColor(product.id, colorId)"
            />
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
