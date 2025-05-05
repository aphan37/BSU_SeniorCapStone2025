
import { useState } from "react";
import ProductCard from "./ProductCard";
import { getFeaturedProducts } from "@/data/productsData";
import { Button } from "@/components/ui/button";

const FeaturedProductsSection = () => {
  const featuredProducts = getFeaturedProducts();
  const [visibleCount, setVisibleCount] = useState(4);
  
  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, featuredProducts.length));
  };
  
  const showMoreButton = visibleCount < featuredProducts.length;
  
  return (
    <section className="py-12">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Deals</h2>
          <a href="/products" className="text-bsu-gold hover:underline font-medium">
            View all
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, visibleCount).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {showMoreButton && (
          <div className="flex justify-center mt-10">
            <Button 
              onClick={handleShowMore}
              variant="outline"
              className="border-bsu-gold text-bsu-gold hover:bg-bsu-gold hover:text-black"
            >
              Show More Products
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
