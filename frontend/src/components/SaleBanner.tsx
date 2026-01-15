import { Clock, Headphones, Shield, Truck } from "lucide-react";
const SaleBanner = () => {
  return (
    <section className="py-12 border-b border-border">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-secondary rounded-lg">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium text-sm">Miễn phí vận chuyển</p>
              <p className="text-xs text-muted-foreground">Đơn từ 300K</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-secondary rounded-lg">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium text-sm">Đảm bảo chất lượng</p>
              <p className="text-xs text-muted-foreground">Sách chính hãng</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-secondary rounded-lg">
              <Headphones className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium text-sm">Hỗ trợ 24/7</p>
              <p className="text-xs text-muted-foreground">Hotline 1900 1234</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-secondary rounded-lg">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium text-sm">Giao hàng nhanh</p>
              <p className="text-xs text-muted-foreground">2-3 ngày</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaleBanner;
