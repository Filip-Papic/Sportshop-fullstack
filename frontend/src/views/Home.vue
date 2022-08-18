<template>
  <div id="app">
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <img
            src="../assets/sports-shop.png"
            width="200"
            alt="Logo"
          />
        </b-col>
        <b-col>
          <Header subtitle="Home"/>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
    
    

    <div>
      <ProductList />
    </div>
    
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  import ProductList from '@/components/ProductList.vue'
  import { mapActions, mapState, mapMutations } from 'vuex';
  
  export default {
    name: 'Home',
    
    components: {
    Header,
    ProductList
},

    data() {
      return {
      }
    },

    computed: {
      ...mapState([
        'products'
      ])
    },

    mounted() {
      this.fetchProducts();
    },

    methods: {
      ...mapActions([
          'fetchProducts'
      ])
    }
  }
</script>
