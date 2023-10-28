import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaymentComponent from './components/PaymentComponent';
import PaymentApproval from './components/PaymentApproval';

const App = () => {
    return (
      <Router>
            <Routes>
                <Route exact path="/" element={<PaymentComponent />} />
                <Route exact path="/payment-approval/:paymentId" element={<PaymentApproval />} />
            </Routes>
        </Router>
    );
};

export default App;