import api from "../libs/axios";

export interface CartItem {
  id?: number;
  cart_id?: number;
  book_id: number;
  quantity: number;
  title?: string;
  price?: number;
  stock?: number;
  imageUrl?: string;
  book?: any; // Dữ liệu sách lấy được từ backend
}

export interface CartResponse {
  id: number;
  user_id: number;
  items: CartItem[];
  totalAmount: number;
}

export const cartService = {
  // Lấy dữ liệu giỏ hàng (yêu cầu đăng nhập)
  getCart: async (): Promise<CartResponse> => {
    const res = await api.get("/cart");
    // Backend returns { data: { cart: { _id, items }, totalAmount, totalItems } }
    const responseData = res.data.data;
    return {
      id: responseData.cart?._id || 0,
      user_id: 0,
      items: responseData.cart?.items || [],
      totalAmount: responseData.totalAmount || 0,
    };
  },

  // Thêm sách vào giỏ
  addToCart: async (bookId: number, quantity: number = 1): Promise<CartResponse> => {
    const res = await api.post("/cart/add", { bookId, quantity });
    return res.data.data;
  },

  // Cập nhật số lượng
  updateCartItem: async (bookId: number, quantity: number): Promise<CartResponse> => {
    const res = await api.put(`/cart/update`, { bookId, quantity });
    return res.data.data;
  },

  // Xóa sách khỏi giỏ
  removeCartItem: async (bookId: number): Promise<CartResponse> => {
    const res = await api.delete(`/cart/remove/${bookId}`);
    return res.data.data;
  },

  // Xóa toàn bộ giỏ
  clearCart: async (): Promise<void> => {
    await api.delete("/cart/clear");
  },
};
