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
              v-model="workItems"
              :holder="'Work Process'"
              :label="'Work Process'"
              :appear="checkErrName(['workItems']) ? 'err-border' : ''"
            ></InptField>
            <button
              class="addBtn mt-auto col-1 mt-auto"
              type="button"
              @click="addItem()"
              :disabled="!workItems"
            >
              Add
            </button>
          </span>
          <ul
            class="target-list w-75 mx-auto"
            style="color: var(--col-text); list-style: none"
          >
            <li v-for="(ser, j) in formData.workProcess" :key="j">
              <span class="w-50">{{ ser }}</span>

              <button type="button" @click="deleteItem(ser)">Delete</button>
            </li>
          </ul>
          <span
            class="center-row justify-content-start"
            style="margin-top: -1rem; margin-bottom: 1rem"
            v-for="(err, i) in validationObj.$errors"
            :key="i"
            ><span v-if="err.$property == 'en'" class="err-msg">
              {{ err.$message }}
            </span></span
          >
        </span>
      </span>

      <div>
        <button v-if="!isLoading" type="submit" class="modal-add-btn mx-auto">
          Save
        </button>
        <button
          v-else
          class="modal-add-btn mt-4"
          type="submit"
          style="font-weight: normal !important"
          disabled
        >
          <div class="spinner-grow me-3" role="status"></div>
          <span> Loading...</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
// Validator
import { onMounted, ref, watch } from "vue";
import InptField from "@/reusables/inputs/InptField.vue";
import UploadeFile from "@/reusables/inputs/UploadeFile.vue";
import { settingStore } from "@/stores/settings/settingStore";
import { storeToRefs } from "pinia";
import useVuelidator from "@vuelidate/core";
import { required } from "@vuelidate/validators";
required.$message = "Field is required";

const { workProcess, allSettings, activeSettings, suspendedSettings, setting } =
  storeToRefs(settingStore());

const workItems = ref("");

const isLoading = ref(false);

onMounted(async () => {
  await settingStore().getAllSettings();
  formData.value.workProcess = workProcess.value;
});

const formData = ref({
  workProcess: [],
});

const validationRules = ref({
  workProcess: { required },
});

// validation testing
const checkErrName = (key) => {
  return validationObj.value.$errors.find((err) => err.$property == key);
};

// // validation testing
const validationObj = useVuelidator(validationRules, formData);

const handleSetting = async () => {
  const result = await validationObj.value.$validate();
  if (result) {
    isLoading.value = true;
    let res = await settingStore().updateSetting({
      "settings[work_process]": formData.value.workProcess,
    });

    validationObj.value.$reset();
  }
  isLoading.value = false;
};

const addItem = () => {
  formData.value.workProcess.push(workItems.value);
  workItems.value = "";
};

const deleteItem = (ser) => {
  formData.value.workProcess = formData.value.workProcess.filter(
    (e) => e != ser
  );
};
</script>

<style lang="scss" scoped></style>
