<template>
  <main>
    <div id="chart" v-if="props.countryData?.length">
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
  countryData: {
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
  () => props.countryData,
  (newData) => {
    if (newData) {
      const transformedData = newData.map((item) => ({
        endpoint: item.endpoint,
        visits: item.visits,
      }));

      if (transformedData.length > 10) {
        const top10 = transformedData.slice(0, 10);

        series.value = [
          {
            name: "Visits",
            data: top10.map((item) => item.visits),
          },
        ];

        chartOptions.value.xaxis.categories = top10.map((item) =>
          item.endpoint.slice(-20)
        );
      } else {
        series.value = [
          {
            name: "Visits",
            data: transformedData.map((item) => item.visits),
          },
        ];

        chartOptions.value.xaxis.categories = transformedData.map((item) =>
          item.endpoint.slice(-20)
        );
      }
    }
  }
);
</script>

<style lang="scss"></style>
