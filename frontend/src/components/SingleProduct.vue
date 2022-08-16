<template>
  <div>

    <div class="art">
      <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png" />
      
      <ul>
        <li>Name: {{ product.name }}</li>
        <li>Price: {{ product.price }}</li>
        <li>Manufacturer: {{ product.manufacturer }}</li>
        <li>Description: {{ product.description }}</li>
        <li>Size: {{ product.size }}</li>
        <li>Quantity in stock: {{ product.quantityStock }}</li>
        <li>Category: {{ product.categoryID}}</li>
      </ul>
    </div>

  </div>
</template>

<script>

  export default {
    name: 'SingleProduct',

    props: {
      product: Object
    }
  }

</script>

<style scoped>

  img {
    max-width: 600px;
    max-height: 600px;
  }

  .art {
    border-bottom-style: solid;
    margin-bottom: 10px;
  }

</style>