<template>
  <div class="users-page">
    <HelperButtons :route="''">
      <template #add-btn>
        <button
          type="button"
          id="addSeo"
          class="add-btn"
          data-bs-toggle="modal"
          data-bs-target="#addSe"
          style="visibility: hidden"
        ></button>
        <button
          type="button"
          :id="selectore"
          class="add-btn"
          data-bs-toggle="modal"
          data-bs-target="#addPage"
          style="visibility: hidden"
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

    <AddPage @resetItem="item = {}" :itemData="item"></AddPage>
    <AddPageSeo
      @resetSeo="seo = {}"
      @type="seo.type = $event"
      :itemData="seo"
    ></AddPageSeo>
    <PageTable @editItem="edit($event)" @editSeo="editSeo($event)"></PageTable>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import HelperButtons from "@/reusables/content_buttons/HelperButtons.vue";

import PageTable from "./PageTable.vue";
import AddPage from "./AddPage.vue";
import AddPageSeo from "./AddPageSeo.vue";

const item = ref({});
const seo = ref({});
const selectore = ref("addpag");

const edit = (e) => {
  item.value = e;
  document.querySelector(`#${selectore.value}`).click();
};
const editSeo = (e) => {
  seo.value = e;
  document.querySelector(`#addSeo`).click();
};
</script>

<style lang="scss" scoped></style>
