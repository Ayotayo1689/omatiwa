import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { LogoIcon } from "@/icons/icons";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  return (
    <div className="py-8 px-4 max-w-[1600px] m-auto md:px-16 sticky top-0 z-50">
      <header className="flex bg-[#ffffff98] dark:bg-[#1212247c] backdrop-blur-sm items-center justify-between border p-4 md:p-6 md:py-6 md:px-16 rounded-full">
        <a href="/">
          <LogoIcon />
        </a>

        <nav className="hidden md:flex items-center space-x-12">
          <a
            href="#work"
            className="hover:text-cyan-400 text-[18px] transition-colors border-b-2 border-transparent hover:border-cyan-400"
          >
            Work
          </a>
          <a
            href="/about"
            className="hover:text-cyan-400 text-[18px] transition-colors"
          >
            About
          </a>
          <a
            href="#fun"
            className="hover:text-cyan-400 text-[18px] transition-colors"
          >
            Fun
          </a>
          <a
            href="#resume"
            className="hover:text-cyan-400 text-[18px] transition-colors"
          >
            Resume
          </a>
          <ThemeToggle />
        </nav>

        <button
          className="md:hidden text-foreground"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-white dark:bg-[#121224] z-50 flex flex-col px-4 py-5">
          <div className="flex justify-between   border px-6 py-4 rounded-full  items-center">
            <LogoIcon />
            <button onClick={toggleMenu} aria-label="Close menu" className="">
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col mt-12 space-y-8">
            <a
              href="#work"
              className=" text-xl border-b-2  pb-1 w-fit"
              onClick={toggleMenu}
            >
              Work
            </a>
            <a href="#about" className=" text-xl" onClick={toggleMenu}>
              About
            </a>
            <a href="#fun" className=" text-xl" onClick={toggleMenu}>
              Fun
            </a>
            <a href="#resume" className=" text-xl" onClick={toggleMenu}>
              Resume
            </a>
          </nav>

          <div className="mt-auto mb-8">
            <ThemeToggle />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
