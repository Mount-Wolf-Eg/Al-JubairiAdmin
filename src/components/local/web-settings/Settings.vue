<!-- <template>
  <div class="settings-page" v-if="!pageLoad">
    <form action="#" @submit.prevent="handleSetting" style="position: relative">
      <span class="row d-flex flex-wrap">
        <p class="sec-label">Logos</p>
        <span
          class="mb-5 row"
          style="
            border: 1px solid var(--col-gray);
            border-radius: var(--brd-radius);
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            background-color: var(--col-bg);
          "
        >
          <span class="col-12">
            <span class="col">
              <label
                for="attachments"
                style="
                  background-color: transparent !important;
                  color: var(--col-text) !important;
                  font-size: var(--fs-16) !important;
                  font-weight: var(--fw-bold) !important;
                  line-height: var(--line-h-20) !important;
                  padding-top: 1.5rem;
                "
                class="inpt-label w-100"
                >Header Logo</label
              >
              <UploadeFile
                :for="'one'"
                class="mb-3"
                @fileData="formData.headerLogo = $event"
              ></UploadeFile>
              <img
                v-if="formData.headerLogo"
                class="mt-3"
                :src="formData.headerLogo"
                alt=""
                style="max-width: 10rem; border-radius: 7px"
              />
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'headerLogo '" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="col-12">
            <span class="col">
              <label
                for="attachments"
                style="
                  background-color: transparent !important;
                  color: var(--col-text) !important;
                  font-size: var(--fs-16) !important;
                  font-weight: var(--fw-bold) !important;
                  line-height: var(--line-h-20) !important;
                  padding-top: 1.5rem;
                "
                class="inpt-label w-100"
                >Footer Logo</label
              >
              <UploadeFile
                :for="'two'"
                class="mb-3"
                @fileData="formData.footerLogo = $event"
              ></UploadeFile>
              <img
                v-if="formData.footerLogo"
                class="mt-3"
                :src="formData.footerLogo"
                alt=""
                style="max-width: 10rem; border-radius: 7px"
              />
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'footerLogo '" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
        </span>
        <p class="sec-label">Contacts</p>

        <span
          class="mb-5 row"
          style="
            border: 1px solid var(--col-gray);
            border-radius: var(--brd-radius);
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            background-color: var(--col-bg);
          "
        >
          <span class="col-6">
            <InptField
              v-model="formData.phone"
              :holder="'phone'"
              :label="'phone'"
              :appear="checkErrName(['phone']) ? 'err-border' : ''"
            ></InptField>
            <span
              class="center-row justify-content-start"
              style="margin-top: -1rem; margin-bottom: 1rem"
              v-for="(err, i) in validationObj.$errors"
              :key="i"
              ><span v-if="err.$property == 'phone'" class="err-msg">
                {{ err.$message }}
              </span></span
            >
          </span>

          <span class="col-6">
            <InptField
              v-model="formData.email"
              :holder="'email'"
              :label="'email'"
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
        </span>

        <p class="sec-label">Social Links</p>

        <span
          class="mb-5 row"
          style="
            border: 1px solid var(--col-gray);
            border-radius: var(--brd-radius);
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            background-color: var(--col-bg);
          "
        >
          <span class="col-6">
            <InptField
              v-model="formData.whatsApp"
              :holder="'whatsApp'"
              :label="'whatsApp'"
              :appear="checkErrName(['whatsApp']) ? 'err-border' : ''"
            ></InptField>
            <span
              class="center-row justify-content-start"
              style="margin-top: -1rem; margin-bottom: 1rem"
              v-for="(err, i) in validationObj.$errors"
              :key="i"
              ><span v-if="err.$property == 'whatsApp'" class="err-msg">
                {{ err.$message }}
              </span></span
            >
          </span>

          <span class="col-6">
            <InptField
              v-model="formData.facebook"
              :holder="'Facebook'"
              :label="'Facebook'"
              :appear="checkErrName(['facebook']) ? 'err-border' : ''"
            ></InptField>
            <span
              class="center-row justify-content-start"
              style="margin-top: -1rem; margin-bottom: 1rem"
              v-for="(err, i) in validationObj.$errors"
              :key="i"
              ><span v-if="err.$property == 'facebook'" class="err-msg">
                {{ err.$message }}
              </span></span
            >
          </span>
          <span class="col-6">
            <InptField
              v-model="formData.linkedIn"
              :holder="'linkedIn'"
              :label="'linkedIn'"
              :appear="checkErrName(['linkedIn']) ? 'err-border' : ''"
            ></InptField>
            <span
              class="center-row justify-content-start"
              style="margin-top: -1rem; margin-bottom: 1rem"
              v-for="(err, i) in validationObj.$errors"
              :key="i"
              ><span v-if="err.$property == 'linkedIn'" class="err-msg">
                {{ err.$message }}
              </span></span
            >
          </span>
          <span class="col-6">
            <InptField
              v-model="formData.instagram"
              :holder="'Instagram'"
              :label="'Instagram'"
              :appear="checkErrName(['instagram']) ? 'err-border' : ''"
            ></InptField>
            <span
              class="center-row justify-content-start"
              style="margin-top: -1rem; margin-bottom: 1rem"
              v-for="(err, i) in validationObj.$errors"
              :key="i"
              ><span v-if="err.$property == 'instagram'" class="err-msg">
                {{ err.$message }}
              </span></span
            >
          </span>

          <span class="col-6">
            <InptField
              v-model="formData.youtube"
              :label="'Youtube'"
              :holder="'youtube'"
              :appear="checkErrName(['youtube']) ? 'err-border' : ''"
            ></InptField>
            <span
              class="center-row justify-content-start"
              style="margin-top: -1rem; margin-bottom: 1rem"
              v-for="(err, i) in validationObj.$errors"
              :key="i"
              ><span v-if="err.$property == 'youtube'" class="err-msg">
                {{ err.$message }}
              </span></span
            >
          </span>

          <span class="col-6">
            <InptField
              v-model="formData.tikTok"
              :holder="'Tiktok'"
              :label="'tiktok'"
              :appear="checkErrName(['tikTok']) ? 'err-border' : ''"
            ></InptField>
            <span
              class="center-row justify-content-start"
              style="margin-top: -1rem; margin-bottom: 1rem"
              v-for="(err, i) in validationObj.$errors"
              :key="i"
              ><span v-if="err.$property == 'tikTok'" class="err-msg">
                {{ err.$message }}
              </span></span
            >
          </span>
          <span class="col">
            <InptField
              v-model="formData.x"
              :label="'x'"
              :holder="'x'"
              :appear="checkErrName(['x']) ? 'err-border' : ''"
            ></InptField>
            <span
              class="center-row justify-content-start"
              style="margin-top: -1rem; margin-bottom: 1rem"
              v-for="(err, i) in validationObj.$errors"
              :key="i"
              ><span v-if="err.$property == 'x'" class="err-msg">
                {{ err.$message }}
              </span></span
            >
          </span>
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
  <main class="text-center" v-else>
    <div class="spinner-grow me-3" role="status"></div>
    ...loading
  </main>
