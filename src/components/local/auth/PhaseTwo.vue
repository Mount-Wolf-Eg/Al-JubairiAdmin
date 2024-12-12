<template>
  <div class="h-100">
    <form
      action="#"
      @submit.prevent="forgetPassword"
      class="center-col justify-content-around h-100 w-100"
    >
      <span class="row w-100">
        <span class="col">
          <InptField
            v-model="formData.otp"
            :holder="'Enter Otp'"
            :appear="checkErrName(['otp']) ? 'err-border' : ''"
          ></InptField>
          <span
            class="center-row justify-content-start"
            style="margin-top: -1rem; margin-bottom: 1rem"
            v-for="(err, i) in validationObj.$errors"
            :key="i"
            ><span v-if="err.$property == 'otp'" class="err-msg">
              {{ err.$message }}
            </span></span
          >
        </span>
      </span>
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
import { defineEmits, watch } from "vue";
import InptField from "@/reusables/inputs/InptField.vue";
import { forgetPassStore } from "@/stores/auth/forgetPass";
// emits
const emits = defineEmits(["closeForget", "SucceTwo"]);

// Validator
import useVuelidator from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
required.$message = "Field is required";

import { ref } from "vue";

// validation testing
const btnLoadin = ref(false);

// props
const props = defineProps({
  mail: {
    type: String,
    required: true,
    default: () => ({}),
  },
});

const formData = ref({
  otp: "",
  email: props.mail,
});

const validationRules = ref({
  otp: {
    required,
    minLength: minLength(6),
    maxLength: maxLength(6),
  },
});

// validation testing
const checkErrName = (key) => {
  return validationObj.value.$errors.find((err) => err.$property == key);
};

// validation testing
const validationObj = useVuelidator(validationRules, formData);

const forgetPassword = async () => {
  const result = await validationObj.value.$validate();
  if (result) {
    btnLoadin.value = true;
    let req = await forgetPassStore().sendOtp({
      email: formData.value.email,
      otp: formData.value.otp,
    });

    if (req) {
      emits("SucceTwo");
    }
    btnLoadin.value = false;
    formData.value.email = "";
    validationObj.value.$reset();
  }
};
</script>

<style lang="scss" scoped></style>
