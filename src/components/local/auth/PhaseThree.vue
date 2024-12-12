<template>
  <div class="h-100">
    <form
      action="#"
      @submit.prevent="forgetPassword"
      class="d-flex flex-column justify-content-between h-100 w-100"
    >
      <span class="row w-100 gap-5">
        <div class="col-12 inpt-box" style="position: relative">
          <!-- <InptField
            v-model="formData.new_password"
            :holder="'Enter New Password'"
            :appear="checkErrName(['new_password']) ? 'err-border' : ''"
          ></InptField> -->

          <input
            :type="`${showPass ? 'text' : 'password'}`"
            name="Password"
            placeholder="Enter New Password"
            v-model="formData.new_password"
            class="sign-field w-100"
            :disabled="btnLoadin"
            :class="checkErrName(['new_password']) ? 'err-border' : ''"
          />
          <button @click="showPass = !showPass" v-if="showPass" class="eye">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style="width: 2.4rem; height: 2.4rem"
              fill="currentColor"
              class="bi bi-eye-slash"
              viewBox="0 0 16 16"
            >
              <path
                d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"
              />
              <path
                d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"
              />
              <path
                d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"
              />
            </svg>
          </button>
          <button @click="showPass = !showPass" v-else class="eye">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style="width: 2.4rem; height: 2.4rem"
              fill="currentColor"
              class="bi bi-eye"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
              />
              <path
                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
              />
            </svg>
          </button>
          <span
            class="center-row justify-content-start"
            style="margin-top: -1rem; margin-bottom: 1rem"
            v-for="(err, i) in validationObj.$errors"
            :key="i"
            ><span v-if="err.$property == 'new_password'" class="err-msg">
              {{ err.$message }}
            </span></span
          >
        </div>
        <div class="col-12" style="position: relative">
          <!-- <InptField
            v-model="formData.confirm_password"
            :holder="'Confirm Password'"
            :appear="checkErrName(['confirm_password']) ? 'err-border' : ''"
          ></InptField> -->

          <input
            :type="`${showPass1 ? 'text' : 'password'}`"
            name="Password"
            placeholder="Confirm Password"
            v-model="formData.confirm_password"
            class="sign-field w-100"
            :disabled="btnLoadin"
            :class="checkErrName(['confirm_password']) ? 'err-border' : ''"
          />
          <button @click="showPass1 = !showPass1" v-if="showPass1" class="eye">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style="width: 2.4rem; height: 2.4rem"
              fill="currentColor"
              class="bi bi-eye-slash"
              viewBox="0 0 16 16"
            >
              <path
                d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"
              />
              <path
                d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"
              />
              <path
                d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"
              />
            </svg>
          </button>
          <button @click="showPass1 = !showPass1" v-else class="eye">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style="width: 2.4rem; height: 2.4rem"
              fill="currentColor"
              class="bi bi-eye"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
              />
              <path
                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
              />
            </svg>
          </button>

          <span
            class="center-row justify-content-start"
            style="margin-top: -1rem; margin-bottom: 1rem"
            v-for="(err, i) in validationObj.$errors"
            :key="i"
            ><span v-if="err.$property == 'confirm_password'" class="err-msg">
              {{ err.$message }}
            </span></span
          >
        </div>
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
import { defineEmits } from "vue";
import InptField from "@/reusables/inputs/InptField.vue";
import { forgetPassStore } from "@/stores/auth/forgetPass";

const showPass = ref(false);
const showPass1 = ref(false);

// emits
const emits = defineEmits(["closeModal", "SucceThree"]);

// Validator
import useVuelidator from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  numeric,
  sameAs,
} from "@vuelidate/validators";
required.$message = "Field is required";

import { ref, computed } from "vue";

const btnLoadin = ref(false);

const formData = ref({
  new_password: "",
  confirm_password: "",
});

const samePass = computed(() => {
  return formData.value.new_password;
});

const validationRules = ref({
  new_password: {
    required,
    minLength: minLength(6),
    maxLength: maxLength(20),
  },
  confirm_password: {
    required,
    minLength: minLength(6),
    maxLength: maxLength(20),
    sameAs: sameAs(samePass),
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
    let req = await forgetPassStore().changePassword(
      formData.value.new_password,
      formData.value.confirm_password
    );

    if (req) {
      emits("succeThree");
    }
    btnLoadin.value = false;
    formData.value.email = "";
    validationObj.value.$reset();
  }
};
</script>

<style lang="scss" scoped></style>
