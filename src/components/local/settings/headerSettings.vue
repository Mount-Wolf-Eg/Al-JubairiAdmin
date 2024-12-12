<template>
  <div class="settings-page">
    <form action="#" @submit.prevent="handleSetting" style="position: relative">
      <span
        class="row d-flex flex-wrap py-4 px-3"
        style="
          border: 1px solid var(--col-gray);
          border-radius: var(--brd-radius);

          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
          background-color: var(--col-bg);
        "
      >
        <span class="col">
          <label
            for="attachments"
            style="
              background-color: transparent !important;
              color: var(--col-text) !important;
              font-size: var(--fs-16) !important;
              font-weight: var(--fw-bold) !important;
              line-height: var(--line-h-20) !important;
            "
            class="inpt-label w-100"
            >First Image</label
          >
          <UploadeFile
            :for="'one'"
            class="mb-3"
            @fileData="formData.img = $event"
          ></UploadeFile>
          <img
            v-if="formData.img"
            class="mt-3"
            :src="formData.img"
            alt=""
            style="max-width: 10rem; border-radius: 7px"
          />
          <span
            class="center-row justify-content-start"
            style="margin-top: -1rem; margin-bottom: 1rem"
            v-for="(err, i) in validationObj.$errors"
            :key="i"
            ><span v-if="err.$property == 'img'" class="err-msg">
              {{ err.$message }}
            </span></span
          >
        </span>
      </span>

      <div class="w-100 mt-5">
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
import { contactSettings } from "@/stores/settings/contactsStore";
import { storeToRefs } from "pinia";
import useVuelidator from "@vuelidate/core";
import { required, url, email, numeric } from "@vuelidate/validators";

required.$message = "Field is required";

const { allContacts } = storeToRefs(contactSettings());

const isLoading = ref(false);

const formData = ref({
  img: "",
});

onMounted(async () => {
  await contactSettings().getAllContacts();
  formData.value.img = allContacts.value.logo;
});

const validationRules = ref({
  img: { required },
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
    let res = await contactSettings().updateContacts({
      "settings[logo]": formData.value.img,
    });
    if (res) {
      await contactSettings().getAllContacts();
    }
    validationObj.value.$reset();
  }
  isLoading.value = false;
};
</script>

<style lang="scss" scoped></style>
