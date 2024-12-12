<template>
  <form
    @submit.prevent="handleAction()"
    class="modal fade modal-xl"
    id="addPack"
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
                :holder="'name en'"
                :label="'Name (EN)'"
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
          <!-- name ar -->
          <span class="row w-50">
            <span class="col">
              <InptField
                v-model="formData.name.ar"
                :holder="'name ar'"
                :label="'Name (AR)'"
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

          <!-- description en -->
          <span class="row w-50">
            <span class="col">
              <InptField
                v-model="formData.packContent.enn"
                :holder="'description en'"
                :label="'Description (EN)'"
                :appear="checkErrName(['enn']) ? 'err-border' : ''"
              ></InptField>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'enn'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <!-- description ar -->
          <span class="row w-50">
            <span class="col">
              <InptField
                v-model="formData.packContent.arr"
                :holder="'description ar'"
                :label="'Description (AR)'"
                :appear="checkErrName(['arr']) ? 'err-border' : ''"
              ></InptField>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'arr'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>

          <!-- content en -->
          <span class="row w-50">
            <span class="col">
              <TextArea
                v-model="formData.content.cen"
                :holder="'content en'"
                :label="'content (EN)'"
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
          <!-- content ar -->
          <span class="row w-50">
            <span class="col">
              <TextArea
                v-model="formData.content.car"
                :holder="'content ar'"
                :label="'content (AR)'"
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
            <!-- category -->
            <span
              class="col d-flex flex-column align-items-center justify-content-center"
            >
              <label
                for="inpt-field"
                style="
                  background-color: transparent !important;
                  color: var(--col-text) !important;
                  font-size: var(--fs-16) !important;
                  font-weight: var(--fw-bold) !important;
                  line-height: var(--line-h-20) !important;
                "
                class="inpt-label w-100"
                >Categories</label
              >
              <MultiSelect
                class="w-100"
                id="inpt-field"
                :select="categoryData"
                :appear="checkErrName(['category']) ? 'err-border' : ''"
              />
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'category'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>

          <span class="row w-50">
            <span class="col">
              <InptField
                v-model="formData.appStore"
                :holder="'App store'"
                :label="'App store'"
                :appear="checkErrName(['appStore']) ? 'err-border' : ''"
              ></InptField>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'appStore'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="row w-50">
            <span class="col">
              <InptField
                v-model="formData.playStore"
                :holder="'Play store'"
                :label="'Play store'"
                :appear="checkErrName(['playStore']) ? 'err-border' : ''"
              ></InptField>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'playStore'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="row w-50">
            <span class="col">
              <InptField
                v-model="formData.webUrl"
                :holder="'Web Url'"
                :label="'Web Url'"
                :appear="checkErrName(['webUrl']) ? 'err-border' : ''"
              ></InptField>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'webUrl'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>

          <!-- features dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa -->
          <span class="row w-100">
            <span class="col w-50">
              <InptField
                style="flex: 1"
                v-model="featTitle"
                :holder="'Features Title'"
                :label="'Features '"
                :appear="checkErrName(['features']) ? 'err-border' : ''"
              ></InptField>
            </span>
            <span class="col w-50">
              <span>
                <InptField
                  style="flex: 1"
                  v-model="featDescription"
                  :holder="'Features Description'"
                  :label="'Features '"
                  :appear="checkErrName(['features']) ? 'err-border' : ''"
                ></InptField>
              </span>
            </span>
            <button
              class="addBtn mt-auto col-1 mt-auto"
              type="button"
              @click="addItem()"
              :disabled="!featTitle || !featDescription"
            >
              Add
            </button>
            <span
              class="center-row justify-content-start"
              style="margin-top: -1rem; margin-bottom: 1rem"
              v-for="(err, i) in validationObj.$errors"
              :key="i"
              ><span v-if="err.$property == 'features'" class="err-msg mx-auto">
                <!-- {{ err.$message }} -->

                At Least One Feature Is Required
              </span></span
            >
            <ul
              class="target-list"
              style="color: var(--col-text); list-style: none"
            >
              <li v-for="(ser, j) in formData.features" :key="j">
                <span class="w-50">title:{{ ser.title }}</span>
                <span class="w-50">description:{{ ser.description }}</span>

                <button type="button" @click="deleteItem(ser)">-</button>
              </li>
            </ul>
          </span>

          <span class="row w-50">
            <span class="col">
              <InptField
                v-model="formData.imgDescription.ennn"
                :holder="'first description en'"
                :label="'First Image Description (EN)'"
                :appear="checkErrName(['ennn']) ? 'err-border' : ''"
              ></InptField>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'ennn'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>

          <!-- image description ar -->
          <span class="row w-50">
            <!-- Name -->
            <span class="col">
              <InptField
                v-model="formData.imgDescription.arrr"
                :holder="'first description ar'"
                :label="'First Image Description (AR)'"
                :appear="checkErrName(['arrr']) ? 'err-border' : ''"
              ></InptField>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'arrr'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <!-- image  -->
          <span class="row w-100">
            <!-- categ -->
            <span class="col">
              <label
                for="attachments"
                style="
                  background-color: transparent !important;
                  color: var(--col-text) !important;
                  font-size: var(--fs-16) !important;
                  font-weight: var(--fw-bold) !important;
                  line-height: var(--line-h-20) !important;
                "
                class="inpt-label w-100"
                >First Image</label
              >
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
          <!-- image description en -->
          <span class="row w-50">
            <span class="col">
              <InptField
                v-model="formData.imgDescription2.emn"
                :holder="'second description en'"
                :label="'Second Image Description (EN)'"
                :appear="checkErrName(['emn']) ? 'err-border' : ''"
              ></InptField>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'emn'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <!-- image description ar -->
          <span class="row w-50">
            <!-- Name -->
            <span class="col">
              <InptField
                v-model="formData.imgDescription2.amr"
                :holder="'second description ar'"
                :label="'Second Image Description (AR)'"
                :appear="checkErrName(['amr']) ? 'err-border' : ''"
              ></InptField>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'amr'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <!-- image2  -->
          <span class="row w-100">
            <!-- categ -->
            <span class="col">
              <label
                for="attachments"
                style="
                  background-color: transparent !important;
                  color: var(--col-text) !important;
                  font-size: var(--fs-16) !important;
                  font-weight: var(--fw-bold) !important;
                  line-height: var(--line-h-20) !important;
                "
                class="inpt-label w-100"
                >Second Image</label
              >
              <UploadeFile
                :for="'two'"
                class="mb-3"
                :reset="resetImg"
                @fileData="formData.img2 = $event"
              ></UploadeFile>
              <img
                v-if="formData.img2"
                class="mt-3"
                :src="formData.img2"
                alt=""
                style="max-width: 10rem; border-radius: 7px"
              />
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'img2'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="row w-100">
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
          </span>
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
import { onMounted, computed } from "vue";
import InptField from "@/reusables/inputs/InptField.vue";
import MultiSelect from "@/reusables/inputs/MultiSelect.vue";
import TextArea from "@/reusables/inputs/TextArea.vue";
import UploadeFile from "@/reusables/inputs/UploadeFile.vue";
import { usePackageStore } from "@/stores/settings/packageStore";
const { allCategories } = storeToRefs(usePackageStore());
// validation
import useVuelidator from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
required.$message = "Field is required";

