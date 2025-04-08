
import { VerificationTask } from "@/types";
import VerificationCamera from "@/components/VerificationCamera";
import { Button } from "@/components/ui/button";
import VerificationTips from "./VerificationTips";

interface TaskVerificationProps {
  currentTask: VerificationTask;
  retryCount: Record<string, number>;
  currentTaskStatus: boolean | null;
  onTaskComplete: (taskId: string, success: boolean, capturedImage?: string) => void;
  onSkipTask: () => void;
}

const TaskVerification = ({ 
  currentTask, 
  retryCount, 
  currentTaskStatus,
  onTaskComplete, 
  onSkipTask 
}: TaskVerificationProps) => {
  const canSkipCurrentTask = (retryCount[currentTask.id] || 0) >= 3;

  return (
    <>
      <VerificationCamera 
        currentTask={currentTask}
        onTaskComplete={onTaskComplete}
      />
      
      {canSkipCurrentTask && currentTaskStatus !== true && (
        <div className="mt-4 flex justify-center">
          <Button 
            variant="outline" 
            onClick={onSkipTask}
            className="text-gray-600"
          >
            Skip This Task (After 3 Attempts)
          </Button>
        </div>
      )}
      
      <VerificationTips />
    </>
  );
};

export default TaskVerification;
