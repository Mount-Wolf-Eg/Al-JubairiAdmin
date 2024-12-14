import { defineStore } from "pinia";
import { mainStore } from "../mainStore";
import axiosInstance from "../axios_instance";

export const attachmentsStore = defineStore("attachmentStore", {
  state: () => ({
    checkToken: document.cookie
      .split(";")
      .map((coki) => coki.split("="))
      .reduce(
        (acc, [key, val]) => ({
          ...acc,
          [key.trim()]: decodeURIComponent(val),
        }),
        {}
      )["Admin"],
    attachmentName: "",
  }),

  actions: {
    // get all items
    // attachment_type are 'image,file,audio,video'
    // model are 'countries , users , pages, sections, items, blogs'
    async sendAttachment(attach, typ, mode) {
      await axiosInstance
        .post(
          `https://aljubairi.diaamagdi.com/api/general/attachments`,
          {
            file: attach,
            attachment_type: typ ? typ : "image",
            model: mode ? mode : "items",
          },
          {
            headers: {
              Authorization: `Bearer ${
                this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
              }`,
            },
          }
        )
        .then((res) => {
          console.log("attach", res.data);
        })
        .catch((err) => {
          console.log(err);
          let errorMessage = "Something went wrong, please try again";
          if (err.response && err.response.data && err.response.data.message) {
            const errorArray = err.response.data.message;
            if (errorArray) {
              errorMessage = err.response.data.message;
            }
          } else {
            errorMessage = err.message;
          }
          mainStore().showAlert(errorMessage, 2);
        });
    },
  },
});
