import React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  About,
  Contact,
  Experience,
  Navbar,
  Works,
  Hero,
  Tech,
} from "./components";
import BackgroundScene from "./components/BackgroundScene";

const App = () => {
  return (
    <BrowserRouter>
      {/* 1. The Main Scroll Container */}
      <div
        id="main-scroll"
        className="relative w-full h-screen overflow-y-auto overflow-x-hidden bg-transparent text-primary selection:bg-bento-pink selection:text-primary"
      >
        <Navbar />

        <BackgroundScene />

        {/* 3. The Content Layer (HTML) */}
        <div className="relative z-10">
          <Hero />
          <Works />
          <div className="bg-paper">
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
