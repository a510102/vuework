<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class=" navbar-brand p-2"
        href="/home">Jay's Shop</a>
        <button class="navbar-toggler" type="button"
        data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item px-2" :class="{'active': this.$route.path === '/home'}">
              <router-link class="nav-link h5" to="/home">
                <i class="fas fa-home"></i>
              </router-link>
            </li>
            <li class="nav-item px-2">
              <router-link class="nav-link h5" to="/coustmer_olders">
                <i class="fas fa-store"></i>
              </router-link>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item px-2 h5" v-if="this.$route.meta.requiresAuth">
              <a class="nav-link" href="#" @click.prevent="signout">
                <i class="fas fa-sign-out-alt"></i>
              </a>
            </li>
            <li class="nav-item h5 px-2" v-else>
              <router-link class="nav-link" href="#" to="/login">
                <i class="fas fa-user"></i>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'Navbar',
  methods: {
    signout() {
      const vm = this;
      const url = `${process.env.VUE_APP_API}logout`;
      this.$http.post(url).then((res) => {
        if (res.data.success) {
          vm.$router.push('/home');
        }
      });
    },
  },
};

</script>
