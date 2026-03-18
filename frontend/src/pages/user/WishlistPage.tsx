import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SideNavBarProfile from "../../components/SideNavBarProfile";
import { userService } from "../../services/userService";
import { useCartStore } from "../../store/useCartStore";

interface WishlistItem {
  _id: string;
  title: string;
  price: number;
  stock: number;
  imageUrl?: string | null;
  addedAt?: string;
}

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (typeof error === "object" && error !== null) {
    const err = error as { response?: { data?: { message?: unknown } } };
    const apiMessage = err.response?.data?.message;
    if (typeof apiMessage === "string" && apiMessage.trim() !== "") {
      return apiMessage;
    }
  }

  if (error instanceof Error && error.message.trim() !== "") {
    return error.message;
  }

  return fallback;
};

const WishlistPage = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchWishlist = async () => {
    try {
      const res = await userService.getWishlist();
      const items = Array.isArray(res?.data) ? res.data : [];
      setWishlist(items);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Không thể tải wishlist."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (bookId: string) => {
    try {
      setProcessingId(bookId);
      await userService.removeFromWishlist(bookId);
      setWishlist((prev) => prev.filter((item) => item._id !== bookId));
      toast.success("Đã xóa khỏi Wishlist!");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Không thể xóa khỏi Wishlist."));
    } finally {
      setProcessingId(null);
    }
  };

  const handleMoveToCart = async (item: WishlistItem) => {
    if (item.stock <= 0) {
      toast.error("Sản phẩm đã hết hàng.");
      return;
    }

    try {
      setProcessingId(item._id);
      await addToCart(item._id, 1);
      await userService.removeFromWishlist(item._id);
      setWishlist((prev) => prev.filter((entry) => entry._id !== item._id));
      toast.success("Đã chuyển vào giỏ hàng!");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Không thể chuyển vào giỏ hàng."));
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div>
      <Header />
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="flex-grow w-full max-w-screen-2xl mx-auto flex">
          <SideNavBarProfile />
          <main className="flex-1 p-6 bg-background-light dark:bg-background-dark">
            <div className="flex flex-col gap-6">
              <header className="flex flex-wrap justify-center md:justify-between items-center gap-4">
                <h1 className="text-text-light dark:text-text-dark text-4xl font-black font-heading leading-tight tracking-tight">
                  Wishlist
                </h1>
              </header>

              {loading ? (
                <div className="flex justify-center py-10">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : wishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-border-light dark:border-border-dark rounded-lg">
                  <span className="material-symbols-outlined text-6xl text-subtle-light dark:text-subtle-dark mb-4">favorite</span>
                  <h3 className="text-xl font-bold font-heading text-text-light dark:text-text-dark">Wishlist trống</h3>
                  <p className="text-subtle-light dark:text-subtle-dark mt-2 max-w-sm">
                    Lưu những cuốn sách bạn yêu thích để mua sau.
                  </p>
                  <Link
                    to="/booklist"
                    className="mt-5 inline-flex items-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors"
                  >
                    Khám phá sách
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {wishlist.map((item) => {
                    const imageUrl = item.imageUrl || "/placeholder.jpg";
                    const isProcessing = processingId === item._id;

                    return (
                      <div
                        key={item._id}
                        className="flex flex-col sm:flex-row sm:items-center gap-4 bg-card-light dark:bg-card-dark p-4 rounded-lg shadow-sm border border-border-light dark:border-border-dark"
                      >
                        <Link
                          to={`/bookdetail/${item._id}`}
                          className="w-20 h-28 rounded-md overflow-hidden shrink-0"
                        >
                          <img
                            src={imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </Link>

                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/bookdetail/${item._id}`}
                            className="font-bold text-text-light dark:text-text-dark hover:text-primary line-clamp-2"
                          >
                            {item.title}
                          </Link>
                          <p className="mt-1 text-lg font-semibold text-primary">
                            {Number(item.price || 0).toLocaleString("vi-VN")}đ
                          </p>
                          <p className={`text-sm mt-1 ${item.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                            {item.stock > 0 ? "Còn hàng" : "Hết hàng"}
                          </p>
                        </div>

                        <div className="flex gap-2 sm:flex-col sm:w-44">
                          <button
                            onClick={() => handleMoveToCart(item)}
                            disabled={isProcessing || item.stock <= 0}
                            className="flex-1 sm:flex-none rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                          >
                            Thêm vào giỏ
                          </button>
                          <button
                            onClick={() => handleRemove(item._id)}
                            disabled={isProcessing}
                            className="flex-1 sm:flex-none rounded-lg h-10 px-4 border border-border-light dark:border-border-dark text-sm font-semibold text-text-light dark:text-text-dark hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WishlistPage;
