<template>
  <div
    class="center-col justify-content-center align-items-center"
    style="min-height: 100vh"
  >
    <div v-if="state == 'login'">
      <form action="#" @submit.prevent="submitLogin" class="singBox">
        <!-- <h2 class="login-title">Ndc</h2> -->
        <img
          src="/src/assets/favIcon.png"
          alt="Mount Wolf logo"
          style="
            width: 10rem;
            height: auto;
            max-width: 11rem;
            object-fit: contain;
            object-position: center;
            background-color: #ccc !important;
          "
        />

        <!-- email -->
        <div class="center-col">
          <input
            type="text"
            name="email"
            class="sign-field"
            v-model="formData.email"
            placeholder="Email"
            :disabled="btnLoadin"
            :class="checkErrName(['email']) ? 'err-border' : ''"
          />
          <span
            class="center-col"
            v-for="(err, i) in validationObj.$errors"
            :key="i"
            ><span v-if="err.$property == 'email'" class="err-msg">
              <vue-feather size="1.2rem" type="alert-circle"></vue-feather>
              {{ err.$message }}
            </span></span
          >
        </div>

        <!-- password -->
        <div class="center-col" style="position: relative">
          <input
            :type="`${showPass ? 'text' : 'password'}`"
            name="Password"
            placeholder="Password"
            v-model="formData.password"
            class="sign-field"
            :disabled="btnLoadin"
            :class="checkErrName(['password']) ? 'err-border' : ''"
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
            class="center-col"
            v-for="(err, i) in validationObj.$errors"
            :key="i"
            ><span v-if="err.$property == 'password'" class="err-msg">
              <vue-feather size="1.2rem" type="alert-circle"></vue-feather>

              {{ err.$message }}
            </span></span
          >
        </div>
        <div
          class="remember d-flex align-items-center justify-content-center gap-2"
        >
          <label class="remember-label" for="remember-me">Remember me</label>
          <input
            type="checkbox"
            name="remember"
            id="remember-me"
            v-model="rememberMe"
          />
        </div>
        <button type="button" @click="state = 'forget'" class="forget-btn">
          Forget Password
        </button>

        <button v-if="!btnLoadin" class="sign-btn" type="submit">Login</button>
        <button v-else class="sign-btn" type="submit">
          <span
            class="spinner-border spinner-border-sm fs-3"
            aria-hidden="true"
          ></span>
          <span role="status fs-3" class="mx-2">Loading...</span>
        </button>
      </form>
    </div>
    <div v-if="state == 'forget'">
      <ForgetPassword @login="state = 'login'"></ForgetPassword>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import ForgetPassword from "./ForgetPassword.vue";
// Validator
import { useAuthStore } from "@/stores/auth/auth";
import { storeToRefs } from "pinia";
const rememberM = storeToRefs(useAuthStore());

import useVuelidator from "@vuelidate/core";
import { required, minLength, maxLength, email } from "@vuelidate/validators";
required.$message = "Field is required";

import { onMounted, ref, watch } from "vue";

const state = ref("login");
const rememberMe = ref(false);
const router = useRouter();

watch(rememberMe, (val) => {
  useAuthStore().rememberM = val;
});

const formData = ref({
  email: "",
  password: "",
});

// validation testing
const checkErrName = (key) => {
  return validationObj.value.$errors.find((err) => err.$property == key);
};
// Validation
const validationRules = ref({
  email: {
    required,
    email,
  },
  password: {
    required,
    minLength: minLength(6),
    maxLength: maxLength(20),
  },
});
// validation testing
const validationObj = useVuelidator(validationRules, formData);

// validation testing

const btnLoadin = ref(false);
const showPass = ref(false);

const submitLogin = async () => {
  const result = await validationObj.value.$validate();

  btnLoadin.value = true;

  if (result) {
    let req = await useAuthStore().doLogin(formData.value);
    if (req) {
      router.push({ name: "home" });
    }
  }
  btnLoadin.value = false;
};
</script>

<style lang="scss" scoped>
.forget-btn {
  font-size: var(--fs-18);
  font-weight: var(--fw-bold);
  margin-inline-start: 5rem;
  margin-inline-end: auto;
  color: #afb0b9 !important;
  &:hover {
    color: var(--col-text) !important;
  }
}
.login-title {
  font-size: var(--fs-24);
  font-weight: var(--fw-bold);
  color: var(--col-text);
}

.remember-label {
  font-size: var(--fs-12);
  color: var(--col-text);
  font-weight: bold;
}

#remember-me {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
