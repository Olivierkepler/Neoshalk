"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen">
      {/* LEFT SIDE — LOGIN FORM */}
      <section className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome back to <span className="text-blue-600">Neoshark</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Sign in to continue your journey.
          </p>

          {/* Google Sign In */}
          <button
            onClick={() => signIn("google")}
            className="flex items-center justify-center w-full py-3 border border-slate-300 rounded-md hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 transition"
          >
            <Image
              src="/google-icon.svg"
              alt="Google"
              width={20}
              height={20}
              className="mr-2"
            />
            Continue with Google
          </button>

          <p className="text-sm text-slate-600 mt-8 text-center">
            New to Neoshark?{" "}
            <a
              href="/signin"
              className="text-blue-600 hover:underline font-medium"
            >
              Create an account
            </a>
          </p>
        </div>
      </section>

      {/* RIGHT SIDE — VISUAL */}
      <section className="hidden lg:flex w-1/2 bg-blue-50 dark:bg-slate-900 justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/60 to-blue-200/20 dark:from-slate-800/80 dark:to-slate-950/80 backdrop-blur-3xl" />
        <Image
          src="/images/neoshark-login-visual.png"
          alt="Neoshark Login Visual"
          width={480}
          height={480}
          className="relative z-10 drop-shadow-2xl"
        />
      </section>
    </main>
  );
}
