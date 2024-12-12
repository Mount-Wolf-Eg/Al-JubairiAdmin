import { defineStore } from "pinia";
import { mainStore } from "../mainStore";
import axiosInstance from "../axios_instance";

export const useServiceStore = defineStore("serviceStore", {
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
    allServices: [],
    activeServices: [],
    suspendedServices: [],
    service: [],
  }),

  actions: {
    async getAllServices() {
      await axiosInstance
        .get(`${mainStore().mainApi}/admin/Services/all`, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          this.allServices = res.data.data;
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
    async getActiveServices() {
      await axiosInstance
        .get(`${mainStore().mainApi}/admin/Services/show`, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          this.activeServices = res.data.data;
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
    async getSuspendedServices() {
      await axiosInstance
        .get(`${mainStore().mainApi}/admin/Services/trashed`, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          this.suspendedServices = res.data.data;
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
    async getService(id) {
      let result;
      await axiosInstance
        .post(`${mainStore().mainApi}/admin/Services/one`, id, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
            flag: "all",
          },
        })
        .then((res) => {
          this.service = res.data.data;
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
    async destroyService(id) {
      let result;
      await axiosInstance
        .post(`${mainStore().mainApi}/admin/Services/destroy`, id, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          result = res;
          mainStore().showAlert("Service suspended suuccessfully", 1);
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
    async restoreService(id) {
      let result;
      await axiosInstance
        .post(`${mainStore().mainApi}/admin/Services/restore`, id, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          result = res;
          mainStore().showAlert("Service restored suuccessfully", 1);
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
    async deleteService(id) {
      let result;
      await axiosInstance
        .post(`${mainStore().mainApi}/admin/Services/forceDelete`, id, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          mainStore().showAlert("Service deleted suuccessfully", 1);

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
    async addService(data) {
      let result;
      await axiosInstance
        .post(`${mainStore().mainApi}/admin/Services/store`, data, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          result = res;
          mainStore().showAlert("Service created suuccessfully", 1);
          this.getAllServices();
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
    async updateService(data) {
      let result;
      await axiosInstance
        .post(`${mainStore().mainApi}/admin/Services/update`, data, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          result = res;
          mainStore().showAlert("Service updated suuccessfully", 1);
          this.getAllServices();
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
