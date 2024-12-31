<template>
  <div
    class="row helper-btns d-flex flex-row align-items-center justify-content-between"
  >
    <div
      class="col-12 mt-5 d-flex flex-row align-items-center justify-content-end gap-3"
    >
      <input
        class="col ps-3"
        type="text"
        placeholder="Search"
        id="search"
        :value="modelValue"
        @input="updateValue($event.target.value)"
        @keyup.enter="emits('search')"
      />
      <button
        type="button"
        class="search-btn"
        @click="emits('search')"
        :disabled="!modelValue.trim()"
      >
        Search
      </button>
      <button type="button" class="reset-btn" @click="resetValue()">
        Reset
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useSearchStore } from "@/stores/search/searchStore";
import { storeToRefs } from "pinia";
const emits = defineEmits(["update:modelValue", "search", "reset"]);

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: false,
    default: "",
  },
});

const updateValue = (value) => {
  emits("update:modelValue", value);
};
const resetValue = () => {
  emits("update:modelValue", "");
  emits("search", "");
};

watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal) resetValue();
  }
);
</script>

<style lang="scss" scoped></style>
