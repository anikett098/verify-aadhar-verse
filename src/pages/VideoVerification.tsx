
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateRandomTasks } from "@/utils/verificationTasks";
import { VerificationTask, VerificationResult } from "@/types";
import VerificationCamera from "@/components/VerificationCamera";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

const VideoVerification = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<VerificationTask[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [results, setResults] = useState<VerificationResult[]>([]);
  const [allTasksCompleted, setAllTasksCompleted] = useState(false);
  
  // Generate random tasks when component mounts
  useEffect(() => {
    const randomTasks = generateRandomTasks(3);
    setTasks(randomTasks);
  }, []);
  
  const currentTask = tasks[currentTaskIndex] || {
    id: "loading",
    name: "Loading...",
    instruction: "Preparing verification tasks..."
  };

  const handleTaskComplete = (taskId: string, success: boolean) => {
    // Record the result
    const result: VerificationResult = {
      taskId,
      completed: success,
      timestamp: Date.now()
    };
    
    setResults(prev => [...prev, result]);
    
    // Show success/failure toast
    if (success) {
      toast({
        title: "Task Completed",
        description: "Verification successful!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Task Failed",
        description: "Please try again.",
      });
    }
    
    // Move to next task after 2 seconds
    setTimeout(() => {
      if (currentTaskIndex < tasks.length - 1 && success) {
        setCurrentTaskIndex(prev => prev + 1);
      } else if (success) {
        // All tasks completed
        setAllTasksCompleted(true);
      } else {
        // If failed, allow retry of the same task
        // We could implement retry limits here
      }
    }, 2000);
  };
  
  const handleSubmit = () => {
    // In a real app, we would send all the form data and verification results
    // to the backend for processing
    
    // For now, just navigate to success page
    navigate("/success");
  };
  
  // Calculate progress percentage
  const progress = tasks.length > 0 
    ? (results.filter(r => r.completed).length / tasks.length) * 100 
    : 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-10">
        <div className="aadhar-container">
          <h1 className="text-3xl font-bold text-primary text-center mb-6">
            Identity Verification
          </h1>
          
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {allTasksCompleted ? (
            <div className="aadhar-card text-center">
              <div className="mb-6">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-green-600 mb-2">Verification Complete!</h2>
                <p className="text-gray-600 mb-6">
                  All verification tasks have been successfully completed. You can now submit your application.
                </p>
              </div>
              
              <Button 
                onClick={handleSubmit} 
                className="aadhar-button-primary"
                size="lg"
              >
                Submit Application
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex justify-between gap-4">
                  {tasks.map((task, index) => {
                    const result = results.find(r => r.taskId === task.id);
                    const isActive = index === currentTaskIndex;
                    const isCompleted = result && result.completed;
                    const isFailed = result && !result.completed;
                    
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
              
              <VerificationCamera 
                currentTask={currentTask}
                onTaskComplete={handleTaskComplete}
              />
              
              <div className="mt-8 text-center text-gray-600">
                <p>Please complete all verification tasks to proceed.</p>
                <p className="text-sm mt-2">Ensure proper lighting and a clear background for best results.</p>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VideoVerification;
