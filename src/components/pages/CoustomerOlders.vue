<template>
  <div class="container">
    <Loading :active.sync="isLoading"></Loading>
    <ShopCart class="mt-3" :status='status' :isLoading='isLoading' :cart='cart' :cartsNum='cartsNum'
    v-on:getcart="getCart" />
    <div class="row">
      <SiderbarShop class="col-lg-2 col-md-3 col-12" :category='category'
      v-on:changecategroy = 'changeCategory'
      />
      <div class="col row mt-2">
        <div class="col-md-6 col-lg-4 mb-4"
          v-for="(item ,key) in changeProduce"
          :key="key">
          <div class="card border-0 text-white bg-dark shadow-sm">
            <div style="height: 150px; background-size: cover; background-position: center"
              :style="{backgroundImage: `url(${item.imageUrl})`}"
              >
            </div>
            <div class="card-body">
              <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
              <h5 class="card-title">
                <a :href="`#/coustmer_olders/${item.id}`" class="text-white">{{ item.title }}</a>
              </h5>
              <p class="card-text">{{ item.content }}</p>
              <div class="d-flex justify-content-between align-items-baseline">
                <div class="h5" v-if="!item.price">現在只要 {{ item.price }} 元</div>
                <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
              </div>
            </div>
            <div class="card-footer border-white d-flex">
              <button type="button" class="btn btn-light btn-sm"
                @click="getProduct(item.id)"
              >
                <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                查看更多
              </button>
              <button type="button" class="btn btn-danger btn-sm ml-auto"
                @click="addtoCart(item.id)"
              >
                <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                加到購物車
              </button>
            </div>
          </div>
        </div>
        <Pagination :pagination= "pagination"
                v-on:changepages="getData"/>
      </div>
    </div>
  </div>
</template>

<script>
import ShopCart from './ShopCart.vue';
import SiderbarShop from '../SidebarShop.vue';
import Pagination from './Pagination.vue';

export default {
  name: 'CoustomerOlders',
  components: {
    ShopCart,
    SiderbarShop,
    Pagination,
  },
  data() {
    return {
      products: [],
      changeProduce: [],
      category: ['全部'],
      product: {},
      isLoading: false,
      status: {
        loadingItem: '',
      },
      cart: [],
      cartsNum: 0,
      pagination: {},
    };
  },
  methods: {
    getData(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.changeProduce = vm.products;
        vm.pagination = response.data.pagination;
        this.getCategory();
      });
    },
    getCategory() {
      this.products.forEach((el) => {
        if (this.category.indexOf(el.category) === -1) {
          this.category.push(el.category);
        }
      });
    },
    getProduct(id) {
      const vm = this;
      vm.status.loadingItem = id;
      vm.$router.push(`/coustmer_olders/${id}`);
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
    changeCategory(item) {
      let select = [];
      if (item === '全部') {
        select = this.products;
      }
      this.products.forEach((el) => {
        if (el.category === item) {
          select.push(el);
        }
      });
      this.changeProduce = select;
    },
  },
  created() {
    this.getData();
    this.getCart();
  },
};
</script>
