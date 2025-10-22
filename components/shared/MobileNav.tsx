"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname(); // get current path

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/create", label: "Create Event" },
    { href: "/clubs", label: "Clubs" },
    { href: "/profile", label: "My Profile" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="md:hidden">
      <Sheet>
        {/* Menu Trigger */}
        <SheetTrigger asChild>
          <Image
            src="/assets/icons/menu.svg"
            alt="menu"
            width={28}
            height={28}
            className="cursor-pointer invert hover:scale-110 transition-transform duration-300"
          />
        </SheetTrigger>

        {/* Drawer Content */}
        <SheetContent
          side="right"
          className="w-[65%] max-w-xs rounded-l-xl overflow-hidden
                     bg-gradient-to-b from-[#0f172a]/95 via-[#1e1b4b]/95 to-[#312e81]/95
                     border-l border-indigo-500/30 text-gray-100 shadow-lg shadow-indigo-500/25"
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6 mt-3 px-4">
            <Image
              src="/assets/images/logo.svg"
              alt="Techno Pulse Logo"
              width={42}
              height={42}
              className="rounded-md"
            />
            <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              <span className="bg-gradient-to-r from-indigo-400 to-violet-500 bg-clip-text text-transparent">
                TechnoMain
              </span>{" "}
              Pulse
            </h1>
          </div>

          <Separator className="bg-indigo-500/20 mb-5 mx-4" />

          {/* Navigation Links */}
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-4 text-base font-medium px-4"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 px-3 rounded-md transition-all duration-300
                    ${isActive 
                      ? "text-white bg-indigo-500/20 shadow-[0_0_8px_rgba(99,102,241,0.3)]" 
                      : "hover:text-white hover:bg-indigo-500/10 hover:shadow-[0_0_8px_rgba(99,102,241,0.2)]"
                    }`}
                >
                  {link.label}
                  <span className={`absolute left-0 bottom-0 h-[2px] transition-all duration-300 
                    ${isActive 
                      ? "w-full bg-gradient-to-r from-indigo-400 to-violet-500" 
                      : "w-0 group-hover:w-full bg-gradient-to-r from-indigo-400 to-violet-500"
                    }`}></span>
                </Link>
              );
            })}
          </motion.nav>

          <Separator className="bg-indigo-500/20 my-6 mx-4" />

          {/* Footer note */}
          <p className="text-xs text-gray-400 text-center px-4">
            © {new Date().getFullYear()} <span className="text-indigo-400">TechnoMain Pulse</span>
          </p>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
