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

          <div class="modal-footer mx-auto gap-4" style="border: none">
            <button
              v-if="!isLoading"
              type="submit"
              class="modal-add-btn mx-auto"
            >
              Add
            </button>
            <button v-else class="modal-add-btn mx-auto" disabled>
              <div class="spinner-grow me-3" role="status"></div>
              <span> Loading...</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import InptField from "@/reusables/inputs/InptField.vue";
import { useItemsStore } from "@/stores/alJubairiStore/itemsStore";
// validation
import useVuelidator from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
required.$message = "Field is required";

import { ref, watch, defineProps } from "vue";
import { storeToRefs } from "pinia";

const emit = defineEmits(["resetItem"]);
const isLoading = ref(false);
const pageLoads = ref(true);
const selector = ref("addCateg");
const sec_id = ref(20);
const sec_name = ref("Blogs");
const page_name = ref("Blogs");

const props = defineProps({
  itemData: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

const resetImg = ref(false);

const formData = ref({
  title: {
    tar: "",
    ten: "",
  },
});

watch(
  () => props.itemData,
  () => {
    if (!props.itemData.id) {
      return;
    }
    formData.value.title.tar = props.itemData.ar?.title;
    formData.value.title.ten = props.itemData.en?.title;
    pageLoads.value = false;
  }
);

const validationRules = ref({
  title: {
    tar: { required, minLength: minLength(1), maxLength: maxLength(500) },
    ten: { required, minLength: minLength(1), maxLength: maxLength(500) },
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
    title: {
      tar: "",
      ten: "",
    },
  };

  validationObj.value.$reset();
  document.getElementById(selector.value).reset();
};

const addPack = async () => {
  isLoading.value = true;
  const result = await validationObj.value.$validate();
  if (result) {
    await useItemsStore()
      .addItem({
        "en[title]": formData.value.title.ten,
        "ar[title]": formData.value.title.tar,

        section_id: sec_id.value,
      })
      .then(async () => {
        await useItemsStore().getItems("", sec_name.value, page_name.value);
        closeModal();
      })
      .finally(() => (isLoading.value = false));
  }
  isLoading.value = false;
};

const updatePack = async () => {
  isLoading.value = true;
  const result = await validationObj.value.$validate();
  if (result) {
    const res = await useItemsStore()
      .editItem(props.itemData.id, {
        _method: "PUT",
        "en[title]": formData.value.title.ten,
        "ar[title]": formData.value.title.tar,

        section_id: sec_id.value,
      })
      .then(async () => {
        await useItemsStore().getItems("", sec_name.value, page_name.value);
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
