import api from "../libs/axios";

export interface AdminOrder {
  _id: string;
  buyerName: string;
  buyerEmail?: string;
  buyerPhone: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
  items?: Array<{
    _id: string;
    quantity: number;
    priceAtPurchase: number;
    book: {
      _id: string;
      title: string;
      imageUrl?: string;
      price: number;
      stock: number;
    } | null;
  }>;
}

export interface AdminCategory {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  _id: string;
  username: string;
  email: string;
  phone?: string;
  birthday?: string;
  gender?: string;
  role: string;
  createdAt: string;
}

export const adminService = {
  getBooks: async (page = 1, limit = 50) => {
    const response = await api.get("/books", {
      params: { page, limit, sortBy: "newest" },
    });
    return response.data;
  },

  getOrders: async (page = 1, limit = 20) => {
    const response = await api.get("/orders/admin/all", {
      params: { page, limit },
    });
    return response.data;
  },

  getCategories: async (page = 1, limit = 100) => {
    const response = await api.get("/categories", {
      params: { page, limit },
    });
    return response.data;
  },

  updateCategory: async (id: string, payload: { name?: string; slug?: string }) => {
    const response = await api.put(`/categories/${id}`, payload);
    return response.data;
  },

  deleteCategory: async (id: string) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },

  getUsers: async (page = 1, limit = 20, params?: { search?: string; role?: string }) => {
    const response = await api.get("/users/admin/all", {
      params: { page, limit, ...params },
    });
    return response.data;
  },

  updateUser: async (id: string, payload: { username?: string; email?: string; role?: string }) => {
    const response = await api.put(`/users/admin/${id}`, payload);
    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await api.delete(`/users/admin/${id}`);
    return response.data;
  },

  updateOrderStatus: async (id: string, payload: { status?: string; paymentStatus?: string }) => {
    const response = await api.put(`/orders/admin/${id}/status`, payload);
    return response.data;
  },

  cancelOrder: async (id: string, cancelReason?: string) => {
    const response = await api.put(`/orders/${id}/cancel`, { cancelReason });
    return response.data;
  },

  deleteBook: async (id: string) => {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  },

  updateBook: async (id: string, payload: unknown) => {
    const response = await api.put(`/books/${id}`, payload);
    return response.data;
  },

  createBook: async (payload: unknown) => {
    const response = await api.post("/books", payload);
    return response.data;
  },

  createUser: async (payload: { username: string; email: string; password: string; role?: string }) => {
    const response = await api.post("/users/admin", payload);
    return response.data;
  },
};
