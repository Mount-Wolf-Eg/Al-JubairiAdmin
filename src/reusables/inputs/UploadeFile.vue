<!-- <template>
  <div>
    <div
      class="upload-field center-row justify-content-between"
      @dragover.prevent="handleDragOver"
      @drop.prevent="handleDrop"
    >
      <label :for="`img-field-${props.for}`">
        <div
          class="h-100 center-row justify-content-between px-5 style-17"
          style="color: #464a61; font-size: var(--fs-12); font-weight: bold"
        >
          <span>Drop here</span><span>Add photo</span>
        </div></label
      >
      <input
        class="style-17 img-field-st border-none"
        type="file"
        name="upload file"
        :id="`img-field-${props.for}`"
        accept=".png, .jpeg, .jpg, .svg"
        @change="uploadFile"
        :disabled="disable"
        multiple
      />
      <span
        ><svg
          style="width: 3rem; height: 3rem; margin-inline-end: 3rem"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.75 19.25V24.9167C27.75 25.6681 27.4515 26.3888 26.9201 26.9201C26.3888 27.4515 25.6681 27.75 24.9167 27.75H5.08333C4.33189 27.75 3.61122 27.4515 3.07986 26.9201C2.54851 26.3888 2.25 25.6681 2.25 24.9167V19.25M22.0833 9.33333L15 2.25M15 2.25L7.91667 9.33333M15 2.25V19.25"
            stroke="#464A61"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </div>
    <div
      v-if="userImg"
      style="position: relative; width: fit-content; margin: 1rem 0"
    >
      <button
        @click="removeFile()"
        style="position: absolute; right: 0; top: 0"
      >
        <svg
          fill="#000000"
          style="width: 1.5rem; height: 1.5rem"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              d="M13,3.05A7,7,0,1,0,13,13,7,7,0,0,0,13,3.05ZM12,12A5.6,5.6,0,0,1,4,12,5.61,5.61,0,0,1,4,4,5.6,5.6,0,0,1,12,4,5.61,5.61,0,0,1,12,12ZM10.65,4.08,8,6.73,5.35,4.08,4.08,5.35,6.73,8,4.08,10.65l1.27,1.27L8,9.27l2.65,2.65,1.27-1.27L9.27,8l2.65-2.65Z"
            />
          </g>
        </svg>
      </button>
      <img
        class="mt-3"
        :src="userImg"
        alt=""
        style="max-width: 10rem; border-radius: 7px"
      />
    </div>
  </div>
</template>

<script setup>
import { mainStore } from "@/stores/mainStore";
import { ref, watch } from "vue";

const userImg = ref("");
const file = ref(null);
const emits = defineEmits(["fileData"]);
const props = defineProps({
  disable: {
    type: Boolean,
    default: false,
    required: false,
  },
  for: {
    type: String,
    default: "",
    required: false,
  },
  reset: {
    type: Boolean,
    default: false,
  },
});

watch(
  () => props.reset,
  (newVal) => {
    if (newVal) {
      userImg.value = "";
    }
  }
);
const handleDragOver = (e) => {
  e.preventDefault();
};
const handleDrop = (e) => {
  const files = e.dataTransfer.files;
  if (files.length) {
    uploadFile({ target: { files } });
  }
};
const uploadFile = (e) => {
  if (e.target.files.length < 2) {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) {
      file.value = null;
      userImg.value = "";
      emits("fileData", file.value);
      return;
    }

    if (uploadedFile.size <= 10 * 1024 * 1024) {
      file.value = uploadedFile;
      emits("fileData", file.value);
      const reader = new FileReader();
      reader.readAsDataURL(file.value);
      reader.addEventListener("load", (e) => {
        userImg.value = e.currentTarget.result;
      });
      file.value = null;
    } else {
      userImg.value = "";
      file.value = null;
      mainStore().showAlert("File size cannot be more than 10 MB", 2);
      emits("fileData", file.value);
    }
  } else {
    emits("fileData", e.target.files);
  }
};

const removeFile = () => {
  userImg.value = "";
  file.value = null;
  userImg.value = null;
  emits("fileData", file.value);

  const fileInputElement = document.querySelector("#fileInputElementId");
  if (fileInputElement) {
    fileInputElement.value = null;
  }
};
</script>

