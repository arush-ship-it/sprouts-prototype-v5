import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  AlertCircle,
  Bot,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Award } from
"lucide-react";

const approvals = [
{
  id: 1,
  type: "stage_move",
  agentName: "Resume Screening Agent",
  description: "3 candidates moved to Interview stage",
  candidates: [
  {
    id: 1,
    name: "Maya Johnson",
    title: "Senior Product Designer",
    location: "San Francisco, CA",
    experience: "8 years",
    education: "Stanford - MS in Design",
    skills: ["Figma", "Design Systems", "User Research"],
    score: 92,
    reason: "Strong portfolio and extensive experience with design systems"
  },
  {
    id: 2,
    name: "Alex Chen",
    title: "Product Designer",
    location: "New York, NY",
    experience: "5 years",
    education: "MIT - BS in Computer Science",
    skills: ["Sketch", "Prototyping", "UI/UX"],
    score: 78,
    reason: "Good technical background, portfolio shows solid work"
  },
  {
    id: 3,
    name: "Sarah Mitchell",
    title: "UX Designer",
    location: "Austin, TX",
    experience: "6 years",
    education: "UC Berkeley - BA in Design",
    skills: ["Adobe XD", "User Testing", "Wireframing"],
    score: 85,
    reason: "Strong user research skills and diverse project experience"
  }],

  timestamp: "1 hour ago"
},
{
  id: 2,
  type: "auto_reject",
  agentName: "Pipeline Movement Agent",
  description: "5 candidates ready to advance - needs approval",
  candidates: [
  {
    id: 4,
    name: "James Park",
    title: "Senior Software Engineer",
    location: "Seattle, WA",
    experience: "10 years",
    education: "Carnegie Mellon - MS in CS",
    skills: ["React", "Node.js", "System Design"],
    score: 95,
    reason: "Exceptional technical skills and leadership experience"
  },
  {
    id: 5,
    name: "Priya Sharma",
    title: "Full Stack Developer",
    location: "Remote",
    experience: "7 years",
    education: "Stanford - BS in CS",
    skills: ["Python", "AWS", "Microservices"],
    score: 91,
    reason: "Strong full-stack capabilities and cloud expertise"
  }],

  timestamp: "3 hours ago"
}];


export default function ActivityApprovalModal({ isOpen, onClose }) {
  const [selectedApproval, setSelectedApproval] = useState(approvals[0]);
  const [viewMode, setViewMode] = useState("review"); // "review", "list", "cards"
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [decisions, setDecisions] = useState({});

  const handleSelectApproval = (approval) => {
    setSelectedApproval(approval);
    setCurrentCandidateIndex(0);
  };

  const handleDecision = (candidateId, decision) => {
    setDecisions((prev) => ({ ...prev, [candidateId]: decision }));
  };

  const handleNext = () => {
    if (currentCandidateIndex < selectedApproval.candidates.length - 1) {
      setCurrentCandidateIndex(currentCandidateIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentCandidateIndex > 0) {
      setCurrentCandidateIndex(currentCandidateIndex - 1);
    }
  };

  const handleComplete = () => {
    // Process decisions
    onClose();
    setSelectedApproval(null);
    setDecisions({});
  };

  const currentCandidate = selectedApproval?.candidates[currentCandidateIndex];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background p-6 rounded-xl fixed left-[50%] top-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%] gap-4 border shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg max-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Activity Approvals</DialogTitle>
        </DialogHeader>

        {/* Two Column Layout */}
        <div className="flex-1 overflow-hidden flex gap-4">
            {/* Left Column: Agent List */}
            <div className="w-96 overflow-y-auto">
              <div className="space-y-3">
                {approvals.map((approval) =>
              <button
                key={approval.id}
                onClick={() => handleSelectApproval(approval)}
                className={`w-full p-3 rounded-lg text-left transition-all border-2 ${
                selectedApproval.id === approval.id ?
                "border-indigo-500 bg-indigo-50" :
                "border-gray-200 bg-white hover:border-indigo-200"}`
                }>

                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-orange-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[13px] font-semibold text-gray-900 truncate">
                          {approval.agentName}
                        </h3>
                        <p className="text-[11px] text-gray-600 mt-0.5">
                          {approval.description}
                        </p>
                        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 mt-1.5 text-[10px]">
                          {approval.candidates.length} candidates
                        </Badge>
                      </div>
                    </div>
                  </button>
              )}
              </div>
            </div>

            {/* Right Column: Candidate View */}
            <div className="flex-1 flex flex-col overflow-hidden border-l border-gray-200 pl-4">
              {/* Header with View Mode Toggles */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                <div>
                  <h3 className="text-[14px] font-semibold text-gray-900">
                    {selectedApproval.agentName}
                  </h3>
                  <p className="text-[12px] text-gray-500">
                    {selectedApproval.candidates.length} candidates to review
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                  variant={viewMode === "review" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("review")}
                  className="h-8">

                    Review Mode
                  </Button>
                  <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8">

                    Table Mode
                  </Button>
                  <Button
                  variant={viewMode === "cards" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("cards")}
                  className="h-8">

                    Cards
                  </Button>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto">
                {viewMode === "review" && currentCandidate &&
              <ReviewModeContent
                candidate={currentCandidate}
                index={currentCandidateIndex}
                total={selectedApproval.candidates.length}
                decisions={decisions}
                onDecision={handleDecision}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onComplete={handleComplete} />

              }

                {viewMode === "list" &&
              <ListModeContent
                candidates={selectedApproval.candidates}
                decisions={decisions}
                onDecision={handleDecision}
                onComplete={handleComplete} />

              }

                {viewMode === "cards" &&
              <CardsModeContent
                candidates={selectedApproval.candidates}
                decisions={decisions}
                onDecision={handleDecision}
                onComplete={handleComplete} />

              }
              </div>
            </div>
          </div>
      </DialogContent>
    </Dialog>);

}

