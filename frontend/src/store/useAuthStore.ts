import { create } from "zustand";
import { AxiosError } from "axios";
import { authService } from "../services/authService";
import type { AuthState } from "../types/store";
import { toast } from "sonner";

const useAuthStore = create<AuthState>()((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,
  isInitialized: false,
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
      console.log("User after login:", user);
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

  refresh: async () => {
    try {
      set({ loading: true });
      const { accessToken, user } = await authService.refreshToken();
      set({ accessToken, user });
      return true;
    } catch (err) {
      console.log(err);
      get().clearState();
      return false;
    } finally {
      set({ loading: false });
    }
  },

  initAuth: async () => {
    const { accessToken } = get();
    // Chỉ refresh khi chưa có accessToken (trang vừa load/F5)
    if (accessToken) {
      set({ isInitialized: true });
      return; // Đã có token, không cần refresh
    }

    // Khi app load, thử refresh để lấy accessToken từ refreshToken cookie
    try {
      set({ loading: true });
      const { accessToken: newToken, user } = await authService.refreshToken();
      set({ accessToken: newToken, user, isInitialized: true });
    } catch {
      // Refresh thất bại - không có session
      get().clearState();
      set({ isInitialized: true });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
