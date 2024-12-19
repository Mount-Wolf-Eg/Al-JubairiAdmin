import { defineStore } from "pinia";
import { mainStore } from "../mainStore";
import axiosInstance from "../axios_instance";

export const usestatisticsStore = defineStore("statisticsStore", {
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
    allCountries: [],
    allstatistics: [],
  }),

  actions: {
    async getAllCountries() {
      let loading = true;
      await axiosInstance
        .get(`${mainStore().mainApi}/get-visitors-country-list`, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          this.allCountries = res.data;
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
    async getAllStatisticals() {
      let loading = true;
      await axiosInstance
        .get(`${mainStore().mainApi}/statistics`, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          this.allstatistics = res.data;
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
  },
});
