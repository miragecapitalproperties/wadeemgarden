"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RegistrationModal from "@/components/RegistrationModal";
import ProjectIntro from "@/components/ProjectIntro";
import ProjectStats from "@/components/ProjectStats";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

const PropertyTypes = dynamic(() => import("@/components/PropertyTypes"));
const FloorPlans = dynamic(() => import("@/components/FloorPlans"));
const Amenities = dynamic(() => import("@/components/Amenities"));
const PaymentCalculator = dynamic(() => import("@/components/PaymentCalculator"));
const Location = dynamic(() => import("@/components/Location"));
const Gallery = dynamic(() => import("@/components/Gallery"));

export default function Home() {
  const [registerOpen, setRegisterOpen] = useState(false);

  const handleRegisterInterest = () => {
    setRegisterOpen(true);
  };

  const handleCloseRegister = () => {
    setRegisterOpen(false);
  };

  const handleRegisterFromNav = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownloadBrochure = () => {
    setRegisterOpen(true);
  };

  return (
    <>
      <Navbar onRegisterInterest={handleRegisterFromNav} />
      <main>
        <Hero
          onRegisterInterest={handleRegisterInterest}
          onDownloadBrochure={handleDownloadBrochure}
        />
        <RegistrationModal triggerOpen={registerOpen} onClose={handleCloseRegister} />
        <ProjectIntro />
        <ProjectStats />
        <PropertyTypes />
        <FloorPlans />
        <Amenities />
        <PaymentCalculator />
        <Location />
        <Gallery />
        <FinalCTA />
      </main>
      <Footer onRegisterInterest={handleRegisterInterest} />
      <FloatingCTA onRegisterInterest={handleRegisterInterest} />
    </>
  );
}