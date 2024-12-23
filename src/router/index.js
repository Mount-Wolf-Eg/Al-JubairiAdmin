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
      name: "Home",
      component: () => import("@/views/HomeView.vue"),
      meta: {
        title: "Insights",
        requiresAuth: true,
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
      },
    },
    {
      path: "/excellence",
      name: "Excellence",
      component: () =>
        import("@/components/local/home-page/excellence-items/Excellence.vue"),
      meta: {
        title: "Excellence",
        requiresAuth: true,
      },
    },
    {
      path: "/excellence-data/:id",
      name: "ExcellenceInfo",
      component: () =>
        import(
          "@/components/local/home-page/excellence-items/ExcellenceInfo.vue"
        ),
      meta: {
        title: "Excellence Data",
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
      },
    },
    {
      path: "/services",
      name: "Services",
      component: () =>
        import("@/components/local/home-page/our-services/Services.vue"),
      meta: {
        title: "Services",
        requiresAuth: true,
      },
    },
    {
      path: "/service-data/:id",
      name: "ServiceInfo",
      component: () =>
        import("@/components/local/home-page/our-services/ServicesInfo.vue"),
      meta: {
        title: "Service Data",
        requiresAuth: true,
      },
    },

    {
      path: "/achievement",
      name: "Achievement",
      component: () =>
        import("@/components/local/home-page/our-Achievements/Achievement.vue"),
      meta: {
        title: "Achievements",
        requiresAuth: true,
      },
    },
    {
      path: "/achievement-data/:id",
      name: "AchieveInfo",
      component: () =>
        import(
          "@/components/local/home-page/our-Achievements/AchievementInfo.vue"
        ),
      meta: {
        title: "Acheivement Data",
        requiresAuth: true,
      },
    },

    {
      path: "/ertificates",
      name: "Certificates",
      component: () =>
        import(
          "@/components/local/home-page/our-certificates/Certificates.vue"
        ),
      meta: {
        title: "Certificates",
        requiresAuth: true,
      },
    },
    {
      path: "/certificate-data/:id",
      name: "CertificateInfo",
      component: () =>
        import(
          "@/components/local/home-page/our-certificates/CertificateInfo.vue"
        ),
      meta: {
        title: "Certificate Data",
        requiresAuth: true,
      },
    },
    {
      path: "/last-news",
      name: "LastNews",
      component: () =>
        import("@/components/local/home-page/last-news/LastNews.vue"),
      meta: {
        title: "LastNews",
        requiresAuth: true,
      },
    },
    {
      path: "/last-news-data/:id",
      name: "LastNewsInfo",
      component: () =>
        import("@/components/local/home-page/last-news/NewsInfo.vue"),
      meta: {
        title: "Asked Questions",
        requiresAuth: true,
      },
    },

    {
      path: "/asked-questions",
      name: "AskedQuestions",
      component: () =>
        import("@/components/local/home-page/ask-questions/AskQuestion.vue"),
      meta: {
        title: "Questions",
        requiresAuth: true,
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
      },
    },
    // our-services page

    {
      path: "/service-page",
      name: "OurServicePage",
      component: () =>
        import("@/components/local/service-page/our-services/Services.vue"),
      meta: {
        title: "Services Page",
        requiresAuth: true,
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
      },
    },

    // about page
    {
      path: "/about-excellence",
      name: "ExcellenceAbout",
      component: () =>
        import(
          "@/components/local//about-page/excellence-items/Excellence.vue"
        ),
      meta: {
        title: "Excellence About",
        requiresAuth: true,
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
      },
    },

    {
      path: "/achievement-about",
      name: "AchievementsAbout",
      component: () =>
        import(
          "@/components/local/about-page/our-achievement/Achievements.vue"
        ),
      meta: {
        title: "Achievements About",
        requiresAuth: true,
      },
    },
    {
      path: "/achievement-about-data/:id",
      name: "AchieveAboutInfo",
      component: () =>
        import(
          "@/components/local/about-page/our-achievement/AchievementInfo.vue"
        ),
      meta: {
        title: "Acheivement About Data",
        requiresAuth: true,
      },
    },
    {
      path: "/about-page",
      name: "AboutUsAbout",
      component: () =>
        import("@/components/local/about-page/about-company/About.vue"),
      meta: {
        title: "About",
        requiresAuth: true,
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
      },
    },
    {
      path: "/settings",
      name: "Settings",
      component: () => import("@/components/local/web-settings/Settings.vue"),
      meta: {
        title: "Settings",
        requiresAuth: true,
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
