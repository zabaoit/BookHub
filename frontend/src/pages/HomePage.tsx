import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import SaleBanner from "../components/SaleBanner";
import CategoriesSection from "../components/CategoriesSection";
import FeaturedSection from "../components/FeaturedSection";
import NewsLetter from "../components/NewsLetter";

const HomePage = () => {
  return (
    <div>
      <Header />
      {/* Main content */}
      <main className="flex-grow">
        {/* <!-- HeroSection --> */}
        <HeroSection />
        {/* <!-- Flash Sale Banner --> */}
        <SaleBanner />
        {/* <!-- Categories Section --> */}
        <CategoriesSection />
        {/* <!-- Featured Books Section --> */}
        <FeaturedSection />

        {/* <!-- Newsletter Signup --> */}
        <NewsLetter />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

