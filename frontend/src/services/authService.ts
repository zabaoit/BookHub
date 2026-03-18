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

  requestEmailVerification: async (email: string) => {
    const res = await api.post("/auth/request-email-verification", { email });
    return res.data;
  },

  verifyEmail: async (email: string, code: string) => {
    const res = await api.post("/auth/verify-email", { email, code });
    return res.data;
  },

  verifyResetCode: async (email: string, code: string) => {
    const res = await api.post("/auth/verify-reset-code", { email, code });
    return res.data;
  },

  forgotPassword: async (email: string) => {
    const res = await api.post("/auth/forgot-password", { email });
    return res.data;
  },

  resetPassword: async (email: string, code: string, password: string) => {
    const res = await api.post("/auth/reset-password", { email, code, password });
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

  refreshToken: async () => {
    const res = await api.post(
      "/auth/refresh-token",
      {},
      { withCredentials: true }
    );
    return res.data;
  },
};
