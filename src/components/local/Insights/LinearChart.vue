<template>
  <main>
    <div id="chart" v-if="props.allData.months">
      <apexchart
        type="area"
        height="450"
        style="width: 100%"
        :options="options"
        :series="series"
      ></apexchart>
    </div>
  </main>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  allData: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

const series = ref([
  {
    name: "VisitsList",
    data: [],
  },
]);

const options = ref({
  chart: {
    height: 450,
    type: "area",
    zoom: {
      enabled: false,
    },
    background: "#fff",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
    colors: ["#2c2c2c"],
    width: 2,
  },
  fill: {
    type: "solid",
    opacity: 0.1,
    colors: ["#ccc"],
  },
  title: {
    text: "Visitors",
    align: "left",
    style: {
      fontSize: "16px",
      color: "#464a61",
    },
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"],
      opacity: 0.5,
    },
    borderColor: "#ccc",
  },
  xaxis: {
    categories: [],
    labels: {
      style: {
        colors: "#000",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#000",
      },
    },
  },
});

watch(
  () => props.allData,
  (newData) => {
    if (newData && newData.months && newData.counts) {
      console.log("chart", newData);

      series.value = [
        {
          name: "visit",
          data: newData.counts,
        },
      ];

      options.value.xaxis.categories = newData.months;
    }
  },
  { immediate: true }
);
</script>
