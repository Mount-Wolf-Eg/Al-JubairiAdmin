<template>
  <div ref="editorContainer" class="editor-container"></div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import Quill from "quill";

export default {
  name: "TextEditor",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const editorContainer = ref(null);
    let quillInstance = null;

    // Initialize Quill editor on mount
    onMounted(() => {
      quillInstance = new Quill(editorContainer.value, {
        theme: "snow", // You can use 'snow' or 'bubble'
        modules: {
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            ["link"],
            [{ align: [] }],
            ["image"],
          ],
        },
      });

      // Update modelValue when the editor content changes
      quillInstance.on("text-change", () => {
        emit("update:modelValue", quillInstance.root.innerHTML);
      });

      // Set the initial value if provided
      quillInstance.root.innerHTML = props.modelValue;
    });

    // Cleanup Quill editor on unmount
    onBeforeUnmount(() => {
      if (quillInstance) {
        quillInstance = null;
      }
    });

    return {
      editorContainer,
    };
  },
};
</script>

<style scoped>
.editor-container {
  height: 300px; /* Set the height for the editor */
  border: 1px solid #ccc;
}
</style>
