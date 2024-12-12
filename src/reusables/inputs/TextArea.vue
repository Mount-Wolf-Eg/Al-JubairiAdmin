<template>
  <div class="inpt-box">
    <label
      for="inpt-field"
      style="background-color: transparent !important"
      class="inpt-label mb-4"
      v-if="props.label"
      >{{ label }}</label
    >
    <textarea
      name="description"
      type="text"
      class="txt-ar style-17"
      :class="appear"
      :placeholder="holder"
      :value="modelValue"
      @input="updateValue($event.target.value)"
    ></textarea>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
const emits = defineEmits(["textData", "update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: String,
    required: false,
    default: "",
  },
  holder: {
    type: String,
    required: false,
    default: "",
  },
  appear: {
    type: String,
    required: false,
    default: "",
  },
  label: {
    type: String,
    required: false,
    default: () => "",
  },
});

const updateValue = (value) => {
  emits("update:modelValue", value);
};
</script>

<style lang="scss" scoped>
.inpt-box {
  margin: 2rem 0;
  .txt-ar {
    padding: 2rem;
    width: 100%;
    border-radius: var(--brd-radius);
    border: 1px solid var(--col-text);
    min-height: 10rem;
  }
  .inpt-label {
    color: var(--col-text) !important;
    font-size: var(--fs-16) !important;
    font-weight: var(--fw-bold) !important;
    line-height: var(--line-h-20) !important;
    background-color: var(--col-gray) !important;
  }
}
</style>

<!-- usage 
   <Text-Area
            :holder="''"
            @inptData="formdata.data=$event"
          ></Text-Area> 
-->
