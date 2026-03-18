import api from "../libs/axios";

export const orderService = {
  createOrder: async (orderData: {
    shippingAddress: string;
    buyerName: string;
    buyerPhone: string;
    buyerEmail?: string;
    note?: string;
    promoCode?: string;
  }) => {
    const response = await api.post("/orders", orderData);
    return response.data;
  },

  getUserOrders: async (params?: { page?: number; limit?: number; status?: string }) => {
    const response = await api.get("/orders", { params });
    return response.data;
  },

  getOrderById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
};
