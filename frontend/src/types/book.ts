export interface BookImage {
  url: string;
  altText?: string;
  order?: number;
}

export interface Book {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  author: string[] | { _id: string; name: string }[];
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  description?: string;
  images?: BookImage[];
  imageUrl?: string;
  categories?: string[] | { _id: string; name: string }[];
  category?: string;
  publicationDate?: string;
  publishedYear?: number;
  pages?: number;
  language?: string;
  publisher?: string;
  isbn?: string;
  stock: number;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BookFilters {
  search?: string;
  category?: string;
  categories?: string[];
  author?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sortBy?:
    | "newest"
    | "oldest"
    | "price-low"
    | "price-high"
    | "rating"
    | "popular";
}

export interface BookListResponse {
  books: Book[];
  total: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
