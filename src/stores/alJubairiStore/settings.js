import { defineStore } from "pinia";
import { mainStore } from "../mainStore";
import axiosInstance from "../axios_instance";

export const useSettingStore = defineStore("settingStore", {
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
    settings: [],
  }),

  actions: {
    async getSettings() {
      let loading = true;
      let token = document.cookie
        .split(";")
        .map((coki) => coki.split("="))
        .reduce(
          (acc, [key, val]) => ({
            ...acc,
            [key.trim()]: decodeURIComponent(val),
          }),
          {}
        )["Admin"];
      await axiosInstance
        .get(`${mainStore().mainApi}/settings`, {
          headers: {
            Authorization: `Bearer ${token ? JSON.parse(token)["token"] : ""}`,
          },
        })
        .then((res) => {
          this.settings = res.data.data;
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
    async addSettings(data) {
      let loading;
      await axiosInstance
        .post(`${mainStore().mainApi}/settings`, data, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          this.settings = res.data.data;
          mainStore().showAlert("Settings Updated successfully", 1);
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
