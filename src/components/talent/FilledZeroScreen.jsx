import React from "react";
import { Globe } from "lucide-react";

export default function FilledZeroScreen() {
  return (
    <div className="mb-20 pt-48 pr-8 pb-64 pl-8 text-center flex flex-col items-center justify-center h-full w-full">
      <div className="bg-gray-300 mb-5 rounded-full w-16 h-16 flex items-center justify-center">
        <Globe className="lucide lucide-globe w-8 h-8 text-white" />
      </div>
      <h2 className="text-gray-400 mb-2 text-3xl font-medium">Search less, Discover more with SproutsAI</h2>
      <p className="text-gray-500 mx-48 pr-1 pb-5 pl-1 text-xs leading-relaxed max-w-l">Find the right talent faster with powerful search, advanced filtering, and intelligent matching so you can quickly identify, evaluate, and connect with candidates who truly fit your roles.

      </p>
    </div>);

}