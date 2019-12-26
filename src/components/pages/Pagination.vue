<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item bg-dark text-white"
          :class="{'disabled' : !pagination.has_pre}"
          v-if="pagination.has_pre"
        >
          <a class="page-link bg-dark text-white" href="#"
          @click.prevent="changePage(pagination.current_page -1)"
          >Previous</a>
        </li>
        <li class="page-item bg-dark text-white"
        v-for="(page, key) in pagination.total_pages"
        :key="key" :class="{ 'active' : pagination.current_page === page }"
        >
          <a class="page-link bg-dark text-white"
          href="#" @click.prevent="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item bg-dark text-white"
          :class="{'disabled' : !pagination.has_next}"
          v-if="pagination.has_next"
        >
          <a class="page-link bg-dark text-white" href="#"
          @click.prevent="changePage(pagination.current_page +1)"
          >Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    pagination: {
      type: Object,
    },
    getProducts: {
      type: Function,
    },
  },
  methods: {
    changePage(page) {
      this.$emit('changepages', page);
    },
  },
};
</script>
