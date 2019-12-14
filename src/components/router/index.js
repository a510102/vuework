import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '@/components/Dashboard.vue';
import BackPage from '@/components/BackPage.vue';
import Login from '@/components/pages/Login.vue';
import Products from '@/components/pages/Products.vue';
import Olderlist from '@/components/pages/olderList.vue';
import Voucher from '@/components/pages/voucher.vue';
import CoustomerOrders from '@/components/pages/CoustomerOlders.vue';
import CoustermersCheckout from '@/components/pages/CustomersCheckout.vue';
import CheckOut from '@/components/pages/CheckOut.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '*',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'BackPage',
      component: BackPage,
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
        {
          path: 'olderlist',
          name: 'Olderlist',
          component: Olderlist,
          meta: { requiresAuth: true },
        },
        {
          path: 'voucher',
          name: 'Voucher',
          component: Voucher,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'coustmer_olders',
          name: 'CoustmerOlders',
          component: CoustomerOrders,
        },
        {
          path: 'coustmer_check',
          name: 'CheckOut',
          component: CheckOut,
        },
        {
          path: 'coustmer_checkout/:orderId',
          name: 'CoustermersCheckout',
          component: CoustermersCheckout,
        },
      ],
    },
  ],
});
