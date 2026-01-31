'use client';

import { motion } from 'framer-motion';

// This is a client component because of framer-motion, but could be a server component if animations were not used.
// For the purpose of this demo, we'll keep it as a client component to fulfill the animation requirement.

export default function HeroSection() {
  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
      <video
        className="absolute left-0 top-0 h-full w-full object-cover"
        src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-headline text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl"
        >
          Rwanda Visuals
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mt-4 max-w-2xl text-lg text-white/80 md:text-xl"
        >
          Cinematic Storytelling
        </motion.p>
      </div>
    </div>
  );
}
