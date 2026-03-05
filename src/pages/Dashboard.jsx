import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
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

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-xl px-4 py-3 shadow-2xl">
        <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</p>
        {payload.map((entry, index) =>
        <p key={index} className="text-[14px] font-semibold" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        )}
      </div>);

  }
  return null;
};


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
                  
                </Link>
                <h1 className="text-gray-700 text-2xl font-semibold">Analytics Dashboard</h1>
              </div>
              <Button
                onClick={() => setIsChatMinimized(false)}
                variant="outline"
                size="sm" className="bg-blue-600 text-[#ffffff] px-3 text-xs font-medium rounded-md inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-8 gap-2">


                <Sparkles className="w-4 h-4" />
                Deep Dive with AI
              </Button>
            </div>
            <p className="text-gray-500 px-1 text-sm">Overview of all recruitment activities

            </p>
          </div>

          {/* Data Visualizations */}
          <div className="grid grid-cols-3 gap-5 mb-8">
            {/* Pipeline Funnel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              className="group relative p-7 rounded-[20px] bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(99,102,241,0.12)] transition-all duration-500 overflow-hidden">

              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Pipeline Funnel</p>
                    <h3 className="text-[32px] font-bold bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      342
                    </h3>
                    <p className="text-[12px] text-gray-500 mt-1">Total candidates</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={pipelineFunnelData}>
                    <defs>
                      <linearGradient id="pipelineGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.6} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" strokeOpacity={0.5} vertical={false} />
                    <XAxis
                      dataKey="stage"
                      tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0', strokeWidth: 1 }} />

                    <YAxis
                      tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
                      tickLine={false}
                      axisLine={false} />

                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }} />
                    <Bar
                      dataKey="count"
                      fill="url(#pipelineGradient)"
                      radius={[8, 8, 0, 0]}
                      maxBarSize={50} />

                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* New Applications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative p-7 rounded-[20px] bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(249,115,22,0.12)] transition-all duration-500 overflow-hidden">

              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">New Applications</p>
                    <h3 className="text-[32px] font-bold bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      28
                    </h3>
                    <p className="text-[12px] text-gray-500 mt-1">To be reviewed</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={newApplicationsData}>
                    <defs>
                      <linearGradient id="applicationsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f97316" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#fb923c" stopOpacity={0.6} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" strokeOpacity={0.5} vertical={false} />
                    <XAxis
                      dataKey="week"
                      tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0', strokeWidth: 1 }} />

                    <YAxis
                      tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
                      tickLine={false}
                      axisLine={false} />

                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(249, 115, 22, 0.05)' }} />
                    <Bar
                      dataKey="count"
                      fill="url(#applicationsGradient)"
                      radius={[8, 8, 0, 0]}
                      maxBarSize={50} />

                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Resumes Processed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative p-7 rounded-[20px] bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(236,72,153,0.12)] transition-all duration-500 overflow-hidden">

              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Resumes Processed</p>
                    <h3 className="text-[32px] font-bold bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      156
                    </h3>
                    <p className="text-[12px] text-gray-500 mt-1">+18% from last month</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={resumesProcessedData}>
                    <defs>
                      <linearGradient id="resumesGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#f472b6" stopOpacity={0.2} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" strokeOpacity={0.5} vertical={false} />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0', strokeWidth: 1 }} />

                    <YAxis
                      tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
                      tickLine={false}
                      axisLine={false} />

                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#ec4899"
                      strokeWidth={3}
                      dot={{ fill: '#ec4899', strokeWidth: 2, r: 5, stroke: '#fff' }}
                      activeDot={{ r: 7, fill: '#ec4899', stroke: '#fff', strokeWidth: 2 }} />

                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Monthly Trends */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group relative p-7 rounded-[20px] bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(139,92,246,0.12)] transition-all duration-500 overflow-hidden">

              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Monthly Processing</p>
                    <div className="flex items-baseline gap-3">
                      <div>
                        <h3 className="text-[28px] font-bold bg-gradient-to-br from-violet-600 to-violet-400 bg-clip-text text-transparent">
                          23
                        </h3>
                        <p className="text-[10px] text-gray-500">JDs</p>
                      </div>
                      <div>
                        <h3 className="text-[28px] font-bold bg-gradient-to-br from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                          156
                        </h3>
                        <p className="text-[10px] text-gray-500">Resumes</p>
                      </div>
                    </div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" strokeOpacity={0.5} vertical={false} />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0', strokeWidth: 1 }} />

                    <YAxis
                      tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
                      tickLine={false}
                      axisLine={false} />

                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="jd"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      name="JD"
                      dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 5, stroke: '#fff' }}
                      activeDot={{ r: 7, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }} />

                    <Line
                      type="monotone"
                      dataKey="resumes"
                      stroke="#10b981"
                      strokeWidth={3}
                      name="Resumes"
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 5, stroke: '#fff' }}
                      activeDot={{ r: 7, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }} />

                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Source Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="group relative p-7 rounded-[20px] bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(99,102,241,0.12)] transition-all duration-500 overflow-hidden">

              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-violet-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="mb-6">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Source Breakdown</p>
                  <h3 className="text-[32px] font-bold bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    45%
                  </h3>
                  <p className="text-[12px] text-gray-500 mt-1">Direct applications</p>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <RechartsPieChart>
                    <defs>
                      {sourceData.map((entry, index) =>
                      <linearGradient key={index} id={`sourceGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={entry.color} stopOpacity={0.9} />
                          <stop offset="100%" stopColor={entry.color} stopOpacity={0.6} />
                        </linearGradient>
                      )}
                    </defs>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value">
                      {sourceData.map((entry, index) =>
                      <Cell key={`cell-${index}`} fill={`url(#sourceGradient${index})`} stroke="#fff" strokeWidth={2} />
                      )}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-3 mt-4">
                  {sourceData.map((item, idx) =>
                  <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200/50">
                      <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                      <span className="text-[11px] font-medium text-gray-700">{item.name}</span>
                      <span className="text-[11px] font-bold" style={{ color: item.color }}>{item.value}%</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Applicants per Job Posting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="group relative p-7 rounded-[20px] bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(59,130,246,0.12)] transition-all duration-500 overflow-hidden">

              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="mb-6">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Applicants per Job</p>
                  <h3 className="text-[32px] font-bold bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    203
                  </h3>
                  <p className="text-[12px] text-gray-500 mt-1">Frontend Engineer (highest)</p>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={applicantsPerJobData} layout="vertical">
                    <defs>
                      <linearGradient id="jobsGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.6} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" strokeOpacity={0.5} horizontal={false} />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0', strokeWidth: 1 }} />

                    <YAxis
                      dataKey="job"
                      type="category"
                      tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
                      width={100}
                      tickLine={false}
                      axisLine={false} />

                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }} />
                    <Bar
                      dataKey="count"
                      fill="url(#jobsGradient)"
                      radius={[0, 8, 8, 0]}
                      maxBarSize={30} />

                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Key Metrics Grid */}
          



















          {/* All Jobs */}
          










































          {/* Grid: Messages & Activity */}
          






























































        </div>

        {/* Analytics Chat Panel */}
        <div className={`bg-white mx-2 my-2 rounded-2xl border-l border-gray-200 flex flex-col transition-all duration-300 ${
        isChatMinimized ? "hidden" : "w-[456px]"}`
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