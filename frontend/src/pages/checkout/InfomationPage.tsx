import { Link } from "react-router";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useCartStore } from "../../store/useCartStore";

const InfomationPage = () => {
  const { items, updateQuantity, totalAmount } = useCartStore();

  return (
    <div>
      <Header />
      <main className="layout-container flex h-full grow flex-col">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="layout-content-container flex flex-col w-full">
            {/* <!-- PageHeading --> */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em] min-w-72 font-display">
                CHECKOUT (Step 1 of 4)
              </p>

              <Link
                className="flex items-center shadow-sm rounded-lg gap-2  font-medium text-sm p-2 text-text-light/80 dark:text-text-dark/80 hover:text-primary dark:hover:text-primary transition-colors"
                to="/cart"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Return Cart
              </Link>
            </div>
            {/* <!-- ProgressBar --> */}
            <div className="flex flex-col gap-3 p-4">
              <div className="flex gap-6 justify-between text-sm font-medium text-secondary-text-light dark:text-secondary-text-dark">
                <p className="text-primary font-bold">1. Cart Review</p>
                <p>2. Shipping</p>
                <p>3. Payment</p>
                <p>4. Confirmation</p>
              </div>
              <div className="rounded bg-primary/20">
                <div
                  className="h-2 rounded bg-primary"
                  style={{ width: "25%" }}
                ></div>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
              {/* <!-- Left Column: Order Summary --> */}
              <div className="lg:col-span-2 bg-card-light dark:bg-card-dark rounded-xl shadow-sm p-6">
                {/* <!-- SectionHeader --> */}
                <h2 className="text-text-light dark:text-text-dark text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4 border-b border-border-light dark:border-border-dark font-display">
                  Order Summary
                </h2>

                <div className="mt-6 flex flex-col divide-y divide-border-light dark:divide-border-dark">
                  {items.length === 0 ? (
                    <div className="py-8 text-center text-gray-500">Giỏ hàng của bạn đang trống.</div>
                  ) : (
                    items.map((item) => {
                      const title = item.book?.title || item.title || `Sách ID: ${item.book_id}`;
                      const authorName = item.book?.author && Array.isArray(item.book.author) 
                        ? item.book.author.map((a: any) => typeof a === 'string' ? a : a.name).join(', ') 
                        : "Unknown Author";
                      const price = item.book?.price || item.price || 0;
                      const imageUrl = item.book?.imageUrl || (item.book?.images && item.book?.images[0]?.url) || item.imageUrl || "/placeholder.jpg";
                      
                      return (
                        <div key={item.book_id} className="flex flex-col sm:flex-row gap-4 py-6">
                          <div className="flex items-start gap-4 flex-grow">
                            <div
                              className="bg-center bg-no-repeat aspect-[2/3] bg-cover rounded h-32 w-auto flex-shrink-0"
                              style={{
                                backgroundImage: `url("${imageUrl}")`,
                              }}
                            ></div>
                            <div className="flex flex-1 flex-col justify-center">
                              <p className="text-text-light dark:text-text-dark text-base font-bold leading-normal font-display line-clamp-2">
                                {title}
                              </p>
                              <p className="text-secondary-text-light dark:text-secondary-text-dark text-sm font-normal leading-normal mt-1 truncate">
                                {authorName}
                              </p>
                              <p className="text-primary text-sm font-medium leading-normal mt-2">
                                {price.toLocaleString("vi-VN")}đ
                              </p>
                            </div>
                          </div>
                          <div className="shrink-0 flex items-center justify-between sm:justify-center sm:flex-col sm:items-end gap-2">
                            <div className="flex items-center gap-2 text-text-light dark:text-text-dark">
                              <button 
                                onClick={() => updateQuantity(item.book_id, Math.max(1, item.quantity - 1))}
                                className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-background-light dark:bg-background-dark cursor-pointer hover:bg-primary/20 transition-colors"
                              >
                                -
                              </button>
                              <span className="text-base font-medium leading-normal w-6 p-0 text-center bg-transparent">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.book_id, item.quantity + 1)}
                                className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-background-light dark:bg-background-dark cursor-pointer hover:bg-primary/20 transition-colors"
                              >
                                +
                              </button>
                            </div>
                            <p className="text-text-light dark:text-text-dark text-base font-bold sm:hidden">
                              {(price * item.quantity).toLocaleString("vi-VN")}đ
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
              {/* <!-- Right Column: Actions & Summary --> */}
              <div className="lg:col-span-1 w-full">
                <div className="sticky top-12 flex flex-col gap-6">
                  {/* <!-- Promo Code Input --> */}
                  <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm p-6">
                    <h3 className="font-bold text-lg font-display text-text-light dark:text-text-dark">
                      Promo Code
                    </h3>
                    <div className="mt-4 flex gap-2">
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark h-12 placeholder:text-secondary-text-light dark:placeholder:text-secondary-text-dark px-4 text-base font-normal leading-normal font-body"
                        placeholder="Enter code"
                        value=""
                      />
                      <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-primary/20 text-primary gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-6 hover:bg-primary/30 transition-colors">
                        Apply
                      </button>
                    </div>
                  </div>
                  {/* <!-- Summary Totals --> */}
                  <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm p-6">
                    <div className="flex justify-between w-full max-w-xs  font-bold text-lg text-text-light dark:text-text-dark">
                      <p>Total:</p>
                      <p>{totalAmount.toLocaleString('vi-VN')}đ</p>
                    </div>
                  </div>
                  {/* <!-- Primary Button --> */}
                  <Link to="/checkout/shipping">
                    <button className="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 bg-primary text-white gap-2 text-lg font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity">
                      Next: Shipping
                      <span className="material-symbols-outlined">
                        arrow_forward
                      </span>
                    </button>
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

export default InfomationPage;

