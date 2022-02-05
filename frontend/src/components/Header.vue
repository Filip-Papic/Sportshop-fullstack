<template>
  <div class="title">
    <h1>Sportswear Shop</h1>
    <h3 v-if="subtitle">{{ subtitle }}</h3>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    components: {
    },

    props: {
      subtitle: String
    }
  }
</script>

<style scoped>
  .title {
    padding-top: 15px;
    margin-bottom: 25px;
  }
</style>
