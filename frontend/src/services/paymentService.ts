import axiosClient from "../api/axiosClient";

export const paymentService = {
  createMoMoPayment: async (data: { orderId: number; amount: number }) => {
    const response = await axiosClient.post("/payments/momo/create", data);
    return response.data;
  },
  createVNPayPayment: async (data: { orderId: number; amount: number }) => {
    const response = await axiosClient.post("/payments/vnpay/create", data);
    return response.data;
  },
};
