<template>
  <div class="image">
      <h3>{{ image.title }}</h3>
      
      <img v-if="image.primaryImageSmall" :src="image.primaryImageSmall" />
      <p v-else>Image not available</p>

      <ul>
          <li>Author: {{ image.artistDisplayName }}</li>
          <li>Highlight: {{ image.isHighlight }}</li>
          <li>Year acquired: {{ image.accessionYear }}</li>
      </ul>
  </div>
</template>

<script>

    export default {
        name: 'Single',
        props: {
            image: Object
        }
    }
</script>

<style scoped>
    .image {
        margin-top: 10px;
        border-style: dashed;
        border-radius: 15px;
    }
</style>
