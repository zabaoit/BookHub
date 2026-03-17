import { Link } from "react-router";
import { useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useCartStore } from "../../store/useCartStore";

const CartPage = () => {
  const { items, totalAmount, fetchCart, updateQuantity, removeItem, isLoading } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <div>
      <Header />
      <div className="layout-container flex h-full grow flex-col">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="layout-content-container flex flex-col w-full">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="font-display text-primary dark:text-accent text-4xl font-black leading-tight tracking-tighter">
                  Shopping Cart
                </p>
                <Link
                  className="text-muted-light  dark:text-muted-dark text-base font-normal leading-normal hover:text-primary dark:hover:text-accent transition-colors"
                  to="/booklist"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8 mt-8">
              {/* <!-- Left Column: Cart Items --> */}
              <div className="w-full lg:w-2/3">
                <h2 className="font-display text-text-light dark:text-text-dark text-[22px] font-bold leading-tight tracking-tight px-4 pb-3 pt-5 border-b border-border-light dark:border-border-dark">
                  CART ITEMS ({items.length})
                </h2>
                
                <div className="divide-y divide-border-light dark:divide-border-dark">
                  {isLoading ? (
                    <div className="py-8 text-center text-gray-500">Đang tải giỏ hàng...</div>
                  ) : items.length === 0 ? (
                    <div className="py-12 text-center text-gray-500 flex flex-col items-center">
                      <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">shopping_cart</span>
                      <p className="text-xl mb-4">Giỏ hàng của bạn đang trống.</p>
                      <Link
                        to="/booklist"
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        Khám phá sách ngay
                      </Link>
                    </div>
                  ) : (
                    items.map((item) => {
                      // Xử lý dữ liệu sách với guest cart fallback
                      const title = item.book?.title || item.title || `Sách ID: ${item.book_id}`;
                      const price = item.book?.price || item.price || 0;
                      const imageUrl = item.book?.imageUrl || (item.book?.images && item.book?.images[0]?.url) || item.imageUrl || "/placeholder.jpg";
                      
                      return (
                        <div key={item.book_id} className="flex gap-4 bg-transparent px-4 py-6 justify-between items-center">
                          <div className="flex items-start gap-4">
                            <div
                              className="bg-center bg-no-repeat bg-cover rounded h-[100px] w-[80px] flex-shrink-0"
                              style={{
                                backgroundImage: `url("${imageUrl}")`,
                              }}
                            ></div>
                            <div className="flex flex-1 flex-col justify-center gap-1">
                              <p className="text-text-light dark:text-text-dark text-base font-semibold leading-normal line-clamp-2">
                                {title}
                              </p>
                              <p className="text-muted-light dark:text-muted-dark text-sm font-normal leading-normal">
                                {price.toLocaleString("vi-VN")}đ
                              </p>
                              <div className="flex gap-4 mt-2">
                                <button 
                                  onClick={() => removeItem(item.book_id)}
                                  className="text-red-500 hover:text-red-700 text-sm font-normal leading-normal transition-colors"
                                >
                                  Xoá
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="shrink-0 group">
                            <div className="flex items-center gap-2 text-text-light dark:text-text-dark border border-border-light dark:border-border-dark rounded-full overflow-hidden">
                              <button 
                                onClick={() => updateQuantity(item.book_id, Math.max(1, item.quantity - 1))}
                                className="text-base font-medium leading-normal flex h-8 w-8 items-center justify-center hover:bg-primary hover:text-white cursor-pointer transition-colors"
                              >
                                -
                              </button>
                              <span className="text-base font-medium leading-normal w-6 p-0 text-center bg-transparent">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.book_id, item.quantity + 1)}
                                className="text-base font-medium leading-normal flex h-8 w-8 items-center justify-center hover:bg-primary hover:text-white cursor-pointer transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
              
              {/* <!-- Right Column: Order Summary --> */}
              {items.length > 0 && (
                <div className="w-full lg:w-1/3">
                  <div className="sticky top-18">
                    <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-6">
                      <h2 className="font-display text-text-light dark:text-text-dark text-[22px] font-bold leading-tight tracking-tight pb-4 border-b border-border-light dark:border-border-dark">
                        ORDER SUMMARY
                      </h2>
                      <div className="space-y-4 pt-4">
                        <div className="flex justify-between items-center text-muted-light dark:text-muted-dark">
                          <span>Subtotal</span>
                          <span>{totalAmount.toLocaleString("vi-VN")}đ</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center font-bold text-lg text-text-light dark:text-text-dark pt-6 mt-6 border-t border-border-light dark:border-border-dark flex-col items-start gap-1">
                        <div className="flex justify-between items-center w-full text-primary">
                          <span>Total</span>
                          <span className="text-2xl">{totalAmount.toLocaleString("vi-VN")}đ</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 mt-8">
                        <Link
                          to="/checkout/information"
                          className="w-full flex justify-center bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded transition-colors"
                        >
                          Proceed to Checkout
                        </Link>
                        <Link
                          to="/booklist"
                          className="w-full flex justify-center bg-transparent hover:bg-primary/10 text-primary dark:text-accent font-bold py-3 px-4 rounded border border-primary dark:border-accent transition-colors"
                        >
                          Continue Shopping
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* <!-- Recommendations Section --> */}
            <div className="mt-20">
              <h2 className="font-display text-text-light dark:text-text-dark text-2xl font-bold tracking-tight mb-6 px-4">
                YOU MIGHT ALSO LIKE
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
                {/* <!-- Recommended Book 1 --> */}
                <div className="flex flex-col items-center text-center gap-2 group h-full">
                  <div className="w-full  aspect-[2/3] bg-cover bg-center rounded-lg overflow-hidden shadow-md">
                    <img
                      alt="Book cover for The Lincoln Highway"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvtd71QO9KMfrRbcK9hfHXFuXm8M4GFDV5hIZJ8xEEGZQgftP02vicg91P85yLXkG7wVgHDwgUZfPCJB5-BlsvZPr4IqN6W0R267PC483AWWv_oSoAgqUIFlg14BCnOje1-eiDQ0Z5PoDNTXdA-N6c7G0ceQPqkx5B09ELTnvplC5DOkznjs6dVJFjSF3P4hxhf3JCppUrvTrBxt7MtkvA4MKYzuUzLvs-bmmlb-XUzdFLOqxu5Zsf5vPg6NLkC9iaj0RHPgrcAoQ"
                    />
                  </div>
                  <h3 className="font-semibold mt-2 text-text-light dark:text-text-dark">
                    The Lincoln Highway
                  </h3>
                  <p className="text-sm text-muted-light dark:text-muted-dark">
                    $29.99
                  </p>
                  <button className="w-full mt-auto text-sm bg-transparent border border-primary dark:border-accent text-primary dark:text-accent font-semibold py-2 px-4 rounded hover:bg-primary dark:hover:bg-accent hover:text-white dark:hover:text-text-light transition-colors">
                    Add to Cart
                  </button>
                </div>
                {/* <!-- Recommended Book 2 --> */}
                <div className="flex flex-col items-center text-center gap-2 group h-full">
                  <div className="w-full aspect-[2/3] bg-cover bg-center rounded-lg overflow-hidden shadow-md">
                    <img
                      alt="Book cover for The Maid"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-RydwatbiTgKIaemuOiZZzdsJ77T8JgWRVbC5I-P7fk9_ZkbGaxjR-afYQrE9bYm9lRMoAIdGaRUVkZOOoc_-LUqLH6pMoeVO86ML00VQPFO8aqLPL56EeF6X9nm2IUQ3_-aCwW0-gUX4JFzIs_yXb0xowp3jts33QXztcdQOJECjXWkxijUqeYmxRKL0GX1oxNVb_odcBOS-ymg1XByQ2kgoHvEdTgKHxWBUmD1eypn2B1vtBSAoxR9aWfb6JUMg1HCwsDTITks"
                    />
                  </div>
                  <h3 className="font-semibold mt-2  text-text-light dark:text-text-dark">
                    The Maid
                  </h3>
                  <p className="text-sm text-muted-light dark:text-muted-dark">
                    $18.50
                  </p>
                  <button className="w-full mt-auto text-sm bg-transparent border border-primary dark:border-accent text-primary dark:text-accent font-semibold py-2 px-4 rounded hover:bg-primary dark:hover:bg-accent hover:text-white dark:hover:text-text-light transition-colors">
                    Add to Cart
                  </button>
                </div>
                {/* <!-- Recommended Book 3 --> */}
                <div className="flex flex-col items-center text-center gap-2 group h-full">
                  <div className="w-full aspect-[2/3] bg-cover bg-center rounded-lg overflow-hidden shadow-md">
                    <img
                      alt="Book cover for The Invisible Life of Addie LaRue"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-KX1iVVDKUPkN6io41s8Cci2d1M6qbVvR0hXiFKaC2mmzhK818z1fLk3ZYaO2sde6tyA3PyLdgs8SZiCpYvHOkLMq6wp_kv_Lq7GGoqJzNNGp7vHN7d2UfPoqxOQOCnF4jdp7t36qfkMOHXMVjs6rMdjdicNEWkUXAw9dQl4aiuf20L7gLsqMPMpp6WhcHUFIBn_XnL6-WQNxTO8gfXIDpGqE8FT67scPp_qSmS70DwFqMhQNcecD1bC5K04oDEL-AQD2NAMyCeY"
                    />
                  </div>
                  <h3 className="font-semibold mt-2  text-text-light dark:text-text-dark">
                    The Invisible Life of Addie LaRue
                  </h3>
                  <p className="text-sm text-muted-light dark:text-muted-dark">
                    $22.00
                  </p>
                  <button className="w-full mt-auto text-sm bg-transparent border border-primary dark:border-accent text-primary dark:text-accent font-semibold py-2 px-4 rounded hover:bg-primary dark:hover:bg-accent hover:text-white dark:hover:text-text-light transition-colors">
                    Add to Cart
                  </button>
                </div>
                {/* <!-- Recommended Book 4 --> */}
                <div className="flex flex-col items-center text-center gap-2 group h-full">
                  <div className="w-full aspect-[2/3] bg-cover bg-center rounded-lg overflow-hidden shadow-md">
                    <img
                      alt="Book cover for Tomorrow, and Tomorrow, and Tomorrow"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6bfxr0Tt-T3KTtd69LoiauIjHbCro9BzFHXZr_XkkxCnjEN2e74yOz87UvUy35QANr2xQCxf7kjlrEifmgWAZ-BLNgC8gnT6a2m0hQM6eru3UodzRwMkDKgd2wMac0EmhDPY6_Yi5tna4tmvWoJEJ9pDEXmdNcWb8erVjAK_-nTXX9_LvstA1dPQfoe9cR1RG7bXk0UOgplk5RAYWqkNsqEUaNWjOQq4fatK09c-QnTX07dTkqKsdzCERB5_jPM-VqqR3r2ZGRfs"
                    />
                  </div>
                  <h3 className="font-semibold mt-2 text-text-light dark:text-text-dark">
                    Tomorrow, and Tomorrow, and Tomorrow
                  </h3>
                  <p className="text-sm text-muted-light dark:text-muted-dark">
                    $25.00
                  </p>
                  <button className="w-full mt-auto text-sm bg-transparent border border-primary dark:border-accent text-primary dark:text-accent font-semibold py-2 px-4 rounded hover:bg-primary dark:hover:bg-accent hover:text-white dark:hover:text-text-light transition-colors">
                    Add to Cart
                  </button>
                </div>
                {/* <!-- Recommended Book 5 --> */}
                <div className="flex flex-col items-center text-center gap-2 group h-full">
                  <div className="w-full aspect-[2/3] bg-cover bg-center rounded-lg overflow-hidden shadow-md">
                    <img
                      alt="Book cover for The Seven Husbands of Evelyn Hugo"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa64GPSrFMc9-L4IWe94LDzrC_4RSa09Gn-9SiZFmb8c6qmNtBnv4_nIjXxJLA3KMxa7GXFUPz1OWlnCVmhyzA1iyvzlqKuWSQ4ExRpkhw5zYtEYxEsik09_apNDMXoZgWUQMefY10olTFBd3_pGkkOvcTqxQ_LlgaGxGYvNIQP893-AZyJipuI3jEPxsvtxKH8y4xANyEYtJu1GhOipEJIy2VEF23dUrHoCnwjunMutXAv1jTU4iLLNTNJByvn0xheHysiNpsJ3Y"
                    />
                  </div>
                  <h3 className="font-semibold mt-2  text-text-light dark:text-text-dark">
                    The Seven Husbands of Evelyn Hugo
                  </h3>
                  <p className="text-sm text-muted-light dark:text-muted-dark">
                    $17.00
                  </p>
                  <button className="w-full mt-auto text-sm bg-transparent border border-primary dark:border-accent text-primary dark:text-accent font-semibold py-2 px-4 rounded hover:bg-primary dark:hover:bg-accent hover:text-white dark:hover:text-text-light transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;

