import { motion } from "framer-motion";
import { SectionHeader, ShapeBullet } from "../shared/ui";
import { buildPoints } from "../content";
import fix1Img from "../../../assets/Happy Tracker/Fixes/10.png";
import fix2Img from "../../../assets/Happy Tracker/Fixes/11.png";

export default function Implement() {
  return (
    <section id="implement" className="mt-12">
      <SectionHeader label="IMPLEMENT" title="What was built in the vertical slice" color="#FED814" />



      <p className="mt-4 max-w-3xl text-lg text-gray-400 leading-relaxed text-center mx-auto">
        <span className="font-bold text-white">Scope & constraints: </span>
         vertical slice focused on the core loop (create → check → edit/delete).
      </p>

      <motion.div
             initial={{ opacity: 0, y: 12 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
             className="mt-10"
           >
             <div className="w-full rounded-[20px] overflow-hidden shadow-xl">
               <img
                 src={fix1Img}
                 alt="Fix 1 user testing artifact"
                 className="w-full p-4"
               />
             </div>
           </motion.div>
     
           <motion.div
             initial={{ opacity: 0, y: 12 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
             className="mt-10"
           >
             <div className="w-full rounded-[20px] overflow-hidden shadow-xl">
               <img
                 src={fix2Img}
                 alt="Fix 2 user testing artifact"
                 className="w-full p-4"
               />
             </div>
           </motion.div>
    </section>
  );
}
