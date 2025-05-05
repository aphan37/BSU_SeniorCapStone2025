
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-bsu-gold text-lg mb-4">BSU Tech Deals</h3>
            <p className="text-gray-400">
              Exclusive tech deals and discounts for Bowie State University students.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-bsu-gold">Home</a></li>
              <li><a href="/products" className="text-gray-400 hover:text-bsu-gold">Products</a></li>
              <li><a href="/categories" className="text-gray-400 hover:text-bsu-gold">Categories</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-bsu-gold">About</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="/products?category=laptops" className="text-gray-400 hover:text-bsu-gold">Laptops</a></li>
              <li><a href="/products?category=phones" className="text-gray-400 hover:text-bsu-gold">Phones</a></li>
              <li><a href="/products?category=tablets" className="text-gray-400 hover:text-bsu-gold">Tablets</a></li>
              <li><a href="/products?category=accessories" className="text-gray-400 hover:text-bsu-gold">Accessories</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li><a href="mailto:support@bsutech.edu" className="text-gray-400 hover:text-bsu-gold">support@bsutech.edu</a></li>
              <li><span className="text-gray-400">Bowie State University</span></li>
              <li><span className="text-gray-400">14000 Jericho Park Road</span></li>
              <li><span className="text-gray-400">Bowie, MD 20715</span></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} BSU Tech Deals. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center mt-4 md:mt-0">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> for BSU Students
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
