import React from "react";

const LoadingAnimation: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-10">
      {/* <div className="animate-spin h-12 w-12 border-4 border-gray-300 rounded-full border-t-[#dd3170]" role="status" aria-label="loading" aria-describedby="loading-spi"></div> */}
      <img src="/assets/sltb-loading.gif" alt="loading.." className="w-40 h-40"/>
    </div>
  );
};

export default LoadingAnimation;
