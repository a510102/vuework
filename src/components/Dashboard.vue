<template>
  <div class="w-100 m-auto">
    <Navbar></Navbar>
    <Alert />
    <div class="container">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import Alert from '@/components/AlertMessage.vue';
import Footer from './Footer.vue';

export default {
  name: 'Dashboard',
  components: {
    Navbar,
    Alert,
    Footer,
  },
};
</script>
