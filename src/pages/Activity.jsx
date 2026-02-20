import React from "react";
import {
  CheckCircle2,
  Bot,
  AlertCircle,
  Clock,
  ArrowRight,
  Eye,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
    status: "active",
    description: "Processing 12 new applications",
    progress: 75,
    lastActivity: "2 minutes ago",
  },
  {
    id: 2,
    name: "Email Sequence Agent",
    status: "active",
    description: "Sending follow-up emails to 8 candidates",
    progress: 50,
    lastActivity: "5 minutes ago",
  },
  {
    id: 3,
    name: "Skill Matching Agent",
    status: "completed",
    description: "Matched 23 candidates to job requirements",
    progress: 100,
    lastActivity: "1 hour ago",
  },
  {
    id: 4,
    name: "Interview Scheduler Agent",
    status: "idle",
    description: "Waiting for candidate responses",
    progress: 0,
    lastActivity: "3 hours ago",
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

function AgentCard({ agent }) {
  const statusColors = {
    active: "text-emerald-600 bg-emerald-50 border-emerald-200",
    completed: "text-blue-600 bg-blue-50 border-blue-200",
    idle: "text-gray-500 bg-gray-50 border-gray-200",
  };

  return (
    <div className="p-5 rounded-xl bg-white border border-gray-200 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
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
          {agent.status}
        </span>
      </div>
      <div className="mb-2">
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
      <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
        <Clock className="w-3 h-3" />
        Last activity: {agent.lastActivity}
      </p>
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
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="mb-8">
          <h2 className="text-[18px] font-semibold text-gray-900 mb-4">
            Pending Approvals
          </h2>
          <div className="space-y-3">
            {approvals.map((approval) => (
              <ApprovalCard key={approval.id} approval={approval} />
            ))}
          </div>
        </div>

        {/* Active Agents */}
        <div className="mb-8">
          <h2 className="text-[18px] font-semibold text-gray-900 mb-4">
            Active Agents
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>

        {/* Pipeline Automations */}
        <div>
          <h2 className="text-[18px] font-semibold text-gray-900 mb-4">
            Automated Pipeline Movements
          </h2>
          <div className="space-y-3">
            {automations.map((automation) => (
              <AutomationCard key={automation.id} automation={automation} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}