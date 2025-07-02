"use client";
import Footer from "@/components/footer";
import Header from "@/components/Header";
import { NavBar } from "@/components/nav-bar";
import { useEffect, useState } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const resetTimer = () => {
    localStorage.setItem("lastActive", Date.now().toString());
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const checkAuth = () => {
      if (!localStorage.getItem("token")) {
        window.location.href = "/";
      }
    };

    const checkInactivity = () => {
      const lastActive = localStorage.getItem("lastActive");
      if (lastActive && Date.now() - parseInt(lastActive) > 45 * 60 * 1000) {
        logout();
      }
    };

    // Set last active time on user interaction
    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("keydown", resetTimer);
    document.addEventListener("click", resetTimer);

    resetTimer();
    checkAuth();

    const interval = setInterval(() => {
      checkAuth();
      checkInactivity();
    }, 1000);

    return () => {
      clearInterval(interval);
      document.removeEventListener("mousemove", resetTimer);
      document.removeEventListener("keydown", resetTimer);
      document.removeEventListener("click", resetTimer);
    };
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
