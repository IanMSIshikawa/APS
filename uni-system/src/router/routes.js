const routes = [
  {
    path: '/',
    component: () => import('pages/paginaLogin.vue')
  },
  {
    path: '/guia/:id',
    name: 'Guia',
    props: true,
    component: () => import('../pages/paginaGuia.vue')
  },
  {
    path: '/estudante/:id',
    name: 'Estudante',
    props: true,
    component: () => import('../pages/students/Students.vue')
  },
  {
    path: '/professor/:id',
    name: 'Professor',
    props: true,
    component: () => import('../pages/professor/Professor.vue')
  },
  {
    path: '/disciplinas/:id',
    name: 'Disciplina',
    props: true,
    component: () => import('../pages/disciplina/Disciplina.vue')
  },
  {
    path: '/estudanteId',
    component: () => import('../pages/students/StudentDetails.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
