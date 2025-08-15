<template>
 <div>
    <Header />
    <Body />
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Body from '~/components/Body.vue'

export default {
  name: 'HomePage',
 

  data() {},
  mounted() {
    console.log(this.message);
  },

  components: {
    Header,
    Footer,
    Body
  }
};
</script>