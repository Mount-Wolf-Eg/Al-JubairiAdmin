import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth/auth";
import { mainStore } from "@/stores/mainStore";
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
      name: "Home",
      component: () => import("@/views/HomeView.vue"),
      meta: {
        title: "Insights",
        requiresAuth: true,
        permission: "statistics",
      },
    },

    {
      path: "/hero-slider",
      name: "HeroSlider",
      component: () =>
        import("@/components/local/home-page/hero-slider/Slider.vue"),
      meta: {
        title: "Main Slider",
        requiresAuth: true,
        permission: "slider",
      },
    },
    {
      path: "/item-data/:id",
      name: "itemInfo",
      component: () =>
        import("@/components/local/home-page/hero-slider/SliderInfo.vue"),
      meta: {
        title: "Slider Data",
        requiresAuth: true,
        permission: "slider",
      },
    },
    // {
    //   path: "/excellence",
    //   name: "Excellence",
    //   component: () =>
    //     import("@/components/local/home-page/excellence-items/Excellence.vue"),
    //   meta: {
    //     title: "Excellence",
    //     requiresAuth: true,
    //   },
    // },
    // {
    //   path: "/excellence-data/:id",
    //   name: "ExcellenceInfo",
    //   component: () =>
    //     import(
    //       "@/components/local/home-page/excellence-items/ExcellenceInfo.vue"
    //     ),
    //   meta: {
    //     title: "Excellence Data",
    //     requiresAuth: true,
    //    },
    // },
    {
      path: "/admins",
      name: "Admins",
      component: () => import("@/components/local/admin-Settings/Admins.vue"),
      meta: {
        title: "Admins",
        requiresAuth: true,
      },
    },
    {
      path: "/roles",
      name: "Roles",
      component: () => import("@/components/local/Roles-settings/Roles.vue"),
      meta: {
        title: "Admins",
        requiresAuth: true,
      },
    },

    {
      path: "/admin-data/:id",
      name: "AdminInfo",
      component: () =>
        import("@/components/local/admin-Settings/AdminInfo.vue"),
      meta: {
        title: "Admin Data",
        requiresAuth: true,
      },
    },

    {
      path: "/about-us",
      name: "AboutUs",
      component: () =>
        import("@/components/local/home-page/about-us/AboutUs.vue"),
      meta: {
        title: "About us",
        requiresAuth: true,
        permission: "more_about",
      },
    },
    {
      path: "/about-data/:id",
      name: "AboutInfo",
      component: () =>
        import("@/components/local/home-page/about-us/AboutUsInfo.vue"),
      meta: {
        title: "About Data",
        requiresAuth: true,
        permission: "more_about",
      },
    },
    // {
    //   path: "/services",
    //   name: "Services",
    //   component: () =>
    //     import("@/components/local/home-page/our-services/Services.vue"),
    //   meta: {
    //     title: "Services",
    //     requiresAuth: true,
    //   },
    // },
    // {
    //   path: "/service-data/:id",
    //   name: "ServiceInfo",
    //   component: () =>
    //     import("@/components/local/home-page/our-services/ServicesInfo.vue"),
    //   meta: {
    //     title: "Service Data",
    //     requiresAuth: true,
    //   },
    // },

    // {
    //   path: "/achievement",
    //   name: "Achievement",
    //   component: () =>
    //     import("@/components/local/home-page/our-Achievements/Achievement.vue"),
    //   meta: {
    //     title: "Achievements",
    //     requiresAuth: true,
    //   },
    // },
    // {
    //   path: "/achievement-data/:id",
    //   name: "AchieveInfo",
    //   component: () =>
    //     import(
    //       "@/components/local/home-page/our-Achievements/AchievementInfo.vue"
    //     ),
    //   meta: {
    //     title: "Acheivement Data",
    //     requiresAuth: true,
    //   },
    // },

    // {
    //   path: "/certificates",
    //   name: "Certificates",
    //   component: () =>
    //     import(
    //       "@/components/local/home-page/our-certificates/Certificates.vue"
    //     ),
    //   meta: {
    //     title: "Certificates",
    //     requiresAuth: true,
    //   },
    // },
    // {
    //   path: "/certificate-data/:id",
    //   name: "CertificateInfo",
    //   component: () =>
    //     import(
    //       "@/components/local/home-page/our-certificates/CertificateInfo.vue"
    //     ),
    //   meta: {
    //     title: "Certificate Data",
    //     requiresAuth: true,
    //   },
    // },
    // {
    //   path: "/last-news",
    //   name: "LastNews",
    //   component: () =>
    //     import("@/components/local/home-page/last-news/LastNews.vue"),
    //   meta: {
    //     title: "LastNews",
    //     requiresAuth: true,
    //   },
    // },
    // {
    //   path: "/last-news-data/:id",
    //   name: "LastNewsInfo",
    //   component: () =>
    //     import("@/components/local/home-page/last-news/NewsInfo.vue"),
    //   meta: {
    //     title: "Last News",
    //     requiresAuth: true,
    //   },
    // },

    {
      path: "/asked-questions",
      name: "AskedQuestions",
      component: () =>
        import("@/components/local/home-page/ask-questions/AskQuestion.vue"),
      meta: {
        title: "Questions",
        requiresAuth: true,
        permission: "freq_questions",
      },
    },
    {
      path: "/asked-questions-data/:id",
      name: "AskedQuestionsInfo",
      component: () =>
        import("@/components/local/home-page/ask-questions/QuestionInfo.vue"),
      meta: {
        title: "AskedQuestions Data",
        requiresAuth: true,
        permission: "freq_questions",
      },
    },

    {
      path: "/clients",
      name: "Clients",
      component: () =>
        import("@/components/local/home-page/our-clients/Clients.vue"),
      meta: {
        title: "Clients",
        requiresAuth: true,
        permission: "clients",
      },
    },
    {
      path: "/clients/:id",
      name: "ClientsInfo",
      component: () =>
        import("@/components/local/home-page/our-clients/ClientInfo.vue"),
      meta: {
        title: "Client Data",
        requiresAuth: true,
        permission: "clients",
      },
    },

    {
      path: "/service-page",
      name: "OurServicePage",
      component: () =>
        import("@/components/local/service-page/our-services/Services.vue"),
      meta: {
        title: "Services Page",
        requiresAuth: true,
        permission: "services",
      },
    },
    {
      path: "/service-page-data/:id",
      name: "ServicePageInfo",
      component: () =>
        import("@/components/local/service-page/our-services/ServicesInfo.vue"),
      meta: {
        title: "Service Page Data",
        requiresAuth: true,
        permission: "services",
      },
    },

    {
      path: "/sub-service-page",
      name: "SubServicePage",
      component: () =>
        import("@/components/local/service-page/our-sub-services/Services.vue"),
      meta: {
        title: "Sub Services",
        requiresAuth: true,
        permission: "services",
      },
    },
    {
      path: "/sub-service-data/:id",
      name: "SubServiceInfo",
      component: () =>
        import(
          "@/components/local/service-page/our-sub-services/ServicesInfo.vue"
        ),
      meta: {
        title: "Sub Service Data",
        requiresAuth: true,
        permission: "services",
      },
    },

    // about page
    {
      path: "/about-excellence",
      name: "ExcellenceAbout",
      component: () =>
        import("@/components/local/about-page/excellence-items/Excellence.vue"),
      meta: {
        title: "Excellence About",
        requiresAuth: true,
        permission: "excellence",
      },
    },
    {
      path: "/excellence-about-data/:id",
      name: "ExcellenceAboutInfo",
      component: () =>
        import(
          "@/components/local/about-page/excellence-items/ExcellenceInfo.vue"
        ),
      meta: {
        title: "Excellence About Data",
        requiresAuth: true,
        permission: "excellence",
      },
    },

    {
      path: "/about-certificates",
      name: "CertificatesAbout",
      component: () =>
        import(
          "@/components/local/about-page/our-certificates/Certificates.vue"
        ),
      meta: {
        title: "About Certificates",
        requiresAuth: true,
        permission: "certificates",
      },
    },
    {
      path: "/certificate-about-data/:id",
      name: "CertificateAboutInfo",
      component: () =>
        import(
          "@/components/local/about-page/our-certificates/CertificateInfo.vue"
        ),
      meta: {
        title: "About Certificate Data",
        requiresAuth: true,
        permission: "certificates",
      },
    },

    // {
    //   path: "/achievement-about",
    //   name: "AchievementsAbout",
    //   component: () =>
    //     import(
    //       "@/components/local/about-page/our-achievement/Achievements.vue"
    //     ),
    //   meta: {
    //     title: "Achievements About",
    //     requiresAuth: true,
    //   },
    // },
    // {
    //   path: "/achievement-about-data/:id",
    //   name: "AchieveAboutInfo",
    //   component: () =>
    //     import(
    //       "@/components/local/about-page/our-achievement/AchievementInfo.vue"
    //     ),
    //   meta: {
    //     title: "Acheivement About Data",
    //     requiresAuth: true,
    //   },
    // },
    {
      path: "/about-page",
      name: "AboutUsAbout",
      component: () =>
        import("@/components/local/about-page/about-company/About.vue"),
      meta: {
        title: "About",
        requiresAuth: true,
        permission: "more_about",
      },
    },
    {
      path: "/about-data/:id",
      name: "AboutInfoPage",
      component: () =>
        import("@/components/local/about-page/about-company/AboutInfo.vue"),
      meta: {
        title: "About Data",
        requiresAuth: true,
        permission: "more_about",
      },
    },

    // team page
    {
      path: "/team-page",
      name: "Teams",
      component: () =>
        import("@/components/local/teams-page/about-company/Team.vue"),
      meta: {
        title: "Team",
        requiresAuth: true,
        permission: "team_work",
      },
    },
    {
      path: "/team-data/:id",
      name: "TeamInfo",
      component: () =>
        import("@/components/local/teams-page/about-company/TeamInfo.vue"),
      meta: {
        title: "Team Data",
        requiresAuth: true,
        permission: "team_work",
      },
    },
    // achieve page
    {
      path: "/achievement-page",
      name: "AchievementSec",
      component: () =>
        import(
          "@/components/local/achievement-page/AchieveSec/Achievement.vue"
        ),
      meta: {
        title: "Achievements",
        requiresAuth: true,
        permission: "achievement",
      },
    },

    {
      path: "/achievement-data/:id",
      name: "AchievementSecInfo",
      component: () =>
        import(
          "@/components/local/achievement-page/AchieveSec/AchieveInfo.vue"
        ),
      meta: {
        title: "Achievement Data",
        requiresAuth: true,
        permission: "achievement",
      },
    },
    {
      path: "/sub-achievement",
      name: "AchievementSub",
      component: () =>
        import(
          "@/components/local/achievement-page/AchieveSub/Achievement.vue"
        ),
      meta: {
        title: "Sub Achievements",
        requiresAuth: true,
        permission: "achievement",
      },
    },
    {
      path: "/achievement-sub/:id",
      name: "AchievementSubInfo",
      component: () =>
        import(
          "@/components/local/achievement-page/AchieveSub/AchieveInfo.vue"
        ),
      meta: {
        title: "Achievement Sub",
        requiresAuth: true,
        permission: "achievement",
      },
    },
    {
      path: "/sectors-page",
      name: "Sectors",
      component: () =>
        import("@/components/local/achievement-page/sectorySec/Sectors.vue"),
      meta: {
        title: "Sectors",
        requiresAuth: true,
        permission: "sectors",
      },
    },
    {
      path: "/sector-data/:id",
      name: "SectorsInfo",
      component: () =>
        import("@/components/local/achievement-page/sectorySec/SectorInfo.vue"),
      meta: {
        title: "Sector Data",
        requiresAuth: true,
        permission: "sectors",
      },
    },
    {
      path: "/blogs-page",
      name: "Blogs",
      component: () =>
        import("@/components/local/blog-page/blog-section/Blog.vue"),
      meta: {
        title: "Blogs",
        requiresAuth: true,
        permission: "blogs",
      },
    },
    {
      path: "/blog-data/:id",
      name: "BlogsInfo",
      component: () =>
        import("@/components/local/blog-page/blog-section/BlogInfo.vue"),
      meta: {
        title: "Blog Data",
        requiresAuth: true,
        permission: "blogs",
      },
    },
    {
      path: "/category-page",
      name: "Category",
      component: () =>
        import("@/components/local/blog-page/blog-category/Catgory.vue"),
      meta: {
        title: "Category",
        requiresAuth: true,
        permission: "blogs",
      },
    },
    {
      path: "/Category-data/:id",
      name: "CategoryInfo",
      component: () =>
        import("@/components/local/blog-page/blog-category/CatgoryInfo.vue"),
      meta: {
        title: "Category Data",
        requiresAuth: true,
        permission: "blogs",
      },
    },
    {
      path: "/mails",
      name: "Mails",
      component: () => import("@/components/local/Mails/mails.vue"),
      meta: {
        title: "Mails",
        requiresAuth: true,
        permission: "contacts",
      },
    },

    {
      path: "/mail/:id",
      name: "MainInfo",
      component: () => import("@/components/local/Mails/MailInfo.vue"),
      meta: {
        title: "Main Info",
        requiresAuth: true,
        permission: "contacts",
      },
    },
    {
      path: "/settings",
      name: "Settings",
      component: () => import("@/components/local/web-settings/Settings.vue"),
      meta: {
        title: "Settings",
        requiresAuth: true,
        permission: "settings",
      },
    },
    {
      path: "/terms-conditions",
      name: "Terms",
      component: () =>
        import("@/components/local/Footer-items/TermsCondition.vue"),
      meta: {
        title: "Terms & Conditions",
        requiresAuth: true,
        permission: "terms",
      },
    },
    {
      path: "/complaintsuggestions",
      name: "Suggestions",
      component: () =>
        import("@/components/local/Footer-items/ComplaintSuggestions.vue"),
      meta: {
        title: "Complaints and Suggestions",
        requiresAuth: true,
        permission: "suggestions",
      },
    },
    {
      path: "/privacy-policy",
      name: "Privacy",
      component: () =>
        import("@/components/local/Footer-items/PrivacyPolicy.vue"),
      meta: {
        title: "Privacy & Policy",
        requiresAuth: true,
        permission: "privacy",
      },
    },
    // testing
    {
      path: "/pages-store",
      name: "Pages",
      component: () => import("@/components/local/pages-store/pages/Page.vue"),
      meta: {
        title: "Pages",
        requiresAuth: true,
        permission: "pages",
      },
    },
    {
      path: "/sections-store",
      name: "Sections",
      component: () =>
        import("@/components/local/pages-store/sections/sections.vue"),
      meta: {
        title: "Sections",
        requiresAuth: true,
        permission: "sections",
      },
    },
    {
      path: "/unauthorized",
      name: "Unauthorized",
      component: () => import("@/components/local/unAuth.vue"),
      meta: {
        title: "Un Authorized",
        requiresAuth: true,
      },
    },

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

