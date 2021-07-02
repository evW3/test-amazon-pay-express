<template>
  <div class="home">
      <h1>Checkout</h1>
  </div>
</template>

<script>
import { post } from 'axios';
//import { HmacSHA256, sha256,  } from 'cryptojs';

export default {
    name: 'Home',
    data: () => ({
        amazonCheckoutSessionId: null,
        innerUrl: 'http://localhost:3001'
    }),
    methods: {

    },
    async beforeMount() {
        this.amazonCheckoutSessionId = this.$route.query.amazonCheckoutSessionId;
        console.log(this.amazonCheckoutSessionId);

    }
}
</script>

<style lang="scss"></style>

