<template>
  <div class="inpt-box">
    <label
      for="inpt-field"
      style="background-color: transparent !important"
      class="inpt-label mb-4"
      v-if="props.label"
      >{{ label }}</label
    >
    <input
      :type="typ"
      class="inpt inpt-body"
      :placeholder="holder"
      :class="appear"
      :value="modelValue"
      :disabled="disable"
      id="inpt-field"
      @input="updateValue($event.target.value)"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
const emits = defineEmits(["inptData", "update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: [String, Number],
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
  disable: {
    type: Boolean,
    required: false,
    default: false,
  },
  label: {
    type: String,
    required: false,
    default: () => "",
  },
  typ: {
    type: String,
    required: false,
    default: () => "text",
  },
});

const updateValue = (value) => {
  emits("update:modelValue", value);
};
</script>

<style lang="scss" scoped>
.inpt-box {
  margin: 2rem 0;
  input {
    padding: 2rem 2rem;
    width: 100%;
    border-radius: var(--brd-radius);

    border: 1px solid #464a61;
  }
}
.inpt-label {
  color: var(--col-text) !important;
  font-size: var(--fs-16) !important;
  font-weight: var(--fw-bold) !important;
  line-height: var(--line-h-20) !important;
  background-color: var(--col-gray) !important;
}
.inpt-body {
  font-weight: var(--fw-bold);
  font-size: var(--fs-14);
  line-height: var(--line-h-15) !important;
  color: var(--col-text);
}
</style>

<!-- usage 
   <InptField
                style="direction: rtl !important"
                :holder="''"
                @inptData="formData = $event"
                :appear="checkErrName(['formData']) ? 'err-border' : ''"
              ></InptField>
-->
