<template>
  <div class="users-page">
    <!-- <HelperButtons>
      <template #add-btn> </template>
    </HelperButtons> -->

    <ReplyMessage :repMsg="item"></ReplyMessage>
    <ContactUsTable @msgId="item = $event"></ContactUsTable>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import HelperButtons from "@/reusables/content_buttons/HelperButtons.vue";
import ContactUsTable from "./ContactUsTable.vue";
import ReplyMessage from "./ReplyMessage.vue";

const item = ref();
</script>

<style lang="scss" scoped></style>
