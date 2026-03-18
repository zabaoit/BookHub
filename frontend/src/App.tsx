import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BooksPage from "./pages/books/BooksPage";
import BookDetailPage from "./pages/books/BookDetailPage";
import CartPage from "./pages/checkout/CartPage";
import InfomationPage from "./pages/checkout/InfomationPage";
import ShippingAddressPage from "./pages/checkout/ShippingAddressPage";
import PaymentPage from "./pages/checkout/PaymentPage";
import ReviewPage from "./pages/checkout/ReviewPage";
import OrderSuccessPage from "./pages/checkout/OrderSuccessPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProfilePage from "./pages/user/ProfilePage";
import OrderHistory from "./pages/user/OrderHistory";
import OrderDetail from "./pages/user/OrderDetail";
import AddressManagement from "./pages/user/AddressManagement";
import WishlistPage from "./pages/user/WishlistPage";
import ForgotPassWord from "./pages/auth/ForgotPassWord";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ProtectedRoute from "./pages/auth/ProtectedRoute ";
import useAuthStore from "./store/useAuthStore";
import { useCartStore } from "./store/useCartStore";

const App = () => {
  const { initAuth, isInitialized } = useAuthStore();
  const { fetchCart } = useCartStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    if (isInitialized) {
      fetchCart();
    }
  }, [isInitialized, fetchCart]);

  if (!isInitialized) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" richColors closeButton duration={3000} />
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/booklist" element={<BooksPage />} />
          <Route path="/bookdetail/:id" element={<BookDetailPage />} />
          <Route path="cart" element={<CartPage />} />

          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassWord />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* private routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout/information" element={<InfomationPage />} />
            <Route
              path="/checkout/shipping"
              element={<ShippingAddressPage />}
            />
            <Route path="/checkout/payment" element={<PaymentPage />} />
            <Route path="/checkout/review" element={<ReviewPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />

            <Route path="/account/profile" element={<ProfilePage />} />
            <Route path="/account/order-history" element={<OrderHistory />} />
            <Route path="/account/order-history/:id" element={<OrderDetail />} />
            <Route
              path="/account/address-management"
              element={<AddressManagement />}
            />
            <Route path="/account/wishlist" element={<WishlistPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

