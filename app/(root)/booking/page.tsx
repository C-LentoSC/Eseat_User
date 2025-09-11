import React from "react";
import { WelcomeSection } from "./welcome-section";
import { AssignedBusesSection } from "./assigned-buses-section";

const MainPage = () => {
  return (
    <>
      <AssignedBusesSection />
      <WelcomeSection />
    </>
  );
};

export default MainPage;
