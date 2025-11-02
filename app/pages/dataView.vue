<template>
  <Content>
    <div :class="$style.tabContainer">
      <SaveButton />
    </div>
    <TableContainer>
      <TableData v-model:products="tableProducts" />
    </TableContainer>
  </Content>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TableContainer from "@/components/Content/TableContainer/TableContainer.vue";
import TableData from "@/components/Content/TableContainer/TableData/TableData.vue";
import SaveButton from "~/models/UI/Buttons/SaveButton/SaveButton.vue";
import type { Product } from "~~/types/product";

interface Props {
  id: string;
}

const props = defineProps<Props>();

const loadProducts = async (): Promise<Product[]> => {
  if (!localStorage.getItem(`application_${props.id}`)) {
    const productsID = (() => {
      try {
        const stored = localStorage.getItem("currentAppProducts");
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    })();

    const { data: products } = await useFetch("/api/products", {
      key: `products-${props.id}`,
      default: () => [],
    });

    const filteredProducts = products.value.filter((product) =>
      productsID.includes(product.id)
    );

    const applicationProducts: Product[] = filteredProducts.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      count: product.count,
      color: product.color,
    }));

    localStorage.setItem(
      `application_${props.id}`,
      JSON.stringify(applicationProducts)
    );

    localStorage.removeItem("currentAppProducts");
    return applicationProducts;
  } else {
    const stored = localStorage.getItem(`application_${props.id}`);
    return stored ? JSON.parse(stored) : [];
  }
};

const initialProducts = await loadProducts();
const tableProducts = ref<Product[]>(initialProducts);
</script>

<style module lang="scss" src="~/assets/css/dataView.module.scss" />
