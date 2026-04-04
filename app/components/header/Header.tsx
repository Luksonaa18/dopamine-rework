"use client";
import { use, useEffect, useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";

import { navItems } from "@/app/page";
import Menu from "../menubar/Menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  return (
    <>
      <header className="w-full sticky top-0 z-50 backdrop-blur-md bg-[#0D0010]/85 border-b border-[#6B2FD9]/30 shadow-lg">
        <nav className="flex flex-row items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <h1 className="text-2xl text-[#F5E642] font-bold tracking-wider">
            DOPAMINE
          </h1>

          {/* Desktop menu */}
          <ul className="hidden md:flex flex-row items-center gap-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-white text-sm font-medium tracking-wide hover:text-[#F5E642] transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F5E642] group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="/products"
            className="hidden md:block px-5 py-2 bg-[#F5E642] text-[#0D0010] text-sm font-bold rounded-full hover:shadow-[0_0_16px_#F5E64280] transition-all duration-300"
          >
            პროდუქტის შესახებ
          </a>

          <Menu isOpen={isOpen} setIsOpen={setIsOpen} />

          {isOpen ? (
            <IoClose
              onClick={() => setIsOpen(false)}
              className="text-3xl text-[#F5E642] md:hidden cursor-pointer"
            />
          ) : (
            <IoMenu
              onClick={() => setIsOpen(true)}
              className="text-3xl text-[#F5E642] md:hidden cursor-pointer"
            />
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
