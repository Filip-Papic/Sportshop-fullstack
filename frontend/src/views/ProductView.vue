<template>
  <div>
    <Header :subtitle="subtitle"/>
    
    <SingleProduct v-if="product" :product="product"/>

  </div>
</template>

<script>

  import Header from '@/components/Header.vue';
  import SingleProduct from '@/components/SingleProduct.vue';
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'ProductView',

    components: {
      Header,
      SingleProduct
    },

    data() {
      return {
        subtitle: ''
      }
    },
    
    methods: {
      ...mapActions([
        'fetchProductById'
      ])
    },

    computed: {
      ...mapState([
        'product'
      ])
    },

    mounted() {
      this.fetchProductById(this.$route.params.id);
    }
  }

</script>