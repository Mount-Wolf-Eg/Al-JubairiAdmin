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
              v-model="formData.QuoteEmail"
              :holder="'email'"
              :label="'Quote Email'"
              :appear="checkErrName(['QuoteEmail']) ? 'err-border' : ''"
            ></InptField>
            <button
              v-if="!isLoading"
              class="addBtn mt-auto col-1 mt-auto"
              type="submit"
              :disabled="!formData.QuoteEmail"
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

          <span
            class="center-row justify-content-start"
            style="margin-top: -1rem; margin-bottom: 1rem"
            v-for="(err, i) in validationObj.$errors"
            :key="i"
            ><span v-if="err.$property == 'QuoteEmail'" class="err-msg">
              {{ err.$message }}
            </span></span
          >
        </span>
      </span>
    </form>
  </div>
</template>

<script setup>
// Validator
import { onMounted, ref, watch } from "vue";
import InptField from "@/reusables/inputs/InptField.vue";
import { contactSettings } from "@/stores/settings/contactsStore";
import { storeToRefs } from "pinia";
import useVuelidator from "@vuelidate/core";
import { required, url, email, numeric } from "@vuelidate/validators";
required.$message = "Field is required";

const { allContacts } = storeToRefs(contactSettings());

const isLoading = ref(false);

const formData = ref({
  QuoteEmail: "",
});

onMounted(async () => {
  await contactSettings().getAllContacts();
  formData.value.QuoteEmail = allContacts.value.quote_mail;
});

const validationRules = ref({
  QuoteEmail: { email, required },
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
      "settings[quote_mail]": formData.value.QuoteEmail,
    });
    if (res) {
      await contactSettings().getAllContacts();
    }
    validationObj.value.$reset();
  }
  isLoading.value = false;
};
</script>

<style lang="scss" scoped>
.sec-label {
  font-size: var(--fs-16);
  font-weight: var(--fw-bold);
}
</style>
