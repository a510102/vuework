<template>
  <div>
    <table class="table mt-4">
      <thead>
        <th width="120">購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th width="120">應付金額</th>
        <th width="120">是否付款</th>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
          <td class="text-right">
            3
          </td>
          <td class="text-right">
            4
          </td>
          <td>
            5
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders`;
      // const vm = this;
      this.$http.get(api).then((response) => {
        console.log(response);
      });
    },
    created() {
      this.getProducts();
    },
  },
};
</script>
