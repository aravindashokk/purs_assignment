import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PaymentApproval(props) {
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        if(timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            window.location.href = '/';
        }
    }, [timeLeft]);

    const approvePayment = () => {
        const token = localStorage.getItem('paymentToken');
        axios.post('https://purs-assignment-server.vercel.app/confirm-payment', {}, 
            { headers: { 'Authorization': `Bearer ${token}` } }
        )
        .then(response => {
            if (response.data.redirectUrl) {
                window.location.href = response.data.redirectUrl;
            }
        })
        .catch(error => {
            console.error('Payment confirmation failed:', error);
        });
    };

    return (
        <div>
            <h3>You have {timeLeft} seconds to approve the payment.</h3>
            <button onClick={approvePayment}>Approve Payment</button>
        </div>
    );
}

export default PaymentApproval;
