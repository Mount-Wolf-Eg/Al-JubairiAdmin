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
import UploadeFile from "@/reusables/inputs/UploadeFile.vue";
import { useItemsStore } from "@/stores/alJubairiStore/itemsStore";
// validation
import useVuelidator from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
required.$message = "Field is required";

import { ref, watch, defineProps } from "vue";
import { storeToRefs } from "pinia";
import { usePackageStore } from "@/stores/settings/packageStore";
import { usePageStore } from "@/stores/alJubairiStore/pageStore";

const selector = ref("addPage");
const emit = defineEmits(["resetItem"]);
const isLoading = ref(false);

const props = defineProps({
  itemData: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

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
});

watch(
  () => props.itemData,
  () => {
    if (!props.itemData.id) {
      return;
    }
    console.log(props.itemData);

    formData.value.name.ar = props.itemData.ar?.name;
    formData.value.title.tar = props.itemData.ar?.title;
    formData.value.desc.dar = props.itemData.ar?.desc;
    formData.value.name.en = props.itemData.en?.name;
    formData.value.title.ten = props.itemData.en?.title;
    formData.value.desc.den = props.itemData.en?.desc;
  }
);

const validationRules = ref({
  name: {
    en: { required, minLength: minLength(1) },
    ar: { required, minLength: minLength(1) },
  },
  title: {
    tar: { required, minLength: minLength(1) },
    ten: { required, minLength: minLength(1) },
  },
  desc: {
    dar: { required, minLength: minLength(1) },
    den: { required, minLength: minLength(1) },
  },
});

const checkErrName = (key) => {
  return validationObj.value.$errors.find((err) => err.$property == key);
};

const validationObj = useVuelidator(validationRules, formData);

const closeModal = () => {
  resetFormData();
  emit("resetItem");

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
    const res = await usePageStore()
      .editPage(props.itemData.id, {
        _method: "PUT",
        "en[name]": formData.value.name.en,
        "ar[name]": formData.value.name.ar,
        "en[title]": formData.value.title.ten,
        "ar[title]": formData.value.title.tar,
        "en[desc]": formData.value.desc.den,
        "ar[desc]": formData.value.desc.dar,
        type: props.itemData.type,
      })
      .then(async () => {
        await usePageStore().getPages();
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
