import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Users,
  FileText,
  TrendingUp,
  Mail,
  CheckSquare,
  Briefcase,
  Send,
  Sparkles,
  PieChart,
  Minimize2,
  Maximize2,
  Bell,
  Settings,
  User,
  ChevronLeft } from
"lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import TabSwitcher from "@/components/shared/TabSwitcher";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer } from
"recharts";

const analyticsCards = [
{
  id: 1,
  title: "Applicants per Job Posting",
  value: "45.2",
  subtitle: "Average per posting",
  icon: Users,
  color: "text-blue-600",
  bg: "bg-blue-50"
},
{
  id: 2,
  title: "JD Processed This Month",
  value: "23",
  subtitle: "+12% from last month",
  icon: FileText,
  color: "text-violet-600",
  bg: "bg-violet-50"
},
{
  id: 3,
  title: "Candidates in Pipeline",
  value: "342",
  subtitle: "Across all jobs",
  icon: TrendingUp,
  color: "text-emerald-600",
  bg: "bg-emerald-50"
},
{
  id: 4,
  title: "New Applications",
  value: "28",
  subtitle: "To be reviewed",
  icon: CheckSquare,
  color: "text-orange-600",
  bg: "bg-orange-50"
},
{
  id: 5,
  title: "Resumes Processed This Month",
  value: "156",
  subtitle: "+18% from last month",
  icon: FileText,
  color: "text-pink-600",
  bg: "bg-pink-50"
},
{
  id: 6,
  title: "Application Source Breakdown",
  value: "Direct: 45%",
  subtitle: "LinkedIn: 35%, Others: 20%",
  icon: PieChart,
  color: "text-amber-600",
  bg: "bg-amber-50"
}];


const jobs = [
{
  id: 1,
  title: "Senior Product Designer",
  department: "Design",
  applicants: 156,
  inPipeline: 34,
  status: "Active"
},
{
  id: 2,
  title: "Frontend Engineer",
  department: "Engineering",
  applicants: 203,
  inPipeline: 45,
  status: "Active"
},
{
  id: 3,
  title: "Product Manager",
  department: "Product",
  applicants: 89,
  inPipeline: 12,
  status: "Active"
}];


const messages = [
{
  id: 1,
  candidate: "Maya Johnson",
  subject: "Interview Follow-up",
  time: "2 hours ago",
  unread: true
},
{
  id: 2,
  candidate: "Alex Chen",
  subject: "Application Status Inquiry",
  time: "5 hours ago",
  unread: true
},
{
  id: 3,
  candidate: "Sarah Mitchell",
  subject: "Thank You Note",
  time: "1 day ago",
  unread: false
}];


const activities = [
{
  id: 1,
  type: "approval",
  description: "3 candidates moved to interview stage",
  time: "1 hour ago"
},
{
  id: 2,
  type: "agent",
  description: "Resume screening completed for 12 applicants",
  time: "3 hours ago"
},
{
  id: 3,
  type: "automation",
  description: "5 candidates auto-qualified for screening",
  time: "5 hours ago"
}];


const pipelineFunnelData = [
{ stage: "Applied", count: 342 },
{ stage: "Screening", count: 156 },
{ stage: "Assessment", count: 89 },
{ stage: "Interview", count: 45 },
{ stage: "Offer", count: 12 }];

const newApplicationsData = [
{ week: "W1", count: 45 },
{ week: "W2", count: 62 },
{ week: "W3", count: 38 },
{ week: "W4", count: 28 }];

const monthlyData = [
{ month: "Jan", jd: 18, resumes: 120 },
{ month: "Feb", jd: 23, resumes: 156 },
{ month: "Mar", jd: 21, resumes: 142 },
{ month: "Apr", jd: 19, resumes: 134 }];

const resumesProcessedData = [
{ month: "Jan", count: 120 },
{ month: "Feb", count: 156 },
{ month: "Mar", count: 142 },
{ month: "Apr", count: 134 }];

const applicantsPerJobData = [
{ job: "Product Designer", count: 156 },
{ job: "Frontend Eng", count: 203 },
{ job: "Product Manager", count: 89 },
{ job: "Backend Eng", count: 134 }];

const sourceData = [
{ name: "Direct", value: 45, color: "#6366f1" },
{ name: "LinkedIn", value: 35, color: "#8b5cf6" },
{ name: "Referral", value: 12, color: "#ec4899" },
{ name: "Others", value: 8, color: "#f59e0b" }];


