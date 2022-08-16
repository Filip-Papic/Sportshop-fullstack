<template>
  <div id="app" class="form">
    <Header subtitle="Create account"/>

    <b-form @submit="onSubmit">
      <b-form-group label="Name:" label-for="name">
        <b-form-input id="name" v-model="form.name" placeholder="Enter name" required></b-form-input>
      </b-form-group>

      <b-form-group label="Email address:" label-for="email">
        <b-form-input id="email" v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
      </b-form-group>

      <b-form-group label="Adress:" label-for="adress">
        <b-form-input id="adress" v-model="form.adress" placeholder="Enter adress" required></b-form-input>
      </b-form-group>

      <b-form-group label="Postal code:" label-for="postal">
        <b-form-input id="postal" v-model="form.postal" placeholder="Enter postal code" required></b-form-input>
      </b-form-group>

      <b-form-group label="City:" label-for="city">
        <b-form-input id="city" v-model="form.city" placeholder="Enter city" required></b-form-input>
      </b-form-group>

      <b-form-group label="Country:" label-for="country">
        <b-form-input id="country" v-model="form.country" placeholder="Enter country" required></b-form-input>
      </b-form-group>

      <br>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>

  import Header from '@/components/Header.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'Register',
    
    components: {
      Header
    },

    data() {
      return {
        form: {
          name: '',
          email: '',
          password: '',
          adress: '',
          postal: '',
          city: '',
          country: ''
        }
      }
    },

    methods: {
      ...mapActions([
        'register'
      ]),

      onSubmit(e) {
        e.preventDefault();

        this.register(this.form);
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
