<template>
  <table :class="[common.table, local.table]">
    <thead>
      <tr>
        <th>Номер</th>
        <th>Статус</th>
        <th>Результат</th>
        <th>Дата</th>
        <th>Действие</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="pending">
        <td colspan="5">
          <h3>Загрузка..</h3>
        </td>
      </tr>
      <template v-else>
        <client-only>
          <tr v-for="app in combinedApps" :key="app.id">
            <td>{{ app.id }}</td>
            <td><Label variant="draft" /></td>
            <td :class="local.tdResult">В обработке</td>
            <td>{{ formatDate(app.createdAt) }}</td>
            <td>
              <Button
                :variant="app.isPublished ? 'presend' : 'edit'"
                :label="!app.isPublished ? 'Редактировать' : 'Отправить'"
                :onClick="() => handleButtonClick(app)"
              />
              <!--  :onClick="() => app.status === 'draft' && sendApplication(app.id)" -->
            </td>
          </tr>
        </client-only>
      </template>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import Label from "~/models/UI/Labels/label.vue";
import Button from "~/models/UI/Buttons/Button.vue";
import type { Application } from "../../../../../types/api";
import { useApplicationStore } from "@/composables/useApplication";
import { usePresendStorage } from "@/composables/usePresendStorage";

const { getPresendApplications, removeFromPresend } = usePresendStorage();

const router = useRouter();
const applicationStore = useApplicationStore();

const {
  data: applications,
  pending,
  refresh,
} = await useFetch<Application[]>("/api/table-data", { default: () => [] });

const presendApps = ref(getPresendApplications());

const combinedApps = computed(() => {
  return applications.value.map((app) => {
    const presendApp = presendApps.value[app.id];
    if (presendApp) {
      return {
        ...app,
        isPublished: true,
      };
    }
    return app;
  });
});

const handleButtonClick = async (app: Application): Promise<void> => {
  if (!app.isPublished) {
    applicationStore.setCurrentApplication(app);
    await nextTick();
    await router.push(`/edit?id=${app.id}`);
  } else {
    //  отправка заявки
    await sendApplication(app);
    console.log("отправка заявки", app.id);
  }
};

const sendApplication = async (app: Application): Promise<void> => {
  try {
    const response = await $fetch("/api/send", {
      method: "POST",
    });

    removeFromPresend(app.id);

    presendApps.value = getPresendApplications();

    alert("Заявка отправлена");

    // удалить строку из таблицы
    applications.value = (applications.value || []).filter(
      (app_filter) => app_filter.id !== app.id
    );
  } catch (error) {
    alert("ошибка");
    console.error("ошибка отправки", error);
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
</script>

<style
  module="common"
  lang="scss"
  src="@/components/shared/TableCommon.module.scss"
></style>

<style module="local" lang="scss" src="./Table.module.scss" />
