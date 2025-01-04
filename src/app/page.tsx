import { WavyBackground } from "@/components/ui/wavy-background";


export default function Home() {
  return (
    
    <div className="min-h-screen flex flex-col justify-between">
      {/* Main Content */}
      
      <WavyBackground className="max-w-4xl mx-auto pb-40">
      <div className="flex flex-grow items-center justify-center">
        <h1 className="text-8xl font-black inter-var text-white">The Workbook</h1>
      </div>

      <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        the place to get some work done in 2025
      </p>
    </WavyBackground>

      {/* Footer */}
      <footer className="py-4 bg-gray-200 dark:bg-gray-800">
        <div className="flex justify-center gap-8">
          <a
            href="/editor"
            className="text-lg font-medium text-blue-600 hover:underline"
          >
            Editor
          </a>
          <a
            href="/tests"
            className="text-lg font-medium text-blue-600 hover:underline"
          >
            Tests
          </a>
        </div>
      </footer>
    </div>
  );
}