<style lang="scss" scoped>
.upload-field {
  margin: 1rem 0 0;
  position: relative;
  border-radius: var(--brd-radius);
  border: 1px solid #464a61;
  padding: 0.5rem;
  background-color: white;
  input {
    background-color: white;
    width: 25% !important;
    color: transparent;
    border: 1px solid #464a61;
  }

  input::file-selector-button {
    background-color: transparent;
    border-radius: var(--brd-radius);
    padding: 1rem 2rem;
    border: none;
    color: #464a61;
  }

  .img-field-st {
    border-radius: var(--brd-radius);
    padding: 1rem 2rem;
  }
  label {
    width: 75% !important;
    cursor: pointer;
    padding: 2rem 0;
  }
  svg {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style> -->

<!-- usage
<UploadeFile @fileData="formData.file=$event" :disable="true or false" :for="id"></UploadeFile>
-->

<template>
  <div>
    <div
      class="upload-field center-row justify-content-between"
      @dragover.prevent="handleDragOver"
      @drop.prevent="handleDrop"
    >
      <label :for="`img-field-${props.for}`">
        <div
          class="h-100 center-row justify-content-between px-5 style-17"
          style="color: #464a61; font-size: var(--fs-12); font-weight: bold"
        >
          <span>Drop here</span><span>Add photos</span>
        </div>
      </label>
      <input
        class="style-17 img-field-st border-none"
        type="file"
        name="upload file"
        :id="`img-field-${props.for}`"
        accept=".png, .jpeg, .jpg, .svg, .gif"
        @change="uploadFile"
        :disabled="disable"
        multiple
      />
      <span>
        <svg
          style="width: 3rem; height: 3rem; margin-inline-end: 3rem"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.75 19.25V24.9167C27.75 25.6681 27.4515 26.3888 26.9201 26.9201C26.3888 27.4515 25.6681 27.75 24.9167 27.75H5.08333C4.33189 27.75 3.61122 27.4515 3.07986 26.9201C2.54851 26.3888 2.25 25.6681 2.25 24.9167V19.25M22.0833 9.33333L15 2.25M15 2.25L7.91667 9.33333M15 2.25V19.25"
            stroke="#464A61"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </div>
    <div
      v-if="userImgs.length"
      style="position: relative; width: fit-content; margin: 1rem 0"
    >
      <div
        v-for="(img, index) in userImgs?.slice(0, 1)"
        :key="index"
        style="position: relative; display: inline-block; margin: 0.5rem"
      >
        <button
          @click="removeFile(index)"
          style="position: absolute; right: 0; top: 0"
        >
          <svg
            fill="#000000"
            style="width: 1.5rem; height: 1.5rem"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="M13,3.05A7,7,0,1,0,13,13,7,7,0,0,0,13,3.05ZM12,12A5.6,5.6,0,0,1,4,12,5.61,5.61,0,0,1,4,4,5.6,5.6,0,0,1,12,4,5.61,5.61,0,0,1,12,12ZM10.65,4.08,8,6.73,5.35,4.08,4.08,5.35,6.73,8,4.08,10.65l1.27,1.27L8,9.27l2.65,2.65,1.27-1.27L9.27,8l2.65-2.65Z"
              />
            </g>
          </svg>
        </button>
        <img
          class="mt-3"
          :src="img"
          alt="Image Preview"
          style="max-width: 10rem; border-radius: 7px"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { mainStore } from "@/stores/mainStore";
import { ref, watch } from "vue";

const userImgs = ref([]); // Array to hold multiple image previews
const files = ref([]);
const emits = defineEmits(["fileData"]);
const props = defineProps({
  disable: {
    type: Boolean,
    default: false,
    required: false,
  },
  for: {
    type: String,
    default: "",
    required: false,
  },
  reset: {
    type: Boolean,
    default: false,
  },
});

watch(
  () => props.reset,
  (newVal) => {
    if (newVal) {
      userImgs.value = [];
      files.value = [];
    }
  }
);

const handleDragOver = (e) => {
  e.preventDefault();
};

const handleDrop = (e) => {
  const droppedFiles = e.dataTransfer.files;
  if (droppedFiles.length) {
    uploadFile({ target: { files: droppedFiles } });
  }
};

const uploadFile = (e) => {
  const selectedFiles = e.target.files || e.dataTransfer.files;
  if (selectedFiles.length) {
    const newFiles = Array.from(selectedFiles);
    newFiles.forEach((uploadedFile) => {
      if (uploadedFile.size <= 10 * 1024 * 1024) {
        // 10 MB limit

        files.value.push(uploadedFile);
        const reader = new FileReader();
        reader.readAsDataURL(uploadedFile);
        reader.onload = () => {
          userImgs.value.push(reader.result);
        };
      } else {
        mainStore().showAlert("File size cannot be more than 10 MB", 2);
      }
    });
    if (files.value.length > 1) {
      emits("fileData", files.value);
    } else {
      emits("fileData", files.value[0]);
    }
  }
};

const removeFile = (index) => {
  userImgs.value.splice(index, 1);
  files.value.splice(index, 1);
  emits("fileData", files.value);
};
</script>

<style lang="scss" scoped>
.upload-field {
  margin: 1rem 0 0;
  position: relative;
  border-radius: var(--brd-radius);
  border: 1px solid #464a61;
  padding: 0.5rem;
  background-color: white;
  input {
    background-color: white;
    width: 25% !important;
    color: transparent;
    border: 1px solid #464a61;
  }

  input::file-selector-button {
    background-color: transparent;
    border-radius: var(--brd-radius);
    padding: 1rem 2rem;
    border: none;
    color: #464a61;
  }

  .img-field-st {
    border-radius: var(--brd-radius);
    padding: 1rem 2rem;
  }
  label {
    width: 75% !important;
    cursor: pointer;
    padding: 2rem 0;
  }
  svg {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
