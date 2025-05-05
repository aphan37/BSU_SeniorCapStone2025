
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface StudentVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StudentVerificationModal = ({ isOpen, onClose }: StudentVerificationModalProps) => {
  const { isVerified, requestVerification, studentProfile } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVerification = async () => {
    setIsProcessing(true);
    await requestVerification();
    setIsProcessing(false);
    // Close after a short delay to show the success state
    setTimeout(onClose, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Student Verification</DialogTitle>
          <DialogDescription>
            Verify your BSU student status to unlock exclusive tech deals
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6">
          {isVerified ? (
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <Check className="h-6 w-6" />
              <span>Your student status has been verified!</span>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm">
                To verify your status as a Bowie State University student, we'll need to confirm your:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>BSU email address ({studentProfile?.email})</li>
                <li>Student ID ({studentProfile?.student_id})</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                This is a one-time process. Once verified, you'll have access to all student deals.
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          {isVerified ? (
            <Button onClick={onClose}>Close</Button>
          ) : (
            <>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                className="bg-bsu-gold hover:bg-bsu-gold/90 text-black"
                onClick={handleVerification}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                    Verifying...
                  </>
                ) : (
                  "Verify Now"
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentVerificationModal;
