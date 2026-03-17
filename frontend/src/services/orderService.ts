import api from "../libs/axios";

export const orderService = {
  createOrder: async (orderData: {
    shippingAddress: string;
    buyerName: string;
    buyerPhone: string;
    buyerEmail?: string;
    note?: string;
  }) => {
    const response = await api.post("/orders", orderData);
    return response.data;
  },
};
