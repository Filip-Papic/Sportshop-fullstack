<template>
  <div id="app">
    <Header :subtitle="subtitle"/>
    <ProductListFull />
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import ProductListFull from '@/components/ProductListFull.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'Category',
    
    components: {
      Header,
      ProductListFull
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
