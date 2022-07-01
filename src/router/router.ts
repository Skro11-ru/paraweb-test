import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/modules/LandingPage/views/LandingPage.vue';

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/404',
    name: 'NotFoundPage',
    component: () => import('@/views/NotFoundPage.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
