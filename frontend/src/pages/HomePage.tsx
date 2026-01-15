import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import SaleBanner from "../components/SaleBanner";
import NewsLetter from "../components/NewsLetter";
import NewArrivals from "../components/NewArrivals";

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
        {/* <CategoriesSection /> */}
        {/* <!-- Featured Books Section --> */}
        <NewArrivals />

        {/* <!-- Newsletter Signup --> */}
        <NewsLetter />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
