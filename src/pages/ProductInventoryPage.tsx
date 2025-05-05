
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Product } from "@/data/productsData";
import { fetchProductById } from "@/services/productService";

const ProductInventoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  // Simulate random inventory between 5-50 items
  const [quantityLeft] = useState(() => Math.floor(Math.random() * 46) + 5);

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      if (id) {
        try {
          const fetchedProduct = await fetchProductById(id);
          setProduct(fetchedProduct || undefined);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
      setIsLoading(false);
    };
    
    loadProduct();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-64 w-full max-w-md bg-gray-200 rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <Button onClick={handleGoBack}>Go Back</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const inventoryStatus = quantityLeft <= 10 ? "low-stock" : "in-stock";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container py-8">
          <Button
            variant="ghost"
            className="mb-6 pl-0"
            onClick={handleGoBack}
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Back
          </Button>

          <div className="bg-white rounded-xl shadow-md overflow-hidden border">
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-xl text-muted-foreground mb-6">{product.brand}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Inventory Status</h2>
                    <div className="flex items-center">
                      <span 
                        className={`inline-block w-3 h-3 rounded-full mr-2 ${
                          inventoryStatus === "low-stock" ? "bg-amber-500" : "bg-green-500"
                        }`}
                      />
                      <span className="font-medium">
                        {inventoryStatus === "low-stock" ? "Low Stock" : "In Stock"}
                      </span>
                    </div>
                    <p className="text-3xl font-bold mt-2">
                      {quantityLeft} <span className="text-lg text-muted-foreground">units left</span>
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Product Details</h2>
                    <p className="text-muted-foreground">{product.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Pricing</h2>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">${product.discountedPrice}</span>
                      <span className="ml-3 text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                      <span className="ml-3 text-sm bg-red-100 text-red-700 px-2 py-1 rounded-full">
                        {product.discountPercentage}% OFF
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductInventoryPage;
