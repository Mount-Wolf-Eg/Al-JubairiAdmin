<template>
  <main>
    <div
      id="chart"
      v-if="Object.keys(props.PagesData) && Object.keys(props.PagesData).length"
    >
      <apexchart
        type="bar"
        height="350"
        style="width: 100%"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </main>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  chartTitle: {
    type: String,
    Required: false,
    default: "",
  },
  PagesData: {
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

const chartOptions = ref({
  chart: {
    type: "bar",
    height: 350,
    width: "100%",
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      borderRadiusApplication: "end",
      horizontal: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [],
  },
  colors: ["#2c2c2c", "#FFFFFF"],
  grid: {
    show: true,
    borderColor: "#2c2c2c",
  },
  stroke: {
    width: 1,
    colors: ["#000"],
  },
  title: {
    text: props.chartTitle,
    align: "left",
    style: {
      fontSize: "16px",
      color: "#464a61",
    },
  },
});

watch(
  () => props.PagesData,
  (newData) => {
    if (newData) {
      if (newData.length > 10) {
        series.value = [
          {
            name: "visit",
            data: newData.slice(0, 10).map((item) => item.visits),
          },
        ];

        chartOptions.value.xaxis.categories = newData
          .slice(0, 10)
          .map((item) => {
            return item.region;
          });
      } else {
        series.value = [
          {
            name: "visit",
            data: newData.map((item) => item.visits),
          },
        ];

        chartOptions.value.xaxis.categories = newData.map((item) => {
          return item.region;
        });
      }
    }
  }
);
</script>

<style lang="scss"></style>
