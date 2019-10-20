import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '@/components/Dashboard.vue';
import Login from '@/components/pages/Login.vue';
import Products from '@/components/pages/Products.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '*',
      redirect: '/login',
    },
    // {
    //   // path: '/',
    //   // name: 'HelloWorld',
    //   // component: HelloWorld,
    //   // meta: { requiresAuth: true },
    // },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});
