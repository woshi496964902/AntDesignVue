import Vue from "vue";
import VueRouter from "vue-router";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import NotFound from "../views/404.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayout.vue"),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/User/Login.vue")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/User/Register.vue")
      }
    ]
  },
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "about" */ "../layouts/BasicLayout.vue"),
    children: [
      //dashhoard 仪表盘
      {
        path: "/",
        redirect: "/dashhoard/analysis"
      },
      {
        path: "/dashhoard",
        name: "dashhoard",
        meta: {
          icon: "radar-chart",
          title: "仪表盘"
        },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashhoard/analysis",
            name: "analysis",
            meta: {
              title: "分析页"
            },
            component: () =>
              import(
                /* webpackChunkName: "about" */ "../views/Dashhoard/Analysis.vue"
              )
          }
        ]
      },
      //form
      {
        path: "/form",
        name: "form",
        meta: {
          icon: "form",
          title: "表单"
        },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/form",
            redirect: "/form/basic-form"
          },
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: {
              title: "基础表单"
            },
            component: () =>
              import(
                /* webpackChunkName: "about" */ "../views/Forms/BasicForm.vue"
              )
          },
          {
            path: "/form/step-form",
            name: "stepform",
            meta: {
              title: "分布表单"
            },
            hideChildrenMenu: true,
            component: () =>
              import(/* webpackChunkName: "about" */ "../views/Forms/StepForm"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () =>
                  import(
                    /* webpackChunkName: "about" */ "../views/Forms/StepForm/info.vue"
                  )
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () =>
                  import(
                    /* webpackChunkName: "about" */ "../views/Forms/StepForm/confirm.vue"
                  )
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () =>
                  import(
                    /* webpackChunkName: "about" */ "../views/Forms/StepForm/result.vue"
                  )
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    Nprogress.start();
  }
  next();
});

router.afterEach(() => {
  Nprogress.done();
});

export default router;
