import React, { useState } from "react";
import {
  CheckCircle2,
  Bot,
  AlertCircle,
  Clock,
  ArrowRight,
  Eye,
  Check,
  X,
  Maximize2,
  ChevronRight,
  FileText,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const approvals = [
  {
    id: 1,
    type: "stage_move",
    description: "3 candidates moved to Interview stage",
    candidates: ["Maya Johnson", "Alex Chen", "Sarah Mitchell"],
    timestamp: "1 hour ago",
    status: "pending",
  },
  {
    id: 2,
    type: "auto_reject",
    description: "5 candidates auto-rejected due to missing requirements",
    candidates: ["John Doe", "Jane Smith", "Mike Wilson", "Lisa Brown", "Tom Jones"],
    timestamp: "3 hours ago",
    status: "pending",
  },
];

const agents = [
  {
    id: 1,
    name: "Resume Screening Agent",
    status: "pending_approval",
    description: "Screened 12 candidates - awaiting approval",
    progress: 100,
    lastActivity: "2 minutes ago",
    decisionLog: [
      { time: "10:45 AM", action: "Analyzed resume for Maya Johnson", result: "Qualified - Strong match" },
      { time: "10:42 AM", action: "Analyzed resume for Alex Chen", result: "Qualified - Moderate match" },
      { time: "10:38 AM", action: "Analyzed resume for Sarah Mitchell", result: "Not qualified - Missing key skills" },
    ],
    candidatesPushed: [
      { id: 1, name: "Maya Johnson", decision: "Move to Interview", score: 92 },
      { id: 2, name: "Alex Chen", decision: "Move to Assessment", score: 78 },
      { id: 3, name: "Marcus Rashford", decision: "Move to Interview", score: 88 },
    ],
  },
  {
    id: 2,
    name: "Email Sequence Agent",
    status: "active",
    description: "Sending follow-up emails to 8 candidates",
    progress: 50,
    lastActivity: "5 minutes ago",
    decisionLog: [
      { time: "11:20 AM", action: "Sent follow-up to John Doe", result: "Email delivered" },
      { time: "11:15 AM", action: "Sent interview reminder to Jane Smith", result: "Email opened" },
    ],
    candidatesPushed: [],
  },
  {
    id: 3,
    name: "Skill Matching Agent",
    status: "completed",
    description: "Matched 23 candidates to job requirements",
    progress: 100,
    lastActivity: "1 hour ago",
    decisionLog: [
      { time: "9:30 AM", action: "Completed skill analysis batch", result: "23 profiles matched" },
      { time: "9:15 AM", action: "Started skill matching process", result: "Processing..." },
    ],
    candidatesPushed: [],
  },
  {
    id: 4,
    name: "Pipeline Movement Agent",
    status: "pending_approval",
    description: "5 candidates ready to advance - needs approval",
    progress: 100,
    lastActivity: "15 minutes ago",
    decisionLog: [
      { time: "11:05 AM", action: "Evaluated assessment scores", result: "5 candidates passed threshold" },
      { time: "11:00 AM", action: "Started pipeline review", result: "Analyzing candidates" },
    ],
    candidatesPushed: [
      { id: 4, name: "James Park", decision: "Move to Final Round", score: 95 },
      { id: 5, name: "Priya Sharma", decision: "Move to Final Round", score: 91 },
      { id: 6, name: "Daniel Wright", decision: "Move to Interview", score: 84 },
    ],
  },
];

const automations = [
  {
    id: 1,
    action: "Pipeline Movement",
    from: "Screening",
    to: "Assessment",
    candidates: ["James Park", "Priya Sharma"],
    reason: "Score threshold met (>85)",
    timestamp: "30 minutes ago",
    status: "pending_review",
  },
  {
    id: 2,
    action: "Auto-Qualification",
    from: "Applied",
    to: "Screening",
    candidates: ["Daniel Wright", "Lena Kim", "Marcus Rivera"],
    reason: "Required skills matched",
    timestamp: "1 hour ago",
    status: "pending_review",
  },
];

function ApprovalCard({ approval }) {
  return (
    <div className="p-5 rounded-xl bg-white border border-orange-200 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-gray-900 mb-1">
              {approval.description}
            </h3>
            <p className="text-[12px] text-gray-500">{approval.timestamp}</p>
          </div>
        </div>
        <span className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-orange-50 text-orange-700 border border-orange-200">
          Pending
        </span>
      </div>
      <div className="mb-4">
        <p className="text-[12px] text-gray-500 mb-2">Affected Candidates:</p>
        <div className="flex flex-wrap gap-1.5">
          {approval.candidates.map((name, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-[11px] font-medium rounded-md bg-gray-50 text-gray-700 border border-gray-200"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="sm" className="flex-1">
          <Check className="w-3.5 h-3.5 mr-1.5" />
          Approve
        </Button>
        <Button size="sm" variant="outline" className="flex-1">
          <X className="w-3.5 h-3.5 mr-1.5" />
          Reject
        </Button>
        <Button size="sm" variant="ghost">
          <Eye className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}

function AgentCard({ agent, onViewDetails }) {
  const statusColors = {
    active: "text-emerald-600 bg-emerald-50 border-emerald-200",
    completed: "text-blue-600 bg-blue-50 border-blue-200",
    idle: "text-gray-500 bg-gray-50 border-gray-200",
    pending_approval: "text-orange-600 bg-orange-50 border-orange-200",
  };

  const needsApproval = agent.status === "pending_approval";

  return (
    <div className="p-5 rounded-xl bg-white border border-gray-200 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-[14px] font-semibold text-gray-900 mb-1">
              {agent.name}
            </h3>
            <p className="text-[12px] text-gray-600">{agent.description}</p>
          </div>
        </div>
        <span
          className={`px-2 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md border ${
            statusColors[agent.status]
          }`}
        >
          {agent.status.replace("_", " ")}
        </span>
      </div>
      <div className="mb-3">
        <div className="flex justify-between text-[11px] text-gray-500 mb-1.5">
          <span>Progress</span>
          <span>{agent.progress}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${agent.progress}%` }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
          <Clock className="w-3 h-3" />
          Last activity: {agent.lastActivity}
        </p>
        <Button
          variant={needsApproval ? "default" : "outline"}
          size="sm"
          onClick={() => onViewDetails(agent)}
          className="h-7 text-[11px]"
        >
          {needsApproval ? (
            <>
              <AlertCircle className="w-3 h-3 mr-1" />
              Review
            </>
          ) : (
            <>
              <Maximize2 className="w-3 h-3 mr-1" />
              Details
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function AutomationCard({ automation }) {
  return (
    <div className="p-5 rounded-xl bg-white border border-violet-200 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
            <ArrowRight className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-gray-900 mb-1">
              {automation.action}
            </h3>
            <div className="flex items-center gap-2 text-[12px] text-gray-600 mb-1">
              <span className="px-2 py-0.5 rounded bg-gray-100">
                {automation.from}
              </span>
              <ArrowRight className="w-3 h-3" />
              <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
                {automation.to}
              </span>
            </div>
            <p className="text-[11px] text-gray-500">{automation.reason}</p>
          </div>
        </div>
        <span className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-violet-50 text-violet-700 border border-violet-200">
          Review
        </span>
      </div>
      <div className="mb-4">
        <p className="text-[12px] text-gray-500 mb-2">
          {automation.candidates.length} candidates:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {automation.candidates.map((name, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-[11px] font-medium rounded-md bg-violet-50 text-violet-700 border border-violet-200"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="sm" className="flex-1">
          <Check className="w-3.5 h-3.5 mr-1.5" />
          Confirm
        </Button>
        <Button size="sm" variant="outline" className="flex-1">
          Review Details
        </Button>
      </div>
    </div>
  );
}

export default function Activity() {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewDetails = (agent) => {
    setSelectedAgent(agent);
    setIsDialogOpen(true);
  };

  const handleApprove = () => {
    setIsDialogOpen(false);
    setSelectedAgent(null);
  };

  const handleReject = () => {
    setIsDialogOpen(false);
    setSelectedAgent(null);
  };

  return (
    <div className="flex-1 min-h-screen bg-[#FAFAFA] overflow-auto">
      <div className="px-8 pt-8 pb-8">
        <div className="mb-8">
          <h1 className="text-[24px] font-semibold text-gray-900 mb-1">
            Activity & AI Agents
          </h1>
          <p className="text-[13px] text-gray-500">
            Monitor AI agents and their automated tasks
          </p>
        </div>

        {/* AI Agents Section */}
        <div className="mb-8">
          <div className="mb-4">
            <h2 className="text-[18px] font-semibold text-gray-900">
              Active AI Agents
            </h2>
            <p className="text-[12px] text-gray-500 mt-1">
              Real-time monitoring of automated recruitment tasks
            </p>
          </div>
          <div className="grid gap-4">
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} onViewDetails={handleViewDetails} />
            ))}
          </div>
        </div>

        {/* Recent Automated Actions */}
        <div className="mb-8">
          <div className="mb-4">
            <h2 className="text-[18px] font-semibold text-gray-900">
              Recent Automated Actions
            </h2>
            <p className="text-[12px] text-gray-500 mt-1">
              Actions taken by AI agents requiring review
            </p>
          </div>
          <div className="space-y-3">
            {automations.map((automation) => (
              <AutomationCard key={automation.id} automation={automation} />
            ))}
          </div>
        </div>

        {/* Pending Approvals */}
        <div>
          <div className="mb-4">
            <h2 className="text-[18px] font-semibold text-gray-900">
              Pending Approvals
            </h2>
            <p className="text-[12px] text-gray-500 mt-1">
              Critical decisions requiring your approval
            </p>
          </div>
          <div className="space-y-3">
            {approvals.map((approval) => (
              <ApprovalCard key={approval.id} approval={approval} />
            ))}
          </div>
        </div>
      </div>

      {/* Agent Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Bot className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <div className="text-[16px] font-semibold">{selectedAgent?.name}</div>
                <div className="text-[12px] text-gray-500 font-normal">{selectedAgent?.description}</div>
              </div>
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[calc(85vh-180px)] pr-4">
            <div className="space-y-6">
              {/* Decision Log */}
              <div>
                <h3 className="text-[14px] font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Decision Log
                </h3>
                <div className="space-y-2">
                  {selectedAgent?.decisionLog.map((log, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] text-gray-500">{log.time}</span>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                      </div>
                      <p className="text-[12px] text-gray-700 font-medium mb-0.5">{log.action}</p>
                      <p className="text-[11px] text-gray-600">{log.result}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Candidates Pushed */}
              {selectedAgent?.candidatesPushed.length > 0 && (
                <div>
                  <h3 className="text-[14px] font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Candidates Requiring Approval ({selectedAgent.candidatesPushed.length})
                  </h3>
                  <div className="space-y-3">
                    {selectedAgent.candidatesPushed.map((candidate) => (
                      <div key={candidate.id} className="p-4 rounded-lg bg-white border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="text-[13px] font-semibold text-gray-900">{candidate.name}</h4>
                            <p className="text-[11px] text-gray-500">{candidate.decision}</p>
                          </div>
                          <Badge variant="secondary" className="text-[11px]">
                            Score: {candidate.score}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Action Buttons */}
          {selectedAgent?.status === "pending_approval" && selectedAgent?.candidatesPushed.length > 0 && (
            <div className="flex gap-3 pt-4 border-t">
              <Button onClick={handleApprove} className="flex-1">
                <Check className="w-4 h-4 mr-2" />
                Approve All Decisions
              </Button>
              <Button onClick={handleReject} variant="outline" className="flex-1">
                <X className="w-4 h-4 mr-2" />
                Reject & Review
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}