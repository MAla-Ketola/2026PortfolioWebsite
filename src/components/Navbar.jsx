import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        w-full flex items-center py-4 fixed top-0 z-50 bg-black 
        transition-all duration-300
      `}
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
          <p className="text-white text-[20px] font-black tracking-tighter uppercase cursor-pointer hover:text-[#ebff36] transition-colors">
            Marjut
          </p>
        </Link>

        {/* DESKTOP LINKS */}
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`
                text-[14px] font-mono font-bold uppercase tracking-widest cursor-pointer
                ${active === link.title ? "text-[#ebff36]" : "text-white"}
                hover:text-[#ebff36] transition-colors
              `}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>

        {/* MOBILE MENU TOGGLE */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            className="text-white font-mono font-bold text-sm tracking-widest uppercase hover:text-[#ebff36] transition-colors"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? '[CLOSE]' : '[MENU]'}
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
                    font-mono font-bold cursor-pointer text-[24px] uppercase tracking-tighter w-full text-left
                    ${active === link.title ? "text-[#ebff36]" : "text-white"}
                    hover:text-[#ebff36] transition-colors
                  `}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(link.title);
                  }}
                >
                  <a href={`#${link.id}`}>_/{link.title}</a>
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
