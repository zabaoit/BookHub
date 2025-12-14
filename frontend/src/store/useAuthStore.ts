import { create } from "zustand";
import { AxiosError } from "axios";
import { authService } from "../services/authService";
import type { AuthState } from "../types/store";
import { toast } from "sonner";

const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,
  clearState: () =>
    set({
      accessToken: null,
      user: null,
      loading: false,
    }),
  register: async (username, email, password) => {
    try {
      set({ loading: true });

      // API call to register user
      const { message } = await authService.register(username, email, password);
      toast.success(message || "Đăng ký thành công!");
      return true;
    } catch (error) {
      // Extract error message from backend response
      if (error instanceof AxiosError && error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      set({ loading: false });
    }
  },

  login: async (email, password) => {
    try {
      set({ loading: true });
      // api call to login user
      const { message, accessToken, user } = await authService.login(
        email,
        password
      );
      set({
        accessToken: accessToken,
        user: user,
      });
      toast.success(message || "Đăng nhập thành công!");
      return true;
    } catch (error) {
      // Extract error message from backend response
      if (error instanceof AxiosError && error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      get().clearState();
      const { message } = await authService.logout();
      toast.success(message || "Đăng xuất thành công!");
    } catch (error) {
      console.log(error);
      toast.error("Đăng xuất thất bại. Vui lòng thử lại.");
    }
  },
  refresh: async () => {},
}));

export default useAuthStore;
