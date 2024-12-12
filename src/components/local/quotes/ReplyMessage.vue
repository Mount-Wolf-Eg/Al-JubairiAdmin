<template>
  <form
    @submit.prevent="handleAction()"
    class="modal fade modal-xl"
    id="replyMessage"
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
          <span class="row w-100">
            <!-- name -->
            <span>
              <TextArea
                v-model="formData.reply"
                :holder="'Message'"
                :label="'Write Message'"
                :appear="checkErrName(['reply']) ? 'err-border' : ''"
              ></TextArea>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'reply'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
        </div>
        <div class="modal-footer mx-auto gap-4" style="border: none">
          <button v-if="!isLoading" type="submit" class="modal-add-btn mx-auto">
            Send
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
import TextArea from "@/reusables/inputs/TextArea.vue";
import { contactUsStore } from "@/stores/settings/contactUs";

// validation
import useVuelidator from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
required.$message = "Field is required";

import { ref, watch } from "vue";

const props = defineProps({
  repMsg: {
    type: Number,
    required: false,
  },
});

const isLoading = ref(false);

const formData = ref({
  reply: "",
});

const validationRules = ref({
  reply: {
    required,
    minLength: minLength(3),
    maxLength: maxLength(250),
  },
});

const checkErrName = (key) => {
  return validationObj.value.$errors.find((err) => err.$property == key);
};

const validationObj = useVuelidator(validationRules, formData);

const closeModal = () => {
  resetFormData();
  document.querySelector("#close-modal").click();
};

const resetFormData = () => {
  // reset form
  formData.value = {
    reply: "",
  };
  validationObj.value.$reset();
  document.getElementById("replyMessage").reset();
};

const SendMessage = async () => {
  isLoading.value = true;
  const result = await validationObj.value.$validate();
  if (result) {
    const res = await contactUsStore().replyMessage({
      reply: formData.value.reply,
      id: props.repMsg,
    });
    if (res) {
      closeModal();
    }
  }
  isLoading.value = false;
};

const handleAction = () => {
  SendMessage();
};
</script>

<style lang="scss" scoped></style>
