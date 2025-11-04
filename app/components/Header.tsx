import Link from "next/link";
import InputForm from "./InputForm";
import Image from "next/image";
import NeosharkBackground from "./NeosharkBackground";

export default function Header() {
  return (
    <main className=" flex font-logo flex-col items-center justify-center max-w-4xl mx-auto">
    <NeosharkBackground />
 
        <h1 className="text-7xl  text-center">Intelligent </h1>
        <p className="mt-8 text-center px-4 leading-relaxed text-slate-600  mx-auto max-w-2xl text-2xl">
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      
        </p>

<div className="flex gap-4 pt-20 font-logo text-center justify-center items-center text-2xl">
<button className="bg-slate-800 text-white px-8 py-4 rounded-4xl font-semibold hover:bg-black transition">
  <Link href="/builder">
   <span className="flex items-center gap-2"> <Image src="/neoshark_no_bg.png" alt="Get Started" width={40} height={40} /> Get Started</span>
  </Link>
</button>

<button className="bg-white text-slate-800 px-8 py-4 rounded-4xl font-semibold hover:bg-slate-200 transition">
  <Link href="/builder">
    Learn More
  </Link>
</button>
</div>

      {/* <div className="flex pt-10 justify-center">
      <Image src="/neoshark_no_bg.png" alt="Shark" width={400} height={400} />
      </div> */}
    </main>
  );
}