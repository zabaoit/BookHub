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
};
