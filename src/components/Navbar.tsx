
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2">
            <div className="bg-bsu-gold p-1.5 rounded">
              <span className="font-bold text-black text-xl">BSU</span>
            </div>
            {!isMobile && <span className="font-bold text-xl">Tech Deals</span>}
          </a>
        </div>
        
        {isSearchOpen && !isMobile ? (
          <div className="flex-1 mx-6">
            <div className="relative">
              <Input 
                placeholder="Search for products..." 
                className="pl-8 w-full"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="font-medium hover:text-bsu-gold">Home</a>
            <a href="/products" className="font-medium hover:text-bsu-gold">Products</a>
            <a href="/categories" className="font-medium hover:text-bsu-gold">Categories</a>
            <a href="/about" className="font-medium hover:text-bsu-gold">About</a>
          </div>
        )}
        
        <div className="flex items-center gap-4">
          {!isSearchOpen && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          <Button className="bg-bsu-gold hover:bg-bsu-gold/90 text-black">
            {isMobile ? "Verify" : "Student Verify"}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
