import axiosClient from "../api/axiosClient";

export const orderService = {
  createOrder: async (orderData: {
    shippingAddress: string;
    buyerName: string;
    buyerPhone: string;
    buyerEmail?: string;
    note?: string;
  }) => {
    const response = await axiosClient.post("/orders", orderData);
    return response.data;
  },
};
