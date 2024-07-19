import { createRouter, createWebHistory } from 'vue-router';

export enum RouteNames {
  home = 'home',
  project = 'project',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteNames.home,
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: 'project/:projectId',
          name: RouteNames.project,
          component: () => import('@/pages/ProjectPage.vue'),
          props: true,
        },
      ],
    },
  ],
});

export default router;
