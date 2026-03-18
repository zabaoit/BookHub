import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import BookCard from "../../components/BookCard";
import useBookStore from "../../store/useBookStore";
import type { BookFilters } from "../../types/book";
import { categoryService, type CategorySummary } from "../../services/categoryService";
import {
  Search,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Star,
} from "lucide-react";

const BooksPage = () => {
  const [searchParams] = useSearchParams();
  const {
    books,
    loading,
    currentPage,
    totalPages,
    total,
    filters,
    fetchBooks,
    setFilters,
    setPage,
    clearFilters,
  } = useBookStore();
  const [availableCategories, setAvailableCategories] = useState<CategorySummary[]>([]);
  const [priceDraft, setPriceDraft] = useState({
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    const querySearch = (searchParams.get("search") || "").trim();
    fetchBooks(1, { ...filters, search: querySearch });
  }, [fetchBooks, searchParams]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await categoryService.getAllCategories(1, 100);
        setAvailableCategories(categories);
      } catch (error) {
        console.error("Failed to load categories", error);
        setAvailableCategories([]);
      }
    };

    loadCategories();
  }, []);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(newFilters);
  };

  const applyPriceFilter = (field: "minPrice" | "maxPrice") => {
    const rawValue = priceDraft[field].trim();
    const parsedValue = rawValue === "" ? undefined : Number(rawValue);

    handleFilterChange({
      [field]: Number.isFinite(parsedValue as number)
        ? parsedValue
        : undefined,
    });
  };

  const selectedCategoryIds = filters.categories?.length
    ? filters.categories
    : filters.category
      ? [filters.category]
      : [];

  const handleCategoryToggle = (categoryId: string) => {
    const updatedCategoryIds = selectedCategoryIds.includes(categoryId)
      ? selectedCategoryIds.filter((id) => id !== categoryId)
      : [...selectedCategoryIds, categoryId];

    handleFilterChange({
      category: "",
      categories: updatedCategoryIds,
    });
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleClearFilters = () => {
    setPriceDraft({
      minPrice: "",
      maxPrice: "",
    });
    clearFilters();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-8 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* <!-- Sticky Filter Sidebar --> */}
          <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
            <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5" />
                  Bộ lọc
                </h2>
              </div>

              {/* <!-- Search --> */}
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3">Tìm kiếm</p>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="Tên sách, tác giả..."
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange({ search: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* <!-- Price Range Placeholder --> */}
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3">Khoảng giá</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Từ"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none"
                      value={priceDraft.minPrice}
                      onChange={(e) =>
                        setPriceDraft((current) => ({
                          ...current,
                          minPrice: e.target.value.replace(/[^\d]/g, ""),
                        }))
                      }
                      onBlur={() => applyPriceFilter("minPrice")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.currentTarget.blur();
                        }
                      }}
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Đến"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none"
                      value={priceDraft.maxPrice}
                      onChange={(e) =>
                        setPriceDraft((current) => ({
                          ...current,
                          maxPrice: e.target.value.replace(/[^\d]/g, ""),
                        }))
                      }
                      onBlur={() => applyPriceFilter("maxPrice")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.currentTarget.blur();
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* <!-- Categories Placeholder --> */}
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3">Thể loại</p>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {availableCategories.map((cat) => (
                    <label
                      key={cat._id}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                        checked={selectedCategoryIds.includes(cat._id)}
                        onChange={() => handleCategoryToggle(cat._id)}
                      />
                      <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">
                        {cat.name}
                      </span>
                    </label>
                  ))}
                  {availableCategories.length === 0 && (
                    <p className="text-xs text-gray-400">Đang tải thể loại...</p>
                  )}
                </div>
              </div>

              {/* <!-- Rating --> */}
              <div className="mb-8">
                <p className="text-sm font-semibold mb-3">Đánh giá</p>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <button
                      key={star}
                      className="flex items-center gap-2 w-full text-sm text-gray-600 hover:text-primary transition-colors"
                      onClick={() => handleFilterChange({ rating: star })}
                    >
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < star
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span
                        className={
                          filters.rating === star
                            ? "font-bold text-primary"
                            : ""
                        }
                      >
                        từ {star} sao
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleClearFilters}
                className="w-full py-2.5 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-bold transition-all"
              >
                <RotateCcw className="h-4 w-4" />
                Xóa tất cả bộ lọc
              </button>
            </div>
          </aside>

          {/* <!-- Books Grid and Sorting --> */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  Tất cả sách
                </h1>
                {total > 0 ? (
                  <p className="text-gray-500 text-sm">
                    Hiển thị{" "}
                    <span className="font-semibold text-gray-900">
                      {(currentPage - 1) * 16 + 1}-
                      {Math.min(currentPage * 16, total)}
                    </span>{" "}
                    trong{" "}
                    <span className="font-semibold text-gray-900">{total}</span>{" "}
                    kết quả
                  </p>
                ) : (
                  <p className="text-gray-500 text-sm">
                    Không tìm thấy kết quả nào
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  Sắp xếp:
                </span>
                <select
                  value={filters.sortBy || "newest"}
                  onChange={(e) =>
                    handleFilterChange({
                      sortBy: e.target.value as BookFilters["sortBy"],
                    })
                  }
                  className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="oldest">Cũ nhất</option>
                  <option value="price-low">Giá: Thấp đến Cao</option>
                  <option value="price-high">Giá: Cao đến Thấp</option>
                  <option value="rating">Đánh giá cao nhất</option>
                  <option value="popular">Phổ biến nhất</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-100 p-4 space-y-4 animate-pulse"
                  >
                    <div className="aspect-[3/4] bg-gray-100 rounded-xl" />
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : books && books.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200">
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Không tìm thấy sách
                </h3>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                  Rất tiếc, chúng tôi không tìm thấy cuốn sách nào khớp với bộ
                  lọc của bạn. Hãy thử thay đổi tìm kiếm.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            )}

            {/* <!-- Pagination Control --> */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-1 bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    // Simplified pagination logic for 1-5 pages
                    if (
                      totalPages <= 7 ||
                      (pageNumber >= currentPage - 2 &&
                        pageNumber <= currentPage + 2)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`min-w-[40px] h-10 rounded-xl text-sm font-bold transition-all ${
                            pageNumber === currentPage
                              ? "bg-primary text-white shadow-lg shadow-primary/30"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    }
                    return null;
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BooksPage;
