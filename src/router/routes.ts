import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('pages/Index.vue')
      },
      {
        path: 'favoritos',
        name: 'Favorites',
        component: () => import('pages/Favorites.vue')
      },
      {
        path: 'categorias',
        name: 'Categories',
        component: () => import('pages/Categories.vue')
      },
      {
        path: 'sobre',
        name: 'About',
        component: () => import('pages/About.vue')
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
];

export default routes;
