const routes = [
  {
    path: '/',
    component: () => import('pages/paginaGuia.vue')
  },
  {
    path: '/layout',
    component: () => import('../layouts/MainLayout.vue')
  },
  {
    path: '/login',
    component: () => import('../pages/paginaLogin.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
