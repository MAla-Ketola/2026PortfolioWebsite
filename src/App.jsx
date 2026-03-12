import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { About, Contact, Experience, Footer, Navbar, Works, Hero, Tech } from "./components";
const AliKetolaPage = React.lazy(() => import("./pages/AliKetolaPage"));
const HappyTrackerPage = React.lazy(() => import("./pages/HappyTrackerPage"));
const LittleLemonPage = React.lazy(() => import("./pages/LittleLemonPage"));
const StepAndBloomPage = React.lazy(() => import("./pages/StepAndBloomPage"));
const ProjectsPage = React.lazy(() => import("./pages/ProjectsPage"));

const HashScrollHandler = () => {
  const { hash, pathname } = useLocation();

  React.useEffect(() => {
    const container = document.getElementById("app-scroll");

    if (!hash) {
      if (container) container.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    const id = hash.replace("#", "");

    const scrollToHashTarget = () => {
      const target = document.getElementById(id);
      if (!target) return false;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    };

    if (scrollToHashTarget()) return;

    const timeout = setTimeout(scrollToHashTarget, 100);
    return () => clearTimeout(timeout);
  }, [hash, pathname]);

  return null;
};

const App = () => {
  const mainRef = React.useRef(null);
  const routeFallback = (
    <div className="min-h-[40vh] grid place-items-center text-sm tracking-wide text-white/70">
      Loading...
    </div>
  );

  return (
    <BrowserRouter>
      <HashScrollHandler />
      <div
        ref={mainRef}
        id="app-scroll"
        className="relative w-full h-screen overflow-y-auto overflow-x-hidden bg-black text-white selection:bg-[#FED814] selection:text-black"
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
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <div className="bg-black">
                  <Works />
                  <About />
                  <Tech />
                  <Experience />
                  <Contact />
                  <Footer />
                </div>
              </>
            } />
            <Route
              path="/ali-ketola"
              element={
                <React.Suspense fallback={routeFallback}>
                  <AliKetolaPage />
                </React.Suspense>
              }
            />
            <Route
              path="/happy-tracker"
              element={
                <React.Suspense fallback={routeFallback}>
                  <HappyTrackerPage />
                </React.Suspense>
              }
            />
            <Route
              path="/little-lemon"
              element={
                <React.Suspense fallback={routeFallback}>
                  <LittleLemonPage />
                </React.Suspense>
              }
            />
            <Route
              path="/step-and-bloom"
              element={
                <React.Suspense fallback={routeFallback}>
                  <StepAndBloomPage />
                </React.Suspense>
              }
            />
            <Route
              path="/projects"
              element={
                <React.Suspense fallback={routeFallback}>
                  <ProjectsPage />
                </React.Suspense>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
