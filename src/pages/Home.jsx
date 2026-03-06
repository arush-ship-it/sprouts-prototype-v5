import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Briefcase, ChevronDown, Mail, Calendar } from "lucide-react";

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

// ── SVG line chart (smooth curve) ────────────────────────────────────────────
function LineChart({ data, color, fillColor, dotColor, width = 180, height = 80 }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 8;
  const w = width - pad * 2;
  const h = height - pad * 2;

  const pts = data.map((v, i) => ({
    x: pad + i / (data.length - 1) * w,
    y: pad + (1 - (v - min) / range) * h
  }));

  // Build smooth bezier path
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const cx = (pts[i].x + pts[i + 1].x) / 2;
    d += ` C ${cx} ${pts[i].y}, ${cx} ${pts[i + 1].y}, ${pts[i + 1].x} ${pts[i + 1].y}`;
  }
  const fillPath = `${d} L ${pts[pts.length - 1].x} ${height} L ${pts[0].x} ${height} Z`;
  const lastPt = pts[pts.length - 1];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ pointerEvents: "none" }}>
      <path d={fillPath} fill={fillColor} fillOpacity="0.15" />
      <path d={d} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lastPt.x} cy={lastPt.y} r="4" fill={dotColor || color} />
      <circle cx={lastPt.x} cy={lastPt.y} r="7" fill={dotColor || color} fillOpacity="0.2" />
    </svg>);

}

// ── Donut / pie chart ─────────────────────────────────────────────────────────
function DonutChart({ percent, color, size = 80 }) {
  const r = 30;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const dash = percent / 100 * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth="10" />
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeDasharray={`${dash} ${circumference - dash}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
        strokeOpacity="0.35" />

    </svg>);

}

// ── Insight card ──────────────────────────────────────────────────────────────
function InsightCard({ card }) {
  const animated = useCountUp(card.numericValue);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 p-5 flex flex-col justify-between transition-all duration-200 cursor-default ${hovered ? "shadow-md -translate-y-0.5" : "shadow-sm"}`}
      style={{ minHeight: 337 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <p className="text-[13px] font-semibold text-gray-700">{card.title}</p>
        <button className="flex items-center gap-1 text-[11px] text-gray-400 border border-gray-200 rounded-md px-2 py-0.5 hover:bg-gray-50">
          Weekly <ChevronDown className="w-3 h-3" />
        </button>
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
        <div className="self-center flex items-center justify-center overflow-hidden" style={{ width: 160, height: 72 }}>
          {card.chartType === "line" &&
          <LineChart
            data={card.chartData}
            color={card.lineColor}
            fillColor={card.lineColor}
            dotColor={card.dotColor}
            width={160}
            height={72} />

          }
          {card.chartType === "donut" &&
          <div style={{ width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <DonutChart percent={card.numericValue} color={card.lineColor} size={80} />
            </div>
          }
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
    chartType: "line",
    chartData: [60, 70, 65, 80, 90, 100, 120],
    lineColor: "#3b82f6",
    dotColor: "#3b82f6",
    description: "Total candidates currently in your hiring pipeline."
  },
  {
    title: "New Applicants",
    subtitle: "This week",
    numericValue: 270,
    unit: "",
    chartType: "donut",
    chartData: [],
    lineColor: "#6366f1",
    description: "New applicants received this week across all positions."
  },
  {
    title: "Resume processed this month",
    subtitle: "Total processed",
    numericValue: 270,
    unit: "",
    chartType: "donut",
    chartData: [],
    lineColor: "#a855f7",
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
    <div className="bg-[#f2f3f5] px-6 py-6 h-screen overflow-hidden flex flex-col">
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
            <div className="mt-8 mb-5 px-10 py-6 text-center flex flex-col items-center">
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
          <div className="bg-white mt-3 px-4 py-4 rounded-xl border border-gray-100 shadow-sm flex flex-col flex-1 overflow-y-auto">
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