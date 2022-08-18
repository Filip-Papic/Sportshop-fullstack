<template>
  <div id="app">
    <Header :subtitle="subtitle"/>
    <ProductList />
  </div>
</template>

<script>

  import Header from '@/components/Header.vue';
  import { mapActions } from 'vuex';
  import ProductList from '../components/ProductList.vue';

  export default {
    name: 'Search',
    
    components: {
    Header,
    ProductList
},

    data() {
      return {
        subtitle: 'Search results: ',
        products: null
      }
    },

    mounted() {
      this.search(this.$route.query.q)
      this.subtitle += this.$route.query.q;
    },

    methods: {
      ...mapActions([
        'search'
      ])
    }
  }
</script>

<style scoped>

</style>
