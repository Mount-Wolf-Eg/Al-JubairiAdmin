<script setup>
import { onMounted, onUpdated, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import MainLayout from "./components/global/MainLayout.vue";
</script>

<template>
  <main>
    <MainLayout>
      <router-view />
    </MainLayout>
  </main>
</template>

<style scoped></style>
