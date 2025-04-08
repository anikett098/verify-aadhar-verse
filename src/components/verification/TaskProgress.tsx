
import { VerificationTask, VerificationResult } from "@/types";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle } from "lucide-react";

interface TaskProgressProps {
  tasks: VerificationTask[];
  results: VerificationResult[];
  currentTaskIndex: number;
}

const TaskProgress = ({ tasks, results, currentTaskIndex }: TaskProgressProps) => {
  // Calculate progress percentage
  const progress = tasks.length > 0 
    ? (results.filter(r => r.completed).length / tasks.length) * 100 
    : 0;

  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm mb-2">
        <span>Progress</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
      
      <div className="mt-8 flex justify-between gap-4">
        {tasks.map((task, index) => {
          const taskResults = results.filter(r => r.taskId === task.id);
          const isActive = index === currentTaskIndex;
          const isCompleted = taskResults.some(r => r.completed);
          const isFailed = taskResults.length > 0 && !isCompleted;
          
          return (
            <div 
              key={task.id}
              className={`flex-1 p-4 rounded-lg border ${
                isActive ? "border-primary bg-primary/5" :
                isCompleted ? "border-green-200 bg-green-50" :
                isFailed ? "border-red-200 bg-red-50" :
                "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Task {index + 1}</span>
                {isCompleted && <CheckCircle className="h-5 w-5 text-green-500" />}
                {isFailed && <AlertCircle className="h-5 w-5 text-red-500" />}
              </div>
              <p className="text-sm text-gray-500">{task.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskProgress;
