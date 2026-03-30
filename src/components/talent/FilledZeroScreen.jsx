import React from "react";
import { Globe } from "lucide-react";

export default function FilledZeroScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-24 text-center px-8">
      <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center mb-5">
        <Globe className="lucide lucide-globe w-8 h-8 text-white" />
      </div>
      <h2 className="text-gray-800 mb-2 text-2xl font-medium">More than 500 Million+ Profiles to Choose From</h2>
      <p className="text-[13px] text-gray-400 max-w-xs leading-relaxed">
        No active sourcing or candidate activity. This position has been marked as filled and is no longer accepting candidates.
      </p>
    </div>);

}