import { Link } from "react-router";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useCartStore } from "../../store/useCartStore";

const ShippingAddressPage = () => {
  const { items, totalAmount } = useCartStore();
  const shippingFee = 5.00;

  return (
    <div>
      <Header />

      <main className="layout-container flex h-full grow flex-col">
          <div className="layout-content-container flex flex-col w-full">
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em] min-w-72 font-display">
                CHECKOUT (Step 2 of 4)
              </p>

              <Link
                className="flex items-center gap-2 shadow-sm rounded-lg  font-medium text-sm p-2 text-text-light/80 dark:text-text-dark/80 hover:text-primary dark:hover:text-primary transition-colors"
                to="/checkout/information"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Return to Information
              </Link>
            </div>
            {/* <!-- ProgressBar --> */}
            <div className="flex flex-col gap-3 p-4">
              <div className="flex gap-6 justify-between text-sm font-medium text-secondary-text-light dark:text-secondary-text-dark">
                <p>1. Cart Review</p>
                <p className="text-primary font-bold">2. Shipping</p>
                <p>3. Payment</p>
                <p>4. Confirmation</p>
              </div>
              <div className="rounded bg-primary/20">
                <div
                  className="h-2 rounded bg-primary"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>
            {/* <!-- Progress Bar --> */}

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
              {/* <!-- Left Column: Shipping Details --> */}
              <div className="lg:col-span-2 flex flex-col gap-10 lg:pl-8">
                <div className="flex flex-col gap-8">
                  {/* <!-- Shipping Address Form --> */}
                  <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg border border-border-light dark:border-border-dark">
                    <h2 className="text-xl font-bold font-heading leading-tight tracking-tight mb-6">
                      Shipping Address
                    </h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <label className="flex flex-col gap-2 md:col-span-2">
                        <p className="text-sm font-medium">Saved Addresses</p>
                        <select className="form-input w-full rounded border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary placeholder:text-muted-light dark:placeholder:text-muted-dark h-12 px-4 text-base">
                          <option value="">Add a new address</option>
                          <option value="1">
                            123 Bookworm Lane, Reading, PA 19601
                          </option>
                          <option value="2">
                            456 Paperback Rd, Austin, TX 78701
                          </option>
                        </select>
                      </label>
                      <label className="flex flex-col gap-2">
                        <p className="text-sm font-medium">Full Name</p>
                        <input
                          className="form-input w-full rounded border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary placeholder:text-muted-light dark:placeholder:text-muted-dark h-12 px-4 text-base"
                          placeholder="Jane Doe"
                          type="text"
                        />
                      </label>
                      <label className="flex flex-col gap-2">
                        <p className="text-sm font-medium">Phone Number</p>
                        <input
                          className="form-input w-full rounded border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary placeholder:text-muted-light dark:placeholder:text-muted-dark h-12 px-4 text-base"
                          placeholder="0901 234 567"
                          type="tel"
                        />
                      </label>
                      <label className="flex flex-col gap-2 md:col-span-1">
                        <p className="text-sm font-medium">Province / City</p>
                        <select className="form-input w-full rounded border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary placeholder:text-muted-light dark:placeholder:text-muted-dark h-12 px-4 text-base">
                          <option value="">Add a new Province / City</option>
                          <option value="1">
                            Hà Nội
                          </option>
                        </select>
                      </label>
                      <label className="flex flex-col gap-2 md:col-span-1">
                        <p className="text-sm font-medium">Ward / Commune</p>
                        <select className="form-input w-full rounded border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary placeholder:text-muted-light dark:placeholder:text-muted-dark h-12 px-4 text-base">
                          <option value="">Add a new Ward / Commune</option>
                          <option value="1">
                            Phường 1
                          </option>
                        </select>
                      </label>

                      <label className="flex flex-col gap-2 md:col-span-2">
                        <p className="text-sm font-medium">Specific Address</p>
                        <input
                          className="form-input w-full rounded border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary placeholder:text-muted-light dark:placeholder:text-muted-dark h-12 px-4 text-base"
                          placeholder="123 Storybook Street"
                          type="text"
                        />
                      </label>

                      <div className="flex items-center gap-3 md:col-span-2">
                        <input
                          className="form-checkbox h-5 w-5 rounded text-primary focus:ring-primary border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark"
                          id="save-address"
                          type="checkbox"
                        />
                        <label className="text-sm" htmlFor="save-address">
                          Save as default address
                        </label>
                      </div>
                    </form>
                  </div>

                  {/* <!-- Shipping Method --> */}
                </div>
              </div>
              {/* <!-- Right Column: Order Summary --> */}

              <div className="lg:col-span-1 lg:pr-8">
                <div className="sticky top-12">
                  <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg border border-border-light dark:border-border-dark flex flex-col gap-6">
                    <h2 className="text-xl font-bold font-heading leading-tight tracking-tight border-b border-border-light dark:border-border-dark pb-4">
                      Order Summary
                    </h2>
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
                    <div className="flex flex-col gap-3 pt-4 border-t border-border-light dark:border-border-dark">
                      <div className="flex justify-between text-sm">
                        <p className="text-muted-light dark:text-muted-dark">
                          Subtotal
                        </p>
                        <p className="font-medium">{totalAmount.toLocaleString("vi-VN")}đ</p>
                      </div>
                      <div className="flex justify-between text-sm">
                        <p className="text-muted-light dark:text-muted-dark">
                          Shipping
                        </p>
                        <p className="font-medium">{shippingFee.toLocaleString("vi-VN")}đ</p>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-3 border-t border-border-light dark:border-border-dark">
                        <p>Total</p>
                        <p>{(totalAmount + shippingFee).toLocaleString("vi-VN")}đ</p>
                      </div>
                    </div>
                    <Link
                      to="/checkout/payment"
                      className="w-full flex items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-bold hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark"
                    >
                      Next: Payment
                    </Link>
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

export default ShippingAddressPage;

