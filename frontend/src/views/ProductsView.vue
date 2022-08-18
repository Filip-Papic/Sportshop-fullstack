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
          <Header subtitle="Products"/>
        </b-col>
        <b-col class="center-block" align-self="center">
          <b-input-group class="mt-3">
            <b-form-input v-model="searchQuery" placeholder="Search"></b-form-input>
            <b-input-group-append>
              <b-button @click="search" variant="info" type="submit">Search</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
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
    name: 'Products',
    
    components: {
    Header,
    ProductList
},

    data() {
      return {
        searchQuery: '',
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
      ]),

      search(e) {
        e.preventDefault();

        const sq = this.searchQuery;
        this.searchQuery = '';
        
        this.$router.push({ name: 'Search', query: { q: sq } });
      },
    }
  }
</script>
