<template>
  <Content>
    <div :class="$style.tabContainer">
      <SaveButton :onClick="handleSave" />
    </div>
    <TableContainer>
      <TableData
        v-model:products="tableProducts"
        :validationErrors="validationErrors"
      />
    </TableContainer>
  </Content>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import TableContainer from "@/components/Content/TableContainer/TableContainer.vue";
import TableData from "@/components/Content/TableContainer/TableData/TableData.vue";
import SaveButton from "~/models/UI/Buttons/SaveButton/SaveButton.vue";
import type { Product } from "~~/types/product";
import { validateProducts, type ValidationError } from "~~/types/validation";
import { usePresendStorage } from "~/composables/usePresendStorage";
import type { PresendApplication } from "~~/types/presend";

interface Props {
  id: string;
}

const props = defineProps<Props>();
const router = useRouter();
const applicationStore = useApplicationStore();

const validationErrors = ref<ValidationError[]>([]);
const tableProducts = ref<Product[]>([]);

const { updatePresendStorage } = usePresendStorage();

onMounted(async () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(`application_${props.id}`);
    if (stored) {
      tableProducts.value = JSON.parse(stored);
      return;
    }
  }

  const application = applicationStore.getCurrentApplication();
  const productsID = application?.productsID || [];
  if (productsID.length === 0) {
    tableProducts.value = [];
    return;
  }

  const { data: products } = await useFetch("/api/products", {
    key: `products-${props.id}`,
    default: () => [],
  });

  const filteredProducts = products.value
    .filter((product) => productsID.includes(product.id))
    .map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      count: product.count,
      color: product.color,
    }));

  tableProducts.value = filteredProducts;

  if (typeof window !== "undefined") {
    localStorage.setItem(
      `application_${props.id}`,
      JSON.stringify(filteredProducts)
    );
  }

  applicationStore.clearCurrentApplication();
});

// кнопка
const handleSave = (): void => {
  const validationResult = validateProducts(tableProducts.value);
  validationErrors.value = validationResult.errors;

  if (typeof window !== "undefined") {
    localStorage.setItem(
      `application_${props.id}`,
      JSON.stringify(tableProducts.value)
    );
  }

  if (validationResult.isValid) {
    const application = applicationStore.getCurrentApplication();

    const presendData: PresendApplication = {
      id: parseInt(props.id),
      isPublished: true,
      products: tableProducts.value,
      status: application?.status ?? "draft",
      createdAt: application?.createdAt ?? new Date().toISOString(),
    };

    updatePresendStorage(presendData);

    try {
      localStorage.removeItem(`application_${props.id}`);
    } catch {}

    router.push("/");
  }
};
</script>

<style module lang="scss" src="~/assets/css/dataView.module.scss" />
