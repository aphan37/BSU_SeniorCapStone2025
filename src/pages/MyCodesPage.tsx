
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ArrowLeft, Check, Clock, CheckCircle, XCircle } from "lucide-react";
import { getUserDiscountCodes } from "@/services/discountService";
import { DiscountCode } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const MyCodesPage = () => {
  const { user, isVerified } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
      return;
    }
    
    const fetchCodes = async () => {
      try {
        const codes = await getUserDiscountCodes();
        setDiscountCodes(codes);
      } catch (error) {
        console.error("Error fetching discount codes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCodes();
  }, [user, navigate]);
  
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast({
      title: "Copied to clipboard",
      description: "Discount code copied to clipboard",
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };
  
  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (error) {
      return "N/A";
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container max-w-4xl">
          <Button
            variant="ghost"
            className="mb-6 pl-0"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-1 h-4 w-4" /> Back
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">My Discount Codes</CardTitle>
              <CardDescription>
                All your BSU Tech Deals discount codes in one place
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bsu-gold"></div>
                </div>
              ) : discountCodes.length === 0 ? (
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium mb-2">No discount codes yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Browse products and generate discount codes to see them here
                  </p>
                  <Button 
                    onClick={() => navigate("/products")}
                    className="bg-bsu-gold hover:bg-bsu-gold/90 text-black"
                  >
                    Browse Products
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {discountCodes.map((code) => (
                    <div 
                      key={code.id} 
                      className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          {code.used ? (
                            <XCircle className="h-5 w-5 text-gray-400" />
                          ) : isExpired(code.expires_at) ? (
                            <Clock className="h-5 w-5 text-amber-500" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          <span className="font-mono font-medium text-lg">
                            {code.code}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {code.used ? (
                            <span>Used</span>
                          ) : isExpired(code.expires_at) ? (
                            <span>Expired: {formatDate(code.expires_at)}</span>
                          ) : (
                            <span>Valid until: {formatDate(code.expires_at)}</span>
                          )}
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(code.code)}
                        disabled={code.used || isExpired(code.expires_at)}
                      >
                        {copiedCode === code.code ? (
                          <Check className="mr-1 h-4 w-4" />
                        ) : (
                          <Copy className="mr-1 h-4 w-4" />
                        )}
                        Copy
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyCodesPage;
