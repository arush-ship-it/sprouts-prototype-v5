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
  X,
  TrendingUp,
  Activity,
  BarChart3,
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
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    totalProcessed: 156,
    avgProcessingTime: "2.3s",
    accuracy: "94%",
    subAgents: [
      { id: 101, name: "Send Invite", icon: Mail, type: "operations" },
      { id: 102, name: "Send Reminder", icon: Clock, type: "operations" },
    ],
    activityLog: [
      { time: "2 min ago", action: "Screened Maya Johnson's resume", result: "Qualified - 92% match" },
      { time: "5 min ago", action: "Screened Alex Chen's resume", result: "Qualified - 78% match" },
      { time: "12 min ago", action: "Screened Sarah Mitchell's resume", result: "Not qualified" },
    ],
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
    totalProcessed: 423,
    avgProcessingTime: "0.5s",
    accuracy: "99%",
    activityLog: [
      { time: "5 min ago", action: "Sent follow-up to John Doe", result: "Delivered" },
      { time: "10 min ago", action: "Sent interview reminder to Jane Smith", result: "Opened" },
      { time: "15 min ago", action: "Sent rejection to Mike Wilson", result: "Delivered" },
    ],
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
    totalProcessed: 89,
    avgProcessingTime: "4.1s",
    accuracy: "91%",
    subAgents: [
      { id: 103, name: "Assessment Invitation", icon: Mail, type: "operations" },
      { id: 104, name: "Deadline Reminder", icon: Clock, type: "operations" },
    ],
    activityLog: [
      { time: "1 hour ago", action: "Evaluated James Park's skills", result: "Advanced - 95% match" },
      { time: "2 hours ago", action: "Evaluated Priya Sharma's skills", result: "Advanced - 88% match" },
    ],
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
    totalProcessed: 234,
    avgProcessingTime: "1.2s",
    accuracy: "97%",
    activityLog: [
      { time: "2 hours ago", action: "Scheduled interview for Lisa Brown", result: "Confirmed" },
    ],
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
    totalProcessed: 67,
    avgProcessingTime: "5.8s",
    accuracy: "89%",
    subAgents: [
      { id: 105, name: "Interview Invite", icon: Mail, type: "operations" },
      { id: 106, name: "Feedback Request", icon: MessageSquare, type: "operations" },
    ],
    activityLog: [
      { time: "30 min ago", action: "Analyzed Daniel Wright's interview", result: "Strong fit - 87%" },
    ],
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
    totalProcessed: 45,
    avgProcessingTime: "12.4s",
    accuracy: "86%",
    subAgents: [
      { id: 107, name: "Recording Link", icon: Mail, type: "operations" },
      { id: 108, name: "Submission Reminder", icon: Clock, type: "operations" },
    ],
    activityLog: [
      { time: "3 hours ago", action: "Analyzed Marcus Rivera's video", result: "Good communication" },
    ],
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
    totalProcessed: 512,
    avgProcessingTime: "0.3s",
    accuracy: "99%",
    activityLog: [
      { time: "15 min ago", action: "Sent status update to Tom Jones", result: "Delivered" },
      { time: "20 min ago", action: "Sent status update to Lena Kim", result: "Opened" },
    ],
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
    totalProcessed: 178,
    avgProcessingTime: "3.5s",
    accuracy: "92%",
    activityLog: [
      { time: "45 min ago", action: "Screened Robert Chen", result: "Passed" },
      { time: "1 hour ago", action: "Screened Emily Davis", result: "Failed" },
    ],
  },
];

