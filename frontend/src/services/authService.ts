import api from "../libs/axios";

export const authService = {
  register: async (username: string, email: string, password: string) => {
    const res = await api.post(
      "/auth/register",
      { username, email, password },
      { withCredentials: true }
    );
    return res.data;
  },

  login: async (email: string, password: string) => {
    const res = await api.post(
      "/auth/login",
      { email, password },
      { withCredentials: true }
    );
    return res.data;
  },

  logout: async () => {
    const res = await api.post("/auth/logout", {}, { withCredentials: true });
    return res.data;
  },
};
