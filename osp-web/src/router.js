import Vue from "vue";
import VueRouter from "vue-router";

import Admin from "./components/pages/Admin";
import Home from "./components/pages/Home";
import SurveyEditor from "./components/pages/SurveyEditor";
import SurveyForm from "./components/pages/SurveyForm";

import store from "./store";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", name: "home", component: Home },
  { path: "/survey", name: "survey-form", component: SurveyForm },
  { path: "/admin", name: "admin", component: Admin },
  { path: "/admin/survey", name: "survey-editor", component: SurveyEditor },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  
  
  if (to.name=='survey-form' && store.getters.token.length == 0) {
    return next({
      name: "home",
    });
  }

  next();
});

export default router;
