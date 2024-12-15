<template>
  <div class="user-info">
    <div class="user-data m-5">
      <div class="row d-flex flex-row">
        <span class="col-12 center-col my-3">
          <label class="user-name" for="slideEn">Name en:</label>
          <input
            type="text"
            style="
              border: 1px solid var(--col-text);
              border-radius: var(--brd-radius);

              padding: 1rem;
              margin: 1rem;
              font-weight: bold;
              color: var(--col-text);
            "
            disabled
            id="slideEn"
            :value="singleItem?.en?.name"
          />
        </span>

        <span class="col-12 center-col my-3">
          <label class="user-name" for="slideEn">Name ar:</label>
          <input
            type="text"
            style="
              border: 1px solid var(--col-text);
              border-radius: var(--brd-radius);

              padding: 1rem;
              margin: 1rem;
              font-weight: bold;
              color: var(--col-text);
            "
            disabled
            id="slideEn"
            :value="singleItem?.ar?.name"
          />
        </span>
        <span class="col-12 center-col my-3">
          <label class="user-name" for="slideEn">Title en:</label>
          <input
            type="text"
            style="
              border: 1px solid var(--col-text);
              border-radius: var(--brd-radius);

              padding: 1rem;
              margin: 1rem;
              font-weight: bold;
              color: var(--col-text);
            "
            disabled
            id="slideEn"
            :value="singleItem?.en?.title"
          />
        </span>
        <span class="col-12 center-col my-3">
          <label class="user-name" for="slideEn">Title ar:</label>
          <input
            type="text"
            style="
              border: 1px solid var(--col-text);
              border-radius: var(--brd-radius);

              padding: 1rem;
              margin: 1rem;
              font-weight: bold;
              color: var(--col-text);
            "
            disabled
            id="slideEn"
            :value="singleItem?.ar?.title"
          />
        </span>
        <span class="col-12 center-col my-3">
          <label class="user-name" for="slideEn">description en:</label>
          <input
            type="text"
            style="
              border: 1px solid var(--col-text);
              border-radius: var(--brd-radius);

              padding: 1rem;
              margin: 1rem;
              font-weight: bold;
              color: var(--col-text);
            "
            disabled
            id="slideEn"
            :value="singleItem?.en?.desc"
          />
        </span>

        <span class="col-12 center-col my-3">
          <label class="user-name" for="slideEn">description ar:</label>
          <input
            type="text"
            style="
              border: 1px solid var(--col-text);
              border-radius: var(--brd-radius);

              padding: 1rem;
              margin: 1rem;
              font-weight: bold;
              color: var(--col-text);
            "
            disabled
            id="slideEn"
            :value="singleItem?.ar?.desc"
          />
        </span>

        <span class="col-12 center-col my-3">
          <label class="user-name" for="slideEn">Created at:</label>
          <input
            type="text"
            style="
              border: 1px solid var(--col-text);
              border-radius: var(--brd-radius);

              padding: 1rem;
              margin: 1rem;
              font-weight: bold;
              color: var(--col-text);
            "
            disabled
            id="slideEn"
            :value="timeDate"
          />
        </span>

        <div
          class="col-12 center-col my-3 align-items-start justify-content-end ps-5 pb-2"
        >
          <div
            style="
              background-color: white;
              width: fit-content;
              padding: 1rem;
              border-radius: var(--brd-radius-md);
            "
          >
            <img
              :src="singleItem.image?.media"
              :alt="singleItem.image?.alt"
              style="width: 10rem; background-color: #ccc"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, watch, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import moment from "moment";
import { useItemsStore } from "@/stores/alJubairiStore/itemsStore";

const { singleItem } = storeToRefs(useItemsStore());

const route = useRoute();
const router = useRouter();
const timeDate = ref();

onBeforeMount(async () => {
  if (!route.params.id) router.push({ name: "ExcellenceAboutInfo" });
  let res = await useItemsStore().getSingleItem(route.params.id);
  if (res)
    timeDate.value = moment(new Date(singleItem.value.created_at)).format(
      "DD-MM-YYYY"
    );

  if (!res) router.push({ name: "ExcellenceAboutInfo" });
});

onUnmounted(() => {
  singleItem.value = [];
});
</script>

<style lang="scss" scoped></style>
