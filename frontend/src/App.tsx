import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import HomePage from "./pages/HomePage";
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
import AddressManagement from "./pages/user/AddressManagement";
import ForgotPassWord from "./pages/auth/ForgotPassWord";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ProtectedRoute from "./pages/auth/ProtectedRoute ";

const App = () => {
  return (
    <>
      <Toaster position="top-right" richColors closeButton duration={3000} />
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<HomePage />} />
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
            <Route
              path="/account/address-management"
              element={<AddressManagement />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
