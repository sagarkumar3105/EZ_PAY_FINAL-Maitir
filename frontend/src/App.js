import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, useLocation, useNavigate } from 'react-router-dom';
import ActivateBankAccount from './components/ActivateBankAccount/ActivateBankAccount';
import UpiPayment from './components/UpiPayment/UpiPayment';
import BankTransaction from './components/BankTransaction/BankTransaction';
import BankTransactionResult from './components/BankTransaction/BankTransactionResult';
import  PaymentResult from './components/UpiPayment/PaymentResult';
import CheckUserBalance from './components/UpiPayment/CheckUserBalance';
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';
import TransactionDetail from './components/TransactionHistory/Cards/TransactionDetail';
import LoginError from './components/TransactionHistory/LoginError/LoginError';
import TransactionDashboard from './components/TransactionHistory/Dashboard/TransactionDashboard';


// npm i react-router-dom chart.js html2canvas react-icons react-calendar react-chartjs-2

/*@Author: Meghna Bhat
@Date:22nd September 2024 */


// Different navigation paths for the application
const router = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard/>, // Use the Home component here
    },
    {
        path: '/activate-account',
        element: <ActivateBankAccount/>,
    },
    {
        path: '/upi-payment',
        element: <UpiPayment/>,
    },
    {
        path: '/payment-result',
        element: <PaymentResult/>,
    },
    {
        path: '/check-balance',
        element: <CheckUserBalance />,
    },

    {
        path: '/bank-transaction',
        element: <BankTransaction />,
    },
    {
        path: '/bank-transaction-result',
        element: <BankTransactionResult />,
    },
    {
        path: '/footer',
        element: <Footer/>,
    },
    {
        path: "/transactionhistory",
        element: <TransactionDashboard />
    },
    {
        path:"/transaction/:id",
        element: <TransactionDetail />
    },  
    { 
        path:"/LoginError",
        element: <LoginError /> 
    }
]);

const TransactionConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const transactionStatus = sessionStorage.getItem('transactionStatus');
        const paymentId = sessionStorage.getItem('paymentId');
        const reason = sessionStorage.getItem('reason');
        const receiverUpiId = sessionStorage.getItem('receiverUpiId');
        const amount = sessionStorage.getItem('amount');
        const paymentStatus = sessionStorage.getItem('paymentStatus');
        const senderUpiId = sessionStorage.getItem('senderUpiId');

        if (transactionStatus === 'completed' && location.pathname !== '/payment-result') {
            const confirmDetails = window.confirm("Your transaction is completed. Do you want to see the details?");
            if (confirmDetails) {
                navigate('/payment-result', {
                    state: {
                        receiverUpiId,
                        amount,
                        paymentStatus,
                        reason,
                        senderUpiId,
                        paymentId
                    }
                });
            }
            // Clear session storage values
            sessionStorage.removeItem('transactionStatus');
            sessionStorage.removeItem('paymentId');
            sessionStorage.removeItem('reason');
            sessionStorage.removeItem('receiverUpiId');
            sessionStorage.removeItem('amount');
            sessionStorage.removeItem('paymentStatus');
            sessionStorage.removeItem('senderUpiId');
        }
    }, [location, navigate]);

    return null; // This component doesn't render anything
};

const App = () => {
    return (
        <RouterProvider router={router}>
            <TransactionConfirmation /> {/* Include TransactionConfirmation here */}
        </RouterProvider>
    );
};

export default App;
