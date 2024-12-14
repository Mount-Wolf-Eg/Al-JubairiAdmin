<template>
  <div class="users-page">
    <HelperButtons :route="''">
      <template #add-btn>
        <button
          type="button"
          :id="selectore"
          class="add-btn"
          data-bs-toggle="modal"
          data-bs-target="#addse"
        >
          <svg
            style="
              width: 1.2rem;
              height: 1.2rem;
              outline: 2px solid black;
              border-radius: 50%;
              margin: 0 0.5rem;
            "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
            />
          </svg>
          Add New
        </button>
      </template>
    </HelperButtons>

    <AddServices @resetItem="item = {}" :itemData="item"></AddServices>
    <ServicesTable @editItem="edit($event)"></ServicesTable>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import HelperButtons from "@/reusables/content_buttons/HelperButtons.vue";

import AddServices from "./AddServices.vue";
import ServicesTable from "./ServicesTable.vue";
const item = ref({});
const selectore = ref("addServicePage");

const edit = (e) => {
  item.value = e;
  document.querySelector(`#${selectore.value}`).click();
};
</script>

<style lang="scss" scoped></style>
