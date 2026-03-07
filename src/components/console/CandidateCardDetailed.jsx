import React, { useState } from "react";
import { CheckCircle2, XCircle, ExternalLink, Mail, MessageSquare, Phone, Linkedin, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, StickyNote, Briefcase, GraduationCap, Award, Target, Calendar, Star, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CandidateCardDetailed({ candidate, isPipeline = false, onClick }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedStage, setSelectedStage] = useState(candidate.stage || "screening");
  
  const scoreColor =
    candidate.score >= 90
      ? "text-emerald-600 bg-emerald-50 border-emerald-100"
      : candidate.score >= 75
      ? "text-amber-600 bg-amber-50 border-amber-100"
      : "text-gray-500 bg-gray-50 border-gray-200";

  return (
    <div 
      onClick={onClick}
      className="group flex flex-col gap-0 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 cursor-pointer"
    >
      {/* Main row — matches CandidateCard style */}
      <div className="flex items-center gap-5 px-5 py-4">
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
            <p className="text-[14px] font-semibold text-gray-900 truncate">{candidate.name}</p>
            {candidate.starred && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
          </div>
          <p className="text-[12.5px] text-gray-400 mt-0.5 truncate">
            {candidate.title} · {candidate.company}
          </p>
        </div>

        {/* Stage */}
        <span className="hidden sm:block px-3 py-1 text-[11px] font-semibold rounded-full bg-violet-50 text-violet-600 border border-violet-100 uppercase tracking-wider">
          {candidate.stage}
        </span>

        {/* Score */}
        <div className={`px-2.5 py-1 rounded-lg text-[13px] font-bold border ${scoreColor}`}>
          {candidate.score}
        </div>

        {/* Expand / More */}
        <button
          className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-all text-gray-400"
          onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded actions row */}
      {isExpanded && (
        <div className="px-5 pb-3 flex items-center gap-2 border-t border-gray-50 pt-3">
          {isPipeline ? (
            <>
              <Select value={selectedStage} onValueChange={setSelectedStage}>
                <SelectTrigger className="h-7 w-[140px] text-[11px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="screening" className="text-[11px]">Screening</SelectItem>
                  <SelectItem value="assessment" className="text-[11px]">Assessment</SelectItem>
                  <SelectItem value="interview" className="text-[11px]">Interview</SelectItem>
                  <SelectItem value="final" className="text-[11px]">Final Round</SelectItem>
                  <SelectItem value="offer" className="text-[11px]">Offer</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" variant="outline" className="h-7 w-7 p-0"><ThumbsUp className="w-3 h-3" /></Button>
              <Button size="sm" variant="outline" className="h-7 w-7 p-0"><ThumbsDown className="w-3 h-3" /></Button>
              <Button size="sm" variant="outline" className="h-7 text-[11px]"><StickyNote className="w-3 h-3 mr-1" />Note</Button>
              <Button size="sm" variant="outline" className="h-7 text-[11px]"><Calendar className="w-3 h-3 mr-1" />Schedule</Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="outline" className="h-7 text-[11px]"><ThumbsUp className="w-3 h-3 mr-1" />Shortlist</Button>
              <Button size="sm" variant="outline" className="h-7 text-[11px]"><ThumbsDown className="w-3 h-3 mr-1" />Reject</Button>
              <Button size="sm" variant="outline" className="h-7 text-[11px]"><StickyNote className="w-3 h-3 mr-1" />Note</Button>
            </>
          )}
        </div>
      )}


      {/* Expanded Detail View */}
      {isExpanded && (
        <div className="px-5 pb-5 pt-4 border-t border-gray-100 space-y-4">
          {/* AI Fit Analysis */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-indigo-600" />
              <h4 className="text-[13px] font-semibold text-gray-900">AI Fit Analysis</h4>
            </div>
            <p className="text-[12px] text-gray-700 leading-relaxed mb-3">
              {candidate.name} is a strong match for this role with {candidate.score}% overall fit. Their experience at {candidate.company} demonstrates expertise in product design and user-centered approaches. Skills alignment is excellent with {candidate.skillsMatch}, particularly in Figma, design systems, and prototyping.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-[10px]">Design Leadership</Badge>
              <Badge variant="secondary" className="text-[10px]">User Research</Badge>
              <Badge variant="secondary" className="text-[10px]">Team Collaboration</Badge>
            </div>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Skills Fit */}
            <div className="p-4 rounded-xl bg-white border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-indigo-600" />
                <h4 className="text-[13px] font-semibold text-gray-900">Skills Fit</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-600">Figma</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-600">Design Systems</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-600">User Research</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-600">Prototyping</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-600">React (Basic)</span>
                  <XCircle className="w-3.5 h-3.5 text-red-400" />
                </div>
              </div>
            </div>

            {/* Work Experience */}
            <div className="p-4 rounded-xl bg-white border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="w-4 h-4 text-violet-600" />
                <h4 className="text-[13px] font-semibold text-gray-900">Work Experience</h4>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-[12px] font-semibold text-gray-900">{candidate.title}</p>
                  <p className="text-[11px] text-gray-500">{candidate.company} • 2022 - Present</p>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-gray-900">Product Designer</p>
                  <p className="text-[11px] text-gray-500">Adobe • 2020 - 2022</p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="p-4 rounded-xl bg-white border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <h4 className="text-[13px] font-semibold text-gray-900">Education</h4>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-[12px] font-semibold text-gray-900">{candidate.degree}</p>
                  <p className="text-[11px] text-gray-500">{candidate.university}</p>
                  <p className="text-[11px] text-gray-400">2016 - 2020</p>
                </div>
              </div>
            </div>

            {/* Attribute Match */}
            <div className="p-4 rounded-xl bg-white border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-orange-600" />
                <h4 className="text-[13px] font-semibold text-gray-900">Attribute Match</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-600">Location</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-600">Experience Level</span>
                  <XCircle className="w-3.5 h-3.5 text-red-400" />
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-600">Industry</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-600">Team Size</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}