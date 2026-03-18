import type { User } from "./user";
import type { Book, BookFilters } from "./book";

export type { BookFilters };

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  isInitialized: boolean;
  clearState: () => void;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<{ email: string; message?: string }>;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refresh: () => Promise<boolean>;
  initAuth: () => Promise<void>;
}

export interface BookState {
  // Book data
  books: Book[];
  featuredBooks: Book[];
  bestSellers: Book[];
  newReleases: Book[];
  currentBook: Book | null;

  // Pagination & Filters
  currentPage: number;
  totalPages: number;
  total: number;
  filters: BookFilters;

  // UI states
  loading: boolean;
  error: string | null;

  // Actions
  fetchBooks: (page?: number, filters?: BookFilters) => Promise<void>;
  fetchFeaturedBooks: () => Promise<void>;
  fetchBestSellers: () => Promise<void>;
  fetchNewReleases: () => Promise<void>;
  fetchBookById: (id: string) => Promise<void>;
  searchBooks: (query: string) => Promise<void>;
  setFilters: (filters: BookFilters) => void;
  clearFilters: () => void;
  setPage: (page: number) => void;
  clearError: () => void;
}
