
import { useState } from "react";
import { Check, Copy, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createDiscountCode } from "@/services/discountService";
import { useNavigate } from "react-router-dom";

interface ProductDiscountSectionProps {
  productId: string;
  productName: string;
}

const ProductDiscountSection = ({ productId, productName }: ProductDiscountSectionProps) => {
  const { user, isVerified } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const handleGetCode = async () => {
    if (!user) {
      navigate("/sign-in");
      return;
    }
    
    if (!isVerified) {
      toast({
        title: "Verification Required",
        description: "Please verify your student status first",
        variant: "destructive",
      });
      navigate("/profile");
      return;
    }
    
    setIsLoading(true);
    try {
      const code = await createDiscountCode(productId);
      setDiscountCode(code);
      toast({
        title: "Discount Code Generated",
        description: `Use code ${code} at checkout for ${productName}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate discount code",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const copyToClipboard = () => {
    if (discountCode) {
      navigator.clipboard.writeText(discountCode);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Discount code copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  return (
    <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
      <p className="font-medium mb-2">BSU Student Deal</p>
      
      {discountCode ? (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground mb-2">
            Your exclusive discount code:
          </p>
          <div className="flex">
            <div className="bg-white border rounded-l px-4 py-2 font-mono text-lg flex-grow">
              {discountCode}
            </div>
            <Button 
              variant="outline"
              className="rounded-l-none"
              onClick={copyToClipboard}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            This code will work for 7 days. Apply it at checkout on the vendor's website.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-muted-foreground text-sm">
            This deal is exclusively available for Bowie State University students.
            {!user && " Sign in to access this special pricing."}
            {user && !isVerified && " Verify your student status to access this special pricing."}
          </p>
          
          <Button
            onClick={handleGetCode}
            disabled={isLoading}
            className={user && isVerified ? "bg-bsu-gold hover:bg-bsu-gold/90 text-black" : ""}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Code...
              </>
            ) : (
              user && isVerified ? "Generate Discount Code" : "Sign In for Discount"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductDiscountSection;
