import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Briefcase, Mail, Calendar, Inbox } from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from
"recharts";

// ── Custom tooltip ────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-xl px-4 py-3 shadow-2xl">
        <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</p>
        {payload.map((entry, index) =>
        <p key={index} className="text-[14px] font-semibold" style={{ color: entry.color }}>
            {entry.value}
          </p>
        )}
      </div>);

  }
  return null;
};

// ── Insight card ──────────────────────────────────────────────────────────────
function InsightCard({ card, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative p-7 rounded-[20px] bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_${card.hoverShadow}] transition-all duration-500 overflow-hidden`}>

      <div className="bg-gradient-to-br opacity-0 rounded-none absolute inset-0 from-indigo-500/5 via-transparent to-violet-500/5 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-500 mb-2 text-xs font-normal capitalize tracking-wider">{card.title}</p>
            <h3 className="bg-clip-text text-slate-800 text-4xl font-medium from-gray-900 to-gray-600">
              {card.value}
            </h3>
            <p className="text-gray-700 mt-1 text-xs">{card.subtitle}</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          {card.chart}
        </ResponsiveContainer>
      </div>
    </motion.div>);

}

// ── Pipeline fill bar ─────────────────────────────────────────────────────────
function PipelineBar({ value, total }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {setTimeout(() => setWidth(value / total * 100), 300);}, [value, total]);
  return (
    <div className="w-full bg-gray-100 rounded-full h-1 mt-1.5">
      <div className="h-1 rounded-full bg-blue-400 transition-all duration-700 ease-out" style={{ width: `${width}%` }} />
    </div>);

}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();
  const pipelineData = [
  { stage: "Applied", count: 342 },
  { stage: "Screening", count: 156 },
  { stage: "Assessment", count: 89 },
  { stage: "Interview", count: 45 },
  { stage: "Offer", count: 12 }];

  const applicantsData = [
  { week: "W1", count: 45 },
  { week: "W2", count: 62 },
  { week: "W3", count: 38 },
  { week: "W4", count: 28 }];

  const resumesData = [
  { month: "Jan", count: 120 },
  { month: "Feb", count: 156 },
  { month: "Mar", count: 142 },
  { month: "Apr", count: 134 }];


  const insightCards = [
  {
    title: "Candidates in Pipeline",
    subtitle: "Across all jobs",
    value: "342",
    hoverShadow: "rgba(99,102,241,0.12)",
    hoverGradient: "from-indigo-500/5 via-transparent to-violet-500/5",
    chart:
    <BarChart data={pipelineData}>
        <defs>
          <linearGradient id="pipelineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.6} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" strokeOpacity={0.5} vertical={false} />
        <XAxis dataKey="stage" tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
        <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.05)' }} />
        <Bar dataKey="count" fill="url(#pipelineGrad)" radius={[8, 8, 0, 0]} maxBarSize={40} />
      </BarChart>

  },
  {
    title: "New Applicants",
    subtitle: "To be reviewed this week",
    value: "28",
    hoverShadow: "rgba(249,115,22,0.12)",
    hoverGradient: "from-orange-500/5 via-transparent to-amber-500/5",
    chart:
    <BarChart data={applicantsData}>
        <defs>
          <linearGradient id="applicantsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f97316" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#fb923c" stopOpacity={0.6} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" strokeOpacity={0.5} vertical={false} />
        <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
        <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(249,115,22,0.05)' }} />
        <Bar dataKey="count" fill="url(#applicantsGrad)" radius={[8, 8, 0, 0]} maxBarSize={40} />
      </BarChart>

  },
  {
    title: "Resumes Processed This Month",
    subtitle: "+18% from last month",
    value: "156",
    hoverShadow: "rgba(236,72,153,0.12)",
    hoverGradient: "from-pink-500/5 via-transparent to-rose-500/5",
    chart:
    <LineChart data={resumesData}>
        <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" strokeOpacity={0.5} vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
        <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="count" stroke="#ec4899" strokeWidth={3}
      dot={{ fill: '#ec4899', strokeWidth: 2, r: 5, stroke: '#fff' }}
      activeDot={{ r: 7, fill: '#ec4899', stroke: '#fff', strokeWidth: 2 }} />
      </LineChart>

  }];


  const jobs = [
  { id: 1, title: "Senior Product Designer", department: "Design", applicants: 156, inPipeline: 34, status: "ACTIVE", unreadEmails: 7 },
  { id: 2, title: "Frontend Engineer", department: "Engineering", applicants: 203, inPipeline: 45, status: "ACTIVE", unreadEmails: 14 },
  { id: 3, title: "Product Manager", department: "Product", applicants: 89, inPipeline: 12, status: "ACTIVE", unreadEmails: 2 },
  { id: 4, title: "Backend Engineer", department: "Engineering", applicants: 134, inPipeline: 28, status: "ACTIVE", unreadEmails: 5 }];


  const approvals = [
  { id: 1, text: "3 candidates moved to interview stage", jobName: "Senior Product Designer", jobId: "JOB-1042", pendingSince: "1 hour ago" },
  { id: 2, text: "Resume screening completed for 12 applicants", jobName: "Frontend Engineer", jobId: "JOB-1038", pendingSince: "3 hours ago" },
  { id: 3, text: "5 candidates auto-qualified for screening", jobName: "Product Manager", jobId: "JOB-1031", pendingSince: "6 hours ago" },
  { id: 4, text: "3 candidates moved to interview stage", jobName: "Senior Product Designer", jobId: "JOB-1042", pendingSince: "8 hours ago" },
  { id: 5, text: "Resume screening completed for 12 applicants", jobName: "Frontend Engineer", jobId: "JOB-1038", pendingSince: "1 day ago" }];


  return (
    <div className="bg-[#f2f3f5] px-6 py-6 h-full overflow-hidden flex flex-col">
      {/* Welcome */}
      <div className="mb-6 pt-4 flex items-center justify-between">
        <h1 className="text-gray-900 text-2xl font-medium">Hello, Welcome To SproutsAI</h1>
        <div className="flex gap-3">
          <button onClick={() => navigate(createPageUrl("Settings") + "?tab=integrations")} className="bg-white text-gray-700 px-4 py-2 text-xs font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2"><Mail className="w-4 h-4" /> Connect Email</button>
          <button onClick={() => navigate(createPageUrl("Settings") + "?tab=integrations")} className="bg-white text-gray-700 px-4 py-2 text-xs font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2"><Calendar className="w-4 h-4" /> Connect Calendar</button>
          <button onClick={() => navigate(createPageUrl("Settings") + "?tab=integrations")} className="bg-white text-gray-700 px-4 py-2 text-xs font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2">⚡ Integrated with Greenhouse</button>
        </div>
      </div>

      {/* Main 2-col layout */}
      <div className="flex gap-6 flex-1 min-h-0">
        {/* Left column */}
        <div className="flex-1 min-w-0 flex flex-col gap-4 min-h-0 overflow-hidden">
          {/* 4 insight cards */}
          <div className="rounded-none grid grid-cols-3 gap-4">
            {insightCards.map((card, i) => <InsightCard key={i} card={card} index={i} />)}
          </div>

          {/* All Jobs */}
          <div className="bg-white px-4 py-4 rounded-xl border border-gray-100 shadow-sm flex-1 min-h-0 overflow-hidden">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-[15px] font-semibold text-gray-800">All Jobs</h2>
              <span className="bg-[#ffffff] text-green-600 px-2 py-0.5 text-xs font-medium rounded-md">{jobs.filter((j) => j.status === "ACTIVE").length} Active</span>
              <span className="bg-[#ffffff] text-slate-500 px-2 py-0.5 text-xs font-medium rounded-md">{jobs.filter((j) => j.status === "CLOSED").length} Closed</span>
              <span className="bg-transparent text-slate-500 px-2 py-0.5 text-xs font-medium rounded-md">{jobs.filter((j) => j.status === "DRAFT").length} Drafts</span>
            </div>
            <div className="space-y-1">
              {jobs.map((job) =>
              <JobRow key={job.id} job={job} />
              )}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="w-[403px] shrink-0 flex flex-col gap-4 min-h-0 overflow-hidden">
          {/* Ad Banner */}
          <div className="pt-5 opacity-100 rounded-2xl overflow-hidden shrink-0" style={{ background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 60%, #93c5fd 100%)", border: "5px solid white" }}>
            <div className="mt-5 mb-5 px-8 py-6 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                <Mail className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-zinc-700 mb-1 text-base font-semibold leading-snug">Communication Optimised For One Click
              </h3>
              <p className="text-[12px] text-gray-500 mb-5">AI-crafted sequences tailored &amp; ready to send in seconds</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-medium px-6 py-2.5 rounded-xl flex items-center gap-2 transition-colors">
                <Mail className="w-4 h-4" /> Integrate Email Now
              </button>
              <div className="flex gap-1.5 mt-5">
                {[0, 1, 2, 3, 4].map((i) => <div key={i} className={`rounded-full ${i === 0 ? "w-2 h-2 bg-blue-600" : "w-2 h-2 bg-blue-300"}`} />
                )}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white px-4 py-4 rounded-xl border border-gray-100 shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden">
            <h2 className="text-[15px] font-semibold text-gray-800 mb-5">Pending Approvals</h2>
            <div className="space-y-4">
              {approvals.map((item) =>
              <ApprovalItem key={item.id} item={item} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>);

}

// ── Job row (extracted to avoid hooks-in-map) ─────────────────────────────────
function JobRow({ job }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="py-3 px-2 rounded-lg flex items-center justify-between transition-all duration-200 border border-transparent"

    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}>

      <div className="flex items-center gap-3">
        <div className="bg-gray-100 rounded-[20px] w-9 h-9 flex items-center justify-center transition-colors">
          <Briefcase className={`w-4 h-4 transition-colors ${hovered ? "text-blue-500" : "text-gray-500"}`} />
        </div>
        <div>
          <Link to={createPageUrl("Console") + `?jobId=${job.id}`}>
            <p className="text-[14px] font-medium text-gray-800 hover:text-blue-600">{job.title}</p>
          </Link>
          <p className="text-[11px] text-gray-400">{job.department}</p>
        </div>
      </div>
      <div className="flex items-center gap-8">
      <div className="text-center">
        <p className="text-[15px] font-bold text-gray-800">{job.applicants}</p>
        <p className="text-[10px] text-gray-400">Applicants</p>
      </div>
      <div className="text-center min-w-[64px]">
        <p className="text-[15px] font-bold text-blue-600">{job.inPipeline}</p>
        <p className="text-[10px] text-gray-400">In Pipeline</p>
        <PipelineBar value={job.inPipeline} total={job.applicants} />
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-500">
        <Mail className="w-3 h-3" />
        {job.unreadEmails} unread
      </div>
      <button className="flex items-center justify-center w-7 h-7 rounded-lg border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200">
        <Inbox className="w-3.5 h-3.5" />
      </button>
      <span className="px-3 py-1 bg-green-100 text-green-700 text-[11px] font-semibold rounded-md">
        {job.status}
      </span>
      </div>
    </div>);

}

// ── Approval item ─────────────────────────────────────────────────────────────
function ApprovalItem({ item }) {
  return (
    <div className="bg-transparent p-3 rounded-xl flex items-start gap-3 hover:bg-gray-100/80 transition-colors duration-200 group">
      <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Briefcase className="w-3.5 h-3.5 text-orange-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-gray-800 leading-snug">{item.text}</p>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white border border-gray-200 text-slate-600 text-[11px] font-medium">{item.jobName}</span>
          <span className="inline-flex items-center gap-1 text-[11px] text-orange-500 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
            Pending {item.pendingSince}
          </span>
        </div>
      </div>
    </div>);
}