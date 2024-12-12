<template>
  <div class="user-info">
    <div class="user-data m-5">
      <div class="row d-flex flex-row">
        <span class="col-12 center-col my-3">
          <label class="user-name" for="slideEn">title en:</label>
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
            :value="singleSlide.title?.en"
          />
        </span>

        <span class="col-12 center-col my-3">
          <label class="user-name" for="slideEn">title ar:</label>
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
            :value="singleSlide.title?.ar"
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
            :value="singleSlide.description?.en"
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
            :value="singleSlide.description?.ar"
          />
        </span>
        <span class="col-12 center-col my-3">
          <label class="user-name" for="slideEn">Slider Type:</label>
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
            :value="`${singleSlide.slider_type.split('_').join(' ')}`"
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
              :src="singleSlide.image"
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
import { ref, onBeforeMount, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { sliderStore } from "@/stores/settings/slidersStore";
import { storeToRefs } from "pinia";
import moment from "moment";

const { singleSlide } = storeToRefs(sliderStore());

const route = useRoute();
const router = useRouter();
const timeDate = ref();

onBeforeMount(async () => {
  if (!route.params.id) router.push({ name: "services" });
  let res = await sliderStore().getSlide({ id: route.params.id });
  if (res)
    timeDate.value = moment(new Date(singleSlide.value.created_at)).format(
      "DD-MM-YYYY"
    );
  if (!res) router.push({ name: "services" });
});
</script>

<style lang="scss" scoped></style>
