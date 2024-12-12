import { defineStore } from "pinia";
import { mainStore } from "../mainStore";
import axiosInstance from "../axios_instance";

export const useSearchStore = defineStore("searchStore", {
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
    filteredData: [],
  }),

  actions: {
    // all admins
    async getFilteredData(filter, data) {
      let result;
      await axiosInstance
        .post(`${mainStore().mainApi}/admin/search/${filter}`, data, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          this.filteredData = res.data.data;
          result = res;
        })
        .catch((err) => {
          let errorMessage = "Something went wrong, please try again";

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
