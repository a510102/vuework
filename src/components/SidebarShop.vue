<template>
  <div>
    <nav class="container px-0">
          <div class="list-group sticky">
            <div class="h4 px-3">種類</div>
            <div class="list-group justify-content-center flex-md-column mb-2">
              <a class="list-group-item list-group-item-action list-group-item-dark"
              @click="change(item)"
              v-for="(item, index) in category" :key='index'>
                {{ item }}
              </a>
            </div>
          </div>
        </nav>
  </div>
</template>

<script>
export default {
  props: {
    category: Array,
  },
  methods: {
    change(item) {
      this.$emit('changecategroy', item);
    },
  },
};
</script>
