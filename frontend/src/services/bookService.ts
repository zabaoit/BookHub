import api from "../libs/axios";
import type { Book, BookFilters, BookListResponse } from "../types/book";

export const bookService = {
  // Get all books with pagination and filters
  fetchAllBooks: async (
    page = 1,
    limit = 12,
    filters: BookFilters = {}
  ): Promise<BookListResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...Object.fromEntries(
        Object.entries(filters).filter(
          ([, value]) => value !== undefined && value !== ""
        )
      ),
    });

    const res = await api.get(`/books?${params.toString()}`);

    // Handle backend response format: { message: '...', data: [...] }
    const books = res.data.data || res.data.books || [];

    const currentPage = res.data.page || page;
    const total = res.data.total || books.length;
    const totalPagesCalc = res.data.totalPages || Math.ceil(total / limit) || 1;

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
    limit = 12
  ): Promise<BookListResponse> => {
    return bookService.fetchAllBooks(page, limit, { search: query });
  },

  // Get books by category
  fetchBooksByCategory: async (
    category: string,
    page = 1,
    limit = 12
  ): Promise<BookListResponse> => {
    return bookService.fetchAllBooks(page, limit, { category });
  },
};
