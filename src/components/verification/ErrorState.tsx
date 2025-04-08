
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  onReset: () => void;
}

const ErrorState = ({ onReset }: ErrorStateProps) => {
  return (
    <div className="aadhar-card text-center">
      <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-red-600 mb-4">Error Loading Tasks</h2>
      <p className="mb-6">We couldn't generate verification tasks. Please try again.</p>
      <Button onClick={onReset} className="aadhar-button-primary">
        <RefreshCw className="mr-2 h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
};

export default ErrorState;
