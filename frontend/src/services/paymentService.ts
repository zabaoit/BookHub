import api from "../libs/axios";

export const paymentService = {
  createMoMoPayment: async (data: { orderId: number; amount: number }) => {
    const response = await api.post("/payments/momo/create", data);
    return response.data;
  },
  createVNPayPayment: async (data: { orderId: number; amount: number }) => {
    const response = await api.post("/payments/vnpay/create", data);
    return response.data;
  },
};
