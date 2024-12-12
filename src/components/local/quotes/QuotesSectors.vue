<template>
  <div class="settings-page">
    <form action="#" @submit.prevent="handleSetting" style="position: relative">
      <span
        class="row center-row align-items-center p-4 my-5"
        style="
          border: 1px solid var(--col-gray);
          border-radius: var(--brd-radius);

          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
          background-color: var(--col-bg);
        "
      >
        <span class="col">
          <span class="d-flex gap-3">
            <InptField
              class="col"
              v-model="sectorItem"
              :holder="'Quotes Sector'"
              :label="'Quotes Sector'"
            ></InptField>
            <button
              v-if="!isLoading"
              class="addBtn mt-auto col-1 mt-auto"
              type="submit"
              :disabled="!sectorItem"
            >
              Add
            </button>
            <button
              v-else
              class="addBtn mt-auto col-1 mt-auto"
              type="submit"
              style="font-weight: normal !important"
              disabled
            >
              <div class="spinner-grow me-3" role="status"></div>
            </button>
          </span>
          <ul
            class="target-list w-75 mx-auto"
            style="color: var(--col-text); list-style: none"
          >
            <li v-for="(ser, j) in allSectors" :key="j">
              <span class="w-50">{{ ser.name }}</span>

              <button
                v-if="!isLoading"
                type="button"
                @click="deleteItem(ser.id)"
              >
                Delete
              </button>
            </li>
          </ul>
        </span>
      </span>
    </form>
  </div>
</template>

<script setup>
// Validator
import { onMounted, ref, watch } from "vue";

import InptField from "@/reusables/inputs/InptField.vue";
import { storeToRefs } from "pinia";
import { contactUsStore } from "@/stores/settings/contactUs";
import useVuelidator from "@vuelidate/core";
import { required } from "@vuelidate/validators";
required.$message = "Field is required";

const { allSectors } = storeToRefs(contactUsStore());

const sectorItem = ref("");

const isLoading = ref(false);

onMounted(async () => {
  await contactUsStore().getAllContactSectors();
});

const formData = ref({
  sectors: [],
});

const handleSetting = async () => {
  isLoading.value = true;
  let res = await contactUsStore().addSector({
    "name[ar]": sectorItem.value,
    "name[en]": sectorItem.value,
  });
  if (res) {
    sectorItem.value = "";
  }
  isLoading.value = false;
};
const deleteItem = async (secId) => {
  isLoading.value = true;
  let res = await contactUsStore().removeSector({
    id: secId,
  });
  if (res) {
    sectorItem.value = "";
  }
  isLoading.value = false;
};
</script>

<style lang="scss" scoped></style>
