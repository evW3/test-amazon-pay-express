import express, { Response } from 'express';
import * as bodyParser from 'body-parser';
const cors = require('cors');
import { join } from 'path';
import * as dotenv from 'dotenv'
const fs = require('fs');
const Client = require('@amazonpay/amazon-pay-api-sdk-nodejs');

dotenv.config()

const app: express.Application = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/', express.static(join(__dirname, '..', 'client')));

app.get('/doc', (_, res) => {
    res.end('<h1>Documentation</h1>');
});

app.get('/accepted-pay', (req, res) => {
    console.log(req);
    //amazonCheckoutSessionId
    res.end('<h1>Accepted</h1>');
})

app.get('/store/signature', (_, res: Response) => {

    const config = {
        publicKeyId: process.env.PUBLIC_KEY,
        privateKey: fs.readFileSync(join(__dirname, '..', 'key', 'AmazonPay_SANDBOX-AF5UZXLNVFYHYFHJW5TJW3RF.pem')),
        region: 'us',
        sandbox: true
    };

    const testPayClient = new Client.AmazonPayClient(config);

    const payload = {
        webCheckoutDetails: {
            checkoutReviewReturnUrl: 'http://localhost:3002/accepted-pay'
        },
        storeId: process.env.STORE_ID
    };

    const signature: string = testPayClient.generateButtonSignature(payload);

    res.status(200).json({ signature });
})

app.get('/store/info', (_, res) => {
    res.send({
        storeId: process.env.STORE_ID,
        publicKey: process.env.PUBLIC_KEY,
        merchantId: process.env.MERCHANT_ID
    });
});

export { app };