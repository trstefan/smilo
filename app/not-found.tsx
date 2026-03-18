"use client";

import Link from "next/link";

import React from "react";
import { motion } from "framer-motion";

interface NotFoundProps {
  onBack: () => void;
}

const NotFound: React.FC<NotFoundProps> = ({ onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-h-screen bg-white flex flex-col relative overflow-hidden"
    >
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mb-12 relative"
        >
          {/* Sunday Character (Robot Head Variation) */}
          <div className="w-32 h-32 md:w-48 md:h-48 bg-[#00D4DA] rounded-4xl flex items-center justify-center relative overflow-hidden shadow-2xl">
            {/* "Eyelashes" */}
            <div className="absolute top-4 left-6 w-10 h-1 bg-black/20 -rotate-45" />
            <div className="absolute top-4 right-6 w-10 h-1 bg-black/20 rotate-45" />

            {/* Eyes (Closed) */}
            <div className="flex gap-4">
              <div className="w-6 h-1 bg-black rounded-full" />
              <div className="w-6 h-1 bg-black rounded-full" />
            </div>
            {/* Mouth */}
            <div className="absolute bottom-12 w-8 h-1 bg-black rounded-full" />
          </div>
        </motion.div>

        <h1 className="text-7xl md:text-9xl font-black mb-6 text-black/90">
          404
        </h1>
        <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter">
          This system didn't load!
        </h2>
        <p className="max-w-md mx-auto text-gray-500 font-medium mb-12 leading-relaxed">
          The module you're looking for doesn't seem to exist. But don't worry,
          our other prototypes are fully operational and waiting for you!
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onBack}
            className="bg-black text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
          >
            Go back
          </button>
          <button className="bg-gray-100 text-gray-500 px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
            Report problem
          </button>
        </div>
      </main>
    </motion.div>
  );
};

export default NotFound;
