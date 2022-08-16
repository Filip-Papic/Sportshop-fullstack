<template>
  <div id="app">
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <img
            src="https://sportsshop.com.bd/wp-content/uploads/2022/02/sports-shop.png"
            width="200"
            alt="Logo"
          />
        </b-col>
        <b-col>
          <Header subtitle="Products"/>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
    
    

    <div>
      <ProductListFull />
    </div>
    
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  import ProductListFull from '@/components/ProductListFull.vue'
  import { mapActions, mapState, mapMutations } from 'vuex';
  
  export default {
    name: 'Home',
    
    components: {
    Header,
    ProductListFull
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
