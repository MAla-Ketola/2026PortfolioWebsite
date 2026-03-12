import { SectionWrapper } from "/src/hoc";
import { ShapeDivider } from "./shared/ui";

import Hero from "./sections/Hero";
import Nav from "./sections/Nav";
import Define from "./sections/Define";
import DesignProcess from "./sections/DesignProcess";
import Implement from "./sections/Implement";
import ResultsReflections from "./sections/ResultsReflections";

function StepAndBloom() {
  return (
    <>
      <Hero />
      <div className="mt-24 md:mt-32 xl:mt-40 space-y-12 md:space-y-16">
        <Nav />
        <ShapeDivider />
        <Define />
        <ShapeDivider />
        <DesignProcess />
        <ShapeDivider />
        <Implement />
        <ShapeDivider />
        <ResultsReflections />
      </div>
    </>
  );
}

export default SectionWrapper(StepAndBloom, "step-and-bloom");
