import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { navLinks } from '../constants';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionNav = (link) => {
    setActive(link.title);
    setToggle(false);

    if (location.pathname === "/") {
      const section = document.getElementById(link.id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      navigate(`/#${link.id}`, { replace: true });
      return;
    }

    navigate(`/#${link.id}`);
  };

  return (
    <nav
      className="w-full flex items-center py-4 bg-black font-milkyway"
      style={{ fontFamily: "Milkyway, monospace" }}
    >
      {/* Inner Container: Matches standard section width (max-w-7xl) */}
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-6 sm:px-16">
        
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <h1 className="text-white text-[25px] tracking-tighter uppercase cursor-pointer hover:text-[#F844C2] transition-colors">
            M A-K
          </h1>
        </Link>

        {/* DESKTOP LINKS */}
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => (
            <motion.li
              key={link.id}
              className={`
                text-[16px] font-bold uppercase tracking-widest cursor-pointer
                ${active === link.title ? "text-[#F844C2]" : "text-white"}
                hover:text-[#F844C2] transition-colors
              `}
              onClick={() => setActive(link.title)}
              whileHover={{ scale: 1.1, rotate: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <button type="button" onClick={() => handleSectionNav(link)}>
                {link.title}
              </button>
            </motion.li>
          ))}
        </ul>

        {/* MOBILE MENU TOGGLE */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            className="text-white font-bold text-sm tracking-widest uppercase hover:text-[#F844C2] transition-colors"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? 'CLOSE' : 'MENU'}
          </button>

          {/* MOBILE MENU DROPDOWN */}
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-black absolute top-full left-0 w-full z-40 shadow-2xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-6">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`
                    font-bold cursor-pointer text-[24px] uppercase tracking-tighter w-full text-left
                    ${active === link.title ? "text-[#F844C2]" : "text-white"}
                    hover:text-[#F844C2] transition-colors
                  `}
                  onClick={() => {
                    handleSectionNav(link);
                  }}
                >
                  <button type="button">{link.title}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



