"use client";
import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navItems = [
    { name: "მთავარი", href: "/" },
    { name: "პროდუქტები", href: "/products" },
    {
      name: "ჩვენ შესახებ",
      href: "https://www.tiktok.com/@dopamine.energy/video/7624523299577449749",
    },
    {
      name: "კონტაქტი",
      href: "https://www.instagram.com/dopamine.energy?igsh=MWY5aXhnZXphaHFkMg==",
    },
  ];

  return (
    <>
      <header className="w-full sticky top-0 z-50 backdrop-blur-md bg-[#0D0010]/85 border-b border-[#6B2FD9]/30 shadow-lg">
        <nav className="flex flex-row items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <h1 className="text-2xl text-[#F5E642] font-bold tracking-wider">
            DOPAMINE
          </h1>

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

          <a
            href="https://www.instagram.com/dopamine.energy?igsh=MWY5aXhnZXphaHFkMg=="
            className="hidden md:block px-5 py-2 bg-[#F5E642] text-[#0D0010] text-sm font-bold rounded-full hover:shadow-[0_0_16px_#F5E64280] transition-all duration-300"
          >
            პროდუქტის შესახებ
          </a>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden text-[#F5E642] cursor-pointer hover:opacity-75 transition-opacity"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IoClose className="text-3xl" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IoMenu className="text-3xl" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden sticky
             top-16.25 z-40 w-full bg-[#0D0010]/95 backdrop-blur-md border-b border-[#6B2FD9]/30 shadow-lg overflow-hidden"
          >
            <nav className="flex flex-col items-center py-6 gap-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.07 }}
                  className="text-lg text-white w-full text-center py-3 hover:text-[#F5E642] hover:bg-[#6B2FD9]/10 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}

              <motion.a
                href="/products"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.07 }}
                className="mt-4 px-8 py-3 bg-[#F5E642] text-[#0D0010] font-bold rounded-full hover:shadow-[0_0_16px_#F5E64280] transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Buy Now
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
