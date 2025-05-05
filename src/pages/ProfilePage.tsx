
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, Shield, Mail, IdCard, User, Calendar } from "lucide-react";
import { format } from "date-fns";
import StudentVerificationModal from "@/components/auth/StudentVerificationModal";

const ProfilePage = () => {
  const { user, studentProfile, isVerified, signOut } = useAuth();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  
  if (!user || !studentProfile) {
    navigate("/sign-in");
    return null;
  }
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (error) {
      return "N/A";
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                  <CardTitle>
                    {studentProfile.first_name} {studentProfile.last_name}
                  </CardTitle>
                  <CardDescription>BSU Student</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{studentProfile.email}</span>
                  </div>
                  <div className="flex items-center">
                    <IdCard className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">ID: {studentProfile.student_id}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Joined: {formatDate(studentProfile.created_at)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Verification Status</CardTitle>
                    {isVerified ? (
                      <BadgeCheck className="h-5 w-5 text-green-600" />
                    ) : (
                      <Shield className="h-5 w-5 text-amber-500" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {isVerified ? (
                    <div className="bg-green-50 border border-green-200 rounded p-4">
                      <div className="flex items-center">
                        <BadgeCheck className="h-6 w-6 text-green-600 mr-2" />
                        <div>
                          <h3 className="font-medium text-green-800">Verified Student</h3>
                          <p className="text-sm text-green-700">
                            Your BSU student status has been verified. You have access to all exclusive discounts.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-amber-50 border border-amber-200 rounded p-4">
                        <h3 className="font-medium text-amber-800">Verification Required</h3>
                        <p className="text-sm text-amber-700 mt-1">
                          Please verify your BSU student status to access exclusive discounts.
                        </p>
                      </div>
                      
                      <Button 
                        className="w-full bg-bsu-gold hover:bg-bsu-gold/90 text-black"
                        onClick={() => setModalOpen(true)}
                      >
                        Verify Student Status
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>My Discount Codes</CardTitle>
                  <CardDescription>
                    View and manage your discount codes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => navigate("/my-codes")}
                    className="w-full"
                  >
                    View My Discount Codes
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      <StudentVerificationModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </div>
  );
};

export default ProfilePage;
