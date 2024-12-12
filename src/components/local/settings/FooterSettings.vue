<template>
  <div class="settings-page">
    <form action="#" @submit.prevent="handleSetting" style="position: relative">
      <span class="row d-flex flex-wrap">
        <p class="sec-label">Egypt</p>
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
            <InptField
              v-model="formData.egyAddress"
              :holder="'address'"
              :label="'Address (Egypt)'"
              :appear="checkErrName(['egyAddress']) ? 'err-border' : ''"
            ></InptField>
            <span
              class="center-row justify-content-start"
              style="margin-top: -1rem; margin-bottom: 1rem"
              v-for="(err, i) in validationObj.$errors"
              :key="i"
              ><span v-if="err.$property == 'egyAddress'" class="err-msg">
                {{ err.$message }}
              </span></span
            >
          </span>

          <span class="col-6">
            <InptField
              v-model="formData.egyMobile"
              :holder="'number'"
              :label="'Number (Egypt)'"
              :appear="checkErrName(['egyMobile']) ? 'err-border' : ''"
            ></InptField>
            <span
              class="center-row justify-content-start"
              style="margin-top: -1rem; margin-bottom: 1rem"
              v-for="(err, i) in validationObj.$errors"
              :key="i"
              ><span v-if="err.$property == 'egyMobile'" class="err-msg">
                {{ err.$message }}
              </span></span
            >
          </span>

          <span class="col-6">
            <InptField
              v-model="formData.egyMail"
              :holder="'email'"
              :label="'Email (Egypt)'"
              :appear="checkErrName(['egyMail']) ? 'err-border' : ''"
            ></InptField>
            <span
              class="center-row justify-content-start"
              style="margin-top: -1rem; margin-bottom: 1rem"
              v-for="(err, i) in validationObj.$errors"
              :key="i"
              ><span v-if="err.$property == 'egyMail'" class="err-msg">
                {{ err.$message }}
              </span></span
            >
          </span>
        </span>
        <p class="sec-label">UAE</p>

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
            <InptField
              v-model="formData.uaeAddress"
              :holder="'address'"
              :label="'Address (UAE)'"
              :appear="checkErrName(['uaeAddress']) ? 'err-border' : ''"
            ></InptField>
            <span
              class="center-row justify-content-start"
              style="margin-top: -1rem; margin-bottom: 1rem"
              v-for="(err, i) in validationObj.$errors"
              :key="i"
              ><span v-if="err.$property == 'uaeAddress'" class="err-msg">
                {{ err.$message }}
              </span></span
            >
          </span>

          <span class="col-6">
            <InptField
              v-model="formData.uaeMobile"
              :holder="'number'"
              :label="'Number (UAE)'"
              :appear="checkErrName(['uaeMobile']) ? 'err-border' : ''"
            ></InptField>
            <span
              class="center-row justify-content-start"
              style="margin-top: -1rem; margin-bottom: 1rem"
              v-for="(err, i) in validationObj.$errors"
              :key="i"
              ><span v-if="err.$property == 'uaeMobile'" class="err-msg">
                {{ err.$message }}
              </span></span
            >
          </span>

          <span class="col-6">
            <InptField
              v-model="formData.uaeMail"
              :holder="'email'"
              :label="'Email (UAE)'"
              :appear="checkErrName(['uaeMail']) ? 'err-border' : ''"
            ></InptField>
            <span
              class="center-row justify-content-start"
              style="margin-top: -1rem; margin-bottom: 1rem"
              v-for="(err, i) in validationObj.$errors"
              :key="i"
              ><span v-if="err.$property == 'uaeMail'" class="err-msg">
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
              :label="'whatsApp Number'"
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
              :label="'Facebook Link'"
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
              :label="'Linked in'"
              :holder="'Linked in Link'"
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
              :label="'Instagram Link'"
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
              :holder="'youtube Link'"
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
              :label="'tiktok Link'"
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

          <span class="col-6">
            <InptField
              v-model="formData.Snapchat"
              :label="'Snapchat'"
              :holder="'Snapchat Link'"
              :appear="checkErrName(['Snapchat']) ? 'err-border' : ''"
            ></InptField>
            <span
              class="center-row justify-content-start"
              style="margin-top: -1rem; margin-bottom: 1rem"
              v-for="(err, i) in validationObj.$errors"
              :key="i"
              ><span v-if="err.$property == 'Snapchat'" class="err-msg">
                {{ err.$message }}
              </span></span
            >
          </span>

          <span class="col">
            <InptField
              v-model="formData.x"
              :label="'Twitter'"
              :holder="'Twitter Link'"
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
</template>

<script setup>
// Validator
import { onMounted, ref, watch } from "vue";
import InptField from "@/reusables/inputs/InptField.vue";
import UploadeFile from "@/reusables/inputs/UploadeFile.vue";
import { contactSettings } from "@/stores/settings/contactsStore";
import { storeToRefs } from "pinia";
import useVuelidator from "@vuelidate/core";
import { required, url, email, numeric } from "@vuelidate/validators";
required.$message = "Field is required";

const { allContacts } = storeToRefs(contactSettings());

const isLoading = ref(false);

const formData = ref({
  egyAddress: "",
  egyMobile: "",
  egyMail: "",
  uaeAddress: "",
  uaeMobile: "",
  uaeMail: "",

  whatsApp: "",
  facebook: "",
  linkedIn: "",
  instagram: "",
  youtube: "",
  tikTok: "",
  Snapchat: "",
  x: "",
});

onMounted(async () => {
  await contactSettings().getAllContacts();
  formData.value.egyAddress = allContacts.value.egy_address;

  formData.value.egyMail = allContacts.value.egy_email;

  formData.value.egyMobile = allContacts.value.egy_mobile;

  formData.value.uaeAddress = allContacts.value.uae_address;

  formData.value.uaeMail = allContacts.value.uae_email;

  formData.value.uaeMobile = allContacts.value.uae_mobile;

  formData.value.facebook = allContacts.value.facebook;
  formData.value.linkedIn = allContacts.value.linkedin;
  formData.value.instagram = allContacts.value.instagram;
  formData.value.youtube = allContacts.value.youtube;
  formData.value.tikTok = allContacts.value.tiktok;
  formData.value.Snapchat = allContacts.value.snapchat;
  formData.value.x = allContacts.value.twitter;
});

const validationRules = ref({
  egyAddress: { required },
  uaeAddress: { required },

  egyMobile: { required, numeric },
  uaeMobile: { required, numeric },

  egyMail: { required, email },
  uaeMail: { required, email },

  whatsApp: { numeric },
  facebook: { url },
  linkedIn: { url },
  instagram: { url },
  youtube: { url },
  tikTok: { url },
  Snapchat: { url },
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
    let res = await contactSettings().updateContacts({
      "settings[egy_address]": formData.value.egyAddress,
      "settings[egy_email]": formData.value.egyMail,
      "settings[egy_mobile]": formData.value.egyMobile,

      "settings[uae_address]": formData.value.uaeAddress,
      "settings[uae_email]": formData.value.uaeMail,
      "settings[uae_mobile]": formData.value.uaeMobile,

      "settings[youtube]": formData.value.youtube,
      "settings[tikTok]": formData.value.tikTok,
      "settings[Snapchat]": formData.value.Snapchat,
      "settings[twitter]": formData.value.x,
      "settings[facebook]": formData.value.facebook,
      "settings[instagram]": formData.value.instagram,
      "settings[linked_in]": formData.value.linkedIn,
    });
    if (res) {
      await contactSettings().getAllContacts();
    }
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
