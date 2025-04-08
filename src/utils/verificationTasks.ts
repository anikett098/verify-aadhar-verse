
import { VerificationTask } from "@/types";

const tasks: VerificationTask[] = [
  {
    id: "head-up",
    name: "Look Up",
    instruction: "Please look upward for 2 seconds"
  },
  {
    id: "head-down",
    name: "Look Down",
    instruction: "Please look downward for 2 seconds"
  },
  {
    id: "head-left",
    name: "Look Left",
    instruction: "Please turn your head to the left"
  },
  {
    id: "head-right",
    name: "Look Right",
    instruction: "Please turn your head to the right"
  },
  {
    id: "blink",
    name: "Blink",
    instruction: "Please blink both eyes slowly two times"
  },
  {
    id: "smile",
    name: "Smile",
    instruction: "Please smile for the camera"
  },
  {
    id: "nod",
    name: "Nod",
    instruction: "Please nod your head up and down"
  },
  {
    id: "wink",
    name: "Wink",
    instruction: "Please wink with either eye"
  }
];

// Generate random tasks for verification - making sure tasks are different
export const generateRandomTasks = (count: number = 3): VerificationTask[] => {
  // Shuffle the array
  const shuffled = [...tasks].sort(() => 0.5 - Math.random());
  
  // Get the first 'count' elements
  return shuffled.slice(0, count);
};

// Mock validation function - in a real app this would use AI to validate the face movements
export const mockValidateTask = (taskId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // Simulate processing time with variable duration for more realism
    const processingTime = 1000 + Math.random() * 1000;
    
    setTimeout(() => {
      // 90% success rate for demo purposes
      const success = Math.random() < 0.9;
      console.log(`Task ${taskId} validation result: ${success ? 'Success' : 'Failed'}`);
      resolve(success);
    }, processingTime);
  });
};

// Function to capture an image from video element
export const captureImageFromVideo = (videoElement: HTMLVideoElement): string | null => {
  if (!videoElement) return null;
  
  try {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    
    const context = canvas.getContext('2d');
    if (!context) return null;
    
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg');
  } catch (error) {
    console.error('Error capturing image:', error);
    return null;
  }
};
