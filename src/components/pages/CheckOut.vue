<template>
  <div class="container my-3">
    <Loading :active.sync="isLoading"></Loading>
    <div class="d-flex justify-content-around">
        <div class="badge badge-pill p-2"
        :class="{'badge-success': this.$route.name === 'CheckOut'}">確認商品</div>
        <div class="badge badge-pill p-2">進入金流系統</div>
        <div class="badge badge-pill p-2">付款成功</div>
      </div>
    <div class="row mt-3">
      <div class="col-md-6">
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
        <div class="input-group input-group-sm mb-3">
          <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="addCouponCode"
            >
              套用優惠碼
            </button>
          </div>
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
</template>

<script>

export default {
  data() {
    return {
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
      isLoading: false,
    };
  },
  methods: {
    deleteCart(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      this.$http.delete(api).then((response) => {
        if (response.data.success) {
          this.getCart();
        } else {
          console.log(response.data.mseeage);
        }
      });
    },
    getCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(api).then((response) => {
        vm.cart = response.data.data;
      });
    },
    addCouponCode() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const vm = this;
      vm.isLoading = true;
      const coupon = {
        code: vm.coupon_code,
      };
      this.$http.post(api, { data: coupon }).then((response) => {
        if (response.data.success) {
          vm.isLoading = false;
          this.$bus.$emit('message:push', response.data.message, 'success');
          vm.getCart();
        } else {
          vm.isLoading = false;
          this.$bus.$emit('message:push', response.data.message, 'danger');
        }
      });
    },
    createOrder() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const vm = this;
      const order = vm.form;
      vm.isLoading = true;
      this.$validator.validate().then((valid) => {
        if (valid) {
          // do stuff if not valid.
          this.$http.post(api, { data: order }).then((response) => {
            if (response.data.success) {
              vm.isLoading = true;
              vm.$router.push(`/coustmer_checkout/${response.data.orderId}`);
            }
          });
        } else {
          console.log('欄位不完整');
        }
      });
    },
  },
  created() {
    this.getCart();
  },
};
</script>
