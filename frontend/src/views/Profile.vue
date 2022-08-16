<template>
  <div id="app">
    <Header :subtitle="subtitle"/>

    <User v-if="user" :user="user"/>

    <div>
        <b-button href="/edit-profile">Edit profile</b-button>
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
        'fetchUserByUsername'
      ])
    },

    computed: {
      ...mapState([
        'user'
      ])
    },

    mounted() {
      this.fetchUserByUsername(localStorage.userName);
    }
  }

</script>

<style scoped>

</style>
