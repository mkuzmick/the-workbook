import Link from "next/link";
import { getStaticRoutes } from "@/lib/tools/getStaticRoutes";

export default function Home() {
  const routes = getStaticRoutes();

  return (
    <div>
      <section
        id="links"
        className="relative z-30 py-16 text-white border-t-slate-700 border-t-2 bg-black cursor-auto"
      >
        <h2 className="text-3xl font-black text-center mb-4">All Non-Dynamic Pages</h2>
        <nav className="flex flex-col items-center gap-4">
          {routes.map((route) => {
            // If route is "/", display "home". Otherwise, display the full path minus the leading slash
            const displayText = route === "/" ? "home" : route.slice(0);
            return (
              <Link key={route} href={route} className="text-white hover:underline">
                {displayText}
              </Link>
            );
          })}
        </nav>
      </section>
      {/* Other content */}
    </div>
  );
}
