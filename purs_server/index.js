const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const crypto = require("crypto");
const authMiddleware = require('./middleware/authMiddleware');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());  

let payments = [];  

app.get('/',(req,res) => {
    res.send("Server is running");
})

app.post('/initiate-payment', (req, res) => {
    const { totalAmount, tip } = req.body;
    const paymentId = crypto.randomBytes(16).toString("hex");  //paymentId  random 32-char

    payments.push({
        paymentId,
        totalAmount,
        tip,
        
    });

    const token = jwt.sign({ paymentId }, process.env.SECRET_KEY, { expiresIn: '30s' }); //assign jwt token (Header, Payload, Signature)
    res.send({ token, paymentId });
});

app.get('/payment/:paymentId', authMiddleware, (req, res) => {
    const paymentId = parseInt(req.params.paymentId, 10);
    const payment = payments.find(p => p.paymentId === paymentId);

    if (payment) {
        res.json(payment);
    } else {
        res.status(404).send({ message: 'Payment not found.' }); //payment not found
    }
});

app.post('/confirm-payment', authMiddleware, (req, res) => {
    res.json({ status: 'success', redirectUrl: 'https://app.purs.digital' });  //post-payment redirect
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
});
