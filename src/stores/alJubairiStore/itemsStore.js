import { defineStore } from "pinia";
import { mainStore } from "../mainStore";
import axiosInstance from "../axios_instance";

export const useItemsStore = defineStore("itemsStore", {
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
    allItems: [],
    singleItem: [],
  }),

  actions: {
    async getItems(secName) {
      await axiosInstance
        .get(`${mainStore().secondApi}/website/sections/slider`, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          this.allItems = res.data.data.items.data || [];
        })
        .catch((err) => {
          let errorMessage = "Something went wrong, please try again";
          console.log(err);
          if (err.response && err.response.data && err.response.data.message) {
            const errorArray = err.response.data.message;
            if (errorArray) {
              errorMessage = err.response.data.message;
            }
          }
          mainStore().showAlert(errorMessage, 2);
        });
    },
    async getSingleItem(itemId) {
      let result;
      await axiosInstance
        .get(`${mainStore().mainApi}/items/${itemId}`, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          this.singleItem = res.data.data;
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
          }
          mainStore().showAlert(errorMessage, 2);
          result = false;
        });
      return result;
    },
  },
});
