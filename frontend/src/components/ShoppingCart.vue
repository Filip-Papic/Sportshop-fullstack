<template>
  <div>

    <div style="background-color: gold">
        <p v-for="product in products" 
            :key="product.id"
            >
            {{ product.name }}, {{ product.price }}$ ---------------------------- Quantity: {{ product.quantity }}
        </p>
        <br>
        <p>Total: {{ total }}$</p>
    </div>

    <div>
        <b-button @click="$store.dispatch('checkout')">Checkout</b-button>
    </div>

  </div>
</template>

<script>

export default {
    name: 'ShoppingCart',
    
    computed: {
        products() {
            return this.$store.getters.cartProducts;
        },
        total() {
            return this.$store.getters.cartTotal;
        }
    },
}


</script>