// router.beforeEach(async (to, from, next) => {
//   document.title = to.meta.title || "Al Jubairi Admin Panel";
//   let userInfo;
//   let userRole;
//   let allPermissions = [];
//   // Retrieve the cookie
//   let checkToken = document.cookie
//     .split(";")
//     .map((cookie) => cookie.split("="))
//     .reduce((acc, [key, val]) => {
//       acc[key.trim()] = decodeURIComponent(val);
//       return acc;
//     }, {})["Admin"];

//   // Check if the token exists and is valid
//   let isAuthenticated = false;

//   if (checkToken) {
//     try {
//       // Try parsing the token, if it fails, the user is not authenticated
//       const parsedToken = JSON.parse(checkToken);
//       isAuthenticated = parsedToken?.token ? true : false;
//       if (isAuthenticated) {
//         if (localStorage.getItem("userInfo") != null) {
//           userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           allPermissions = userInfo?.permission;
//           userRole = userInfo?.user_type;
//         } else {
//           await useAuthStore().getUserData();
//           userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           allPermissions = userInfo?.permission;
//           userRole = userInfo?.user_type;
//         }
//       }
//     } catch (e) {
//       console.error("Error parsing token:", e);
//     }
//   }

//   if (to.meta.requiresAuth && !isAuthenticated) {
//     next("/login");
//   } else if (!to.meta.requiresAuth && isAuthenticated && to.path === "/login") {
//     next("/");
//   } else {
//     next();
//   }
// });

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || "Al Jubairi Admin Panel";

  const authStore = useAuthStore();
  let isAuthenticated = false;
  let userInfo = null;
  let allPermissions = [];
  let userRole = null;

  const adminCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("Admin="))
    ?.split("=")[1];

  if (adminCookie) {
    try {
      const parsedToken = JSON.parse(decodeURIComponent(adminCookie));
      isAuthenticated = !!parsedToken?.token;

      if (isAuthenticated) {
        if (localStorage.getItem("userInfo")) {
          userInfo = JSON.parse(localStorage.getItem("userInfo"));
        } else {
          await authStore.getUserData();
          window.location.reload();
          userInfo = JSON.parse(localStorage.getItem("userInfo"));
        }

        if (userInfo) {
          allPermissions = userInfo.permission || [];
          userRole = userInfo?.user_type || null;
        }
      }
    } catch (error) {
      console.error("Error parsing token:", error);
    }
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next("/login");
  }

  if (isAuthenticated && to.path === "/login") {
    return next("/");
  }

  if (to.meta.permission) {
    const requiredPermission = to?.meta?.permission;

    if (
      !allPermissions.includes(requiredPermission) &&
      userRole !== "super_admin"
    ) {
      mainStore().showAlert("You Are Not Authorized To Show This Page", 3);
      setTimeout(() => {
        router.go(-1);
      }, 3000);
      return next("/unauthorized");
    }
  }

  next();
});

export default router;
