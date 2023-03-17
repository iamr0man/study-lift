import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Course from "@/views/Course.vue";
import { getLocalAccessToken, setLocalAccessToken, signIn } from "@/api/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: '/:slug',
      name: "course",
      component: Course,
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
