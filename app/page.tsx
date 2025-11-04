"use client";


import Header from "./components/Header";

import AboutSection from "./components/AboutSection";
import FeatureSection from "./components/FeatureSection";




export default function HomePage() {
  return (
    <main className="mx-auto pt-80 ">
   <div className=" sticky top-40  transition-all duration-300">
   <Header />
 
   </div>
   <div className=" mt-40">
   <AboutSection />
   <FeatureSection />    
   </div>
     
     
   
 
      
     

    </main>
  );
}
