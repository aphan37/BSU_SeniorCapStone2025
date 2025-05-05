
import { Star } from "lucide-react";
import { Product } from "@/data/productsData";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const {
    id,
    name,
    brand,
    originalPrice,
    discountedPrice,
    discountPercentage,
    image,
    rating,
    reviewCount,
    isNew
  } = product;

  return (
    <Link to={`/product/${id}`} className="group">
      <div className="bsu-card group relative animate-fade-in">
        <div className="overflow-hidden">
          <img
            src={image}
            alt={name}
            className="bsu-product-image"
          />
        </div>
        
        {isNew && <span className="bsu-badge">New</span>}
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">{brand}</p>
              <h3 className="font-semibold text-lg mt-1 line-clamp-2">{name}</h3>
            </div>
          </div>
          
          <div className="flex items-center mt-2">
            <Star className="h-4 w-4 fill-bsu-gold text-bsu-gold" />
            <span className="ml-1 text-sm font-medium">{rating}</span>
            <span className="text-sm text-muted-foreground ml-1">({reviewCount})</span>
          </div>
          
          <div className="mt-3 flex items-center">
            <span className="text-lg font-bold">${discountedPrice}</span>
            <span className="ml-2 text-sm text-muted-foreground line-through">${originalPrice}</span>
            <span className="ml-2 text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
              {discountPercentage}% OFF
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
