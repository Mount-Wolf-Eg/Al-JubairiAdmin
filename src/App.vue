<script setup>
import { onMounted, watchEffect, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import MainLayout from "./components/global/MainLayout.vue";
import { useAuthStore } from "./stores/auth/auth";

onMounted(() => {
  // useAuthStore().userData;
});
</script>

<template>
  <main>
    <MainLayout>
      <router-view />
    </MainLayout>
  </main>
</template>

<style scoped></style>
