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
                v-model="formData.name"
                :holder="'name'"
                :label="'Name'"
                :appear="checkErrName(['name']) ? 'err-border' : ''"
              ></InptField>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'name'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>

          <span class="row w-50">
            <span class="col">
              <InptField
                v-model="formData.email"
                :holder="'Email'"
                :label="'Email'"
                :appear="checkErrName(['email']) ? 'err-border' : ''"
              ></InptField>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'email'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>

          <span class="row w-50">
            <span class="col">
              <InptField
                v-model="formData.pass"
                :holder="'password'"
                :label="'password'"
                :appear="checkErrName(['pass']) ? 'err-border' : ''"
              ></InptField>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'pass'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="row w-50">
            <span class="col">
              <InptField
                v-model="formData.code"
                :holder="'phone code'"
                :label="'phone code'"
                :appear="checkErrName(['code']) ? 'err-border' : ''"
              ></InptField>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'code'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="row w-50">
            <span class="col">
              <InptField
                v-model="formData.phone"
                :holder="'phone'"
                :label="'phone'"
                :appear="checkErrName(['phone']) ? 'err-border' : ''"
              ></InptField>
              <span
                class="center-row justify-content-start"
                style="margin-top: -1rem; margin-bottom: 1rem"
                v-for="(err, i) in validationObj.$errors"
                :key="i"
                ><span v-if="err.$property == 'phone'" class="err-msg">
                  {{ err.$message }}
                </span></span
              >
            </span>
          </span>
          <span class="row w-50">
            <span class="col my-5">
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
                >Select Role</label
              >
              <MultiSelect
                class="w-100 mt-3"
                id="inpt-field"
                :select="categoryData"
            /></span>
          </span>

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
        </div>

        <div class="modal-footer mx-auto gap-4" style="border: none">
          <button v-if="!isLoading" type="submit" class="modal-add-btn mx-auto">
            Add
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
import MultiSelect from "@/reusables/inputs/MultiSelect.vue";
import { useItemsStore } from "@/stores/alJubairiStore/itemsStore";
import { useAdminStore } from "@/stores/alJubairiStore/adminStore";
import { useRolesStore } from "@/stores/alJubairiStore/rolesStore";
import { storeToRefs } from "pinia";
const { allRoles } = storeToRefs(useRolesStore());

// validation
import useVuelidator from "@vuelidate/core";
import { required, minLength, maxLength, email } from "@vuelidate/validators";
required.$message = "Field is required";

import { ref, watch, defineProps, onMounted } from "vue";
const emit = defineEmits(["resetItem"]);
const isLoading = ref(false);
const selector = ref("addAdmin");

const props = defineProps({
  itemData: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

const resetImg = ref(false);

const formData = ref({
  name: "",
  email: "",
  pass: "",
  code: "",

  img: "",
  phone: "",
  roleId: "",
});

watch(
  () => props.itemData,
  () => {
    if (!props.itemData.id) {
      return;
    }
    formData.value.img = props.itemData?.image;
    formData.value.name = props.itemData?.full_name;
    formData.value.email = props.itemData?.email;
    formData.value.code = props.itemData?.phone_code;
    formData.value.phone = props.itemData?.phone;
    formData.value.roleId = props.itemData?.role;
    categoryData.value.value = props.itemData?.role?.id;

    if (props.itemData?.role) {
      categoryData.value.placeholder = props.itemData?.role?.name;
    } else {
      categoryData.value.placeholder = "Select Role";
    }
  }
);
const categoryData = ref({
  value: null,
  label: "name",
  placeholder: "Select Role",
  key: "id",
  options: [],
  groups: true,
  searchable: true,
  mode: "single",
  valueProp: "id",
  labelProp: "name",
  closeOnSelect: true,
  disabled: false,
  change: (val) => {
    if (val) selectRole(val);
  },
  clear: async () => {
    formData.value.roleName = "";
  },
});

onMounted(async () => {
  const rolesStore = useRolesStore();
  await rolesStore.getAllRoles();
  categoryData.value.options = allRoles.value;
});
const selectRole = (v) => {
  if (!v) return;
  formData.value.roleId = v;
};
const validationRules = ref({
  img: {
    required,
  },
  name: {
    required,
    minLength: minLength(3),
    maxLength: maxLength(500),
  },
  email: {
    required,
    email,
  },
  pass: { required, minLength: minLength(8) },
  code: { required, minLength: minLength(3) },
  phone: { required },
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
    img: "",
    name: "",
    email: "",
    pass: "",
    code: "",
    phone: "",
    roleId: "",
  };
  validationObj.value.$reset();
  document.getElementById(selector.value).reset();
};

const addPack = async () => {
  isLoading.value = true;
  const result = await validationObj.value.$validate();
  if (result) {
    await useItemsStore()
      .sendAttachment(formData.value.img)
      .then(async (res) => {
        await useAdminStore()
          .addItem({
            image: res.data.data,
            full_name: formData.value.name,
            email: formData.value.email,
            password: formData.value.pass,
            phone_code: formData.value.code,
            phone: formData.value.phone,
            role_id: formData.value.roleId,
          })
          .then(async () => {
            let res = await useAdminStore().getAllAdmins();
            if (res) closeModal;
          });
      })
      .finally(() => (isLoading.value = false));
  }
  isLoading.value = false;
};

const updatePack = async () => {
  isLoading.value = true;
  const result = await validationObj.value.$validate();
  if (result) {
    if (typeof formData.value.img == "object") {
      const res = await useItemsStore()
        .sendAttachment(formData.value.img)
        .then(async (res) => {
          await useAdminStore()
            .editItem(props.itemData.id, {
              _method: "PUT",
              image: res.data.data,
              full_name: formData.value.name,
              email: formData.value.email,
              password: formData.value.pass,
              phone_code: formData.value.code,
              phone: formData.value.phone,
              role_id: formData.value.roleId,
            })
            .then(async () => {
              await useAdminStore().getAllAdmins();
              closeModal();
            });
        })
        .finally(() => {
          isLoading.value = false;
        });
    } else {
      const res = await useAdminStore()
        .editItem(props.itemData.id, {
          _method: "PUT",
          full_name: formData.value.name,
          email: formData.value.email,
          password: formData.value.pass,
          phone_code: formData.value.code,
          phone: formData.value.phone,
          role_id: formData.value.roleId,
        })
        .then(async () => {
          await useAdminStore().getAllAdmins();
          closeModal();
        })
        .finally(() => {
          isLoading.value = false;
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
