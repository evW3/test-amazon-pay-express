<template>
  <div class="home">
      <h1>Checkout</h1>
      <span>Amount: {{this.checkout.paymentDetails.chargeAmount.amount}}</span>
      <br>
      <span>Currency code: {{this.checkout.paymentDetails.chargeAmount.currencyCode}}</span>
      <br>
      <button @click="pay">Оплатить</button>
      <br>
      <a v-if='url' :href='url'>
          Click to confirm
      </a>
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
        url: null
    }),
    methods: {
        async pay() {
            await post(`${this.innerUrl}/checkout/${this.amazonCheckoutSessionId}`, { payload: { chargeAmount: this.checkout.paymentDetails.chargeAmount } });
        }, 
        createPayloadWithAmount(amount, currencyCode) {
            return {
                webCheckoutDetails: {
                    checkoutResultReturnUrl: 'http://localhost/merchant-confirm-page'
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
        this.checkout = { ...(await get(`${ this.innerUrl }/checkout/${ this.amazonCheckoutSessionId }`)).data };
        this.checkout = { ...(await patch(`${this.innerUrl}/checkout/${ this.checkout.checkoutSessionId }`, { payload: this.createPayloadWithAmount('50', 'USD') })).data };
        console.log(this.checkout);
        this.url = this.checkout.webCheckoutDetails.amazonPayRedirectUrl;
    }
}
</script>

<style lang="scss"></style>

