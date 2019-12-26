<template>
  <div>
    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-dark"
            data-toggle="modal" data-target="#shopCartModal">
      <i class="fas fa-shopping-cart"></i> <span class="badge badge-danger">{{ cartsNum }}</span>
    </button>
    </div>
    <div class="modal fade" id="shopCartModal" tabindex="-1"
        role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Shop Cart</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" v-if="cartsNum < 1">
            <div class="jumbotron jumbotron-fluid">
              <div class="container">
                <h1 class="display-4">尚未購物</h1>
                <p class="lead">您尚未購買任何商品，無法結帳。</p>
              </div>
            </div>
          </div>
          <div class="modal-body" v-else>
            <div class="my-5">
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
                    <td class="align-middle">{{ item.qty }} {{ item.product.unit }}</td>
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
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary"
            @click="gotoCheckOut" v-if="cartsNum > 0">結帳</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  props: {
    cart: [Object, Array],
    cartsNum: {
      type: Number,
    },
    isLoading: {
      type: Boolean,
    },
    status: {
      type: Object,
    },
    getCart: {
      type: Function,
    },
  },
  methods: {
    deleteCart(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      const vm = this;
      this.$http.delete(api).then((response) => {
        if (response.data.success) {
          // vm.getCart();
          vm.$emit('getcart');
          this.$bus.$emit('message:push', response.data.message, 'success');
        } else {
          console.log(response.data.mseeage);
          this.$bus.$emit('message:push', response.data.message, 'danger');
        }
      });
    },
    gotoCheckOut() {
      if (this.cart.carts.length > 0) {
        $('#shopCartModal').modal('hide');
        this.$router.push('/coustmer_check');
      } else {
        console.log('你還沒購物');
      }
    },
    // getCart() {
    //   const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
    //   const vm = this;
    //   vm.isLoading = true;
    //   this.$http.get(api).then((response) => {
    //     vm.isLoading = false;
    //     vm.cart = response.data.data;
    //     vm.cartsNum = vm.cart.carts.length;
    //     vm.status.loadingItem = '';
    //   });
    // },
  },
};
</script>
