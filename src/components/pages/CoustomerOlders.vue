<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4"
        v-for="(item ,key) in products"
        :key="key">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}"
            >
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h5">2,800 元</div> -->
              <div class="h5" v-if="!item.price">現在只要 {{ item.price }} 元</div>
              <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
              @click="addtoCart(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.image" class="img-fluid" alt="">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
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
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button type="button" class="btn btn-primary"
              @click="addtoCart(product.id, product.num)">
              <i class="fas fa-spinner fa-spin"
                v-if="product.id === status.loadingItem"
                @click="addtoCart(item.id)"
                ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="my-5 row justify-content-center">
      <div class="my-5 row justify-content-center">
        <table class="table">
          <thead>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td class="align-middle">
                <button type="button" class="btn btn-outline-danger btn-sm"
                  @click="deleteCart(item.id)"
                >
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td class="align-middle">
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">
                  已套用優惠券
                </div>
              </td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">總計</td>
              <td class="text-right">{{ cart.total }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">{{ cart.final_total }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group mb-3 input-group-sm">
          <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="addCouponCode"
            >
              套用優惠碼
            </button>
          </div>
        </div>
        <form class="col-md-6" @submit.prevent="createOrder">
          <div class="form-group">
            <label for="useremail">Email</label>
            <input type="email" class="form-control" name="email" id="useremail"
              v-validate="'required|email'" :class="{'is-invalid': errors.has('email')}"
              v-model="form.user.email" placeholder="請輸入 Email">
            <span class="text-danger">{{ errors.first('email') }}</span>
          </div>
          <div class="form-group">
            <label for="username">收件人姓名</label>
            <input v-validate="'required'" type="text" class="form-control"
              name="name" id="username" :class="{'is-invalid': errors.has('name')}"
              v-model="form.user.name" placeholder="輸入姓名">
            <span class="text-danger" v-if="errors.has('name')" >姓名必須填寫</span>
          </div>
          <div class="form-group">
            <label for="usertel">收件人電話</label>
              <input type="tel" class="form-control" id=""
              name="phone"
              v-validate="'required|numeric'" :class="{'is-invalid': errors.has('phone')}"
              v-model="form.user.tel" placeholder="請輸入電話">
              <span class="text-danger">{{ errors.first('phone') }}</span>
          </div>
          <div class="form-group">
            <label for="useraddress">收件人地址</label>
            <input type="text" class="form-control" name="address"
            v-validate="'required'" :class="{'is-invalid': errors.has('address')}"
            id="useraddress" v-model="form.user.address"
              placeholder="請輸入地址">
            <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
          </div>
          <div class="form-group">
            <label for="comment">留言</label>
            <textarea name="" id="comment" class="form-control" cols="30"
            rows="10" v-model="form.message"></textarea>
          </div>
          <div class="text-right">
            <button class="btn btn-danger">送出訂單</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import $ from 'jquery';

Vue.component('Loading', Loading);

export default {
  name: 'CoustomerOlders',
  data() {
    return {
      products: [],
      product: {},
      isLoading: false,
      status: {
        loadingItem: '',
      },
      cart: [],
      coupon_code: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    getData() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/products`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response);
        vm.isLoading = false;
        vm.products = response.data.products;
      });
    },
    getProduct(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      const vm = this;
      vm.status.loadingItem = id;
      this.$http.get(api).then((response) => {
        vm.isLoading = false;
        vm.product = response.data.product;
        $('#productModal').modal('show');
        vm.status.loadingItem = '';
      });
    },
    addtoCart(id, qty = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(api, { data: cart }).then((response) => {
        vm.isLoading = false;
        console.log(response);
        vm.getCart();
        vm.status.loadingItem = '';
      });
    },
    deleteCart(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.delete(api).then((response) => {
        if (response.data.success) {
          this.getCart();
          vm.isLoading = false;
        } else {
          console.log(response.data.mseeage);
          vm.isLoading = false;
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
        vm.status.loadingItem = '';
      });
    },
    addCouponCode() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const vm = this;
      const coupon = {
        code: vm.coupon_code,
      };
      this.$http.post(api, { data: coupon }).then((response) => {
        console.log(response);
        vm.isLoading = false;
        vm.getCart();
        vm.status.loadingItem = '';
      });
    },
    createOrder() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const vm = this;
      const order = vm.form;
      // vm.isLoading = true;
      this.$validator.validate().then((valid) => {
        if (valid) {
          // do stuff if not valid.
          this.$http.post(api, { data: order }).then((response) => {
            console.log('訂單已完成', response);
            if (response.data.success) {
              vm.$router.push(`/coustmer_checkout/${response.data.orderId}`);
            }
            vm.status.loadingItem = '';
          });
        } else {
          console.log('欄位不完整');
        }
      });
    },
  },
  created() {
    this.getData();
    this.getCart();
  },
};
</script>
