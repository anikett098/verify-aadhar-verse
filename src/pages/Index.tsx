
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 via-white to-orange-50">
          <div className="aadhar-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                  Secure Identity Verification with Video eKYC
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Create or update your Aadhar card with our advanced video verification system that ensures the highest level of security and integrity.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="aadhar-button-primary">
                    <Link to="/create-update">Create New Aadhar</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to="/create-update?update=true">Update Existing Aadhar</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-96 bg-gradient-to-b from-aadhar-blue to-primary rounded-xl shadow-lg p-6 rotate-3">
                    <div className="w-full h-24 bg-aadhar-saffron rounded-md mb-4"></div>
                    <div className="w-3/4 h-3 bg-white rounded-full mb-2"></div>
                    <div className="w-full h-3 bg-white rounded-full mb-2"></div>
                    <div className="w-2/3 h-3 bg-white rounded-full mb-6"></div>
                    <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4"></div>
                    <div className="w-full h-16 bg-aadhar-green rounded-md"></div>
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white rounded-full border-4 border-aadhar-blue flex items-center justify-center">
                    <div className="text-primary font-bold text-2xl">eKYC</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="aadhar-container">
            <h2 className="text-3xl font-bold text-center mb-12">How Video eKYC Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="aadhar-card text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Fill Basic Information</h3>
                <p className="text-gray-600">
                  Enter your personal details and choose whether you're applying for a new Aadhar or updating an existing one.
                </p>
              </div>
              
              <div className="aadhar-card text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-secondary font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Complete Video Verification</h3>
                <p className="text-gray-600">
                  Perform a series of random facial movements to verify your identity through our secure video eKYC system.
                </p>
              </div>
              
              <div className="aadhar-card text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-accent font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Receive Confirmation</h3>
                <p className="text-gray-600">
                  After successful verification, you'll receive a confirmation and your Aadhar application will be processed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="aadhar-container text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              The entire process is simple, secure, and takes just a few minutes to complete.
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
              <Link to="/create-update">Apply Now</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
