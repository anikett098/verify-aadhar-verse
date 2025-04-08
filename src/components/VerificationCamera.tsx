
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { mockValidateTask, captureImageFromVideo } from "@/utils/verificationTasks";
import { VerificationTask } from "@/types";
import { Camera, CheckCircle, Loader2, RefreshCw, AlertCircle } from "lucide-react";

interface VerificationCameraProps {
  currentTask: VerificationTask;
  onTaskComplete: (taskId: string, success: boolean, image?: string) => void;
}

const VerificationCamera = ({ currentTask, onTaskComplete }: VerificationCameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [captureSuccess, setCaptureSuccess] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    return () => {
      // Clean up the camera stream when component unmounts
      stopCamera();
    };
  }, []);

  // Reset state when task changes
  useEffect(() => {
    setCaptureSuccess(null);
    setIsVerifying(false);
    setCapturedImage(null);
    setErrorMessage(null);
    setAttemptCount(0);
  }, [currentTask]);

  const startCamera = async () => {
    try {
      setErrorMessage(null);
      const constraints = {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user"
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraOn(true);
      }
    } catch (err) {
      console.error("Error accessing the camera: ", err);
      setErrorMessage("Could not access the camera. Please ensure camera permissions are enabled.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsCameraOn(false);
    }
  };

  const verifyTask = async () => {
    if (!isCameraOn || isVerifying) return;

    setIsVerifying(true);
    setAttemptCount(prev => prev + 1);
    
    try {
      // Capture image from video
      const image = videoRef.current ? captureImageFromVideo(videoRef.current) : null;
      setCapturedImage(image);
      
      // Simulate validation using our mock function
      const success = await mockValidateTask(currentTask.id);
      setCaptureSuccess(success);
      
      // Report the result back to parent component
      onTaskComplete(currentTask.id, success, image || undefined);
    } catch (error) {
      console.error("Verification failed", error);
      setCaptureSuccess(false);
      setErrorMessage("Verification process failed. Please try again.");
      onTaskComplete(currentTask.id, false);
    } finally {
      setIsVerifying(false);
    }
  };

  const retryVerification = () => {
    setCaptureSuccess(null);
    setCapturedImage(null);
    setErrorMessage(null);
  };

  const getInstructionText = () => {
    if (captureSuccess === true) return "Great job! Verification successful.";
    if (captureSuccess === false) return "Verification failed. Please try again following the instructions carefully.";
    return currentTask.instruction;
  };

  return (
    <div className="aadhar-card flex flex-col items-center">
      <div className="relative bg-gray-100 w-full max-w-md rounded-lg overflow-hidden aspect-video mb-4">
        {isCameraOn ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Camera className="w-16 h-16 text-gray-400" />
          </div>
        )}
        
        {captureSuccess === true && (
          <div className="absolute inset-0 bg-green-100/70 flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
        )}
        
        {captureSuccess === false && (
          <div className="absolute inset-0 bg-red-100/70 flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-2" />
              <p className="text-red-500 font-medium text-lg">Verification Failed</p>
            </div>
          </div>
        )}
      </div>

      {capturedImage && captureSuccess !== null && (
        <div className="mb-4 w-full max-w-md">
          <p className="text-sm text-gray-500 mb-2">Captured Image:</p>
          <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video">
            <img 
              src={capturedImage} 
              alt="Captured verification" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      <div className="mt-2 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-2">Current Task:</h3>
        <div className={`p-4 border rounded mb-4 ${
          captureSuccess === true ? 'border-green-200 bg-green-50' : 
          captureSuccess === false ? 'border-red-200 bg-red-50' : 
          'border-gray-200 bg-gray-50'
        }`}>
          <p className="text-center text-lg">{getInstructionText()}</p>
        </div>

        {errorMessage && (
          <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
            {errorMessage}
          </div>
        )}

        <div className="flex gap-3 justify-center">
          {!isCameraOn ? (
            <Button onClick={startCamera} className="aadhar-button-primary">
              Enable Camera
            </Button>
          ) : (
            <>
              <Button onClick={stopCamera} variant="outline">
                Turn Off Camera
              </Button>
              
              {captureSuccess === null ? (
                <Button 
                  onClick={verifyTask} 
                  disabled={isVerifying}
                  className="aadhar-button-secondary"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Capture & Verify'
                  )}
                </Button>
              ) : captureSuccess === false ? (
                <Button 
                  onClick={retryVerification}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              ) : null}
            </>
          )}
        </div>

        {attemptCount > 0 && captureSuccess === false && (
          <p className="text-sm text-gray-500 mt-3 text-center">
            Attempt {attemptCount} of 3 - Please ensure you're in good lighting and following the instructions
          </p>
        )}
      </div>
    </div>
  );
};

export default VerificationCamera;
