
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-black text-white py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MTQ2OTgzOQ&ixlib=rb-4.0.3&q=80"
          alt="Tech background"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-2xl animate-slide-up">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Exclusive Tech Deals for <span className="text-bsu-gold">BSU Students</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Save big on laptops, phones, accessories and more with student-exclusive discounts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-bsu-gold hover:bg-bsu-gold/90 text-black">
              Browse All Deals
            </Button>
            <Button size="lg" className="bg-bsu-gold hover:bg-bsu-gold/90 text-black">
              How It Works <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-gray-300">
            *Verification required for student-exclusive deals
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
