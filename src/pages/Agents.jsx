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
  Minimize2,
  Maximize2,
  TrendingDown,
  Zap } from
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
  const isOperations = agent.type === "operations";

  return (
    <div className="rounded-2xl bg-white border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all overflow-hidden">
      {/* Large Icon Area */}
      <div className="bg-[#f8ff94] pt-8 pb-12 px-4 from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center border-t-[16px] border-l-[16px] border-r-[16px] border-white">
        
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-[15px] font-semibold text-gray-900 mb-1">
          {agent.name}
        </h3>
        
        {/* Status Badge */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className={`w-2 h-2 rounded-full ${agent.status === "active" ? "bg-emerald-500" : "bg-gray-400"}`} />
          <span className="text-[12px] text-emerald-600 font-medium capitalize">{agent.status}</span>
        </div>

        <p className="text-[12px] text-gray-600 mb-4 line-clamp-2 min-h-[36px]">
          {agent.description}
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="text-[11px] text-gray-500 mb-1">Total processed</p>
            <p className="text-[20px] font-semibold text-gray-900">{agent.totalProcessed}</p>
          </div>
          <div>
            <p className="text-[11px] text-gray-500 mb-1">Accuracy</p>
            <p className="text-[20px] font-semibold text-gray-900">{agent.accuracy}</p>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-end">
          <Button
            onClick={onClick} className="bg-slate-50 text-blue-600 px-6 py-2 font-medium opacity-100 rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow hover:bg-[#2D3748] h-10">


            Setup & Deploy
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
  const [isAnalyticsExpanded, setIsAnalyticsExpanded] = useState(true);

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
          <h1 className="text-[22px] font-semibold text-gray-900">Agents</h1>
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
        <div className={`mb-6 rounded-xl border border-gray-200 bg-white transition-all duration-300 ${
        isAnalyticsExpanded ? "p-6" : "p-4"}`
        }>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-semibold text-gray-900">
                  {isAnalyticsExpanded ? "Analytics Dashboard" : "Analytics Dashboard - Click to Expand"}
                </h3>
                {!isAnalyticsExpanded &&
                <p className="text-[12px] text-gray-600 mt-0.5">View agent performance insights</p>
                }
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8"
              onClick={() => setIsAnalyticsExpanded(!isAnalyticsExpanded)}>

              {isAnalyticsExpanded ?
              <Minimize2 className="w-4 h-4" /> :

              <Maximize2 className="w-4 h-4" />
              }
            </Button>
          </div>

          {isAnalyticsExpanded &&
          <div className="mt-6 space-y-6">
              {/* Overall Metrics */}
              <div>
                <h4 className="text-[13px] font-semibold text-gray-900 mb-3">Overall Performance</h4>
                <div className="grid grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-emerald-600" />
                      <p className="text-[11px] font-medium text-emerald-700">Total Processed</p>
                    </div>
                    <p className="text-[28px] font-bold text-emerald-900">{totalProcessed.toLocaleString()}</p>
                    <p className="text-[10px] text-emerald-600 mt-1">+12% from last month</p>
                  </div>

                  <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-indigo-600" />
                      <p className="text-[11px] font-medium text-indigo-700">Avg Accuracy</p>
                    </div>
                    <p className="text-[28px] font-bold text-indigo-900">{avgAccuracy}%</p>
                    <p className="text-[10px] text-indigo-600 mt-1">+2.3% from last month</p>
                  </div>

                  <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <p className="text-[11px] font-medium text-blue-700">Active Agents</p>
                    </div>
                    <p className="text-[28px] font-bold text-blue-900">{activeAgents}/{agents.length}</p>
                    <p className="text-[10px] text-blue-600 mt-1">{(activeAgents / agents.length * 100).toFixed(0)}% deployment rate</p>
                  </div>

                  <div className="p-4 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
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
                <div className="col-span-2 p-5 rounded-lg bg-white border border-gray-200">
                  <h4 className="text-[13px] font-semibold text-gray-900 mb-4">Activity & Success Trends</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                      <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                      <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Line yAxisId="left" type="monotone" dataKey="processed" stroke="#6366f1" strokeWidth={2} name="Processed" />
                      <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} name="Accuracy %" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Agent Type Distribution */}
                <div className="p-5 rounded-lg bg-white border border-gray-200">
                  <h4 className="text-[13px] font-semibold text-gray-900 mb-4">Agent Types</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                      data={typeDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value">

                        {typeDistribution.map((entry, index) =>
                      <Cell key={`cell-${index}`} fill={entry.color} />
                      )}
                      </Pie>
                      <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex items-center justify-center gap-4 mt-2">
                    {typeDistribution.map((item) =>
                  <div key={item.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[11px] text-gray-600">{item.name}: {item.value}</span>
                      </div>
                  )}
                  </div>
                </div>
              </div>

              {/* Top and Under Performers */}
              <div className="grid grid-cols-2 gap-4">
                {/* Top Performers */}
                























                {/* Under Performers */}
                






















              </div>
            </div>
          }
        </div>

        {/* Filters */}
        <div className="flex items-center justify-end gap-3 mb-6">
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

          {(filterStage !== "all" || filterType !== "all" || filterStatus !== "all") &&
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-[11px]"
            onClick={() => {
              setFilterStage("all");
              setFilterType("all");
              setFilterStatus("all");
            }}>

              Clear Filters
            </Button>
          }
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-3 gap-4">
          {filteredAgents.map((agent) =>
          <AgentCard
            key={agent.id}
            agent={agent}
            onToggle={handleToggle}
            onClick={() => handleAgentClick(agent)} />

          )}
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