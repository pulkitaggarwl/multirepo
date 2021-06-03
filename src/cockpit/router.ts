/*
 * DO NOT EDIT THIS FILE DIRECTLY!
 * Edits will be overwritten on build.
 *
 * Source: src/cockpit/shared/genRouter.ts
 */

import Vue from "vue";
import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/:pathMatch(.*)",
      name: "404",
      component: () => import("./views/v404.vue"),
    },
    {
      path: "/",
      name: "landing",
      component: () => import("./views/vLanding.vue"),
    },
    {
      path: "/confirm/email",
      name: "confirm/EmailIndex",
      component: () => import("./views/confirm/vIDEmail.vue"),
    },
    {
      path: "/confirm/email/:id",
      name: "confirm/Email",
      component: () => import("./views/confirm/vIDEmail.vue"),
    },
    {
      path: "/confirm/email/:id/:params",
      name: "confirm/EmailParams",
      component: () => import("./views/confirm/vIDEmail.vue"),
    },
    {
      path: "/password/reset",
      name: "password/Reset",
      component: () => import("./views/password/vReset.vue"),
    },
    {
      path: "/password/reset/:params",
      name: "password/ResetParams",
      component: () => import("./views/password/vReset.vue"),
    },
    {
      path: "/trip/view",
      name: "trip/ViewIndex",
      component: () => import("./views/trip/vIDView.vue"),
    },
    {
      path: "/trip/view/:id",
      name: "trip/View",
      component: () => import("./views/trip/vIDView.vue"),
    },
    {
      path: "/trip/view/:id/:params",
      name: "trip/ViewParams",
      component: () => import("./views/trip/vIDView.vue"),
    },
    {
      path: "/trip/new",
      name: "trip/New",
      meta: {
        confirmed: true,
      },
      component: () => import("./views/trip/vNew.vue"),
    },
    {
      path: "/trip/new/:params",
      name: "trip/NewParams",
      meta: {
        confirmed: true,
      },
      component: () => import("./views/trip/vNew.vue"),
    },
    {
      path: "/unconfirmed/email",
      name: "unconfirmed/Email",
      component: () => import("./views/unconfirmed/vEmail.vue"),
    },
    {
      path: "/unconfirmed/email/:params",
      name: "unconfirmed/EmailParams",
      component: () => import("./views/unconfirmed/vEmail.vue"),
    },
    {
      path: "/user",
      name: "UserIndex",
      component: () => import("./views/vIDUser.vue"),
    },
    {
      path: "/user/:id",
      name: "User",
      component: () => import("./views/vIDUser.vue"),
    },
    {
      path: "/user/:id/:params",
      name: "UserParams",
      component: () => import("./views/vIDUser.vue"),
    },
    {
      path: "/login",
      name: "Login",
      meta: {
        guest: true,
      },
      component: () => import("./views/vLogin.vue"),
    },
    {
      path: "/login/:params",
      name: "LoginParams",
      meta: {
        guest: true,
      },
      component: () => import("./views/vLogin.vue"),
    },
    {
      path: "/myaccount",
      name: "MyAccount",
      meta: {
        loggedIn: true,
      },
      component: () => import("./views/vMyAccount.vue"),
    },
    {
      path: "/myaccount/:params",
      name: "MyAccountParams",
      meta: {
        loggedIn: true,
      },
      component: () => import("./views/vMyAccount.vue"),
    },
    {
      path: "/ratelimited",
      name: "RateLimited",
      component: () => import("./views/vRateLimited.vue"),
    },
    {
      path: "/ratelimited/:params",
      name: "RateLimitedParams",
      component: () => import("./views/vRateLimited.vue"),
    },
    {
      path: "/refresh",
      name: "Refresh",
      component: () => import("./views/vRefresh.vue"),
    },
    {
      path: "/refresh/:params",
      name: "RefreshParams",
      component: () => import("./views/vRefresh.vue"),
    },
    {
      path: "/register",
      name: "Register",
      meta: {
        guest: true,
      },
      component: () => import("./views/vRegister.vue"),
    },
    {
      path: "/register/:params",
      name: "RegisterParams",
      meta: {
        guest: true,
      },
      component: () => import("./views/vRegister.vue"),
    },
  ],
});
