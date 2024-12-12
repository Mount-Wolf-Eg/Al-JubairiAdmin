<template>
  <div>
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog border-0">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div
            class="modal-body d-flex flex-column align-items-center justify-content-between p-5"
          >
            <svg
              style="width: 8rem; height: 8rem"
              fill="#cc2f2f"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"
              />
            </svg>

            <p class="modal-title">Are You Sure ?</p>
          </div>
          <div
            class="modal-footer d-flex gap-4 align-items-center justify-content-center"
          >
            <button type="button" class="close-btn" data-bs-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              class="confirm-btn"
              @click="emits('deleteItem')"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, watch } from "vue";
const emits = defineEmits(["deleteItem"]);
</script>

<style lang="scss" scoped>
.modal {
  .modal-dialog {
    height: 25%;
    width: 250%;
    .modal-content {
      background-color: var(--col-bg);
      height: 100%;
      width: 100%;
      .modal-title {
        color: var(--col-text);
        font-size: 2.8rem;
        font-weight: bold;
        color: var(--col-error);
      }
      .close-btn {
        background-color: #5a5959;
        color: var(--col-white);
        font-weight: bold;
        font-size: 1.4rem;
        border-radius: 0.9rem;
        width: 10rem;
        height: 4rem;
        &:hover {
          background-color: rgb(46, 46, 46);
        }
      }
      .confirm-btn {
        background-color: var(--col-success);
        color: var(--col-white);
        font-weight: bold;
        font-size: 1.4rem;
        border-radius: 0.9rem;
        width: 10rem;
        height: 4rem;
        &:hover {
          background-color: green;
        }
      }
    }
  }
}
</style>
<!-- <button
  type="button"
  class="btn border-0"
  data-bs-toggle="modal"
  data-bs-target="#staticBackdrop"
  @click="val = admin.id"
>
                <svg
                  class="delete-btn"
                  style="width: 1.6rem; height: 1.8rem"
                  viewBox="0 0 16 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                    fill="#464A61"
                  />
                </svg>
              </button> -->
<!-- <ConfirmationMsg   @deleteItem="removeUser(val)" /> -->
<!-- const val = ref(); -->
