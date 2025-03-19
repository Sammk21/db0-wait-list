"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { WaitlistForm } from "../waitlist-form"
import { useEffect, useState } from "react"
import { getWaitlistCount } from "@/actions/waitlist"


function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }))

  
  

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full text-slate-950 dark:text-white" viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export default function BackgroundPaths({
  title = "Join the Waitlist",

}: {
  title?: string
}) {


  const words = title.split(" ")

   const [waitlistCount, setWaitlistCount] = useState(0);

   useEffect(() => {
     getWaitlistCount().then((count) => setWaitlistCount(count + 100));
   }, []);

   const handleSuccess = (count: number) => {
     setWaitlistCount(count + 100);
   };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#811519] dark:bg-neutral-950">
      <div className="absolute z-10 inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="w-[100dvw] h-[100dvh] absolute top-0 left-0 opacity-50 flex sm:items-center justify-center">
        <p
          style={{ fontFamily: "cofo-sans-pixel, sans-serif" }}
          className="cofo-sans-pixel text-[8rem]   sm:text-[70vh] mt-3 text-center"
        >
          0/
        </p>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8 ">
            <h1 className="text-4xl sm:text-7xl md:text-8xl mb-3 font-bold tracking-tight">
              {words.map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  className="inline-block mr-3 sm:mr-5 last:mr-0"
                >
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: wordIndex * 0.1 + letterIndex * 0.03,
                        type: "spring",
                        stiffness: 150,
                        damping: 25,
                      }}
                      className="inline-block text-transparent bg-clip-text 
                                        bg-gradient-to-r from-[#e6e7e8] to-[#cbcbcb]"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>
            <p className="text-[#e7e8e9] text-xs sm:text-lg mb-2">
              The first drop is coming Soon.
              <b className="text-sm sm:text-xl"> Limited pieces.</b> Be the
              first to know.
            </p>
            <p className="text-[#e7e8e9] text-xs sm:text-lg">
              <b className="text-sm sm:text-xl">Join the waitlist</b> now for
              early access, and a chance to cop before the world does.
            </p>
          </div>
          <WaitlistForm onSuccess={handleSuccess} />
        </motion.div>
      </div>
    </div>
  );
}

