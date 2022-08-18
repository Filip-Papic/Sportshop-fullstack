<template>
  <div id="app">
    <Header :subtitle="subtitle"/>
    <ProductList />
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import ProductList from '@/components/ProductList.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'Category',
    
    components: {
      Header,
      ProductList
    },

    data() {
        return {
            subtitle: '',
            categoryID: null
        }
    },

    watch: {
      $route() {
        this.subtitle = this.$route.params.name;
        this.categoryID = this.$route.params.categoryID;

        this.fetchProductsByCategory(this.categoryID);
      }
    },

    mounted() {
        this.subtitle = this.$route.params.name;
        this.categoryID = this.$route.params.id;
        
        this.fetchProductsByCategory(this.categoryID);
    },

    methods: {
      ...mapActions([
        'fetchProductsByCategory'
      ])
    }
  }
</script>

<style scoped>

</style>
