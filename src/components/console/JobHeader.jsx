import React from "react";
import { MapPin, Clock, Briefcase, MoreHorizontal } from "lucide-react";

export default function JobHeader() {
  return (
    <div className="px-8 pt-8 pb-0">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-[22px] font-semibold text-gray-900 tracking-tight">
              Senior Product Designer
            </h1>
            <span className="px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
              Active
            </span>
          </div>
          <div className="flex items-center gap-5 mt-2.5 text-[13px] text-gray-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              Design
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              San Francisco, CA
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Posted 5 days ago
            </span>
          </div>
        </div>
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}