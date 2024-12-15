<template>
  <main class="row col-12">
    <div class="row d-flex align-items-end justify-content-start mt-1 mb-5">
      <span class="col-3 d-flex flex-column">
        <label
          for="searchFrom"
          style="
            font-size: var(--fs-14);
            color: var(--col-text);
            font-weight: var(--fw-bold);
            margin: 0 0 5px 5px;
          "
        >
          Data From
        </label>
        <input
          type="date"
          class="col p-3 serch-input"
          v-model="dateFrom"
          id="searchFrom"
        />
      </span>
      <span class="col-3 d-flex flex-column">
        <label
          for="searchTo"
          style="
            font-size: var(--fs-14);
            color: var(--col-text);
            font-weight: var(--fw-bold);
            margin: 0 0 5px 5px;
          "
        >
          Data To
        </label>
        <input
          type="date"
          class="col p-3 serch-input h-100"
          v-model="dateTo"
          id="searchTo"
        />
      </span>
      <span class="col-3 d-flex flex-column my-0 py-0">
        <label
          for="searchCountry"
          style="
            font-size: var(--fs-14);
            color: var(--col-text);
            font-weight: var(--fw-bold);
            margin: 0 0 5px 5px;
          "
        >
          Country
        </label>
        <MultiSelect
          id="searchCountry"
          class="col m-0 p-0"
          :select="categoryData"
        />
      </span>
      <span
        class="col-2 d-flex align-items-center justify-content-between gap-3 ms-auto"
      >
        <button
          type="button"
          class="search-btn p-0"
          @click="filterData"
          :disabled="!searchCountry && !dateFrom && !dateTo"
        >
          Search
        </button>
        <button type="button" class="reset-btn p-0" @click="resetFilter">
          Reset
        </button>
      </span>
    </div>
    <div class="row">
      <pageChart
        class="col-12 col-md-6"
        :chartTitle="'Most Watched'"
        :PagesData="visitedPages"
      ></pageChart>

      <Barchart
        class="col-12 col-md-6"
        :chartTitle="'Most Region Visited'"
        :countryData="countryInsights"
      ></Barchart>
    </div>

    <LinearChart :allData="montylyData" class="col-12"></LinearChart>
  </main>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import Barchart from "@/components/local/Insights/Barchart.vue";
import pageChart from "@/components/local/Insights/pageChart.vue";
import LinearChart from "@/components/local/Insights/LinearChart.vue";
import MultiSelect from "@/reusables/inputs/MultiSelect.vue";
import { useInsights } from "@/stores/insights/insightsStore";
import { mainStore } from "@/stores/mainStore";
import { storeToRefs } from "pinia";

const textEditorData = ref("");

const { allCountries, montylyData, countryInsights, visitedPages } =
  storeToRefs(useInsights());

const searchData = ref("");
const searchCountry = ref("");
const dateFrom = ref("");
const dateTo = ref("");

const categoryData = ref({
  value: null,
  label: "name",
  placeholder: "Select Country",
  key: "id",
  groups: true,
  options: allCountries.value,
  searchable: true,
  mode: "single",
  valueProp: "id",
  labelProp: "name",
  closeOnSelect: true,
  disabled: false,
  change: (val) => {
    if (val) setCateg(val);
  },
  clear: async () => {
    console.log("clear");
    searchCountry.value = "";
  },
});
onBeforeUnmount(() => {
  allCountries.value = [];
  montylyData.value = [];
  countryInsights.value = [];
  visitedPages.value = [];
});

// onMounted(async () => {
//   await Promise.all([
//     useInsights().getAllCountries(),
//     useInsights().getAllMontyly(),
//     useInsights().getCountryInsights(),
//     useInsights().mostVisitedPage(),
//   ]);
//   categoryData.value.options = allCountries.value;
// });

const setCateg = async (val) => {
  searchCountry.value = val;
};

const validateDates = () => {
  if (dateFrom.value && dateTo.value) {
    const fromDate = new Date(dateFrom.value);
    const toDate = new Date(dateTo.value);

    if (fromDate > toDate) {
      mainStore().showAlert(
        "The 'Data From' date must be before 'Data To' date.",
        3
      );

      return false;
    } else {
      return true;
    }
  }
  return true;
};

const filterData = async () => {
  if (validateDates()) {
    await Promise.all([
      useInsights().getAllMontyly({
        country_code: searchCountry.value ? searchCountry.value : "",
        from: dateFrom.value,
        to: dateTo.value,
      }),
      useInsights().getCountryInsights({
        country_code: searchCountry.value,
        from: dateFrom.value,
        to: dateTo.value,
      }),
      useInsights().mostVisitedPage({
        country_code: searchCountry.value,
        from: dateFrom.value,
        to: dateTo.value,
      }),
    ]);
  }
};

const resetFilter = async () => {
  categoryData.value.clear();
  dateFrom.value = "";
  dateTo.value = "";
  searchCountry.value = "";
  await Promise.all([
    useInsights().getAllMontyly(),
    useInsights().getCountryInsights(),
    useInsights().mostVisitedPage(),
  ]);
};
</script>

<style lang="scss">
.inpt-box .multiselect[data-v-3bb65863] {
  padding: 0.7rem 0.5rem !important;
}

.error-message {
  color: red;
  font-size: 14px;
}
</style>
