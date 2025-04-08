
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UserFormData } from "@/types";
import { CheckCircle } from "lucide-react";

const Success = () => {
  const [formData, setFormData] = useState<UserFormData | null>(null);
  const [applicationId, setApplicationId] = useState("");
  
  useEffect(() => {
    // Retrieve form data from session storage
    const storedData = sessionStorage.getItem("aadharFormData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
    
    // Generate a random application ID
    const randomId = Math.floor(10000000000 + Math.random() * 90000000000).toString();
    setApplicationId(randomId);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-10">
        <div className="aadhar-container max-w-3xl">
          <div className="aadhar-card text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-primary mb-2">Application Submitted Successfully!</h1>
              <p className="text-lg text-gray-600 mb-6">
                Your Aadhar {formData?.isNewApplication ? "application" : "update request"} has been received and is being processed.
              </p>
            </div>
            
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-100 mb-6">
              <h2 className="text-xl font-semibold text-primary mb-3">Application Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="font-medium">Application ID:</p>
                  <p className="text-gray-700">{applicationId}</p>
                </div>
                <div>
                  <p className="font-medium">Application Type:</p>
                  <p className="text-gray-700">
                    {formData?.isNewApplication 
                      ? "New Aadhar Registration" 
                      : "Aadhar Update"}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Name:</p>
                  <p className="text-gray-700">{formData?.name}</p>
                </div>
                <div>
                  <p className="font-medium">Mobile:</p>
                  <p className="text-gray-700">{formData?.mobile}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-8">
              <p className="text-sm text-yellow-800">
                Please save your application ID for future reference. You will receive status updates via SMS and email.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link to="/">Return to Home</Link>
              </Button>
              <Button asChild className="aadhar-button-primary">
                <a href="#" onClick={(e) => e.preventDefault()}>Check Application Status</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Success;
