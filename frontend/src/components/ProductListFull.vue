<template>
  <div>
    <b-table 
      id="image-table"
      hover
      fixed
      :items="products"
      :fields="fields"
      small
      :per-page="perPage"
      :current-page="currentPage"
      @row-clicked="rowClicked"
    >
      <template #cell(isHighlight)="data">
        <b-icon v-if="data.value" icon="check-square" variant="success" scale="2"></b-icon>
        <b-icon v-else icon="x-circle" variant="danger" scale="2"></b-icon>
      </template>

    </b-table>
    <b-pagination class=".pagination"
      v-model="currentPage"
      :total-rows="products.length"
      :per-page="perPage"
      aria-controls="image-table"
    ></b-pagination>
  </div>
</template>

<script>
 import { mapActions, mapState } from 'vuex';

export default {
    name: 'ProductList',

    data() {
        return {
        fields: ['name', 'price', 'manufacturer', 'price', 'description', 'size', 'quantityStock', 'category.name'],
        items: [],
        currentPage: 1,
        perPage: 3
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

        rowClicked(record) {
            this.$router.push({ name: 'ProductView', params: { id: record.id } });
        }
    }
}

</script>

<style scoped>
  .pagination {
    justify-content: center;
  }
</style>