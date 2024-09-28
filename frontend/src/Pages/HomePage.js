import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const [upiId, setUpiId] = useState('');
    const [isBankActivated, setIsBankActivated] = useState(false);

    useEffect(() => {
        // Retrieve UPI ID from local storage
        const storedUpiId = localStorage.getItem('senderUpiId');
        setUpiId(storedUpiId);

        // Simulate a check for bank activation status
        // Replace this with your actual logic to check bank activation
        if (storedUpiId) {
            // This is a placeholder. You should replace this with your actual check.
            // For example, you could fetch this information from your backend.
            // setIsBankActivated(checkBankActivation(storedUpiId));
            // Simulating bank activation status for demonstration purposes
            setIsBankActivated(Math.random() < 0.5); // Randomly sets activation status for demo
        }
    }, []);

    const handleContinue = () => {
        if (isBankActivated) {
            navigate('/upi-payment');
        } else {
            navigate('/activate');
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Hello, {upiId ? upiId : 'User'}!</h1>
            <button onClick={handleContinue} style={{ padding: '10px 20px', fontSize: '16px' }}>
                Continue
            </button>
        </div>
    );
};

export default HomePage;