// Agent Card Component
function AgentCard({ agent, onToggle, onClick }) {
  const Icon = agent.icon;
  const isOperations = agent.type === "operations";

  return (
    <div 
      onClick={onClick}
      className="p-5 rounded-xl bg-white border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer"
    >
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
        <Switch 
          checked={agent.isActive} 
          onCheckedChange={(e) => {
            e.stopPropagation();
            onToggle(agent.id);
          }}
          onClick={(e) => e.stopPropagation()}
        />
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
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleToggle = (agentId) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === agentId ? { ...agent, isActive: !agent.isActive, status: !agent.isActive ? "active" : "idle" } : agent
      )
    );
  };

  const handleAgentClick = (agent) => {
    setSelectedAgent(agent);
    setIsDrawerOpen(true);
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
            {/* Filters */}
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
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredAgents.map((agent) => (
            <AgentCard 
              key={agent.id} 
              agent={agent} 
              onToggle={handleToggle} 
              onClick={() => handleAgentClick(agent)}
            />
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

      {/* Agent Details Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent side="right" className="w-[80vw] p-0 overflow-y-auto">
          {selectedAgent && (
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        selectedAgent.type === "operations" ? "bg-indigo-100" : "bg-emerald-100"
                      }`}
                    >
                      {React.createElement(selectedAgent.icon, {
                        className: `w-7 h-7 ${
                          selectedAgent.type === "operations" ? "text-indigo-600" : "text-emerald-600"
                        }`,
                      })}
                    </div>
                    <div>
                      <h2 className="text-[20px] font-semibold text-gray-900 mb-1">
                        {selectedAgent.name}
                      </h2>
                      <p className="text-[13px] text-gray-600 mb-3">
                        {selectedAgent.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className={`text-[10px] ${
                            selectedAgent.type === "operations"
                              ? "bg-indigo-50 text-indigo-700"
                              : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          {selectedAgent.type}
                        </Badge>
                        <Badge variant="outline" className="text-[10px]">
                          {selectedAgent.stage}
                        </Badge>
                        <Badge className={`text-[10px] ${
                          selectedAgent.status === "active" 
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                            : "bg-gray-50 text-gray-600 border-gray-200"
                        }`}>
                          {selectedAgent.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsDrawerOpen(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-gray-50">
                    <p className="text-[11px] text-gray-500 mb-1">Total Processed</p>
                    <p className="text-[18px] font-semibold text-gray-900">
                      {selectedAgent.totalProcessed}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50">
                    <p className="text-[11px] text-gray-500 mb-1">Avg Processing Time</p>
                    <p className="text-[18px] font-semibold text-gray-900">
                      {selectedAgent.avgProcessingTime}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50">
                    <p className="text-[11px] text-gray-500 mb-1">Accuracy</p>
                    <p className="text-[18px] font-semibold text-gray-900">
                      {selectedAgent.accuracy}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tabs Content */}
              <div className="flex-1 p-6">
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-6">
                    {/* Configuration */}
                    <div>
                      <h3 className="text-[15px] font-semibold text-gray-900 mb-3">
                        Configuration
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                          <div>
                            <p className="text-[12px] font-medium text-gray-900">Agent Status</p>
                            <p className="text-[11px] text-gray-500">
                              {selectedAgent.isActive ? "Currently active" : "Currently inactive"}
                            </p>
                          </div>
                          <Switch
                            checked={selectedAgent.isActive}
                            onCheckedChange={() => handleToggle(selectedAgent.id)}
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                          <div>
                            <p className="text-[12px] font-medium text-gray-900">Pipeline Stage</p>
                            <p className="text-[11px] text-gray-500">{selectedAgent.stage}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                          <div>
                            <p className="text-[12px] font-medium text-gray-900">Last Activity</p>
                            <p className="text-[11px] text-gray-500">{selectedAgent.lastActivity}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sub-agents for evaluation agents */}
                    {selectedAgent.type === "evaluation" && selectedAgent.subAgents && (
                      <div>
                        <h3 className="text-[15px] font-semibold text-gray-900 mb-3">
                          Associated Operation Agents
                        </h3>
                        <div className="space-y-2">
                          {selectedAgent.subAgents.map((subAgent) => (
                            <div
                              key={subAgent.id}
                              className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50 border border-indigo-100"
                            >
                              <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center">
                                {React.createElement(subAgent.icon, {
                                  className: "w-4 h-4 text-indigo-600",
                                })}
                              </div>
                              <div className="flex-1">
                                <p className="text-[12px] font-medium text-gray-900">
                                  {subAgent.name}
                                </p>
                                <Badge
                                  variant="secondary"
                                  className="text-[9px] bg-indigo-100 text-indigo-700 mt-1"
                                >
                                  {subAgent.type}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Performance Metrics */}
                    <div>
                      <h3 className="text-[15px] font-semibold text-gray-900 mb-3">
                        Performance Metrics
                      </h3>
                      <div className="space-y-3">
                        <div className="p-4 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-emerald-600" />
                            <p className="text-[12px] font-medium text-gray-900">Success Rate</p>
                          </div>
                          <div className="flex items-end gap-2">
                            <p className="text-[24px] font-bold text-emerald-600">
                              {selectedAgent.accuracy}
                            </p>
                            <p className="text-[11px] text-gray-500 mb-1">accuracy rate</p>
                          </div>
                        </div>
                        <div className="p-4 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-2 mb-2">
                            <BarChart3 className="w-4 h-4 text-indigo-600" />
                            <p className="text-[12px] font-medium text-gray-900">Processing Speed</p>
                          </div>
                          <div className="flex items-end gap-2">
                            <p className="text-[24px] font-bold text-indigo-600">
                              {selectedAgent.avgProcessingTime}
                            </p>
                            <p className="text-[11px] text-gray-500 mb-1">per candidate</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="activity" className="space-y-4">
                    <div>
                      <h3 className="text-[15px] font-semibold text-gray-900 mb-3">
                        Recent Activity
                      </h3>
                      <div className="space-y-3">
                        {selectedAgent.activityLog.map((log, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-all"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                                <Activity className="w-4 h-4 text-gray-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-[12px] text-gray-900 font-medium mb-1">
                                  {log.action}
                                </p>
                                <p className="text-[11px] text-gray-600 mb-2">{log.result}</p>
                                <p className="text-[10px] text-gray-400">{log.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}