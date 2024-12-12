<template>
  <div>
    <ReusTable
      :header="['', 'Project Image', 'Project name', 'Created', 'Status']"
    >
      <template #table>
        <tr v-for="pack in activePackages" :key="pack.id">
          <td>
            <div class="form-check form-switch">
              <input
                :checked="pack.sticky"
                @change="toggleStatus(pack.id, $event)"
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
          </td>
          <td
            @click="
              router.push({ name: 'projectInfo', params: { id: pack.id } })
            "
          >
            <img
              class="mx-2"
              style="background-color: #ccc; padding: 0.5rem; height: 5rem"
              v-if="pack.image"
              :src="pack.image"
              :alt="pack.description"
            />
          </td>

          <td>
            {{ pack.name }}
          </td>

          <td>
            {{ moment(new Date(pack.created_at)).format("DD-MM-YYYY") }}
          </td>

          <td
            :style="`${
              pack.sticky
                ? 'color: var(--col-success) !important'
                : 'color: var(--col-error) !important'
            }`"
          >
            {{ pack.sticky ? "Active" : "Suspended" }}
          </td>
        </tr>
      </template>
    </ReusTable>
  </div>
</template>

<script setup>
import moment from "moment";
import ReusTable from "@/reusables/components/ReusTable.vue";
import { ref, computed, onMounted, defineEmits } from "vue";

import { usePackageStore } from "@/stores/settings/packageStore";

import { useRouter } from "vue-router";
const router = useRouter();

const { allPackages, activePackages, suspendedPackages, packag } = storeToRefs(
  usePackageStore()
);

import { storeToRefs } from "pinia";

const emit = defineEmits(["editPackage"]);

onMounted(async () => {
  await usePackageStore().getActivePackages();
});

const toggleStatus = async (id, e) => {
  if (e.target.checked) {
    const res = await usePackageStore().setSticky({ id: id, sticky: 1 });
    if (!res) {
      e.target.checked = !e.target.checked;
    }
  } else {
    const res = await usePackageStore().setSticky({ id: id, sticky: 0 });
    if (!res) {
      e.target.checked = !e.target.checked;
    }
  }
  await usePackageStore().getActivePackages();
};
</script>

<style lang="scss" scoped>
.form-check {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

button[type="button"] {
  border-radius: 3px !important;
}
</style>
