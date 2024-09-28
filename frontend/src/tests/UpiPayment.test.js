// // // import React from 'react';
// // // import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// // // import { MemoryRouter, Router } from 'react-router-dom';
// // // import { createMemoryHistory } from 'history';
// // // import UpiPayment from './Pages/UpiPayment';
// // // import { act } from 'react';

// // // // Mock fetch to simulate API behavior
// // // global.fetch = jest.fn(() =>
// // //   Promise.resolve({
// // //     ok: true,
// // //     json: () => Promise.resolve({}),
// // //   })
// // // );

// // // describe('UpiPayment Component', () => {
// // //   test('displays error when invalid sender UPI ID is entered', async () => {
// // //     render(
// // //       <MemoryRouter>
// // //         <UpiPayment />
// // //       </MemoryRouter>
// // //     );

// // //     fireEvent.change(screen.getByPlaceholderText(/Enter your UPI ID/i), {
// // //       target: { value: '123' },  // Invalid UPI ID
// // //     });
// // //     fireEvent.change(screen.getByPlaceholderText(/Enter receiver UPI ID/i), {
// // //       target: { value: '9999999999@ezpay' },
// // //     });
// // //     fireEvent.change(screen.getByPlaceholderText(/Enter UPI Pin/i), {
// // //       target: { value: '1234' },
// // //     });
// // //     fireEvent.change(screen.getByPlaceholderText(/Amount/i), {
// // //       target: { value: '500' },
// // //     });

// // //     fireEvent.click(screen.getByText(/Pay/i));

// // //     expect(await screen.findByText(/Please enter a valid UPI ID (10-digit number followed by @ezpay)/i)).toBeInTheDocument();
// // //   });

// // //   test('displays error when UPI Pin is invalid', async () => {
// // //     render(
// // //       <MemoryRouter>
// // //         <UpiPayment />
// // //       </MemoryRouter>
// // //     );

// // //     fireEvent.change(screen.getByPlaceholderText(/Enter your UPI ID/i), {
// // //       target: { value: '9999999999@ezpay' },
// // //     });
// // //     fireEvent.change(screen.getByPlaceholderText(/Enter receiver UPI ID/i), {
// // //       target: { value: '7777777777@ezpay' },
// // //     });
// // //     fireEvent.change(screen.getByPlaceholderText(/Enter UPI Pin/i), {
// // //       target: { value: '12' },  // Invalid UPI Pin (less than 4 digits)
// // //     });
// // //     fireEvent.change(screen.getByPlaceholderText(/Amount/i), {
// // //       target: { value: '500' },
// // //     });

// // //     fireEvent.click(screen.getByText(/Pay/i));

// // //     expect(await screen.findByText(/Please enter a valid 4-digit UPI Pin/i)).toBeInTheDocument();
// // //   });

// // // //   test('displays error when amount is invalid (zero or negative)', async () => {
// // // //     render(
// // // //       <MemoryRouter>
// // // //         <UpiPayment />
// // // //       </MemoryRouter>
// // // //     );

// // // //     fireEvent.change(screen.getByPlaceholderText(/Enter your UPI ID/i), {
// // // //       target: { value: '9876543210@ezpay' },
// // // //     });
// // // //     fireEvent.change(screen.getByPlaceholderText(/Enter receiver UPI ID/i), {
// // // //       target: { value: '1234567890@ezpay' },
// // // //     });
// // // //     fireEvent.change(screen.getByPlaceholderText(/Enter UPI Pin/i), {
// // // //       target: { value: '1234' },
// // // //     });
// // // //     fireEvent.change(screen.getByPlaceholderText(/Amount/i), {
// // // //       target: { value: '-100' },  // Invalid amount
// // // //     });

// // // //     fireEvent.click(screen.getByText(/Pay/i));

// // // //     expect(await screen.findByText(/Please enter a valid amount greater than zero/i)).toBeInTheDocument();
// // // //   });

// // //   test('navigates to PaymentResult screen on successful payment', async () => {
// // //     const history = createMemoryHistory();
// // //     render(
// // //       <Router location={history.location} navigator={history}>
// // //         <UpiPayment />
// // //       </Router>
// // //     );

