import { useState, type CSSProperties } from "react";
import { Link } from "react-router";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useCartStore } from "../../store/useCartStore";

const PaymentPage = () => {
  const { totalAmount, setCheckoutData } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState("VNPAY");
  const shippingFee = 30000;
  return (
    <div>
      <Header />
      <main className="layout-container flex h-full grow flex-col">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="layout-content-container flex flex-col w-full">
            {/* <!-- PageHeading --> */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em] min-w-72 font-display">
                CHECKOUT (Step 3 of 4)
              </p>

              <Link
                className="flex items-center shadow-sm rounded-lg gap-2  font-medium text-sm p-2 text-text-light/80 dark:text-text-dark/80 hover:text-primary dark:hover:text-primary transition-colors"
                to="/checkout/shipping"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Return to Shipping
              </Link>
            </div>
            {/* <!-- ProgressBar --> */}
            <div className="flex flex-col gap-3 p-4">
              <div className="flex gap-6 justify-between text-sm font-medium text-secondary-text-light dark:text-secondary-text-dark">
                <p>1. Cart Review</p>
                <p>2. Shipping</p>
                <p className="text-primary font-bold">3. Payment</p>
                <p>4. Confirmation</p>
              </div>
              <div className="rounded bg-primary/20">
                <div
                  className="h-2 rounded bg-primary"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
              <div className="lg:col-span-2">
                <div className="flex flex-col gap-8">
                  {/* <!-- Payment Method Section --> */}
                  <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-sm p-6">
                    <h2 className="text-text-light dark:text-text-dark text-2xl font-bold font-heading leading-tight tracking-[-0.015em] pb-4 border-b border-border-light dark:border-border-dark mb-6">
                      Payment Method
                    </h2>
                    <div
                      className="flex flex-col gap-3"
                      style={
                        {
                          "--radio-dot-svg":
                            "url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27%238B4513%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%274%27/%3e%3c/svg%3e');",
                        } as CSSProperties
                      }
                    >
                      <label className="flex items-center gap-4 rounded border border-solid border-border-light dark:border-border-dark p-4 cursor-pointer hover:border-primary/50 dark:hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:dark:bg-primary/10 transition-colors">
                        <input
                          className="h-5 w-5 border-2 border-border-light dark:border-border-dark bg-transparent text-transparent checked:border-primary checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-card-light dark:focus:ring-offset-card-dark"
                          name="payment-method"
                          type="radio"
                          value="Momo"
                          checked={paymentMethod === "Momo"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal flex-grow">
                          Momo
                        </p>
                      </label>
                      <label className="flex items-center gap-4 rounded border border-solid border-border-light dark:border-border-dark p-4 cursor-pointer hover:border-primary/50 dark:hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:dark:bg-primary/10 transition-colors">
                        <input
                          className="h-5 w-5 border-2 border-border-light dark:border-border-dark bg-transparent text-transparent checked:border-primary checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-card-light dark:focus:ring-offset-card-dark"
                          name="payment-method"
                          type="radio"
                          value="VNPAY"
                          checked={paymentMethod === "VNPAY"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal flex-grow">
                          VNPAY
                        </p>
                      </label>

                      <label className="flex items-center gap-4 rounded border border-solid border-border-light dark:border-border-dark p-4 cursor-pointer hover:border-primary/50 dark:hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:dark:bg-primary/10 transition-colors">
                        <input
                          className="h-5 w-5 border-2 border-border-light dark:border-border-dark bg-transparent text-transparent checked:border-primary checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-card-light dark:focus:ring-offset-card-dark"
                          name="payment-method"
                          type="radio"
                          value="COD"
                          checked={paymentMethod === "COD"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal flex-grow">
                          Cash on Delivery (COD)
                        </p>
                      </label>
                    </div>
                  </div>
                  {/* <!-- Billing Address Section --> */}
                  {/* <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-sm p-6">
                  <h2 className="text-text-light dark:text-text-dark text-2xl font-bold font-heading leading-tight tracking-[-0.015em] pb-4 border-b border-border-light dark:border-border-dark mb-6">
                    Billing Address
                  </h2>
                  <div className="flex flex-col gap-4">
                    <label className="flex items-center gap-3 p-3 rounded bg-background-light dark:bg-background-dark">
                      <input
                        // checked=""
                        className="h-5 w-5 rounded border-border-light text-primary focus:ring-primary/50"
                        type="checkbox"
                      />
                      <span className="text-sm font-medium text-text-light dark:text-text-dark">
                        My billing address is the same as my shipping address
                      </span>
                    </label>
                  </div>
                </div> */}
                </div>
              </div>
              {/* <!-- Order Summary --> */}
              <div className="lg:col-span-1">
                <div className="sticky top-10">
                  <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-sm p-6">
                    <h2 className="text-text-light dark:text-text-dark text-xl font-bold font-heading leading-tight tracking-[-0.015em] pb-4 border-b border-border-light dark:border-border-dark mb-6">
                      Order Summary
                    </h2>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-light/80 dark:text-text-dark/80">
                          Subtotal
                        </span>
                        <span className="font-medium">{totalAmount.toLocaleString("vi-VN")}đ</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-light/80 dark:text-text-dark/80">
                          Shipping
                        </span>
                        <span className="font-medium">{shippingFee.toLocaleString("vi-VN")}đ</span>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-border-light dark:border-border-dark">
                      <div className="flex justify-between items-baseline font-bold">
                        <span className="text-lg">Total</span>
                        <span className="text-2xl text-primary">{(totalAmount + shippingFee).toLocaleString("vi-VN")}đ</span>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Link
                        to="/checkout/review"
                        onClick={() => {
                          setCheckoutData({ paymentMethod });
                        }}
                        className="w-full flex items-center justify-center bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-card-light dark:focus:ring-offset-card-dark transition-colors text-base"
                      >
                        Next: Review &amp; Pay
                      </Link>
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

export default PaymentPage;

