import React from "react";
import { Star, MoreHorizontal } from "lucide-react";

export default function CandidateCard({ candidate }) {
  const scoreColor =
    candidate.score >= 90
      ? "text-emerald-600 bg-emerald-50 border-emerald-100"
      : candidate.score >= 75
      ? "text-amber-600 bg-amber-50 border-amber-100"
      : "text-gray-500 bg-gray-50 border-gray-200";

  return (
    <div className="group flex items-center gap-5 px-5 py-4 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 cursor-pointer">
      {/* Avatar */}
      <div className="relative shrink-0">
        <img
          src={candidate.avatar}
          alt={candidate.name}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-gray-100"
        />
        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-[14px] font-semibold text-gray-900 truncate">
            {candidate.name}
          </p>
          {candidate.starred && (
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          )}
        </div>
        <p className="text-[12.5px] text-gray-400 mt-0.5 truncate">
          {candidate.title} · {candidate.company}
        </p>
      </div>

      {/* Stage */}
      <div className="hidden sm:block">
        <span className="px-3 py-1 text-[11px] font-semibold rounded-full bg-violet-50 text-violet-600 border border-violet-100 uppercase tracking-wider">
          {candidate.stage}
        </span>
      </div>

      {/* Score */}
      <div
        className={`px-2.5 py-1 rounded-lg text-[13px] font-bold border ${scoreColor}`}
      >
        {candidate.score}
      </div>

      {/* Actions */}
      <button className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-all text-gray-400">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>
  );
}