<template>
  <form
    @submit.prevent="handleAction()"
    class="modal fade modal-xl"
    id="addSlide"
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
          <!-- name en -->
          <span class="row w-50">
            <span class="col">
              <InptField
                v-model="formData.name.en"
                :holder="'name'"
                :label="'Name'"
                :appear="checkErrName(['en']) ? 'err-border' : ''"
              ></InptField>
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
              <InptField
                style="direction: rtl"
                v-model="formData.name.ar"
                :holder="'الاسم'"
                :label="'الاسم'"
                :appear="checkErrName(['ar']) ? 'err-border' : ''"
              ></InptField>
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
              <InptField
                v-model="formData.title.ten"
                :holder="'title'"
                :label="'Title'"
                :appear="checkErrName(['ten']) ? 'err-border' : ''"
              ></InptField>
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
              <InptField
                style="direction: rtl"
                v-model="formData.title.tar"
                :holder="'العنوان'"
                :label="'العنوان'"
                :appear="checkErrName(['tar']) ? 'err-border' : ''"
              ></InptField>
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

          <!-- image  -->
          <span class="row w-100">
            <span class="col">
              <label for="slide" class="inpt-label w-100">Slider Image</label>
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
              <TextArea
                v-model="formData.alt.aen"
                :holder="'img description'"
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
                :holder="'وصف الصورة'"
                :label="'وصف الصورة'"
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
          <!-- <span class="row w-100">
            <label
              for="attachments"
              style="
                background-color: transparent !important;
                color: var(--col-text) !important;
                font-size: var(--fs-16) !important;
                font-weight: var(--fw-bold) !important;
                line-height: var(--line-h-20) !important;
              "
              class="inpt-label w-100 mt-5"
              >attachments</label
            >
            <UploadeFile
              :for="'attachments'"
              :reset="resetImg"
              @fileData="formData.imgs = $event"
            ></UploadeFile>
            <div
              v-for="(img, i) in formData?.imgs"
              :key="i"
              style="width: fit-content"
              class="d-flex flex-column align-item-center justify-content-start flex-wrap"
            >
              <img
                v-if="formData.imgs"
                class="mt-3"
                :src="img"
                alt=""
                style="max-width: 10rem; border-radius: 7px"
              />
            </div>
            <span v-for="(img, i) in formData?.imgs" :key="i"> </span>
          </span> -->
        </div>

        <div class="modal-footer mx-auto gap-4" style="border: none">
          <button v-if="!isLoading" type="submit" class="modal-add-btn mx-auto">
            Add
          </button>
          <button v-else class="modal-add-btn mx-auto">
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
import UploadeFile from "@/reusables/inputs/UploadeFile.vue";
import { useItemsStore } from "@/stores/alJubairiStore/itemsStore";
// validation
import useVuelidator from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
required.$message = "Field is required";

import { ref, watch, defineProps } from "vue";
import { storeToRefs } from "pinia";

const emit = defineEmits(["resetItem"]);
const isLoading = ref(false);

