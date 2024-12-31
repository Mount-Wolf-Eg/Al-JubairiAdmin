<template>
  <div
    class="row helper-btns d-flex flex-row align-items-center justify-content-between"
  >
    <div class="col-12 col-sm-6 text-end" style="margin-inline-start: auto">
      <slot name="add-btn"> </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
</script>

<style lang="scss" scoped></style>
