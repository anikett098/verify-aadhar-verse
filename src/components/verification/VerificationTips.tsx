
import { Info } from "lucide-react";

const VerificationTips = () => {
  return (
    <div className="mt-8 p-4 rounded-lg bg-blue-50 border border-blue-100">
      <div className="flex items-center mb-2">
        <Info className="h-5 w-5 text-blue-500 mr-2" />
        <h3 className="font-medium text-blue-700">Verification Tips</h3>
      </div>
      <ul className="text-sm text-blue-700 space-y-1 ml-7 list-disc">
        <li>Ensure proper lighting - avoid dark environments</li>
        <li>Face the camera directly during verification</li>
        <li>Remove glasses or face coverings if possible</li>
        <li>Follow task instructions carefully and naturally</li>
        <li>Stay within frame throughout the verification process</li>
      </ul>
    </div>
  );
};

export default VerificationTips;
