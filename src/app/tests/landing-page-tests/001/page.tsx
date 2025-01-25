import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import SplashCursor from "@/components/reactbits/SplashCursor/SplashCursor";
export default function Home() {
    return (
      <div className="cursor-none">
        {/* Full-height hero container */}
        <div className="relative w-full h-screen overflow-hidden pointer-events-auto cursor-none" style={{ cursor: "none" }}>
          {/* 1) Solid black background layer */}
          <div className="absolute inset-0 bg-black z-0" />
  
          {/* 2) Fluid simulation above background, behind text */}
          <div className="absolute inset-0 z-10">
            <SplashCursor />
          </div>
  
          {/* 3) Hero text content on top */}
          <div className="relative z-20 flex flex-col items-center justify-center h-full text-white">
            <h1 className="text-8xl font-black">The Workbook</h1>
            <p className="text-base md:text-lg mt-4 text-center">
              the place to get some work done in 2025
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
          className="relative z-30 py-16 text-white border-t-white border-width-5 bg-black cursor-auto"
        >
          <nav className="flex flex-col items-center gap-4">
            <Link href="/about" className="text-blue-600 hover:underline">
              about
            </Link>
            <Link href="/tests" className="text-blue-600 hover:underline">
              tests
            </Link>
            <Link href="/zk" className="text-blue-600 hover:underline">
              zk
            </Link>
            <Link href="/docs" className="text-blue-600 hover:underline">
              docs
            </Link>
            <Link href="/openai" className="text-blue-600 hover:underline">
              openai
            </Link>
            <Link href="/anthropic" className="text-blue-600 hover:underline">
              anthropic
            </Link>
            <Link href="/gemini" className="text-blue-600 hover:underline">
              gemini
            </Link>
            <Link href="/bard" className="text-blue-600 hover:underline">
              bard
            </Link>
            <Link href="/palm" className="text-blue-600 hover:underline">
              palm
            </Link>
            <Link href="/cohere" className="text-blue-600 hover:underline">
              cohere
            </Link>
          </nav>
        </section>
  
        {/* Footer */}
        <footer className="py-4 bg-black text-white">
          <div className="flex justify-center gap-8">
            {/* Footer Links */}
          </div>
        </footer>
      </div>
    );
  }
  