// // //     fireEvent.change(screen.getByPlaceholderText(/Enter your UPI ID/i), {
// // //       target: { value: '9876543210@ezpay' },
// // //     });
// // //     fireEvent.change(screen.getByPlaceholderText(/Enter receiver UPI ID/i), {
// // //       target: { value: '1234567890@ezpay' },
// // //     });
// // //     fireEvent.change(screen.getByPlaceholderText(/Enter UPI Pin/i), {
// // //       target: { value: '1234' },
// // //     });
// // //     fireEvent.change(screen.getByPlaceholderText(/Amount/i), {
// // //       target: { value: '500' },
// // //     });

// // //     fireEvent.click(screen.getByText(/Pay/i));

// // //     // Wait for navigation to complete
// // //     await waitFor(() => {
// // //       expect(history.location.pathname).toBe('/payment-result');
// // //     });
// // //   });

// // //   test('displays "Payment Failed" with reason on API failure', async () => {
// // //     global.fetch.mockImplementationOnce(() =>
// // //       Promise.resolve({
// // //         ok: false,
// // //         text: () => Promise.resolve('Invalid sender or receiver UPI ID'),
// // //       })
// // //     );

// // //     const history = createMemoryHistory();
// // //     render(
// // //       <Router location={history.location} navigator={history}>
// // //         <UpiPayment />
// // //       </Router>
// // //     );

// // //     fireEvent.change(screen.getByPlaceholderText(/Enter your UPI ID/i), {
// // //       target: { value: '9876543210@ezpay' },
// // //     });
// // //     fireEvent.change(screen.getByPlaceholderText(/Enter receiver UPI ID/i), {
// // //       target: { value: '1234567890@ezpay' },
// // //     });
// // //     fireEvent.change(screen.getByPlaceholderText(/Enter UPI Pin/i), {
// // //       target: { value: '1234' },
// // //     });
// // //     fireEvent.change(screen.getByPlaceholderText(/Amount/i), {
// // //       target: { value: '500' },
// // //     });

// // //     fireEvent.click(screen.getByText(/Pay/i));

// // //     // Wait for navigation and check for "Payment Failed" message
// // //     await waitFor(() => {
// // //       expect(history.location.pathname).toBe('/payment-result');
// // //       expect(screen.getByText(/Payment Failed/i)).toBeInTheDocument();
// // //       expect(screen.getByText(/Invalid sender or receiver UPI ID/i)).toBeInTheDocument();
// // //     });
// // //   });
// // // });
// // import {React,act} from 'react';
// // import { render, screen, fireEvent } from '@testing-library/react';
// // import { MemoryRouter } from 'react-router-dom';
// // import UpiPayment from './Pages/UpiPayment';

// // describe('UpiPayment Component', () => {
// //     beforeEach(() => {
// //         render(
// //             <MemoryRouter>
// //                 <UpiPayment />
// //             </MemoryRouter>
// //         );
// //     });

// //     test('renders UPI payment form', () => {
// //         expect(screen.getByPlaceholderText(/Enter your UPI ID/i)).toBeInTheDocument();
// //         expect(screen.getByPlaceholderText(/Enter receiver UPI ID/i)).toBeInTheDocument();
// //         expect(screen.getByPlaceholderText(/Enter UPI Pin/i)).toBeInTheDocument();
// //         expect(screen.getByPlaceholderText(/Amount/i)).toBeInTheDocument();
// //         expect(screen.getByText(/Pay/i)).toBeInTheDocument();
// //     });

// //     test('shows error when invalid sender UPI ID is entered', async () => {
// //         fireEvent.change(screen.getByPlaceholderText(/Enter your UPI ID/i), {
// //             target: { value: 'invalid_upi' },
// //         });
// //         fireEvent.change(screen.getByPlaceholderText(/Enter receiver UPI ID/i), {
// //             target: { value: '9999999999@ezpay' },
// //         });
// //         fireEvent.change(screen.getByPlaceholderText(/Enter UPI Pin/i), {
// //             target: { value: '1234' },
// //         });
// //         fireEvent.change(screen.getByPlaceholderText(/Amount/i), {
// //             target: { value: '500' },
// //         });

// //         fireEvent.click(screen.getByText(/Pay/i));

