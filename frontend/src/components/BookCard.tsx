import { Link } from "react-router";
import { Heart, ShoppingCart, Star } from "lucide-react";
import type { Book } from "@/types/book";
import { useCartStore } from "@/store/useCartStore";

interface BookCardProps {
  book: Book;
  className?: string;
}

const BookCard = ({ book, className }: BookCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart);
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
          {/* Wishlist button */}
          <button
            className="absolute top-3 right-3 h-8 w-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-sm"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
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
              <button 
                className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all cursor-pointer"
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (book._id) {
                    await addToCart(book._id, 1);
                  }
                }}
              >
                <ShoppingCart className="h-4 w-4" />
              </button>
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
