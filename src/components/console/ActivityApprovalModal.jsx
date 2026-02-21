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
  Award,
} from "lucide-react";

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
        reason: "Strong portfolio and extensive experience with design systems",
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
        reason: "Good technical background, portfolio shows solid work",
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
        reason: "Strong user research skills and diverse project experience",
      },
    ],
    timestamp: "1 hour ago",
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
        reason: "Exceptional technical skills and leadership experience",
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
        reason: "Strong full-stack capabilities and cloud expertise",
      },
    ],
    timestamp: "3 hours ago",
  },
];

export default function ActivityApprovalModal({ isOpen, onClose }) {
  const [selectedApproval, setSelectedApproval] = useState(null);
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Activity Approvals</DialogTitle>
        </DialogHeader>

        {/* Step 1: Select Agent Approval */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-[13px] text-gray-500">
              Select an agent approval to review candidates
            </p>
            <div className="space-y-3">
              {approvals.map((approval) => (
                <button
                  key={approval.id}
                  onClick={() => handleSelectApproval(approval)}
                  className="w-full p-4 rounded-xl bg-white border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                      <Bot className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-[14px] font-semibold text-gray-900">
                            {approval.agentName}
                          </h3>
                          <p className="text-[12px] text-gray-600 mt-0.5">
                            {approval.description}
                          </p>
                        </div>
                        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                          {approval.candidates.length} candidates
                        </Badge>
                      </div>
                      <p className="text-[11px] text-gray-400">{approval.timestamp}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Review Candidates Carousel */}
        {step === 2 && selectedApproval && currentCandidate && (
          <div className="space-y-4">
            {/* Progress */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[14px] font-semibold text-gray-900">
                  {selectedApproval.agentName}
                </h3>
                <p className="text-[12px] text-gray-500">
                  Candidate {currentCandidateIndex + 1} of {selectedApproval.candidates.length}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setStep(1)}>
                Back to List
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="flex gap-1">
              {selectedApproval.candidates.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 flex-1 rounded-full ${
                    idx <= currentCandidateIndex ? "bg-indigo-600" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            {/* Candidate Card */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200">
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-indigo-100 text-indigo-700 text-[18px] font-semibold">
                    {currentCandidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-[18px] font-semibold text-gray-900">
                    {currentCandidate.name}
                  </h3>
                  <p className="text-[14px] text-gray-600 mb-2">{currentCandidate.title}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-[11px]">
                      <MapPin className="w-3 h-3 mr-1" />
                      {currentCandidate.location}
                    </Badge>
                    <Badge variant="secondary" className="text-[11px]">
                      <Briefcase className="w-3 h-3 mr-1" />
                      {currentCandidate.experience}
                    </Badge>
                    <Badge variant="secondary" className="text-[11px]">
                      <GraduationCap className="w-3 h-3 mr-1" />
                      {currentCandidate.education}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[24px] font-bold text-indigo-600">
                    {currentCandidate.score}
                  </div>
                  <p className="text-[11px] text-gray-500">AI Score</p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-[13px] font-semibold text-gray-900 mb-2">Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {currentCandidate.skills.map((skill, idx) => (
                    <Badge key={idx} className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-100">
                <p className="text-[12px] text-gray-700">
                  <strong className="text-indigo-700">AI Reasoning:</strong> {currentCandidate.reason}
                </p>
              </div>

              {/* Decision */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-[13px] font-semibold text-gray-900 mb-3">Your Decision:</p>
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleDecision(currentCandidate.id, "approve")}
                    className={`flex-1 h-12 ${
                      decisions[currentCandidate.id] === "approve"
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-gray-100 text-gray-700 hover:bg-emerald-50"
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleDecision(currentCandidate.id, "reject")}
                    className={`flex-1 h-12 ${
                      decisions[currentCandidate.id] === "reject"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-gray-100 text-gray-700 hover:bg-red-50"
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentCandidateIndex === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              {currentCandidateIndex < selectedApproval.candidates.length - 1 ? (
                <Button onClick={handleNext}>
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button onClick={handleComplete}>Complete Review</Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}