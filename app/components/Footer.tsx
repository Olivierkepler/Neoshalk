"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const { theme } = useTheme();

  const textColor = theme === "light" ? "text-gray-700" : "text-gray-700";
  const accentColor = theme === "light" ? "text-blue-600" : "text-blue-600";

  return (
    <footer className={`w-full   border-t border-gray-700/30 backdrop-blur-sm`}>
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <img
            src="/neoshark_no_bg.png"
            alt="Neoshark Logo"
            className="w-20 h-20 object-contain"
          />
          <span className={`text-2xl font-logo`}>NeoShark
     
          </span>
       
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-6 text-2xl">
          <Link href="/" className={`hover:${accentColor} transition-colors ${textColor}`}>
            Home
          </Link>
          <Link href="/about" className={`hover:${accentColor} transition-colors ${textColor}`}>
            About
          </Link>
          <Link href="/projects" className={`hover:${accentColor} transition-colors ${textColor}`}>
            Projects
          </Link>
          <Link href="/contact" className={`hover:${accentColor} transition-colors ${textColor}`}>
            Contact
          </Link>
        </nav>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/"
            target="_blank"
            className="hover:scale-110 transition-transform"
          >
            <Github className={`h-5 w-5 ${textColor} hover:${accentColor}`} />
          </Link>
          <Link
            href="https://twitter.com/"
            target="_blank"
            className="hover:scale-110 transition-transform"
          >
            <Twitter className={`h-5 w-5 ${textColor} hover:${accentColor}`} />
          </Link>
          <Link
            href="https://linkedin.com/"
            target="_blank"
            className="hover:scale-110 transition-transform"
          >
            <Linkedin className={`h-5 w-5 ${textColor} hover:${accentColor}`} />
          </Link>
          <Link
            href="mailto:info@neoshark.io"
            className="hover:scale-110 transition-transform"
          >
            <Mail className={`h-5 w-5 ${textColor} hover:${accentColor}`} />
          </Link>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-gray-700/30">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col md:flex-row items-center justify-between text-2xl text-gray-500">
          <p>© {new Date().getFullYear()} Neoshark. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Crafted with <span className="text-red-500"></span> by the NeoShark Team.
          </p>
        </div>
      </div>
    </footer>
  );
}
