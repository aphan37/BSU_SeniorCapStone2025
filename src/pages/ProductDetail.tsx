
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ChevronLeft } from "lucide-react";
import { Product } from "@/data/productsData";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDiscountSection from "@/components/product/ProductDiscountSection";
import { fetchProductById } from "@/services/productService";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product?.name} has been added to your cart.`,
    });
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
            <ChevronLeft className="mr-1 h-4 w-4" /> Back to Products
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 animate-fade-in">
            <div className="bg-white rounded-lg overflow-hidden border">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>

            <div>
              <div className="mb-2">
                <span className="text-sm text-muted-foreground">{product.brand}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>

              <div className="flex items-center mt-2">
                <Star className="h-5 w-5 fill-bsu-gold text-bsu-gold" />
                <span className="ml-1 font-medium">{product.rating}</span>
                <span className="text-muted-foreground ml-1">({product.reviewCount} reviews)</span>
              </div>

              <div className="mt-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">${product.discountedPrice}</span>
                  <span className="ml-3 text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                  <span className="ml-3 text-sm bg-red-100 text-red-700 px-2 py-1 rounded-full">
                    {product.discountPercentage}% OFF
                  </span>
                </div>
                
                {product.dealEnds && (
                  <div className="mt-2 text-sm text-red-600">
                    Deal ends on {product.dealEnds.toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="my-6 border-t border-b py-6">
                <h3 className="font-semibold mb-3">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-bsu-gold hover:bg-bsu-gold/90 text-black flex-1"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                  Save for Later
                </Button>
              </div>

              <ProductDiscountSection 
                productId={product.id}
                productName={product.name}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
