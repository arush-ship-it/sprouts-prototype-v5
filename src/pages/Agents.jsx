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
  Filter,
  X,
  TrendingUp,
  Activity,
  BarChart3,
  TrendingDown,
  Zap,
  Sparkles,
  LayoutGrid,
  List,
  ChevronDown } from
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
import AgentActivityFeed from "@/components/console/AgentActivityFeed";

// All Agents Data
const allAgents = [
{
  id: 1,
  name: "Outreach Agent",
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
  id: 3,
  name: "Assessment Agent",
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
  const [viewMode, setViewMode] = useState("list"); // "pipeline" | "list"
  const [activeTab, setActiveTab] = useState("agents"); // "activity" | "agents"
  const [showFilters, setShowFilters] = useState(false);
  const [analysisExpanded, setAnalysisExpanded] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setAnalysisExpanded(false), 2000);
    return () => clearTimeout(timer);
  }, []);

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
      <div className="bg-[#F2F3F5] pt-8 pb-6 px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[22px] font-semibold text-gray-900">Stage Embedded Agents</h1>
            <p className="text-[13px] text-gray-500 mt-1">Dedicated intelligence embedded within every pipeline stage</p>
          </div>
          <div className="flex items-center gap-3">
            











            








            







          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="bg-[FAFAFA] mb-4 rounded-xl">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="flex-1 min-w-0">
                


              </div>
            </div>
          </div>

          <div className="space-y-6">
              {/* Section Title */}
              <button
              onClick={() => setAnalysisExpanded(!analysisExpanded)}
              className="w-full flex items-center justify-between group">
                <p className="text-gray-900 text-sm font-semibold">Agent Analysis</p>
                <div className="flex items-center gap-3">
                  {!analysisExpanded &&
                <div className="flex items-center gap-4">
                      {agents.map((a) => null





                  )}
                    </div>
                }
                  <ChevronDown className="text-gray-700 lucide lucide-chevron-down w-4 h-4 transition-transform -rotate-90" />
                </div>
              </button>

              {/* Expanded Content */}
              {analysisExpanded && <div className="space-y-6">
              {/* Overall Metrics */}
              <div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#ffffff] p-6 rounded-2xl from-emerald-50 to-teal-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-emerald-600" />
                      <p className="text-[11px] font-medium text-emerald-700">Total Processed</p>
                    </div>
                    <p className="text-[32px] font-bold text-emerald-900">{totalProcessed.toLocaleString()}</p>
                    <p className="text-[10px] text-emerald-600 mt-1">+12% from last month</p>
                  </div>

                  <div className="bg-[#ffffff] p-6 rounded-2xl from-blue-50 to-cyan-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <p className="text-[11px] font-medium text-blue-700">Active Agents</p>
                    </div>
                    <p className="text-[32px] font-bold text-blue-900">{activeAgents}/{agents.length}</p>
                    <p className="text-[10px] text-blue-600 mt-1">{(activeAgents / agents.length * 100).toFixed(0)}% deployment rate</p>
                  </div>
                </div>
              </div>

              {/* Comparative Agent Analysis Chart */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[13px] font-semibold text-gray-900">Agent Comparative Analysis</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Accuracy (%) vs Total Processed across all agents</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={agents.map((a) => ({
                      name: a.name.length > 16 ? a.name.slice(0, 14) + "…" : a.name,
                      Accuracy: parseFloat(a.accuracy),
                      Processed: a.totalProcessed
                    }))}
                    margin={{ top: 4, right: 8, left: -10, bottom: 0 }}
                    barCategoryGap="30%">

                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="left" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} domain={[0, 100]} unit="%" />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e5e7eb" }}
                      formatter={(value, name) => [name === "Accuracy" ? `${value}%` : value, name]} />

                    <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                    <Bar yAxisId="left" dataKey="Accuracy" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="Processed" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
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
              </div>}
            </div>
        </div>

        {/* Filters */}
        




















































        {/* Pill Tabs + Controls */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full">
            {["agents", "activity"].map((tab) =>
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-[13px] font-medium rounded-full transition-all capitalize ${activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                {tab === "agents" ? "Agents" : "Activity"}
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
              {/* Filter Button */}
              <div className="relative">
                <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] font-medium transition-all ${showFilters || filterStage !== "all" || filterType !== "all" || filterStatus !== "all" ? "bg-gray-900 text-white border-gray-900" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                  <Filter className="w-3.5 h-3.5" />
                  Filter
                  {(filterStage !== "all" || filterType !== "all" || filterStatus !== "all") &&
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 ml-0.5" />
                }
                </button>
                {showFilters &&
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-20 p-4 flex flex-col gap-3">
                    <div>
                      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Stage</p>
                      <Select value={filterStage} onValueChange={setFilterStage}>
                        <SelectTrigger className="h-8 text-[12px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Stages</SelectItem>
                          <SelectItem value="Application Review">Application Review</SelectItem>
                          <SelectItem value="Technical Assessment">Technical Assessment</SelectItem>
                          <SelectItem value="Interview">Interview</SelectItem>
                          <SelectItem value="All Stages">All Stages</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Type</p>
                      <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="h-8 text-[12px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="evaluation">Evaluation</SelectItem>
                          <SelectItem value="operations">Operations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Status</p>
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="h-8 text-[12px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="idle">Idle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {(filterStage !== "all" || filterType !== "all" || filterStatus !== "all") &&
                <button
                  onClick={() => {setFilterStage("all");setFilterType("all");setFilterStatus("all");}}
                  className="text-[12px] text-red-500 hover:text-red-700 font-medium text-left">
                        Clear filters
                      </button>
                }
                  </div>
              }
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
                <button
                onClick={() => setViewMode("list")} className="bg-slate-400 text-white p-1.5 rounded-md flex items-center justify-center transition-all">

                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                onClick={() => setViewMode("pipeline")}
                className={`flex items-center justify-center p-1.5 rounded-md transition-all ${viewMode === "pipeline" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-700"}`}>
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
        </div>

        {/* Agents Pipeline / List */}
        {activeTab === "agents" && viewMode === "list" &&
        <div className="flex flex-col gap-4 pb-4">
            {filteredAgents.map((agent) => {
            const Icon = agent.icon;
            return (
              <div key={agent.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex">
                  {/* Left gradient icon panel */}
                  <div className="bg-gradient-to-br mx-4 my-4 rounded-2xl w-[294px] flex-shrink-0 from-blue-100 via-indigo-100 to-blue-200 flex items-center justify-center">
                    <div className="bg-slate-50 rounded-full w-16 h-16 shadow-sm flex items-center justify-center">
                      <Icon className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Right content */}
                  <div className="flex-1 px-6 py-5">
                    {/* Top row: stage, name, toggle, status, view details */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1">
                          {agent.stage} &bull; {agent.type}
                        </p>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-[20px] font-bold text-gray-900">{agent.name}</h3>
                          <Switch
                          checked={agent.isActive}
                          onCheckedChange={() => handleToggle(agent.id)} />

                          <div className="flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full ${agent.status === "active" ? "bg-emerald-500" : "bg-gray-400"}`} />
                            <span className="text-[12px] font-medium text-gray-600 capitalize">{agent.status}</span>
                          </div>
                        </div>
                        <p className="text-[13px] text-gray-500 leading-relaxed max-w-2xl">
                          {agent.description}. Analyses Inputs Against Defined Criteria. Filters Noise And Highlights High-Signal Candidates. Surfaces Structured Insights For Evaluation.
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0 flex gap-2">
                        <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                          Setup
                        </button>
                        <button
                        onClick={() => handleAgentClick(agent)}
                        className="px-4 py-1.5 border border-gray-200 rounded-lg text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="flex items-center gap-12 mt-4 mb-4">
                      <div>
                        <p className="text-[11px] text-gray-400 mb-0.5">Total Processed</p>
                        <p className="text-[22px] font-bold text-gray-900">{agent.totalProcessed.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 mb-0.5">Accuracy</p>
                        <p className="text-[22px] font-bold text-gray-900">{agent.accuracy}</p>
                      </div>
                    </div>

                    {/* Stack / Sub-agents */}
                    {agent.subAgents && agent.subAgents.length > 0 &&
                  <div>
                        <p className="text-[13px] font-bold text-gray-900 mb-2">Stack</p>
                        <div className="flex flex-col gap-2">
                          {agent.subAgents.map((sub) => {
                        const SubIcon = sub.icon;
                        return (
                          <div key={sub.id} className="bg-gray-50 rounded-xl px-4 py-3 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                                  <SubIcon className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[13px] font-semibold text-gray-900 mb-0.5">{sub.name}</p>
                                  <p className="text-[11px] text-gray-500 line-clamp-1">Analyses Inputs Against Defined Criteria. Filters Noise And Highlights High-Signal Candidates. Surfaces Structured Insights For Evaluation.</p>
                                </div>
                                <Switch className="flex-shrink-0" />
                                <button className="ml-2 text-gray-400 hover:text-blue-600 transition-colors flex-shrink-0">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                </button>
                              </div>);

                      })}
                        </div>
                      </div>
                  }
                  </div>
                </div>);

          })}
          </div>
        }

        <div className={`flex gap-4 overflow-x-auto pb-4 ${activeTab !== "agents" || viewMode !== "pipeline" ? "hidden" : ""}`}>
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

        {activeTab === "activity" &&
        <AgentActivityFeed />
        }

        {activeTab === "agents" && filteredAgents.length === 0 &&
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