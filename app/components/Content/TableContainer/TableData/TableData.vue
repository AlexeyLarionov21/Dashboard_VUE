<script setup lang="ts">
import { ref } from "vue";
import { dataColor } from "~~/types/colors";
import Dropdown from "~/models/UI/Dropdowns/Dropdown.vue";
import Input from "~/models/UI/Inputs/Input.vue";
import type { Product } from "~~/types/product";
import type { ValidationError } from "~~/types/validation";

interface Props {
  products: Product[];
  validationErrors?: ValidationError[];
}

const props = withDefaults(defineProps<Props>(), {
  validationErrors: () => [],
});

const emit = defineEmits<{
  "update:products": [products: Product[]];
}>();

const countRawValues = ref<Record<number, string>>({});

//чек на ошибки
const isFieldInvalid = (
  productId: number,
  field: "count" | "price" | "color"
) => {
  return props.validationErrors.some(
    (error) => error.productId === productId && error.field === field
  );
};
//////////

const updateCount = (productId: number, value: string) => {
  if (value === "" || value === ".") {
    delete countRawValues.value[productId];
  } else {
    countRawValues.value[productId] = value;
  }

  const updated = props.products.map((product) => {
    if (product.id === productId) {
      if (value === "" || value === ".") {
        return { ...product, count: null };
      }
      // если точка, сейв как нан
      if (value.includes(".")) {
        return { ...product, count: NaN };
      }
      return { ...product, count: parseInt(value) || 0 };
    }
    return product;
  });
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
              countRawValues[product.id] !== undefined
                ? countRawValues[product.id]
                : product.count === null || product.count === 0 || isNaN(product.count as number)
                  ? ''
                  : product.count.toString()
            "
            v-on:update:model-value="(value) => updateCount(product.id, value)"
            type="count"
            :externalInvalid="isFieldInvalid(product.id, 'count')"
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
            :externalInvalid="isFieldInvalid(product.id, 'price')"
          />
        </td>
        <td>
          <client-only>
            <Dropdown
              :items="dataColor"
              :currentItem="product.color"
              v-on:change-item="(colorId: string) => updateColor(product.id, colorId)"
              :externalInvalid="isFieldInvalid(product.id, 'color')"
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
