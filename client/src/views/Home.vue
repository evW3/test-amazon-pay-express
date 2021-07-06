<template>
  <div class="home">
        <h1>Amazon pay test example</h1>
        <div id="AmazonPayButton" style="width: 300px; height: 35px"></div>
  </div>
</template>

<script>
import { get, post } from 'axios';
import { API_URL, FRONT_URL } from "../constants";

export default {
    name: 'Home',
    data: () => ({
            storeId: null,
            publicKey: null,
            merchantId: null,
            payload: {}
        }),
    methods: {
        setValues(objectWithParams) {

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
        const storeInfo = await get(`${API_URL}/store/info`);

        this.setValues(storeInfo);

        this.payload = {
            'webCheckoutDetails': {
                'checkoutReviewReturnUrl': `${FRONT_URL()}/accepted-pay`
            },
            'storeId': this.storeId
        }

        const signature = (await post(`${API_URL}/store/signature`, { payload: this.payload })).data.signature;

        amazon.Pay.renderButton('#AmazonPayButton', {
            merchantId: this.merchantId,
            publicKeyId: this.publicKey,
            ledgerCurrency: 'USD',
            checkoutLanguage: 'en_US',
            productType: 'PayAndShip',
            placement: 'Cart',
            buttonColor: 'Gold',
            createCheckoutSessionConfig: {
                payloadJSON: this.payload,
                signature: signature
            }
        });
    }
}
</script>

<style lang="scss"></style>