
const LoadingState = () => {
  return (
    <div className="text-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary border-r-2 border-b-2 mx-auto mb-4"></div>
      <p>Loading verification tasks...</p>
    </div>
  );
};

export default LoadingState;
