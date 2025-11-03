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
import type { Application } from "~~/types/api";

interface Props {
  id: string;
}

const props = defineProps<Props>();
const router = useRouter();
const applicationStore = useApplicationStore();

const validationErrors = ref<ValidationError[]>([]);
const tableProducts = ref<Product[]>([]);

const { updatePresendStorage } = usePresendStorage();

const loadData = async (): Promise<void> => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(`application_${props.id}`);
    if (stored) {
      try {
        const parsed: Product[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          tableProducts.value = parsed;
          return;
        }
      } catch (error) {
        console.error("Error parsing stored data:", error);
      }
    }
  }

  let application: Application | null =
    applicationStore.getCurrentApplication();
  const productsID = application?.productsID || [];

  if (productsID.length === 0) {
    tableProducts.value = [];
    return;
  }

  try {
    let productsData: Product[] = [];

    try {
      const { data: products } = await useFetch<Product[]>("/api/products", {
        key: `products-${props.id}`,
        default: () => [],
        server: false,
      });
      productsData = products.value || [];
    } catch (apiError) {
      console.log("API failed, trying static JSON...", apiError);

      const config = useRuntimeConfig();
      const staticProducts = await $fetch<Product[]>(
        `${config.public.baseURL || ""}/api/products.json`
      );
      productsData = staticProducts;
    }

    const filteredProducts = productsData
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
  } catch (error) {
    console.error("All data loading methods failed:", error);
    tableProducts.value = [];
  }

  applicationStore.clearCurrentApplication();
};

onMounted(() => {
  loadData();
});

// кнопка сохранения
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
    } catch (error) {
      console.error("Error removing localStorage item:", error);
    }

    router.push("/");
  }
};
</script>

<style module lang="scss" src="~/assets/css/dataView.module.scss" />
