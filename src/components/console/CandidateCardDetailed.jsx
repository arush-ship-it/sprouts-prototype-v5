import React, { useState } from "react";
import { CheckCircle2, XCircle, ExternalLink, Mail, MessageSquare, Phone, Linkedin, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, StickyNote, Briefcase, GraduationCap, Award, Target, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
"@/components/ui/select";

export default function CandidateCardDetailed({ candidate, isPipeline = false, onClick }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedStage, setSelectedStage] = useState(candidate.stage || "screening");

  const scoreColor =
  candidate.score >= 75 ?
  "text-emerald-600 bg-emerald-50" :
  "text-gray-500 bg-gray-50";

  return (
    <div
      onClick={onClick} className="group flex flex-col gap-4 px-5 py-5 rounded-2xl bg-white hover:shadow-md transition-all duration-300 cursor-pointer">
      
      
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <img
            src={candidate.avatar}
            alt={candidate.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100" />
          
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
      <div className="flex items-center gap-4 pt-2">
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

      {/* Sequence & Actions */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 text-[12px]">
          <span className="text-gray-500">Sequence:</span>
          <span className="text-blue-600 font-medium">
            {candidate.sequence}
          </span>
          <ExternalLink className="w-3 h-3 text-blue-400" />
        </div>
        <div className="flex items-center gap-2">
          {isPipeline ?
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
              <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                <ThumbsUp className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                <ThumbsDown className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="outline" className="h-7 text-[11px]">
                <StickyNote className="w-3 h-3 mr-1" />
                Note
              </Button>
              <Button size="sm" variant="outline" className="h-7 text-[11px]">
                <Calendar className="w-3 h-3 mr-1" />
                Schedule
              </Button>
            </> :

          <>
              <Button size="sm" variant="outline" className="h-7 text-[11px]">
                <ThumbsUp className="w-3 h-3 mr-1" />
                Shortlist
              </Button>
              <Button size="sm" variant="outline" className="h-7 text-[11px]">
                <ThumbsDown className="w-3 h-3 mr-1" />
                Reject
              </Button>
              <Button size="sm" variant="outline" className="h-7 text-[11px]">
                <StickyNote className="w-3 h-3 mr-1" />
                Note
              </Button>
            </>
          }
          <Button
            size="sm"
            variant="ghost"
            className="h-7 text-[11px]"
            onClick={() => setIsExpanded(!isExpanded)}>
            
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Expanded View */}
      {isExpanded &&
      <div className="pt-4 border-t border-gray-100 space-y-4">
          {/* AI Fit Analysis */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-50 border border-blue-100">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-indigo-600" />
              <h4 className="text-[13px] font-semibold text-gray-900">AI Fit Analysis</h4>
            </div>
            <p className="text-[12px] text-gray-700 leading-relaxed mb-3">
              {candidate.name} is a strong match for this role with {candidate.score}% overall fit. Their experience at {candidate.company} demonstrates expertise in product design and user-centered approaches. Skills alignment is excellent with {candidate.skillsMatch}, particularly in Figma, design systems, and prototyping.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-[hsl(var(--background))] text-[10px] px-2.5 py-0.5 font-semibold rounded-md inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80">Design Leadership</Badge>
              <Badge variant="secondary" className="bg-[hsl(var(--background))] text-[10px] px-2.5 py-0.5 font-semibold rounded-md inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80">User Research</Badge>
              <Badge variant="secondary" className="bg-[hsl(var(--background))] text-[10px] px-2.5 py-0.5 font-semibold rounded-md inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80">Team Collaboration</Badge>
            </div>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Skills Fit */}
            <div className="p-4 rounded-xl bg-white">
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
            <div className="p-4 rounded-xl bg-white">
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
            <div className="p-4 rounded-xl bg-white">
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
            <div className="p-4 rounded-xl bg-white">
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
      }
    </div>);

}