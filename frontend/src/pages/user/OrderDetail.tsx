import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { orderService } from "../../services/orderService";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface OrderDetailData {
  _id: string;
  orderDate: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  shippingAddress: string;
  buyerName: string;
  buyerPhone: string;
  items: Array<{
    _id: string;
    quantity: number;
    priceAtPurchase: number;
    book: {
      title: string;
      images: Array<{ url: string }>;
      author: Array<{ name: string }>;
    };
  }>;
}

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!id) return;
        const res = await orderService.getOrderById(id);
        setOrder(res.data);
      } catch (error) {
        console.error("Lỗi khi tải chi tiết đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <h2 className="text-2xl font-bold">Không tìm thấy đơn hàng</h2>
        <Link to="/account/order-history" className="text-primary hover:underline">
          Quay lại lịch sử đơn hàng
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="min-h-screen bg-background-light dark:bg-background-dark py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          
          {/* Back Button & Header */}
          <div className="flex items-center gap-4">
            <Link to="/account/order-history" className="flex items-center justify-center p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-text-light dark:text-text-dark">arrow_back</span>
            </Link>
            <h1 className="text-3xl font-bold font-heading text-text-light dark:text-text-dark">Chi tiết đơn hàng #{order._id.substring(0, 8).toUpperCase()}</h1>
          </div>

          {/* Order Info Card */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-black p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Thông tin chung</h3>
              <div className="space-y-3 text-sm text-subtle-light dark:text-subtle-dark">
                <div className="flex justify-between">
                  <span>Ngày đặt:</span>
                  <span className="font-medium text-text-light dark:text-text-dark">
                    {new Date(order.orderDate).toLocaleString("vi-VN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Trạng thái giao:</span>
                  <span className="font-medium text-text-light dark:text-text-dark">
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Thanh toán:</span>
                  <span className={`font-medium ${order.paymentStatus === "PAID" ? "text-success" : "text-warning"}`}>
                    {order.paymentStatus === "PAID" ? "Đã thanh toán" : "Chưa thanh toán"}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-black p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Địa chỉ giao hàng</h3>
              <div className="space-y-2 text-sm text-subtle-light dark:text-subtle-dark">
                <p className="font-medium text-text-light dark:text-text-dark">{order.buyerName}</p>
                <p>{order.buyerPhone}</p>
                <p>{order.shippingAddress}</p>
              </div>
            </div>
          </div>

          {/* Ordered Items */}
          <div className="rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-black p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-bold">Sản phẩm đã mua</h3>
            <div className="space-y-6">
              {order.items.map((item) => (
                <div key={item._id} className="flex gap-4">
                  <div className="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-md border border-border-light dark:border-border-dark">
                    <img
                      src={item.book.images?.[0]?.url || "https://placehold.co/150x200"}
                      alt={item.book.title}
                      className="absolute h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h4 className="font-medium line-clamp-2 text-text-light dark:text-text-dark">{item.book.title}</h4>
                      <p className="mt-1 text-sm text-subtle-light dark:text-subtle-dark">
                        {item.book.author?.map(a => a.name).join(", ")}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm font-medium text-subtle-light dark:text-subtle-dark">x{item.quantity}</p>
                      <p className="font-bold text-text-light dark:text-text-dark">
                        {item.priceAtPurchase.toLocaleString("vi-VN")}đ
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 border-t border-border-light dark:border-border-dark pt-6">
              <div className="flex justify-between items-center text-lg font-bold text-text-light dark:text-text-dark">
                <span>Tổng cộng:</span>
                <span className="text-primary">{order.totalAmount.toLocaleString("vi-VN")}đ</span>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderDetail;
