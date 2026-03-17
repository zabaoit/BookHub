import { create } from "zustand";
import type { CartItem } from "../services/cartService";
import { cartService } from "../services/cartService";
import { toast } from "sonner";
import useAuthStore from "./useAuthStore";

interface CartState {
  items: CartItem[];
  totalAmount: number;
  isLoading: boolean;
  isOpen: boolean;
  
  // Actions
  fetchCart: () => Promise<void>;
  addToCart: (bookId: number | string, quantity?: number) => Promise<void>;
  updateQuantity: (bookId: number | string, quantity: number) => Promise<void>;
  removeItem: (bookId: number | string) => Promise<void>;
  clearCart: () => Promise<void>;
  setIsOpen: (isOpen: boolean) => void;
  toggleCart: () => void;
  syncLocalCartIfLoggedIn: () => Promise<void>;
}

const getLocalCart = (): CartItem[] => {
  try {
    const localCart = localStorage.getItem("guest_cart");
    return localCart ? JSON.parse(localCart) : [];
  } catch (error) {
    return [];
  }
};

const setLocalCart = (items: CartItem[]) => {
  localStorage.setItem("guest_cart", JSON.stringify(items));
};

export const useCartStore = create<CartState>((set, get) => ({
  items: getLocalCart(),
  totalAmount: 0,
  isLoading: false,
  isOpen: false,

  setIsOpen: (isOpen) => set({ isOpen }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  fetchCart: async () => {
    const isAuthenticated = !!useAuthStore.getState().user;
    
    if (isAuthenticated) {
      set({ isLoading: true });
      try {
        const cartData = await cartService.getCart();
        set({ 
          items: cartData.items || [], 
          totalAmount: cartData.totalAmount || 0,
          isLoading: false 
        });
      } catch (error) {
        console.error("Fetch cart error:", error);
        set({ isLoading: false });
      }
    } else {
      // Local cart calculation
      const items = getLocalCart();
      const totalAmount = items.reduce((total, item) => {
         return total + ((item.price || 0) * item.quantity);
      }, 0);
      set({ items, totalAmount });
    }
  },

  addToCart: async (bookIdRaw, quantity = 1) => {
    const isAuthenticated = !!useAuthStore.getState().user;
    const bookId = Number(bookIdRaw);
    
    set({ isLoading: true });
    try {
      if (isAuthenticated) {
        await cartService.addToCart(bookId, quantity);
        await get().fetchCart();
        toast.success("Đã thêm vào giỏ hàng");
      } else {
        // Handle guest cart
        const currentItems = [...get().items];
        const existingItemIndex = currentItems.findIndex(item => item.book_id === bookId);
        
        if (existingItemIndex > -1) {
          currentItems[existingItemIndex].quantity += quantity;
        } else {
          currentItems.push({ book_id: bookId, quantity });
        }
        
        setLocalCart(currentItems);
        // Cần tính lại totalAmount cho guest ngay sau khi thêm
        const totalAmount = currentItems.reduce((total, item) => {
           return total + ((item.price || 0) * item.quantity);
        }, 0);
        set({ items: currentItems, totalAmount });
        toast.success("Đã thêm vào giỏ hàng (Khách)");
      }
    } catch (error: any) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      toast.error(error.response?.data?.message || "Lỗi khi thêm vào giỏ hàng");
    } finally {
      set({ isLoading: false });
    }
  },

  updateQuantity: async (bookIdRaw, quantity) => {
    const isAuthenticated = !!useAuthStore.getState().user;
    const bookId = Number(bookIdRaw);
    
    set({ isLoading: true });
    try {
      if (isAuthenticated) {
        await cartService.updateCartItem(bookId, quantity);
        await get().fetchCart();
      } else {
        const currentItems = [...get().items];
        const existingItemIndex = currentItems.findIndex(item => item.book_id === bookId);
        
        if (existingItemIndex > -1) {
          currentItems[existingItemIndex].quantity = quantity;
          setLocalCart(currentItems);
          await get().fetchCart();
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Lỗi cập nhật số lượng");
    } finally {
      set({ isLoading: false });
    }
  },

  removeItem: async (bookIdRaw) => {
    const isAuthenticated = !!useAuthStore.getState().user;
    const bookId = Number(bookIdRaw);
    
    set({ isLoading: true });
    try {
      if (isAuthenticated) {
        await cartService.removeCartItem(bookId);
        await get().fetchCart();
        toast.success("Đã xóa khỏi giỏ hàng");
      } else {
        const currentItems = get().items.filter(item => item.book_id !== bookId);
        setLocalCart(currentItems);
        await get().fetchCart();
        toast.success("Đã xóa khỏi giỏ hàng");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Lỗi xóa sản phẩm");
    } finally {
      set({ isLoading: false });
    }
  },

  clearCart: async () => {
    const isAuthenticated = !!useAuthStore.getState().user;
    
    set({ isLoading: true });
    try {
      if (isAuthenticated) {
        await cartService.clearCart();
      }
      localStorage.removeItem("guest_cart");
      set({ items: [], totalAmount: 0 });
    } catch (error: any) {
      toast.error("Lỗi xóa giỏ hàng");
    } finally {
      set({ isLoading: false });
    }
  },

  syncLocalCartIfLoggedIn: async () => {
    const isAuthenticated = !!useAuthStore.getState().user;
    const localCart = getLocalCart();
    
    if (isAuthenticated && localCart.length > 0) {
      try {
        for (const item of localCart) {
          await cartService.addToCart(item.book_id, item.quantity);
        }
        localStorage.removeItem("guest_cart");
        await get().fetchCart();
      } catch (error) {
        console.error("Lỗi đồng bộ giỏ hàng:", error);
      }
    } else if (isAuthenticated) {
        await get().fetchCart();
    }
  }
}));
