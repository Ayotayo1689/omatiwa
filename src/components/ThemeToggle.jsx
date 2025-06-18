// "use client"

// import { Moon, Sun } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { useTheme } from "@/components/ThemeProvider"

// export function ThemeToggle() {
//   const { theme, setTheme } = useTheme()

//   return (
//     <Button
//       variant="ghost"
//       size="icon"
//       onClick={() => setTheme(theme === "light" ? "dark" : "light")}
//       className="rounded-full"
//     >
//       <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//       <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//       <span className="sr-only">Toggle theme</span>
//     </Button>
//   )
// }

"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={`
          relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-offset-background focus:ring-0
          ${isDark ? "bg-gray-700" : "bg-gray-300"}
        `}
        role="switch"
        aria-checked={isDark}
        aria-label="Toggle theme"
      >
        <span
          className={`
             h-6 w-6 transform rounded-full dark:bg-white bg-black transition-transform duration-300 ease-in-out flex items-center justify-center
            ${isDark ? "translate-x-7" : "translate-x-1"}
          `}
        >
          {isDark ? (
            <Moon className="h-3 w-3 text-black" />
          ) : (
            <Sun className="h-3 w-3 text-white" />
          )}
        </span>
      </button>
    </div>
  );
}
