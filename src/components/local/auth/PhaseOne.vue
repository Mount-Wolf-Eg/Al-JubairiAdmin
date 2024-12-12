<template>
  <div class="h-100">
    <form
      action="#"
      @submit.prevent="forgetPassword"
      class="center-col justify-content-around h-100 w-100"
    >
      <div class="row w-100">
        <span class="col">
          <InptField
            v-model="formData.email"
            :holder="'Enter email'"
            :appear="checkErrName(['email']) ? 'err-border' : ''"
          ></InptField>
          <span
            class="center-row justify-content-start"
            style="margin-top: -1rem; margin-bottom: 1rem"
            v-for="(err, i) in validationObj.$errors"
            :key="i"
            ><span v-if="err.$property == 'email'" class="err-msg">
              {{ err.$message }}
            </span></span
          >
        </span>
      </div>
      <button
        v-if="!btnLoadin"
        class="sign-btn mt-4 mx-auto"
        type="submit"
        style="font-weight: normal !important"
      >
        Send
      </button>
      <button
        v-else
        class="sign-btn mt-4 mx-auto"
        type="submit"
        style="font-weight: normal !important"
      >
        <div class="spinner-grow me-3" role="status"></div>
        <span> Loading...</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";
import InptField from "@/reusables/inputs/InptField.vue";
import { forgetPassStore } from "@/stores/auth/forgetPass";

// Validator
import useVuelidator from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
required.$message = "Field is required";

// emits
const emits = defineEmits(["closeForget", "SucceOne"]);

import { ref } from "vue";

// validation testing
const btnLoadin = ref(false);

const formData = ref({
  email: "",
});

// validation testing
const validationRules = ref({
  email: {
    required,
    email,
  },
});

const checkErrName = (key) => {
  return validationObj.value.$errors.find((err) => err.$property == key);
};

const validationObj = useVuelidator(validationRules, formData);

const forgetPassword = async () => {
  const result = await validationObj.value.$validate();
  if (result) {
    btnLoadin.value = true;
    let req = await forgetPassStore().forgetPassword({
      email: formData.value.email,
    });

    if (req) {
      emits("SucceOne", formData.value.email);
    }
    btnLoadin.value = false;
    formData.value.email = "";
    validationObj.value.$reset();
  }
};
</script>

<style lang="scss" scoped></style>
