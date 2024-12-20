import React from "react";
import { HeroSection } from "./hero-section";
import TebSection from "./tab-section";
import Header from "@/components/Header";

const Home = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <TebSection />
    </>
  );
};

export default Home;
