<template>
  <div class="reuse-table" style="min-height: auto; border: none !important">
    <div
      class="m-0 p-0 my-3"
      style="border: none; border-radius: 0.8rem; overflow: hidden"
    >
      <table class="table table-hover table-st-1 m-0 p-0">
        <thead v-if="props.header">
          <tr>
            <th v-for="(head, i) in header" :key="i">
              {{ head }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style="height: 3rem !important"></tr>
          <slot name="table"></slot>
        </tbody>
      </table>
    </div>

    <div
      class="m-0 p-0 my-3"
      style="border: none; border-radius: 0.8rem; overflow: hidden"
    >
      <table class="table table-hover table-st-1 m-0 p-0">
        <!-- <tfoot>
          <tr>
            <td
              class="text-center p-0"
              style="
                background-color: transparent !important;
                width: fit-content;
              "
              colspan="9"
            >
              {{ foot }}
            </td>
          </tr>
        </tfoot> -->
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

const props = defineProps({
  header: {
    type: Array,
    required: false,
  },
  body: {
    type: Array,
    required: false,
  },
  foot: {
    type: Array,
    required: false,
  },
});
</script>

<style lang="scss" scoped></style>
