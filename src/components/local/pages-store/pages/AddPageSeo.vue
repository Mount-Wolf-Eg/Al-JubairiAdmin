<template>
  <form
    @submit.prevent="handleAction()"
    class="modal fade modal-xl"
    :id="selector"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div
      class="modal-dialog"
      style="margin-top: calc(100vh / 2); transform: translateY(-50%)"
    >
      <div class="modal-content add-admin-modal">
        <div class="modal-header pt-0" style="border: none !important">
          <button
            @click="closeModal()"
            type="button"
            class="btn-close fs-3 m-3 mt-0 ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="close-modal"
          ></button>
        </div>
        <div class="modal-body d-flex flex-wrap justify-content-between">
          <span class="row w-50">
            <span class="col">
              <TextArea
                v-model="formData.en.title"
                :holder="'title'"
                :label="'Title'"
                :appear="checkErrName(['title']) ? 'err-border' : ''"
              ></TextArea>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'title'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="row w-50">
            <span class="col">
              <TextArea
                style="direction: rtl"
                v-model="formData.ar.title"
                :holder="'العنوان'"
                :label="'العنوان'"
                :appear="checkErrName(['title']) ? 'err-border' : ''"
              ></TextArea>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'title'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="row w-50">
            <span class="col">
              <TextArea
                v-model="formData.en.canonical"
                :holder="'canonical'"
                :label="'Canonical'"
                :appear="checkErrName(['canonical']) ? 'err-border' : ''"
              ></TextArea>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'canonical'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="row w-50">
            <span class="col">
              <TextArea
                style="direction: rtl"
                v-model="formData.ar.canonical"
                :holder="'العلامات الأساسية'"
                :label="'العلامات الأساسية'"
                :appear="checkErrName(['canonical']) ? 'err-border' : ''"
              ></TextArea>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'canonical'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="row w-50">
            <span class="col">
              <TextArea
                v-model="formData.en.alt"
                :holder="'description'"
                :label="'Img Description'"
                :appear="checkErrName(['alt']) ? 'err-border' : ''"
              ></TextArea>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'alt'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="row w-50">
            <span class="col">
              <TextArea
                style="direction: rtl"
                v-model="formData.ar.alt"
                :holder="'الوصف'"
                :label="'الوصف الصوره'"
                :appear="checkErrName(['alt']) ? 'err-border' : ''"
              ></TextArea>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'alt'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="row w-50">
            <span class="col">
              <TextArea
                v-model="formData.en.type"
                :holder="'type'"
                :label="'Type'"
                :appear="checkErrName(['type']) ? 'err-border' : ''"
              ></TextArea>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'type'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="row w-50">
            <span class="col">
              <TextArea
                style="direction: rtl"
                v-model="formData.ar.type"
                :holder="'النوع'"
                :label="'النوع'"
                :appear="checkErrName(['type']) ? 'err-border' : ''"
              ></TextArea>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'type'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="row w-50">
            <span class="col">
              <TextArea
                v-model="formData.en.desc"
                :holder="'description'"
                :label="'Description'"
                :appear="checkErrName(['desc']) ? 'err-border' : ''"
              ></TextArea>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'desc'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="row w-50">
            <span class="col">
              <TextArea
                style="direction: rtl"
                v-model="formData.ar.desc"
                :holder="'الوصف'"
                :label="'الوصف'"
                :appear="checkErrName(['desc']) ? 'err-border' : ''"
              ></TextArea>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'desc'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="row w-50">
            <span class="col">
              <TextArea
                v-model="formData.en.keyWords"
                :holder="'keywords'"
                :label="'keywords'"
                :appear="checkErrName(['keyWords']) ? 'err-border' : ''"
              ></TextArea>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'keyWords'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="row w-50">
            <span class="col">
              <TextArea
                style="direction: rtl"
                v-model="formData.ar.keyWords"
                :holder="'الكلمات الرئيسية'"
                :label="'الكلمات الرئيسية'"
                :appear="checkErrName(['keyWords']) ? 'err-border' : ''"
              ></TextArea>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'keyWords'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
        </div>

        <div class="modal-footer mx-auto gap-4" style="border: none">
          <button v-if="!isLoading" type="submit" class="modal-add-btn mx-auto">
            Update
          </button>
          <button v-else class="modal-add-btn mx-auto" disabled>
            <div class="spinner-grow me-3" role="status"></div>
            <span> Loading...</span>
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import TextArea from "@/reusables/inputs/TextArea.vue";
// validation
import useVuelidator from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
required.$message = "Field is required";

import { ref, watch, defineProps } from "vue";
import { useSeoStore } from "@/stores/alJubairiStore/seoStore";

const selector = ref("addSe");
const emit = defineEmits(["resetSeo"]);
const isLoading = ref(false);

