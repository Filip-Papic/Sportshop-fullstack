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
        How it all started.....
        It all started in May 2002. Mark and Robert-Jan, both passionate handball players, were studying and noticed that there wasn't a real shop for handball gear. One thing led to another and in May 2002 the company Total Sports was a fact. From their attic room they started their first online web shop, handbalshop.nl went live.
        In the beginning of 2004, the attic room was simply too small and they received the keys of their first real office in Waspik. After hard work and a healthy growth Mark and Robert-Jan decided to focus full-time on Total Sports in 2006. While they made this decision they moved again to a new office with a warehouse in Waalwijk.
        In the years that followed Total Sport grew 30% to 40% yearly and the number of shops and countries they operated in increased. Due to the increase in employees and stock, it again became clear that we needed another place to settle. After a long search, we became the owner of a new office with a warehouse in 2017. This location has a surface of 3500 m2 with the possibility to grow another 1500m2. The three-story high warehouse offers space for 120.000 products which we can deliver right from our warehouse.
      </p>
      <hr>
      <p>
        Sportshop.com
        <br>
        To continue our international growth and name recognition in the future we said goodbye to the name Total Sports on the first of July 2017 and we continued as Sportshop.com. We are proud that we went from our attic room to a 3500m2 office building with a warehouse. But we are especially proud of the fact that we have an office in 3 countries, 20 shops, and 50 colleagues.
      </p>
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
