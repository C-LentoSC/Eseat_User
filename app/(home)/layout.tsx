"use client";
import { useEffect } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {

  const checkAuth = () => {
      if (localStorage.getItem("token")) {
        window.location.href = "/booking";
      }
    };
  
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      // Call the function immediately
      checkAuth();
  
      // Set up an interval to call the function periodically
      const interval = setInterval(() => {
        checkAuth();
      }, 1000); // Check every 1 second
  
      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }, []);

  return <>{children}</>;
};

export default layout;
