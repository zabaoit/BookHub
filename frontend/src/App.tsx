import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import BookDetailPage from "./pages/BookDetailPage";
import CartPage from "./pages/CartPage";
import ShippingAddressPage from "./pages/ShippingAddressPage";
import PaymentPage from "./pages/PaymentPage";
import ReviewPage from "./pages/ReviewPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import InfomationPage from "./pages/InfomationPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/booklist" element={<BooksPage />} />
          <Route path="/bookdetail/:id" element={<BookDetailPage />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="/checkout/information" element={<InfomationPage />} />
          <Route path="/checkout/shipping" element={<ShippingAddressPage />} />
          <Route path="/checkout/payment" element={<PaymentPage />} />
          <Route path="/checkout/review" element={<ReviewPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />

          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
