
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/user/register', component: () => import('pages/user/Register.vue')},
      { path: '/user/login', component: () => import('pages/user/Login.vue')},
      { path: '/database/:id', component: () => import('pages/database/Database.vue')},
      { path: '/remote/manage', component: () => import('pages/RemoteData.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
