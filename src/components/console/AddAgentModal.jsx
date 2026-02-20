import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Bot,
  Mail,
  Calendar,
  Users,
  MessageSquare,
  FileCheck,
  CheckCircle,
  PlayCircle,
  Search,
  Sparkles,
} from "lucide-react";

const agentLibrary = [
  {
    id: "email",
    name: "Email Agent",
    icon: Mail,
    type: "operations",
    description: "Sends automated emails to candidates at different pipeline stages",
    stages: ["All Stages"],
  },
  {
    id: "scheduling",
    name: "Scheduling Agent",
    icon: Calendar,
    type: "operations",
    description: "Automatically schedules interviews based on availability",
    stages: ["Interview", "Final Round"],
  },
  {
    id: "screening",
    name: "Initial Screening",
    icon: Users,
    type: "operations",
    description: "Conducts initial candidate screening calls",
    stages: ["Screening"],
  },
  {
    id: "notification",
    name: "Notification Agent",
    icon: MessageSquare,
    type: "operations",
    description: "Sends status updates and notifications to candidates",
    stages: ["All Stages"],
  },
  {
    id: "resume",
    name: "Resume Analyzer",
    icon: FileCheck,
    type: "evaluation",
    description: "Analyzes resumes for fit and qualifications",
    stages: ["Application Review"],
  },
  {
    id: "skill",
    name: "Skills Evaluator",
    icon: CheckCircle,
    type: "evaluation",
    description: "Evaluates technical skills and expertise",
    stages: ["Technical Assessment"],
  },
  {
    id: "culture",
    name: "Culture Fit Analyzer",
    icon: Users,
    type: "evaluation",
    description: "Assesses culture alignment and team fit",
    stages: ["Interview"],
  },
  {
    id: "video",
    name: "Video Interview AI",
    icon: PlayCircle,
    type: "evaluation",
    description: "Analyzes video interviews for communication and soft skills",
    stages: ["Interview"],
  },
  {
    id: "code",
    name: "Code Review Agent",
    icon: FileCheck,
    type: "evaluation",
    description: "Reviews and evaluates coding assessments",
    stages: ["Technical Assessment"],
  },
  {
    id: "reference",
    name: "Reference Check Agent",
    icon: Users,
    type: "operations",
    description: "Automates reference check process",
    stages: ["Final Round"],
  },
];

export default function AddAgentModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgents, setSelectedAgents] = useState([]);

  const filteredAgents = agentLibrary.filter((agent) =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAgent = (agentId) => {
    setSelectedAgents((prev) =>
      prev.includes(agentId)
        ? prev.filter((id) => id !== agentId)
        : [...prev, agentId]
    );
  };

  const handleAdd = () => {
    // Add selected agents
    onClose();
    setSelectedAgents([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Add New Agents</DialogTitle>
        </DialogHeader>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search agents..."
            className="pl-9 text-[13px]"
          />
        </div>

        {/* Agent Library */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            {filteredAgents.map((agent) => {
              const Icon = agent.icon;
              const isSelected = selectedAgents.includes(agent.id);
              const isOperations = agent.type === "operations";

              return (
                <button
                  key={agent.id}
                  onClick={() => toggleAgent(agent.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? isOperations
                        ? "border-indigo-300 bg-indigo-50"
                        : "border-emerald-300 bg-emerald-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        isOperations
                          ? "bg-indigo-100"
                          : "bg-emerald-100"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isOperations ? "text-indigo-600" : "text-emerald-600"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[13px] font-semibold text-gray-900 mb-0.5">
                        {agent.name}
                      </h3>
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
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-600 mb-2 line-clamp-2">
                    {agent.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {agent.stages.map((stage, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 text-[9px] rounded bg-gray-100 text-gray-600"
                      >
                        {stage}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <p className="text-[12px] text-gray-500">
            {selectedAgents.length} agent{selectedAgents.length !== 1 ? "s" : ""} selected
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleAdd} disabled={selectedAgents.length === 0}>
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Add Agents
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}