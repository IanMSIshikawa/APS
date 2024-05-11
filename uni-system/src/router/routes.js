const routes = [
  {
    path: '/',
    component: () => import('pages/paginaGuia.vue')
  },
  {
    path: '/login',
    component: () => import('../pages/paginaLogin.vue')
  },
  {
    path: '/estudante',
    component: () => import('../pages/paginaLogin.vue')
  },
  {
    path: '/professor',
    component: () => import('../pages/paginaLogin.vue')
  },
  {
    path: '/disciplinas',
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
