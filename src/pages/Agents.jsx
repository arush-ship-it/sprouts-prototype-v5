import React, { useState } from "react";
import {
  Bot,
  Clock,
  Mail,
  Calendar,
  Users,
  MessageSquare,
  FileCheck,
  CheckCircle,
  PlayCircle,
  Plus,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddAgentModal from "@/components/console/AddAgentModal";

// All Agents Data
const allAgents = [
  {
    id: 1,
    name: "Resume Screening Agent",
    icon: FileCheck,
    type: "evaluation",
    status: "active",
    stage: "Application Review",
    description: "Analyzes resumes for qualifications and experience",
    lastActivity: "2 minutes ago",
    isActive: true,
  },
  {
    id: 2,
    name: "Email Sequence Agent",
    icon: Mail,
    type: "operations",
    status: "active",
    stage: "All Stages",
    description: "Sends automated emails to candidates",
    lastActivity: "5 minutes ago",
    isActive: true,
  },
  {
    id: 3,
    name: "Skills Evaluator",
    icon: CheckCircle,
    type: "evaluation",
    status: "active",
    stage: "Technical Assessment",
    description: "Evaluates technical skills and expertise",
    lastActivity: "1 hour ago",
    isActive: true,
  },
  {
    id: 4,
    name: "Scheduling Agent",
    icon: Calendar,
    type: "operations",
    status: "idle",
    stage: "Interview",
    description: "Automatically schedules interviews",
    lastActivity: "2 hours ago",
    isActive: false,
  },
  {
    id: 5,
    name: "Culture Fit Analyzer",
    icon: Users,
    type: "evaluation",
    status: "active",
    stage: "Interview",
    description: "Assesses culture alignment and team fit",
    lastActivity: "30 minutes ago",
    isActive: true,
  },
  {
    id: 6,
    name: "Video Interview AI",
    icon: PlayCircle,
    type: "evaluation",
    status: "idle",
    stage: "Interview",
    description: "Analyzes video interviews",
    lastActivity: "3 hours ago",
    isActive: false,
  },
  {
    id: 7,
    name: "Notification Agent",
    icon: MessageSquare,
    type: "operations",
    status: "active",
    stage: "All Stages",
    description: "Sends status updates to candidates",
    lastActivity: "15 minutes ago",
    isActive: true,
  },
  {
    id: 8,
    name: "Initial Screening",
    icon: Users,
    type: "operations",
    status: "active",
    stage: "Screening",
    description: "Conducts initial candidate screening",
    lastActivity: "45 minutes ago",
    isActive: true,
  },
];

// Agent Card Component
function AgentCard({ agent, onToggle }) {
  const Icon = agent.icon;
  const isOperations = agent.type === "operations";
  const statusColors = {
    active: "text-emerald-600 bg-emerald-50",
    idle: "text-gray-500 bg-gray-50",
  };

  return (
    <div className="p-5 rounded-xl bg-white border border-gray-200 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
              isOperations ? "bg-indigo-100" : "bg-emerald-100"
            }`}
          >
            <Icon
              className={`w-5 h-5 ${
                isOperations ? "text-indigo-600" : "text-emerald-600"
              }`}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[14px] font-semibold text-gray-900 mb-1">
              {agent.name}
            </h3>
            <p className="text-[11px] text-gray-600 line-clamp-2 mb-2">
              {agent.description}
            </p>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={`text-[9px] ${
                  isOperations
                    ? "bg-indigo-50 text-indigo-700"
                    : "bg-emerald-50 text-emerald-700"
                }`}
              >
                {agent.type}
              </Badge>
              <Badge variant="outline" className="text-[9px]">
                {agent.stage}
              </Badge>
            </div>
          </div>
        </div>
        <Switch checked={agent.isActive} onCheckedChange={() => onToggle(agent.id)} />
      </div>
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${agent.status === "active" ? "bg-emerald-500" : "bg-gray-400"}`} />
          <span className="text-[11px] text-gray-500 capitalize">{agent.status}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
          <Clock className="w-3 h-3" />
          {agent.lastActivity}
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function Agents() {
  const [agents, setAgents] = useState(allAgents);
  const [isAddAgentModalOpen, setIsAddAgentModalOpen] = useState(false);
  const [filterStage, setFilterStage] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleToggle = (agentId) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === agentId ? { ...agent, isActive: !agent.isActive, status: !agent.isActive ? "active" : "idle" } : agent
      )
    );
  };

  const filteredAgents = agents.filter((agent) => {
    if (filterStage !== "all" && agent.stage !== filterStage) return false;
    if (filterType !== "all" && agent.type !== filterType) return false;
    if (filterStatus !== "all" && agent.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="flex-1 min-h-screen bg-[#FAFAFA]">
      <div className="px-8 pt-8 pb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[22px] font-semibold text-gray-900">Agents</h1>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-[12px]"
              onClick={() => {}}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" />
              Filters
            </Button>
            <Button
              size="sm"
              className="h-8 text-[12px]"
              onClick={() => setIsAddAgentModalOpen(true)}
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Add New Agent
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6">
          <Select value={filterStage} onValueChange={setFilterStage}>
            <SelectTrigger className="w-[180px] h-8 text-[12px]">
              <SelectValue placeholder="All Stages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              <SelectItem value="Application Review">Application Review</SelectItem>
              <SelectItem value="Screening">Screening</SelectItem>
              <SelectItem value="Technical Assessment">Technical Assessment</SelectItem>
              <SelectItem value="Interview">Interview</SelectItem>
              <SelectItem value="All Stages">All Stages</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px] h-8 text-[12px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
              <SelectItem value="evaluation">Evaluation</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px] h-8 text-[12px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="idle">Idle</SelectItem>
            </SelectContent>
          </Select>

          {(filterStage !== "all" || filterType !== "all" || filterStatus !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-[11px]"
              onClick={() => {
                setFilterStage("all");
                setFilterType("all");
                setFilterStatus("all");
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} onToggle={handleToggle} />
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <Bot className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-[14px] text-gray-500">No agents found matching your filters</p>
          </div>
        )}
      </div>

      <AddAgentModal isOpen={isAddAgentModalOpen} onClose={() => setIsAddAgentModalOpen(false)} />
    </div>
  );
}