<template>
 <div>
    <Header />
    <h1 style="text-align: center;">HELLO this home</h1>
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  name: 'HomePage',
 

  data() {},
  mounted() {
    console.log(this.message);
  },

  components: {
    Header,
    Footer
  }
};
</script>