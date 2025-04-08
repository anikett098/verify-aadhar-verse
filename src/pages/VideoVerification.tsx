
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
import { CheckCircle, AlertCircle, ArrowRight, RefreshCw, Info } from "lucide-react";

const VideoVerification = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<VerificationTask[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [results, setResults] = useState<VerificationResult[]>([]);
  const [allTasksCompleted, setAllTasksCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState<Record<string, number>>({});
  
  // Generate random tasks when component mounts
  useEffect(() => {
    setIsLoading(true);
    
    try {
      const randomTasks = generateRandomTasks(3);
      if (randomTasks.length > 0) {
        setTasks(randomTasks);
        console.log("Generated verification tasks:", randomTasks.map(t => t.name).join(", "));
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not generate verification tasks. Please refresh and try again.",
        });
      }
    } catch (error) {
      console.error("Error generating tasks:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate verification tasks. Please refresh and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const currentTask = tasks[currentTaskIndex] || {
    id: "loading",
    name: "Loading...",
    instruction: "Preparing verification tasks..."
  };

  const handleTaskComplete = (taskId: string, success: boolean, capturedImage?: string) => {
    // Record the result
    const result: VerificationResult = {
      taskId,
      completed: success,
      timestamp: Date.now(),
      capturedImage
    };
    
    setResults(prev => [...prev, result]);
    
    // Update retry count for the task
    setRetryCount(prev => ({
      ...prev,
      [taskId]: (prev[taskId] || 0) + 1
    }));
    
    // Show success/failure toast
    if (success) {
      toast({
        title: "Task Completed",
        description: "Verification successful!",
      });
      
      // Move to next task after 2 seconds on success
      setTimeout(() => {
        if (currentTaskIndex < tasks.length - 1) {
          setCurrentTaskIndex(prev => prev + 1);
        } else {
          // All tasks completed
          setAllTasksCompleted(true);
        }
      }, 2000);
    } else {
      toast({
        variant: "destructive",
        title: "Task Failed",
        description: "Please try again carefully following the instructions.",
      });
      
      // On failure, don't automatically move to next task
      // We'll let the user retry or manually skip
    }
  };
  
  const handleSkipTask = () => {
    // Allow skipping only after 3 failed attempts
    if ((retryCount[currentTask.id] || 0) >= 3) {
      toast({
        title: "Task Skipped",
        description: "Moving to the next verification task.",
      });
      
      if (currentTaskIndex < tasks.length - 1) {
        setCurrentTaskIndex(prev => prev + 1);
      } else {
        // Even if we skipped, consider it complete if this was the last task
        setAllTasksCompleted(true);
      }
    }
  };
  
  const handleResetTasks = () => {
    // Generate a new set of random tasks
    const randomTasks = generateRandomTasks(3);
    setTasks(randomTasks);
    setCurrentTaskIndex(0);
    setResults([]);
    setAllTasksCompleted(false);
    setRetryCount({});
    
    toast({
      title: "Tasks Reset",
      description: "New verification tasks have been generated.",
    });
  };
  
  const handleSubmit = () => {
    // In a real app, we would send all the form data and verification results
    // to the backend for processing
    
    toast({
      title: "Submitting Application",
      description: "Your verification was successful!",
    });
    
    // For now, just navigate to success page
    navigate("/success");
  };
  
  // Calculate progress percentage
  const progress = tasks.length > 0 
    ? (results.filter(r => r.completed).length / tasks.length) * 100 
    : 0;

  // Get the current task completion status
  const getCurrentTaskStatus = () => {
    const taskResults = results.filter(r => r.taskId === currentTask.id);
    return taskResults.length > 0 ? taskResults[taskResults.length - 1].completed : null;
  };

  const currentTaskStatus = getCurrentTaskStatus();
  const canSkipCurrentTask = (retryCount[currentTask.id] || 0) >= 3;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-10">
        <div className="aadhar-container">
          <h1 className="text-3xl font-bold text-primary text-center mb-6">
            Identity Verification
          </h1>
          
          {isLoading ? (
            <div className="text-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary border-r-2 border-b-2 mx-auto mb-4"></div>
              <p>Loading verification tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="aadhar-card text-center">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-red-600 mb-4">Error Loading Tasks</h2>
              <p className="mb-6">We couldn't generate verification tasks. Please try again.</p>
              <Button onClick={handleResetTasks} className="aadhar-button-primary">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </div>
          ) : (
            <>
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
                  
                  <VerificationCamera 
                    currentTask={currentTask}
                    onTaskComplete={handleTaskComplete}
                  />
                  
                  {canSkipCurrentTask && currentTaskStatus !== true && (
                    <div className="mt-4 flex justify-center">
                      <Button 
                        variant="outline" 
                        onClick={handleSkipTask}
                        className="text-gray-600"
                      >
                        Skip This Task (After 3 Attempts)
                      </Button>
                    </div>
                  )}
                  
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
                </>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VideoVerification;
