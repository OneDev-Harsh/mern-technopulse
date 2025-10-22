"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import MobileNav from "./MobileNav";

function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/create", label: "Create Event" },
    { href: "/clubs", label: "Clubs" },
    { href: "/profile", label: "My Profile" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-[#0f172a] via-[#1e1b4b] to-[#312e81] backdrop-blur-lg border-b border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.25)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/assets/images/logo.svg"
            width={42}
            height={42}
            alt="Techno Pulse Logo"
            className="rounded-md transition-transform duration-300 group-hover:scale-105"
          />
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
            <span className="bg-gradient-to-r from-indigo-400 to-violet-500 bg-clip-text text-transparent">
              TechnoMain
            </span>{" "}
            Pulse
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-gray-300">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative transition-colors duration-200 group
                  ${isActive ? "text-white font-semibold" : "hover:text-white"}
                `}
              >
                {link.label}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] transition-all duration-300 
                    ${
                      isActive
                        ? "w-full bg-gradient-to-r from-indigo-400 to-violet-500"
                        : "w-0 group-hover:w-full bg-gradient-to-r from-indigo-400 to-violet-500"
                    }`}
                ></span>
              </Link>
            );
          })}
        </nav>

        {/* Auth + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-gray-300 hover:text-white font-medium transition-colors">
                Login
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white rounded-full font-medium text-sm sm:text-base px-5 py-2 sm:py-2.5 shadow-lg shadow-indigo-500/30 transition-all duration-200">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-10 h-10 border border-indigo-500 rounded-full hover:shadow-[0_0_12px_rgba(99,102,241,0.6)] transition-all duration-200",
                },
              }}
            />
            <MobileNav />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

export default Header;
