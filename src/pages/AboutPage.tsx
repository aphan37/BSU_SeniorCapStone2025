
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-gray-50 py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">About BSU Tech Deals</h1>
              <p className="text-lg text-muted-foreground">
                A Senior Capstone project created by Bowie State University Computer Science students
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="col-span-2">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                  <p className="text-muted-foreground mb-4">
                    The Bowie State University Student Discount Tech Marketplace is a web-based platform designed 
                    as a Senior Capstone project for Computer Science students. The platform provides BSU students 
                    with exclusive access to discounted technology products, such as laptops, software, accessories, 
                    and educational tools, through partnerships with tech vendors.
                  </p>
                  
                  <p className="mb-6">
                    Our goal is to enhance affordability of essential tech resources, support academic success, 
                    and provide a real-world development experience for BSU seniors.
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-3">Key Objectives</h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Enable BSU students to purchase tech products at discounted rates, verified through their university credentials</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Establish relationships with tech companies to offer exclusive discounts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Provide a comprehensive full-stack development project for BSU seniors</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Design a platform that can scale to include additional features</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Ensure robust user authentication and data protection</span>
                    </li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3">Solving Real Problems</h3>
                  <p className="text-muted-foreground">
                    BSU students, particularly those in STEM fields, require access to reliable technology to succeed academically.
                    However, the cost of these products can be a barrier, especially for low-income or first-generation students.
                    Our platform aims to streamline access to educational discounts, reduce financial burdens, and enhance equity
                    in education.
                  </p>
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3">Project Timeline</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Requirements & Design</span>
                          <span className="text-muted-foreground">Sept 2025</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div className="h-full bg-bsu-gold rounded-full w-full"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Development</span>
                          <span className="text-muted-foreground">Oct-Dec 2025</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div className="h-full bg-bsu-gold rounded-full w-3/4"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Testing & Refinement</span>
                          <span className="text-muted-foreground">Jan-Mar 2026</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div className="h-full bg-bsu-gold rounded-full w-2/5"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Launch</span>
                          <span className="text-muted-foreground">Apr 2026</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div className="h-full bg-bsu-gold rounded-full w-1/4"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Capstone Presentation</span>
                          <span className="text-muted-foreground">May 2026</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div className="h-full bg-bsu-gold rounded-full w-1/5"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3">Team Members</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      This project is being developed by senior Computer Science students at Bowie State University.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-bsu-gold flex items-center justify-center text-black font-bold mr-3">
                          AJ
                        </div>
                        <div>
                          <p className="font-medium">Aisha Johnson</p>
                          <p className="text-xs text-muted-foreground">Frontend Developer</p>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-bsu-gold flex items-center justify-center text-black font-bold mr-3">
                          TW
                        </div>
                        <div>
                          <p className="font-medium">Tyrone Washington</p>
                          <p className="text-xs text-muted-foreground">Backend Developer</p>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-bsu-gold flex items-center justify-center text-black font-bold mr-3">
                          ML
                        </div>
                        <div>
                          <p className="font-medium">Maya Lee</p>
                          <p className="text-xs text-muted-foreground">UI/UX Designer</p>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-bsu-gold flex items-center justify-center text-black font-bold mr-3">
                          DJ
                        </div>
                        <div>
                          <p className="font-medium">Darius Jackson</p>
                          <p className="text-xs text-muted-foreground">Full Stack Developer</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-gray-50">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Technology Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "React", description: "Frontend UI Library" },
                { name: "TailwindCSS", description: "Utility-first CSS framework" },
                { name: "Node.js", description: "Backend JavaScript runtime" },
                { name: "PostgreSQL", description: "Relational database" },
                { name: "Express", description: "Web application framework" },
                { name: "AWS", description: "Cloud hosting platform" },
                { name: "Shibboleth", description: "SSO authentication" },
                { name: "SendGrid", description: "Email service provider" }
              ].map((tech, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border text-center">
                  <h3 className="font-semibold">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Contact Us</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center mb-6">
                    Have questions or interested in partnering with us? Please reach out to the project team.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">techdeals@bowiestate.edu</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Faculty Advisor</h3>
                      <p className="text-muted-foreground">Dr. Michael Carter</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