// //         expect(await screen.findByText(/Please enter a valid UPI ID/i)).toBeInTheDocument();
// //     });

// //     test('shows error when invalid UPI Pin is entered', async () => {
// //         fireEvent.change(screen.getByPlaceholderText(/Enter your UPI ID/i), {
// //             target: { value: '9999999999@ezpay' },
// //         });
// //         fireEvent.change(screen.getByPlaceholderText(/Enter receiver UPI ID/i), {
// //             target: { value: '9999999999@ezpay' },
// //         });
// //         fireEvent.change(screen.getByPlaceholderText(/Enter UPI Pin/i), {
// //             target: { value: '12' },
// //         });
// //         fireEvent.change(screen.getByPlaceholderText(/Amount/i), {
// //             target: { value: '500' },
// //         });

// //         fireEvent.click(screen.getByText(/Pay/i));

// //         expect(await screen.findByText(/Please enter a valid 4-digit UPI Pin/i)).toBeInTheDocument();
// //     });

// //     test('shows error when amount is invalid', async () => {
// //         fireEvent.change(screen.getByPlaceholderText(/Enter your UPI ID/i), {
// //             target: { value: '9999999999@ezpay' },
// //         });
// //         fireEvent.change(screen.getByPlaceholderText(/Enter receiver UPI ID/i), {
// //             target: { value: '9999999999@ezpay' },
// //         });
// //         fireEvent.change(screen.getByPlaceholderText(/Enter UPI Pin/i), {
// //             target: { value: '1234' },
// //         });
// //         fireEvent.change(screen.getByPlaceholderText(/Amount/i), {
// //             target: { value: '0' },
// //         });

// //         fireEvent.click(screen.getByText(/Pay/i));

// //         expect(await screen.findByText(/Please enter a valid amount greater than zero/i)).toBeInTheDocument();
// //     });
// // });
// import { render, screen, fireEvent } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import UpiPayment from './Pages/UpiPayment';
// import { act } from 'react'; // Updated to use React's act

// describe('UpiPayment Component', () => {
//     beforeEach(() => {
//         render(
//             <MemoryRouter>
//                 <UpiPayment />
//             </MemoryRouter>
//         );
//     });

//     test('renders UPI payment form fields and submit button', () => {
//         expect(screen.getByPlaceholderText(/Enter UPI ID/i)).toBeInTheDocument();
//         expect(screen.getByPlaceholderText(/Enter receiver UPI ID/i)).toBeInTheDocument();
//         expect(screen.getByPlaceholderText(/Enter UPI Pin/i)).toBeInTheDocument();
//         expect(screen.getByPlaceholderText(/Amount/i)).toBeInTheDocument();

//         // Updated: use getByRole to specifically target the "Pay" button
//         expect(screen.getByRole('button', { name: /Pay/i })).toBeInTheDocument();
//     });

//     test('shows error message for invalid sender UPI ID', async () => {
//         fireEvent.change(screen.getByPlaceholderText(/Enter UPI ID/i), { target: { value: 'invalid_upi' } });
//         fireEvent.change(screen.getByPlaceholderText(/Enter receiver UPI ID/i), { target: { value: '9999999999@ezpay' } });
//         fireEvent.change(screen.getByPlaceholderText(/Enter UPI Pin/i), { target: { value: '1234' } });
//         fireEvent.change(screen.getByPlaceholderText(/Amount/i), { target: { value: '500' } });

//         // Updated: use getByRole to specifically target the "Pay" button
//         fireEvent.click(screen.getByRole('button', { name: /Pay/i }));

//         expect(await screen.findByText(/Please enter a valid UPI ID/i)).toBeInTheDocument();
//     });


//     test('shows error message for invalid UPI Pin', async () => {
//         fireEvent.change(screen.getByPlaceholderText(/Enter your UPI ID/i), { target: { value: '9999999999@ezpay' } });
//         fireEvent.change(screen.getByPlaceholderText(/Enter receiver UPI ID/i), { target: { value: '9999999999@ezpay' } });
//         fireEvent.change(screen.getByPlaceholderText(/Enter UPI Pin/i), { target: { value: '12' } });
//         fireEvent.change(screen.getByPlaceholderText(/Amount/i), { target: { value: '500' } });
//         fireEvent.click(screen.getByText(/Pay/i));

