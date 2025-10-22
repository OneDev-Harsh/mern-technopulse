"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
    <section className="relative bg-[#f9fafb] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 min-h-screen flex flex-col-reverse md:flex-row items-center justify-center gap-10 md:gap-20">
        
        {/* Text Section */}
        <motion.div
          className="flex-1 flex flex-col gap-6 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
              Discover, Join, Celebrate.
            <br />
            All Your Campus Events, One Place!
          </h1>

          <p className="text-gray-700 text-lg sm:text-xl max-w-md mx-auto md:mx-0">
            Manage, explore, and celebrate events with ease. Connect with your college community and make every event unforgettable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center md:justify-start">
            <Button className="bg-indigo-500 hover:bg-violet-500 text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
              <Link href="#events">Explore Now</Link>
            </Button>
            <Button className="bg-gray-300 hover:bg-gray-400 text-gray-900 shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
              <Link href="#create">Create Event</Link>
            </Button>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="flex-1 relative w-full max-w-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/assets/images/heroAI.png"
            alt="Hero Image"
            width={800}
            height={800}
            className="rounded-xl"
          />
        </motion.div>
      </div>
    </section>

    <section id="events" className="relative bg-white py-20 overflow-hidden">
  <motion.div
    className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex flex-col items-center gap-10"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    {/* Heading */}
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center leading-snug text-gray-900">
        Trusted by
      <br />
      Thousands of Events
    </h2>

    {/* Search & Filters */}
    <div className="w-full flex flex-col sm:flex-row items-center gap-4 mt-8">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search events..."
        className="w-full sm:w-1/2 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
      />

      {/* Category Filter */}
      <select
        className="w-full sm:w-1/4 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
      >
        <option>All Categories</option>
        <option>Tech</option>
        <option>Drama</option>
        <option>Sports</option>
        <option>Debate</option>
        <option>Music</option>
        <option>Dance</option>
        <option>Quiz</option>
        <option>Seminar/Webinar</option>
      </select>

      {/* Search Button */}
      <button className="w-full sm:w-auto px-6 py-3 bg-indigo-500 hover:bg-violet-500 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
        Search
      </button>
    </div>
  </motion.div>
</section>

    </>
  );
}
