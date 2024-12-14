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
    {
      path: "/excellence",
      name: "Excellence",
      component: () =>
        import("@/components/local/excellence-items/Excellence.vue"),
      meta: {
        title: "Excellence",
        requiresAuth: true,
      },
    },
    {
      path: "/excellence-data/:id",
      name: "ExcellenceInfo",
      component: () =>
        import("@/components/local/excellence-items/ExcellenceInfo.vue"),
      meta: {
        title: "Excellence Data",
        requiresAuth: true,
      },
    },
    {
      path: "/about-us",
      name: "AboutUs",
      component: () => import("@/components/local/about-us/AboutUs.vue"),
      meta: {
        title: "About us",
        requiresAuth: true,
      },
    },
    {
      path: "/about-data/:id",
      name: "AboutInfo",
      component: () => import("@/components/local/about-us/AboutUsInfo.vue"),
      meta: {
        title: "About Data",
        requiresAuth: true,
      },
    },
    {
      path: "/services",
      name: "Services",
      component: () => import("@/components/local/our-services/Services.vue"),
      meta: {
        title: "Services",
        requiresAuth: true,
      },
    },
    {
      path: "/service-data/:id",
      name: "ServiceInfo",
      component: () =>
        import("@/components/local/our-services/ServicesInfo.vue"),
      meta: {
        title: "Service Data",
        requiresAuth: true,
      },
    },

    {
      path: "/achievement",
      name: "Achievement",
      component: () =>
        import("@/components/local/our-Achievements/Achievement.vue"),
      meta: {
        title: "Achievements",
        requiresAuth: true,
      },
    },
    {
      path: "/achievement-data/:id",
      name: "AchieveInfo",
      component: () =>
        import("@/components/local/our-Achievements/AchievementInfo.vue"),
      meta: {
        title: "Acheivement Data",
        requiresAuth: true,
      },
    },

    {
      path: "/ertificates",
      name: "Certificates",
      component: () =>
        import("@/components/local/our-certificates/Certificates.vue"),
      meta: {
        title: "Certificates",
        requiresAuth: true,
      },
    },
    {
      path: "/certificate-data/:id",
      name: "CertificateInfo",
      component: () =>
        import("@/components/local/our-certificates/CertificateInfo.vue"),
      meta: {
        title: "Certificate Data",
        requiresAuth: true,
      },
    },
    {
      path: "/last-news",
      name: "LastNews",
      component: () => import("@/components/local/last-news/LastNews.vue"),
      meta: {
        title: "LastNews",
        requiresAuth: true,
      },
    },
    {
      path: "/last-news-data/:id",
      name: "LastNewsInfo",
      component: () => import("@/components/local/last-news/NewsInfo.vue"),
      meta: {
        title: "Asked Questions",
        requiresAuth: true,
      },
    },

    {
      path: "/asked-questions",
      name: "AskedQuestions",
      component: () =>
        import("@/components/local/ask-questions/AskQuestion.vue"),
      meta: {
        title: "LastNews",
        requiresAuth: true,
      },
    },
    {
      path: "/asked-questions-data/:id",
      name: "AskedQuestionsInfo",
      component: () =>
        import("@/components/local/ask-questions/QuestionInfo.vue"),
      meta: {
        title: "AskedQuestions Data",
        requiresAuth: true,
      },
    },

    {
      path: "/clients",
      name: "Clients",
      component: () => import("@/components/local/our-clients/Clients.vue"),
      meta: {
        title: "Clients",
        requiresAuth: true,
      },
    },
    {
      path: "/clients/:id",
      name: "ClientsInfo",
      component: () => import("@/components/local/our-clients/ClientInfo.vue"),
      meta: {
        title: "Client Data",
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