//         expect(await screen.findByText(/Please enter a valid 4-digit UPI Pin/i)).toBeInTheDocument();
//     });

//     test('shows error message for invalid amount', async () => {
//         fireEvent.change(screen.getByPlaceholderText(/Enter your UPI ID/i), { target: { value: '9999999999@ezpay' } });
//         fireEvent.change(screen.getByPlaceholderText(/Enter receiver UPI ID/i), { target: { value: '9999999999@ezpay' } });
//         fireEvent.change(screen.getByPlaceholderText(/Enter UPI Pin/i), { target: { value: '1234' } });
//         fireEvent.change(screen.getByPlaceholderText(/Amount/i), { target: { value: '0' } });
//         fireEvent.click(screen.getByText(/Pay/i));

//         expect(await screen.findByText(/Please enter a valid amount greater than zero/i)).toBeInTheDocument();
//     });

//     test('submits valid UPI payment', async () => {
//         fireEvent.change(screen.getByPlaceholderText(/Enter your UPI ID/i), { target: { value: '9999999999@ezpay' } });
//         fireEvent.change(screen.getByPlaceholderText(/Enter receiver UPI ID/i), { target: { value: '8888888888@ezpay' } });
//         fireEvent.change(screen.getByPlaceholderText(/Enter UPI Pin/i), { target: { value: '1234' } });
//         fireEvent.change(screen.getByPlaceholderText(/Amount/i), { target: { value: '500' } });

//         fireEvent.click(screen.getByText(/Pay/i));

//         await waitFor(() => expect(screen.getByText(/Payment Successful/i)).toBeInTheDocument());
//     });

//     test('handles failed payment', async () => {
//         fireEvent.change(screen.getByPlaceholderText(/Enter your UPI ID/i), { target: { value: '9999999999@ezpay' } });
//         fireEvent.change(screen.getByPlaceholderText(/Enter receiver UPI ID/i), { target: { value: '9999999999@ezpay' } });
//         fireEvent.change(screen.getByPlaceholderText(/Enter UPI Pin/i), { target: { value: '1234' } });
//         fireEvent.change(screen.getByPlaceholderText(/Amount/i), { target: { value: '5000' } });

//         fireEvent.click(screen.getByText(/Pay/i));

//         await waitFor(() => expect(screen.getByText(/Payment Failed/i)).toBeInTheDocument());
//     });
// });
// //-----------------
// import { render, screen, fireEvent, act } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import UpiPayment from '../Pages/UpiPayment';

// describe('UpiPayment Component', () => {
//     beforeEach(() => {
//         render(
//             <MemoryRouter>
//                 <UpiPayment />
//             </MemoryRouter>
//         );
//     });

//     test('renders UPI payment form fields and submit button', () => {
//         // Update placeholder texts to match the actual rendered ones
//         expect(screen.getByPlaceholderText(/Enter your UPI ID/i)).toBeInTheDocument();
//         expect(screen.getByPlaceholderText(/Enter receiver UPI ID/i)).toBeInTheDocument();
//         expect(screen.getByPlaceholderText(/Enter UPI Pin/i)).toBeInTheDocument();
//         expect(screen.getByPlaceholderText(/Amount/i)).toBeInTheDocument();
//         expect(screen.getByRole('button', { name: /Pay/i })).toBeInTheDocument();
//     });

//     test("shows error messages for invalid inputs", async () => {
//         render(
//             <MemoryRouter>
//                 <UpiPayment />
//             </MemoryRouter>
//         );

//         // Enter invalid UPI ID and PIN
//         fireEvent.change(screen.getByPlaceholderText("Enter your UPI ID"), { target: { value: "99999999@ezp" } });
//         fireEvent.change(screen.getByPlaceholderText("Enter receiver UPI ID"), { target: { value: "888888888@ezp" } });
//         fireEvent.change(screen.getByPlaceholderText("Enter UPI Pin"), { target: { value: "12cd" } });  // Invalid 3-digit pin
//         //fireEvent.change(screen.getByPlaceholderText("Amount"), { target: { value: "0" } });  // Invalid amount

//         fireEvent.click(screen.getByText("Pay"));

