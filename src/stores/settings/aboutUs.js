import { defineStore } from "pinia";
import { mainStore } from "../mainStore";
import axiosInstance from "../axios_instance";

export const aboutUsStore = defineStore("aboutUs", {
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
    aboutUs: [],
    ourGoals: [],
    ourMission: [],
    ourVission: [],
    termsConditions: [],
    privacyPolicy: [],
  }),

  actions: {
    async getAllAboutUs() {
      await axiosInstance
        .get(`${mainStore().mainApi}/admin/StaticPages/all`, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          this.aboutUs = res.data.data.find((e) => e.id == 1);
          this.termsConditions = res.data.data.find((e) => e.id == 2);
          this.privacyPolicy = res.data.data.find((e) => e.id == 3);
          this.ourVission = res.data.data.find((e) => e.id == 4);
          this.ourMission = res.data.data.find((e) => e.id == 5);
          this.ourGoals = res.data.data.find((e) => e.id == 6);
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
        });
    },
    async updateAllAbout(data) {
      let result;
      await axiosInstance
        .post(`${mainStore().mainApi}/admin/StaticPages/update`, data, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
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
