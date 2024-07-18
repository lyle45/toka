import { createRouter, createWebHistory } from 'vue-router';

export enum RouteNames {
  home = 'home',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import('@/layouts/MainLayout.vue'),
    },
  ],
});

export default router;
