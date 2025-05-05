
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedProductsSection from "@/components/FeaturedProductsSection";
import CategoriesSection from "@/components/CategoriesSection";
import StudentVerification from "@/components/StudentVerification";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedProductsSection />
        <CategoriesSection />
        <StudentVerification />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
