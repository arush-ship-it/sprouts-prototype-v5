import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Briefcase, Mail, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

// ── Animated counter ──────────────────────────────────────────────────────────
function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const num = parseFloat(target);
    if (isNaN(num)) {setCount(target);return;}
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Number.isInteger(num) ? Math.round(eased * num) : (eased * num).toFixed(0));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return count;
}

// ── SVG line chart (upward trending, orange) ─────────────────────────────────
function LineChartOrange({ width = 160, height = 72 }) {
  const id = "orangeGrad";
  // Simple upward line from bottom-left to top-right
  const pts = [
    { x: 10, y: 62 },
    { x: 40, y: 58 },
    { x: 70, y: 50 },
    { x: 100, y: 38 },
    { x: 130, y: 22 },
    { x: 150, y: 10 },
  ];
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const cx = (pts[i].x + pts[i + 1].x) / 2;
    d += ` C ${cx} ${pts[i].y}, ${cx} ${pts[i + 1].y}, ${pts[i + 1].x} ${pts[i + 1].y}`;
  }
  const fillPath = `${d} L ${pts[pts.length - 1].x} ${height} L ${pts[0].x} ${height} Z`;
  const last = pts[pts.length - 1];
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ pointerEvents: "none", overflow: "visible" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={fillPath} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Glow dot */}
      <circle cx={last.x} cy={last.y} r="10" fill="#ef4444" fillOpacity="0.15" />
      <circle cx={last.x} cy={last.y} r="5" fill="#ef4444" />
    </svg>
  );
}

// ── SVG wave chart (blue bell curve) ─────────────────────────────────────────
function WaveChartBlue({ width = 160, height = 72 }) {
  const id = "blueWaveGrad";
  // Bell/wave curve: starts low, peaks in middle, comes back down
  const d = `M 5 65 C 30 65, 50 60, 65 25 C 75 5, 85 5, 95 25 C 110 60, 130 65, 155 65`;
  const fillPath = `${d} L 155 ${height} L 5 ${height} Z`;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ pointerEvents: "none", overflow: "visible" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.02" />
        </linearGradient>
        <filter id="blueGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path d={fillPath} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#blueGlow)" />
      {/* Glowing dot at peak */}
      <circle cx="80" cy="15" r="14" fill="#3b82f6" fillOpacity="0.2" />
      <circle cx="80" cy="15" r="8" fill="#3b82f6" fillOpacity="0.4" />
      <circle cx="80" cy="15" r="5" fill="#3b82f6" />
    </svg>
  );
}

// ── SVG wave chart (purple/violet) ───────────────────────────────────────────
function WaveChartPurple({ width = 160, height = 72 }) {
  const id = "purpleWaveGrad";
  // Slightly different wave shape - two humps, peaking on the right
  const d = `M 5 65 C 20 65, 35 55, 50 40 C 60 28, 65 28, 75 40 C 85 52, 90 52, 105 30 C 118 10, 130 8, 155 12`;
  const fillPath = `${d} L 155 ${height} L 5 ${height} Z`;
  const peakX = 130;
  const peakY = 8;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ pointerEvents: "none", overflow: "visible" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.02" />
        </linearGradient>
        <filter id="purpleGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path d={fillPath} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#purpleGlow)" />
      {/* Glowing dot at peak */}
      <circle cx={peakX} cy={peakY} r="14" fill="#a855f7" fillOpacity="0.15" />
      <circle cx={peakX} cy={peakY} r="8" fill="#a855f7" fillOpacity="0.35" />
      <circle cx={peakX} cy={peakY} r="5" fill="#a855f7" />
    </svg>
  );
}

// ── Insight card ──────────────────────────────────────────────────────────────
function InsightCard({ card }) {
  const animated = useCountUp(card.numericValue);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 p-5 flex flex-col justify-between transition-all duration-200 cursor-default ${hovered ? "shadow-md -translate-y-0.5" : "shadow-sm"}`}
      style={{ minHeight: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <p className="text-[13px] font-semibold text-gray-700">{card.title}</p>
        


      </div>
      <p className="text-[11px] text-gray-400 mb-3">{card.subtitle}</p>

      {/* Value + chart */}
      <div className="py-5 flex flex-col gap-4 flex-1 min-w-0">
        <div className="min-w-0">
          <div className="flex items-end gap-1">
            <span className="text-gray-900 text-3xl font-medium">{animated}{card.unit}</span>
            {card.badge &&
            <span className="mb-1 text-[11px] font-semibold text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded-full">
                {card.badge}
              </span>
            }
          </div>
        </div>
        <div className="self-center flex items-center justify-center overflow-hidden w-full" style={{ height: 90 }}>
          {card.chartType === "line-orange" && <LineChartOrange width={220} height={72} />}
          {card.chartType === "wave-blue" && <WaveChartBlue width={220} height={72} />}
          {card.chartType === "wave-purple" && <WaveChartPurple width={220} height={72} />}
        </div>
      </div>

      {/* Footer description */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
        <p className="text-[11px] text-gray-400 leading-snug max-w-[70%]">{card.description}</p>
        <button className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-50 transition-colors">
          <span className="text-gray-400 text-[14px] leading-none">›</span>
        </button>
      </div>
    </div>);

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