import React from "react";
import { useInjectFonts } from "./components/AboutShared";
import AboutHero from "./components/AboutHero";
import AboutMission from "./components/AboutMission";
import AboutFeatures from "./components/AboutFeatures";

export default function AboutPage() {
  useInjectFonts();

  return (
    <div
      className="min-h-screen w-full bg-[#0B0F14] text-[#EDEFF2] selection:bg-[#4ADE80] selection:text-[#0B0F14]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <AboutHero />
      <AboutMission />
      <AboutFeatures />
    </div>
  );
}