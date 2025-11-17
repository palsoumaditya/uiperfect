import { ArrowUpRight, Flame, PartyPopper } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "next-view-transitions";
import React from "react";
import { Link as ViewTransitionsLink } from "next-view-transitions";
import { ThemeToggle } from "../ui/theme-toggle";
const Header = () => {
  return (
    <>
      {/* Mobile view Header File */}
      <div className="sm:hidden w-full p-2.5 bg-white dark:bg-black/5">
        <div className="flex items-center justify-between">
          <Link href={"#"} className="flex items-center gap-2">
            <PartyPopper className="w-4 h-4" />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Explore New Components
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="sticky top-0 left-0 right-0 z-50">
        <div className="bg-white dark:bg-black/5 w-full">
          {/* Rest Header Content */}
          <div className="flex items-center justify-center w-full flex-col">
            <div
              className={`
                    flex items-center justify-between
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
                    transition-all duration-300 ease-in-outt
                    `}
            >
              <div className="relative z-10 flex items-center justify-between w-full gap-2">
                {/* Logo Section */}
                <div className="flex items-center gap-6">
                  <Link href={"/"} className="flex items-center gap-2">
                    <Flame className="w-6 h-6 text-green-500 dark:text-green-400" />
                    <span className="hidden sm:block font-semibold">
                      UI Perfect
                    </span>
                  </Link>
                  <span className="text-zinc-300 dark:text-zinc-700"> | </span>
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
                {/* Right Side Content */}
                <div className="hidden sm:flex items-center gap-3">
                  <span className="text-zinc-300 dark:text-zinc-700">|</span>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
