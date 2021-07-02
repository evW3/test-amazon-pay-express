<template>
  <div class="home">
        <h1>Amazon pay test example</h1>
        <div id="AmazonPayButton" style="width: 300px; height: 35px"></div>
  </div>
</template>

<script>
import { get } from 'axios';

export default {
    name: 'Home',
    data: () => ({
            innerUrl: 'http://localhost:3001',
            storeId: null,
            publicKey: null,
            merchantId: null
        }),
    methods: {
        async onSubmit() {  },
        async setValues(objectWithParams) {

            if(objectWithParams.data.storeId) {
                this.storeId = objectWithParams.data.storeId;
            }

            if(objectWithParams.data.publicKey) {
                this.publicKey = objectWithParams.data.publicKey;
            }

            if(objectWithParams.data.merchantId) {
                this.merchantId = objectWithParams.data.merchantId;
            }
        }
    },
    async beforeMount() {
        const storeInfo = await get(`${ this.innerUrl}/store/info`);

        const signature = (await get(`${ this.innerUrl}/store/signature`)).data.signature;

        this.setValues(storeInfo);

        const payloadJSON = {
            'webCheckoutDetails': {
                'checkoutReviewReturnUrl': 'http://localhost:3002/accepted-pay'
            },
            'storeId': this.storeId
        }

        amazon.Pay.renderButton('#AmazonPayButton', {
            merchantId: this.merchantId,
            publicKeyId: this.publicKey,
            ledgerCurrency: 'USD',
            checkoutLanguage: 'en_US',
            productType: 'PayAndShip',
            placement: 'Cart',
            buttonColor: 'Gold',
            createCheckoutSessionConfig: {
                payloadJSON: payloadJSON, 
                signature: signature
            }
        });
    }
}
</script>

<style lang="scss"></style>