<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <th width="120">分類</th>
        <th>產品分類</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="80">是否啟用</th>
        <th width="120">編輯</th>
      </thead>
      <tbody>
        <tr v-for="(item, key) in products" :key="key">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ item.origin_price | currency }}
          </td>
          <td class="text-right">
            {{ item.price | currency }}
          </td>
          <td>
            <span v-if="item.is_enable" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td class="d-flex">
              <button class="btn btn-outline-primary btn-sm"
                @click="openModal(false, item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm"
                @click="deleProjuct(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pagination= "pagination"
                v-on:changepages="getProducts"/>
    <!-- modal-->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin"
                      v-if="status.fileUploading"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control"
                    ref="files" @change="uploadFild">
                </div>
                <img :img="tempProduct.imageUrl"
                  class="img-fluid" :src="tempProduct.imageUrl" alt="">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import $ from 'jquery';
import Pagination from './Pagination.vue';

Vue.component('Loading', Loading);

export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false,
      },
      pagination: {},
    };
  },
  components: { Pagination },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response);
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = { ...item };
        this.isNew = false;
      }
      $('#productModal').modal('show');
    },
    updateProduct() {
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api, { data: vm.tempProduct })
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            $('#productModal').modal('hide');
            vm.getProducts();
          } else {
            $('#productModal').modal('hide');
            vm.getProducts();
            console.log('新增失敗');
          }
        });
    },
    deleProjuct(item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${item.id}`;
      this.$http.delete(api).then((response) => {
        if (response.data.success) {
          this.getProducts();
        }
      });
    },
    uploadFild() {
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      vm.status.fileUploading = true;
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {
        vm.status.fileUploading = false;
        if (res.data.success) {
          // vm.tempProduct.imageUrl = res.data.imageUrl;
          // console.log(vm.tempProduct);
          vm.$set(vm.tempProduct, 'imageUrl', res.data.imageUrl);
        } else {
          this.$bus.$emit('message:push', res.data.message, 'danger');
        }
      });
    },
  },
  created() {
    this.getProducts();
  },
};

</script>
