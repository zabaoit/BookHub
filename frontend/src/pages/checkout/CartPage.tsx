import { Link } from "react-router";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useCartStore } from "../../store/useCartStore";
import { bookService } from "../../services/bookService";
import type { Book } from "../../types/book";

const CartPage = () => {
  const { items, totalAmount, fetchCart, updateQuantity, removeItem, addToCart, clearCart, isLoading } = useCartStore();
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [recommendedLoading, setRecommendedLoading] = useState(false);
  const hasItems = items.length > 0;

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    const fetchRecommendedBooks = async () => {
      try {
        setRecommendedLoading(true);
        const response = await bookService.fetchAllBooks(1, 16, {});
        const cartBookIds = new Set(items.map((item) => Number(item.book_id)));
        const books = (response.books || [])
          .filter((book) => !cartBookIds.has(Number(book._id)))
          .slice(0, 5);
        setRecommendedBooks(books);
      } catch (error) {
        console.error("Failed to fetch recommended books", error);
        setRecommendedBooks([]);
      } finally {
        setRecommendedLoading(false);
      }
    };

    fetchRecommendedBooks();
  }, [items]);

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
            
            <div
              className={`mt-8 flex ${
                hasItems ? "flex-col lg:flex-row gap-8" : "flex-col gap-8"
              }`}
            >
              {/* <!-- Left Column: Cart Items --> */}
              <div className={`w-full ${hasItems ? "lg:w-2/3" : ""}`}>
                <div className="flex items-center justify-between gap-4 px-4 pb-3 pt-5 border-b border-border-light dark:border-border-dark">
                  <h2 className="font-display text-text-light dark:text-text-dark text-[22px] font-bold leading-tight tracking-tight">
                    CART ITEMS ({items.length})
                  </h2>
                  {hasItems && (
                    <button
                      type="button"
                      onClick={() => clearCart()}
                      className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
                    >
                      Xóa tất cả
                    </button>
                  )}
                </div>
                
                <div className="divide-y divide-border-light dark:divide-border-dark">
                  {isLoading ? (
                    <div className="w-full py-8 text-center text-gray-500">
                      Đang tải giỏ hàng...
                    </div>
                  ) : items.length === 0 ? (
                    <div className="flex w-full min-h-[280px] items-center justify-center py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">
                          shopping_cart
                        </span>
                        <p className="text-xl mb-4">Giỏ hàng của bạn đang trống.</p>
                        <Link
                          to="/booklist"
                          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          Khám phá sách ngay
                        </Link>
                      </div>
                    </div>
                  ) : (
                    items.map((item) => {
                      // Xử lý dữ liệu sách với guest cart fallback
                      const title = item.book?.title || item.title || `Sách ID: ${item.book_id}`;
                      const price = item.book?.price || item.price || 0;
                      const stockSource = item.book?.stock ?? item.stock;
                      const canIncreaseQuantity =
                        stockSource === undefined || stockSource === null
                          ? true
                          : item.quantity < Number(stockSource);
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
                                disabled={!canIncreaseQuantity}
                                className="text-base font-medium leading-normal flex h-8 w-8 items-center justify-center hover:bg-primary hover:text-white cursor-pointer transition-colors disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent disabled:hover:text-gray-300"
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
              {hasItems && (
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
                {recommendedLoading ? (
                  <div className="col-span-full py-8 text-center text-gray-500">Đang tải gợi ý sách...</div>
                ) : recommendedBooks.length === 0 ? (
                  <div className="col-span-full py-8 text-center text-gray-500">Chưa có sách gợi ý phù hợp.</div>
                ) : (
                  recommendedBooks.map((book) => {
                    const imageUrl =
                      book.imageUrl ||
                      (Array.isArray(book.images) && book.images[0]?.url) ||
                      "/placeholder.jpg";

                    return (
                      <div key={book._id} className="flex flex-col items-center text-center gap-2 group h-full">
                        <Link
                          to={`/bookdetail/${book._id}`}
                          className="w-full aspect-[2/3] bg-cover bg-center rounded-lg overflow-hidden shadow-md"
                        >
                          <img
                            alt={`Book cover for ${book.title}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            src={imageUrl}
                          />
                        </Link>
                        <h3 className="font-semibold mt-2 text-text-light dark:text-text-dark line-clamp-2 min-h-[3rem]">
                          {book.title}
                        </h3>
                        <p className="text-sm text-muted-light dark:text-muted-dark">
                          {Number(book.price || 0).toLocaleString("vi-VN")}đ
                        </p>
                        <button
                          className="w-full mt-auto text-sm bg-transparent border border-primary dark:border-accent text-primary dark:text-accent font-semibold py-2 px-4 rounded hover:bg-primary dark:hover:bg-accent hover:text-white dark:hover:text-text-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={(book.stock || 0) <= 0}
                          onClick={() => addToCart(book._id, 1)}
                        >
                          {(book.stock || 0) > 0 ? "Add to Cart" : "Out of Stock"}
                        </button>
                      </div>
                    );
                  })
                )}
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

