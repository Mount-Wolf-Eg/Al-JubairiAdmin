<template>
  <div class="settings-page" v-if="!pageLoad">
    <form action="#" @submit.prevent="handleSetting" style="position: relative">
      <span class="row d-flex flex-wrap">
        <span class="mb-5 row">
          <span class="row w-100">
            <!-- image  -->
            <span class="row w-100">
              <span class="col">
                <label for="slide" class="inpt-label w-100"> Image</label>
                <UploadeFile
                  :for="'one'"
                  class="mb-3"
                  :reset="resetImg"
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
            <span class="row w-50">
              <span class="col">
                <InptField
                  v-model="formData.alt.aen"
                  :holder="'description'"
                  :label="'Img Description'"
                  :appear="checkErrName(['aen']) ? 'err-border' : ''"
                ></InptField>
                <span
                  class="center-row justify-content-start"
                  style="margin-top: -1rem; margin-bottom: 1rem"
                  v-for="(err, i) in validationObj.$errors"
                  :key="i"
                  ><span v-if="err.$property == 'aen'" class="err-msg">
                    {{ err.$message }}
                  </span></span
                >
              </span>
            </span>
            <span class="row w-50">
              <span class="col">
                <InptField
                  style="direction: rtl"
                  v-model="formData.alt.aar"
                  :holder="'وصف الصوره'"
                  :label="'وصف الصوره'"
                  :appear="checkErrName(['aar']) ? 'err-border' : ''"
                ></InptField>
                <span
                  class="center-row justify-content-start"
                  style="margin-top: -1rem; margin-bottom: 1rem"
                  v-for="(err, i) in validationObj.$errors"
                  :key="i"
                  ><span v-if="err.$property == 'aar'" class="err-msg">
                    {{ err.$message }}
                  </span></span
                >
              </span>
            </span>
            <span class="col">
              <label for="" class="inpt-label">AR Content</label>
              <TextEditor
                class="t-editor"
                v-model="formData.desc.ar"
              ></TextEditor>

              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'ar'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
            <span class="col">
              <label for="" class="inpt-label">En Content</label>
              <TextEditor
                class="t-editor"
                v-model="formData.desc.en"
              ></TextEditor>

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
        </span>
      </span>
      <div class="w-100 mt-5">
        <button
          v-if="!isLoading"
          type="submit"
          class="modal-add-btn mx-auto"
          :disabled="disable"
        >
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
import TextEditor from "@/reusables/ckEditor/TextEditor.vue";
import UploadeFile from "@/reusables/inputs/UploadeFile.vue";
import InptField from "@/reusables/inputs/InptField.vue";
import { useItemsStore } from "@/stores/alJubairiStore/itemsStore";
import useVuelidator from "@vuelidate/core";
import { required, url, email, numeric } from "@vuelidate/validators";
import { storeToRefs } from "pinia";
required.$message = "Field is required";
const { singleItem, allItems } = storeToRefs(useItemsStore());
const isLoading = ref(false);
const pageLoad = ref(true);
const resetImg = ref(false);
const disable = ref(false);

const formData = ref({
  title: {
    tar: "",
    ten: "",
  },
  desc: {
    ar: "",
    en: "",
  },
  img: "",
  alt: {
    aar: "",
    aen: "",
  },
});

watch(
  () => formData.value.img,
  async (newVal) => {
    if (typeof newVal == "object") {
      let data = newVal.length > 1 ? newVal[0] : newVal;
      disable.value = true;
      await useItemsStore()
        .sendAttachment(data)
        .then(async (res) => {
          formData.value.img = res.data.data;
        });
      disable.value = false;
    }
  }
);

onMounted(async () => {
  await useItemsStore().getItems("", "more_about", "about");
  formData.value.desc.ar = allItems.value.find((el) => el.id == 138)?.ar?.desc;
  formData.value.desc.en = allItems.value.find((el) => el.id == 138)?.en?.desc;
  formData.value.img = allItems.value.find((el) => el.id == 138)?.image?.media;
  formData.value.alt.aar = allItems.value.find(
    (el) => el.id == 138
  )?.image?.ar?.alt;
  formData.value.alt.aen = allItems.value.find(
    (el) => el.id == 138
  )?.image?.en?.alt;
  pageLoad.value = false;
});

const validationRules = ref({});

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

    await useItemsStore().editItem("138", {
      _method: "PUT",
      "en[desc]": formData.value.desc.en,
      "ar[desc]": formData.value.desc.ar,
      "image[media]": formData.value.img,
      "image[ar][alt]": formData.value.alt.aar,
      "image[en][alt]": formData.value.alt.aen,
      section_id: 15,
    });

    validationObj.value.$reset();
    resetImg.value = true;
    setTimeout(() => {
      resetImg.value = false;
    }, 500);
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
