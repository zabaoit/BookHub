import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useCartStore } from "../../store/useCartStore";
import { orderService } from "../../services/orderService";
import { paymentService } from "../../services/paymentService";
import { toast } from "sonner";

const ReviewPage = () => {
  const { items, totalAmount, checkoutData, clearCart, clearCheckoutData } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const shippingFee = 30000;

  if (!checkoutData.shippingAddress) {
    return <Navigate to="/checkout/shipping" replace />;
  }

  const { fullName, phoneNumber, specificAddress, wardCommune, provinceCity } = checkoutData.shippingAddress;
  const fullAddressString = `${specificAddress}, ${wardCommune}, ${provinceCity}`;

  const handleConfirmAndPay = async () => {
    setIsProcessing(true);
    try {
      // 1. Create the Order
      const orderResponse = await orderService.createOrder({
        shippingAddress: fullAddressString,
        buyerName: fullName,
        buyerPhone: phoneNumber,
      });

      const orderData = orderResponse.data;
      const orderId = orderData.id;
      const totalPayAmount = totalAmount + shippingFee;

      // 2. Clear Cart eagerly if COD, otherwise we clear it too (assuming they'll leave the page)
      // If we want to keep it in case they cancel MoMo, we wouldn't clear here. 
      // Assuming clearing here is fine since order is created.
      await clearCart();
      clearCheckoutData();

      // 3. Handle Payment Routing
      const paymentMethod = checkoutData.paymentMethod;

      if (paymentMethod === "COD" || !paymentMethod) {
        toast.success("Đặt hàng thành công!");
        navigate("/order-success");
      } else if (paymentMethod === "Momo") {
        toast.loading("Đang chuyển hướng sang MoMo...", { id: "payment-redirect" });
        const paymentRes = await paymentService.createMoMoPayment({
          orderId,
          amount: totalPayAmount,
        });
        if (paymentRes.data && paymentRes.data.paymentUrl) {
          window.location.href = paymentRes.data.paymentUrl;
        } else {
          throw new Error("Không lấy được link thanh toán MoMo.");
        }
      } else if (paymentMethod === "VNPAY") {
        toast.loading("Đang chuyển hướng sang VNPAY...", { id: "payment-redirect" });
        const paymentRes = await paymentService.createVNPayPayment({
          orderId,
          amount: totalPayAmount,
        });
        if (paymentRes.data && paymentRes.data.paymentUrl) {
          window.location.href = paymentRes.data.paymentUrl;
        } else {
          throw new Error("Không lấy được link thanh toán VNPAY.");
        }
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.dismiss("payment-redirect");
      toast.error(error.response?.data?.message || error.message || "Lỗi khi xử lý thanh toán.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <Header />
      <main className="layout-container flex h-full grow flex-col">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="layout-content-container flex flex-col w-full">
            {/* <!-- PageHeading --> */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em] min-w-72 font-display">
                CHECKOUT (Step 4 of 4)
              </p>

              <Link
                className="flex items-center shadow-sm rounded-lg gap-2  font-medium text-sm p-2 text-text-light/80 dark:text-text-dark/80 hover:text-primary dark:hover:text-primary transition-colors"
                to="/checkout/payment"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Return to Payment
              </Link>
            </div>
            {/* <!-- ProgressBar --> */}
            <div className="flex flex-col gap-3 p-4">
              <div className="flex gap-6 justify-between text-sm font-medium text-secondary-text-light dark:text-secondary-text-dark">
                <p>1. Cart Review</p>
                <p>2. Shipping</p>
                <p>3. Payment</p>
                <p className="text-primary font-bold">4. Confirmation</p>
              </div>
              <div className="rounded bg-primary/20">
                <div
                  className="h-2 rounded bg-primary"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center pb-3 border-b border-border-light dark:border-border-dark mb-4">
                    <h2 className="font-heading text-xl font-bold text-text-light dark:text-text-dark">
                      Shipping Information
                    </h2>
                    <a
                      className="text-sm font-medium text-primary hover:underline"
                      href="#"
                    >
                      Edit
                    </a>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-x-6 gap-y-4">
                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                      Full Name
                    </p>
                    <p className="text-text-light dark:text-text-dark text-sm font-medium">
                      {fullName}
                    </p>
                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                      Phone
                    </p>
                    <p className="text-text-light dark:text-text-dark text-sm font-medium">
                      {phoneNumber}
                    </p>
                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                      Address
                    </p>
                    <p className="text-text-light dark:text-text-dark text-sm font-medium">
                      {fullAddressString}
                    </p>
                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                      Method
                    </p>
                    <p className="text-text-light dark:text-text-dark text-sm font-medium">
                      Standard Shipping
                    </p>
                  </div>
                </div>
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center pb-3 border-b border-border-light dark:border-border-dark mb-4">
                    <h2 className="font-heading text-xl font-bold text-text-light dark:text-text-dark">
                      Payment Method
                    </h2>
                    <a
                      className="text-sm font-medium text-primary hover:underline"
                      href="#"
                    >
                      Edit
                    </a>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-x-6 gap-y-4">
                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                      Method
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-green-600">
                        account_balance_wallet
                      </span>
                      <p className="text-text-light dark:text-text-dark text-sm font-medium">
                        {checkoutData.paymentMethod || "Not Selected"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-12">
                  <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg border border-border-light dark:border-border-dark flex flex-col gap-6">
                    <h2 className="text-xl font-bold font-heading leading-tight tracking-tight border-b border-border-light dark:border-border-dark pb-4">
                      Order Summary
                    </h2>
                    {/* <div className="space-y-4 mb-6 flex flex-col gap-4 max-h-56 overflow-y-auto pr-2">
                    <div className="flex items-start gap-4">
                      <img
                        className="w-16 h-24 object-cover rounded"
                        data-alt="The Midnight Library book cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9o9FwjUBJH5amot6oarvHkKBMP_ieKA5g5yggQXQnaRjgrOUo1jlPgVeKND6Gok-ao07wGbEikrfwEkQl_NVljoBYfh69trgzJvGIVmXB0Xz1MZuWGJlXmVW_vvsAA9aWAmS6HA4LggPfKKFrq1uhCNNKimpHaP2kLQUbaHZuQq3dhl8-wfik0swItqd6qG7z5O9QZ9TDeqhmoTzXlIB6sUUfxTMF9NBuhv6fKoS8POntzXBxmPEs8rWlQP_Bzh0tK40Ft3Ce94k3"
                      />
                      <div className="flex-grow">
                        <p className="text-sm font-medium text-text-light dark:text-text-dark">
                          The Midnight Library
                        </p>
                        <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
                          Qty: 1
                        </p>
                      </div>
                      <p className="text-sm font-medium text-text-light dark:text-text-dark">
                        $15.99
                      </p>
                    </div>
                    <div className="flex items-start gap-4">
                      <img
                        className="w-16 h-24 object-cover rounded"
                        data-alt="The Vanishing Half book cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB04yI0LwP3ckmPTL4j-aSwsg6sWi6Mx3OSljHrmcdHAzQLt8YS-MwsMAk17cFmMcMoid4blk-8fmWiVYoZmbzhk2yCWGJ_tPdVDaWaRiFQu7_0cGhwByVK8f11d_7ck6brNVxMRwCZxwSgpt0froK3QVLIVmuv55UZpC1fQ2UPyPkFdPXxBzqu05TTVpJZQ0lFETxtTjw0ygUnp_Ucrk4W8cCnB-ey2As9ZkwO8cnZUNPpxZh_pXD9GyB4qVrdYus7Y8R_SliKIumZ"
                      />
                      <div className="flex-grow">
                        <p className="text-sm font-medium text-text-light dark:text-text-dark">
                          The Vanishing Half
                        </p>
                        <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
                          Qty: 1
                        </p>
                      </div>
                      <p className="text-sm font-medium text-text-light dark:text-text-dark">
                        $18.50
                      </p>
                    </div>
                  </div> */}
                    <div className="flex flex-col gap-4 max-h-56 overflow-y-auto pr-2">
                      {items.map((item) => {
                        const title = item.book?.title || item.title || `Sách ID: ${item.book_id}`;
                        const price = item.book?.price || item.price || 0;
                        const imageUrl = item.book?.imageUrl || (item.book?.images && item.book?.images[0]?.url) || item.imageUrl || "/placeholder.jpg";
                        
                        return (
                          <div key={item.book_id} className="flex items-center gap-4">
                            <img
                              alt={title}
                              className="w-16 h-24 object-cover rounded"
                              src={imageUrl}
                            />
                            <div className="flex-1">
                              <p className="font-bold text-sm line-clamp-2">
                                {title}
                              </p>
                              <p className="text-sm text-muted-light dark:text-muted-dark">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <p className="font-medium">{(price * item.quantity).toLocaleString("vi-VN")}đ</p>
                          </div>
                        );
                      })}
                    </div>
                    {/*  */}
                    <div className="flex flex-col gap-3 pt-4 border-t border-border-light dark:border-border-dark">
                      <div className="flex justify-between text-sm">
                        <p className="text-text-muted-light dark:text-text-muted-dark">
                          Books Subtotal
                        </p>
                        <p className="text-text-light dark:text-text-dark">
                          {totalAmount.toLocaleString("vi-VN")}đ
                        </p>
                      </div>
                      <div className="flex justify-between text-sm">
                        <p className="text-text-muted-light dark:text-text-muted-dark">
                          Shipping
                        </p>
                        <p className="text-text-light dark:text-text-dark">
                          {shippingFee.toLocaleString("vi-VN")}đ
                        </p>
                      </div>
                      {/* Discount */}
                      {/* <div className="flex justify-between text-sm text-green-600">
                      <p>Discount</p>
                      <p>-$5.00</p>
                      </div> */}
                      <div className="flex justify-between text-lg font-bold pt-2 border-t border-border-light dark:border-border-dark mt-2 text-text-light dark:text-text-dark">
                        <p>TOTAL</p>
                        <p>{(totalAmount + shippingFee).toLocaleString("vi-VN")}đ</p>
                      </div>
                    </div>
                    <div className="flex flex-col mt-2 space-y-3">
                      <button
                        onClick={handleConfirmAndPay}
                        disabled={isProcessing}
                        className={`w-full flex items-center justify-center text-white font-bold py-3 px-4 rounded-lg transition-colors ${
                          isProcessing ? "bg-primary/70 cursor-not-allowed" : "bg-primary hover:bg-primary/90"
                        }`}
                      >
                        {isProcessing ? (
                          <span className="flex items-center gap-2">
                            <span className="material-symbols-outlined animate-spin">
                              progress_activity
                            </span>
                            Đang xử lý...
                          </span>
                        ) : (
                          "Confirm & Pay"
                        )}
                      </button>
                      <Link
                        to="/cart"
                        className="w-full bg-transparent flex items-center justify-center border border-primary text-primary font-bold py-3 px-4 rounded-lg hover:bg-primary/10 transition-colors"
                      >
                        Back to Cart
                      </Link>

                      <a className="w-full flex items-center justify-center text-text-muted-light dark:text-text-muted-dark font-medium text-sm py-2 hover:underline hover:cursor-pointer">
                        Cancel
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReviewPage;

