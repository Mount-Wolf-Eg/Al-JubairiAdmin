import { defineStore } from "pinia";
import { mainStore } from "../mainStore";
import axiosInstance from "../axios_instance";

export const sliderStore = defineStore("sliders", {
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
    allSliders: [],
    singleSlide: [],
    serviceLeft: [],
    serviceRight: [],
    serviceBottom: [],
    aboutSlider: [],
    allClients: [],

    // test
    suspendedSliders: [],
    slider: [],
    headerSlider: [],
    ourValues: [],
    testimonialSlider: [],
    successMetrics: [],
    achievementsSliders: [],
    partnerSliders: [],
    mainResources: [],
  }),

  actions: {
    // all sliders
    async getAllSliders() {
      await axiosInstance
        .get(`${mainStore().mainApi}/admin/slider/all`, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          this.allSliders = res.data.data;
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

    // all sliders by type
    async getAllSlidersTypes() {
      await axiosInstance
        .get(`${mainStore().mainApi}/admin/slider/showSlidersTypes`, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          this.headerSlider = res.data.data.header_slider;
          this.serviceLeft = res.data.data.services_left;
          this.serviceRight = res.data.data.services_right;
          this.serviceBottom = res.data.data.services_bottom;
          this.allClients = res.data.data.clients;
          // test
          this.aboutSlider = res.data.data.about_slider;
          this.testimonialSlider = res.data.data.testimonials;
          this.successMetrics = res.data.data.success_metrics;
          this.achievementsSliders = res.data.data.achievements;
          this.partnerSliders = res.data.data.partners;
          this.mainResources = res.data.data.main_resources;
          this.ourValues = res.data.data.our_values;
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

    // get slider by type
    async getSingleSliderType(type) {
      await axiosInstance
        .get(`${mainStore().mainApi}/admin/slider/show?slider_type=${type}`, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          this.slider = res.data.data;
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
    // suspended slider
    async getSuspendedSliders() {
      await axiosInstance
        .get(`${mainStore().mainApi}/admin/slider/trashed`, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          this.suspendedSliders = res.data.data;
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

    // sliders
    async getSlide(id) {
      let result;
      await axiosInstance
        .post(`${mainStore().mainApi}/admin/slider/one`, id, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
            flag: "all",
          },
        })
        .then((res) => {
          this.singleSlide = res.data.data;
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
    // destroy slider
    async destroySlider(id) {
      let result;
      await axiosInstance
        .post(`${mainStore().mainApi}/admin/slider/destroy`, id, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          result = res;
          mainStore().showAlert("item suspended suuccessfully", 1);
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
    // restore slider
    async restoreSlider(id, type) {
      let result;
      await axiosInstance
        .post(`${mainStore().mainApi}/admin/slider/restore`, id, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          result = res;
          this.getAllSliders();
          this.getSingleSliderType(type);
          mainStore().showAlert("item restored suuccessfully", 1);
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

    // add slider
    async addslider(data, type) {
      let result;
      await axiosInstance
        .post(`${mainStore().mainApi}/admin/slider/store`, data, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          result = res;
          mainStore().showAlert("item created suuccessfully", 1);
          this.getAllSliders();
          this.getSingleSliderType(type);
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

    // update slider
    async updateSlider(data, type) {
      let result;
      await axiosInstance
        .post(`${mainStore().mainApi}/admin/slider/update`, data, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          result = res;
          mainStore().showAlert("item updated suuccessfully", 1);
          this.getAllSliders();
          this.getSingleSliderType(type);
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
    // delete slider
    async deleteSlider(data) {
      let result;
      await axiosInstance
        .post(`${mainStore().mainApi}/admin/slider/forceDelete`, data, {
          headers: {
            Authorization: `Bearer ${
              this.checkToken ? JSON.parse(this.checkToken)["token"] : ""
            }`,
          },
        })
        .then((res) => {
          result = res;
          mainStore().showAlert("item deleted suuccessfully", 1);
          this.getAllSliders();
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