//         await waitFor(() => {
//             // Checking for error messages - you can make this matcher more flexible
//             expect(screen.getAllByText(/Please enter a valid UPI ID (10-digit number followed by @ezpay)/i)[0]).toBeInTheDocument();
//             expect(screen.getAllByText(/Please enter a valid 4-digit UPI Pin/i)).toBeInTheDocument();
//             //expect(screen.getByText(/Please enter a valid amount greater than zero/i)).toBeInTheDocument();
//         });
//     });
//     //----
//     test("displays error when payment fails", async () => {
//         render(
//           <MemoryRouter>
//             <BankTransaction />
//           </MemoryRouter>
//         );
    
//         // Mock API fetch call to fail
//         global.fetch = jest.fn(() =>
//           Promise.resolve({
//             ok: false,
//             text: () => Promise.resolve("Insufficient funds"),
//           })
//         );
    
//         // Fill in valid data
//         fireEvent.change(screen.getByPlaceholderText("Enter your UPI ID"), {
//           target: { value: "12345678" },
//         });
//         fireEvent.change(screen.getByPlaceholderText("Enter receiver UPI ID"), {
//           target: { value: "ABCD0123456" },
//         });
//         fireEvent.change(screen.getByPlaceholderText("Enter UPI Pin"), {
//           target: { value: "87654321" },
//         });
//         fireEvent.change(screen.getByPlaceholderText("Enter receiver's IFSC code"), {
//           target: { value: "WXYZ0123456" },
//         });
//         fireEvent.change(screen.getByPlaceholderText("Enter UPI Pin"), {
//           target: { value: "1234" },
//         });
//         fireEvent.change(screen.getByPlaceholderText("Amount"), {
//           target: { value: "1000" },
//         });
    
//         // Submit the form
//         fireEvent.click(screen.getByText("PAY"));
    
//         // Expect the navigation to be called with failure
//         await waitFor(() => {
//           expect(mockNavigate).toHaveBeenCalledWith("/bank-transaction-result", {
//             state: {
//               isSuccess: false,
//               reason: "Insufficient funds",
//             },
//           });
//         });
//       });
// });
// //--------
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import UpiPayment from "../Pages/UpiPayment";  // Adjust path if needed
// import { MemoryRouter, useNavigate } from "react-router-dom";

// // Mocking useNavigate from react-router-dom
// jest.mock("react-router-dom", () => ({
//     ...jest.requireActual("react-router-dom"),
//     useNavigate: jest.fn(),
//     useLocation: jest.fn(),
// }));

// describe("UpiPayment Component", () => {
//     const mockNavigate = jest.fn();

//     beforeEach(() => {
//         // Reset the mock before each test
//         mockNavigate.mockReset();

//         // Mock useNavigate to return the mockNavigate function
//         jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(mockNavigate);
//     });

//     test("renders all input fields and the Pay button", () => {
//         render(
//             <MemoryRouter>
//                 <UpiPayment />
//             </MemoryRouter>
//         );

//         expect(screen.getByPlaceholderText("Enter your UPI ID")).toBeInTheDocument();
//         expect(screen.getByPlaceholderText("Enter receiver UPI ID")).toBeInTheDocument();
//         expect(screen.getByPlaceholderText("Enter UPI Pin")).toBeInTheDocument();
//         expect(screen.getByPlaceholderText("Amount")).toBeInTheDocument();
//         expect(screen.getByPlaceholderText("Add a note (optional)")).toBeInTheDocument();
//         expect(screen.getByText("Pay")).toBeInTheDocument();
//     });

//     test("shows error messages for invalid inputs", async () => {
//         render(
//             <MemoryRouter>
//                 <UpiPayment />
//             </MemoryRouter>
//         );

//         // Enter invalid UPI ID and PIN
//         fireEvent.change(screen.getByPlaceholderText("Enter your UPI ID"), { target: { value: "invalid_upi" } });
//         fireEvent.change(screen.getByPlaceholderText("Enter receiver UPI ID"), { target: { value: "invalid_upi" } });
//         fireEvent.change(screen.getByPlaceholderText("Enter UPI Pin"), { target: { value: "123" } });  // Invalid 3-digit pin
//         fireEvent.change(screen.getByPlaceholderText("Amount"), { target: { value: "0" } });  // Invalid amount

