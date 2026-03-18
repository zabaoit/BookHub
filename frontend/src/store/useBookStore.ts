import { create } from "zustand";
import { bookService } from "../services/bookService";
import type { BookState, BookFilters } from "../types/store";
import { toast } from "sonner";

const initialFilters: BookFilters = {
  search: "",
  category: "",
  categories: [],
  author: "",
  minPrice: undefined,
  maxPrice: undefined,
  rating: undefined,
  sortBy: "newest",
};

const useBookStore = create<BookState>()((set, get) => ({
  // Initial state
  books: [],
  featuredBooks: [],
  bestSellers: [],
  newReleases: [],
  currentBook: null,
  currentPage: 1,
  totalPages: 1,
  total: 0,
  filters: initialFilters,
  loading: false,
  error: null,

  // Actions
  fetchBooks: async (page = 1, filters?: BookFilters) => {
    try {
      set({ loading: true, error: null });

      const currentFilters = filters || get().filters;
      const response = await bookService.fetchAllBooks(
        page,
        16,
        currentFilters
      );

      set({
        books: response.books,
        currentPage: response.page,
        totalPages: response.totalPages,
        total: response.total,
        filters: currentFilters,
      });
    } catch (error) {
      set({ error: "Không thể tải danh sách sách. Vui lòng thử lại." });
      toast.error("Lỗi khi tải sách");
      console.error("Error fetching books:", error);
    } finally {
      set({ loading: false });
    }
  },

  fetchFeaturedBooks: async () => {
    try {
      set({ loading: true, error: null });
      const books = await bookService.fetchFeaturedBooks();
      set({ featuredBooks: books });
    } catch (error) {
      set({ error: "Không thể tải sách nổi bật." });
      toast.error("Lỗi khi tải sách nổi bật");
      console.error("Error fetching featured books:", error);
    } finally {
      set({ loading: false });
    }
  },

  fetchBestSellers: async () => {
    try {
      set({ loading: true, error: null });
      const books = await bookService.fetchBestSellers();
      set({ bestSellers: books });
    } catch (error) {
      set({ error: "Không thể tải sách bán chạy." });
      toast.error("Lỗi khi tải sách bán chạy");
      console.error("Error fetching bestsellers:", error);
    } finally {
      set({ loading: false });
    }
  },

  fetchNewReleases: async () => {
    try {
      set({ loading: true, error: null });
      const books = await bookService.fetchNewReleases();
      set({ newReleases: books });
    } catch (error) {
      set({ error: "Không thể tải sách mới." });
      toast.error("Lỗi khi tải sách mới");
      console.error("Error fetching new releases:", error);
    } finally {
      set({ loading: false });
    }
  },

  fetchBookById: async (id: string) => {
    try {
      set({ loading: true, error: null });
      const book = await bookService.fetchBookById(id);
      set({ currentBook: book });
    } catch (error) {
      set({ error: "Không thể tải thông tin sách." });
      toast.error("Lỗi khi tải chi tiết sách");
      console.error("Error fetching book by id:", error);
    } finally {
      set({ loading: false });
    }
  },

  searchBooks: async (query: string) => {
    try {
      set({ loading: true, error: null });
      const response = await bookService.searchBooks(query, 1, 16);
      set({
        books: response.books,
        currentPage: response.page,
        totalPages: response.totalPages,
        total: response.total,
        filters: { ...get().filters, search: query },
      });
    } catch (error) {
      set({ error: "Không thể tìm kiếm sách." });
      toast.error("Lỗi khi tìm kiếm");
      console.error("Error searching books:", error);
    } finally {
      set({ loading: false });
    }
  },

  setFilters: (newFilters: BookFilters) => {
    const currentFilters = get().filters;
    const updatedFilters = { ...currentFilters, ...newFilters };
    set({ filters: updatedFilters });

    // Auto fetch books with new filters
    get().fetchBooks(1, updatedFilters);
  },

  clearFilters: () => {
    set({ filters: initialFilters });
    get().fetchBooks(1, initialFilters);
  },

  setPage: (page: number) => {
    set({ currentPage: page });
    get().fetchBooks(page);
  },

  clearError: () => {
    set({ error: null });
  },
}));

export default useBookStore;
