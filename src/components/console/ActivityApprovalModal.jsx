import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
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
  Award } from "lucide-react";

const approvals = [
{
  id: 1,
  type: "stage_move",
  agentName: "Resume Screening Agent",
  description: "3 candidates moved to Interview stage",
  fromStage: "Applied",
  toStage: "Interview",
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
      <DialogContent className="bg-background px-12 py-12 rounded-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%] gap-4 border shadow-lg duration-200 sm:rounded-lg max-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Activity Approvals</DialogTitle>
        </DialogHeader>

        {/* Two Column Layout */}
        <div className="flex-1 overflow-hidden flex gap-6">
            {/* Left Column: Agent List */}
            <div className="w-96 overflow-y-auto pr-4">
              <div className="space-y-2">
                {approvals.map((approval, idx) =>
              <motion.button
                key={approval.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => handleSelectApproval(approval)}
                className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                selectedApproval.id === approval.id ?
                "border border-indigo-300 bg-indigo-50/80 shadow-sm" :
                "border border-gray-200 bg-white hover:border-indigo-200 hover:bg-indigo-50/30"}`
                }>

                    <div className="flex items-start gap-3">
                      


                      <div className="flex-1 min-w-0">
                        <h3 className="text-[13px] font-semibold text-gray-900 truncate leading-snug">
                          {approval.agentName}
                        </h3>
                        <p className="text-[11px] text-gray-500 mt-1">
                          {approval.description}
                        </p>
                        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200/60 mt-2 text-[10px] font-medium">
                            {approval.candidates.length} candidates
                          </Badge>
                          <Button variant="ghost" size="sm" className="mt-3 h-7 text-[11px] text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50/50 -ml-2 px-2">
                            View Full Activity
                          </Button>
                        </div>
                        </div>
                        </motion.button>
              )}
              </div>
            </div>

            {/* Right Column: Candidate View */}
            <div className="flex-1 flex flex-col overflow-hidden border-l border-gray-100 pl-6">
              {/* Header with View Mode Toggles */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900 leading-snug">
                    {selectedApproval.agentName}
                  </h3>
                  <p className="text-[12px] text-gray-500 mt-1.5">
                    {selectedApproval.candidates.length} candidates to review
                  </p>
                </div>
                <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                  <Button
                  variant={viewMode === "review" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("review")}
                  className="h-8 text-[12px]">
                    Review
                  </Button>
                  <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")} className="bg-transparent text-[12px] px-3 font-medium rounded-md hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow hover:bg-primary/90 h-8">

                    Table
                  </Button>
                  <Button
                  variant={viewMode === "cards" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("cards")}
                  className="h-8 text-[12px]">
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
       <div className="flex gap-1.5">
         {Array.from({ length: total }).map((_, idx) =>
        <motion.div
          key={idx}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: idx * 0.05 }}
          className={`h-1.5 flex-1 rounded-full origin-left transition-colors duration-300 ${
          idx <= index ? "bg-indigo-600" : "bg-gray-200"}`
          } />

        )}
       </div>

      {/* Candidate Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-6 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm">
        <div className="flex items-start gap-4 mb-5">
          <Avatar className="w-16 h-16 ring-2 ring-indigo-100">
            <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-700 text-[16px] font-semibold">
              {candidate.name.
              split(" ").
              map((n) => n[0]).
              join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-[16px] font-bold text-gray-900">
                  {candidate.name}
                </h3>
                <p className="text-[12px] text-gray-600 mt-0.5">{candidate.title}</p>
              </div>
              <div className="text-right bg-gradient-to-br from-indigo-50 to-indigo-100 px-2.5 py-1.5 rounded-lg">
                <div className="text-[18px] font-bold text-indigo-600">
                  {candidate.score}
                </div>
                <p className="text-[9px] text-indigo-600 font-semibold">Score</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="outline" className="text-[11px] font-medium bg-gray-50">
                <MapPin className="w-3 h-3 mr-1" />
                {candidate.location}
              </Badge>
              <Badge variant="outline" className="text-[11px] font-medium bg-gray-50">
                <Briefcase className="w-3 h-3 mr-1" />
                {candidate.experience}
              </Badge>
              <Badge variant="outline" className="text-[11px] font-medium bg-gray-50">
                <GraduationCap className="w-3 h-3 mr-1" />
                {candidate.education}
              </Badge>
            </div>
          </div>
        </div>

        <div className="mb-4 pb-4 border-b border-gray-100">
           <h4 className="text-[11px] font-bold text-gray-900 mb-2 uppercase tracking-wide">Skills</h4>
           <div className="flex flex-wrap gap-1.5">
             {candidate.skills.map((skill, idx) =>
            <Badge key={idx} className="text-[9px] font-medium bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 transition-colors">
                 {skill}
               </Badge>
            )}
           </div>
         </div>

         <div className="p-3 rounded-lg bg-gradient-to-r from-indigo-50 to-indigo-50/50 border border-indigo-100/50 mb-4">
           <p className="text-[11px] text-gray-700 leading-relaxed">
             <strong className="text-indigo-700 font-semibold">AI:</strong> <span className="text-gray-600">{candidate.reason}</span>
           </p>
         </div>

        {/* Decision */}
        <div>
          <p className="text-[11px] font-bold text-gray-900 mb-3 uppercase tracking-wide">Decision</p>
          <div className="flex gap-2">
            <Button
              onClick={() => onDecision(candidate.id, "approve")}
              className={`flex-1 h-9 font-medium text-[12px] transition-all duration-200 ${
              decisions[candidate.id] === "approve" ?
              "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm" :
              "bg-gray-100 text-gray-700 hover:bg-emerald-50 border border-gray-200"}`
              }>

              <ThumbsUp className="w-3 h-3 mr-1.5" />
              Approve
            </Button>
            <Button
              onClick={() => onDecision(candidate.id, "reject")}
              className={`flex-1 h-9 font-medium text-[12px] transition-all duration-200 ${
              decisions[candidate.id] === "reject" ?
              "bg-red-600 hover:bg-red-700 text-white shadow-sm" :
              "bg-gray-100 text-gray-700 hover:bg-red-50 border border-gray-200"}`
              }>

              <ThumbsDown className="w-3 h-3 mr-1.5" />
              Reject
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <Button variant="outline" onClick={onPrevious} disabled={index === 0} className="h-10">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        {index < total - 1 ?
        <Button onClick={onNext} className="h-10 font-semibold">
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button> :

        <Button onClick={onComplete} className="h-10 font-semibold bg-gradient-to-r from-emerald-600 to-emerald-600 hover:from-emerald-700 hover:to-emerald-700">Complete Review</Button>
        }
      </div>
    </div>);

}

function ListModeContent({ candidates, decisions, onDecision, onComplete }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-100 overflow-hidden bg-white">
        <table className="w-full text-[13px]">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-5 py-3 text-left font-semibold text-gray-700 uppercase tracking-wide text-[11px]">Name</th>
              <th className="px-5 py-3 text-left font-semibold text-gray-700 uppercase tracking-wide text-[11px]">Title</th>
              <th className="px-5 py-3 text-left font-semibold text-gray-700 uppercase tracking-wide text-[11px]">Experience</th>
              <th className="px-5 py-3 text-left font-semibold text-gray-700 uppercase tracking-wide text-[11px]">Score</th>
              <th className="px-5 py-3 text-left font-semibold text-gray-700 uppercase tracking-wide text-[11px]">Decision</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, idx) =>
            <tr key={idx} className="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors">
                <td className="px-5 py-3 font-medium text-gray-900">{candidate.name}</td>
                <td className="px-5 py-3 text-gray-600">{candidate.title}</td>
                <td className="px-5 py-3 text-gray-600">{candidate.experience}</td>
                <td className="px-5 py-3">
                  <Badge className="bg-indigo-100 text-indigo-700 font-semibold">
                    {candidate.score}
                  </Badge>
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <Button
                    size="sm"
                    variant={
                    decisions[candidate.id] === "approve" ? "default" : "outline"
                    }
                    className="h-8 text-[11px] px-3 font-medium transition-all"
                    onClick={() => onDecision(candidate.id, "approve")}>

                      Approve
                    </Button>
                    <Button
                    size="sm"
                    variant={
                    decisions[candidate.id] === "reject" ? "destructive" : "outline"
                    }
                    className="h-8 text-[11px] px-3 font-medium transition-all"
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
      <Button onClick={onComplete} className="w-full h-11 font-semibold bg-gradient-to-r from-emerald-600 to-emerald-600 hover:from-emerald-700 hover:to-emerald-700">
        Complete Review
      </Button>
      </div>);

}

function CardsModeContent({ candidates, decisions, onDecision, onComplete }) {
  return (
    <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      {candidates.map((candidate, idx) =>
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="p-5 rounded-xl border border-gray-100 bg-white hover:shadow-md hover:border-indigo-200 transition-all duration-200">
          <div className="flex items-start gap-3 mb-4">
            <Avatar className="w-12 h-12 ring-2 ring-indigo-50">
              <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-700 text-[14px] font-semibold">
                {candidate.name.
                split(" ").
                map((n) => n[0]).
                join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h4 className="text-[13px] font-bold text-gray-900 truncate">
                {candidate.name}
              </h4>
              <p className="text-[11px] text-gray-600 truncate mt-0.5">{candidate.title}</p>
            </div>
            <div className="text-right bg-indigo-50 px-2.5 py-1.5 rounded-lg">
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
              className="flex-1 h-8 text-[11px] font-medium transition-all"
              onClick={() => onDecision(candidate.id, "approve")}>

              <ThumbsUp className="w-3 h-3 mr-1" />
              Approve
            </Button>
            <Button
              size="sm"
              variant={
              decisions[candidate.id] === "reject" ? "destructive" : "outline"
              }
              className="flex-1 h-8 text-[11px] font-medium transition-all"
              onClick={() => onDecision(candidate.id, "reject")}>

              <ThumbsDown className="w-3 h-3 mr-1" />
              Reject
            </Button>
          </div>
        </motion.div>
        )}
    </div>
    <Button onClick={onComplete} className="w-full h-11 font-semibold bg-gradient-to-r from-emerald-600 to-emerald-600 hover:from-emerald-700 hover:to-emerald-700">
      Complete Review
    </Button>
    </div>);

}