"use client";

import { Flame, PartyPopper, Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "next-view-transitions";
import React, { useState } from "react";
import { Link as ViewTransitionsLink } from "next-view-transitions";
import { ThemeToggle } from "../ui/theme-toggle";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile view Header File - REMOVED TOGGLE FROM HERE */}
      <div className="sm:hidden w-full p-2.5 bg-white dark:bg-black/5">
        <div className="flex items-center justify-between">
          <Link href={"#"} className="flex items-center gap-2">
            <PartyPopper className="w-4 h-4" />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Explore New Components
            </span>
          </Link>
          {/* ThemeToggle removed from here */}
        </div>
      </div>

      <div className="sticky top-0 left-0 right-0 z-50">
        <div className="bg-white dark:bg-black/5 w-full">
          <div className="flex items-center justify-center w-full flex-col">
            <div
              className={`
                  flex flex-col
                  items-center justify-between
                  bg-linear-to-b from-white/90 via-gray-50/90 to-white/90
                  dark:from-zinc-900/90 dark:via-zinc-800/90 dark:to-zinc-900/90
                  shadow-[0_2px_20px_-2px_rgba(0,0,0,0.1)]
                  backdrop-blur-md
                  border-x border-b
                  border-[rgba(230,230,230,0.7)] dark:border-[rgba(70,70,70,0.7)]
                  w-full sm:min-w-[800px] sm:max-w-[1200px]
                  rounded-b-[28px]
                  px-4 py-2.5
                  relative
                  transition-all duration-300 ease-in-out
                  `}
            >
              <div className="relative z-10 flex items-center justify-between w-full gap-2">
                {/* Logo Section */}
                <div className="flex items-center gap-6">
                  <Link href={"/"} className="flex items-center gap-2">
                    <Flame className="w-6 h-6 text-green-500 dark:text-green-400" />
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                      UI Perfect
                    </span>
                  </Link>
                  <span className="hidden sm:block text-zinc-300 dark:text-zinc-700">
                    {" "}
                    |{" "}
                  </span>
                  
                  {/* Desktop Navigation */}
                  <div className="hidden sm:flex items-center gap-4">
                    <ViewTransitionsLink
                      href={"/docs/components/background-paths"}
                      className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                    >
                      Components
                    </ViewTransitionsLink>
                  </div>
                  <div className="hidden sm:flex items-center gap-4">
                    <ViewTransitionsLink
                      href={"/Pricing"}
                      className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                    >
                      Pricing
                    </ViewTransitionsLink>
                    <Link
                      href={"#"}
                      target="_blank"
                      className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors flex items-center gap-2"
                    >
                      Templates
                      <Badge variant="brand">new</Badge>
                    </Link>
                  </div>
                </div>

                {/* Right Side Content - UPDATED */}
                {/* Changed 'hidden sm:flex' to 'flex' so it shows on mobile */}
                <div className="flex items-center gap-3">
                  {/* Pipe is hidden on mobile */}
                  <span className="hidden sm:block text-zinc-300 dark:text-zinc-700">|</span>
                  
                  {/* Toggle is now visible on both mobile and desktop */}
                  <ThemeToggle />

                  {/* Mobile Menu Trigger - Added here to sit next to toggle */}
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="sm:hidden p-1 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md"
                  >
                    {isMobileMenuOpen ? (
                      <X className="w-5 h-5" />
                    ) : (
                      <Menu className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Mobile Menu Dropdown Content */}
              {isMobileMenuOpen && (
                <div className="sm:hidden w-full mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 animate-in slide-in-from-top-2 fade-in duration-200">
                  <div className="flex flex-col gap-4">
                    <ViewTransitionsLink
                      href={"/docs/components/background-paths"}
                      className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
                    >
                      Components
                    </ViewTransitionsLink>
                    <ViewTransitionsLink
                      href={"/Pricing"}
                      className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
                    >
                      Pricing
                    </ViewTransitionsLink>
                    <Link
                      href={"#"}
                      target="_blank"
                      className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors flex items-center gap-2 px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
                    >
                      Templates
                      <Badge variant="brand">new</Badge>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;