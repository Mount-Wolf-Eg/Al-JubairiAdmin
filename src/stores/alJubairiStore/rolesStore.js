import { defineStore } from "pinia";
import { mainStore } from "../mainStore";
import axiosInstance from "../axios_instance";

export const useRolesStore = defineStore("rolesStore", {
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
    allPermissions: [],
    allRoles: [],
  }),

  actions: {
    async getAllPermissions() {
      let loading;

      await axiosInstance
        .get(`${mainStore().mainApi}/permission_not_paginated`, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          this.allPermissions = res.data.data;
          loading = true;
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
          loading = false;
          mainStore().showAlert(errorMessage, 2);
        })
        .finally(() => {
          return loading;
        });
    },
    async getAllRoles() {
      let loading;

      await axiosInstance
        .get(`${mainStore().mainApi}/role_not_paginated`, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          this.allRoles = res.data.data;
          loading = true;
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
          loading = false;
          mainStore().showAlert(errorMessage, 2);
        })
        .finally(() => {
          return loading;
        });
    },
  },
});