import { ref, watch, defineProps } from "vue";
import { storeToRefs } from "pinia";

const emit = defineEmits(["resetItem"]);
const isLoading = ref(false);

const props = defineProps({
  package: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

const resetImg = ref(false);
const featTitle = ref("");
const featDescription = ref("");
const included = ref("");
const includedar = ref("");

const formData = ref({
  name: {
    ar: "",
    en: "",
  },
  packContent: {
    arr: "",
    enn: "",
  },
  img: "",
  img2: "",
  imgDescription: {
    arrr: "",
    ennn: "",
  },
  imgDescription2: {
    amr: "",
    emn: "",
  },
  features: [],
  content: {
    car: "",
    cen: "",
  },
  category: "",

  appStore: "",
  playStore: "",
  webUrl: "",
  imgs: [],
});

watch(
  () => props.itemData,
  () => {
    if (!props.itemData.id) {
      return;
    }
    formData.value.name.ar = props.itemData.name.ar;
    formData.value.name.en = props.itemData.name.en;

    formData.value.packContent.arr = props.itemData.content.ar;
    formData.value.packContent.enn = props.itemData.content.en;

    formData.value.img = props.itemData.image;
    formData.value.imgDescription.arrr = props.itemData.image_alt.ar;
    formData.value.imgDescription.ennn = props.itemData.image_alt.en;

    formData.value.img2 = props.itemData.second_image;
    formData.value.imgDescription2.amr = props.itemData.second_image_alt.ar;
    formData.value.imgDescription2.emn = props.itemData.second_image_alt.en;

    formData.value.features = props.itemData.features;

    formData.value.content.car = props.itemData.content.ar;
    formData.value.content.cen = props.itemData.content.en;

    formData.value.attachments = props.itemData.attachments;

    formData.value.appStore = props.itemData.settings?.app_store_url;
    formData.value.playStore = props.itemData.settings?.play_store_url;
    formData.value.webUrl = props.itemData.settings?.site_url;

    formData.value.category = props.itemData.category_id;

    categoryData.value.value = props.itemData.category_id;
    formData.value.imgs = props.itemData.attachments;
    categoryData.value.placeholder = allCategories.value.find(
      (c) => c.id == props.itemData.category_id
    ).name;
  }
);

const validationRules = ref({
  name: {
    ar: { required, minLength: minLength(1), maxLength: maxLength(100) },
    en: { required, minLength: minLength(1), maxLength: maxLength(100) },
  },
  packContent: {
    arr: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(500),
    },
    enn: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(500),
    },
  },
  img: {
    required,
  },
  img2: {
    required,
  },
  imgDescription: {
    arrr: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(500),
    },
    ennn: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(500),
    },
  },
  imgDescription2: {
    amr: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(500),
    },
    emn: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(500),
    },
  },
  features: { required },
  content: {
    car: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(500),
    },
    cen: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(500),
    },
  },
  category: { required },
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
    packContent: {
      arr: "",
      enn: "",
    },
    img: "",
    imgDescription: {
      arrr: "",
      ennn: "",
    },
    imgDescription2: {
      amr: "",
      emn: "",
    },
    features: [],
    content: {
      car: "",
      cen: "",
    },
    category: "",
    appStore: "",
    playStore: "",
    webUrl: "",
    imgs: [],
  };
  validationObj.value.$reset();
  document.getElementById("addPack").reset();
};

