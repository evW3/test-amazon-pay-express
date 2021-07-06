<template>
  <div class="home">
      <h1>Checkout</h1>
      <span>Amount: {{this.checkout.paymentDetails.chargeAmount.amount}}</span>
      <br>
      <span>Currency code: {{this.checkout.paymentDetails.chargeAmount.currencyCode}}</span>
      <br>
      <a v-if='url' :href='url'>
          Перейти к оплате
      </a>
  </div>
</template>

<script>
import { get, patch, post } from 'axios';
import { v4 } from 'uuid';
import { API_URL, FRONT_URL } from "../constants";

export default {
    name: 'Home',
    data: () => ({
        amazonCheckoutSessionId: null,
        checkout: null,
        url: null
    }),
    methods: {
        async pay() {
            await post(`${API_URL}/checkout/${this.amazonCheckoutSessionId}`, { payload: { chargeAmount: this.checkout.paymentDetails.chargeAmount } });
        },
        createPayloadWithAmount(amount, currencyCode) {
            return {
                webCheckoutDetails: {
                    checkoutResultReturnUrl: `${FRONT_URL()}/merchant-confirm-page`
                },
                paymentDetails: {
                    paymentIntent: 'Confirm',
                    canHandlePendingAuthorization: false,
                    chargeAmount: {
                        amount: amount,
                        currencyCode: currencyCode
                    }
                },
                merchantMetadata: {
                    merchantReferenceId: v4().toString().replace(/-/g, ''),
                    merchantStoreName: 'AmazonTestStoreFront',
                    noteToBuyer: 'merchantNoteForBuyer',
                    customInformation: ''
                }
            };
        }
    },
    async beforeMount() {
        this.amazonCheckoutSessionId = this.$route.query.amazonCheckoutSessionId;
        this.checkout = { ...(await get(`${API_URL}/checkout/${ this.amazonCheckoutSessionId }`)).data };
        this.checkout = { ...(await patch(`${API_URL}/checkout/${ this.checkout.checkoutSessionId }`, { payload: this.createPayloadWithAmount('50', 'USD') })).data };
        this.url = this.checkout.webCheckoutDetails.amazonPayRedirectUrl;
    }
}
</script>

<style lang="scss"></style>