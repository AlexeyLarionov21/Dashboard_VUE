import { createRouter, createWebHistory } from "vue-router";
import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import dataView from "../pages/dataView.vue";
import index from "../pages/index.vue";

const routes = [
  {
    path: "/",
    name: "Tikets",
    component: () => index,
  },
  {
    path: "/edit",
    name: "Edit",
    component: () => dataView,
    props: (route: RouteLocationNormalized) => ({ id: route.query.id }),

    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      if (!to.query.id) {
        next(false);
      } else {
        next();
      }
    },
  },
  // {
  //   path: "/:pathMatch(.*)*",
  //   name: "NotFound",
  //   component: () => import(""), сделать 404
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
