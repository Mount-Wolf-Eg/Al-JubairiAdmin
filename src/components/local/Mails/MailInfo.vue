<template>
  <div class="user-info">
    <div class="user-data m-5">
      <div class="row d-flex flex-row">
        <span class="col-12 center-col my-3">
          <label class="user-name" for="slideEn">Name</label>
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
            :value="`${mail?.first_name}${mail.last_name}`"
          />
        </span>

        <span class="col-12 center-col my-3">
          <label class="user-name" for="slideEn">Email</label>
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
            :value="mail?.email"
          />
        </span>
        <span class="col-12 center-col my-3">
          <label class="user-name" for="slideEn">Message</label>
          <textarea
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
            :value="mail?.content"
          ></textarea>
        </span>

        <span class="col-12 center-col my-3">
          <label class="user-name" for="slideEn">Created at:</label>
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
            :value="timeDate"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, watch, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import moment from "moment";
import { useContactStore } from "@/stores/alJubairiStore/contactStore";

const { mail } = storeToRefs(useContactStore());

const route = useRoute();
const router = useRouter();
const timeDate = ref();

onBeforeMount(async () => {
  if (!route.params.id) router.push({ name: "Mails" });
  let res = await useContactStore().getSingleMail(route.params.id);
  if (res)
    timeDate.value = moment(new Date(mail.value.created_at)).format(
      "DD-MM-YYYY"
    );

  if (!res) router.push({ name: "Mails" });
});

onUnmounted(() => {
  mail.value = [];
});
</script>

<style lang="scss" scoped></style>
