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
            categoryId: null
        }
    },

    watch: {
      $route() {
        this.subtitle = this.$route.params.name;
        this.categoryId = this.$route.params.categoryId;

        this.fetchProductsByCategory(this.categoryId);
      }
    },

    mounted() {
        this.subtitle = this.$route.params.name;
        this.categoryId = this.$route.params.categoryId;

        this.fetchProductsByCategory(this.categoryId);
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
