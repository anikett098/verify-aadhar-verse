
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { mockValidateTask } from "@/utils/verificationTasks";
import { VerificationTask } from "@/types";
import { Camera, CheckCircle, Loader2 } from "lucide-react";

interface VerificationCameraProps {
  currentTask: VerificationTask;
  onTaskComplete: (taskId: string, success: boolean) => void;
}

const VerificationCamera = ({ currentTask, onTaskComplete }: VerificationCameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [captureSuccess, setCaptureSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    return () => {
      // Clean up the camera stream when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  // Reset state when task changes
  useEffect(() => {
    setCaptureSuccess(null);
    setIsVerifying(false);
  }, [currentTask]);

  const startCamera = async () => {
    try {
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
      alert("Could not access the camera. Please ensure camera permissions are enabled.");
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
    if (!isCameraOn) return;

    setIsVerifying(true);
    
    try {
      // Simulate validation using our mock function
      const success = await mockValidateTask(currentTask.id);
      setCaptureSuccess(success);
      
      // Report the result back to parent component
      onTaskComplete(currentTask.id, success);
    } catch (error) {
      console.error("Verification failed", error);
      setCaptureSuccess(false);
      onTaskComplete(currentTask.id, false);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="aadhar-card flex flex-col items-center">
      <div className="relative bg-gray-100 w-full max-w-md rounded-lg overflow-hidden aspect-video">
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
          <div className="absolute inset-0 bg-green-100/50 flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
        )}
        
        {captureSuccess === false && (
          <div className="absolute inset-0 bg-red-100/50 flex items-center justify-center">
            <p className="text-red-500 font-medium text-lg">Verification Failed</p>
          </div>
        )}
      </div>

      <div className="mt-4 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-2">Current Task:</h3>
        <div className="p-4 border border-gray-200 rounded bg-gray-50 mb-4">
          <p className="text-center text-lg">{currentTask.instruction}</p>
        </div>

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
              <Button 
                onClick={verifyTask} 
                disabled={isVerifying || captureSuccess !== null}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationCamera;