export default function Dashboard() {
  const [isChatMinimized, setIsChatMinimized] = useState(true);
  const [chatMessages, setChatMessages] = useState([
  {
    role: "assistant",
    content: "Hi! I'm your analytics assistant. Ask me anything about your recruitment data."
  }]
  );
  const [chatInput, setChatInput] = useState("");

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { role: "user", content: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "Based on the data, your top performing source is direct applications at 45%. Your conversion rate from screening to interview is around 29%."
      }]
      );
    }, 500);
  };

  return (
    <div className="flex flex-col h-screen bg-[#FAFAFA]">
      {/* Top Navigation */}
      

















      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto px-8 pt-6 pb-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Link to={createPageUrl("Home")}>
                  <ChevronLeft className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900" />
                </Link>
                <h1 className="text-[28px] font-bold text-gray-900">Analytics Dashboard</h1>
              </div>
              <Button
                onClick={() => setIsChatMinimized(false)}
                variant="outline"
                size="sm"
                className="gap-2">

                <Sparkles className="w-4 h-4" />
                Deep Dive with AI
              </Button>
            </div>
            <p className="text-gray-500 px-8 text-sm">Overview of all recruitment activities

            </p>
          </div>

          {/* Data Visualizations */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {/* Pipeline Funnel */}
            <div className="p-4 rounded-xl bg-white border border-gray-200">
              <h3 className="text-[14px] font-semibold text-gray-900 mb-4">
                Candidates in Pipeline Funnel
              </h3>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={pipelineFunnelData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="stage" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* New Applications */}
            <div className="p-4 rounded-xl bg-white border border-gray-200">
              <h3 className="text-[14px] font-semibold text-gray-900 mb-4">
                New Applications (To Be Reviewed)
              </h3>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={newApplicationsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Resumes Processed */}
            <div className="p-4 rounded-xl bg-white border border-gray-200">
              <h3 className="text-[14px] font-semibold text-gray-900 mb-4">
                Resumes Processed Per Month
              </h3>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={resumesProcessedData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#ec4899" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly Trends */}
            <div className="p-4 rounded-xl bg-white border border-gray-200">
              <h3 className="text-[14px] font-semibold text-gray-900 mb-4">
                JD & Resume Processing/Month
              </h3>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="jd" stroke="#8b5cf6" strokeWidth={2} name="JD" />
                  <Line type="monotone" dataKey="resumes" stroke="#10b981" strokeWidth={2} name="Resumes" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Source Breakdown */}
            <div className="p-4 rounded-xl bg-white border border-gray-200">
              <h3 className="text-[14px] font-semibold text-gray-900 mb-4">
                Application Source Breakdown
              </h3>
              <ResponsiveContainer width="100%" height={160}>
                <RechartsPieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value">

                    {sourceData.map((entry, index) =>
                    <Cell key={`cell-${index}`} fill={entry.color} />
                    )}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 mt-3">
                {sourceData.map((item, idx) =>
                <div key={idx} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] text-gray-600">{item.name} {item.value}%</span>
                  </div>
                )}
              </div>
            </div>

            {/* Applicants per Job Posting */}
            <div className="p-4 rounded-xl bg-white border border-gray-200">
              <h3 className="text-[14px] font-semibold text-gray-900 mb-4">
                Applicants per Job Posting
              </h3>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={applicantsPerJobData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" tick={{ fontSize: 10 }} />
                  <YAxis dataKey="job" type="category" tick={{ fontSize: 10 }} width={80} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Key Metrics Grid */}
          



















          {/* All Jobs */}
          










































          {/* Grid: Messages & Activity */}
          






























































        </div>

        {/* Analytics Chat Panel */}
        <div className={`bg-white mx-2 my-2 rounded-2xl border-l border-gray-200 flex flex-col transition-all duration-300 ${
        isChatMinimized ? "w-[60px]" : "w-[380px]"}`
        }>




          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            {!isChatMinimized ?
            <>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold text-gray-900">
                      Analytics Assistant
                    </h3>
                    <p className="text-[11px] text-gray-500">Ask about your data</p>
                  </div>
                </div>
                <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={() => setIsChatMinimized(true)}>

                  <Minimize2 className="w-4 h-4" />
                </Button>
              </> :

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 mx-auto"
              onClick={() => setIsChatMinimized(false)}>

                <Maximize2 className="w-4 h-4" />
              </Button>
            }
          </div>

          {!isChatMinimized &&
          <>
              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {chatMessages.map((msg, idx) =>
              <div
                key={idx}
                className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"}`
                }>

                    <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-[12px] ${
                  msg.role === "user" ?
                  "bg-indigo-600 text-white" :
                  "bg-gray-100 text-gray-900"}`
                  }>

                      {msg.content}
                    </div>
                  </div>
              )}
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <Textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendChat();
                    }
                  }}
                  placeholder="Ask about metrics..."
                  className="resize-none text-[12px]"
                  rows={2} />

                  <Button onClick={handleSendChat} size="icon" className="shrink-0 h-9 w-9">
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </>
          }
        </div>
      </div>
    </div>);

}