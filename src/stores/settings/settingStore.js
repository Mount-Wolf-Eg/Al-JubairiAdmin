import { defineStore } from "pinia";
import { mainStore } from "../mainStore";
import axiosInstance from "../axios_instance";

export const settingStore = defineStore("settingStore", {
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
    // allSettings: [],
    // activeSettings: [],
    // suspendedSettings: [],
    // setting: [],
    // workProcess: [],
  }),

  actions: {
    // all settings
    async getAllSettings() {
      await axiosInstance
        .get(`${mainStore().secondApi}/website/settings`, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {})
        .catch((err) => {
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
    // // active settings
    // async getActiveSettings() {
    //   await axiosInstance
    //     .get(`${mainStore().apiLink}/admin/Settings/show`, {
    //       headers: {
    //         Authorization: `Bearer ${
    //           this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
    //         }`,
    //       },
    //     })
    //     .then((res) => {
    //       this.activeSettings = res.data.data;
    //     })
    //     .catch((err) => {
    //       let errorMessage = "Something went wrong, please try again";

    //       if (err.response && err.response.data && err.response.data.message) {
    //         const errorArray = Object.values(err.response.data.message);
    //         if (errorArray.length > 0 && errorArray[0][0]) {
    //           errorMessage = errorArray[0][0];
    //         }
    //       }
    //       mainStore().showAlert(errorMessage, 2);
    //     });
    // },
    // // suspended settings
    // async getSuspendedSettings() {
    //   await axiosInstance
    //     .get(`${mainStore().apiLink}/admin/Settings/trashed`, {
    //       headers: {
    //         Authorization: `Bearer ${
    //           this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
    //         }`,
    //       },
    //     })
    //     .then((res) => {
    //       this.suspendedSettings = res.data.data;
    //     })
    //     .catch((err) => {
    //       let errorMessage = "Something went wrong, please try again";

    //       if (err.response && err.response.data && err.response.data.message) {
    //         const errorArray = Object.values(err.response.data.message);
    //         if (errorArray.length > 0 && errorArray[0][0]) {
    //           errorMessage = errorArray[0][0];
    //         }
    //       }
    //       mainStore().showAlert(errorMessage, 2);
    //     });
    // },

    // // setting
    // async getASetting() {
    //   let result;
    //   await axiosInstance
    //     .post(`${mainStore().apiLink}/admin/Settings/one`, {
    //       headers: {
    //         Authorization: `Bearer ${
    //           this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
    //         }`,
    //       },
    //     })
    //     .then((res) => {
    //       this.setting = res.data.data.settings;
    //       this.workProcess = res.data.data.settings.work_process;

    //       result = res;
    //     })
    //     .catch((err) => {
    //       let errorMessage = "Something went wrong, please try again";

    //       if (err.response && err.response.data && err.response.data.message) {
    //         const errorArray = Object.values(err.response.data.message);
    //         if (errorArray.length > 0 && errorArray[0][0]) {
    //           errorMessage = errorArray[0][0];
    //         }
    //       }
    //       mainStore().showAlert(errorMessage, 2);
    //       result = false;
    //     });
    //   return result;
    // },
    // // delete setting
    // async destroySetting(id) {
    //   let result;
    //   await axiosInstance
    //     .post(`${mainStore().apiLink}/admin/Settings/destroy`, id, {
    //       headers: {
    //         Authorization: `Bearer ${
    //           this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
    //         }`,
    //       },
    //     })
    //     .then((res) => {
    //       result = res;
    //       mainStore().showAlert("Setting suspended suuccessfully", 1);
    //     })
    //     .catch((err) => {
    //       let errorMessage = "Something went wrong, please try again";

    //       if (err.response && err.response.data && err.response.data.message) {
    //         const errorArray = Object.values(err.response.data.message);
    //         if (errorArray.length > 0 && errorArray[0][0]) {
    //           errorMessage = errorArray[0][0];
    //         }
    //       }
    //       mainStore().showAlert(errorMessage, 2);
    //       result = false;
    //     });
    //   return result;
    // },
    // // add setting
    // async addSetting(data) {
    //   let result;
    //   await axiosInstance
    //     .post(`${mainStore().apiLink}/admin/Settings/store`, data, {
    //       headers: {
    //         Authorization: `Bearer ${
    //           this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
    //         }`,
    //       },
    //     })
    //     .then((res) => {
    //       result = res;
    //       mainStore().showAlert("Setting created suuccessfully", 1);
    //       this.getASetting();
    //     })
    //     .catch((err) => {
    //       let errorMessage = "Something went wrong, please try again";

    //       if (err.response && err.response.data && err.response.data.message) {
    //         const errorArray = Object.values(err.response.data.message);
    //         if (errorArray.length > 0 && errorArray[0][0]) {
    //           errorMessage = errorArray[0][0];
    //         }
    //       }
    //       mainStore().showAlert(errorMessage, 2);
    //       result = false;
    //     });
    //   return result;
    // },
    // // update setting
    // async updateSetting(data) {
    //   let result;
    //   await axiosInstance
    //     .post(`${mainStore().apiLink}/admin/Settings/update`, data, {
    //       headers: {
    //         Authorization: `Bearer ${
    //           this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
    //         }`,
    //       },
    //     })
    //     .then((res) => {
    //       result = res;
    //       mainStore().showAlert("Setting updated suuccessfully", 1);
    //       this.getASetting();
    //     })
    //     .catch((err) => {
    //       let errorMessage = "Something went wrong, please try again";

    //       if (err.response && err.response.data && err.response.data.message) {
    //         const errorArray = Object.values(err.response.data.message);
    //         if (errorArray.length > 0 && errorArray[0][0]) {
    //           errorMessage = errorArray[0][0];
    //         }
    //       }
    //       mainStore().showAlert(errorMessage, 2);
    //       result = false;
    //     });
    //   return result;
    // },
  },
});
