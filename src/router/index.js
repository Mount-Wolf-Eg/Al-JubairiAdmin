import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth/auth";
import { storeToRefs } from "pinia";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/components/local/auth/SignIn.vue"),
      meta: {
        title: "login",
        requiresAuth: false,
      },
    },
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
      meta: {
        title: "Insights",
        requiresAuth: true,
      },
    },

    {
      path: "/hero-slider",
      name: "HeroSlider",
      component: () => import("@/components/local/hero-slider/Slider.vue"),
      meta: {
        title: "Main Slider",
        requiresAuth: true,
      },
    },
    {
      path: "/item-data/:id",
      name: "itemInfo",
      component: () => import("@/components/local/hero-slider/SliderInfo.vue"),
      meta: {
        title: "Slider Data",
        requiresAuth: true,
      },
    },

    // {
    //   path: "/clients",
    //   name: "clients",
    //   component: () => import("@/components/local/clients/Clients.vue"),
    //   meta: {
    //     title: "clients",
    //     requiresAuth: true,
    //   },
    // },
    // {
    //   path: "/partner/:id",
    //   name: "partnerData",
    //   component: () => import("@/components/local/clients/ClientInfo.vue"),
    //   meta: {
    //     title: "client",
    //     requiresAuth: true,
    //   },
    // },

    // {
    //   path: "/header-slider",
    //   name: "headerSlider",
    //   component: () =>
    //     import("@/components/local/headerSlider/HeaderSlider.vue"),
    //   meta: {
    //     title: "Header Slider",
    //     requiresAuth: true,
    //   },
    // },
    // {
    //   path: "/header-slider/:id",
    //   name: "SliderInfo",
    //   component: () =>
    //     import("@/components/local/headerSlider/HeaderSliderInfo.vue"),
    //   meta: {
    //     title: "Header SLider Info",
    //     requiresAuth: true,
    //   },
    // },

    // {
    //   path: "/about-slider",
    //   name: "aboutSlider",
    //   component: () => import("@/components/local/AboutSlider/AboutSlider.vue"),
    //   meta: {
    //     title: "About Slider",
    //     requiresAuth: true,
    //   },
    // },
    // {
    //   path: "/about-slider/:id",
    //   name: "aboutInfo",
    //   component: () =>
    //     import("@/components/local/AboutSlider/AboutSliderInfo.vue"),
    //   meta: {
    //     title: "About Us Slider Details",
    //     requiresAuth: true,
    //   },
    // },

    // {
    //   path: "/Service",
    //   name: "services",
    //   component: () => import("@/components/local/services/Services.vue"),
    //   meta: {
    //     title: "Services",
    //     requiresAuth: true,
    //   },
    // },
    // {
    //   path: "/service/:id",
    //   name: "serviceInfo",
    //   component: () => import("@/components/local/services/ServicesInfo.vue"),
    //   meta: {
    //     title: "Service Details",
    //     requiresAuth: true,
    //   },
    // },

    // {
    //   path: "/project",
    //   name: "projects",
    //   component: () => import("@/components/local/project/Project.vue"),
    //   meta: {
    //     title: "projects",
    //     requiresAuth: true,
    //   },
    // },
    // {
    //   path: "/project/:id",
    //   name: "projectInfo",
    //   component: () => import("@/components/local/project/ProjectInfo.vue"),
    //   meta: {
    //     title: "Project Details",
    //     requiresAuth: true,
    //   },
    // },

    // {
    //   path: "/products",
    //   name: "productPage",
    //   component: () => import("@/components/local/products/Product.vue"),
    //   meta: {
    //     title: "Products",
    //     requiresAuth: true,
    //   },
    // },
    // {
    //   path: "/product/:id",
    //   name: "productInfo",
    //   component: () => import("@/components/local/products/ProductInfo.vue"),
    //   meta: {
    //     title: "products Details",
    //     requiresAuth: true,
    //   },
    // },
    // {
    //   path: "/quotes/settings",
    //   name: "quotesSettings",
    //   component: () => import("@/components/local/quotes/QuotesSettings.vue"),
    //   meta: {
    //     title: "Quotes Settings",
    //     requiresAuth: true,
    //   },
    // },
    // {
    //   path: "/contact/settings",
    //   name: "contactSettings",
    //   component: () =>
    //     import("@/components/local/contact_page/ContactUsSettings.vue"),
    //   meta: {
    //     title: "Contact Settings",
    //     requiresAuth: true,
    //   },
    // },
    // {
    //   path: "/quotes",
    //   name: "quotes",
    //   component: () => import("@/components/local/quotes/Quotes.vue"),
    //   meta: {
    //     title: "Quotes",
    //     requiresAuth: true,
    //   },
    // },

    // {
    //   path: "/contactMessage/:id",
    //   name: "Quote Info",
    //   component: () => import("@/components/local/quotes/QuotesInfo.vue"),
    //   meta: {
    //     title: "Quotes Info",
    //     requiresAuth: true,
    //   },
    // },
    // {
    //   path: "/contact-us",
    //   name: "ContactPage",
    //   component: () => import("@/components/local/contact_page/ContactUs.vue"),
    //   meta: {
    //     title: "Contact",
    //     requiresAuth: true,
    //   },
    // },

    // {
    //   path: "/workProcess",
    //   name: "workProcess",
    //   component: () => import("@/components/local/settings/WorkProcess.vue"),
    //   meta: {
    //     title: "Work Process",
    //     requiresAuth: true,
    //   },
    // },
    // {
    //   path: "/Header-settings",
    //   name: "headerSettings",
    //   component: () => import("@/components/local/settings/headerSettings.vue"),
    //   meta: {
    //     title: "Header Setting",
    //     requiresAuth: true,
    //   },
    // },
    // {
    //   path: "/footer-settings",
    //   name: "FooterSettings",
    //   component: () => import("@/components/local/settings/FooterSettings.vue"),
    //   meta: {
    //     title: "Footer Setting",
    //     requiresAuth: true,
    //   },
    // },

    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/views/NotFound.vue"),
      meta: {
        title: "Not Found",
        requiresAuth: true,
      },
    },
  ],
});

router.afterEach((to, from) => {
  window.scrollTo(0, 0);
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Al Jubairi Admin Panel";
  next();
});

router.beforeEach((to, from, next) => {
  // Retrieve the cookie
  let checkToken = document.cookie
    .split(";")
    .map((cookie) => cookie.split("="))
    .reduce((acc, [key, val]) => {
      acc[key.trim()] = decodeURIComponent(val);
      return acc;
    }, {})["Admin"];

  // Check if the token exists and is valid
  let isAuthenticated = false;

  if (checkToken) {
    try {
      // Try parsing the token, if it fails, the user is not authenticated
      const parsedToken = JSON.parse(checkToken);
      isAuthenticated = parsedToken?.token ? true : false;
    } catch (e) {
      console.error("Error parsing token:", e);
    }
  }

  // Route guard logic
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (!to.meta.requiresAuth && isAuthenticated && to.path === "/login") {
    next("/");
  } else {
    next();
  }
});
export default router;
