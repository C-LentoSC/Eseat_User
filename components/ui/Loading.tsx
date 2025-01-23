import React from "react";

const LoadingAnimation: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin h-12 w-12 border-4 border-gray-300 rounded-full border-t-[#dd3170]" role="status" aria-label="loading" aria-describedby="loading-spi"></div>
    </div>
  );
};

export default LoadingAnimation;
