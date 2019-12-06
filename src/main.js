/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VeeValidate, { Validator } from 'vee-validate';
import 'bootstrap';
// eslint-disable-next-line no-unused-vars
import tw from 'vee-validate/dist/locale/zh_TW';
import App from './App.vue';
import router from './components/router';
import './bus';
import currencyFilter from './components/filters/currency';
import dateFilter from './components/filters/date';


Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VeeValidate);

Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);

Validator.localize('tw', tw);


axios.defaults.withCredentials = true;
new Vue({
  render: h => h(App),
  router,
}).$mount('#app');

router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next);
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_API}api/user/check`;
    axios.post(api).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});
