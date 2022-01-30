<template>
  <div id="app">
      <Header :title="title" />
      <Products v-if="objectIDs" :objects="objectIDs.slice(curr * 10, (curr + 1) * 10)" />
      <button @click="prev()">Previous</button>
      <span> ... </span>
      <button @click="next()">Next</button>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Products from '@/views/Products.vue'

export default {
  components: {
    Header,
    Products,
  },
  data(){
      return{
          title: 'Sportswear Shop',
          objectIDs: null,
          curr: 0
      }
  }, 
  mounted() {
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects`)
        .then( obj => obj.json() )
            .then( res => {
                this.objectIDs = res.objectIDs;
            });
  },
  methods: {
    next() {
      if (this.curr *10 < this.objectIDs.length) {
        this.curr++;
      }
    },

    prev() {
      if (this.curr !== 0){
        this.curr--;
      }
    }
  }
        
}
</script>


<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #6a698d;
}
body { //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    background-color: #6a698d;
}
#nav {
  padding: 30px;
  
  a {
    font-weight: bold;
    color: #2c3e50;
    
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
