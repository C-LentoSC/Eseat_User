"use client";
import Footer from "@/components/footer";
import Header from "@/components/Header";
import { NavBar } from "@/components/nav-bar";
import { useEffect, useState } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  
  const checkAuth = () => {
    if (localStorage.getItem("token")) {
      // console.log("User is authenticated");
    } else {
      window.location.href = "/";
    }
  };

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


  return (
    <>
      <Header />
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

export default layout;
