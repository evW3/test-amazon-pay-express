"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const cors = require('cors');
const path_1 = require("path");
const dotenv = __importStar(require("dotenv"));
const fs = require('fs');
const Client = require('@amazonpay/amazon-pay-api-sdk-nodejs');
dotenv.config();
const app = express_1.default();
exports.app = app;
app.use(bodyParser.json());
app.use(cors());
app.use('/', express_1.default.static(path_1.join(__dirname, '..', 'client')));
app.get('/doc', (_, res) => {
    res.end('<h1>Documentation</h1>');
});
app.get('/accepted-pay', (_, res) => {
    res.end('<h1>Accepted</h1>');
});
app.get('/test', (_, res) => {
    const config = {
        publicKeyId: process.env.PUBLIC_KEY,
        privateKey: fs.readFileSync(path_1.join(__dirname, '..', 'key', 'AmazonPay_SANDBOX-AF5UZXLNVFYHYFHJW5TJW3RF.pem')),
        region: 'us',
        sandbox: true
    };
    const testPayClient = new Client.AmazonPayClient(config);
    const payload = {
        webCheckoutDetails: {
            checkoutReviewReturnUrl: 'https://red-toque-98022.herokuapp.com/accepted-pay'
        },
        storeId: process.env.STORE_ID
    };
    const signature = testPayClient.generateButtonSignature(payload);
    console.log(signature);
});
app.get('/store/id', (_, res) => {
    res.send({ storeId: process.env.STORE_ID });
});
//# sourceMappingURL=configureServer.js.map