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
                v-model="formData.title.en"
                :holder="'title'"
                :label="'Title'"
                :appear="checkErrName(['en']) ? 'err-border' : ''"
              ></TextArea>
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
          <span class="row w-50">
            <span class="col">
              <TextArea
                style="direction: rtl"
                v-model="formData.title.ar"
                :holder="'العنوان'"
                :label="'العنوان'"
                :appear="checkErrName(['ar']) ? 'err-border' : ''"
              ></TextArea>
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
          </span>
          <span class="row w-50">
            <span class="col">
              <TextArea
                v-model="formData.canonical.cen"
                :holder="'canonical'"
                :label="'Canonical'"
                :appear="checkErrName(['cen']) ? 'err-border' : ''"
              ></TextArea>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'cen'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="row w-50">
            <span class="col">
              <TextArea
                style="direction: rtl"
                v-model="formData.canonical.car"
                :holder="'العلامات الأساسية'"
                :label="'العلامات الأساسية'"
                :appear="checkErrName(['car']) ? 'err-border' : ''"
              ></TextArea>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'car'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="row w-50">
            <span class="col">
              <TextArea
                v-model="formData.alt.aen"
                :holder="'description'"
                :label="'Img Description'"
                :appear="checkErrName(['aen']) ? 'err-border' : ''"
              ></TextArea>
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
              <TextArea
                style="direction: rtl"
                v-model="formData.alt.aar"
                :holder="'الوصف'"
                :label="'الوصف الصوره'"
                :appear="checkErrName(['aar']) ? 'err-border' : ''"
              ></TextArea>
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
          <span class="row w-50">
            <span class="col">
              <TextArea
                v-model="formData.type.ten"
                :holder="'type'"
                :label="'Type'"
                :appear="checkErrName(['ten']) ? 'err-border' : ''"
              ></TextArea>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'ten'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="row w-50">
            <span class="col">
              <TextArea
                style="direction: rtl"
                v-model="formData.type.tar"
                :holder="'النوع'"
                :label="'النوع'"
                :appear="checkErrName(['tar']) ? 'err-border' : ''"
              ></TextArea>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'tar'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="row w-50">
            <span class="col">
              <TextArea
                v-model="formData.desc.den"
                :holder="'description'"
                :label="'Description'"
                :appear="checkErrName(['den']) ? 'err-border' : ''"
              ></TextArea>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'den'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="row w-50">
            <span class="col">
              <TextArea
                style="direction: rtl"
                v-model="formData.desc.dar"
                :holder="'الوصف'"
                :label="'الوصف'"
                :appear="checkErrName(['dar']) ? 'err-border' : ''"
              ></TextArea>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'dar'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="row w-50">
            <span class="col">
              <TextArea
                v-model="formData.keyWords.ken"
                :holder="'keywords'"
                :label="'keywords'"
                :appear="checkErrName(['ken']) ? 'err-border' : ''"
              ></TextArea>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'ken'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="row w-50">
            <span class="col">
              <TextArea
                style="direction: rtl"
                v-model="formData.keyWords.kar"
                :holder="'الكلمات الرئيسية'"
                :label="'الكلمات الرئيسية'"
                :appear="checkErrName(['kar']) ? 'err-border' : ''"
              ></TextArea>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'kar'" class="err-msg">
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
import InptField from "@/reusables/inputs/InptField.vue";
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
    if (!props.itemData.id) {
      return;
    }

    // formData.value.name.ar = props.itemData.ar?.name;
    // formData.value.title.tar = props.itemData.ar?.title;
    // formData.value.desc.dar = props.itemData.ar?.desc;
    // formData.value.name.en = props.itemData.en?.name;
    // formData.value.title.ten = props.itemData.en?.title;
    // formData.value.desc.den = props.itemData.en?.desc;
  }
);

const formData = ref({
  title: {
    ar: props?.itemData?.ar?.title || "",
    en: props?.itemData?.en?.title || "",
  },
  canonical: {
    car: props?.itemData?.ar?.canonical_tags || "",
    cen: props?.itemData?.en?.canonical_tags || "",
  },
  alt: {
    aar: props?.itemData?.ar?.image || "",
    aen: props?.itemData?.en?.image || "",
  },
  type: {
    tar: props?.itemData?.ar?.type || "",
    ten: props?.itemData?.en?.type || "",
  },
  desc: {
    dar: props?.itemData?.ar?.description || "",
    den: props?.itemData?.en?.description || "",
  },
  keyWords: {
    kar: props?.itemData?.ar?.keywords || "",
    ken: props?.itemData?.en?.keywords || "",
  },
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
    for: props?.itemData?.type || "",
    title: {
      ar: "",
      en: "",
    },
    canonical: {
      car: "",
      cen: "",
    },
    alt: {
      aar: "",
      aen: "",
    },
    type: {
      tar: "",
      ten: "",
    },
    desc: {
      dar: "",
      den: "",
    },
    keyWords: {
      kar: "",
      ken: "",
    },
  };
  validationObj.value.$reset();
  document.getElementById(selector.value).reset();
};

// const addPack = async () => {
//   isLoading.value = true;
//   const result = await validationObj.value.$validate();
//   if (result) {
//     const res = await useItemsStore()
//       .sendAttachment(formData.value.img)
//       .then(async (res) => {
//         await useItemsStore()
//           .addItem({
//             "en[name]": formData.value.name.en,
//             "ar[name]": formData.value.name.ar,
//             "en[title]": formData.value.title.ten,
//             "ar[title]": formData.value.title.tar,
//             "en[desc]": formData.value.desc.den,
//             "ar[desc]": formData.value.desc.dar,
//             "image[media]": res.data.data,
//             "image[ar][alt]": formData.value.alt.aar,
//             "image[en][alt]": formData.value.alt.aen,
//             section_id: 1,
//           })
//           .then(async () => {
//             await useItemsStore().getItems("slider", "home");
//             closeModal();
//           })
//           .finally(() => {
//             isLoading.value = false;
//           });
//       });
//   }
//   isLoading.value = false;
// };

const updatePack = async () => {
  isLoading.value = true;
  const result = await validationObj.value.$validate();
  if (result) {
    const res = await useSeoStore()
      .editMeta(props.itemData.id, {
        _method: "PUT",
        for: props.itemData.type,
        "ar[title]": formData.value.title.ar,
        "en[title]": formData.value.title.en,
        "ar[canonical_tags]": formData.value.canonical.car,
        "en[canonical_tags]": formData.value.canonical.cen,
        "ar[image]": formData.value.alt.aar,
        "en[image]": formData.value.alt.aen,
        "ar[type]": formData.value.type.tar,
        "en[type]": formData.value.type.ten,
        "ar[description]": formData.value.desc.dar,
        "en[description]": formData.value.desc.den,
        "ar[keywords]": formData.value.keyWords.kar,
        "en[keywords]": formData.value.keyWords.ken,
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
  if (props.itemData.id) {
    updatePack();
  } else {
    addPack();
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
