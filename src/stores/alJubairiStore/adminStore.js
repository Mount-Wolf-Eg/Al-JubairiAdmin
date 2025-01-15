import { defineStore } from "pinia";
import { mainStore } from "../mainStore";
import axiosInstance from "../axios_instance";

export const useAdminStore = defineStore("adminStore", {
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
    allAdmins: [],
    admin: [],
    pagination: [],
  }),

  actions: {
    async getAllAdmins(num) {
      let loading = true;

      await axiosInstance
        .get(`${mainStore().mainApi}/admins?page=${num ?? ""}`, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          this.allAdmins = res.data.data || [];
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
    async addItem(data) {
      let result;
      await axiosInstance
        .post(`${mainStore().mainApi}/admins`, data, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          this.admin = res.data.data;
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
    // edit item
    async editItem(id, data) {
      let result;
      await axiosInstance
        .post(`${mainStore().mainApi}/admins/${id}`, data, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          this.admin = res.data.data;
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
    async getSingleItem(itemId) {
      let result;
      await axiosInstance
        .get(`${mainStore().mainApi}/admins/${itemId}`, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          this.admin = res.data.data;
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
    // delete item
    async deleteItem(itemId) {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this item?"
      );

      if (!isConfirmed) {
        return;
      }
      let result;
      await axiosInstance
        .delete(`${mainStore().mainApi}/admins/${itemId}`, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          mainStore().showAlert("Admin deleted successfully", 1);

          result = true;
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
    // toggle Status
    async toggle(itemId) {
      let result;
      await axiosInstance
        .post(
          `${mainStore().mainApi}/admins/${itemId}/toggle-active-user`,
          { _method: "PATCH" },
          {
            headers: {
              Authorization: `Bearer ${
                this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
              }`,
            },
          }
        )
        .then((res) => {
          mainStore().showAlert("success", 1);
          result = true;
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
    async sendAttachment(attach, typ, mode) {
      let result;
      await axiosInstance
        .post(
          `${mainStore().secondApi}/general/attachments`,
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
          result = res;
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
          result = false;
        });
      return result;
    },
  },
});
