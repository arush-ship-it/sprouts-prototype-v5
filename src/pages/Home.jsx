import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Briefcase, Mail, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

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
      </div>
    );
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

      <div className={`absolute inset-0 bg-gradient-to-br ${card.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">{card.title}</p>
            <h3 className="text-[32px] font-bold bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {card.value}
            </h3>
            <p className="text-[12px] text-gray-500 mt-1">{card.subtitle}</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          {card.chart}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
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
  const insightCards = [
  {
    title: "Candidates in Pipeline",
    subtitle: "Pipeline status",
    numericValue: 120,
    unit: "",
    badge: "↑",
    chartType: "line-orange",
    description: "Total candidates currently in your hiring pipeline."
  },
  {
    title: "New Applicants",
    subtitle: "This week",
    numericValue: 270,
    unit: "",
    chartType: "wave-blue",
    description: "New applicants received this week across all positions."
  },
  {
    title: "Resume processed this month",
    subtitle: "Total processed",
    numericValue: 270,
    unit: "",
    chartType: "wave-purple",
    description: "Total resumes processed and reviewed this month."
  }];


  const jobs = [
  { id: 1, title: "Senior Product Designer", department: "Design", applicants: 156, inPipeline: 34, status: "ACTIVE" },
  { id: 2, title: "Frontend Engineer", department: "Engineering", applicants: 203, inPipeline: 45, status: "ACTIVE" },
  { id: 3, title: "Product Manager", department: "Product", applicants: 89, inPipeline: 12, status: "ACTIVE" }];


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
          <div className="grid grid-cols-3 gap-4">
            {insightCards.map((card, i) => <InsightCard key={i} card={card} />)}
          </div>

          {/* All Jobs */}
          <div className="bg-white px-4 py-4 rounded-xl border border-gray-100 shadow-sm flex-1 min-h-0 overflow-hidden">
            <h2 className="text-[15px] font-semibold text-gray-800 mb-5">All Jobs</h2>
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
          <div className="opacity-100 rounded-2xl overflow-hidden shrink-0" style={{ background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 60%, #93c5fd 100%)", border: "5px solid white" }}>
            <div className="mt-5 mb-5 px-10 py-6 text-center flex flex-col items-center">
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
    <div className="py-1 rounded-lg flex items-center justify-between transition-all duration-200 border border-transparent"

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
        <span className="px-3 py-1 bg-green-100 text-green-700 text-[11px] font-semibold rounded-md">
          {job.status}
        </span>
      </div>
    </div>);

}

// ── Approval item ─────────────────────────────────────────────────────────────
function ApprovalItem({ item }) {
  return (
    <div className="flex items-start gap-3">
      




      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-gray-800 leading-snug">{item.text}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-slate-500 text-xs font-medium">{item.jobName}</span>
          
          <span className="text-[11px] text-orange-500">Pending {item.pendingSince}</span>
        </div>
      </div>
    </div>);
}