<template>
  <div id="app">
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <img
            src="https://sportsshop.com.bd/wp-content/uploads/2022/02/sports-shop.png"
            width="200"
            alt="Logo"
          />
        </b-col>
        <b-col>
          <Header subtitle="About us"/>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
    
    <div style="font-weight: bold">
      <p>
        Do you have a question for our customer service? If your question has been asked before, you will certainly find the answer in the frequently asked questions. Is your question not there? Then please contact our customer service:
        Simply and quickly send an e-mail via the contact form, which of course can be used 24 hours a day. Please allow for a response time of approximately 1 working day.
        Call our customer service via the phone number 0416-652803. We are available every working day from 09.00 to 21.00 and Saturday and Sunday from 10.00 to 17.00 (CEST).
      </p>
      <hr>
    </div>
    
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  
  export default {
    name: 'About',
    
    components: {
    Header
    },
  }
</script>
