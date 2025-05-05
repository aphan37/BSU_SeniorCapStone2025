
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const StudentVerification = () => {
  return (
    <section className="py-12 bg-bsu-gray">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-bsu-gold">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl">Student Verification</CardTitle>
              <CardDescription>
                Verify your Bowie State University student status to access exclusive deals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold">How It Works</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Enter your BSU student email</li>
                      <li>We'll send a verification link</li>
                      <li>Click the link to verify your status</li>
                      <li>Gain access to all student deals!</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <img
                        src="https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MTQ2OTk2NQ&ixlib=rb-4.0.3&q=80"
                        alt="Student ID"
                        className="h-16 w-auto"
                      />
                    </div>
                    <Button className="w-full bg-bsu-gold hover:bg-bsu-gold/90 text-black">
                      Verify Student Status
                    </Button>
                  </div>
                </div>
                
                <div className="text-center text-xs text-muted-foreground mt-4">
                  We only use your email to verify your student status. 
                  See our <a href="/privacy" className="underline hover:text-bsu-gold">Privacy Policy</a> for more details.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StudentVerification;
