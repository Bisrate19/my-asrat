import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-white text-black dark:text-white">
      <Header />
      <main className="flex-grow">
        <HeroSection />
      </main>
      
      <Footer />
    </div>
  );
}
