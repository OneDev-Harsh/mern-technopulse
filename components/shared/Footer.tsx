"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-gray-300 py-8 mt-10 border-t border-indigo-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo & Name */}
        <div className="flex items-center gap-3">
          <Image
            src="/assets/images/logo.svg"
            alt="Techno Pulse Logo"
            width={40}
            height={40}
            className="rounded-md"
          />
          <h1 className="text-lg font-semibold text-white">
            <span className="bg-gradient-to-r from-indigo-400 to-violet-500 bg-clip-text text-transparent">
              TechnoMain
            </span>{" "}
            Pulse
          </h1>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <Link href="#" className="hover:text-white transition-colors duration-200">
            <Github size={24} />
          </Link>
          <Link href="#" className="hover:text-white transition-colors duration-200">
            <Linkedin size={24} />
          </Link>
          <Link href="#" className="hover:text-white transition-colors duration-200">
            <Mail size={24} />
          </Link>
        </div>
      </div>

      {/* Bottom Note */}
      <p className="text-center text-gray-400 text-xs mt-6">
        © {new Date().getFullYear()} TechnoMain Pulse. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
