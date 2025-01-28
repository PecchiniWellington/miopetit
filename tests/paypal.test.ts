import { createOrder } from "@/lib/actions/order.action";
import { generateAccessToken, paypal } from "../lib/paypal";

// Test to generate access token from PayPal
test("generate access token from PayPal", async () => {
  const tokenResponse = await generateAccessToken();

  expect(typeof tokenResponse).toBe("string");
  expect(tokenResponse.length).toBeGreaterThan(0);
});

// Test to create an order with PayPal
test("create an order with PayPal", async () => {
  const token = await generateAccessToken();
  const price = 10.0;
  const orderResponse = await paypal.createOrder(price);

  console.log("OrderResponse: ", orderResponse);
  console.log("token: ", token);

  expect(orderResponse).toHaveProperty("id");
  expect(orderResponse).toHaveProperty("status");
  expect(orderResponse.status).toBe("CREATED");
  expect(orderResponse.id).toBeDefined();
});

// Test to capture payment with PayPal
test("simulate capturing a payment with PayPal", async () => {
  const orderId = "100";

  const mockCapturePayment = jest
    .spyOn(paypal, "capturePayment")
    .mockResolvedValue({
      status: "COMPLETED",
    });

  const captureResponse = await paypal.capturePayment(orderId);
  expect(captureResponse).toHaveProperty("status", "COMPLETED");

  mockCapturePayment.mockRestore();
});
