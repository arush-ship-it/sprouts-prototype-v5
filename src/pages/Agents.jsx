import React, { useState, useEffect } from "react";
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
  TrendingDown,
  Zap,
  Sparkles } from
"lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
"@/components/ui/select";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddAgentModal from "@/components/console/AddAgentModal";

// All Agents Data
const allAgents = [
{
  id: 1,
  name: "Outreach automation",
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
  { id: 102, name: "Send Reminder", icon: Clock, type: "operations" }],

  activityLog: [
  { time: "2 min ago", action: "Screened Maya Johnson's resume", result: "Qualified - 92% match" },
  { time: "5 min ago", action: "Screened Alex Chen's resume", result: "Qualified - 78% match" },
  { time: "12 min ago", action: "Screened Sarah Mitchell's resume", result: "Not qualified" }]

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
  { time: "15 min ago", action: "Sent rejection to Mike Wilson", result: "Delivered" }]

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
  { id: 104, name: "Deadline Reminder", icon: Clock, type: "operations" }],

  activityLog: [
  { time: "1 hour ago", action: "Evaluated James Park's skills", result: "Advanced - 95% match" },
  { time: "2 hours ago", action: "Evaluated Priya Sharma's skills", result: "Advanced - 88% match" }]

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
  { time: "2 hours ago", action: "Scheduled interview for Lisa Brown", result: "Confirmed" }]

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
  { id: 106, name: "Feedback Request", icon: MessageSquare, type: "operations" }],

  activityLog: [
  { time: "30 min ago", action: "Analyzed Daniel Wright's interview", result: "Strong fit - 87%" }]

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
  { id: 108, name: "Submission Reminder", icon: Clock, type: "operations" }],

  activityLog: [
  { time: "3 hours ago", action: "Analyzed Marcus Rivera's video", result: "Good communication" }]

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
  { time: "20 min ago", action: "Sent status update to Lena Kim", result: "Opened" }]

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
  { time: "1 hour ago", action: "Screened Emily Davis", result: "Failed" }]

}];


