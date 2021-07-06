import express, { Response } from 'express';
import * as bodyParser from 'body-parser';
const cors = require('cors');
import { join, resolve } from 'path';
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

app.post('/store/signature', (req, res: Response) => {
    try {
        const payload = req.body.payload;

        const signature: string = testPayClient.generateButtonSignature(payload);

        res.status(200).json({ signature });
    } catch (e) {
        console.log(e);
    }
});

app.get('/store/info', (_, res) => {
    res.send({
        storeId: process.env.STORE_ID,
        publicKey: process.env.PUBLIC_KEY,
        merchantId: process.env.MERCHANT_ID
    });
});

app.get('/checkout/:id', async (req, res) => {
    try {
        const amazonCheckoutSessionId = req.params.id;
        const tmp = await testWebClient.getCheckoutSession(amazonCheckoutSessionId);
        res.status(200).json({...tmp.data});
    } catch (e) {
        console.log(e);
    }
});

app.patch(`/checkout/:id`, async (req, res) => {
    try {
        const payload = req.body.payload;
        const amazonCheckoutSessionId = req.params.id;
        const tmp = await testWebClient.updateCheckoutSession(amazonCheckoutSessionId, payload);
        res.status(200).json({ ...tmp.data });
    } catch (e) {
        console.log(e);
    }
});

app.post('/checkout/:id', async (req, res) => {
    try {        
        const payload = req.body.payload;
        const amazonCheckoutSessionId = req.params.id;
        const tmp = await testWebClient.completeCheckoutSession(amazonCheckoutSessionId, payload);
        console.log(tmp);
        res.status(200).json({ message: 'Session was completed' });
    } catch(e) {
        console.log(e);
    }
});

app.use('/*', express.static(join(__dirname, '..', 'client', 'dist')));

export { app };