import { navItems } from "@/app/page";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose, IoMenu } from "react-icons/io5";

interface MenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<MenuProps> = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed h-screen inset-0 z-50 bg-[#0D0010] backdrop-blur-md flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-[#F5E642] text-4xl p-2 hover:opacity-80 transition-opacity"
            >
              <IoClose />
            </button>

            <nav className="flex flex-col items-center gap-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 }}
                  className="text-2xl font-bold text-white hover:text-[#F5E642] transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}

              <motion.a
                href="/products"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.07 + 0.1 }}
                className="mt-8 px-8 py-3 bg-[#F5E642] text-[#0D0010] font-bold rounded-full hover:shadow-[0_0_16px_#F5E64280] transition-all duration-300"
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

export default Menu;
