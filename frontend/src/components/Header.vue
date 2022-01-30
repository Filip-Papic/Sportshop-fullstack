<template>
  <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/categories">Categories</router-link> |
      <router-link to="/products">Products</router-link> |
      <router-link to="/about">About</router-link>
    </div>
</template>

<script>
// @ is an alias to /src
//import Header from '@/components/Header.vue'

export default {
  name: 'Header',
  components: {
  }
}
</script>
