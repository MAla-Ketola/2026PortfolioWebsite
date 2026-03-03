import { SectionWrapper } from "/src/hoc";
import { ShapeDivider } from "./shared/ui";

import Hero from "./sections/Hero";
import Define from "./sections/Define";
import Ideate from "./sections/Ideate";
import Prototype from "./sections/Prototype";
import Implement from "./sections/Implement";
import Validate from "./sections/Validate";
import Nav from "./sections/Nav";

function AliKetola() {
  return (
    <>
      <Hero />
      <div className="mt-24 md:mt-32 xl:mt-40 space-y-12 md:space-y-16">
        <Nav />
        <ShapeDivider />
        <Define />
        <ShapeDivider />
        <Ideate />
        <ShapeDivider />
        <Prototype />
        <ShapeDivider />
        <Implement />
        <ShapeDivider />
        <Validate />
      </div>
    </>
  );
}

export default SectionWrapper(AliKetola, "ali-ketola");
