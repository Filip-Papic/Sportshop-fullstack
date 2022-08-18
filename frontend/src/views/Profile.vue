<template>
  <div id="app">
    <Header :subtitle="subtitle"/>

    <User v-if="user" :user="user"/>

    <div>
        <b-button href="/edit-profile">Edit profile</b-button>
    </div>

    <hr>
    My orders:
    <div>
      <p v-for="order in orders" 
            :key="order.id"
            >
            User: {{ order.userID }}, Order number: {{ order.id }}, Date: {{ order.createdAt }}
        </p>
    </div>

  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import User from '@/components/User.vue';
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'Profile',
    
    components: {
      Header,
      User
    },

    data() {
        return {
            subtitle: ''
        }
    },

    methods: {
      ...mapActions([
        'fetchUserByUsername',
        'fetchOrders'
      ])
    },

    computed: {
      ...mapState([
        'user',
        'orders'
      ])
    },

    mounted() {
      this.fetchUserByUsername(localStorage.userName);
      this.fetchOrders(localStorage.userID);
    }
  }

</script>

<style scoped>

</style>
