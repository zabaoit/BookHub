import { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import useAuthStore from "../../store/useAuthStore";
import { bookService } from "../../services/bookService";
import { adminService } from "../../services/adminService";
import { orderService } from "../../services/orderService";
import type { Book } from "../../types/book";

type AdminSection = "dashboard" | "books" | "orders" | "users" | "categories";
type StockFilter = "all" | "in-stock" | "out-of-stock" | "active" | "inactive";

const PAGE_SIZE = 8;
const ORDER_PAGE_SIZE = 5;

const money = (value: number) => `${Number(value || 0).toLocaleString("vi-VN")} VND`;

const getAuthors = (book: Book) =>
  Array.isArray(book.author)
    ? book.author
        .map((author) => (typeof author === "string" ? author : author.name))
        .filter(Boolean)
        .join(", ") || "Unknown Author"
    : "Unknown Author";

const getCategories = (book: Book) =>
  Array.isArray(book.categories)
    ? book.categories
        .map((category) => (typeof category === "string" ? category : category.name))
        .filter(Boolean)
    : [];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

type OrderDetail = {
  _id: string;
  orderDate: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  shippingAddress: string;
  note?: string | null;
  buyerName: string;
  buyerEmail?: string | null;
  buyerPhone: string;
  cancelReason?: string | null;
  deliveredAt?: string | null;
  paidAt?: string | null;
  user?: {
    _id: string;
    username: string;
    email: string;
  };
  items: Array<{
    _id: string;
    quantity: number;
    priceAtPurchase: number;
    book: Book | null;
  }>;
};

const AdminPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [books, setBooks] = useState<Book[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [stockFilter, setStockFilter] = useState<StockFilter>("all");
  const [bookPage, setBookPage] = useState(1);
  const [orderPage, setOrderPage] = useState(1);
  const [userPage, setUserPage] = useState(1);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
  const [bookToCreate, setBookToCreate] = useState(false);
  const [bookDetail, setBookDetail] = useState<Book | null>(null);
  const [bookDetailId, setBookDetailId] = useState<string | null>(null);
  const [bookDetailLoading, setBookDetailLoading] = useState(false);
  const [bookDetailError, setBookDetailError] = useState("");
  const [bookEditForm, setBookEditForm] = useState({
    title: "",
    slug: "",
    description: "",
    isbn: "",
    publisher: "",
    publicationDate: "",
    pages: "",
    language: "",
    price: "",
    stock: "",
  });
  const [bookCreateForm, setBookCreateForm] = useState({
    title: "",
    slug: "",
    description: "",
    isbn: "",
    publisher: "",
    publicationDate: "",
    pages: "",
    language: "",
    price: "",
    stock: "",
  });
  const [deletingBookId, setDeletingBookId] = useState<string | null>(null);
  const [updatingBookId, setUpdatingBookId] = useState<string | null>(null);
  const [orderToEdit, setOrderToEdit] = useState<any | null>(null);
  const [orderEditForm, setOrderEditForm] = useState<{ status: string; paymentStatus: string }>({
    status: "",
    paymentStatus: "",
  });
  const [orderToCancel, setOrderToCancel] = useState<any | null>(null);
  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
  const [orderDetailId, setOrderDetailId] = useState<string | null>(null);
  const [orderDetailLoading, setOrderDetailLoading] = useState(false);
  const [orderDetailError, setOrderDetailError] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [userToEdit, setUserToEdit] = useState<any | null>(null);
  const [userEditForm, setUserEditForm] = useState<{ username: string; email: string; role: string }>({
    username: "",
    email: "",
    role: "USER",
  });
  const [userToDelete, setUserToDelete] = useState<any | null>(null);
  const [userToCreate, setUserToCreate] = useState(false);
  const [userCreateForm, setUserCreateForm] = useState<{ username: string; email: string; password: string; role: string }>({
    username: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [categorySearch, setCategorySearch] = useState("");
  const [categoryToEdit, setCategoryToEdit] = useState<any | null>(null);
  const [categoryEditForm, setCategoryEditForm] = useState<{ name: string; slug: string }>({
    name: "",
    slug: "",
  });
  const [categoryToDelete, setCategoryToDelete] = useState<any | null>(null);
  const [updatingCategoryId, setUpdatingCategoryId] = useState<string | null>(null);
  const currentSection = location.pathname.split("/").filter(Boolean)[1] as AdminSection | undefined;
  const validSections: AdminSection[] = ["dashboard", "books", "orders", "users", "categories"];

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [bookRes, orderRes, categoryRes] = await Promise.all([
          bookService.fetchAllBooks(1, 50, { sortBy: "newest" }),
          adminService.getOrders(1, 100),
          adminService.getCategories(1, 100),
        ]);
        const userRes = await adminService.getUsers(1, 20);
        setBooks(bookRes.books || []);
        setOrders(orderRes.data || []);
        setCategories(categoryRes.data || []);
        setUsers(userRes.data || []);
      } catch (error) {
        console.error(error);
        toast.error("Unable to load admin data.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const stats = useMemo(() => {
    const revenue = orders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);
    return {
      revenue,
      pendingOrders: orders.filter((order) => order.status === "PENDING").length,
      outOfStock: books.filter((book) => Number(book.stock || 0) <= 0).length,
      bookCount: books.length,
      orderCount: orders.length,
      categoryCount: categories.length,
      userCount: users.length,
    };
  }, [books, orders, categories, users]);

  const filteredBooks = useMemo(() => {
    const q = search.trim().toLowerCase();
    return books.filter((book) => {
      const stock = Number(book.stock || 0);
      const matchesSearch =
        q === "" ||
        book.title.toLowerCase().includes(q) ||
        getAuthors(book).toLowerCase().includes(q) ||
        String(book.isbn || "").toLowerCase().includes(q);

      const isActive = stock > 0;
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "in-stock" && stock > 0) ||
        (stockFilter === "out-of-stock" && stock <= 0) ||
        (stockFilter === "active" && isActive) ||
        (stockFilter === "inactive" && !isActive);

      return matchesSearch && matchesStock;
    });
  }, [books, search, stockFilter]);

  const totalBookPages = Math.max(1, Math.ceil(filteredBooks.length / PAGE_SIZE));
  const visibleBooks = filteredBooks.slice((bookPage - 1) * PAGE_SIZE, bookPage * PAGE_SIZE);
  const totalOrderPages = Math.max(1, Math.ceil(orders.length / ORDER_PAGE_SIZE));
  const visibleOrders = orders.slice((orderPage - 1) * ORDER_PAGE_SIZE, orderPage * ORDER_PAGE_SIZE);
  const filteredUsers = useMemo(() => {
    const q = userSearch.trim().toLowerCase();
    return users.filter((item) => {
      return (
        q === "" ||
        item.username?.toLowerCase().includes(q) ||
        item.email?.toLowerCase().includes(q) ||
        item.role?.toLowerCase().includes(q)
      );
    });
  }, [users, userSearch]);
  const totalUserPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const visibleUsers = filteredUsers.slice((userPage - 1) * PAGE_SIZE, userPage * PAGE_SIZE);
  const filteredCategories = useMemo(() => {
    const q = categorySearch.trim().toLowerCase();
    return categories.filter((item) => {
      return q === "" || item.name?.toLowerCase().includes(q) || item.slug?.toLowerCase().includes(q);
    });
  }, [categories, categorySearch]);

  useEffect(() => {
    setBookPage((prev) => Math.min(prev, totalBookPages));
  }, [totalBookPages]);

  useEffect(() => {
    setOrderPage((prev) => Math.min(prev, totalOrderPages));
  }, [totalOrderPages]);

  useEffect(() => {
    setUserPage((prev) => Math.min(prev, totalUserPages));
  }, [totalUserPages]);

  const deleteBook = async () => {
    if (!bookToDelete) return;
    try {
      setDeletingBookId(bookToDelete._id);
      await adminService.deleteBook(bookToDelete._id);
      setBooks((prev) => prev.filter((book) => book._id !== bookToDelete._id));
      toast.success("Deleted book.");
      setBookToDelete(null);
    } catch (error) {
      console.error(error);
      toast.error("Cannot delete book.");
    } finally {
      setDeletingBookId(null);
    }
  };

  const createBook = async () => {
    try {
      const payload = {
        title: bookCreateForm.title,
        slug: bookCreateForm.slug || slugify(bookCreateForm.title),
        description: bookCreateForm.description || undefined,
        isbn: bookCreateForm.isbn || undefined,
        publisher: bookCreateForm.publisher || undefined,
        publicationDate: bookCreateForm.publicationDate || undefined,
        pages: bookCreateForm.pages ? Number(bookCreateForm.pages) : undefined,
        language: bookCreateForm.language || undefined,
        price: Number(bookCreateForm.price || 0),
        stock: Number(bookCreateForm.stock || 0),
        author: [],
        categories: [],
        images: [],
      };

      if (!payload.title || !payload.slug || !payload.price) {
        toast.error("Please fill in title, slug, and price.");
        return;
      }

      const response = await adminService.createBook(payload);
      const newBook = response.data;
      setBooks((prev) => [newBook, ...prev]);
      toast.success("Created book.");
      setBookToCreate(false);
      setBookCreateForm({
        title: "",
        slug: "",
        description: "",
        isbn: "",
        publisher: "",
        publicationDate: "",
        pages: "",
        language: "",
        price: "",
        stock: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Cannot create book.");
    }
  };

  const updateBook = async () => {
    if (!bookToEdit) return;
    try {
      setUpdatingBookId(bookToEdit._id);
      const payload = {
        title: bookEditForm.title,
        slug: bookEditForm.slug,
        description: bookEditForm.description || undefined,
        isbn: bookEditForm.isbn || undefined,
        publisher: bookEditForm.publisher || undefined,
        publicationDate: bookEditForm.publicationDate || undefined,
        pages: bookEditForm.pages ? Number(bookEditForm.pages) : undefined,
        language: bookEditForm.language || undefined,
        price: Number(bookEditForm.price || 0),
        stock: Number(bookEditForm.stock || 0),
        author: Array.isArray(bookToEdit.author)
          ? bookToEdit.author.map((author) => (typeof author === "string" ? author : author._id))
          : [],
        categories: Array.isArray(bookToEdit.categories)
          ? bookToEdit.categories.map((category) => (typeof category === "string" ? category : category._id))
          : [],
        images: bookToEdit.images?.map((image, index) => ({
          url: image.url,
          altText: image.altText || bookToEdit.title,
          order: image.order ?? index,
        })),
      };
      const response = await adminService.updateBook(bookToEdit._id, payload);
      setBooks((prev) => prev.map((book) => (book._id === bookToEdit._id ? response.data || book : book)));
      toast.success("Updated book.");
      setBookToEdit(null);
    } catch (error) {
      console.error(error);
      toast.error("Cannot update book.");
    } finally {
      setUpdatingBookId(null);
    }
  };

  const updateOrder = async () => {
    if (!orderToEdit) return;
    try {
      setUpdatingOrderId(orderToEdit._id);
      const payload = {
        status: orderEditForm.status || undefined,
        paymentStatus: orderEditForm.paymentStatus || undefined,
      };
      const response = await adminService.updateOrderStatus(orderToEdit._id, payload);
      setOrders((prev) => prev.map((order) => (order._id === orderToEdit._id ? response.data || order : order)));
      toast.success("Updated order.");
      setOrderToEdit(null);
    } catch (error) {
      console.error(error);
      toast.error("Cannot update order.");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const cancelOrder = async () => {
    if (!orderToCancel) return;
    try {
      setUpdatingOrderId(orderToCancel._id);
      const response = await adminService.cancelOrder(orderToCancel._id, "Cancelled from admin panel");
      setOrders((prev) => prev.map((order) => (order._id === orderToCancel._id ? response.data || order : order)));
      toast.success("Cancelled order.");
      setOrderToCancel(null);
    } catch (error) {
      console.error(error);
      toast.error("Cannot cancel order.");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const openOrderDetail = async (orderId: string) => {
    try {
      setOrderDetailId(orderId);
      setOrderDetailLoading(true);
      setOrderDetailError("");
      setOrderDetail(null);
      const res = await orderService.getOrderById(orderId);
      setOrderDetail(res.data || null);
    } catch (error) {
      console.error(error);
      setOrderDetailError("Cannot load order detail.");
    } finally {
      setOrderDetailLoading(false);
    }
  };

  const openBookDetail = async (bookId: string) => {
    try {
      setBookDetailId(bookId);
      setBookDetailLoading(true);
      setBookDetailError("");
      setBookDetail(null);
      const data = await bookService.fetchBookById(bookId);
      setBookDetail(data);
    } catch (error) {
      console.error(error);
      setBookDetailError("Cannot load book detail.");
    } finally {
      setBookDetailLoading(false);
    }
  };

  const updateUser = async () => {
    if (!userToEdit) return;
    try {
      setUpdatingUserId(userToEdit._id);
      const response = await adminService.updateUser(userToEdit._id, userEditForm);
      setUsers((prev) => prev.map((item) => (item._id === userToEdit._id ? response.data || item : item)));
      toast.success("Updated user.");
      setUserToEdit(null);
    } catch (error) {
      console.error(error);
      toast.error("Cannot update user.");
    } finally {
      setUpdatingUserId(null);
    }
  };

  const createUser = async () => {
    try {
      if (!userCreateForm.username || !userCreateForm.email || !userCreateForm.password) {
        toast.error("Please fill in username, email, and password.");
        return;
      }

      const response = await adminService.createUser({
        username: userCreateForm.username,
        email: userCreateForm.email,
        password: userCreateForm.password,
        role: userCreateForm.role,
      });

      setUsers((prev) => [response.data, ...prev]);
      toast.success("Created user.");
      setUserToCreate(false);
      setUserCreateForm({
        username: "",
        email: "",
        password: "",
        role: "USER",
      });
    } catch (error) {
      console.error(error);
      toast.error("Cannot create user.");
    }
  };

  const deleteUser = async () => {
    if (!userToDelete) return;
    try {
      setUpdatingUserId(userToDelete._id);
      await adminService.deleteUser(userToDelete._id);
      setUsers((prev) => prev.filter((item) => item._id !== userToDelete._id));
      toast.success("Deleted user.");
      setUserToDelete(null);
    } catch (error) {
      console.error(error);
      toast.error("Cannot delete user.");
    } finally {
      setUpdatingUserId(null);
    }
  };

  const updateCategory = async () => {
    if (!categoryToEdit) return;
    try {
      setUpdatingCategoryId(categoryToEdit._id);
      const response = await adminService.updateCategory(categoryToEdit._id, categoryEditForm);
      setCategories((prev) => prev.map((item) => (item._id === categoryToEdit._id ? response.data || item : item)));
      toast.success("Updated category.");
      setCategoryToEdit(null);
    } catch (error) {
      console.error(error);
      toast.error("Cannot update category.");
    } finally {
      setUpdatingCategoryId(null);
    }
  };

  const deleteCategory = async () => {
    if (!categoryToDelete) return;
    try {
      setUpdatingCategoryId(categoryToDelete._id);
      await adminService.deleteCategory(categoryToDelete._id);
      setCategories((prev) => prev.filter((item) => item._id !== categoryToDelete._id));
      toast.success("Deleted category.");
      setCategoryToDelete(null);
    } catch (error) {
      console.error(error);
      toast.error("Cannot delete category.");
    } finally {
      setUpdatingCategoryId(null);
    }
  };

  const sidebarItems: Array<{ key: AdminSection; label: string; icon: string }> = [
    { key: "dashboard", label: "Dashboard", icon: "grid_view" },
    { key: "users", label: "Users", icon: "person" },
    { key: "books", label: "Books", icon: "menu_book" },
    { key: "orders", label: "Orders", icon: "receipt_long" },
    { key: "categories", label: "Categories", icon: "category" },
  ];

  const sectionMeta: Record<AdminSection, { title: string; subtitle: string }> = {
    dashboard: { title: "Dashboard", subtitle: "Overview of store health and activity." },
    books: { title: "Books Management", subtitle: "Manage your book inventory and view their details." },
    orders: { title: "Orders Management", subtitle: "Review and update order status." },
    users: { title: "Users Management", subtitle: "View and manage registered accounts." },
    categories: { title: "Categories Management", subtitle: "Organize the catalog taxonomy." },
  };

  const pageNumbers = useMemo(() => {
    if (totalBookPages <= 3) {
      return Array.from({ length: totalBookPages }, (_, index) => index + 1);
    }
    if (bookPage <= 2) return [1, 2, 3];
    if (bookPage >= totalBookPages - 1) return [totalBookPages - 2, totalBookPages - 1, totalBookPages];
    return [bookPage - 1, bookPage, bookPage + 1];
  }, [bookPage, totalBookPages]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  if (!currentSection || !validSections.includes(currentSection)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <aside className="hidden w-[320px] shrink-0 border-r border-border bg-card px-6 py-6 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:overflow-y-auto">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/10">
              <span className="material-symbols-outlined text-[30px]">account_circle</span>
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold">{user?.username || "Admin Name"}</h2>
              <p className="truncate text-sm text-muted-foreground">Administrator</p>
            </div>
          </div>

          <nav className="mt-10 space-y-2">
            {sidebarItems.map((item) => {
              const isActive = currentSection === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => navigate(`/admin/${item.key}`)}
                  className={`flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                    isActive ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl border text-[22px] ${
                      isActive ? "border-primary/20 bg-primary/10 text-primary" : "border-border bg-background text-foreground"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto space-y-2 border-t border-border pt-6">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-background text-[22px] text-foreground">
                <span className="material-symbols-outlined text-[22px]">logout</span>
              </span>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col px-4 py-6 sm:px-6 lg:px-10">
          <div className="mx-auto flex w-full max-w-[1600px] flex-col">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="font-display text-4xl font-black tracking-tight sm:text-5xl">
                  {sectionMeta[currentSection].title}
                </h1>
                <p className="mt-4 max-w-2xl text-base text-muted-foreground">{sectionMeta[currentSection].subtitle}</p>
              </div>

            </div>

            {loading ? (
              <div className="grid min-h-[50vh] place-items-center">
                <div className="flex items-center gap-3 rounded-3xl border border-border bg-card px-6 py-4 shadow-sm">
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  Loading admin data...
                </div>
              </div>
            ) : (
              <>
                {currentSection === "dashboard" && (
                  <div className="mt-8 space-y-6">
                    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      {[
                        ["Books", stats.bookCount, "menu_book"],
                        ["Orders", stats.orderCount, "receipt_long"],
                        ["Users", stats.userCount, "person"],
                      ].map(([label, value, icon]) => (
                        <div key={String(label)} className="rounded-[28px] border border-border bg-card p-5 shadow-sm">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-muted-foreground">{String(label)}</p>
                            <span className="material-symbols-outlined text-muted-foreground">{String(icon)}</span>
                          </div>
                          <p className="mt-4 text-3xl font-black tracking-tight">{String(value)}</p>
                        </div>
                      ))}
                    </section>
                    <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
                      <div className="rounded-[32px] border border-border bg-card p-6 shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground">Revenue snapshot</p>
                        <h2 className="mt-2 text-3xl font-black tracking-tight">{money(stats.revenue)}</h2>
                      </div>
                      <div className="rounded-[32px] border border-border bg-card p-6 shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground">Quick health</p>
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Pending orders</span>
                            <span className="font-semibold">{stats.pendingOrders}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Out of stock</span>
                            <span className="font-semibold">{stats.outOfStock}</span>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                )}
                {currentSection === "books" && (
                  <div className="mt-8 space-y-6">
                    <section className="rounded-[32px] border border-border bg-card p-5 shadow-sm sm:p-6">
                      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto]">
                        <label className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3">
                          <span className="material-symbols-outlined text-muted-foreground">search</span>
                          <input
                            value={search}
                            onChange={(e) => {
                              setSearch(e.target.value);
                              setBookPage(1);
                            }}
                            placeholder="Search by Title or ISBN..."
                            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                          />
                        </label>

                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setBookToCreate(true)}
                            className="inline-flex h-16 items-center gap-2 rounded-2xl bg-primary px-5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
                          >
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            Add New Book
                          </button>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        {[
                          ["all", "All"],
                          ["in-stock", "In Stock"],
                          ["out-of-stock", "Out of Stock"],
                          ["active", "Active"],
                          ["inactive", "Inactive"],
                        ].map(([value, label]) => {
                          const active = stockFilter === value;
                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() => {
                                setStockFilter(value as StockFilter);
                                setBookPage(1);
                              }}
                              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                                active ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent"
                              }`}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </section>

                    <section className="rounded-[32px] border border-border bg-card shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead className="text-left text-xs uppercase tracking-[0.24em] text-muted-foreground">
                            <tr className="border-b border-border">
                              <th className="px-6 py-5">ID</th>
                              <th className="px-6 py-5">Title</th>
                              <th className="px-6 py-5">Author</th>
                              <th className="px-6 py-5">Price</th>
                              <th className="px-6 py-5">Stock</th>
                              <th className="px-6 py-5">Rating</th>
                              <th className="px-6 py-5 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {visibleBooks.length > 0 ? (
                              visibleBooks.map((book, index) => {
                                const stock = Number(book.stock || 0);
                                return (
                                  <tr key={book._id} className="border-b border-border last:border-b-0 hover:bg-accent/40">
                                    <td className="px-6 py-6 text-sm font-medium text-muted-foreground">
                                      {book.id ? `#${book.id}` : `#${1000 + (bookPage - 1) * PAGE_SIZE + index + 1}`}
                                    </td>
                                    <td className="px-6 py-6">
                                      <div className="max-w-[260px]">
                                        <p className="truncate font-semibold">{book.title}</p>
                                        <p className="mt-1 truncate text-sm text-muted-foreground">
                                          {getCategories(book).join(", ") || "Uncategorized"}
                                        </p>
                                      </div>
                                    </td>
                                    <td className="px-6 py-6 text-sm text-muted-foreground">{getAuthors(book)}</td>
                                    <td className="px-6 py-6 text-sm font-semibold">{money(book.price)}</td>
                                    <td className="px-6 py-6">
                                      <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground">
                                        {stock}
                                      </span>
                                    </td>
                                    <td className="px-6 py-6 text-sm text-muted-foreground">
                                      {book.rating ? `${book.rating.toFixed(1)}/5` : "N/A"}
                                    </td>
                                    <td className="px-6 py-6">
                                      <div className="flex items-center justify-end gap-4">
                                        <button
                                          type="button"
                                          onClick={() => openBookDetail(book._id)}
                                          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background text-foreground hover:bg-accent"
                                          title="View"
                                        >
                                          <span className="material-symbols-outlined text-[20px]">visibility</span>
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setBookToEdit(book);
                                            setBookEditForm({
                                              title: book.title || "",
                                              slug: book.slug || "",
                                              description: book.description || "",
                                              isbn: book.isbn || "",
                                              publisher: book.publisher || "",
                                              publicationDate: book.publicationDate || "",
                                              pages: book.pages ? String(book.pages) : "",
                                              language: book.language || "",
                                              price: String(book.price || 0),
                                              stock: String(book.stock || 0),
                                            });
                                          }}
                                          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-secondary text-foreground hover:bg-accent"
                                          title="Edit"
                                        >
                                          <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setBookToDelete(book)}
                                          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background text-destructive hover:bg-destructive/10"
                                          title="Delete"
                                        >
                                          <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td colSpan={7} className="px-6 py-16 text-center text-muted-foreground">
                                  No books found.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex flex-col gap-4 border-t border-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-muted-foreground">
                          Showing{" "}
                          <span className="font-semibold text-foreground">
                            {filteredBooks.length === 0 ? 0 : (bookPage - 1) * PAGE_SIZE + 1}-
                            {Math.min(bookPage * PAGE_SIZE, filteredBooks.length)}
                          </span>{" "}
                          of <span className="font-semibold text-foreground">{filteredBooks.length}</span>
                        </p>

                        {totalBookPages > 1 && (
                          <div className="flex items-center overflow-hidden rounded-2xl border border-border">
                            <button
                              type="button"
                              disabled={bookPage === 1}
                              onClick={() => setBookPage((prev) => Math.max(1, prev - 1))}
                              className="border-r border-border bg-secondary px-4 py-2.5 text-sm font-medium text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Previous
                            </button>
                            {pageNumbers.map((page) => (
                              <button
                                key={page}
                                type="button"
                                onClick={() => setBookPage(page)}
                                className={`min-w-11 border-r border-border px-4 py-2.5 text-sm font-medium last:border-r-0 ${
                                page === bookPage ? "bg-primary text-primary-foreground" : "bg-background text-foreground hover:bg-accent"
                                }`}
                              >
                                {page}
                              </button>
                            ))}
                            <button
                              type="button"
                              disabled={bookPage === totalBookPages}
                              onClick={() => setBookPage((prev) => Math.min(totalBookPages, prev + 1))}
                              className="bg-secondary px-4 py-2.5 text-sm font-medium text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Next
                            </button>
                          </div>
                        )}
                      </div>
                    </section>
                  </div>
                )}

                {currentSection === "orders" && (
                  <section className="mt-8 rounded-[32px] border border-border bg-card p-6 shadow-sm sm:p-8">
                    <div className="mb-6">
                      <p className="text-sm font-medium text-muted-foreground">Orders</p>
                      <h2 className="mt-2 text-2xl font-bold">Order control</h2>
                    </div>
                    <div className="space-y-4">
                      {visibleOrders.length > 0 ? (
                        visibleOrders.map((order) => (
                          <div key={order._id} className="rounded-[28px] border border-border bg-background p-5">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                              <div>
                                <p className="text-lg font-black tracking-tight">#{order._id}</p>
                                <p className="text-sm text-muted-foreground">
                                  {order.buyerName} - {order.buyerPhone}
                                </p>
                              </div>
                              <div className="flex flex-col items-end gap-3">
                                <div className="flex flex-wrap gap-2">
                                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                    {String(order.status || "").toLowerCase()}
                                  </span>
                                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground">
                                    {String(order.paymentStatus || "").toLowerCase()}
                                  </span>
                                </div>
                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => openOrderDetail(order._id)}
                                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background text-foreground hover:bg-accent"
                                  title="View"
                                >
                                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setOrderToEdit(order);
                                    setOrderEditForm({
                                      status: order.status || "",
                                      paymentStatus: order.paymentStatus || "",
                                    });
                                  }}
                                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-secondary text-foreground hover:bg-accent"
                                  title="Edit"
                                >
                                  <span className="material-symbols-outlined text-[20px]">edit</span>
                                </button>
                                <button
                                  type="button"
                                  disabled={order.status === "CANCELLED" || order.status === "COMPLETED"}
                                  onClick={() => setOrderToCancel(order)}
                                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background text-destructive hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
                                  title="Cancel"
                                >
                                  <span className="material-symbols-outlined text-[20px]">delete</span>
                                </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No orders available.</p>
                      )}
                    </div>
                    {visibleOrders.length > 0 && (
                      <div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-muted-foreground">
                          Showing{" "}
                          <span className="font-semibold text-foreground">
                            {orders.length === 0 ? 0 : (orderPage - 1) * ORDER_PAGE_SIZE + 1}-
                            {Math.min(orderPage * ORDER_PAGE_SIZE, orders.length)}
                          </span>{" "}
                          of <span className="font-semibold text-foreground">{orders.length}</span>
                        </p>

                        {totalOrderPages > 1 && (
                          <div className="flex items-center overflow-hidden rounded-2xl border border-border">
                            <button
                              type="button"
                              disabled={orderPage === 1}
                              onClick={() => setOrderPage((prev) => Math.max(1, prev - 1))}
                              className="border-r border-border bg-secondary px-4 py-2.5 text-sm font-medium text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Previous
                            </button>
                            {Array.from({ length: totalOrderPages }, (_, index) => index + 1).map((page) => (
                              <button
                                key={page}
                                type="button"
                                onClick={() => setOrderPage(page)}
                                className={`min-w-11 border-r border-border px-4 py-2.5 text-sm font-medium last:border-r-0 ${
                                  page === orderPage ? "bg-primary text-primary-foreground" : "bg-background text-foreground hover:bg-accent"
                                }`}
                              >
                                {page}
                              </button>
                            ))}
                            <button
                              type="button"
                              disabled={orderPage === totalOrderPages}
                              onClick={() => setOrderPage((prev) => Math.min(totalOrderPages, prev + 1))}
                              className="bg-secondary px-4 py-2.5 text-sm font-medium text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Next
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </section>
                )}

                {currentSection === "users" && (
                  <div className="mt-8 space-y-6">
                    <section className="rounded-[32px] border border-border bg-card p-5 shadow-sm sm:p-6">
                      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto]">
                        <label className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3">
                          <span className="material-symbols-outlined text-muted-foreground">search</span>
                          <input
                            value={userSearch}
                            onChange={(e) => {
                              setUserSearch(e.target.value);
                              setUserPage(1);
                            }}
                            placeholder="Search users by name, email, or role..."
                            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                          />
                        </label>

                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setUserToCreate(true)}
                            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:opacity-90"
                          >
                            <span className="material-symbols-outlined text-[20px]">person_add</span>
                            Add User
                          </button>
                          <button
                            type="button"
                            className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background text-foreground transition-colors hover:bg-accent"
                            title="help"
                          >
                            <span className="material-symbols-outlined text-[24px]">help</span>
                          </button>
                        </div>
                      </div>
                    </section>

                    <section className="rounded-[32px] border border-border bg-card shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead className="text-left text-xs uppercase tracking-[0.24em] text-muted-foreground">
                            <tr className="border-b border-border">
                              <th className="px-6 py-5">ID</th>
                              <th className="px-6 py-5">Username</th>
                              <th className="px-6 py-5">Email</th>
                              <th className="px-6 py-5">Role</th>
                              <th className="px-6 py-5">Joined</th>
                              <th className="px-6 py-5 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {visibleUsers.length > 0 ? (
                              visibleUsers.map((item) => {
                                const roleClass = item.role === "ADMIN" ? "bg-primary/10 text-primary" : "bg-secondary text-foreground";
                                return (
                                  <tr key={item._id} className="border-b border-border last:border-b-0 hover:bg-accent/40">
                                    <td className="px-6 py-6 text-sm font-medium text-muted-foreground">#{item._id}</td>
                                    <td className="px-6 py-6 font-semibold">{item.username}</td>
                                    <td className="px-6 py-6 text-sm text-muted-foreground">{item.email}</td>
                                    <td className="px-6 py-6">
                                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${roleClass}`}>
                                        {item.role}
                                      </span>
                                    </td>
                                    <td className="px-6 py-6 text-sm text-muted-foreground">
                                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString("vi-VN") : "N/A"}
                                    </td>
                                    <td className="px-6 py-6 text-right">
                                      <div className="flex items-center justify-end gap-3">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setUserToEdit(item);
                                            setUserEditForm({
                                              username: item.username || "",
                                              email: item.email || "",
                                              role: item.role || "USER",
                                            });
                                          }}
                                          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-secondary text-foreground hover:bg-accent"
                                          title="Edit"
                                        >
                                          <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setUserToDelete(item)}
                                          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background text-destructive hover:bg-destructive/10"
                                          title="Delete"
                                        >
                                          <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td colSpan={6} className="px-6 py-16 text-center text-muted-foreground">
                                  No users found.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex flex-col gap-4 border-t border-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-muted-foreground">
                          Showing{" "}
                          <span className="font-semibold text-foreground">
                            {filteredUsers.length === 0 ? 0 : (userPage - 1) * PAGE_SIZE + 1}-
                            {Math.min(userPage * PAGE_SIZE, filteredUsers.length)}
                          </span>{" "}
                          of <span className="font-semibold text-foreground">{filteredUsers.length}</span>
                        </p>

                        {totalUserPages > 1 && (
                          <div className="flex items-center overflow-hidden rounded-2xl border border-border">
                            <button
                              type="button"
                              disabled={userPage === 1}
                              onClick={() => setUserPage((prev) => Math.max(1, prev - 1))}
                              className="border-r border-border bg-secondary px-4 py-2.5 text-sm font-medium text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Previous
                            </button>
                            {Array.from({ length: Math.min(3, totalUserPages) }, (_, index) => {
                              const page = index + 1;
                              return (
                                <button
                                  key={page}
                                  type="button"
                                  onClick={() => setUserPage(page)}
                                  className={`min-w-11 border-r border-border px-4 py-2.5 text-sm font-medium last:border-r-0 ${
                                    page === userPage ? "bg-primary text-primary-foreground" : "bg-background text-foreground hover:bg-accent"
                                  }`}
                                >
                                  {page}
                                </button>
                              );
                            })}
                            <button
                              type="button"
                              disabled={userPage === totalUserPages}
                              onClick={() => setUserPage((prev) => Math.min(totalUserPages, prev + 1))}
                              className="bg-secondary px-4 py-2.5 text-sm font-medium text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Next
                            </button>
                          </div>
                        )}
                      </div>
                    </section>
                  </div>
                )}

                {currentSection === "categories" && (
                  <div className="mt-8 space-y-6">
                    <section className="rounded-[32px] border border-border bg-card p-5 shadow-sm sm:p-6">
                      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto]">
                        <label className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3">
                          <span className="material-symbols-outlined text-muted-foreground">search</span>
                          <input
                            value={categorySearch}
                            onChange={(e) => setCategorySearch(e.target.value)}
                            placeholder="Search categories..."
                            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => toast.info("Add category form will be connected in the next CRUD step.")}
                          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:opacity-90"
                        >
                          <span className="material-symbols-outlined text-[20px]">add</span>
                          Add Category
                        </button>
                      </div>
                    </section>

                    <section className="rounded-[32px] border border-border bg-card shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead className="text-left text-xs uppercase tracking-[0.24em] text-muted-foreground">
                            <tr className="border-b border-border">
                              <th className="px-6 py-5">ID</th>
                              <th className="px-6 py-5">Name</th>
                              <th className="px-6 py-5">Slug</th>
                              <th className="px-6 py-5">Created</th>
                              <th className="px-6 py-5 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredCategories.length > 0 ? (
                              filteredCategories.map((item) => (
                                <tr key={item._id} className="border-b border-border last:border-b-0 hover:bg-accent/40">
                                  <td className="px-6 py-6 text-sm font-medium text-muted-foreground">#{item._id}</td>
                                  <td className="px-6 py-6 font-semibold">{item.name}</td>
                                  <td className="px-6 py-6 text-sm text-muted-foreground">{item.slug}</td>
                                  <td className="px-6 py-6 text-sm text-muted-foreground">
                                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString("vi-VN") : "N/A"}
                                  </td>
                                  <td className="px-6 py-6">
                                    <div className="flex items-center justify-end gap-3">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setCategoryToEdit(item);
                                          setCategoryEditForm({
                                            name: item.name || "",
                                            slug: item.slug || "",
                                          });
                                        }}
                                        className="text-muted-foreground hover:text-foreground"
                                        title="Edit"
                                      >
                                        <span className="material-symbols-outlined text-[20px]">edit</span>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setCategoryToDelete(item)}
                                        className="text-destructive hover:opacity-80"
                                        title="Delete"
                                      >
                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={5} className="px-6 py-16 text-center text-muted-foreground">
                                  No categories found.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </section>
                  </div>
                )}

              </>
            )}
          </div>
        </main>
      </div>

      {bookToCreate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setBookToCreate(false);
          }}
        >
          <div className="w-full max-w-2xl rounded-[28px] border border-border bg-card p-6 shadow-2xl">
            <h3 className="text-2xl font-bold">Add new book</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 md:col-span-2">
                <span className="text-sm font-medium text-muted-foreground">Title</span>
                <input
                  value={bookCreateForm.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setBookCreateForm((prev) => ({
                      ...prev,
                      title,
                      slug: prev.slug || slugify(title),
                    }));
                  }}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-muted-foreground">Slug</span>
                <input
                  value={bookCreateForm.slug}
                  onChange={(e) => setBookCreateForm((prev) => ({ ...prev, slug: e.target.value }))}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-muted-foreground">Price</span>
                <input
                  type="number"
                  value={bookCreateForm.price}
                  onChange={(e) => setBookCreateForm((prev) => ({ ...prev, price: e.target.value }))}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-muted-foreground">Stock</span>
                <input
                  type="number"
                  value={bookCreateForm.stock}
                  onChange={(e) => setBookCreateForm((prev) => ({ ...prev, stock: e.target.value }))}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-muted-foreground">ISBN</span>
                <input
                  value={bookCreateForm.isbn}
                  onChange={(e) => setBookCreateForm((prev) => ({ ...prev, isbn: e.target.value }))}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                />
              </label>
              <label className="grid gap-2 md:col-span-2">
                <span className="text-sm font-medium text-muted-foreground">Description</span>
                <textarea
                  value={bookCreateForm.description}
                  onChange={(e) => setBookCreateForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="min-h-28 rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                />
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setBookToCreate(false)}
                className="rounded-2xl border border-border bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-accent"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={createBook}
                className="rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {userToCreate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setUserToCreate(false);
          }}
        >
          <div className="w-full max-w-lg rounded-[28px] border border-border bg-card p-6 shadow-2xl">
            <h3 className="text-2xl font-bold">Add new user</h3>
            <div className="mt-5 grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-muted-foreground">Username</span>
                <input
                  value={userCreateForm.username}
                  onChange={(e) => setUserCreateForm((prev) => ({ ...prev, username: e.target.value }))}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-muted-foreground">Email</span>
                <input
                  value={userCreateForm.email}
                  onChange={(e) => setUserCreateForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-muted-foreground">Password</span>
                <input
                  type="password"
                  value={userCreateForm.password}
                  onChange={(e) => setUserCreateForm((prev) => ({ ...prev, password: e.target.value }))}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-muted-foreground">Role</span>
                <select
                  value={userCreateForm.role}
                  onChange={(e) => setUserCreateForm((prev) => ({ ...prev, role: e.target.value }))}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                >
                  {["USER", "ADMIN"].map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setUserToCreate(false)}
                className="rounded-2xl border border-border bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-accent"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={createUser}
                className="rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {orderToEdit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOrderToEdit(null);
          }}
        >
          <div className="w-full max-w-lg rounded-[28px] border border-border bg-card p-6 shadow-2xl">
            <h3 className="text-2xl font-bold">Edit order</h3>
            <div className="mt-5 grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-muted-foreground">Status</span>
                <select
                  value={orderEditForm.status}
                  onChange={(e) => setOrderEditForm((prev) => ({ ...prev, status: e.target.value }))}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                >
                  {["PENDING", "PROCESSING", "SHIPPED", "COMPLETED", "CANCELLED"].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-muted-foreground">Payment Status</span>
                <select
                  value={orderEditForm.paymentStatus}
                  onChange={(e) => setOrderEditForm((prev) => ({ ...prev, paymentStatus: e.target.value }))}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                >
                  {["UNPAID", "PAID", "REFUNDED"].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOrderToEdit(null)}
                className="rounded-2xl border border-border bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-accent"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={updateOrder}
                disabled={updatingOrderId === orderToEdit._id}
                className="rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updatingOrderId === orderToEdit._id ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {orderToCancel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOrderToCancel(null);
          }}
        >
          <div className="w-full max-w-md rounded-[28px] border border-border bg-card p-6 shadow-2xl">
            <h3 className="text-2xl font-bold">Cancel order?</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              This will mark order #{orderToCancel._id} as cancelled and restore stock.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOrderToCancel(null)}
                className="rounded-2xl border border-border bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-accent"
              >
                Back
              </button>
              <button
                type="button"
                onClick={cancelOrder}
                disabled={updatingOrderId === orderToCancel._id}
                className="rounded-2xl bg-destructive px-4 py-2.5 text-sm font-semibold text-destructive-foreground disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updatingOrderId === orderToCancel._id ? "Cancelling..." : "Cancel Order"}
              </button>
            </div>
          </div>
        </div>
      )}

      {(orderDetailLoading || orderDetailError || orderDetail) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setOrderDetail(null);
              setOrderDetailId(null);
              setOrderDetailError("");
            }
          }}
        >
          <div className="w-full max-w-4xl rounded-[28px] border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Order detail</p>
                <h3 className="mt-2 text-2xl font-bold">
                  {orderDetail ? `#${orderDetail._id}` : orderDetailId ? `#${orderDetailId}` : "Loading..."}
                </h3>
                {orderDetail && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Placed on {new Date(orderDetail.orderDate).toLocaleString("vi-VN")}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setOrderDetail(null);
                  setOrderDetailId(null);
                  setOrderDetailError("");
                }}
                className="rounded-2xl border border-border bg-secondary px-4 py-2 text-sm font-semibold text-foreground hover:bg-accent"
              >
                Close
              </button>
            </div>

            {orderDetailLoading ? (
              <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">
                Loading order detail...
              </div>
            ) : orderDetailError ? (
              <div className="mt-6 rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {orderDetailError}
              </div>
            ) : (
              <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-6">
                  <div className="rounded-[24px] border border-border bg-background p-5">
                    <h4 className="text-lg font-bold">Order summary</h4>
                    <div className="mt-4 grid gap-3 text-sm">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Status</span>
                        <span className="rounded-full bg-secondary px-3 py-1 font-semibold text-foreground">
                          {orderDetail!.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Payment</span>
                        <span
                          className={`rounded-full px-3 py-1 font-semibold ${
                            orderDetail!.paymentStatus === "PAID"
                              ? "bg-primary/10 text-primary"
                              : orderDetail!.paymentStatus === "REFUNDED"
                                ? "bg-warning/15 text-warning"
                                : "bg-secondary text-foreground"
                          }`}
                        >
                          {orderDetail!.paymentStatus}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Total</span>
                        <span className="font-bold text-foreground">{money(orderDetail!.totalAmount)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Buyer</span>
                        <span className="font-medium text-foreground">{orderDetail!.buyerName}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Phone</span>
                        <span className="font-medium text-foreground">{orderDetail!.buyerPhone}</span>
                      </div>
                      {orderDetail!.buyerEmail && (
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-muted-foreground">Email</span>
                          <span className="font-medium text-foreground">{orderDetail!.buyerEmail}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-border bg-background p-5">
                    <h4 className="text-lg font-bold">Shipping address</h4>
                    <p className="mt-3 whitespace-pre-line text-sm leading-6 text-muted-foreground">
                      {orderDetail!.shippingAddress}
                    </p>
                    {orderDetail!.note && (
                      <>
                        <h5 className="mt-5 text-sm font-semibold text-foreground">Note</h5>
                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-muted-foreground">
                          {orderDetail!.note}
                        </p>
                      </>
                    )}
                    {orderDetail!.cancelReason && (
                      <>
                        <h5 className="mt-5 text-sm font-semibold text-destructive">Cancel reason</h5>
                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-destructive">
                          {orderDetail!.cancelReason}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="rounded-[24px] border border-border bg-background p-5">
                  <h4 className="text-lg font-bold">Items ({orderDetail!.items.length})</h4>
                  <div className="mt-4 space-y-4">
                    {orderDetail!.items.length > 0 ? (
                      orderDetail!.items.map((item) => (
                        <div key={item._id} className="flex gap-4 rounded-2xl border border-border p-4">
                          <div className="h-20 w-14 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-secondary">
                            <img
                              src={item.book?.images?.[0]?.url || "https://placehold.co/150x200"}
                              alt={item.book?.title || "Book"}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="line-clamp-2 font-semibold">{item.book?.title || "Unknown book"}</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Qty: {item.quantity} | {money(item.priceAtPurchase)}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {item.book?.author?.length
                                ? item.book.author
                                    .map((author) => (typeof author === "string" ? author : author.name))
                                    .join(", ")
                                : "Unknown author"}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No items found.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {(bookDetailLoading || bookDetailError || bookDetail) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setBookDetail(null);
              setBookDetailId(null);
              setBookDetailError("");
            }
          }}
        >
          <div className="w-full max-w-5xl rounded-[28px] border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Book detail</p>
                <h3 className="mt-2 text-2xl font-bold">
                  {bookDetail ? bookDetail.title : bookDetailId ? `#${bookDetailId}` : "Loading..."}
                </h3>
                {bookDetail && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Book ID #{bookDetail._id}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setBookDetail(null);
                  setBookDetailId(null);
                  setBookDetailError("");
                }}
                className="rounded-2xl border border-border bg-secondary px-4 py-2 text-sm font-semibold text-foreground hover:bg-accent"
              >
                Close
              </button>
            </div>

            {bookDetailLoading ? (
              <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">
                Loading book detail...
              </div>
            ) : bookDetailError ? (
              <div className="mt-6 rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {bookDetailError}
              </div>
            ) : (
              <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-[24px] border border-border bg-background p-5">
                  <div className="overflow-hidden rounded-2xl border border-border bg-secondary">
                    <img
                      src={bookDetail!.images?.[0]?.url || "https://placehold.co/300x420"}
                      alt={bookDetail!.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {Number(bookDetail!.stock || 0) > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground">
                      {bookDetail!.slug || "no-slug"}
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-[24px] border border-border bg-background p-5">
                    <h4 className="text-lg font-bold">Overview</h4>
                    <div className="mt-4 grid gap-3 text-sm">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Price</span>
                        <span className="font-bold text-foreground">{money(bookDetail!.price)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Stock</span>
                        <span className="font-semibold text-foreground">{bookDetail!.stock ?? 0}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">ISBN</span>
                        <span className="font-medium text-foreground">{bookDetail!.isbn || "N/A"}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Publisher</span>
                        <span className="font-medium text-foreground">{bookDetail!.publisher || "N/A"}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Language</span>
                        <span className="font-medium text-foreground">{bookDetail!.language || "N/A"}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Pages</span>
                        <span className="font-medium text-foreground">{bookDetail!.pages || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-border bg-background p-5">
                    <h4 className="text-lg font-bold">Description</h4>
                    <p className="mt-3 whitespace-pre-line text-sm leading-6 text-muted-foreground">
                      {bookDetail!.description || "No description provided."}
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-[24px] border border-border bg-background p-5">
                      <h4 className="text-lg font-bold">Authors</h4>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {Array.isArray(bookDetail!.author) && bookDetail!.author.length > 0 ? (
                          bookDetail!.author.map((author, index) => (
                            <span
                              key={`${typeof author === "string" ? author : author._id}-${index}`}
                              className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground"
                            >
                              {typeof author === "string" ? author : author.name}
                            </span>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">Unknown author</p>
                        )}
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-border bg-background p-5">
                      <h4 className="text-lg font-bold">Categories</h4>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {Array.isArray(bookDetail!.categories) && bookDetail!.categories.length > 0 ? (
                          bookDetail!.categories.map((category, index) => (
                            <span
                              key={`${typeof category === "string" ? category : category._id}-${index}`}
                              className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                            >
                              {typeof category === "string" ? category : category.name}
                            </span>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">Uncategorized</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {userToEdit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setUserToEdit(null);
          }}
        >
          <div className="w-full max-w-lg rounded-[28px] border border-border bg-card p-6 shadow-2xl">
            <h3 className="text-2xl font-bold">Edit user</h3>
            <div className="mt-5 grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-muted-foreground">Username</span>
                <input
                  value={userEditForm.username}
                  onChange={(e) => setUserEditForm((prev) => ({ ...prev, username: e.target.value }))}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-muted-foreground">Email</span>
                <input
                  value={userEditForm.email}
                  onChange={(e) => setUserEditForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-muted-foreground">Role</span>
                <select
                  value={userEditForm.role}
                  onChange={(e) => setUserEditForm((prev) => ({ ...prev, role: e.target.value }))}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                >
                  {["USER", "ADMIN"].map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setUserToEdit(null)}
                className="rounded-2xl border border-border bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-accent"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={updateUser}
                disabled={updatingUserId === userToEdit._id}
                className="rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updatingUserId === userToEdit._id ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {userToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setUserToDelete(null);
          }}
        >
          <div className="w-full max-w-md rounded-[28px] border border-border bg-card p-6 shadow-2xl">
            <h3 className="text-2xl font-bold">Delete user?</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              {userToDelete.username} will be permanently removed.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setUserToDelete(null)}
                className="rounded-2xl border border-border bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-accent"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={deleteUser}
                disabled={updatingUserId === userToDelete._id}
                className="rounded-2xl bg-destructive px-4 py-2.5 text-sm font-semibold text-destructive-foreground disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updatingUserId === userToDelete._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {categoryToEdit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setCategoryToEdit(null);
          }}
        >
          <div className="w-full max-w-lg rounded-[28px] border border-border bg-card p-6 shadow-2xl">
            <h3 className="text-2xl font-bold">Edit category</h3>
            <div className="mt-5 grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-muted-foreground">Name</span>
                <input
                  value={categoryEditForm.name}
                  onChange={(e) => setCategoryEditForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-muted-foreground">Slug</span>
                <input
                  value={categoryEditForm.slug}
                  onChange={(e) => setCategoryEditForm((prev) => ({ ...prev, slug: e.target.value }))}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                />
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setCategoryToEdit(null)}
                className="rounded-2xl border border-border bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-accent"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={updateCategory}
                disabled={updatingCategoryId === categoryToEdit._id}
                className="rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updatingCategoryId === categoryToEdit._id ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {categoryToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setCategoryToDelete(null);
          }}
        >
          <div className="w-full max-w-md rounded-[28px] border border-border bg-card p-6 shadow-2xl">
            <h3 className="text-2xl font-bold">Delete category?</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              {categoryToDelete.name} will be permanently removed.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setCategoryToDelete(null)}
                className="rounded-2xl border border-border bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-accent"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={deleteCategory}
                disabled={updatingCategoryId === categoryToDelete._id}
                className="rounded-2xl bg-destructive px-4 py-2.5 text-sm font-semibold text-destructive-foreground disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updatingCategoryId === categoryToDelete._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {bookToEdit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setBookToEdit(null);
          }}
        >
          <div className="w-full max-w-2xl rounded-[28px] border border-border bg-card p-6 shadow-2xl">
            <h3 className="text-2xl font-bold">Edit book</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 md:col-span-2">
                <span className="text-sm font-medium text-muted-foreground">Title</span>
                <input
                  value={bookEditForm.title}
                  onChange={(e) => setBookEditForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-muted-foreground">Slug</span>
                <input
                  value={bookEditForm.slug}
                  onChange={(e) => setBookEditForm((prev) => ({ ...prev, slug: e.target.value }))}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-muted-foreground">ISBN</span>
                <input
                  value={bookEditForm.isbn}
                  onChange={(e) => setBookEditForm((prev) => ({ ...prev, isbn: e.target.value }))}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                />
              </label>
              <label className="grid gap-2 md:col-span-2">
                <span className="text-sm font-medium text-muted-foreground">Description</span>
                <textarea
                  value={bookEditForm.description}
                  onChange={(e) => setBookEditForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="min-h-28 rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-muted-foreground">Publisher</span>
                <input
                  value={bookEditForm.publisher}
                  onChange={(e) => setBookEditForm((prev) => ({ ...prev, publisher: e.target.value }))}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-muted-foreground">Language</span>
                <input
                  value={bookEditForm.language}
                  onChange={(e) => setBookEditForm((prev) => ({ ...prev, language: e.target.value }))}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-muted-foreground">Price</span>
                <input
                  type="number"
                  value={bookEditForm.price}
                  onChange={(e) => setBookEditForm((prev) => ({ ...prev, price: e.target.value }))}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-muted-foreground">Stock</span>
                <input
                  type="number"
                  value={bookEditForm.stock}
                  onChange={(e) => setBookEditForm((prev) => ({ ...prev, stock: e.target.value }))}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
                />
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setBookToEdit(null)}
                className="rounded-2xl border border-border bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-accent"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={updateBook}
                disabled={updatingBookId === bookToEdit._id}
                className="rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updatingBookId === bookToEdit._id ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {bookToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setBookToDelete(null);
          }}
        >
          <div className="w-full max-w-md rounded-[28px] border border-border bg-card p-6 shadow-2xl">
            <h3 className="text-2xl font-bold">Delete book?</h3>
            <p className="mt-3 text-sm text-muted-foreground">{bookToDelete.title} will be removed from the catalog.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setBookToDelete(null)}
                className="rounded-2xl border border-border bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-accent"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={deleteBook}
                disabled={deletingBookId === bookToDelete._id}
                className="rounded-2xl bg-destructive px-4 py-2.5 text-sm font-semibold text-destructive-foreground disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletingBookId === bookToDelete._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
