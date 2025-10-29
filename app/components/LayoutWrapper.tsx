"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideGlobalUI = pathname.startsWith("/dashboard");

  return (
    <>
      {!hideGlobalUI && <Navbar />}
      <main className="min-h-screen">{children}</main>
      {!hideGlobalUI && <Footer />}
    </>
  );
}
