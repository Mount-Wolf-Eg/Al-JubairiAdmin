<template>
  <div class="users-page">
    <sendMail :repMsg="item"></sendMail>
    <MailTable @msgId="item = $event"></MailTable>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import HelperButtons from "@/reusables/content_buttons/HelperButtons.vue";

import MailTable from "./MailTable.vue";
import sendMail from "./sendMail.vue";

const item = ref();
</script>

<style lang="scss" scoped></style>
