<template>
  <div
    class="nav-bar row col-12 d-flex flex-column flex-sm-row justify-content-sm-between"
  >
    <img
      @click="router.push({ name: 'home' })"
      :src="settings?.logo"
      alt="brand logg"
      style="
        height: 6.2rem;
        width: auto;
        object-fit: contain;
        object-position: center;
      "
    />
    <div class="nav-bar-body col col-sm-3 col-md-3">
      <!-- <button type="button" class="btn position-relative bell-btn">
        <span class="center-row">
          <svg
            style="width: 2.1rem; height: 2.1rem"
            viewBox="0 0 21 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4827 18.3265C7.90258 18.3265 5.32335 18.3299 2.74323 18.3248C1.78922 18.3231 1.13144 17.8341 0.971245 17.0066C0.844163 16.351 1.13233 15.8483 1.63171 15.4152C3.06899 14.1666 3.79926 12.6079 3.79926 10.7415C3.79926 9.91141 3.7921 9.08047 3.80105 8.25039C3.81806 6.76982 4.2879 5.43533 5.25176 4.27614C6.25499 3.06883 7.54997 2.29461 9.12775 1.9844C9.43293 1.92425 9.57433 1.82887 9.53226 1.51694C9.50542 1.32017 9.51795 1.11565 9.53137 0.916296C9.56448 0.388688 9.95468 0.0123162 10.4666 0.000286071C10.9848 -0.0117441 11.4823 0.356894 11.417 0.871612C11.3078 1.72919 11.724 1.95089 12.4999 2.16571C15.1221 2.88924 16.9764 5.1784 17.1384 7.78723C17.1974 8.72902 17.176 9.67596 17.1715 10.6212C17.1625 12.5494 17.8857 14.1598 19.3829 15.4522C20.0076 15.9909 20.1857 16.6466 19.9172 17.3065C19.6469 17.9725 19.0724 18.3248 18.2222 18.3256C15.642 18.3291 13.0628 18.3274 10.4827 18.3265Z"
              fill="#464A61"
            />
            <path
              d="M0.00919952 8.48153C0.176554 5.60804 1.3006 3.13413 3.37508 1.05635C3.66414 0.767627 3.99527 0.60522 4.4159 0.722944C4.79177 0.827778 5.02267 1.07955 5.09874 1.44733C5.18018 1.84433 4.9636 2.12703 4.69512 2.39513C3.50663 3.58526 2.6806 4.97388 2.24119 6.57131C2.03893 7.30687 1.91632 8.0536 1.91006 8.81666C1.90827 9.00226 1.91006 9.18701 1.83846 9.36661C1.67916 9.7636 1.29613 10.0025 0.8585 9.96725C0.427138 9.93288 0.0718455 9.63041 0.0154641 9.20764C-0.0158589 8.96875 0.0100945 8.72299 0.0100945 8.47981L0.00919952 8.48153Z"
              fill="#464A61"
            />
            <path
              d="M20.9839 8.64567C20.9839 8.77457 20.9875 8.90346 20.9839 9.03235C20.966 9.5823 20.5749 9.96985 20.0388 9.97157C19.5037 9.97328 19.1 9.59433 19.0884 9.03923C19.0535 7.33267 18.632 5.73008 17.7397 4.24779C17.3048 3.52512 16.7633 2.88323 16.1709 2.27313C15.6429 1.7292 15.8245 0.971296 16.5145 0.740146C16.9298 0.60094 17.2717 0.734131 17.5661 1.02371C19.4043 2.83339 20.5123 4.98937 20.881 7.49164C20.9374 7.87316 20.9606 8.25985 21 8.64395C20.9946 8.64395 20.9893 8.64481 20.9839 8.64567Z"
              fill="#464A61"
            />
            <path
              d="M10.5499 19.2477C11.5934 19.2477 12.636 19.2554 13.6795 19.2425C13.9614 19.2391 13.9918 19.3121 13.9176 19.5579C13.4933 20.9671 12.065 21.9966 10.5033 22C8.93541 22.0034 7.51782 20.9963 7.06855 19.5828C6.98085 19.3061 7.03544 19.2391 7.33167 19.2425C8.4047 19.2554 9.47685 19.2477 10.5499 19.2477Z"
              fill="#464A61"
            />
          </svg>
        </span>
        <div
          class="center-col count-tip position-absolute translate-middle rounded-circle"
        >
          10
        </div>
      </button> -->

      <!-- <button type="button" class="btn" @click="toggleTheme">
        <svg
          style="width: 2.4rem; height: 2.4rem"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 21C9.5 21 7.375 20.125 5.625 18.375C3.875 16.625 3 14.5 3 12C3 9.5 3.875 7.375 5.625 5.625C7.375 3.875 9.5 3 12 3C12.2333 3 12.4625 3.00833 12.6875 3.025C12.9125 3.04167 13.1333 3.06667 13.35 3.1C12.6667 3.58333 12.1208 4.2125 11.7125 4.9875C11.3042 5.7625 11.1 6.6 11.1 7.5C11.1 9 11.625 10.275 12.675 11.325C13.725 12.375 15 12.9 16.5 12.9C17.4167 12.9 18.2583 12.6958 19.025 12.2875C19.7917 11.8792 20.4167 11.3333 20.9 10.65C20.9333 10.8667 20.9583 11.0875 20.975 11.3125C20.9917 11.5375 21 11.7667 21 12C21 14.5 20.125 16.625 18.375 18.375C16.625 20.125 14.5 21 12 21ZM12 19C13.4667 19 14.7833 18.5958 15.95 17.7875C17.1167 16.9792 17.9667 15.925 18.5 14.625C18.1667 14.7083 17.8333 14.775 17.5 14.825C17.1667 14.875 16.8333 14.9 16.5 14.9C14.45 14.9 12.7042 14.1792 11.2625 12.7375C9.82083 11.2958 9.1 9.55 9.1 7.5C9.1 7.16667 9.125 6.83333 9.175 6.5C9.225 6.16667 9.29167 5.83333 9.375 5.5C8.075 6.03333 7.02083 6.88333 6.2125 8.05C5.40417 9.21667 5 10.5333 5 12C5 13.9333 5.68333 15.5833 7.05 16.95C8.41667 18.3167 10.0667 19 12 19Z"
            fill="#464A61"
          />
        </svg>
      </button> -->
      <button type="button" class="btn">
        <div class="dropdown">
          <a
            href="#"
            class="d-flex align-items-center justify-content-center gap-3 text-decoration-none dropdown-toggle"
            id="dropdownUser3"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <!-- v-if="authUser.image" -->
            <img
              v-if="false"
              :src="authUser.image"
              style="width: 5.2rem; height: 5.2rem; border-radius: 50%"
              alt=""
            />
            <span
              v-else
              style="
                position: relative;
                width: 5.2rem;
                height: 5.2rem;
                border-radius: 50%;
                background-color: gray;
              "
            >
              <svg
                style="
                  width: 2rem;
                  height: auto;
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%, -50%);
                "
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"
                />
              </svg>
            </span>

            <!-- <p class="user-info">{{ authUser.name }}</p> -->
          </a>

          <ul
            class="dropdown-menu text-small shadow w-100"
            aria-labelledby="dropdownUser3"
          >
            <li
              @click="router.push({ name: 'FooterSettings' })"
              class="dropdown-item"
            >
              Settings
            </li>
            <li class="dropdown-item" @click="useAuthStore().logOut()">
              Sign out
            </li>
          </ul>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth/auth";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useSettingStore } from "@/stores/alJubairiStore/settings";
const { settings } = storeToRefs(useSettingStore());
const route = useRoute();
const router = useRouter();
const toggleTheme = () => {
  const htmlElement = document.querySelector("html");
  htmlElement.classList.toggle("light-theme");
  htmlElement.classList.toggle("dark-theme");
};

watch(
  () => route.name,
  async () => {
    if (route.name == "Home") {
      await useSettingStore().getSettings();
    }
  }
);
</script>

<style lang="scss" scoped></style>
