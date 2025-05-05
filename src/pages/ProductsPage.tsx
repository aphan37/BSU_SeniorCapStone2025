
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories, Product } from "@/data/productsData";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeFilters, setActiveFilters] = useState({
    categories: categoryParam ? [categoryParam] : [],
    brands: [] as string[],
    priceRange: [0, 1500],
    sort: "featured",
  });
  
  // Get unique brands from products
  const uniqueBrands = Array.from(new Set(products.map(product => product.brand)));
  
  useEffect(() => {
    let filtered = [...products];
    
    // Apply category filter
    if (activeFilters.categories.length > 0) {
      filtered = filtered.filter(product => 
        activeFilters.categories.includes(product.category)
      );
    }
    
    // Apply brand filter
    if (activeFilters.brands.length > 0) {
      filtered = filtered.filter(product => 
        activeFilters.brands.includes(product.brand)
      );
    }
    
    // Apply price range filter
    filtered = filtered.filter(product => 
      product.discountedPrice >= activeFilters.priceRange[0] &&
      product.discountedPrice <= activeFilters.priceRange[1]
    );
    
    // Apply sorting
    switch (activeFilters.sort) {
      case "price-asc":
        filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case "discount":
        filtered.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
    
    setFilteredProducts(filtered);
  }, [activeFilters]);
  
  const toggleCategoryFilter = (categorySlug: string) => {
    setActiveFilters(prev => {
      if (prev.categories.includes(categorySlug)) {
        return {
          ...prev,
          categories: prev.categories.filter(c => c !== categorySlug)
        };
      } else {
        return {
          ...prev,
          categories: [...prev.categories, categorySlug]
        };
      }
    });
  };
  
  const toggleBrandFilter = (brand: string) => {
    setActiveFilters(prev => {
      if (prev.brands.includes(brand)) {
        return {
          ...prev,
          brands: prev.brands.filter(b => b !== brand)
        };
      } else {
        return {
          ...prev,
          brands: [...prev.brands, brand]
        };
      }
    });
  };
  
  const handlePriceChange = (value: number[]) => {
    setActiveFilters(prev => ({
      ...prev,
      priceRange: value as [number, number]
    }));
  };
  
  const handleSortChange = (value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      sort: value
    }));
  };
  
  const clearAllFilters = () => {
    setActiveFilters({
      categories: [],
      brands: [],
      priceRange: [0, 1500],
      sort: "featured"
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gray-50 py-8">
          <div className="container">
            <h1 className="text-3xl font-bold mb-2">Tech Deals</h1>
            <p className="text-muted-foreground">
              Browse exclusive discounts for Bowie State University students
            </p>
          </div>
        </div>
        
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearAllFilters}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Clear all
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {/* Categories filter */}
                  <div>
                    <h3 className="font-medium mb-3">Categories</h3>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <div key={category.id} className="flex items-center">
                          <Checkbox 
                            id={`category-${category.slug}`}
                            checked={activeFilters.categories.includes(category.slug)}
                            onCheckedChange={() => toggleCategoryFilter(category.slug)}
                          />
                          <label
                            htmlFor={`category-${category.slug}`}
                            className="ml-2 text-sm cursor-pointer"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Brands filter */}
                  <div>
                    <h3 className="font-medium mb-3">Brands</h3>
                    <div className="space-y-2">
                      {uniqueBrands.map(brand => (
                        <div key={brand} className="flex items-center">
                          <Checkbox 
                            id={`brand-${brand}`}
                            checked={activeFilters.brands.includes(brand)}
                            onCheckedChange={() => toggleBrandFilter(brand)}
                          />
                          <label
                            htmlFor={`brand-${brand}`}
                            className="ml-2 text-sm cursor-pointer"
                          >
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price range filter */}
                  <div>
                    <h3 className="font-medium mb-3">Price Range</h3>
                    <Slider
                      defaultValue={[0, 1500]}
                      min={0}
                      max={1500}
                      step={50}
                      value={activeFilters.priceRange}
                      onValueChange={handlePriceChange}
                      className="my-6"
                    />
                    <div className="flex justify-between text-sm">
                      <span>${activeFilters.priceRange[0]}</span>
                      <span>${activeFilters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredProducts.length} products
                </p>
                <div className="flex items-center">
                  <span className="text-sm mr-2">Sort by:</span>
                  <Select value={activeFilters.sort} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="discount">Biggest Discount</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your filters to find what you're looking for.</p>
                  <Button onClick={clearAllFilters}>Clear All Filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
