import express, { Response } from 'express';
import * as bodyParser from 'body-parser';
const cors = require('cors');
import { join } from 'path';
import * as dotenv from 'dotenv'
const fs = require('fs');
const Client = require('@amazonpay/amazon-pay-api-sdk-nodejs');

dotenv.config()

const amazonConfig = {
    publicKeyId: process.env.PUBLIC_KEY,
    privateKey: fs.readFileSync(join(__dirname, '..', 'key', 'AmazonPay_SANDBOX-AF5UZXLNVFYHYFHJW5TJW3RF.pem')),
    region: 'us',
    sandbox: true
};

const app: express.Application = express();

const testPayClient = new Client.AmazonPayClient(amazonConfig);
const testWebClient = new Client.WebStoreClient(amazonConfig);

app.use(bodyParser.json());
app.use(cors());

app.use('/', express.static(join(__dirname, '..', 'client')));

app.get('/doc', (_, res) => {
    res.end('<h1>Documentation</h1>');
});

app.get('/store/signature', (_, res: Response) => {
    const payload = {
        webCheckoutDetails: {
            checkoutReviewReturnUrl: 'http://localhost:3002/accepted-pay'
        },
        storeId: process.env.STORE_ID
    };

    const signature: string = testPayClient.generateButtonSignature(payload);

    res.status(200).json({ signature });
});

app.get('/store/info', (_, res) => {
    res.send({
        storeId: process.env.STORE_ID,
        publicKey: process.env.PUBLIC_KEY,
        merchantId: process.env.MERCHANT_ID
    });
});

app.get('/checkout/:id', async (req, res) => {
    const amazonCheckoutSessionId = req.params.id;
    const rezult = await testWebClient.getCheckoutSession(amazonCheckoutSessionId);
    res.status(200).json({...rezult.data})
});

app.patch(`/checkout/:id`, async (req, res) => {
    const payload = req.body.payload;
    const amazonCheckoutSessionId = req.params.id;
    const tmp = await testWebClient.updateCheckoutSession(amazonCheckoutSessionId, payload);
    res.status(200).json({ ...tmp.data });
});

app.post('/checkout/:id', async (req, res) => {
    try {
        const payload = req.body.payload;
        const amazonCheckoutSessionId = req.params.id;
        console.log(payload);
        console.log(amazonCheckoutSessionId);
        const tmp = await testWebClient.completeCheckoutSession(amazonCheckoutSessionId, payload);
        console.log(tmp);
    } catch(e) {
        console.log(e);
    }
});

export { app };