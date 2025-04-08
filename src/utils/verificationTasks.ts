
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

// Generate random tasks for verification
export const generateRandomTasks = (count: number = 3): VerificationTask[] => {
  // Shuffle the array
  const shuffled = [...tasks].sort(() => 0.5 - Math.random());
  
  // Get the first 'count' elements
  return shuffled.slice(0, count);
};

// Mock validation function - in a real app this would use AI to validate the face movements
export const mockValidateTask = (taskId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      // 90% success rate for demo purposes
      const success = Math.random() < 0.9;
      resolve(success);
    }, 1500);
  });
};
