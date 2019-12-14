<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="text-right">
      <button class="btn btn-primary" @click="openCouponModal(true)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ item.due_date | date }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled === 1" >啟用</span>
            <span class="text-muted" v-else>未起用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm m-1"
            @click="openCouponModal(false, item)"
            >編輯</button>
            <button class="btn btn-outline-danger btn-sm"
            @click="deleteCoupon(item)"
            >刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title" v-model="tempCoupon.title"
                placeholder="請輸入標題">
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input type="text" class="form-control" id="coupon_code" v-model="tempCoupon.code"
                placeholder="請輸入優惠碼">
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input type="date" class="form-control" id="due_date"
                v-model="due_date">
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input type="number" class="form-control" id="price"
                v-model="tempCoupon.percent" placeholder="請輸入折扣百分比">
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled" id="is_enabled">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary"
              @click="updateCoupon()">更新優惠券</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      coupons: [],
      isNew: false,
      isLoading: false,
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        due_date: 0,
        code: '',
      },
      due_date: new Date(),
    };
  },
  watch: {
    due_date() {
      const vm = this;
      const timestamp = Math.floor(new Date(vm.due_date) / 1000);
      vm.tempCoupon.due_date = timestamp;
    },
  },
  methods: {
    getCoupon() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.isLoading = false;
        vm.coupons = response.data.coupons;
      });
    },
    openCouponModal(isNew, item) {
      console.log(item, isNew);
      if (isNew) {
        this.tempCoupon = {};
        this.isNew = true;
      } else {
        this.tempCoupon = { ...item };
        this.isNew = false;
      }
      $('#couponModal').modal('show');
    },
    updateCoupon() {
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      let httpMethod = 'post';
      const vm = this;
      vm.isLoading = true;
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempProduct.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api, { data: vm.tempCoupon })
        .then((response) => {
          if (response.data.success) {
            $('#couponModal').modal('hide');
            vm.getCoupon();
          } else {
            $('#couponModal').modal('hide');
            vm.getCoupon();
            console.log('新增失敗');
          }
        });
    },
    deleteCoupon(item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${item.id}`;
      console.log(item.id);
      this.isLoading = true;
      this.$http.delete(api).then((response) => {
        console.log(response);
        if (response.data.success) {
          this.isLoading = false;
          this.getCoupon();
        }
      });
    },
  },
  created() {
    this.getCoupon();
  },
};

</script>
