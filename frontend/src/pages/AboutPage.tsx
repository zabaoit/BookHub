import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary/10 py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold font-display text-foreground mb-4">
              Về BookHub
            </h1>
            <p className="text-lg text-muted-foreground w-full max-w-2xl mx-auto">
              Nền tảng mua sắm sách trực tuyến hàng đầu, mang tri thức đến từng ngôi nhà của bạn.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <img
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2000&auto=format&fit=crop"
                  alt="Reading book"
                  className="rounded-2xl shadow-lg object-cover w-full h-80"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4 font-display">Câu Chuyện Của Chúng Tôi</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Được thành lập từ năm 2024, BookHub ra đời với sứ mệnh lan tỏa văn hóa đọc đến mọi người. 
                  Chúng tôi tin rằng, mỗi cuốn sách là một thế giới thu nhỏ, chứa đựng những ý tưởng, kiến thức và cảm xúc tuyệt vời có khả năng thay đổi cuộc đời.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Trải qua quá trình phát triển, BookHub tự hào là nơi cung cấp hàng ngàn tựa sách từ văn học, kỹ năng, kinh tế cho đến sách ngoại văn, đáp ứng mọi nhu cầu của độc giả Việt Nam.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Value Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12 font-display">Giá Trị Cốt Lõi</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                <span className="material-symbols-outlined text-5xl text-primary mb-4 block">menu_book</span>
                <h3 className="text-xl font-bold mb-3">Chất lượng hàng đầu</h3>
                <p className="text-muted-foreground">100% sách chính hãng, cam kết bản quyền và chất lượng in ấn tốt nhất.</p>
              </div>
              {/* Card 2 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                <span className="material-symbols-outlined text-5xl text-primary mb-4 block">local_shipping</span>
                <h3 className="text-xl font-bold mb-3">Giao hàng siêu tốc</h3>
                <p className="text-muted-foreground">Đóng gói cẩn thận, vận chuyển nhanh chóng tới mọi miền tổ quốc.</p>
              </div>
              {/* Card 3 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                <span className="material-symbols-outlined text-5xl text-primary mb-4 block">support_agent</span>
                <h3 className="text-xl font-bold mb-3">Hỗ trợ tận tâm</h3>
                <p className="text-muted-foreground">Đội ngũ chăm sóc khách hàng luôn sẵn sàng lắng nghe và giải đáp 24/7.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
