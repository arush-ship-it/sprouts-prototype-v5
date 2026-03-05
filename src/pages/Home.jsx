import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Briefcase, ChevronDown } from "lucide-react";

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
  const insightCards = [
  {
    title: "Insights",
    subtitle: "Revenue Growth",
    numericValue: 75,
    unit: "%",
    badge: "↑",
    chartType: "line",
    chartData: [30, 45, 35, 55, 50, 60, 75],
    lineColor: "#f97316",
    dotColor: "#f97316",
    description: "Expect your revenue to rise and shine before this month closes."
  },
  {
    title: "Conversion",
    subtitle: "Conversion Rate",
    numericValue: 120,
    unit: "%",
    badge: "↑",
    chartType: "line",
    chartData: [60, 70, 65, 80, 90, 100, 120],
    lineColor: "#3b82f6",
    dotColor: "#3b82f6",
    description: "Conversions set to rise this month."
  },
  {
    title: "ROI",
    subtitle: "Business ROI",
    numericValue: 270,
    unit: "%",
    chartType: "donut",
    chartData: [],
    lineColor: "#6366f1",
    description: "270%+ Business ROI increased compare to previous week."
  },
  {
    title: "ROI",
    subtitle: "Business ROI",
    numericValue: 270,
    unit: "%",
    chartType: "donut",
    chartData: [],
    lineColor: "#a855f7",
    description: "270%+ Business ROI increased compare to previous week."
  }];


  const jobs = [
  { id: 1, title: "Senior Product Designer", department: "Design", applicants: 156, inPipeline: 34, status: "ACTIVE" },
  { id: 2, title: "Frontend Engineer", department: "Engineering", applicants: 203, inPipeline: 45, status: "ACTIVE" },
  { id: 3, title: "Product Manager", department: "Product", applicants: 89, inPipeline: 12, status: "ACTIVE" }];


  const approvals = [
  { id: 1, text: "3 candidates moved to interview stage", time: "1 hour ago" },
  { id: 2, text: "Resume screening completed for 12 applicants", time: "3 hours ago" },
  { id: 3, text: "5 candidates auto-qualified for screening", time: "6 hours ago" },
  { id: 4, text: "3 candidates moved to interview stage", time: "1 hour ago" },
  { id: 5, text: "Resume screening completed for 12 applicants", time: "3 hours ago" },
  { id: 6, text: "5 candidates auto-qualified for screening", time: "6 hours ago" },
  { id: 7, text: "3 candidates moved to interview stage", time: "1 hour ago" },
  { id: 8, text: "Resume screening completed for 12 applicants", time: "3 hours ago" },
  { id: 9, text: "5 candidates auto-qualified for screening", time: "6 hours ago" }];


  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6">
      {/* Welcome */}
      <h1 className="text-gray-900 mb-6 text-xl font-semibold">Hello Arush, Welcome To SproutsAI!</h1>

      {/* Main 2-col layout */}
      <div className="flex gap-6">
        {/* Left column */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          {/* 4 insight cards */}
          <div className="grid grid-cols-4 gap-4">
            {insightCards.map((card, i) => <InsightCard key={i} card={card} />)}
          </div>

          {/* All Jobs */}
          <div className="bg-white px-4 py-4 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-[15px] font-semibold text-gray-800 mb-5">All Jobs</h2>
            <div className="space-y-1">
              {jobs.map((job) =>
              <JobRow key={job.id} job={job} />
              )}
            </div>
          </div>
        </div>

        {/* Right column — Pending Approval */}
        <div className="w-[403px] shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col" style={{ maxHeight: "calc(100vh - 96px)", overflowY: "auto" }}>
          <h2 className="text-[15px] font-semibold text-gray-800 mb-5 sticky top-0 bg-white pb-2">Pending Approval</h2>
          <div className="space-y-4">
            {approvals.map((item) =>
            <ApprovalItem key={item.id} item={item} />
            )}
          </div>
        </div>
      </div>
    </div>);

}

// ── Job row (extracted to avoid hooks-in-map) ─────────────────────────────────
function JobRow({ job }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="py-3 rounded-lg flex items-center justify-between transition-all duration-200 border border-transparent"

    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}>

      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${hovered ? "bg-blue-100" : "bg-gray-100"}`}>
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
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`flex items-start gap-3 transition-all duration-150 ${hovered ? "translate-x-0.5" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${hovered ? "bg-blue-500 border-blue-500" : "bg-white border-gray-200"}`}>
        <span className={`text-[11px] font-bold transition-colors ${hovered ? "text-white" : "text-gray-400"}`}>✓</span>
      </div>
      <div>
        <p className={`text-[13px] font-medium leading-snug transition-colors ${hovered ? "text-blue-600" : "text-gray-800"}`}>{item.text}</p>
        <p className="text-[11px] text-gray-400 mt-0.5">{item.time}</p>
      </div>
    </div>);

}