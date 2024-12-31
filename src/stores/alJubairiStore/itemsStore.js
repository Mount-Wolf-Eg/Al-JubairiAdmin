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
    pagination: [],
  }),

  actions: {
    // get all items
    async getItems(filter, secName, pageName, num, isParent, paginate) {
      let loading = true;

      await axiosInstance
        .get(
          `${mainStore().mainApi}/items?keyword=${filter ?? ""}&paginate=${
            paginate == undefined ? 0 : paginate
          }&filters[section.type]=${
            secName ? secName : ""
          }&filters[section.pages.type]=${pageName ? pageName : ""}&page=${
            num ? num : ""
          }&isParent=${isParent ?? true}`,
          {
            headers: {
              Authorization: `Bearer ${
                this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
              }`,
            },
          }
        )
        .then((res) => {
          this.allItems = res.data.data || [];
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
        .post(`${mainStore().mainApi}/items`, data, {
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
        .post(`${mainStore().mainApi}/items/${id}`, data, {
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
        .delete(`${mainStore().mainApi}/items/${itemId}`, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          mainStore().showAlert("Item deleted successfully", 1);

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
          `${mainStore().mainApi}/items/${itemId}/toggle-active`,
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