// Agent Card Component
function AgentCard({ agent, onToggle, onClick }) {
  const Icon = agent.icon;

  return (
    <div className="bg-[#FAFAFA] rounded-[24px] shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden">
      {/* Hero Section with Gradient */}
      <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-12 pb-12 px-6 flex items-center justify-center">
        {/* Sparkle accent */}
        <div className="absolute top-4 right-4">
          
        </div>
        
        {/* Icon Container */}
        <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center">
          <Icon className="w-9 h-9 text-blue-600" strokeWidth={1.5} />
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8">
        {/* Title */}
        <h3 className="text-[18px] font-bold text-gray-900 mb-2">
          {agent.name}
        </h3>
        
        {/* Status */}
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-2 h-2 rounded-full ${agent.status === "active" ? "bg-emerald-500" : "bg-gray-400"}`} />
          <span className="text-[13px] text-gray-600 font-medium capitalize">{agent.status}</span>
        </div>

        {/* Description */}
        <p className="text-gray-500 mb-6 leading-relaxed min-h-[42px]">
          {agent.description}
        </p>

        {/* Metrics - Two Column */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-[12px] text-gray-500 font-medium mb-2">Total Processed</p>
            <p className="text-gray-900 text-xl font-bold">{agent.totalProcessed}</p>
          </div>
          <div>
            <p className="text-[12px] text-gray-500 font-medium mb-2">Accuracy</p>
            <p className="text-gray-900 text-xl font-bold">{agent.accuracy}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={onClick}
            className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-semibold rounded-full shadow-sm transition-all duration-200">
            Setup & Deploy
          </Button>
          <Button
            onClick={onClick}
            variant="ghost"
            className="flex-1 h-12 bg-gray-100 hover:bg-gray-200 text-blue-600 text-[14px] font-semibold rounded-full transition-all duration-200">
            View Details
          </Button>
        </div>
      </div>
    </div>);

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

  // Calculate analytics data
  const totalProcessed = agents.reduce((sum, agent) => sum + agent.totalProcessed, 0);
  const avgAccuracy = (agents.reduce((sum, agent) => sum + parseFloat(agent.accuracy), 0) / agents.length).toFixed(1);
  const activeAgents = agents.filter((a) => a.status === "active").length;

  // Trends data (mock weekly data)
  const trendData = [
  { week: "Week 1", processed: 320, accuracy: 91 },
  { week: "Week 2", processed: 450, accuracy: 92 },
  { week: "Week 3", processed: 580, accuracy: 93 },
  { week: "Week 4", processed: 710, accuracy: 94 }];


  // Top and bottom performers
  const sortedByAccuracy = [...agents].sort((a, b) => parseFloat(b.accuracy) - parseFloat(a.accuracy));
  const topPerformers = sortedByAccuracy.slice(0, 3);
  const underPerformers = sortedByAccuracy.slice(-3).reverse();

  // Agent type distribution
  const typeDistribution = [
  { name: "Evaluation", value: agents.filter((a) => a.type === "evaluation").length, color: "#10b981" },
  { name: "Operations", value: agents.filter((a) => a.type === "operations").length, color: "#6366f1" }];


  return (
    <div className="flex-1 min-h-screen bg-[#FAFAFA]">
      <div className="px-8 pt-8 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[22px] font-semibold text-gray-900">Intelligence Layer</h1>
            <p className="text-[13px] text-gray-500 mt-1">Structured Intelligence for Modern Workflows</p>
          </div>
          <div className="flex items-center gap-3">
            








            <Button
              size="sm"
              className="h-8 text-[12px]"
              onClick={() => setIsAddAgentModalOpen(true)}>

              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Add New Agent
            </Button>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="bg-slate-50 mb-6 p-6 rounded-xl border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="flex-1 min-w-0">
                


              </div>
            </div>
          </div>

          <div className="mt-6 space-y-6">
              {/* Overall Metrics */}
              <div>
                <h4 className="text-[13px] font-semibold text-gray-900 mb-3">Overall Performance</h4>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-[#ffffff] p-4 rounded-lg from-emerald-50 to-teal-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-emerald-600" />
                      <p className="text-[11px] font-medium text-emerald-700">Total Processed</p>
                    </div>
                    <p className="text-[28px] font-bold text-emerald-900">{totalProcessed.toLocaleString()}</p>
                    <p className="text-[10px] text-emerald-600 mt-1">+12% from last month</p>
                  </div>

                  <div className="bg-[#ffffff] p-4 rounded-lg from-indigo-50 to-purple-50">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-indigo-600" />
                      <p className="text-[11px] font-medium text-indigo-700">Avg Accuracy</p>
                    </div>
                    <p className="text-[28px] font-bold text-indigo-900">{avgAccuracy}%</p>
                    <p className="text-[10px] text-indigo-600 mt-1">+2.3% from last month</p>
                  </div>

                  <div className="bg-[#ffffff] p-4 rounded-lg from-blue-50 to-cyan-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <p className="text-[11px] font-medium text-blue-700">Active Agents</p>
                    </div>
                    <p className="text-[28px] font-bold text-blue-900">{activeAgents}/{agents.length}</p>
                    <p className="text-[10px] text-blue-600 mt-1">{(activeAgents / agents.length * 100).toFixed(0)}% deployment rate</p>
                  </div>

                  <div className="bg-[#ffffff] p-4 rounded-lg from-amber-50 to-orange-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <p className="text-[11px] font-medium text-amber-700">Avg Processing Time</p>
                    </div>
                    <p className="text-[28px] font-bold text-amber-900">3.2s</p>
                    <p className="text-[10px] text-amber-600 mt-1">-0.5s faster</p>
                  </div>
                </div>
              </div>

              {/* Trends and Distribution */}
              <div className="grid grid-cols-3 gap-4">
                {/* Activity Trends */}
                















                {/* Agent Type Distribution */}
                




























              </div>

              {/* Top and Under Performers */}
              <div className="grid grid-cols-2 gap-4">
                {/* Top Performers */}
                























                {/* Under Performers */}
                






















              </div>
            </div>
        </div>

        {/* Filters */}
        




















































        {/* Agents Pipeline */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {["Application Review", "Technical Assessment", "Interview", "All Stages"].map((stage) => {
            const stageAgents = filteredAgents.filter((agent) => agent.stage === stage);
            if (stageAgents.length === 0) return null;

            const stageColors = {
              "Application Review": "border-blue-200 bg-blue-50 text-blue-700",
              "Technical Assessment": "border-violet-200 bg-violet-50 text-violet-700",
              "Interview": "border-amber-200 bg-amber-50 text-amber-700",
              "All Stages": "border-emerald-200 bg-emerald-50 text-emerald-700"
            };

            return (
              <div key={stage} className="flex-shrink-0 w-[320px] flex flex-col gap-3">
                {/* Stage Header */}
                <div className="bg-slate-50 text-blue-700 px-4 py-2.5 rounded-xl border-2 border-blue-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4" />
                    <span className="text-[13px] font-bold">{stage}</span>
                  </div>
                  <span className="text-[12px] font-bold px-2 py-0.5 rounded-md bg-white/60">
                    {stageAgents.length}
                  </span>
                </div>
                
                {/* Agent Cards */}
                <div className="flex flex-col gap-3">
                  {stageAgents.map((agent) => {
                    const Icon = agent.icon;
                    return (
                      <div
                        key={agent.id}
                        onClick={() => handleAgentClick(agent)}
                        className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all cursor-pointer overflow-hidden">

                        {/* Mini Hero */}
                        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-4 flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-[14px] font-bold text-gray-900 truncate">
                              {agent.name}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-1">
                              <div className={`w-1.5 h-1.5 rounded-full ${agent.status === "active" ? "bg-emerald-500" : "bg-gray-400"}`} />
                              <span className="text-[11px] text-gray-600 font-medium capitalize">{agent.status}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="px-4 py-3">
                          <p className="text-[12px] text-gray-500 mb-3 line-clamp-2">
                            {agent.description}
                          </p>
                          
                          {/* Metrics */}
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-gray-50 rounded-md px-2 py-1.5">
                              <p className="text-[10px] text-gray-500 mb-0.5">Processed</p>
                              <p className="text-[14px] font-bold text-gray-900">{agent.totalProcessed}</p>
                            </div>
                            <div className="bg-gray-50 rounded-md px-2 py-1.5">
                              <p className="text-[10px] text-gray-500 mb-0.5">Accuracy</p>
                              <p className="text-[14px] font-bold text-gray-900">{agent.accuracy}</p>
                            </div>
                          </div>
                        </div>
                      </div>);

                  })}
                </div>
              </div>);

          })}
        </div>

        {filteredAgents.length === 0 &&
        <div className="text-center py-12">
            <Bot className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-[14px] text-gray-500">No agents found matching your filters</p>
          </div>
        }
      </div>

      <AddAgentModal isOpen={isAddAgentModalOpen} onClose={() => setIsAddAgentModalOpen(false)} />

      {/* Agent Details Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent side="right" className="w-[80vw] p-0 overflow-y-auto">
          {selectedAgent &&
          <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    selectedAgent.type === "operations" ? "bg-indigo-100" : "bg-emerald-100"}`
                    }>

                      {React.createElement(selectedAgent.icon, {
                      className: `w-7 h-7 ${
                      selectedAgent.type === "operations" ? "text-indigo-600" : "text-emerald-600"}`

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
                        selectedAgent.type === "operations" ?
                        "bg-indigo-50 text-indigo-700" :
                        "bg-emerald-50 text-emerald-700"}`
                        }>

                          {selectedAgent.type}
                        </Badge>
                        <Badge variant="outline" className="text-[10px]">
                          {selectedAgent.stage}
                        </Badge>
                        <Badge className={`text-[10px] ${
                      selectedAgent.status === "active" ?
                      "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      "bg-gray-50 text-gray-600 border-gray-200"}`
                      }>
                          {selectedAgent.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDrawerOpen(false)}
                  className="h-8 w-8 p-0">

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
                          onCheckedChange={() => handleToggle(selectedAgent.id)} />

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
                    {selectedAgent.type === "evaluation" && selectedAgent.subAgents &&
                  <div>
                        <h3 className="text-[15px] font-semibold text-gray-900 mb-3">
                          Associated Operation Agents
                        </h3>
                        <div className="space-y-2">
                          {selectedAgent.subAgents.map((subAgent) =>
                      <div
                        key={subAgent.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50 border border-indigo-100">

                              <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center">
                                {React.createElement(subAgent.icon, {
                            className: "w-4 h-4 text-indigo-600"
                          })}
                              </div>
                              <div className="flex-1">
                                <p className="text-[12px] font-medium text-gray-900">
                                  {subAgent.name}
                                </p>
                                <Badge
                            variant="secondary"
                            className="text-[9px] bg-indigo-100 text-indigo-700 mt-1">

                                  {subAgent.type}
                                </Badge>
                              </div>
                            </div>
                      )}
                        </div>
                      </div>
                  }

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
                        {selectedAgent.activityLog.map((log, idx) =>
                      <div
                        key={idx}
                        className="p-4 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-all">

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
                      )}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          }
        </SheetContent>
      </Sheet>
    </div>);

}