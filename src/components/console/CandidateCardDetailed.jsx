import React from "react";
import { CheckCircle2, XCircle, ExternalLink, Mail, MessageSquare, Phone, Linkedin } from "lucide-react";

export default function CandidateCardDetailed({ candidate }) {
  const scoreColor =
    candidate.score >= 75
      ? "text-emerald-600 bg-emerald-50"
      : "text-gray-500 bg-gray-50";

  return (
    <div className="group flex flex-col gap-4 px-5 py-5 rounded-2xl border border-gray-200 bg-white hover:shadow-md transition-all duration-300 cursor-pointer">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <img
            src={candidate.avatar}
            alt={candidate.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] font-semibold text-gray-900">
                {candidate.name}
              </h3>
              <span className={`px-2 py-0.5 text-[11px] font-bold rounded-md ${scoreColor}`}>
                Strong {candidate.score}%
              </span>
            </div>
            <p className="text-[13px] text-gray-500 mt-0.5">
              {candidate.title}{" "}
              <CheckCircle2 className="inline w-3 h-3 text-emerald-500" /> @{" "}
              {candidate.company}{" "}
              <CheckCircle2 className="inline w-3 h-3 text-emerald-500" />
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400">
            <ExternalLink className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-emerald-50 transition-colors text-emerald-600">
            <Linkedin className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-blue-50 transition-colors text-blue-600">
            <Mail className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-orange-50 transition-colors text-orange-500">
            <MessageSquare className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-violet-50 transition-colors text-violet-600">
            <Phone className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="flex items-center gap-1 text-[12.5px] text-gray-500">
        <span>
          {candidate.degree}{" "}
          <CheckCircle2 className="inline w-3 h-3 text-emerald-500" /> @{" "}
          {candidate.university}
        </span>
      </div>

      <div className="text-[12.5px] text-gray-500 flex items-center gap-1">
        <span>{candidate.location}</span>
        <CheckCircle2 className="inline w-3 h-3 text-emerald-500" />
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
        <div className="flex items-center gap-2 text-[12.5px]">
          <span className="text-gray-500">Experience:</span>
          <span className="font-semibold text-gray-900">
            {candidate.experience}
          </span>
          <XCircle className="w-3 h-3 text-red-400" />
        </div>
        <div className="flex items-center gap-2 text-[12.5px]">
          <span className="text-gray-500">Skills:</span>
          <span className="font-semibold text-gray-900">
            {candidate.skillsMatch}
          </span>
          <ExternalLink className="w-3 h-3 text-blue-400" />
        </div>
        <div className="flex items-center gap-2 text-[12.5px]">
          <span className="text-gray-500">Attributes:</span>
          <span className="font-semibold text-gray-900">
            {candidate.attributesMatch}
          </span>
        </div>
      </div>

      {/* Sequence */}
      <div className="flex items-center gap-2 text-[12px]">
        <span className="text-gray-500">Sequence:</span>
        <span className="text-blue-600 font-medium">
          {candidate.sequence}
        </span>
        <ExternalLink className="w-3 h-3 text-blue-400" />
      </div>
    </div>
  );
}