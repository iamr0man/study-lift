import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { getLocalAccessToken, setLocalAccessToken, signIn } from "../utils/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      // path: "/about",
      // name: "about",
      // // route level code-splitting
      // // this generates a separate chunk (About.[hash].js) for this route
      // // which is lazy-loaded when the route is visited.
      // component: () => import("../views/AboutView.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const loggedIn = getLocalAccessToken()

  if (!loggedIn) {
    const token = await signIn()
    setLocalAccessToken(token)
  }
  next();
})

export default router;