//         fireEvent.click(screen.getByText("Pay"));

//         await waitFor(() => {
//             // Checking for error messages
//             expect(screen.getByText("Please enter a valid UPI ID (10-digit number followed by @ezpay)")).toBeInTheDocument();
//             expect(screen.getByText("Please enter a valid 4-digit UPI Pin")).toBeInTheDocument();
//             expect(screen.getByText("Please enter a valid amount greater than zero")).toBeInTheDocument();
//         });
//     });

//     test("navigates to payment result page on successful payment", async () => {
//         render(
//             <MemoryRouter>
//                 <UpiPayment />
//             </MemoryRouter>
//         );

//         // Enter valid data
//         fireEvent.change(screen.getByPlaceholderText("Enter your UPI ID"), { target: { value: "1234567890@ezpay" } });
//         fireEvent.change(screen.getByPlaceholderText("Enter receiver UPI ID"), { target: { value: "0987654321@ezpay" } });
//         fireEvent.change(screen.getByPlaceholderText("Enter UPI Pin"), { target: { value: "1234" } });
//         fireEvent.change(screen.getByPlaceholderText("Amount"), { target: { value: "500" } });
//         fireEvent.change(screen.getByPlaceholderText("Add a note (optional)"), { target: { value: "Test payment" } });

//         // Mock the fetch call to simulate successful payment
//         global.fetch = jest.fn(() =>
//             Promise.resolve({
//                 ok: true,
//                 json: () => Promise.resolve({}),
//             })
//         );

//         fireEvent.click(screen.getByText("Pay"));

//         await waitFor(() => {
//             // Check if the navigate function was called with correct arguments
//             expect(mockNavigate).toHaveBeenCalledWith("/payment-result", {
//                 state: {
//                     receiverUpiId: "0987654321@ezpay",
//                     amount: "500",
//                     paymentStatus: "success",
//                     reason: "",
//                     senderUpiId: "1234567890@ezpay",
//                 },
//             });
//         });
//     });
// });

// import { render, screen, fireEvent,waitFor} from "@testing-library/react";
// import UpiPayment from "../Pages/UpiPayment";
// import { MemoryRouter,useNavigate } from "react-router-dom";
// //import JSDOMEnvironment from "jest-environment-jsdom";
// import { jest } from '@jest/globals';

// // jest.mock("react-router-dom",()=>({
// //     ...jest.requireActual("react-router-dom"),
// //     useNavigate: jest.fn(),
// //     useLocation: jest.fn(),
// // }));
// jest.mock('react-router-dom', () => {
//     const actualReactRouterDom = require('react-router-dom'); // Use require instead of jest.requireActual
//     return {
//       ...actualReactRouterDom,
//       useNavigate: jest.fn(),
//       useLocation: jest.fn(),
//     };
//   });
  
// describe("UpiPayment Component",()=>{
//     const mockNavigate = jest.fn();
//     beforeEach(()=>{
//         mockNavigate.mockReset();
//         jest.spyOn(require("react-router-dom"),"useNavigate").mockReturnValue(mockNavigate);

//     });
//     TestEnvironment("renders all input fields and PAY button",()=>{
//         render(
//             <MemoryRouter>
//                 <UpiPayment/>
//             </MemoryRouter>
//         );
//         expect(screen.getByPlaceholderText("Enter your UPI ID")).toBeInTheDocument();
//         expect(screen.getByPlaceholderText("Enter receiver UPI ID")).toBeInTheDocument();
//         expect(screen.getByPlaceholderText("Enter UPI Pin")).toBeInTheDocument();
//         expect(screen.getByPlaceholderText("Amount")).toBeInTheDocument();
//         expect(screen.getByText("Pay")).toBeInTheDocument();
//     });