function ReviewModeContent({
  candidate,
  index,
  total,
  decisions,
  onDecision,
  onNext,
  onPrevious,
  onComplete
}) {
  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, idx) =>
        <div
          key={idx}
          className={`h-1 flex-1 rounded-full ${
          idx <= index ? "bg-indigo-600" : "bg-gray-200"}`
          } />

        )}
      </div>

      {/* Candidate Card */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-indigo-100 text-indigo-700 text-[18px] font-semibold">
              {candidate.name.
              split(" ").
              map((n) => n[0]).
              join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-[18px] font-semibold text-gray-900">
                  {candidate.name}
                </h3>
                <p className="text-[14px] text-gray-600">{candidate.title}</p>
              </div>
              <div className="text-right">
                <div className="text-[24px] font-bold text-indigo-600">
                  {candidate.score}
                </div>
                <p className="text-[11px] text-gray-500">AI Score</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary" className="text-[11px]">
                <MapPin className="w-3 h-3 mr-1" />
                {candidate.location}
              </Badge>
              <Badge variant="secondary" className="text-[11px]">
                <Briefcase className="w-3 h-3 mr-1" />
                {candidate.experience}
              </Badge>
              <Badge variant="secondary" className="text-[11px]">
                <GraduationCap className="w-3 h-3 mr-1" />
                {candidate.education}
              </Badge>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-[13px] font-semibold text-gray-900 mb-2">Skills</h4>
          <div className="flex flex-wrap gap-1.5">
            {candidate.skills.map((skill, idx) =>
            <Badge key={idx} className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">
                {skill}
              </Badge>
            )}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-100">
          <p className="text-[12px] text-gray-700">
            <strong className="text-indigo-700">AI Reasoning:</strong> {candidate.reason}
          </p>
        </div>

        {/* Decision */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-[13px] font-semibold text-gray-900 mb-3">Your Decision:</p>
          <div className="flex gap-3">
            <Button
              onClick={() => onDecision(candidate.id, "approve")}
              className={`flex-1 h-12 ${
              decisions[candidate.id] === "approve" ?
              "bg-emerald-600 hover:bg-emerald-700" :
              "bg-gray-100 text-gray-700 hover:bg-emerald-50"}`
              }>

              <ThumbsUp className="w-4 h-4 mr-2" />
              Approve
            </Button>
            <Button
              onClick={() => onDecision(candidate.id, "reject")}
              className={`flex-1 h-12 ${
              decisions[candidate.id] === "reject" ?
              "bg-red-600 hover:bg-red-700" :
              "bg-gray-100 text-gray-700 hover:bg-red-50"}`
              }>

              <ThumbsDown className="w-4 h-4 mr-2" />
              Reject
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <Button variant="outline" onClick={onPrevious} disabled={index === 0}>
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>
        {index < total - 1 ?
        <Button onClick={onNext}>
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button> :

        <Button onClick={onComplete}>Complete Review</Button>
        }
      </div>
    </div>);

}

function ListModeContent({ candidates, decisions, onDecision, onComplete }) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-[13px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Name</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Title</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Experience</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Score</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Decision</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, idx) =>
            <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">{candidate.name}</td>
                <td className="px-4 py-3 text-gray-600">{candidate.title}</td>
                <td className="px-4 py-3 text-gray-600">{candidate.experience}</td>
                <td className="px-4 py-3">
                  <Badge className="bg-indigo-100 text-indigo-700">
                    {candidate.score}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button
                    size="sm"
                    variant={
                    decisions[candidate.id] === "approve" ? "default" : "outline"
                    }
                    className="h-7 text-[11px] px-2"
                    onClick={() => onDecision(candidate.id, "approve")}>

                      Approve
                    </Button>
                    <Button
                    size="sm"
                    variant={
                    decisions[candidate.id] === "reject" ? "destructive" : "outline"
                    }
                    className="h-7 text-[11px] px-2"
                    onClick={() => onDecision(candidate.id, "reject")}>

                      Reject
                    </Button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Button onClick={onComplete} className="w-full">
        Complete Review
      </Button>
    </div>);

}

function CardsModeContent({ candidates, decisions, onDecision, onComplete }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {candidates.map((candidate, idx) =>
        <div key={idx} className="p-4 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition-all">
            <div className="flex items-start gap-3 mb-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-indigo-100 text-indigo-700 text-[14px] font-semibold">
                  {candidate.name.
                split(" ").
                map((n) => n[0]).
                join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="text-[13px] font-semibold text-gray-900 truncate">
                  {candidate.name}
                </h4>
                <p className="text-[11px] text-gray-600 truncate">{candidate.title}</p>
              </div>
              <div className="text-right">
                <div className="text-[16px] font-bold text-indigo-600">
                  {candidate.score}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
              size="sm"
              variant={
              decisions[candidate.id] === "approve" ? "default" : "outline"
              }
              className="flex-1 h-8 text-[11px]"
              onClick={() => onDecision(candidate.id, "approve")}>

                <ThumbsUp className="w-3 h-3 mr-1" />
                Approve
              </Button>
              <Button
              size="sm"
              variant={
              decisions[candidate.id] === "reject" ? "destructive" : "outline"
              }
              className="flex-1 h-8 text-[11px]"
              onClick={() => onDecision(candidate.id, "reject")}>

                <ThumbsDown className="w-3 h-3 mr-1" />
                Reject
              </Button>
            </div>
          </div>
        )}
      </div>
      <Button onClick={onComplete} className="w-full">
        Complete Review
      </Button>
    </div>);

}