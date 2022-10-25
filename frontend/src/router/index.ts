import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("@/views/index.vue"),
      children: [
        {
          path: "/",
          name: "index",
          component: () => import("@/views/index/index.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/views/signup.vue"),
    },
  ],
});

export default router;
