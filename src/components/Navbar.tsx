
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import SearchBar from "@/components/SearchBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, studentProfile, isVerified, signOut } = useAuth();
  const navigate = useNavigate();

  const handleVerifyClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-bsu-gold p-1.5 rounded">
              <span className="font-bold text-black text-xl">BSU</span>
            </div>
            {!isMobile && <span className="font-bold text-xl">Tech Deals</span>}
          </Link>
        </div>
        
        {isSearchOpen && !isMobile ? (
          <div className="flex-1 mx-6">
            <SearchBar 
              onClose={() => setIsSearchOpen(false)}
              autoFocus={true}
            />
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-medium hover:text-bsu-gold">Home</Link>
            <Link to="/products" className="font-medium hover:text-bsu-gold">Products</Link>
            <Link to="/about" className="font-medium hover:text-bsu-gold">About</Link>
          </div>
        )}
        
        <div className="flex items-center gap-4">
          {!isSearchOpen && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsSearchOpen(true)}
            >
              <span className="sr-only">Search</span>
            </Button>
          )}
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative">
                  <User className="h-5 w-5" />
                  {isVerified && <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-500" />}
                  {!isMobile && <span className="ml-2">{studentProfile?.first_name || 'Account'}</span>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/my-codes")}>My Discount Codes</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              className="bg-bsu-gold hover:bg-bsu-gold/90 text-black"
              onClick={handleVerifyClick}
            >
              {isMobile ? "Sign In" : "Student Sign In"}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
