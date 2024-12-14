<template>
  <div class="user-info">
    <div class="user-data m-5">
      <div class="row d-flex flex-row">
        <span class="col-12 center-col my-3">
          <label class="user-name" for="slideEn">User Name:</label>
          <input
            type="text"
            style="
              border: 1px solid var(--col-text);
              border-radius: var(--brd-radius);
              padding: 1rem;
              margin: 1rem;
              font-weight: bold;
              color: var(--col-text);
            "
            disabled
            id="slideEn"
            :value="message.name"
          />
        </span>

        <span class="col-12 center-col my-3">
          <label class="user-name" for="slideEn">User Email:</label>
          <input
            type="text"
            style="
              border: 1px solid var(--col-text);
              border-radius: var(--brd-radius);
              padding: 1rem;
              margin: 1rem;
              font-weight: bold;
              color: var(--col-text);
            "
            disabled
            id="slideEn"
            :value="message.email"
          />
        </span>
        <span class="col-12 center-col my-3">
          <label class="user-name" for="slideEn">Message:</label>
          <input
            type="text"
            style="
              border: 1px solid var(--col-text);
              border-radius: var(--brd-radius);
              padding: 1rem;
              margin: 1rem;
              font-weight: bold;
              color: var(--col-text);
            "
            disabled
            id="slideEn"
            :value="message.message"
          />
        </span>

        <span class="col-12 center-col my-3">
          <label class="user-name" for="slideEn">Reply:</label>
          <input
            type="text"
            style="
              border: 1px solid var(--col-text);
              border-radius: var(--brd-radius);
              padding: 1rem;
              margin: 1rem;
              font-weight: bold;
            "
            :style="`${message.reply ? 'var(--col-text)' : 'color: red'}`"
            disabled
            id="slideEn"
            :value="message.reply ? message.reply : 'Not Replied'"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { contactUsStore } from "@/stores/settings/contactUs";
import { storeToRefs } from "pinia";
import moment from "moment";

const { message } = storeToRefs(contactUsStore());

const route = useRoute();
const router = useRouter();
const timeDate = ref();

onBeforeMount(async () => {
  if (!route.params.id) router.push({ name: "ContactUs" });
  let res = await contactUsStore().getSingleMessage({ id: route.params.id });
  if (res)
    timeDate.value = moment(new Date(message.value.created_at)).format(
      "DD-MM-YYYY"
    );
  if (!res) router.push({ name: "ContactUs" });
});
</script>

<style lang="scss" scoped></style>
