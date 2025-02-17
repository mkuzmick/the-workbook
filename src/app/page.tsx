import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import SplashCursorZibb from "@/components/reactbits/SplashCursor/SplashCursorZibb";

export default function Home() {
  return (
    <div>
      <div className="relative w-full h-screen overflow-hidden pointer-events-auto" >
        <div className="absolute inset-0 bg-black z-0" />
        <div className="absolute inset-0 z-10">
          <SplashCursorZibb />
        </div>
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-8xl font-black drop-shadow-deep">The Workbook</h1>
          <p className="text-base md:text-lg mt-4 text-center">
            the place to work on the frontend
          </p>
          <div className="absolute bottom-8">
            <a
              href="#links"
              className="text-white animate-bounce transition-transform duration-2000 hover:scale-110 flex justify-center items-center"
            >
              <BsChevronDown size={32} className="transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
      <section
        id="links"
        className="relative z-30 py-16 text-white cursor-auto bg-black/30 backdrop-blur-xl font-black text-3xl min-h-screen"
      >
        <nav className="flex flex-col items-center gap-4">
          <Link href="/everything" className="text-white hover:underline">
            everything
          </Link>
          <Link href="/tests" className="text-white hover:underline">
            tests
          </Link>
          <Link href="/zk" className="text-white hover:underline">
            zk
          </Link>
          <Link href="/docs" className="text-white hover:underline">
            docs
          </Link>
          <Link href="/openai" className="text-white hover:underline">
            openai
          </Link>
          <Link href="/anthropic" className="text-white hover:underline">
            anthropic
          </Link>
          <Link href="/gemini" className="text-white hover:underline">
            gemini
          </Link>
          <Link href="/bard" className="text-white hover:underline">
            bard
          </Link>
          <Link href="/palm" className="text-white hover:underline">
            palm
          </Link>
          <Link href="/cohere" className="text-white hover:underline">
            cohere
          </Link>
        </nav>
      </section>
      <div className="min-h-screen">
      </div>
    </div>
  );
}
