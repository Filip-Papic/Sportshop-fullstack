<template>
  <div>
    <div class="center " v-for="product in products"
         :key="product.id"
          >
      <b-card no-body class="overflow-hidden " style="max-width: 540px; height: 350px">
        <b-row no-gutters>
          <a :href="`/product/${product.id}/${product.name}`" class="stretched-link"></a>
          <b-col md="6">
            <b-card-img :src="product.image" class="img" alt="Image"></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body :title="product.name">
              <b-card-text>
                {{ product.description }}
              </b-card-text>
              <b-card-text>
                {{ product.quantityStock }} in stock
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>

      <div v-if="token">
        <b-button @click="addToCart(product)">Add to cart</b-button>
      </div>
      
      <br>
    </div>

  </div>
</template>

<script>
 import { mapActions, mapState } from 'vuex';

export default {
    name: 'ProductList',

    computed: {
        ...mapState([
        'products',
        'cart',
        'token'
        ])
    },

    mounted() {
        this.fetchProducts();     
    },

    methods: {
        ...mapActions([
        'fetchProducts'
        ]),

        rowClicked(record) {
            this.$router.push({ name: 'ProductView', params: { id: record.id } });
        },

        addToCart(product) {
          this.$store.dispatch('addToCart', product);
      },
    }
}

</script>

<style scoped>
  .center {
    display: inline-block;
  }

  img {
    max-width: 200px;
    max-height: 200px;
  }
</style>