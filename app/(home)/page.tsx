import React from "react";
import { HeroSection } from "./hero-section";
import TebSection from "./tab-section";
import Header from "@/components/Header";
import OnlineBookingSection from "./online-booking-section";
import Footer from "@/components/footer";
import BusCarousel from "./bus-carousel";

const Home = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <TebSection />
      <BusCarousel />
      <OnlineBookingSection />
      <Footer />
    </>
  );
};

export default Home;
