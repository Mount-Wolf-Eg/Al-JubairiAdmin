<template>
  <main v-if="allRoles.length">
    <ReusTable :header="['Role Name', 'Actions']">
      <template #table>
        <tr v-for="item in allRoles" :key="item.id">
          <td>
            {{ item.name }}
          </td>

          <td style="width: 10%">
            <div class="center-row justify-content-between align-items-center">
              <button
                type="button"
                class="btn border-0"
                @click="remove(item.id)"
              >
                <svg
                  class="delete-btn"
                  style="width: 1.6rem; height: 1.8rem"
                  viewBox="0 0 16 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                    fill="#464A61"
                  />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </template>
    </ReusTable>
  </main>
  <main v-else class="d-flex justify-content-center align-items-center">
    <div class="spinner-grow me-3" role="status"></div>
    ...loading
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import moment from "moment";
import ReusTable from "@/reusables/components/ReusTable.vue";
import { storeToRefs } from "pinia";
import { useRolesStore } from "@/stores/alJubairiStore/rolesStore";
const { allRoles } = storeToRefs(useRolesStore());

const remove = async (id) => {
  await useRolesStore().deleteRole(id);
  await useRolesStore().getAllRoles();
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
