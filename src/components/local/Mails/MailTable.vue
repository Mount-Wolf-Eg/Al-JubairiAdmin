<template>
  <main v-if="!pageLoad">
    <FilterInputs
      v-model="filter"
      @search="filteredData(filter)"
    ></FilterInputs>
    <ReusTable
      :header="[
        '',
        'User Name',
        'Email',
        'Message',
        'Created',
        'Status',
        'Action',
      ]"
    >
      <template #table>
        <tr v-for="(msg, i) in allMails" :key="i">
          <td>
            {{ i }}
          </td>
          <td
            @click="
              router.push({
                name: 'MainInfo',
                params: { id: msg.id },
              })
            "
          >
            {{ msg.first_name }} {{ msg.last_name }}
          </td>

          <td>
            {{ msg.email }}
          </td>
          <!-- style="
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                line-clamp: 3;
                overflow: auto;
                text-overflow: ellipsis;
              " -->
          <td style="width: 30%">
            {{ msg.content }}
          </td>

          <td>
            {{ moment(new Date(msg.created_at)).format("DD-MM-YYYY") }}
          </td>

          <td
            :style="`${
              msg?.replies?.length > 0
                ? 'color :green !important'
                : 'color :red !important'
            }`"
          >
            {{ msg?.replies?.length > 0 ? "replied" : "not replied" }}
          </td>
          <td style="width: 7%">
            <div class="center-row justify-content-between align-items-center">
              <button
                type="button"
                class="btn border-0"
                @click="
                  router.push({
                    name: 'MainInfo',
                    params: { id: msg.id },
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

              <button
                type="button"
                id="ReplyMsg"
                class="btn border-0"
                data-bs-toggle="modal"
                data-bs-target="#replyMessage"
                @click="replyMessage(msg.id)"
              >
                <svg
                  style="width: 2rem; height: 2rem"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376l0 103.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"
                  />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </template>
      <template #foot>
        <vue-awesome-paginate
          :total-items="pagination?.total"
          v-model="currentPage"
          :items-per-page="pagination?.per_page"
          :max-pages-shown="5"
          :show-ending-buttons="true"
          :show-breakpoint-buttons="false"
          @click="onClickHandler"
        />
      </template>
    </ReusTable>
  </main>
  <main class="text-center" v-else>
    <div class="spinner-grow me-3" role="status"></div>
    ...loading
  </main>
</template>

<script setup>
import moment from "moment";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import Pagination from "@/reusables/pagination/Pagination.vue";
import {
  ref,
  computed,
  onMounted,
  defineEmits,
  watch,
  onBeforeUnmount,
} from "vue";
import ReusTable from "@/reusables/components/ReusTable.vue";
import FilterInputs from "@/reusables/content_buttons/FilterInputs.vue";
import { useContactStore } from "@/stores/alJubairiStore/contactStore";

const { allMails, mail, pagination } = storeToRefs(useContactStore());
const router = useRouter();
const route = useRoute();
const pageLoad = ref(true);

const filter = ref("");
const currentPage = ref(1);
const onClickHandler = async (page) => {
  router.push({
    path: route.path,
    query: {
      page: page,
    },
  });
  await useContactStore().getAllMails(filter.value, page);
};

const filteredData = async (search) => {
  await useContactStore().getAllMails(search, "");
};

const emit = defineEmits(["msgId"]);

onMounted(async () => {
  await useContactStore().getAllMails();
  pageLoad.value = false;
});

const replyMessage = async (msgId) => {
  emit("msgId", msgId);
};

onBeforeUnmount(() => {
  allMails.value = "";
});
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
