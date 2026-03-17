import api from "../libs/axios";

export const userService = {
  getProfile: async () => {
    const response = await api.get("/users/profile");
    return response.data;
  },

  updateProfile: async (data: {
    username: string;
    phone?: string;
    birthday?: string;
    gender?: string;
  }) => {
    const response = await api.put("/users/profile", data);
    return response.data;
  },

  getAddresses: async () => {
    const response = await api.get("/users/addresses");
    return response.data;
  },

  createAddress: async (data: { fullName: string; phone: string; city: string; ward?: string; specificAddress: string; isDefault?: boolean }) => {
    const response = await api.post("/users/addresses", data);
    return response.data;
  },

  updateAddress: async (id: string, data: { fullName: string; phone: string; city: string; ward?: string; specificAddress: string }) => {
    const response = await api.put(`/users/addresses/${id}`, data);
    return response.data;
  },

  deleteAddress: async (id: string) => {
    const response = await api.delete(`/users/addresses/${id}`);
    return response.data;
  },

  setDefaultAddress: async (id: string) => {
    const response = await api.put(`/users/addresses/${id}/default`);
    return response.data;
  },
};
