import { useEffect, useState, type MouseEvent } from "react";
import { Link } from "react-router";
import { ShoppingCart, Star } from "lucide-react";
import type { Book } from "@/types/book";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
import { userService } from "@/services/userService";
import useAuthStore from "@/store/useAuthStore";

interface BookCardProps {
  book: Book;
  className?: string;
}

const BookCard = ({ book, className }: BookCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const accessToken = useAuthStore((state) => state.accessToken);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const isOutOfStock = Number(book.stock || 0) <= 0;
  const discountPercent = book.originalPrice
    ? Math.round((1 - book.price / book.originalPrice) * 100)
    : 0;

  // ... (keep author and image url logic)
  const authorName = Array.isArray(book.author)
    ? book.author
        .map((a: string | { _id: string; name: string }) =>
          typeof a === "string" ? a : a.name
        )
        .join(", ")
    : book.author;

  const imageUrl =
    book.imageUrl || (book.images && book.images[0]?.url) || "/placeholder.jpg";

  useEffect(() => {
    const fetchWishlistStatus = async () => {
      if (!book._id || !accessToken) {
        setIsWishlisted(false);
        return;
      }

      try {
        setWishlistLoading(true);
        const response = await userService.getWishlistStatus(book._id);
        setIsWishlisted(Boolean(response?.data?.isWishlisted));
      } catch {
        setIsWishlisted(false);
      } finally {
        setWishlistLoading(false);
      }
    };

    fetchWishlistStatus();
  }, [book._id, accessToken]);

  const handleWishlistToggle = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!book._id) return;

    if (!accessToken) {
      toast.error("Vui lòng đăng nhập để sử dụng Wishlist.");
      return;
    }

    try {
      setWishlistLoading(true);
      if (isWishlisted) {
        await userService.removeFromWishlist(book._id);
        setIsWishlisted(false);
        toast.success("Đã xóa khỏi Wishlist!");
      } else {
        await userService.addToWishlist(book._id);
        setIsWishlisted(true);
        toast.success("Đã thêm vào Wishlist!");
      }
    } catch (error) {
      console.error("Wishlist toggle failed", error);
      toast.error("Không thể cập nhật Wishlist.");
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <Link
      to={`/bookdetail/${book._id}`}
      className={`group block h-full ${className || ""}`}
    >
      <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 flex-shrink-0">
          <img
            src={imageUrl}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {discountPercent > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                -{discountPercent}%
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex-1">
            <h3 className="font-bold text-sm line-clamp-2 min-h-[2.5rem] mb-1 text-gray-800 group-hover:text-primary transition-colors">
              {book.title}
            </h3>
            <p className="text-gray-500 text-xs mb-2 line-clamp-1 italic">
              {authorName}
            </p>

            {/* Rating */}
            {book.rating !== undefined && (
              <div className="flex items-center gap-1 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(book.rating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-gray-400 ml-1">
                  ({book.reviewCount || 0})
                </span>
              </div>
            )}
          </div>

          {/* Price & Action */}
          <div className="mt-4 pt-4 border-t border-gray-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex flex-col">
                <span className="font-black text-primary text-base">
                  {book.price.toLocaleString("vi-VN")}đ
                </span>
                {book.originalPrice && book.originalPrice > book.price && (
                  <span className="text-gray-400 text-[10px] line-through">
                    {book.originalPrice.toLocaleString("vi-VN")}đ
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className={`h-8 w-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    isWishlisted
                      ? "bg-pink-500 text-white hover:bg-pink-600"
                      : "bg-pink-50 text-pink-500 hover:bg-pink-500 hover:text-white"
                  }`}
                  onClick={handleWishlistToggle}
                  disabled={wishlistLoading}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <span
                    className={`material-symbols-outlined text-[18px] leading-none ${
                      isWishlisted ? "fill" : ""
                    }`}
                  >
                    favorite
                  </span>
                </button>
                <button
                  type="button"
                  className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${
                    isOutOfStock
                      ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                      : "bg-primary/10 text-primary hover:bg-primary hover:text-white cursor-pointer"
                  }`}
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (book._id && !isOutOfStock) {
                      await addToCart(book._id, 1);
                    }
                  }}
                  disabled={isOutOfStock}
                  aria-label={
                    isOutOfStock
                      ? "Out of stock"
                      : "Add to cart"
                  }
                  title={isOutOfStock ? "Hết hàng" : "Thêm vào giỏ hàng"}
                >
                  <ShoppingCart className="h-4 w-4" />
                </button>
              </div>
            </div>

            <button
              className="w-full bg-gray-900 border border-gray-900 text-white rounded-xl py-2 text-xs font-bold hover:bg-primary hover:border-primary transition-all duration-300 shadow-sm"
            >
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
