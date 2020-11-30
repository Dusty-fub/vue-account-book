import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    redirect: "/money",
  },
  {
    path: "/money",
    name: "Money",
    component: () => import("../views/Money.vue"),
  },

  {
    path: "/statements",
    name: "Statements",
    component: () => import("../views/Statements.vue"),
    children: [
      {
        path: "today",
        component: () => import("@/components/Statements/TodayFlow.vue"),
      },
      {
        path: "this_week",
        component: () => import("@/components/Statements/ThisWeekFlow.vue"),
      },
      {
        path: "this_month",
        component: () => import("@/components/Statements/ThisMonthFlow.vue"),
      },
      {
        path: "this_year",
        component: () => import("@/components/Statements/ThisYearFlow.vue"),
      },
    ],
  },
  {
    path: "/statistics",
    name: "Statistics",
    component: () => import("../views/Statistics.vue"),
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
