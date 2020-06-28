/*
 * DO MOT EDIT THIS FILE DIRECTLY!
 * Edits will be overwritten on build.
 *
 * Source: src/cockpit/shared/genRouter.ts
 */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('./views/VLanding.vue'),
    }, {
      path: '*',
      name: '404',
      component: () => import('./views/V404.vue'),
    }, {
      path: '/about',
      name: 'About',
      component: () => import('./views/VAbout.vue'),
    }, {
      path: '/login',
      name: 'Login',
      component: () => import('./views/VLogin.vue'),
    }, {
      path: '/register',
      name: 'Register',
      component: () => import('./views/VRegister.vue'),
    }, {
      path: '/trip/view',
      name: 'trip/GetViewIndex',
      component: () => import('./views/trip/VGetView.vue'),
    }, {
      path: '/trip/view/:id',
      name: 'trip/GetView',
      component: () => import('./views/trip/VGetView.vue'),
    }, {
      path: '/trip/new',
      name: 'trip/New',
      component: () => import('./views/trip/VNew.vue'),
    },
  ],
});
