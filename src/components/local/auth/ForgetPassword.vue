<template>
  <div class="singBox">
    <p class="head-btn mx-auto">Forget password</p>
    <!-- phase one -->
    <div v-if="phase == 1" class="w-100" style="flex: 1">
      <PhaseOne @SucceOne="(phase = 2), (email = $event)"></PhaseOne>
    </div>

    <!-- phase two -->
    <div v-if="phase == 2" class="w-100" style="flex: 1">
      <PhaseTwo @SucceTwo="phase = 3" :mail="email"></PhaseTwo>
    </div>
    <!-- phase two -->
    <div v-if="phase == 3" class="w-100" style="flex: 1">
      <PhaseThree @succeThree="emits('login')"></PhaseThree>
    </div>
  </div>
</template>

<script setup>
import PhaseOne from "./PhaseOne.vue";
import PhaseTwo from "./PhaseTwo.vue";
import PhaseThree from "./PhaseThree.vue";
import { defineEmits } from "vue";

const emits = defineEmits(["login"]);

import { ref } from "vue";
const phase = ref(1);
const email = ref("");
</script>

<style lang="scss" scoped>
.head-btn {
  font-size: var(--fs-18);
  font-weight: var(--fw-bold);
  margin-inline-start: 5rem;
  color: var(--col-primary) !important;
}
</style>
