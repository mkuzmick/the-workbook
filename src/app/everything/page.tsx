import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
// import SplashCursor from "@/components/reactbits/SplashCursor/SplashCursor";
// import SplashCursor01 from "@/components/reactbits/SplashCursor/SplashCursor01";
import SplashCursorZibb from "@/components/reactbits/SplashCursor/SplashCursorZibb";
import AllPages from "@/components/tools/links/AllPages";

export default function Home() {
  return (
    <div>
      {/* Full-height hero container */}
      <div className="relative w-full h-screen overflow-hidden pointer-events-auto" >
        {/* 1) Solid black background layer */}
        <div className="absolute inset-0 bg-black z-0" />

        {/* 2) Fluid simulation above background, behind text */}
        <div className="absolute inset-0 z-10">
          {/* <SplashCursor /> */}
          <SplashCursorZibb />
        </div>

        {/* 3) Hero text content on top */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-8xl font-black drop-shadow-deep">everything</h1>
          <p className="text-base md:text-lg mt-4 text-center">
            all the links below
          </p>
          {/* Scroll-down arrow */}
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

      {/* Links Section */}
      <section
        id="links"
        className="relative z-30 py-16 text-white cursor-auto bg-black/30 backdrop-blur-xl"
      >           <h2 className="text-3xl font-black text-center mb-4">Selected Links</h2>
        <nav className="flex flex-col items-center gap-4">
          <Link href="/about" className="text-white hover:underline">
            about
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
        <AllPages />
      </section>

      <div className="min-h-screen">

      </div>
    </div>
  );
}
