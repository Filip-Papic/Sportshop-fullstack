<template>
  <div class="products">
      <Single v-for="image in images" :key="image.objectID" :image="image" />
  </div>
</template>

<script>
// @ is an alias to /src
import Single from '@/views/Single.vue'

export default {
    name: 'Products',
  
    components: {
        Single,
    },
   
   data() {
        return {
            images: []
        }
    },
    
    watch: {
        objects(nVal, oVal) {
            this.images = [];
            
            nVal.map( obj => {
            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${obj}`)
                .then( obj => obj.json() )
                    .then( img => this.images.push(img) );
        })    
        }
    },
    
    mounted() {
        this.objects.map( obj => {
            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${obj}`)
                .then( obj => obj.json() )
                    .then( img => this.images.push(img) );
        })
    },
    
    props: {
        objects: Array
    }
}
</script>
