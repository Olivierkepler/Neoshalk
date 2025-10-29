"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen">
      {/* LEFT SIDE — SIGN-IN FORM */}
      <section className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome to <span className="text-blue-600">Neoshark</span>
          </h1>
          <p className="text-slate-600 text-lg dark:text-slate-400 mb-8">
            Get started — it's free. No credit card needed.
          </p>

          {/* Google Sign In */}
          <button
            onClick={() => signIn("google")}
            className="flex items-center cursor-pointer justify-center w-full py-3 border border-slate-300 rounded-md hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 transition"
          >
            <Image
              src="/Googlelogo.png"
              alt="Google"
              width={30}
              height={30}
              className="mr-2"
            />
            Continue with Google
          </button>

          <p className="text-sm text-slate-600 mt-8 text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Log in
            </a>
          </p>
        </div>
      </section>

      {/* RIGHT SIDE — ILLUSTRATION */}
      <section className="hidden lg:flex w-1/2 bg-blur-sm  dark:bg-slate-900 justify-center items-center relative overflow-hidden">
        <div className="shadow-2xl  overflow-hidden p-6 rounded-full"> 
          <Image
            src="/neoshark_no_bg.png"
            alt="Neoshark Sign-in Visual"
            width={480}
            height={480}
            className="relative z-10 drop-shadow-2xl"
          />
        </div>
            
      </section>
    </main>
  );
}
