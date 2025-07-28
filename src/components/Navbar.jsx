// import { useState } from "react";
// import { ThemeToggle } from "./ThemeToggle";
// import { LogoIcon } from "@/icons/icons";
// import { Menu, X } from "lucide-react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//     if (!isMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//   };

//   return (
//     <div className="py-8 px-4 max-w-[1600px] m-auto md:px-16 sticky top-0 z-50">
//       <header className="flex bg-[#ffffff98] dark:bg-[#1212247c] backdrop-blur-sm items-center justify-between border p-4 md:p-6 md:py-6 md:px-16 rounded-full">
//         <Link to="/">
//           <LogoIcon />
//         </Link>

//         <nav className="hidden md:flex items-center space-x-12">
//           <Link
//             to="/work"
//             className="hover:text-cyan-400 text-[18px] transition-colors border-b-2 border-transparent hover:border-cyan-400"
//           >
//             Work
//           </Link>
//           <Link
//             to="/about"
//             className="hover:text-cyan-400 text-[18px] transition-colors"
//           >
//             About
//           </Link>
//           <Link
//             to="/fun"
//             className="hover:text-cyan-400 text-[18px] transition-colors"
//           >
//             Fun
//           </Link>
//           <Link
//             to="/resume"
//             className="hover:text-cyan-400 text-[18px] transition-colors"
//           >
//             Resume
//           </Link>
//           <ThemeToggle />
//         </nav>

//         <button
//           className="md:hidden text-foreground"
//           onClick={toggleMenu}
//           aria-label="Toggle menu"
//         >
//           <Menu size={24} />
//         </button>
//       </header>

//       {isMenuOpen && (
//         <div className="fixed inset-0 bg-white dark:bg-[#121224] z-50 flex flex-col px-4 py-5">
//           <div className="flex justify-between   border px-6 py-4 rounded-full  items-center">
//             <LogoIcon />
//             <button onClick={toggleMenu} aria-label="Close menu" className="">
//               <X size={24} />
//             </button>
//           </div>

//           <nav className="flex flex-col mt-12 space-y-8">
//             <Link
//               to="/work"
//               className=" text-xl border-b-2  pb-1 w-fit"
//               onClick={toggleMenu}
//             >
//               Work
//             </Link>
//             <Link to="/about" className=" text-xl" onClick={toggleMenu}>
//               About
//             </Link>
//             <Link to="/fun" className=" text-xl" onClick={toggleMenu}>
//               Fun
//             </Link>
//             <Link to="/resume" className=" text-xl" onClick={toggleMenu}>
//               Resume
//             </Link>
//           </nav>

//           <div className="mt-auto mb-8">
//             <ThemeToggle />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;



import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { LogoIcon } from "@/icons/icons";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <div className="py-4 px-4 max-w-[1600px] mx-auto md:px-16 sticky top-0 z-50">
      <header className="flex sticky w-full   bg-[#ffffff98] dark:bg-[#1212247c] backdrop-blur-sm items-center justify-between border p-4 md:p-6 rounded-full">
        <Link to="/work">
         <div className="hidden md:flex
           justify-center items-center"> <LogoIcon /></div>
         <div className="md:hidden 
          flex justify-center items-center"> <LogoIcon width="100" /></div>
        </Link>

        <nav className="hidden md:flex items-center space-x-12">
          {["/work", "/about", "/fun", "/resume"].map((path) => (
            <Link
              key={path}
              to={path}
              className="hover:text-cyan-400 text-[18px] transition-colors border-b-2 border-transparent hover:border-cyan-400"
            >
              {path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
            </Link>
          ))}
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
          <div className="flex justify-between items-center border px-4 py-3 rounded-full">
            <Link to="/" onClick={toggleMenu}>
              <LogoIcon width="100" />
            </Link>
            <button onClick={toggleMenu} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>

          <nav className="flex px-6 flex-col mt-12 space-y-8 text-xl">
            {["/work", "/about", "/fun", "/resume"].map((path) => (
              <Link
                key={path}
                to={path}
                className="border-b-2 pb-1 text-[14px] w-fit"
                onClick={toggleMenu}
              >
                {path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
              </Link>
            ))}
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
