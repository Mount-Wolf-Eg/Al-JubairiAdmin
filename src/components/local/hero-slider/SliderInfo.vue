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
            :value="singleItem.title?.en"
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
            :value="singleItem.title?.ar"
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
            :value="singleItem.desc?.en"
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
            :value="singleItem.desc?.ar"
          />
        </span>

        <span class="col-12 center-row my-3" style="gap: 10rem">
          <span>
            <p class="user-name" for="slideEn">Features tilte</p>
            <ul
              class="card-list d-flex flex-row gap-5"
              style="list-style: none; color: var(--col-text)"
              v-for="(ser, j) in singleItem.features"
              :key="j"
            >
              <li class="col" v-for="(el, i, j) in ser" :key="i">
                <span
                  style="
                    color: var(--col-text);
                    font-weight: var(--fw-normal);
                    font-size: var(--fs-18);
                    line-height: var(--line-h-28);
                    padding-left: 0rem;
                  "
                >
                  {{ i }}:
                </span>
                <span
                  style="
                    margin: 1.2rem 0;
                    color: var(--col-text);
                    font-weight: var(--fw-normal);
                    font-size: var(--fs-16);
                    line-height: var(--line-h-20);
                  "
                >
                  {{ el }}
                </span>
              </li>
            </ul>
          </span>
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
              :src="singleItem.image"
              alt="partner"
              style="width: 10rem; background-color: #ccc"
            />
          </div>
        </div>
        <div
          class="col-12 center-row my-3 align-items-start justify-content-start flex-wrap gap-5 ps-5 pb-2"
        >
          <div
            style="
              background-color: white;
              width: fit-content;
              padding: 1rem;
              border-radius: var(--brd-radius-md);
            "
            v-for="(ph, i) in singleItem.attachments"
            :key="i"
          >
            <img
              :src="ph"
              alt="partner"
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
  if (!route.params.id) router.push({ name: "HeroSlider" });
  let res = await useItemsStore().getSingleItem(route.params.id);
  if (res) timeDate.value = singleItem.value.created_at;
  //  moment(new Date(singleItem.created_at)).format(
  //     "DD-MM-YYYY"
  //   );
  if (!res) router.push({ name: "HeroSlider" });
});

// const replaceData = (ser) => {
//   if (ser) {
//     return JSON.parse(ser.replace(/'/g, '"'));
//   }
// };

onUnmounted(() => {
  singleItem.value = [];
});
</script>

<style lang="scss" scoped></style>
