
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <div className="container text-center py-16">
          <div className="mx-auto max-w-lg">
            <div className="bg-bsu-gold h-24 w-24 flex items-center justify-center rounded-full mx-auto mb-8">
              <span className="text-black font-bold text-4xl">404</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
            <p className="text-xl text-muted-foreground mb-6">
              The page you are looking for doesn't exist or has been moved.
            </p>
            <Button className="bg-bsu-gold hover:bg-bsu-gold/90 text-black" asChild>
              <a href="/">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Home
              </a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
