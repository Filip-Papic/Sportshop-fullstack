<template>
  <div>

    <div class="art">
      <img src="https://www.shareicon.net/data/256x256/2015/10/09/653498_users_512x512.png" />
      <hr>
      
        <p>Name: {{ user.name }}</p>
        <p>Email: {{ user.email }}</p>
        <p>Adress: {{ user.adress }}</p>
        <p>Postal code: {{ user.postalCode }}</p>
        <p>City: {{ user.city }}</p>
        <p>Country: {{ user.country }}</p>
      
    </div>

  </div>
</template>

<script>

  export default {
    name: 'User',

    props: {
      user: Object
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