const props = defineProps({
  itemData: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

const resetImg = ref(false);

const formData = ref({
  name: {
    ar: "",
    en: "",
  },
  title: {
    tar: "",
    ten: "",
  },
  desc: {
    dar: "",
    den: "",
  },
  img: "",
  alt: {
    aar: "",
    aen: "",
  },
});

watch(
  () => props.itemData,
  () => {
    if (!props.itemData.id) {
      return;
    }
    formData.value.name.ar = props.itemData.ar?.name;
    formData.value.title.tar = props.itemData.ar?.title;
    formData.value.desc.dar = props.itemData.ar?.desc;
    formData.value.name.en = props.itemData.en?.name;
    formData.value.title.ten = props.itemData.en?.title;
    formData.value.desc.den = props.itemData.en?.desc;
    formData.value.alt.aar = props.itemData.image.ar?.alt;
    formData.value.alt.aen = props.itemData.image.en?.alt;
    formData.value.img = props.itemData.image?.media;
  }
);

const validationRules = ref({
  name: {
    en: { required, minLength: minLength(1), maxLength: maxLength(500) },
    ar: { required, minLength: minLength(1), maxLength: maxLength(500) },
  },
  title: {
    tar: { required, minLength: minLength(1), maxLength: maxLength(500) },
    ten: { required, minLength: minLength(1), maxLength: maxLength(500) },
  },
  desc: {
    dar: { required, minLength: minLength(1), maxLength: maxLength(500) },
    den: { required, minLength: minLength(1), maxLength: maxLength(500) },
  },
  img: {
    required,
  },
  alt: {
    aar: { required, minLength: minLength(1), maxLength: maxLength(500) },
    aen: { required, minLength: minLength(1), maxLength: maxLength(500) },
  },
});

const checkErrName = (key) => {
  return validationObj.value.$errors.find((err) => err.$property == key);
};

const validationObj = useVuelidator(validationRules, formData);

const closeModal = () => {
  resetFormData();
  emit("resetItem");
  resetImg.value = true;
  setTimeout(() => {
    resetImg.value = false;
  }, 500);
  document.querySelector("#close-modal").click();
};

const resetFormData = () => {
  // reset form
  formData.value = {
    name: {
      ar: "",
      en: "",
    },
    title: {
      tar: "",
      ten: "",
    },
    desc: {
      dar: "",
      den: "",
    },
    img: "",
    alt: {
      aar: "",
      aen: "",
    },
  };
  validationObj.value.$reset();
  document.getElementById("addSlide").reset();
};

const addPack = async () => {
  isLoading.value = true;
  const result = await validationObj.value.$validate();
  if (result) {
    const res = await useItemsStore()
      .sendAttachment(formData.value.img)
      .then(async (res) => {
        await useItemsStore()
          .addItem({
            "en[name]": formData.value.name.en,
            "ar[name]": formData.value.name.ar,
            "en[title]": formData.value.title.ten,
            "ar[title]": formData.value.title.tar,
            "en[desc]": formData.value.desc.den,
            "ar[desc]": formData.value.desc.dar,
            "image[media]": res.data.data,
            "image[ar][alt]": formData.value.alt.aar,
            "image[en][alt]": formData.value.alt.aen,
            section_id: 1,
          })
          .then(async () => {
            await useItemsStore().getItems("slider", "home");
            closeModal();
          });
      });
  }
  isLoading.value = false;
};

const updatePack = async () => {
  isLoading.value = true;
  const result = await validationObj.value.$validate();
  if (result) {
    console.log(typeof formData.value.img);
    if (typeof formData.value.img == "object") {
      const res = await useItemsStore()
        .sendAttachment(formData.value.img)
        .then(async (res) => {
          await useItemsStore()
            .editItem(props.itemData.id, {
              _method: "PUT",
              "en[name]": formData.value.name.en,
              "ar[name]": formData.value.name.ar,
              "en[title]": formData.value.title.ten,
              "ar[title]": formData.value.title.tar,
              "en[desc]": formData.value.desc.den,
              "ar[desc]": formData.value.desc.dar,
              "image[media]": res.data.data,
              "image[ar][alt]": formData.value.alt.aar,
              "image[en][alt]": formData.value.alt.aen,
              section_id: 1,
            })
            .then(async () => {
              await useItemsStore().getItems("slider", "home");
              closeModal();
            });
        });
    } else {
      const res = await useItemsStore()
        .editItem(props.itemData.id, {
          _method: "PUT",
          "en[name]": formData.value.name.en,
          "ar[name]": formData.value.name.ar,
          "en[title]": formData.value.title.ten,
          "ar[title]": formData.value.title.tar,
          "en[desc]": formData.value.desc.den,
          "ar[desc]": formData.value.desc.dar,
          "image[media]": props.itemData.image.media_name,
          "image[ar][alt]": formData.value.alt.aar,
          "image[en][alt]": formData.value.alt.aen,
          section_id: 1,
        })
        .then(async () => {
          await useItemsStore().getItems("slider", "home");
          closeModal();
        });
    }
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