const categoryData = ref({
  value: null,
  label: "name",
  placeholder: "Select category",
  key: "id",
  options: "allCategories.value",
  groups: true,
  options: allCategories.value,
  searchable: true,
  mode: "single",
  valueProp: "id",
  labelProp: "name",
  closeOnSelect: true,
  disabled: false,
  change: (val) => {
    if (val) setCateg(val);
  },
  clear: async () => {
    formData.value.category = "";
  },
});
onMounted(async () => {
  await usePackageStore().getAllCategories();
  categoryData.value.options = allCategories.value;
});

const setCateg = async (val) => {
  formData.value.category = val;
};

const addPack = async () => {
  isLoading.value = true;
  const result = await validationObj.value.$validate();
  if (result) {
    const res = await usePackageStore().addPackage({
      "name[ar]": formData.value.name.ar,
      "name[en]": formData.value.name.en,
      "description[ar]": formData.value.packContent.arr,
      "description[en]": formData.value.packContent.enn,

      image: formData.value.img,
      "image_alt[ar]": formData.value.imgDescription.arrr,
      "image_alt[en]": formData.value.imgDescription.ennn,

      second_image: formData.value.img2,
      "second_image_alt[ar]": formData.value.imgDescription2.amr,
      "second_image_alt[en]": formData.value.imgDescription2.emn,

      "content[ar]": formData.value.content.car,
      "content[en]": formData.value.content.cen,

      features: formData.value.features,

      category_id: formData.value.category,

      "settings[app_store_url]": formData.value.appStore,
      "settings[play_store_url]": formData.value.playStore,
      "settings[site_url]": formData.value.webUrl,
      attachments: formData.value.imgs,
    });
    if (res) {
      closeModal();
    }
  }
  isLoading.value = false;
};

const updatePack = async () => {
  isLoading.value = true;
  const result = await validationObj.value.$validate();
  if (result) {
    const res = await usePackageStore().updatePackage({
      "name[ar]": formData.value.name.ar,
      "name[en]": formData.value.name.en,
      "description[ar]": formData.value.packContent.arr,
      "description[en]": formData.value.packContent.enn,

      image: formData.value.img,
      "image_alt[ar]": formData.value.imgDescription.arrr,
      "image_alt[en]": formData.value.imgDescription.ennn,

      second_image: formData.value.img2,
      "second_image_alt[ar]": formData.value.imgDescription2.amr,
      "second_image_alt[en]": formData.value.imgDescription2.emn,

      "content[ar]": formData.value.content.car,
      "content[en]": formData.value.content.cen,

      features: formData.value.features,

      category_id: formData.value.category,

      "settings[app_store_url]": formData.value.appStore,
      "settings[play_store_url]": formData.value.playStore,
      "settings[site_url]": formData.value.webUrl,
      attachments: formData.value.imgs,
      id: props.itemData.id,
    });
    if (res) {
      closeModal();
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

const addItem = () => {
  formData.value.features.push({
    title: featTitle.value,
    description: featDescription.value,
  });
  featTitle.value = "";
  featDescription.value = "";
};

const deleteItem = (ser) => {
  formData.value.features = formData.value.features.filter(
    (e) => e.title != ser.title && e.description != ser.description
  );
};
</script>

<style lang="scss" scoped></style>
