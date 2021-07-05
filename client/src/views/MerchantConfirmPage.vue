<template>
  <div class="home">
      <div v-if="!!message">
        {{message}}
      </div>
      <div v-else>
        <span>Merchant confirm page</span>
        <br>
        <button @click="pay">Оплатить</button>
      </div>
  </div>
</template>

<script>
import { get, patch, post } from 'axios';
import { v4 } from 'uuid';

export default {
    name: 'Home',
    data: () => ({
        amazonCheckoutSessionId: null,
        innerUrl: 'http://localhost:3001',
        checkout: null,
        message: null
    }),
    methods: {
        async pay() {
            this.message = (await post(`${this.innerUrl}/checkout/${this.amazonCheckoutSessionId}`, { payload: { chargeAmount: this.checkout.paymentDetails.chargeAmount } })).data.message;
        }
    },
    async beforeMount() {
      this.amazonCheckoutSessionId = this.$route.query.amazonCheckoutSessionId;
      this.checkout = { ...(await get(`${ this.innerUrl }/checkout/${ this.amazonCheckoutSessionId }`)).data };
    }
}
</script>

<style lang="scss"></style>