</template>

<script setup>
// Validator
import { onMounted, ref, watch } from "vue";
import InptField from "@/reusables/inputs/InptField.vue";
import UploadeFile from "@/reusables/inputs/UploadeFile.vue";
import { storeToRefs } from "pinia";
import { useSettingStore } from "@/stores/alJubairiStore/settings";
import { useItemsStore } from "@/stores/alJubairiStore/itemsStore";
import useVuelidator from "@vuelidate/core";
import { required, url, email, numeric } from "@vuelidate/validators";
required.$message = "Field is required";

const { settings } = storeToRefs(useSettingStore());

const sendAttachment = async (logo, forLogo) => {
  await useItemsStore()
    .sendAttachment(logo, "", "settings")
    .then(async (res) => {
      formData.value[forLogo] = res.data.data;
    });
};

const isLoading = ref(false);
const pageLoad = ref(true);

const formData = ref({
  headerLogo: "",
  footerLogo: "",
  phone: "",
  email: "",
  img: "",
  whatsApp: "",
  facebook: "",
  linkedIn: "",
  instagram: "",
  youtube: "",
  tikTok: "",
  Snapchat: "",
  x: "",
});

watch(
  () => formData.value.headerLogo,
  (newVal) => {
    if (typeof newVal == "object") {
      sendAttachment(newVal.length > 1 ? newVal[0] : newVal, "headerLogo");
    }
  }
);
watch(
  () => formData.value.footerLogo,
  (newVal) => {
    if (typeof newVal == "object") {
      sendAttachment(newVal.length > 1 ? newVal[0] : newVal, "footerLogo");
    }
  }
);

