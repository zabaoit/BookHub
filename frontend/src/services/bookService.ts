import api from "../libs/axios";
import type { Book, BookFilters, BookListResponse } from "../types/book";

export const bookService = {
  // Get all books with pagination and filters
  fetchAllBooks: async (
    page = 1,
    limit = 16,
    filters: BookFilters = {}
  ): Promise<BookListResponse> => {
    const parsedPage = Number(page);
    const parsedLimit = Number(limit);
    const safePage = Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1;
    const normalizedLimit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? Math.floor(parsedLimit) : 16;
    const safeLimit = Math.min(50, Math.max(16, normalizedLimit));
    const safeFilters: Record<string, string> = {};
    const categoryValues = Array.isArray(filters.categories)
      ? filters.categories
      : filters.category
        ? [filters.category]
        : [];

    Object.entries(filters).forEach(([key, value]) => {
      if (value === undefined || value === "") {
        return;
      }

      if (key === "category" || key === "author") {
        const parsedId = Number.parseInt(String(value), 10);
        if (Number.isFinite(parsedId) && parsedId > 0) {
          safeFilters[key] = parsedId.toString();
        }
        return;
      }

      if (key === "categories") {
        return;
      }

      safeFilters[key] = String(value);
    });

    if (categoryValues.length > 0) {
      const parsedCategoryIds = categoryValues
        .map((value) => Number.parseInt(String(value), 10))
        .filter((value) => Number.isFinite(value) && value > 0);

      if (parsedCategoryIds.length > 0) {
        safeFilters.categories = parsedCategoryIds.join(",");
      }
    }

    const params = new URLSearchParams({
      page: safePage.toString(),
      limit: safeLimit.toString(),
      ...safeFilters,
    });

    const res = await api.get(`/books?${params.toString()}`);

    // Handle backend response format: { message: '...', data: [...] }
    const books = res.data.data || res.data.books || [];

    const currentPage = res.data.page || safePage;
    const total = res.data.total || books.length;
    const totalPagesCalc = res.data.totalPages || Math.ceil(total / safeLimit) || 1;

    return {
      books: books,
      page: currentPage,
      totalPages: totalPagesCalc,
      total: total,
      hasNext: currentPage < totalPagesCalc,
      hasPrev: currentPage > 1,
    };
  },

  // Get book by ID
  fetchBookById: async (bookId: string): Promise<Book> => {
    const res = await api.get(`/books/${bookId}`);
    return res.data.data || res.data;
  },

  // Get featured books (use all books, take first 8)
  fetchFeaturedBooks: async (): Promise<Book[]> => {
    const res = await api.get("/books");
    const books = res.data.data || res.data.books || [];
    return books.slice(0, 8);
  },

  // Get best sellers (use all books sorted by rating/sales, take first 8)
  fetchBestSellers: async (): Promise<Book[]> => {
    const res = await api.get("/books");
    const books = res.data.data || res.data.books || [];
    // Sort by rating descending
    return books
      .sort((a: Book, b: Book) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 8);
  },

  // Get new releases (newest books by createdAt)
  fetchNewReleases: async (): Promise<Book[]> => {
    const res = await api.get("/books");
    const books = res.data.data || res.data.books || [];
    // Already sorted by createdAt desc from backend, take first 5
    return books.slice(0, 5);
  },

  // Search books (use fetchAllBooks with search filter)
  searchBooks: async (
    query: string,
    page = 1,
    limit = 16
  ): Promise<BookListResponse> => {
    return bookService.fetchAllBooks(page, limit, { search: query });
  },

  // Get books by category
  fetchBooksByCategory: async (
    category: string | string[],
    page = 1,
    limit = 16
  ): Promise<BookListResponse> => {
    return Array.isArray(category)
      ? bookService.fetchAllBooks(page, limit, { categories: category })
      : bookService.fetchAllBooks(page, limit, { category });
  },
};
