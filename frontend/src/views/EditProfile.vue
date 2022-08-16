<template>
  <div id="app" class="form">
    <Header subtitle="Edit account"/>

    <b-form @submit="onSubmit">
      <b-form-group label="Name:" label-for="name">
        <b-form-input id="name" v-model="form.name" placeholder="Enter name" required></b-form-input>
      </b-form-group>

      <b-form-group label="Email address:" label-for="email">
        <b-form-input id="email" v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
      </b-form-group>

      

      <b-form-group label="Adress:" label-for="adress">
        <b-form-input id="adress" v-model="form.adress" placeholder="Enter adress" required></b-form-input>
      </b-form-group>

      <b-form-group label="Postal code:" label-for="postalCode">
        <b-form-input id="postalCode" v-model="form.postalCode" placeholder="Enter postal code" required></b-form-input>
      </b-form-group>

      <b-form-group label="City:" label-for="city">
        <b-form-input id="city" v-model="form.city" placeholder="Enter city" required></b-form-input>
      </b-form-group>

      <b-form-group label="Country:" label-for="country">
        <b-form-input id="country" v-model="form.country" placeholder="Enter country" required></b-form-input>
      </b-form-group>

      <br>
      <b-button type="submit" variant="primary">Edit</b-button>
    </b-form>
  </div>
</template>


<script>

  import Header from '@/components/Header.vue';
  import { mapActions, mapGetters, mapState } from 'vuex';

  export default {
    name: 'EditProfile',
    
    components: {
      Header
    },

    data() {
      return {
        form: {
          name: '',
          email: '',
          //password: '',
          adress: '',
          postalCode: '',
          city: '',
          country: '',
          admin: 0,
          moderator: 0
        }
      }
    },

    methods: {
      ...mapActions([
        'updateUserData',
        //'getUserById'
      ]),

      onSubmit(e) {
        e.preventDefault();
        this.form.id = localStorage.userID;
        //console.log(this.form);
        this.updateUserData(this.form);
        this.$router.push({ name: 'Profile' });
      }
    },

    computed: {
        ...mapState([
            'userData'
        ])
    },

    /* mounted() {
        //this.getUserById( localStorage.getItem('userId') );

        this.form.name = this.userData.name;
        this.form.email = this.userData.email;
        this.form.password = this.userData.password;
        this.form.adress = this.userData.adress;
        this.form.postal = this.userData.postal.toString();
        this.form.city = this.userData.city;
        this.form.country = this.userData.country;

        console.log(this.form);
    }, */
    
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
