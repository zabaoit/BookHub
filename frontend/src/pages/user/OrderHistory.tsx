import { useEffect, useState } from "react";
import { Link } from "react-router";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SideNavBarProfile from "../../components/SideNavBarProfile";
import { orderService } from "../../services/orderService";

interface OrderItem {
  _id: string;
  quantity: number;
  priceAtPurchase: number;
  book: {
    title: string;
  };
}

interface Order {
  _id: string;
  created_at: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  items?: OrderItem[];
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await orderService.getUserOrders({
          page,
          limit: 10,
          status: statusFilter || undefined,
        });
        setOrders(response.data);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Lỗi khi tải lịch sử đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [page, statusFilter]);

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setPage(1); // Reset page on filter change
  };

  const getStatusNode = (status: string) => {
    let colorClass = "bg-subtle-light dark:bg-subtle-dark";
    let text = status;

    switch (status) {
      case "PENDING":
        colorClass = "bg-warning";
        text = "Pending";
        break;
      case "PROCESSING":
        colorClass = "bg-blue-500";
        text = "Processing";
        break;
      case "SHIPPED":
        colorClass = "bg-blue-600";
        text = "Shipped";
        break;
      case "COMPLETED":
      case "DELIVERED":
        colorClass = "bg-success";
        text = "Completed";
        break;
      case "CANCELLED":
        colorClass = "bg-error";
        text = "Cancelled";
        break;
      default:
        break;
    }

    return (
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${colorClass}`}></span>
        <span className="text-text-light dark:text-text-dark">{text}</span>
      </div>
    );
  };
  return (
    <div>
      <Header />
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="flex-grow w-full max-w-screen-2xl mx-auto flex ">
          {/* <!-- SideNavBar --> */}
          <SideNavBarProfile />
          {/* <!-- Main Content --> */}
          <main className="flex-1 min-w-0 p-6 bg-background-light dark:bg-background-dark">
            <div className="flex flex-col overflow-x-hidden">
              {/* <!-- PageHeading --> */}
              <div className="flex flex-wrap justify-between gap-3">
                <h1 className="text-text-light dark:text-text-dark text-4xl font-black font-heading leading-tight tracking-[-0.033em]">
                  Order History
                </h1>
              </div>
              {/* <!-- Filters & Search --> */}
              <div className="flex flex-col md:flex-row gap-6 justify-between py-4">
                {/* <!-- Chips --> */}
                <div className="flex gap-2 p-1 overflow-x-auto">
                  <button 
                    onClick={() => handleStatusFilter("")}
                    className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 border border-border-light dark:border-border-dark ${
                      statusFilter === "" ? "bg-primary text-white" : "bg-white dark:bg-background-dark hover:bg-primary/10"
                    }`}
                  >
                    <p className={`text-sm font-medium leading-normal ${statusFilter === "" ? "text-white" : "text-text-light dark:text-text-dark"}`}>All</p>
                  </button>
                  <button 
                    onClick={() => handleStatusFilter("PENDING")}
                    className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 border border-border-light dark:border-border-dark ${
                      statusFilter === "PENDING" ? "bg-primary text-white" : "bg-white dark:bg-background-dark hover:bg-primary/10"
                    }`}
                  >
                    <p className={`text-sm font-medium leading-normal ${statusFilter === "PENDING" ? "text-white" : "text-text-light dark:text-text-dark"}`}>Pending</p>
                  </button>
                  <button 
                    onClick={() => handleStatusFilter("PROCESSING")}
                    className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 border border-border-light dark:border-border-dark ${
                      statusFilter === "PROCESSING" ? "bg-primary text-white" : "bg-white dark:bg-background-dark hover:bg-primary/10"
                    }`}
                  >
                    <p className={`text-sm font-medium leading-normal ${statusFilter === "PROCESSING" ? "text-white" : "text-text-light dark:text-text-dark"}`}>Processing</p>
                  </button>
                  <button 
                    onClick={() => handleStatusFilter("SHIPPED")}
                    className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 border border-border-light dark:border-border-dark ${
                      statusFilter === "SHIPPED" ? "bg-primary text-white" : "bg-white dark:bg-background-dark hover:bg-primary/10"
                    }`}
                  >
                    <p className={`text-sm font-medium leading-normal ${statusFilter === "SHIPPED" ? "text-white" : "text-text-light dark:text-text-dark"}`}>Shipped</p>
                  </button>
                  <button 
                    onClick={() => handleStatusFilter("COMPLETED")}
                    className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 border border-border-light dark:border-border-dark ${
                      statusFilter === "COMPLETED" ? "bg-primary text-white" : "bg-white dark:bg-background-dark hover:bg-primary/10"
                    }`}
                  >
                    <p className={`text-sm font-medium leading-normal ${statusFilter === "COMPLETED" ? "text-white" : "text-text-light dark:text-text-dark"}`}>Completed</p>
                  </button>
                  <button 
                    onClick={() => handleStatusFilter("CANCELLED")}
                    className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 border border-border-light dark:border-border-dark ${
                      statusFilter === "CANCELLED" ? "bg-primary text-white" : "bg-white dark:bg-background-dark hover:bg-primary/10"
                    }`}
                  >
                    <p className={`text-sm font-medium leading-normal ${statusFilter === "CANCELLED" ? "text-white" : "text-text-light dark:text-text-dark"}`}>Cancelled</p>
                  </button>
                </div>
                {/* <!-- SearchBar --> */}
                <div className="w-full md:w-80">
                  <label className="flex flex-col h-12 w-full">
                    <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-white dark:bg-background-dark border border-border-light dark:border-border-dark">
                      <div className="text-subtle-light dark:text-subtle-dark flex items-center justify-center pl-4">
                        <span className="material-symbols-outlined">
                          search
                        </span>
                      </div>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-white dark:bg-background-dark h-full placeholder:text-subtle-light dark:placeholder:text-subtle-dark px-4 pl-2 text-base font-normal leading-normal"
                        placeholder="Search by Order ID or date..."
                        value=""
                      />
                    </div>
                  </label>
                </div>
              </div>
              {/* <!-- Table --> */}

              <div className="mt-3 overflow-x-auto rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-background-dark">
                <table className="w-full border-collapse min-w-[640px]">
                  <thead>
                    <tr className="bg-background-light/50 dark:bg-background-dark/50">
                      <th className="px-4 py-3 text-left text-text-light dark:text-text-dark font-heading text-sm font-bold">
                        Order ID
                      </th>
                      <th className="px-4 py-3 text-left text-text-light dark:text-text-dark font-heading text-sm font-bold">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-text-light dark:text-text-dark font-heading text-sm font-bold">
                        Total
                      </th>
                      <th className="px-4 py-3 text-left text-text-light dark:text-text-dark font-heading text-sm font-bold">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-text-light dark:text-text-dark font-heading text-sm font-bold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="h-32 text-center text-subtle-light dark:text-subtle-dark">
                          Loading orders...
                        </td>
                      </tr>
                    ) : orders.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="h-32 text-center text-subtle-light dark:text-subtle-dark">
                          No orders found.
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order._id} className="border-t border-t-border-light dark:border-t-border-dark">
                          <td className="h-[72px] px-4 py-2 text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">
                            #{order._id.substring(0, 8)}...
                          </td>
                          <td className="h-[72px] px-4 py-2 text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">
                            {new Date(order.created_at || new Date()).toLocaleDateString("vi-VN", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </td>
                          <td className="h-[72px] px-4 py-2 text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">
                            {order.totalAmount?.toLocaleString("vi-VN")}đ
                          </td>
                          <td className="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
                            {getStatusNode(order.status)}
                          </td>
                          <td className="h-[72px] px-4 py-2 text-sm font-bold leading-normal tracking-[0.015em] hover:underline cursor-pointer">
                            <Link to={`/account/order-history/${order._id}`} className="text-primary">
                              View Details
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* <!-- Pagination --> */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 pt-6">
                  <button 
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="flex items-center justify-center h-10 w-10 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark hover:bg-primary/10 disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-text-light dark:text-text-dark">
                      chevron_left
                    </span>
                  </button>
                  
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setPage(idx + 1)}
                      className={`flex items-center justify-center h-10 w-10 rounded-lg ${
                        page === idx + 1 
                          ? "bg-primary text-white" 
                          : "bg-white dark:bg-background-dark border border-border-light dark:border-border-dark hover:bg-primary/10 text-text-light dark:text-text-dark"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}

                  <button 
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="flex items-center justify-center h-10 w-10 rounded-lg bg-white dark:bg-background-dark border border-border-light dark:border-border-dark hover:bg-primary/10 disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-text-light dark:text-text-dark">
                      chevron_right
                    </span>
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistory;

