<template>
  <main v-if="!pageLoads">
    <div class="roles-box">
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
      <MultiSelect class="w-100 mt-3" id="inpt-field" :select="categoryData" />
      <span class="row">
        <span class="col">
          <InptField
            v-model="formData.roleName"
            :holder="'role name'"
            :label="'Role Name'"
            :appear="checkErrName(['roleName']) ? 'err-border' : ''"
            class="mt-0"
          ></InptField>
          <span
            class="center-row justify-content-start"
            style="margin-top: -1rem; margin-bottom: 1rem"
            v-for="(err, i) in validationObj.$errors"
            :key="i"
            ><span v-if="err.$property == 'roleName'" class="err-msg">
              {{ err.$message }}
            </span></span
          >
        </span>
        <!-- :disabled="!allItems" -->
        <div class="col-2 d-flex justify-content-center align-items-center">
          <button
            type="submit"
            class="search-btn w-100"
            @click.prevent="handleRoles"
            v-if="!isLoading"
          >
            Add
          </button>
          <button type="submit" class="search-btn w-100" v-else disabled>
            <div class="spinner-grow me-3" role="status"></div>
            <span> Loading...</span>
          </button>
        </div>
      </span>
    </div>
    <div class="permissions-box grd grd-4-col">
      <div
        class="form-check form-switch py-2 fs-5 fw-bold"
        v-for="(item, i) in allPermissions"
        :key="i"
      >
        <input
          :checked="allItems.includes(item.id)"
          @change="toggleStatus(item.id, $event)"
          class="form-check-input"
          type="checkbox"
          role="switch"
          :id="`item_${item.id}`"
        />
        <label
          style="cursor: pointer; text-transform: capitalize"
          :for="`item_${item.id}`"
        >
          {{ item?.type.replace(/_/g, " ") }}</label
        >
      </div>
    </div>
  </main>
  <main v-else class="d-flex justify-content-center align-items-center">
    <div class="spinner-grow me-3" role="status"></div>
    ...loading
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRolesStore } from "@/stores/alJubairiStore/rolesStore";
import MultiSelect from "@/reusables/inputs/MultiSelect.vue";
import InptField from "@/reusables/inputs/InptField.vue";
import { storeToRefs } from "pinia";
// validation
import useVuelidator from "@vuelidate/core";
import { required, minLength, maxLength, email } from "@vuelidate/validators";
required.$message = "Field is required";

const formData = ref({ roleName: "" });

const validationRules = ref({
  roleName: {
    required,
    minLength: minLength(4),
  },
});

const checkErrName = (key) => {
  return validationObj.value.$errors.find((err) => err.$property == key);
};

const validationObj = useVuelidator(validationRules, formData);

const { allRoles, allPermissions } = storeToRefs(useRolesStore());
const allItems = ref([]);
const selectedItem = ref("");
const pageLoads = ref(true);
const isLoading = ref(false);

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
    allItems.value = [];
    selectedItem.value = "";
    formData.value.roleName = "";
  },
});

const toggleStatus = async (id, e) => {
  if (e.target.checked) {
    allItems.value.push(id);
  } else {
    allItems.value.pop(id);
  }
};
onMounted(async () => {
  const rolesStore = useRolesStore();
  await Promise.all([rolesStore.getAllPermissions(), rolesStore.getAllRoles()]);

  categoryData.value.options = allRoles.value;

  pageLoads.value = false;
});

const selectRole = (v) => {
  if (!v) return;
  selectedItem.value = v;
  formData.value.roleName = allRoles.value.filter((e) => e.id == v)[0]?.name;
  allItems.value = allRoles.value
    .filter((e) => e.id == v)[0]
    ?.permission?.map((e) => e.id);
};

const addRole = async () => {
  isLoading.value = true;
  const result = await validationObj.value.$validate();
  if (result) {
    let res = await useRolesStore().createRole({
      "ar[name]": formData.value.roleName,
      "en[name]": formData.value.roleName,
      "permission_ids[]": allItems.value,
    });
    if (res) {
      allItems.value = [];
      formData.value.roleName = "";
    }
  }
  isLoading.value = false;
};

const updateRole = async () => {
  isLoading.value = true;
  const result = await validationObj.value.$validate();
  if (result) {
    let res = await useRolesStore().editRole(selectedItem.value, {
      _method: "PUT",
      "ar[name]": formData.value.roleName,
      "en[name]": formData.value.roleName,
      "permission_ids[]": allItems.value,
    });
    if (res) {
      allItems.value = [];
      formData.value.roleName = "";
    }
  }
  isLoading.value = false;
};
const handleRoles = async () => {
  if (selectedItem.value) {
    updateRole();
  } else {
    addRole();
  }
};
</script>
<style></style>
