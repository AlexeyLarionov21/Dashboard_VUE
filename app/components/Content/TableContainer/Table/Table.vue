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
          <tr v-for="app in applications" :key="app.id">
            <td>{{ app.id }}</td>
            <td><Label variant="draft" /></td>
            <td :class="local.tdResult">В обработке</td>
            <td>{{ formatDate(app.createdAt) }}</td>
            <td>
              <Button
                :variant="app.isPublished ? 'presend' : 'edit'"
                :label="!app.isPublished ? 'Редактировать' : 'Отправить'"
                :isSend="app.status === 'draft'"
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

const { data: applications, pending } = await useFetch<Application[]>(
  "/api/table-data",
  { default: () => [] }
);

const handleButtonClick = (app: Application) => {
  if (!app.isPublished) {
    navigateTo(`/edit?id=${app.id}`);
  } else {
    //  отправка заявки
    // sendApplication
    console.log("отправка заявки", app.id);
  }
};

// const sendApplication = (app_id: number) => {
//   console.log(app_id);
// };

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
