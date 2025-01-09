<template>
  <div class="settings-page" v-if="!pageLoad">
    <form action="#" @submit.prevent="handleSetting" style="position: relative">
      <span class="row d-flex flex-wrap">
        <span class="mb-5 row">
          <span class="row w-100">
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
import TextEditor from "@/reusables/ckEditor/TextEditor.vue";
import { useItemsStore } from "@/stores/alJubairiStore/itemsStore";
import useVuelidator from "@vuelidate/core";
import { required, url, email, numeric } from "@vuelidate/validators";
import { storeToRefs } from "pinia";
required.$message = "Field is required";
const { singleItem, allItems } = storeToRefs(useItemsStore());
const isLoading = ref(false);
const pageLoad = ref(true);

const formData = ref({
  desc: {
    ar: "",
    en: "",
  },
});

onMounted(async () => {
  await useItemsStore().getItems("", "privacy", "privacy");
  formData.value.desc.ar = allItems.value.find((el) => el.id == 143)?.ar?.desc;
  formData.value.desc.en = allItems.value.find((el) => el.id == 143)?.en?.desc;
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
    await useItemsStore().editItem("143", {
      _method: "PUT",
      "en[desc]": formData.value.desc.en,
      "ar[desc]": formData.value.desc.ar,
      section_id: 23,
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
</style>
