import { defineStore } from "pinia";
import { mainStore } from "../mainStore";
import axiosInstance from "../axios_instance";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    authUser: [],
    isLoggedin: false,
    rememberM: false,
  }),
  getters: {
    userData: (state) => {
      let checkToken = document.cookie
        .split(";")
        .map((cooki) => cooki.split("="))
        .reduce(
          (acc, [key, val]) => ({
            ...acc,
            [key.trim()]: decodeURIComponent(val),
          }),
          {}
        )["Admin"];
      if (checkToken) {
        if (
          localStorage.getItem("userInfo") &&
          localStorage.getItem("userInfo") == "null" &&
          localStorage.getItem("userInfo") == "undefined"
        ) {
          state.authUser = JSON.parse(localStorage.getItem("userInfo"));
          state.isLoggedin = true;
          state.getUserData();
        } else {
          localStorage.removeItem("userInfo");
          state.removeData();
          state.getUserData();
        }
      }
    },
  },

  actions: {
    setStauts(stat) {
      localStorage.setItem("loggedin", stat);
    },
    // set cookie
    setCookie(value, timeout) {
      let expire = "";
      if (timeout) {
        let date = new Date();
        date.setTime(date.getTime() + timeout);
        expire = "; expires=" + date.toUTCString() + `;path=/`;
      } else {
        expire = "";
      }
      document.cookie = "Admin" + "=" + JSON.stringify(value) + expire;
    },
    setUserStorage(val) {
      localStorage.setItem("userInfo", JSON.stringify(val));
    },

    async doLogin(creds) {
      let result;
      this.isLoggedin = false;
      let expireAfter;
      await axiosInstance
        .post(`${mainStore().mainApi}/login`, creds)
        .then((res) => {
          result = res;
          this.authUser = res.data.data;
          this.setUserStorage(this.authUser);

          if (this.rememberM) {
            // expireAfter = res.data.data.expires_in * 1000;
            expireAfter = "";
          } else {
            expireAfter = 0;
          }

          if (res.data.data.expires_in) {
            if (res.data.data.expires_in > 0) {
              this.setCookie(
                {
                  logger: res.data.data.id,
                  token: res.data.data.token,
                },
                expireAfter
              );
              this.isLoggedin = true;
              this.setStauts(true);
            } else {
              this.isLoggedin = false;
              this.setStauts(false);
            }
          } else {
            this.setCookie(
              {
                logger: res.data.data.id,
                token: res.data.data.token,
              },
              expireAfter
            );
            this.isLoggedin = true;
            this.setStauts(true);
          }
        })
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

          this.isLoggedin = false;
          this.setStauts(false);
          result = false;
        });
      return result;
    },
    // async doRegister(creds) {
    //   let result;
    //   let isLoggedin = false;
    //   let expireAfter;
    //   await axiosInstance
    //     .post(`${mainStore().mainApi}/register`, creds)
    //     .then((res) => {
    //       result = res;
    //       this.authUser = res.data.data.User;
    //       this.setUserStorage(this.authUser);
    //       expireAfter = res.data.data.expires_in * 1000;

    //       if (res.data.data.expires_in) {
    //         if (res.data.data.expires_in) {
    //           this.setCookie(
    //             {
    //               logger: res.data.data.User.id,
    //               token: res.data.data.access_token,
    //             },
    //             expireAfter
    //           );
    //           this.isLoggedin = true;
    //           this.setUserStorage(true);
    //         } else {
    //           this.isLoggedin = false;
    //           this.setUserStorage(false);
    //         }
    //       } else {
    //         this.setCookie(
    //           {
    //             logger: res.data.data.User.id,
    //             token: res.data.data.access_token,
    //           },
    //           60 * 60 * 1000 * 1
    //         );
    //         this.isLoggedin = true;
    //         this.setUserStorage(true);
    //       }
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
    //       this.isLoggedin = false;
    //       this.setUserStorage(false);
    //       result = false;
    //     });
    //   return result;
    // },
    async getUserData() {
      let token = null;
      let checkToken = document.cookie
        .split(";")
        .map((cooki) => cooki.split("="))
        .reduce(
          (acc, [key, val]) => ({
            ...acc,
            [key.trim()]: decodeURIComponent(val),
          }),
          {}
        )["Admin"];

      if (checkToken) {
        try {
          const parseToken = JSON.parse(checkToken);
          token = parseToken.token || null;
        } catch (e) {
          console.error("Failed to parse JSON from cookie:", e);
        }
      }

      await axiosInstance
        .get(`${mainStore().mainApi}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          this.authUser = res.data.data;
          this.setUserStorage(this.authUser);
          this.isLoggedin = true;
          this.setStauts(true);
        })
        .catch((err) => {
          let errorMessage = "Something went wrong, please try again";

          if (err.response && err.response.data && err.response.data.message) {
            const errorArray = Object.values(err.response.data.message);
            if (errorArray.length > 0 && errorArray[0][0]) {
              errorMessage = errorArray[0][0];
            }
          }
          if (!checkToken) {
            mainStore().showAlert(errorMessage, 2);
          }
          this.authUser = [];
          this.isLoggedin = false;
          this.setStauts(false);
          this.logOut;
        });
    },

    async logOut() {
      let result;
      let token = null;
      let checkToken = document.cookie
        .split(";")
        .map((coki) => coki.split("="))
        .reduce(
          (acc, [key, val]) => ({
            ...acc,
            [key.trim()]: decodeURIComponent(val),
          }),
          {}
        )["Admin"];

      if (checkToken) {
        token = JSON.parse(checkToken)["token"];
      } else {
        token = null;
      }
      await axiosInstance
        .post(
          `${mainStore().mainApi}/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          result = res;
          this.setCookie({}, 0);
          this.isLoggedin = false;
          this.setStauts(false);
          this.authUser = [];
          localStorage.removeItem("userInfo");
          window.location.reload();
        })
        .catch((err) => {
          result = false;
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
      return result;
    },
    removeData() {
      this.setCookie({}, 0);
      this.isLoggedin = false;
      this.setStauts(false);
      this.authUser = [];
      localStorage.removeItem("userInfo");
    },
  },
});
