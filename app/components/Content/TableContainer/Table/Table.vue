<template>
  <table :class="$style.table">
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
      <tr>
        <td>25-135443</td>
        <td><Label variant="closed" /></td>
        <td :class="$style.tdResult">В обработке</td>
        <td>Aug 16, 2025</td>
        <td>
          <Button
            label="Отправить"
            :isSend="true"
            :onClick="() => console.log('click')"
          />
        </td>
      </tr>
      <tr>
        <td>25-135443</td>
        <td><Label variant="canceled" /></td>
        <td :class="$style.tdResult">В обработке</td>
        <td>Aug 16, 2025</td>
        <td>
          <Button
            label="Редактировать"
            :isSend="false"
            :onClick="() => console.log('click')"
          />
        </td>
      </tr>

      <tr>
        <td>25-135443</td>
        <td><Label variant="active" /></td>
        <!-- <td><span :class="$style.statusActive">Активна</span></td> -->
        <td :class="$style.tdResult">В обработке</td>
        <td>Aug 11, 2025</td>
        <td>
          <Button
            label="Редактировать"
            :isSend="false"
            :onClick="() => console.log('click')"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import Label from "~/models/UI/Labels/label.vue";
import Button from "~/models/UI/Buttons/Button.vue";
</script>

<style module lang="scss" src="./Table.module.scss"></style>
