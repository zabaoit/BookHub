import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Khám phá thế giới
              <br />
              qua từng trang sách
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Hàng ngàn đầu sách từ văn học đến khoa học, từ kinh tế đến phát
              triển bản thân. Tìm cuốn sách hoàn hảo cho bạn.
            </p>
            <div className="flex gap-4">
              <Link to="/booklist">
                <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors">
                  Khám phá ngay
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link to="/about">
                <button className="px-6 py-3 border border-border bg-card text-foreground font-bold rounded-lg hover:bg-secondary transition-colors">
                  Về chúng tôi
                </button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600"
              alt="Books"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
