<template>
  <main class="pagination-sec">
    <vue-awesome-paginate
      :total-items="paginate?.total"
      v-model="currentPage"
      :items-per-page="paginate?.per_page"
      :max-pages-shown="count"
      :show-ending-buttons="endButtons"
      :show-breakpoint-buttons="break"
      @click="onClickHandler"
    />
  </main>
</template>

<script setup>
import { ref, defineEmits } from "vue";
const emits = defineEmits(["change"]);

const currentPage = ref(1);
const props = defineProps({
  paginate: {
    type: Object,
    required: true,
    default: () => ({ total: 0, per_page: 10 }),
  },
  count: {
    type: Number,
    required: false,
    default: 5,
  },
  endButtons: {
    type: Boolean,
    required: false,
    default: true,
  },
  break: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const onClickHandler = async (page) => {
  emits("change", page);
};
</script>

<style scoped src="./pagination.scss"></style>

<!-- use      <Pagination :paginate="pagination" @change() /> -->
