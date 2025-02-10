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

    onMounted(() => {
      quillInstance = new Quill(editorContainer.value, {
        theme: "snow",
        modules: {
          toolbar: [
            [
              { header: "1" },
              { header: "2" },
              { header: "3" },
              { header: "4" },
              { header: "5" },
              { header: "6" },
              { font: [] },
            ],
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

      quillInstance.root.innerHTML = props.modelValue;
    });

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
  height: 300px;
  border: 1px solid #ccc;
}
</style>
