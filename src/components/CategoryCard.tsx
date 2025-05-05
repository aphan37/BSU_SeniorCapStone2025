
import { Category } from "@/data/productsData";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { name, slug, description, image } = category;
  
  return (
    <Link to={`/products?category=${slug}`} className="block group">
      <div className="bsu-card relative overflow-hidden h-48">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 p-5 flex flex-col justify-end">
          <h3 className="text-white text-xl font-bold">{name}</h3>
          <p className="text-white/80 text-sm mt-1">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