const props = defineProps({
  itemData: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

watch(
  () => props.itemData,
  () => {
    if (!props.itemData?.metadata?.id) {
      formData.value.metadataableId = props?.itemData.id;

      return;
    }
    formData.value.ar.title = props?.itemData?.metadata?.ar?.title;
    formData.value.en.title = props?.itemData?.metadata?.en?.title;

    formData.value.ar.canonical = props?.itemData?.metadata?.ar?.canonical_tags;
    formData.value.en.canonical = props?.itemData?.metadata?.en?.canonical_tags;

    formData.value.ar.alt = props?.itemData?.metadata?.ar?.image;
    formData.value.en.alt = props?.itemData?.metadata?.en?.image;

    formData.value.ar.type = props?.itemData?.metadata?.ar?.type;
    formData.value.en.type = props?.itemData?.metadata?.en?.type;

    formData.value.ar.desc = props?.itemData?.metadata?.ar?.description;
    formData.value.en.desc = props?.itemData?.metadata?.en?.description;

    formData.value.ar.keyWords = props?.itemData?.metadata?.ar?.keywords;
    formData.value.en.keyWords = props?.itemData?.metadata?.en?.keywords;
  }
);

const formData = ref({
  ar: {
    title: "",
    canonical: "",
    alt: "",
    type: "",
    desc: "",
    keyWords: "",
  },
  en: {
    title: "",
    canonical: "",
    alt: "",
    type: "",
    desc: "",
    keyWords: "",
  },

  metadataableTyp: "page",
  metadataableId: "",
});

const validationRules = ref({});

const checkErrName = (key) => {
  return validationObj.value.$errors.find((err) => err.$property == key);
};

const validationObj = useVuelidator(validationRules, formData);

const closeModal = () => {
  resetFormData();
  emit("resetSeo");

  document.querySelector("#close-modal").click();
};

const resetFormData = () => {
  // reset form
  formData.value = {
    ar: {
      title: "",
      canonical: "",
      alt: "",
      type: "",
      desc: "",
      keyWords: "",
    },
    en: {
      title: "",
      canonical: "",
      alt: "",
      type: "",
      desc: "",
      keyWords: "",
    },

    metadataableTyp: "page",
    metadataableId: "",
  };
  validationObj.value.$reset();
  document.getElementById(selector.value).reset();
};

const addMeta = async () => {
  isLoading.value = true;
  const result = await validationObj.value.$validate();
  if (result) {
    const res = await useSeoStore()
      .addMeta({
        "ar[title]": formData.value.ar.title,
        "en[title]": formData.value.en.title,
        "ar[canonical_tags]": formData.value.ar.canonical,
        "en[canonical_tags]": formData.value.en.canonical,
        "ar[image]": formData.value.ar.alt,
        "en[image]": formData.value.en.alt,
        "ar[type]": formData.value.ar.type,
        "en[type]": formData.value.en.type,
        "ar[description]": formData.value.ar.desc,
        "en[description]": formData.value.en.desc,
        "ar[keywords]": formData.value.ar.keyWords,
        "en[keywords]": formData.value.en.keyWords,
        metadataable_type: formData.value.metadataableTyp,
        metadataable_id: formData.value.metadataableId,
      })
      .then(async () => {
        closeModal();
      })
      .finally(() => {
        isLoading.value = false;
      });
  }
  isLoading.value = false;
};

const updateMeta = async () => {
  isLoading.value = true;
  const result = await validationObj.value.$validate();
  if (result) {
    const res = await useSeoStore()
      .editMeta(props.itemData?.metadata?.id, {
        _method: "PUT",
        "ar[title]": formData.value.ar.title,
        "en[title]": formData.value.en.title,
        "ar[canonical_tags]": formData.value.ar.canonical,
        "en[canonical_tags]": formData.value.en.canonical,
        "ar[image]": formData.value.ar.alt,
        "en[image]": formData.value.en.alt,
        "ar[type]": formData.value.ar.type,
        "en[type]": formData.value.en.type,
        "ar[description]": formData.value.ar.desc,
        "en[description]": formData.value.en.desc,
        "ar[keywords]": formData.value.ar.keyWords,
        "en[keywords]": formData.value.en.keyWords,
      })
      .then(async () => {
        closeModal();
      })
      .finally(() => {
        isLoading.value = false;
      });
  }
  isLoading.value = false;
};

const handleAction = () => {
  if (props.itemData?.metadata?.id) {
    updateMeta();
  } else {
    addMeta();
  }
};
</script>

<style lang="scss" scoped></style>
<!-- {
  "ar": {
    "title": "العنوان بالعربية",
    "canonical_tags": "https://example.com/ar",
    "image": "https://example.com/ar-image.jpg",
    "type": "website",
    "description": "وصف الموقع بالعربية",
    "keywords": "موقع, عربي, بحث"
  },
  "en": {
    "title": "Title in English",
    "canonical_tags": "https://example.com/en",
    "image": "https://example.com/en-image.jpg",
    "type": "website",
    "description": "Description in English",
    "keywords": "website, english, search"
  }
} -->
