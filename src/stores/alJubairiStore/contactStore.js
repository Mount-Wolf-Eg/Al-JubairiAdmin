import { defineStore } from "pinia";
import { mainStore } from "../mainStore";
import axiosInstance from "../axios_instance";

export const useContactStore = defineStore("contactStore", {
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
    allMails: [],
    mail: [],
    pagination: [],
  }),

  actions: {
    // get all items
    async getAllMails(filter, num) {
      let loading = true;

      await axiosInstance
        .get(
          `${mainStore().mainApi}/contacts?keyword=${filter ?? ""}&page=${
            num ?? ""
          }`,
          {
            headers: {
              Authorization: `Bearer ${
                this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
              }`,
            },
          }
        )
        .then((res) => {
          this.allMails = res.data.data || [];
          this.pagination = res.data.meta;
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
        })
        .finally(() => {
          loading = false;
          return loading;
        });
    },
    // add item
    async replyMessage(id, data) {
      let result;
      await axiosInstance
        .post(`${mainStore().mainApi}/contacts/${id}/reply`, data, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          this.mail = res.data.data;
          result = res;
        })
        .catch((err) => {
          let errorMessage = "Something went wrong, please try again";
          console.log(err);
          if (err.response && err.response.data && err.response.data.message) {
            const errorArray = err.response.data.message;
            if (errorArray) {
              errorMessage = err.response.data.message;
            }
          } else {
            errorMessage = err.message;
          }
          mainStore().showAlert(errorMessage, 2);
          result = false;
        });
      return result;
    },

    // get item
    async getSingleMail(itemId) {
      let result;
      await axiosInstance
        .get(`${mainStore().mainApi}/contacts/${itemId}`, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          this.mail = res.data.data;
          result = res;
        })
        .catch((err) => {
          let errorMessage = "Something went wrong, please try again";
          console.log(err);
          if (err.response && err.response.data && err.response.data.message) {
            const errorArray = err.response.data.message;
            if (errorArray) {
              errorMessage = err.response.data.message;
            }
          } else {
            errorMessage = err.message;
          }
          mainStore().showAlert(errorMessage, 2);
          result = false;
        });
      return result;
    },
  },
});
