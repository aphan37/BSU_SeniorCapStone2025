
import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { products } from "@/data/productsData";
import { useNavigate } from "react-router-dom";

type SearchResult = {
  id: string;
  name: string;
  brand: string;
};

interface SearchBarProps {
  onClose?: () => void;
  autoFocus?: boolean;
}

const SearchBar = ({ onClose, autoFocus = false }: SearchBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filteredResults = products
        .filter((product) => {
          const productName = product.name.toLowerCase();
          const productBrand = product.brand.toLowerCase();
          const query = searchQuery.toLowerCase();
          
          return productName.includes(query) || productBrand.includes(query);
        })
        .map((product) => ({
          id: product.id,
          name: product.name,
          brand: product.brand,
        }));
      
      setSearchResults(filteredResults);
      setIsOpen(true);
    } else {
      setSearchResults([]);
      setIsOpen(false);
    }
  }, [searchQuery]);

  const handleSelect = (productId: string) => {
    navigate(`/product/${productId}`);
    setSearchQuery("");
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchResults.length > 0) {
      // Navigate to the first result
      handleSelect(searchResults[0].id);
    } else if (searchQuery.trim().length > 0) {
      // Navigate to search results page (could be implemented in the future)
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      if (onClose) onClose();
    }
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search for products..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            autoFocus={autoFocus}
          />
        </div>
      </form>

      {isOpen && searchQuery.length > 0 && (
        <div className="absolute w-full z-50 mt-1 border rounded-md bg-background shadow-md">
          <Command>
            <CommandList>
              <CommandEmpty>No results found</CommandEmpty>
              <CommandGroup heading="Products">
                {searchResults.map((result) => (
                  <CommandItem
                    key={result.id}
                    onSelect={() => handleSelect(result.id)}
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span>{result.name}</span>
                      <span className="text-xs text-muted-foreground">{result.brand}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
