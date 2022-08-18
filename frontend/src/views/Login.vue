<template>
  <div id="app" class="form">
    <Header subtitle="Log In"/>

    <b-form @submit="onSubmit">
      <b-form-group label="User Name:" label-for="name">
        <b-form-input id="name" v-model="form.name" placeholder="Enter name" required></b-form-input>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>

  import Header from '@/components/Header.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'Login',
    
    components: {
      Header
    },

    data() {
      return {
        form: {
          name: '',
          password: ''
        }
      }
    },

    methods: {
      ...mapActions([
        'login'
      ]),

      onSubmit(e) {
        e.preventDefault();

        this.login(this.form);
        console.log(this.form);
        localStorage.setItem('userName', this.form.name);

        this.$router.push({ name: 'Home' });
      }
    }
  }
</script>

<style scoped>

body {
    text-align: center;
}
form {
    display: inline-block;
}
</style>
