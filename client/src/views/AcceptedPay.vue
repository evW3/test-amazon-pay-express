<template>
  <div class="home">
      <h1>Checkout</h1>
  </div>
</template>

<script>
import { post } from 'axios';

export default {
    name: 'Home',
    data: () => ({
        amazonCheckoutSessionId: null,
        innerUrl: 'http://localhost:3001'
    }),
    async beforeMount() {
        this.amazonCheckoutSessionId = this.$route.query.amazonCheckoutSessionId;
        console.log(this.amazonCheckoutSessionId);
        console.log(await post(`https://pay-api.amazon.com/v2/checkoutSessions/${ this.amazonCheckoutSessionId }/complete`, {
            "chargeAmount": {
                "amount": "14.00",
                "currencyCode": "USD"
            }
        }));
    }
}
</script>

<style lang="scss"></style>