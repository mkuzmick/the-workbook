import React from "react";
import { Vortex } from "@/components/ui/vortex";

export default function VortexDemoSecond() {
  return (
    <div className=" mx-auto rounded-md h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={120}
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      />
  
    </div>
  );
}