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
import { get, post } from 'axios';
import { API_URL } from "../constants";

export default {
    name: 'Home',
    data: () => ({
        amazonCheckoutSessionId: null,
        checkout: null,
        message: null
    }),
    methods: {
        async pay() {
            this.message = (await post(`${API_URL}/checkout/${this.amazonCheckoutSessionId}`, { payload: { chargeAmount: this.checkout.paymentDetails.chargeAmount } })).data.message;
        }
    },
    async beforeMount() {
      this.amazonCheckoutSessionId = this.$route.query.amazonCheckoutSessionId;
      this.checkout = { ...(await get(`${API_URL}/checkout/${ this.amazonCheckoutSessionId }`)).data };
    }
}
</script>

<style lang="scss"></style>