onMounted(async () => {
  await useSettingStore().getSettings();
  formData.value.headerLogo = settings.value.find(
    (e) => e.key == "header_logo"
  )?.value;
  formData.value.facebook = settings.value.find(
    (e) => e.key == "facebook"
  )?.value;
  formData.value.linkedIn = settings.value.find(
    (e) => e.key == "linkedin"
  )?.value;
  formData.value.instagram = settings.value.find(
    (e) => e.key == "instagram"
  )?.value;

  formData.value.youtube = settings.value.find(
    (e) => e.key == "youtube"
  )?.value;

  formData.value.tikTok = settings.value.find((e) => e.key == "tiktok")?.value;

  formData.value.x = settings.value.find((e) => e.key == "x")?.value;

  formData.value.whatsApp = settings.value.find(
    (e) => e.key == "whatsapp"
  )?.value;
  formData.value.phone = settings.value.find((e) => e.key == "phone")?.value;
  formData.value.email = settings.value.find((e) => e.key == "email")?.value;

  pageLoad.value = false;
});

const validationRules = ref({
  facebook: { url },
  instagram: { url },
  youtube: { url },
  tikTok: { url },
  x: { url },
  linkedIn: { url },
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

    let res = await useSettingStore().addSettings({
      phone: formData.value.phone,
      email: formData.value.email,
      x: formData.value.x,
      youtube: formData.value.youtube,
      tiktok: formData.value.tikTok,
      facebook: formData.value.facebook,
      linkedin: formData.value.linkedIn,
      instagram: formData.value.instagram,
      whatsapp: formData.value.whatsApp,
      header_logo: formData.value.headerLogo,
      footer_logo: formData.value.footerLogo,
    });

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
</style> -->
<template>
  <div class="settings-page" v-if="!pageLoad">
    <form action="#" @submit.prevent="handleSetting" style="position: relative">
      <span class="row d-flex flex-wrap">
        <p class="sec-label">Logos</p>
        <span
          class="mb-5 row"
          style="
            border: 1px solid var(--col-gray);
            border-radius: var(--brd-radius);
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            background-color: var(--col-bg);
          "
        >
          <span class="col-12">
            <span class="col">
              <label
                for="attachments"
                style="
                  background-color: transparent !important;
                  color: var(--col-text) !important;
                  font-size: var(--fs-16) !important;
                  font-weight: var(--fw-bold) !important;
                  line-height: var(--line-h-20) !important;
                  padding-top: 1.5rem;
                "
                class="inpt-label w-100"
                >Main Logo</label
              >
              <UploadeFile
                :for="'one'"
                class="mb-3"
                @fileData="formData.headerLogo = $event"
              ></UploadeFile>
              <img
                v-if="!formData.headerLogo"
                class="mt-3"
                :src="formData.headerpreview"
                alt=""
                style="max-width: 10rem; border-radius: 7px"
              />
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'headerLogo '" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="col-12 mb-5">
            <span class="col">
              <label
                for="attachments"
                style="
                  background-color: transparent !important;
                  color: var(--col-text) !important;
                  font-size: var(--fs-16) !important;
                  font-weight: var(--fw-bold) !important;
                  line-height: var(--line-h-20) !important;
                  padding-top: 1.5rem;
                "
                class="inpt-label w-100"
                >Second Logo</label
              >
              <UploadeFile
                :for="'two'"
                class="mb-3"
                @fileData="formData.footerLogo = $event"
              ></UploadeFile>
              <img
                v-if="!formData.footerLogo"
                class="mt-3"
                :src="formData.footerpreview"
                alt=""
                style="max-width: 10rem; border-radius: 7px"
              />
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'footerLogo '" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
        </span>
        <p class="sec-label">Contacts</p>

        <span
          class="mb-5 row"
          style="
            border: 1px solid var(--col-gray);
            border-radius: var(--brd-radius);
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            background-color: var(--col-bg);
          "
        >
          <span class="col-6">
            <InptField
              v-model="formData.phone"
              :holder="'phone'"
              :label="'phone'"
              :appear="checkErrName(['phone']) ? 'err-border' : ''"
            ></InptField>
            <span
              class="center-row justify-content-start"
              style="margin-top: -1rem; margin-bottom: 1rem"
              v-for="(err, i) in validationObj.$errors"
              :key="i"
              ><span v-if="err.$property == 'phone'" class="err-msg">
                {{ err.$message }}
              </span></span
            >
          </span>

          <span class="col-6">
            <InptField
              v-model="formData.email"
              :holder="'email'"
              :label="'email'"
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
        </span>

        <p class="sec-label">Social Links</p>

        <span
          class="mb-5 row"
          style="
            border: 1px solid var(--col-gray);
            border-radius: var(--brd-radius);
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            background-color: var(--col-bg);
          "
        >
          <span class="col-6">
            <InptField
              v-model="formData.whatsApp"
              :holder="'whatsApp'"
              :label="'whatsApp'"
              :appear="checkErrName(['whatsApp']) ? 'err-border' : ''"
            ></InptField>
            <span
              class="center-row justify-content-start"
              style="margin-top: -1rem; margin-bottom: 1rem"
              v-for="(err, i) in validationObj.$errors"
              :key="i"
              ><span v-if="err.$property == 'whatsApp'" class="err-msg">
                {{ err.$message }}
              </span></span
            >
          </span>

          <span class="col-6">
            <InptField
              v-model="formData.facebook"
              :holder="'Facebook'"
              :label="'Facebook'"
              :appear="checkErrName(['facebook']) ? 'err-border' : ''"
            ></InptField>
            <span
              class="center-row justify-content-start"
              style="margin-top: -1rem; margin-bottom: 1rem"
              v-for="(err, i) in validationObj.$errors"
              :key="i"
              ><span v-if="err.$property == 'facebook'" class="err-msg">
                {{ err.$message }}
              </span></span
            >
          </span>

          <span class="col-6">
            <InptField
              v-model="formData.instagram"
              :holder="'Instagram'"
              :label="'Instagram'"
              :appear="checkErrName(['instagram']) ? 'err-border' : ''"
            ></InptField>
            <span
              class="center-row justify-content-start"
              style="margin-top: -1rem; margin-bottom: 1rem"
              v-for="(err, i) in validationObj.$errors"
              :key="i"
              ><span v-if="err.$property == 'instagram'" class="err-msg">
                {{ err.$message }}
              </span></span
            >
          </span>

          <span class="col-6">
            <InptField
              v-model="formData.youtube"
              :label="'Youtube'"
              :holder="'youtube'"
              :appear="checkErrName(['youtube']) ? 'err-border' : ''"
            ></InptField>
            <span
              class="center-row justify-content-start"
              style="margin-top: -1rem; margin-bottom: 1rem"
              v-for="(err, i) in validationObj.$errors"
              :key="i"
              ><span v-if="err.$property == 'youtube'" class="err-msg">
                {{ err.$message }}
              </span></span
            >
          </span>

          <span class="col-6">
            <InptField
              v-model="formData.tikTok"
              :holder="'Tiktok'"
              :label="'tiktok'"
              :appear="checkErrName(['tikTok']) ? 'err-border' : ''"
            ></InptField>
            <span
              class="center-row justify-content-start"
              style="margin-top: -1rem; margin-bottom: 1rem"
              v-for="(err, i) in validationObj.$errors"
              :key="i"
              ><span v-if="err.$property == 'tikTok'" class="err-msg">
                {{ err.$message }}
              </span></span
            >
          </span>
          <span class="col">
            <InptField
              v-model="formData.x"
              :label="'x'"
              :holder="'x'"
              :appear="checkErrName(['x']) ? 'err-border' : ''"
            ></InptField>
            <span
              class="center-row justify-content-start"
              style="margin-top: -1rem; margin-bottom: 1rem"
              v-for="(err, i) in validationObj.$errors"
              :key="i"
              ><span v-if="err.$property == 'x'" class="err-msg">
                {{ err.$message }}
              </span></span
            >
          </span>
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
  <main class="text-center" v-else>
    <div class="spinner-grow me-3" role="status"></div>
    ...loading
  </main>
</template>

<script setup>
// Validator
import { onMounted, ref, watch } from "vue";
import InptField from "@/reusables/inputs/InptField.vue";
import UploadeFile from "@/reusables/inputs/UploadeFile.vue";
import { storeToRefs } from "pinia";
import { useSettingStore } from "@/stores/alJubairiStore/settings";
import { useItemsStore } from "@/stores/alJubairiStore/itemsStore";
import useVuelidator from "@vuelidate/core";
import { required, url, email, numeric } from "@vuelidate/validators";
required.$message = "Field is required";

const { settings } = storeToRefs(useSettingStore());

const sendAttachment = async (logo, forLogo) => {
  await useItemsStore()
    .sendAttachment(logo, "", "settings")
    .then(async (res) => {
      formData.value[forLogo] = res.data.data;
    });
};

const isLoading = ref(false);
const pageLoad = ref(true);

const formData = ref({
  headerLogo: "",
  footerLogo: "",
  headerpreview: "",
  footerpreview: "",
  phone: "",
  email: "",
  img: "",
  whatsApp: "",
  facebook: "",
  linkedIn: "",
  instagram: "",
  youtube: "",
  tikTok: "",
  Snapchat: "",
  x: "",
});

watch(
  () => formData.value.headerLogo,
  (newVal) => {
    if (typeof newVal == "object") {
      sendAttachment(newVal.length > 1 ? newVal[0] : newVal, "headerLogo");
    }
  }
);
watch(
  () => formData.value.footerLogo,
  (newVal) => {
    if (typeof newVal == "object") {
      sendAttachment(newVal.length > 1 ? newVal[0] : newVal, "footerLogo");
    }
  }
);

onMounted(async () => {
  await useSettingStore().getSettings();
  formData.value.headerpreview = settings.value.find(
    (e) => e.key == "header_logo"
  )?.value;
  formData.value.footerpreview = settings.value.find(
    (e) => e.key == "footer_logo"
  )?.value;

  formData.value.facebook = settings.value.find(
    (e) => e.key == "facebook"
  )?.value;

  formData.value.instagram = settings.value.find(
    (e) => e.key == "instagram"
  )?.value;

  formData.value.youtube = settings.value.find(
    (e) => e.key == "youtube"
  )?.value;

  formData.value.tikTok = settings.value.find((e) => e.key == "tiktok")?.value;

  formData.value.x = settings.value.find((e) => e.key == "x")?.value;

  formData.value.whatsApp = settings.value.find(
    (e) => e.key == "whatsapp"
  )?.value;
  formData.value.phone = settings.value.find((e) => e.key == "phone")?.value;
  formData.value.email = settings.value.find((e) => e.key == "email")?.value;

  pageLoad.value = false;
});

const validationRules = ref({
  facebook: { url },
  instagram: { url },
  youtube: { url },
  tikTok: { url },
  x: { url },
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
    const settings = {
      phone: formData.value.phone,
      email: formData.value.email,
      x: formData.value.x,
      youtube: formData.value.youtube,
      tiktok: formData.value.tikTok,
      facebook: formData.value.facebook,
      instagram: formData.value.instagram,
      whatsapp: formData.value.whatsApp,
    };

    if (formData.value.headerLogo.length > 0) {
      settings.header_logo = formData.value.headerLogo;
    }
    if (formData.value.footerLogo.length > 0) {
      settings.footer_logo = formData.value.footerLogo;
    }

    await useSettingStore().addSettings(settings);

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
