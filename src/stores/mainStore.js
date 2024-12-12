import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

const mainDomain = "https://aljubairi.diaamagdi.com/api/dashboard/admin";
const secondDomain = "https://aljubairi.diaamagdi.com/api";

export const mainStore = defineStore("mainStore", {
  state: () => ({
    mainApi: mainDomain,
    secondApi: secondDomain,
    toast: useToast(),
    toastMsg: null,
    toastTyp: null,
  }),
  actions: {
    showAlert(msg, typ) {
      if (this.toastMsg) {
        this.toastMsg = null;
      }
      if (this.toastTyp) {
        this.toastTyp = null;
      }
      setTimeout(() => {
        this.toastMsg = msg;
        this.toastTyp = typ;

        this.toastTyp == 1
          ? this.toast.success(this.toastMsg, {
              position: "top-right",
            })
          : this.toastTyp == 2
          ? this.toast.error(this.toastMsg, {
              position: "top-right",
            })
          : this.toastTyp == 3
          ? this.toast.warning(this.toastMsg, {
              position: "top-right",
            })
          : "";
      }, 100);
    },
    resetAlert() {
      this.toastMsg = "";
      this.toastTyp = "";
    },
  },
});