// })
/**
 * @file UpiPayment.test.js
 * @description This file contains unit tests for the UpiPayment component, verifying input validation, user interaction,
 * and the handling of successful and failed transactions. It mocks the fetch API to simulate transaction outcomes and uses
 * react-router-dom's useNavigate to ensure correct navigation after the transaction process. The tests cover form submission,
 * displaying error messages, and input field rendering.
 * @author [Amrutha]
 * @date [23-09-2024]
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import UpiPayment from "../Pages/UpiPayment";  // Assuming UpiPayment is located here
import { MemoryRouter } from "react-router-dom"; // For handling navigation

// Mocking useNavigate from react-router-dom
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(), // Mocking useNavigate for navigation
    useLocation: jest.fn(),
}));

describe("UpiPayment Component", () => {
    const mockNavigate = jest.fn(); // Mock function to simulate navigation

    beforeEach(() => {
        // Reset the mock function before each test to avoid test interference
        mockNavigate.mockReset();

        // Mock useNavigate to return the mockNavigate function
        jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(mockNavigate);
    });

    // Test case to verify if all input fields and the "Pay" button are rendered correctly
    test("renders all input fields and the Pay button", () => {
        render(
            <MemoryRouter>
                <UpiPayment />
            </MemoryRouter>
        );

        // Checking for the presence of all input fields
        expect(screen.getByPlaceholderText("Enter your UPI ID")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter receiver UPI ID")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter UPI Pin")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Amount")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Add a note (optional)")).toBeInTheDocument();
        expect(screen.getByText("Pay")).toBeInTheDocument(); // Checking the "Pay" button
    });

    // Test case to verify the behavior when payment fails
    test("displays error when payment fails", async () => {
        render(
            <MemoryRouter>
                <UpiPayment />
            </MemoryRouter>
        );

        // Mock the global fetch call to simulate a failed transaction
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false, // Simulate failure response
                text: () => Promise.resolve("Insufficient funds"),
            })
        );

        // Fill in valid data for the sender, receiver, and amount fields
        fireEvent.change(screen.getByPlaceholderText("Enter your UPI ID"), {
            target: { value: "1234567890@ezpay" }, // Mock sender UPI ID
        });
        fireEvent.change(screen.getByPlaceholderText("Enter receiver UPI ID"), {
            target: { value: "0987654321@ezpay" }, // Mock receiver UPI ID
        });
        fireEvent.change(screen.getByPlaceholderText("Enter UPI Pin"), {
            target: { value: "1234" }, // Mock UPI PIN input
        });
        fireEvent.change(screen.getByPlaceholderText("Amount"), {
            target: { value: "1000" }, // Mock amount input
        });

        // Simulate clicking the "Pay" button to submit the form
        fireEvent.click(screen.getByText("Pay"));

        // Expect navigation to the payment result page with failure reason
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/payment-result", {
                state: {
                    receiverUpiId: "0987654321@ezpay",
                    amount: "1000",
                    paymentStatus: "failed", // Expect failure state
                    reason: "Insufficient funds", // Failure reason from API response
                    senderUpiId: "1234567890@ezpay"
                },
            });
        });
    });

    // Test case to verify the behavior when payment succeeds
    test("navigates to success page when payment succeeds", async () => {
        render(
            <MemoryRouter>
                <UpiPayment />
            </MemoryRouter>
        );

        // Mock the global fetch call to simulate a successful transaction
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true, // Simulate success response
                text: () => Promise.resolve(""),
            })
        );

        // Fill in valid data for the sender, receiver, and amount fields
        fireEvent.change(screen.getByPlaceholderText("Enter your UPI ID"), {
            target: { value: "1234567890@ezpay" }, // Mock sender UPI ID
        });
        fireEvent.change(screen.getByPlaceholderText("Enter receiver UPI ID"), {
            target: { value: "0987654321@ezpay" }, // Mock receiver UPI ID
        });
        fireEvent.change(screen.getByPlaceholderText("Enter UPI Pin"), {
            target: { value: "1234" }, // Mock UPI PIN input
        });
        fireEvent.change(screen.getByPlaceholderText("Amount"), {
            target: { value: "1000" }, // Mock amount input
        });

        // Simulate clicking the "Pay" button to submit the form
        fireEvent.click(screen.getByText("Pay"));

        // Expect navigation to the payment result page with success status
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/payment-result", {
                state: {
                    receiverUpiId: "0987654321@ezpay",
                    amount: "1000",
                    paymentStatus: "success", // Expect success state
                    reason: "", // No failure reason
                    senderUpiId: "1234567890@ezpay"
                },
            });
        });
    });
});
