<template>
  <div>
    <div ref="editorContainer" class="editor-container"></div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Quill from "quill";

// Register HR Blot
const BlockEmbed = Quill.import("blots/block/embed");
class HorizontalRule extends BlockEmbed {
  static blotName = "hr";
  static tagName = "hr";
}
Quill.register(HorizontalRule);

// Extend Quill's Link format
const Link = Quill.import("formats/link");
class CustomLink extends Link {
  static create(value) {
    let node = super.create(value);
    let url = typeof value === "string" ? value : value.href;
    node.setAttribute("href", url);

    const openInNewTab = confirm("Open this link in a new tab?");
    if (openInNewTab) {
      node.setAttribute("target", "_blank");
      node.setAttribute("rel", "noopener noreferrer");
    } else {
      node.removeAttribute("target");
    }

    const addNoFollow = confirm('Make link "nofollow"?');
    if (addNoFollow) {
      node.setAttribute("rel", (node.getAttribute("rel") || "") + " nofollow");
    }

    return node;
  }
}
Quill.register("formats/link", CustomLink, true);

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
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ align: [] }],
            ["link", "image", "video"],
            ["blockquote", "code-block"],
            ["clean"],
            ["hr"],
          ],
        },
      });

      // Add HR button functionality
      const toolbar = quillInstance.getModule("toolbar");
      toolbar.addHandler("hr", () => {
        const range = quillInstance.getSelection();
        if (range) {
          quillInstance.insertEmbed(range.index, "hr", true, "user");
        }
      });

      // Sync modelValue when text changes
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

<style scoped lang="scss">
.editor-container {
  height: 300px;
  border: 1px solid #ccc;
}
::v-deep(.ql-hr) {
  width: 28px;
  height: 24px;
  &::after {
    content: "hr";
    width: 100% !important;
    height: 100%;
    font-weight: bold;
    font-size: 13px;
    color: #444;
  }
}
</style>
