import React from "react";
import { Globe } from "lucide-react";

export default function FilledZeroScreen() {
  return (
    <div className="mb-20 pt-40 pr-8 pb-64 pl-8 text-center flex flex-col items-center justify-center h-full w-full">
      <div className="bg-blue-100 mb-5 rounded-full w-32 h-32 flex items-center justify-center">
        <Globe className="lucide lucide-globe lucide lucide-globe w-16 h-16 text-white" />
      </div>
      <h2 className="text-gray-500 mb-2 text-3xl font-medium">Search Less, Discover More with SproutsAI</h2>
      <p className="text-gray-500 mx-48 pr-1 pb-5 pl-1 text-xs leading-relaxed max-w-l">Find the right talent faster with powerful search, advanced filtering, and intelligent matching so you can quickly identify, evaluate, and connect with candidates who truly fit your roles.

      </p>
    </div>);

}