import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import SplashCursor from "@/components/reactbits/SplashCursor/SplashCursor";
import SplashCursor01 from "@/components/reactbits/SplashCursor/SplashCursor01";
import SplashCursorZibb from "@/components/reactbits/SplashCursor/SplashCursorZibb";
import AllPages from "@/components/tools/links/AllPages";

const SamplePreBlock = () => {
  const chartColors = {
    chart: {
      '1': 'hsl(var(--chart-1))',
      '2': 'hsl(var(--chart-2))',
      '3': 'hsl(var(--chart-3))',
      '4': 'hsl(var(--chart-4))',
      '5': 'hsl(var(--chart-5))',
    },
  };

  return (
    <div className="relative bg-black/30 z-30 backdrop-blur-xl">
       <pre>{JSON.stringify(chartColors, null, 4)}</pre>;
    </div>
  )

 
}



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
            <h1 className="text-8xl font-black drop-shadow-deep">The Workbook</h1>
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
  className="relative z-30 py-16 text-white border-t-slate-700 border-t-2 bg-black cursor-auto"
>
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
</section>
<SamplePreBlock />
<AllPages />

  
        {/* Footer */}
        <footer className="py-4 bg-black text-white">
          <div className="flex justify-center gap-8">
            {/* Footer Links */}
            <h3>footer later</h3>
          </div>
        </footer>
        <div className="min-h-screen">

        </div>
      </div>
    );
  }
  