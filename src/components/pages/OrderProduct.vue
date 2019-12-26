<template>
  <div class="container mt-3">
    <Loading :active.sync="isLoading"></Loading>
    <div class="d-flex justify-content-between">
      <Breadcrumb />
      <ShopCart :status='status' :isLoading='isLoading' :cart='cart' :cartsNum='cartsNum'
      v-on:getcart="getCart" />
    </div>
    <div class="card text-white bg-dark mb-3 mt-3">
      <img :src="product.image" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">{{ product.title }}</h5>
        <p class="card-text">{{ product.content }}</p>
        <p class="card-text">{{ product.description }}</p>
        <div class="d-flex justify-content-between align-items-baseline">
          <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
          <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
          <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
        </div>
        <select name="" class="form-control mt-3" v-model="product.num">
          <option :value="num" v-for="num in 10" :key="num">
            選購 {{num}} {{product.unit}}
          </option>
        </select>
        <div class="card-footer">
          <div class="text-nowrap mr-3 text-light" v-show="product.num">
            小計 <strong>{{ product.num * product.price }}</strong> 元
          </div>
        </div>
        <button type="button" class="btn btn-light float-right mt-2"
          @click="addtoCart(product.id, product.num)">
          <i class="fas fa-spinner fa-spin"
            v-if="product.id === status.loadingItem"
            @click="addtoCart(item.id)"
            ></i>
          加到購物車
        </button>
      </div>
    </div>
    <div class="row justify-content-md-end px-3">
        <button type="button" class="btn btn-dark mt-2 col-4"
          @click="goBack">
          回上一頁
        </button>
      </div>
  </div>
</template>

<script>
import ShopCart from './ShopCart.vue';
import Breadcrumb from '../Breadcrumb.vue';

export default {
  components: {
    ShopCart,
    Breadcrumb,
  },
  data() {
    return {
      id: '',
      product: {},
      cart: [],
      cartsNum: 0,
      status: {
        loadingItem: '',
      },
      isLoading: false,
    };
  },
  methods: {
    getId() {
      this.id = this.$route.params.id;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/product/${this.id}`;
      const vm = this;
      // vm.status.loadingItem = id;
      this.$http.get(api).then((response) => {
        vm.product = response.data.product;
        console.log(vm.product);
        // vm.status.loadingItem = '';
      });
    },
    addtoCart(id, qty = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      vm.status.loadingItem = id;
      vm.isLoading = true;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(api, { data: cart }).then((response) => {
        if (response.data.success) {
          vm.isLoading = false;
          vm.getCart();
          vm.status.loadingItem = '';
          // $('#productModal').modal('hide');
        }
      });
    },
    getCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.isLoading = false;
        vm.cart = response.data.data;
        vm.cartsNum = vm.cart.carts.length;
        vm.status.loadingItem = '';
      });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  created() {
    this.getId();
    this.getCart();
    console.log(this.$route);
  },
};
</script>
