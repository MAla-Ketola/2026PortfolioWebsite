import { motion } from "framer-motion";
import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const SectionWrapper = (Component, idName) =>
  function HOC() {
    return (
      <motion.section
        id={idName}
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        // FIX: Change amount to 0 so it triggers immediately when visible
        viewport={{ once: true, amount: 0 }}
        className={`relative w-full ${idName === "about" ? "z-20" : "z-0"}`}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        <div
          className={
            idName === "hero" || idName === "tech" || idName === "about" || idName === "contact"
              ? ""
              : `${styles.padding} max-w-7xl mx-auto`
          }
        >
          <Component />
        </div>
      </motion.section>
    );
  };

export default SectionWrapper;

