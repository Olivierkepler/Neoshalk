"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Search } from "lucide-react";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { useTheme } from "next-themes";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const runCommand = (callback: () => void) => callback();

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/About" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      setSearchQuery("");
    }
  };

  return (
    <nav
      className={`fixed font-logo top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-md bg-white/70 dark:bg-slate-900/70"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
        {/* ---------- LEFT / CENTER SECTION ---------- */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 py-1 font-logo text-slate-800 dark:text-white"
          >
            <Image
              src="/neoshark_no_bg.png"
              alt="NeoShark"
              width={40}
              height={40}
            />
            <span className="text-2xl py-1">NeoShark</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 text-lg font-medium text-slate-700 dark:text-slate-300">
            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="relative flex items-center group"
            >
              <Search className="absolute left-2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="pl-8 pr-10 py-1.5 w-36 group-hover:w-56 focus:w-64 transition-all duration-300 border rounded-md border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 focus:ring-2 focus:ring-blue-500 text-lg"
              />
              <kbd className="absolute right-2 text-[10px] text-slate-400 border border-slate-300 rounded px-1 py-0.5">
                ⌘K
              </kbd>
            </form>

            {/* Navigation Links */}
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="transition py-2 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {link.name}
              </Link>
            ))}

            {/* Dashboard (only if logged in) */}
            {session && (
              <Link
                href="/dashboard"
                className="transition py-2 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* ---------- RIGHT SECTION (Theme + Auth) ---------- */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-slate-200 cursor-pointer dark:hover:bg-slate-800 transition"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400 cursor-pointer" />
              ) : (
                <Moon className="h-5 w-5 text-sky-500 cursor-pointer" />
              )}
            </button>
          )}

          {/* Auth Button (always far right) */}
          {session ? (
            <button
              onClick={() => signOut()}
            className="px-4 py-1.5  text-lg hover:bg-slate-800 dark:hover:bg-slate-800 hover:text-white cursor-pointer text-black dark:text-white  rounded-md font-logo transition"
            >   Sign out 
            </button>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="px-4 py-1.5  text-lg hover:bg-slate-800 dark:hover:bg-slate-800 hover:text-white cursor-pointer text-black dark:text-white  rounded-md font-logo transition"
            >
              Sign in 
            </button>
          )}
        </div>

        {/* ---------- MOBILE MENU BUTTON ---------- */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-800 dark:text-white cursor-pointer"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ---------- MOBILE MENU ---------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200/10"
          >
            <div className="flex flex-col items-center py-4 space-y-4">
              {/* Search */}
              <form
                onSubmit={handleSearch}
                className="relative w-5/6 flex items-center"
              >
                <Search className="absolute left-2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="pl-8 pr-3 py-2 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </form>

              {/* Nav Links */}
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                >
                  {link.name}
                </Link>
              ))}

              {/* Dashboard */}
              {session && (
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2  rounded-md font-semibold transition"
                >
                  Dashboard
                </Link>
              )}

              {/* Auth Button */}
              {session ? (
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-black text-white rounded-md font-semibold transition"
                >
                  Sign out
                </button>
              ) : (
                <button
                  onClick={() => {
                    signIn("google");
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition"
                >
                  Sign in
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
