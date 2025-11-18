"use client"; 
import React from 'react'
import {motion} from 'motion/react'
import { Sparkle, Sparkles } from 'lucide-react';
import TailwindCSS from '../icons/tailwind-css';
import { BrowseComponentsButton } from '../ui/browse-button';
import { BrowseBlocksButton } from '../ui/browse-blocks';
const hero = () => {
  return (
    <div className='mx-auto w-full max-w-7xl min-h-screen flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 px-4 sm:px-6 md:py-16 lg:py-20'>
      {/* Left Section */}
      <div className='w-full lg:w-[45%] flex-col items-start text-left space-y-8'>
          <motion.div
          initial={{opacity:0, y:20}}
          animate={{opacity:1, y:0}}
          transition={{duration:0.6}}
          >
                    <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold tracking-light leading-[1.1] text-zinc-900 dark:text-zinc-100'>
                    Build Stunning UIs Effortlessly 
                    <span className='bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-fuchsia-500 to-purple-500 dark:from-rose-400 dark:via-fuchsia-400 dark:to-purple-400'>
                     - with UI Perfect
                     <br/>
                     <span className='bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-fuchsia-500 to-purple-500 dark:from-rose-400 dark:via-fuchsia-400 dark:to-purple-400'>
                    Your Ultimate React Component Library
                     </span>
                    </span>
                    </h1>
                    <p className='mt-6 text-base md:text-xl text-zinc-700 dark:text-zinc-300 max-w-lg'>
                    Elevate your web projects with UI Perfect, the comprehensive React component library designed for developers and designers alike. Create beautiful, responsive interfaces with ease and speed
                    <span className='font-semibold'>
                              with 100+ customizable components.
                    </span> {" "}
                    crafted with {" "}
                    <span className='bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-fuchsia-500 to-purple-500 dark:from-rose-400 dark:via-fuchsia-400 dark:to-purple-400'>
                    Tailwind CSS
                    </span>{" "}
                    and {" "}
                    <span className='bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-fuchsia-500 to-purple-500 dark:from-rose-400 dark:via-fuchsia-400 dark:to-purple-400'>
                    Shadcn UI
                    </span>{" "}
                    for modern React and Next.js applications.
                    </p>
          </motion.div>
          <motion.div
          initial={{opacity:0, y:20}}
          animate={{opacity:1, y:0}}
          transition={{duration:0.6, delay:0.2}}
          className='flex flex-col justify-start w-full'
          >
                    <span className='text-sm text-zinc-500 dark:text-zinc-300 pb-3 text-start flex items-center gap-2'>
                              <TailwindCSS className='w-4 h-4 text-blue-500'/>
                    <span className='flex items-center gap-2'>
                              Now updated for Tailwind CSS v4!
                              <span className='inline-flex items-center rounded-md bg-purple-50 dark:bg-purple-900/30 px-2 py-1 text-xs font-medium text-purple-700 dark:text-purple-300'>
                              <Sparkles className='h-3 w-4 mr-1'/>
                              New Release
                              </span>
                    </span>
                    </span>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-start '>
                              <BrowseComponentsButton />
                              <BrowseBlocksButton />
                    </div>
          </motion.div>
      </div>
    </div>
  )
}

export default hero
