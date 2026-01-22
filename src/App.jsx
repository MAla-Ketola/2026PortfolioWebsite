import React, { useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import {
  About,
  Contact,
  Experience,
  Navbar,
  Works,
  Hero,
  Tech,
} from "./components";

const App = () => {
  const mainRef = useRef(null);

  return (
    <BrowserRouter>
      <div
        ref={mainRef}
        // CHANGED: bg-paper -> bg-black. 
        // This ensures the Hero (Black) and Works (now Dark) blend seamlessly.
        className="relative w-full h-screen overflow-y-auto overflow-x-hidden bg-black text-white selection:bg-[#F8C8DC] selection:text-black"
      >
        <Navbar />

        <Canvas
          className="!fixed inset-0 top-0 left-0 z-30 pointer-events-none"
          eventSource={mainRef}
          style={{ position: "fixed" }} 
        >
          <View.Port />
        </Canvas>

        <div className="relative z-10">
          <Hero />
          {/* Changed internal wrapper to transparent or black */}
          <div className="bg-black">
            <Works />
            {/* You may want to update About/Tech/Experience to dark mode too, or use 'bg-paper' on them individually if you want them light. */}
            <About />
            <Tech />
            <Experience />
            <Contact />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
