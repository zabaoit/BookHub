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
    return {
      books: books,
      page: res.data.page || page,
      totalPages: res.data.totalPages || Math.ceil(books.length / limit) || 1,
      total: res.data.total || books.length,
    };
  },

  // Get book by ID
  fetchBookById: async (bookId: string): Promise<Book> => {
    const res = await api.get(`/books/${bookId}`);
    return res.data;
  },

  // Get featured books (for homepage)
  fetchFeaturedBooks: async (): Promise<Book[]> => {
    const res = await api.get("/books/featured");
    return res.data;
  },

  // Get best sellers
  fetchBestSellers: async (): Promise<Book[]> => {
    const res = await api.get("/books/bestsellers");
    return res.data;
  },

  // Get new releases
  fetchNewReleases: async (): Promise<Book[]> => {
    const res = await api.get("/books/new-releases");
    return res.data;
  },

  // Search books
  searchBooks: async (
    query: string,
    page = 1,
    limit = 12
  ): Promise<BookListResponse> => {
    const res = await api.get(
      `/books/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
    );
    return res.data;
  },

  // Get books by category
  fetchBooksByCategory: async (
    category: string,
    page = 1,
    limit = 12
  ): Promise<BookListResponse> => {
    const res = await api.get(
      `/books/category/${category}?page=${page}&limit=${limit}`
    );
    return res.data;
  },
};
