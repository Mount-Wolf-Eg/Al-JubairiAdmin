<!--  <template>
  <div ref="editorContainer" class="editor-container"></div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import Quill from "quill";

// Extend Quill's Link format to allow users to choose target behavior
const Link = Quill.import("formats/link");
class CustomLink extends Link {
  static create(value) {
    let node = super.create(value);
    let url = typeof value === "string" ? value : value.href;
    node.setAttribute("href", url);

    // Ask the user if they want to open the link in a new tab
    const openInNewTab = confirm("Open this link in a new tab?");
    if (openInNewTab) {
      node.setAttribute("target", "_blank");
      node.setAttribute("rel", "noopener noreferrer");
    } else {
      node.removeAttribute("target");
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
            [{ size: ["small", false, "large", "huge"] }],
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
</style> -->
<template>
  <div ref="editorContainer" class="editor-container"></div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Quill from "quill";

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
            [{ size: ["small", false, "large", "huge"] }],
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
          ],
        },
      });

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
