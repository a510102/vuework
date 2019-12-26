<template>
  <div>
    <table class="table mt-4">
      <thead>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
      </thead>
      <tbody>
        <tr v-for="(item, key) in orders" :key="key"
          :class="{'text-secondary': !item.is_paid}">
          <td>{{ item.create_at | date }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td>{{ item.total | currency }}</td>
          <td>
            <strong v-if="item.is_paid" class="text-success">已付款</strong>
            <span v-else class="text-muted">尚未起用</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pagination= "pagination"
                v-on:changepages="getProducts" />
  </div>
</template>

<script>
import Pagination from './Pagination.vue';

export default {
  data() {
    return {
      orders: {},
      pagination: {
        has_pre: false,
        has_next: false,
      },
      isLoading: false,
    };
  },
  components: { Pagination },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/orders?page=${page}`;
      this.$http.get(api).then((response) => {
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
        console.log(response);
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
