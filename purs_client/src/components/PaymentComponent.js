import React, { useState } from 'react';
import axios from 'axios';
import '../PaymentComponent.css'; 

function PaymentComponent() {
    const [payment, setPayment] = useState({ amount: "$25.00"});
    const [selectedTip, setSelectedTip] = useState(null);  

    

    const initiatePayment = async () => {
        const completePayment = {
            ...payment,
            tip: selectedTip
        };

        try {
            const response = await axios.post('https://purs-assignment-server.vercel.app/initiate-payment', completePayment); //initate payment
            if (response.data.token) {
                localStorage.setItem('paymentToken', response.data.token); //Local storage of token
                window.location.href = `/payment-approval/${response.data.paymentId}`; 
            }
        } catch (error) {
            console.error('Payment initiation failed:', error);
        }
    };

    return (
        <div className="payment-container">
            <div className="header">
                <h1>iCashe, Inc.</h1>
            </div>
            <p>Does this amount look right?</p>
            <div className="amount" data-amount={payment.amount}>{payment.amount}</div>
            <div className="tip-section">
                <p>Show appreciation w/ a tip? 😊</p>
                <div className="tip-buttons">
                    <button onClick={() => setSelectedTip(1)} className={selectedTip === 1 ? 'active' : ''}>$1</button>        {/* set tip to 1$ */}
                    <button onClick={() => setSelectedTip(3)} className={selectedTip === 3 ? 'active' : ''}>$3</button>        {/* set tip to 3$ */}
                    <button onClick={() => setSelectedTip(5)} className={selectedTip === 5 ? 'active' : ''}>$5</button>        {/* set tip to 5$ */}
                    <button onClick={() => setSelectedTip(0)} className={selectedTip === 0 ? 'active' : ''}>NO TIP</button>    {/* set no tip */}
                    
                </div>
            </div>
            <button className="proceed-btn" onClick={initiatePayment}>Continue to Payment</button>
        </div>
    );
}

export default PaymentComponent;
