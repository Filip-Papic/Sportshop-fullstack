<template>
  <div>

    <div class="art">
      <img :src="product.image" class="img" />
      
      <p>Name: {{ product.name }}</p>
      <p>Price: {{ product.price }}</p>
      <p>Manufacturer: {{ product.manufacturer }}</p>
      <p>Description: {{ product.description }}</p>
      <p>Size: {{ product.size }}</p>
      <p>Quantity in stock: {{ product.quantityStock }}</p>
      <p>Category: {{ product.categoryID}}</p>
      
    </div>

    <div>
        <b-button @click="addToCart(product)">Add to cart</b-button>
    </div>

  </div>
</template>

<script>

  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'SingleProduct',

    props: {
      product: Object,
    },

    computed: {
        ...mapState([
        'products',
        'cart'
        ])
    },

    methods: {
      addToCart(product) {
        this.$store.dispatch('addToCart', product);
      }
    }
  }

</script>

<style scoped>

  img {
    max-width: 400px;
    max-height: 400px;
  }

  .art {
    border-bottom-style: solid;
    margin-bottom: 10px;
  }

</style>