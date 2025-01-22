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
      <MultiSelect class="w-100" id="inpt-field" :select="categoryData" />
    </div>
  </main>
  <main class="text-center" v-else>
    <div class="spinner-grow me-3" role="status"></div>
    ...loading
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRolesStore } from "@/stores/alJubairiStore/rolesStore";
import MultiSelect from "@/reusables/inputs/MultiSelect.vue";
import { storeToRefs } from "pinia";

const { allRoles } = storeToRefs(useRolesStore());
const pageLoads = ref(true);

const categoryData = ref({
  value: null,
  label: "name",
  placeholder: "Select Role",
  key: "id",
  options: [], // Initialize with an empty array
  groups: true,
  searchable: true,
  mode: "single",
  valueProp: "id",
  labelProp: "name",
  closeOnSelect: true,
  disabled: false,
  change: (val) => {
    if (val) console.log("Selected Value:", val);
  },
  clear: async () => {
    console.log("Cleared selection");
  },
});

onMounted(async () => {
  // Wait for the roles and permissions to be fetched
  const rolesStore = useRolesStore();
  await Promise.all([rolesStore.getAllPermissions(), rolesStore.getAllRoles()]);

  // Populate the dropdown options
  categoryData.value.options = allRoles.value;

  console.log("Dropdown options:", categoryData.value.options);

  pageLoads.value = false;
});
</script>
