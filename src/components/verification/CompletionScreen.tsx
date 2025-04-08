
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

interface CompletionScreenProps {
  onSubmit: () => void;
}

const CompletionScreen = ({ onSubmit }: CompletionScreenProps) => {
  return (
    <div className="aadhar-card text-center">
      <div className="mb-6">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-600 mb-2">Verification Complete!</h2>
        <p className="text-gray-600 mb-6">
          All verification tasks have been successfully completed. You can now submit your application.
        </p>
      </div>
      
      <Button 
        onClick={onSubmit} 
        className="aadhar-button-primary"
        size="lg"
      >
        Submit Application
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default CompletionScreen;
