<template>
  <div v-if="!isLoading">
    <ReusTable
      :header="[
        '',
        'Image',
        'Title',
        'Description',
        'Created',
        'child',
        'Status',
        'Action',
      ]"
    >
      <template #table>
        <tr
          v-for="item in allItems.filter(
            (e) => e?.parent?.id == $route.query.id
          )"
          :key="item.id"
        >
          <td>
            <div class="form-check form-switch">
              <input
                :checked="item.is_active"
                @change="toggleStatus(item.id, $event)"
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
          </td>
          <td
            @click="
              router.push({
                name: 'AchievementSubInfo',
                params: { id: item.id },
              })
            "
          >
            <img
              class="mx-2"
              style="background-color: #ccc; padding: 0.5rem; height: 5rem"
              v-if="item.image"
              :src="item.image.media"
              :alt="item.image.alt"
            />
          </td>

          <td>
            {{ item.title }}
          </td>
          <td>
            <div class="html-content" v-html="item.desc"></div>
          </td>

          <td>
            {{ moment(new Date(item.created_at)).format("DD-MM-YYYY") }}
          </td>
          <td>
            {{
              item?.parent?.id ? `child for ${item?.parent?.id} ` : `${item.id}`
            }}
          </td>
          <td
            :style="`${
              item.deleted_at == null
                ? 'color: var(--col-sucs) !important'
                : 'color: var(--col-error) !important'
            }`"
          >
            {{ item.deleted_at == null ? "Active" : "Suspended" }}
          </td>

          <td style="width: 15%">
            <div class="center-row justify-content-between align-items-center">
              <button
                type="button"
                class="btn border-0"
                @click="
                  router.push({
                    name: 'AchievementSubInfo',
                    params: { id: item.id },
                  })
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style="width: 2rem; height: 2rem"
                  fill="currentColor"
                  class="bi bi-eye qr-btn"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                  />
                  <path
                    d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                  />
                </svg>
              </button>
              <button type="button" class="btn border-0" @click="edit(item.id)">
                <svg
                  class="edit-btn"
                  style="width: 2rem; height: 2rem"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.178 1.80821C16.9091 1.80821 16.6513 1.91502 16.4611 2.10514L8.04922 10.5171L7.57131 12.4287L9.48293 11.9508L17.8949 3.53886C18.085 3.34874 18.1918 3.09088 18.1918 2.822C18.1918 2.55313 18.085 2.29527 17.8949 2.10514C17.7047 1.91502 17.4469 1.80821 17.178 1.80821ZM15.1825 0.826545C15.7118 0.297317 16.4296 0 17.178 0C17.9264 0 18.6442 0.297317 19.1735 0.826545C19.7027 1.35577 20 2.07356 20 2.822C20 3.57044 19.7027 4.28823 19.1735 4.81746L10.5845 13.4065C10.4686 13.5223 10.3234 13.6045 10.1644 13.6443L6.54801 14.5484C6.23992 14.6254 5.914 14.5351 5.68944 14.3106C5.46487 14.086 5.3746 13.7601 5.45163 13.452L6.35573 9.83557C6.39547 9.67659 6.47767 9.53141 6.59354 9.41554L15.1825 0.826545ZM0.794419 2.71232C1.30308 2.20366 1.99296 1.9179 2.71232 1.9179H9.04105C9.54037 1.9179 9.94516 2.32268 9.94516 2.822C9.94516 3.32133 9.54037 3.72611 9.04105 3.72611H2.71232C2.47253 3.72611 2.24257 3.82136 2.07302 3.99091C1.90346 4.16047 1.80821 4.39043 1.80821 4.63021V17.2877C1.80821 17.5275 1.90346 17.7574 2.07302 17.927C2.24257 18.0965 2.47253 18.1918 2.71232 18.1918H15.3698C15.6096 18.1918 15.8395 18.0965 16.0091 17.927C16.1786 17.7574 16.2739 17.5275 16.2739 17.2877V10.9589C16.2739 10.4596 16.6787 10.0548 17.178 10.0548C17.6773 10.0548 18.0821 10.4596 18.0821 10.9589V17.2877C18.0821 18.007 17.7963 18.6969 17.2877 19.2056C16.779 19.7142 16.0891 20 15.3698 20H2.71232C1.99296 20 1.30308 19.7142 0.794419 19.2056C0.285761 18.6969 0 18.007 0 17.2877V4.63021C0 3.91086 0.285761 3.22097 0.794419 2.71232Z"
                    fill="#464A61"
                  />
                </svg>
              </button>
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
  </div>
  <main class="text-center" v-else>
    <div class="spinner-grow me-3" role="status"></div>
    ...loading
  </main>
</template>

<script setup>
import moment from "moment";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import {
  ref,
  computed,
  onMounted,
  defineEmits,
  watch,
  onBeforeUnmount,
} from "vue";
import ReusTable from "@/reusables/components/ReusTable.vue";
import { useItemsStore } from "@/stores/alJubairiStore/itemsStore";
const { allItems, singleItem } = storeToRefs(useItemsStore());
const router = useRouter();
const emit = defineEmits(["editItem"]);
const sec_name = ref("achievement");
const page_name = ref("achievement");
const isLoading = ref(true);

onMounted(async () => {
  await useItemsStore().getItems(
    "",
    sec_name.value,
    page_name.value,
    "",
    false
  );
  isLoading.value = false;
});
onBeforeUnmount(() => {
  allItems.value = "";
});

const toggleStatus = async (id, e) => {
  if (e.target.checked) {
    const res = await useItemsStore().toggle(id);
    if (!res) {
      e.target.checked = !e.target.checked;
    }
  } else {
    const res = await useItemsStore().toggle(id);
    if (!res) {
      e.target.checked = !e.target.checked;
    }
  }
  await useItemsStore().getItems(
    "",
    sec_name.value,
    page_name.value,
    "",
    false
  );
};

const remove = async (id) => {
  await useItemsStore().deleteItem(id);
  await useItemsStore().getItems(
    "",
    sec_name.value,
    page_name.value,
    "",
    false
  );
};

const edit = async (id) => {
  let res = await useItemsStore().getSingleItem(id);

  if (res) {
    emit("editItem", singleItem.value);
  }
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
