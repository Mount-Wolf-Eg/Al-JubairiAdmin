import "@/assets/main.scss";
import "@/assets/media-queries.scss";
import "@vueform/multiselect/themes/default.css";
import "quill/dist/quill.snow.css"; // Import the Quill snow theme CSS

import { createApp } from "vue";
import { createPinia } from "pinia";

// leaflet
import "leaflet/dist/leaflet.css";

// icon
import VueFeather from "vue-feather";
// toastification
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
// import the package
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

// chart
import VueApexCharts from "vue3-apexcharts";

// bootstrap
import "bootstrap/dist/css/bootstrap.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Toast);

app.use(VueAwesomePaginate);
// feather
app.component(VueFeather.name, VueFeather);
// charts
app.use(VueApexCharts);

import "bootstrap";

app.mount("#app");
