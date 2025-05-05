
import { categories } from "@/data/productsData";
import CategoryCard from "./CategoryCard";

const CategoriesSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Browse Categories</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
