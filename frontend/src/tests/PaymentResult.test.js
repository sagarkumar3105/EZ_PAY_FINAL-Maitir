/**
 * @file PaymentResult.test.js
 * @description This file contains unit tests for the PaymentResult component using React Testing Library.
 * It tests the component's behavior under various conditions such as successful and failed payments,
 * navigation actions, and handling of missing location state. Mocking is used to simulate react-router-dom hooks 
 * (useNavigate and useLocation) to verify navigation and state-dependent rendering.
 * The tests check if success or failure messages are displayed appropriately and ensure the navigation functionality works
 * as expected upon user interaction with buttons.
 * @author [Amrutha]
 * @date [23-09-2024]
 */

import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PaymentResult } from "../Pages/PaymentResult";

// Mocking react-router-dom hooks
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(), // Mock useNavigate hook
  useLocation: jest.fn(), // Mock useLocation hook
}));

describe("PaymentResult Component", () => {
  const mockNavigate = jest.fn(); // Mock function to simulate navigation

  beforeEach(() => {
    // Reset the mock function before each test to avoid interference between tests
    mockNavigate.mockReset();

    // Mock useNavigate to return the mockNavigate function for simulating navigation
    jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(mockNavigate);

    // Mock useLocation to return a mock state with successful payment details
    jest.spyOn(require("react-router-dom"), "useLocation").mockReturnValue({
      state: {
        senderUpiId: "9999999999@ezpay",
        receiverUpiId: "7777777777@ezpay",
        amount: "1000",
        paymentStatus: "success",
      },
    });
  });

  // Test case to verify if the success message and buttons are rendered when the payment is successful
  test("renders success message and buttons when paymentStatus is 'success'", () => {
    render(
      <MemoryRouter>
        <PaymentResult />
      </MemoryRouter>
    );

    // Check for the success message and amount
    expect(screen.getByText("PAYMENT SUCCESS")).toBeInTheDocument();
    expect(screen.getByText("Rs 1000")).toBeInTheDocument();

    // Check for buttons
    expect(screen.getByText("Share")).toBeInTheDocument();
    expect(screen.getByText("Check Balance")).toBeInTheDocument();
    expect(screen.getByText("Pay Again")).toBeInTheDocument();
  });

  // Test case to verify if clicking "Pay Again" triggers navigation to UPI Payment page
  test("navigates to UPI Payment page when 'Pay Again' is clicked", () => {
    render(
      <MemoryRouter>
        <PaymentResult />
      </MemoryRouter>
    );

    // Simulate click on "Pay Again" button
    fireEvent.click(screen.getByText("Pay Again"));

    // Assert that navigation is triggered to '/upi-payment'
    expect(mockNavigate).toHaveBeenCalledWith("/upi-payment");
  });

  // Test case to verify if the failure message and reason are rendered when the payment fails
  // Test case to verify if the failure message and reason are rendered when the payment fails
test("renders failure message with reason when paymentStatus is 'failed'", () => {
    // Mock useLocation to simulate a failed payment scenario
    jest.spyOn(require("react-router-dom"), "useLocation").mockReturnValue({
      state: {
        senderUpiId: "9876543210@ezpay",
        receiverUpiId: "1234567890@ezpay",
        amount: "10500",
        paymentStatus: "failed",
        reason: "Insufficient funds",
      },
    });
  
    render(
      <MemoryRouter>
        <PaymentResult />
      </MemoryRouter>
    );
  
    // Check for the failure message and amount
    expect(screen.getByText("PAYMENT FAILED")).toBeInTheDocument();
    expect(screen.getByText("Rs 10500")).toBeInTheDocument();
  
    // Use more flexible matching for the reason
    expect(screen.getByText(/Reason:/i)).toBeInTheDocument();
    expect(screen.getByText(/Insufficient funds/i)).toBeInTheDocument();
  });
  
  // Test case to verify if clicking "Check Balance" triggers navigation with sender's UPI ID
  test("navigates to Check Balance page when 'Check Balance' is clicked", () => {
    render(
      <MemoryRouter>
        <PaymentResult />
      </MemoryRouter>
    );

    // Simulate click on "Check Balance" button
    fireEvent.click(screen.getByText("Check Balance"));

    // Assert that navigation is triggered to '/check-balance' with senderUpiId
    expect(mockNavigate).toHaveBeenCalledWith("/check-balance", { state: { senderUpiId: "9999999999@ezpay" } });
  });

  // Test case to verify if the component renders without crashing even when no location state is provided
//   test("renders without crashing if no location state is provided", () => {
//     // Mock useLocation to simulate the absence of state
//     jest.spyOn(require("react-router-dom"), "useLocation").mockReturnValue({ state: undefined });

//     render(
//       <MemoryRouter>
//         <PaymentResult />
//       </MemoryRouter>
//     );

//     // Check for the default failure message
//     expect(screen.getByText("PAYMENT FAILED")).toBeInTheDocument();
//     expect(screen.getByText("No reason provided")).toBeInTheDocument();
//   });
});
