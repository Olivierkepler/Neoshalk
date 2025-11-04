"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderOpen, Settings, LogOut, BookOpen } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/dashboard/projects", icon: FolderOpen },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Flashcards", href: "/dashboard/flashcards", icon: BookOpen },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [width, setWidth] = useState<number>(260);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // Load saved width
  useEffect(() => {
    const savedWidth = localStorage.getItem("sidebarWidth");
    if (savedWidth) setWidth(parseInt(savedWidth, 10));
  }, []);

  // Handle resizing
  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = Math.min(Math.max(e.clientX, 100), 400);
      setWidth(newWidth);
      localStorage.setItem("sidebarWidth", newWidth.toString());
    };

    const stopResizing = () => setIsResizing(false);

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", stopResizing);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing]);

  return (
    <aside
      ref={sidebarRef}
      style={{ width }}
      className="relative min-h-screen flex flex-col border-r 
                 border-slate-200 dark:border-slate-800 
                 bg-gradient-to-b from-white to-slate-50 
                 dark:from-slate-950 dark:to-slate-900 
                 shadow-sm select-none transition-[width] duration-200 ease-in-out"
    >
      {/* ---------- Top Section (Logo + Navigation) ---------- */}
      <div className="flex-1">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center justify-center py-6 border-b border-slate-200/60 dark:border-slate-800/60">
          <Image
            src="/neoshark_no_bg.png"
            alt="NeoShark"
            width={55}
            height={55}
            className="opacity-90 hover:opacity-300 cursor-pointer hover:scale-110 transition"
          />
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 py-6">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`group flex flex-col items-center gap-3  py-2.5  font-medium text-[15px] transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-slate-800/60 to-slate-700 text-white shadow-sm"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/60"
                }`}
              >
                <Icon
                  size={28}
                  className={`${
                    isActive
                      ? "text-white"
                      : "text-slate-500 dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400"
                  } transition-colors`}
                />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ---------- Bottom Section (Sign Out) ---------- */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 w-full px-4 py-2.5  text-[15px] font-medium text-red-600 
                     hover:bg-red-50 dark:hover:bg-red-950 transition-all"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>

      {/* ---------- Resize Handle ---------- */}
      <div
        onMouseDown={startResizing}
        className={`absolute top-0 right-0 w-1 cursor-col-resize h-full bg-transparent ${
          isResizing ? "bg-blue-500/30" : "hover:bg-blue-500/10"
        } transition`}
      />
    </aside>
  );
}
