"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-gradient-to-b from-black/20 to-transparent backdrop-blur-md border-b border-emerald-500/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent hover:from-emerald-300 hover:to-emerald-400 transition-all duration-300 relative">
                TecWebStudio
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-green-500 group-hover:w-full transition-all duration-300"></span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-white/80 hover:text-emerald-400 transition-colors duration-300 font-medium text-sm uppercase tracking-wider group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-green-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() =>
                typeof window !== "undefined" &&
                window.dispatchEvent(new CustomEvent("open-get-started"))
              }
              className="relative px-6 py-2 font-medium text-white/90 rounded-lg overflow-hidden group transition-all duration-300"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {/* Animated border */}
              <div className="absolute inset-0 rounded-lg border border-emerald-400/30 group-hover:border-emerald-400 transition-colors duration-300"></div>
              <span className="relative z-10">Get Started</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/70 hover:text-emerald-400 hover:bg-white/5 transition-all duration-300"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 backdrop-blur-sm bg-gradient-to-b from-black/40 to-black/20 border-t border-emerald-500/10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-md text-white/80 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all duration-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() =>
                typeof window !== "undefined" &&
                window.dispatchEvent(new CustomEvent("open-get-started"))
              }
              className="w-full mt-4 px-6 py-2 font-medium text-white/90 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 text-center block"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
