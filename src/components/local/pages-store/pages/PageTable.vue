<template>
  <main v-if="!pageLoading">
    <ReusTable
      :header="[
        'Page name',
        'Page Title',
        'Page Description',
        'Created',
        'Status',
        'Action',
      ]"
    >
      <template #table>
        <tr v-for="item in alllPages" :key="item.id">
          <!-- <td>
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
          </td> -->
          <td>
            {{ item.name }}
          </td>
          <!-- <td
            @click="
              router.push({
                name: 'itemInfo',
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
          </td> -->

          <td>
            {{ item.title }}
          </td>
          <td>
            {{ item.desc }}
          </td>

          <td>
            {{ moment(new Date(item.created_at)).format("DD-MM-YYYY") }}
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

          <td style="width: 7%">
            <div class="center-row justify-content-between align-items-center">
              <!-- <button
                type="button"
                class="btn border-0"
                @click="
                  router.push({
                    name: 'itemInfo',
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
              </button> -->
              <button
                type="button"
                class="btn border-0"
                @click="editSeo(item.id, item.type)"
              >
                <svg
                  class="edit-btn"
                  style="width: 2rem; height: 2rem"
                  fill="#000000"
                  height="800px"
                  width="800px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 512 512"
                  xml:space="preserve"
                >
                  <g>
                    <g>
                      <g>
                        <path
                          d="M497.453,241.022l-43.995-114.147l43.984-113.132c1.207-3.104,0.805-6.603-1.077-9.352C494.485,1.644,491.37,0,488.039,0
				H23.961c-5.571,0-10.089,4.517-10.089,10.089v491.823c0,5.571,4.517,10.089,10.089,10.089h50.443
				c5.571,0,10.089-4.517,10.089-10.089V254.739h403.547c3.325,0,6.437-1.638,8.318-4.381
				C498.239,247.618,498.649,244.124,497.453,241.022z M64.315,491.823H34.049V20.177h30.266V491.823z M84.493,234.562V20.177
				h388.801l-40.056,103.025c-0.912,2.342-0.916,4.94-0.011,7.284l40.113,104.075H84.493z"
                        />
                        <path
                          d="M135.566,66.837h47.291c5.571,0,10.089-4.517,10.089-10.089s-4.517-10.089-10.089-10.089h-47.291
				c-18.427,0-33.419,14.992-33.419,33.419v23.961c0,18.427,14.992,33.419,33.419,33.419c0.537,0,1.062-0.054,1.576-0.135
				c0.514,0.081,1.039,0.135,1.576,0.135h20.808c7.302,0,13.241,5.94,13.241,13.241v23.961c0,7.302-5.94,13.241-13.241,13.241
				h-47.291c-5.571,0-10.089,4.517-10.089,10.089c0,5.571,4.517,10.089,10.089,10.089h47.291c18.427,0,33.419-14.992,33.419-33.419
				V150.7c0-18.427-14.992-33.419-33.419-33.419h-20.808c-0.537,0-1.062,0.054-1.576,0.135c-0.515-0.081-1.039-0.135-1.576-0.135
				c-7.302,0-13.241-5.94-13.241-13.241V80.079C122.325,72.777,128.265,66.837,135.566,66.837z"
                        />
                        <path
                          d="M246.542,66.837h47.291c5.571,0,10.089-4.517,10.089-10.089s-4.517-10.089-10.089-10.089h-47.291
				c-18.427,0-33.419,14.992-33.419,33.419v47.291v47.291c0,18.427,14.992,33.419,33.419,33.419h47.291
				c5.571,0,10.089-4.517,10.089-10.089c0-5.571-4.517-10.089-10.089-10.089h-47.291c-7.302,0-13.241-5.94-13.241-13.241v-37.202
				h60.532c5.571,0,10.089-4.517,10.089-10.089s-4.517-10.089-10.089-10.089H233.3V80.079
				C233.3,72.777,239.24,66.837,246.542,66.837z"
                        />
                        <path
                          d="M381.478,46.66h-23.961c-18.427,0-33.419,14.992-33.419,33.419v94.581c0,18.427,14.992,33.419,33.419,33.419h23.961
				c18.427,0,33.419-14.992,33.419-33.419V80.079C414.896,61.652,399.905,46.66,381.478,46.66z M394.719,174.66
				c0,7.302-5.94,13.241-13.241,13.241h-23.961c-7.302,0-13.241-5.94-13.241-13.241V80.079c0-7.302,5.94-13.241,13.241-13.241
				h23.961c7.302,0,13.241,5.94,13.241,13.241V174.66z"
                        />
                        <path
                          d="M316.532,293.833c0-5.571-4.517-10.089-10.089-10.089h-186.64c-5.571,0-10.089,4.517-10.089,10.089
				s4.517,10.089,10.089,10.089h186.64C312.015,303.921,316.532,299.404,316.532,293.833z"
                        />
                        <path
                          d="M479.212,324.099H296.355c-5.571,0-10.089,4.517-10.089,10.089s4.517,10.089,10.089,10.089h182.857
				c5.571,0,10.089-4.517,10.089-10.089S484.783,324.099,479.212,324.099z"
                        />
                      </g>
                    </g>
                  </g>
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
              <!-- <button
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
              </button> -->
            </div>
          </td>
        </tr>
      </template>
    </ReusTable>
  </main>
  <main v-else>loading ...</main>
</template>

<script setup>
import moment from "moment";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ref, computed, onMounted, defineEmits, watch } from "vue";
import ReusTable from "@/reusables/components/ReusTable.vue";
import { useSeoStore } from "@/stores/alJubairiStore/seoStore";
import { usePageStore } from "@/stores/alJubairiStore/pageStore";
const pageLoading = ref(true);
const { alllPages, page } = storeToRefs(usePageStore());
const { meta } = storeToRefs(useSeoStore());
const router = useRouter();
const emit = defineEmits(["editItem", "editSeo", "type"]);

onMounted(async () => {
  await usePageStore().getPages();
  pageLoading.value = false;
});

// const toggleStatus = async (id, e) => {
//   if (e.target.checked) {
//     const res = await useItemsStore().toggle(id);
//     if (!res) {
//       e.target.checked = !e.target.checked;
//     }
//   } else {
//     const res = await useItemsStore().toggle(id);
//     if (!res) {
//       e.target.checked = !e.target.checked;
//     }
//   }
//   await useItemsStore().getItems("slider", "home");
// };

// const remove = async (id) => {
//   await useItemsStore().deleteItem(id);
//   await useItemsStore().getItems("slider", "home");
// };

const edit = async (id) => {
  let res = await usePageStore().getSinglePage(id);

  if (res) {
    emit("editItem", page.value);
  }
};
const editSeo = async (id, type) => {
  // let res = await useSeoStore().getSingleMeta(id);
  let res = await usePageStore().getSinglePage(id);

  if (res) {
    emit("type", type);
    emit("editSeo", page.value);
    // emit("editSeo", meta.value);
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
