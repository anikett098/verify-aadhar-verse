
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateRandomTasks } from "@/utils/verificationTasks";
import { VerificationTask, VerificationResult } from "@/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "@/components/ui/use-toast";
import LoadingState from "@/components/verification/LoadingState";
import ErrorState from "@/components/verification/ErrorState";
import TaskProgress from "@/components/verification/TaskProgress";
import TaskVerification from "@/components/verification/TaskVerification";
import CompletionScreen from "@/components/verification/CompletionScreen";

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
    loadVerificationTasks();
  }, []);
  
  const loadVerificationTasks = () => {
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
  };
  
  const currentTask = tasks[currentTaskIndex] || {
    id: "loading",
    name: "Loading...",
    instruction: "Preparing verification tasks..."
  };

  // Get the current task completion status
  const getCurrentTaskStatus = () => {
    const taskResults = results.filter(r => r.taskId === currentTask.id);
    return taskResults.length > 0 ? taskResults[taskResults.length - 1].completed : null;
  };

  const currentTaskStatus = getCurrentTaskStatus();

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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-10">
        <div className="aadhar-container">
          <h1 className="text-3xl font-bold text-primary text-center mb-6">
            Identity Verification
          </h1>
          
          {isLoading ? (
            <LoadingState />
          ) : tasks.length === 0 ? (
            <ErrorState onReset={handleResetTasks} />
          ) : (
            <>
              <TaskProgress 
                tasks={tasks} 
                results={results} 
                currentTaskIndex={currentTaskIndex} 
              />
              
              {allTasksCompleted ? (
                <CompletionScreen onSubmit={handleSubmit} />
              ) : (
                <TaskVerification 
                  currentTask={currentTask}
                  retryCount={retryCount}
                  currentTaskStatus={currentTaskStatus}
                  onTaskComplete={handleTaskComplete}
                  onSkipTask={handleSkipTask}
                />
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
