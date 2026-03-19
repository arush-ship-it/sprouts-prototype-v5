import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, TrendingDown, Users, Briefcase, Clock, Target, Zap,
  CheckCircle, AlertCircle, ArrowRight, Download, SlidersHorizontal,
  Sparkles, Send, ChevronLeft, ChevronRight, GitBranch, Filter,
  UserSearch, BarChart3, Activity, Star, Award, Calendar, Mail,
  ChevronUp, ChevronDown, Minimize2, Maximize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  LineChart, Line, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadialBarChart, RadialBar, FunnelChart, Funnel, LabelList
} from "recharts";

// ── Data ─────────────────────────────────────────────────────────────────────

const hiringHealthKPIs = [
  { label: "Open Roles", value: "24", sub: "6 urgent", trend: "+4 this week", up: true, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
  { label: "Avg. Time to Fill", value: "28d", sub: "Industry avg 42d", trend: "-6d vs last month", up: true, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
  { label: "Offer Acceptance", value: "82%", sub: "Target: 85%", trend: "+3% vs last month", up: true, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100" },
  { label: "Quality of Hire", value: "4.2/5", sub: "Based on 90-day review", trend: "+0.3 vs Q3", up: true, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
];

const ttfTrendData = [
  { month: "Sep", days: 38 }, { month: "Oct", days: 34 }, { month: "Nov", days: 31 },
  { month: "Dec", days: 35 }, { month: "Jan", days: 30 }, { month: "Feb", days: 28 },
];

const openRolesByDept = [
  { dept: "Engineering", open: 9, filled: 3 },
  { dept: "Product", open: 4, filled: 2 },
  { dept: "Design", open: 3, filled: 1 },
  { dept: "Sales", open: 5, filled: 4 },
  { dept: "Marketing", open: 3, filled: 2 },
];

const offerData = [
  { month: "Sep", accepted: 7, declined: 2 }, { month: "Oct", accepted: 9, declined: 1 },
  { month: "Nov", accepted: 6, declined: 3 }, { month: "Dec", accepted: 8, declined: 1 },
  { month: "Jan", accepted: 10, declined: 2 }, { month: "Feb", accepted: 11, declined: 2 },
];

const urgentRoles = [
  { title: "Staff Engineer – Backend", dept: "Engineering", daysOpen: 54, applicants: 23, risk: "high" },
  { title: "Senior Product Manager", dept: "Product", daysOpen: 41, applicants: 31, risk: "medium" },
  { title: "Head of Sales – APAC", dept: "Sales", daysOpen: 38, applicants: 12, risk: "high" },
  { title: "UX Lead", dept: "Design", daysOpen: 29, applicants: 18, risk: "medium" },
];

// Recruiter Productivity
const recruiterData = [
  { name: "Sarah M.", screenings: 48, interviews: 22, offers: 8, placements: 6, avg_ttf: 24, score: 94 },
  { name: "James K.", screenings: 41, interviews: 18, offers: 6, placements: 5, avg_ttf: 27, score: 88 },
  { name: "Priya S.", screenings: 37, interviews: 15, offers: 5, placements: 4, avg_ttf: 31, score: 81 },
  { name: "Alex T.", screenings: 29, interviews: 12, offers: 3, placements: 2, avg_ttf: 38, score: 72 },
];

const recruiterTrendData = [
  { week: "W1", sarah: 12, james: 9, priya: 8, alex: 6 },
  { week: "W2", sarah: 14, james: 11, priya: 10, alex: 7 },
  { week: "W3", sarah: 11, james: 10, priya: 9, alex: 8 },
  { week: "W4", sarah: 15, james: 13, priya: 11, alex: 9 },
];

const taskCompletionData = [
  { name: "Screenings Done", value: 85, fill: "#6366f1" },
  { name: "Follow-ups Sent", value: 72, fill: "#10b981" },
  { name: "Feedback Filed", value: 90, fill: "#f59e0b" },
  { name: "Offers Extended", value: 68, fill: "#ec4899" },
];

// Funnel Conversion
const funnelData = [
  { stage: "Applied", count: 1240, pct: 100, color: "#6366f1" },
  { stage: "Screened", count: 486, pct: 39, color: "#8b5cf6" },
  { stage: "Assessment", count: 198, pct: 16, color: "#a78bfa" },
  { stage: "Interview", count: 87, pct: 7, color: "#c4b5fd" },
  { stage: "Offer", count: 31, pct: 2.5, color: "#ddd6fe" },
  { stage: "Hired", count: 24, pct: 1.9, color: "#ede9fe" },
];

const dropReasonData = [
  { reason: "Withdrew Application", count: 187, color: "#f59e0b" },
  { reason: "Failed Assessment", count: 132, color: "#ef4444" },
  { reason: "Interview No-show", count: 68, color: "#f97316" },
  { reason: "Offer Declined", count: 22, color: "#ec4899" },
  { reason: "Background Check", count: 14, color: "#6366f1" },
];

const convByRoleData = [
  { role: "Frontend Eng", applied: 203, hired: 8, rate: 3.9 },
  { role: "Product Designer", applied: 156, hired: 4, rate: 2.6 },
  { role: "Product Manager", applied: 89, hired: 3, rate: 3.4 },
  { role: "Backend Eng", applied: 134, hired: 5, rate: 3.7 },
];

const sourceFunnelData = [
  { source: "LinkedIn", applied: 420, hired: 10, color: "#0a66c2" },
  { source: "Direct", applied: 380, hired: 9, color: "#6366f1" },
  { source: "Referral", applied: 180, hired: 6, color: "#10b981" },
  { source: "Indeed", applied: 160, hired: 3, color: "#f59e0b" },
  { source: "Others", applied: 100, hired: 1, color: "#94a3b8" },
];

// Analytics
const pipelineFunnelData = [
  { stage: "Applied", count: 342 }, { stage: "Screening", count: 156 },
  { stage: "Assessment", count: 89 }, { stage: "Interview", count: 45 }, { stage: "Offer", count: 12 },
];

const newApplicationsData = [
  { week: "W1", count: 45 }, { week: "W2", count: 62 }, { week: "W3", count: 38 }, { week: "W4", count: 28 },
];

const monthlyData = [
  { month: "Jan", jd: 18, resumes: 120 }, { month: "Feb", jd: 23, resumes: 156 },
  { month: "Mar", jd: 21, resumes: 142 }, { month: "Apr", jd: 19, resumes: 134 },
];

const sourceData = [
  { name: "Direct", value: 45, color: "#6366f1" },
  { name: "LinkedIn", value: 35, color: "#8b5cf6" },
  { name: "Referral", value: 12, color: "#ec4899" },
  { name: "Others", value: 8, color: "#f59e0b" },
];

const applicantsPerJobData = [
  { job: "Product Designer", count: 156 }, { job: "Frontend Eng", count: 203 },
  { job: "Product Manager", count: 89 }, { job: "Backend Eng", count: 134 },
];

// ── Shared Components ─────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-xl text-[12px]">
        <p className="font-semibold text-gray-500 mb-1">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} className="font-bold" style={{ color: entry.color }}>{entry.name}: {entry.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

const StatCard = ({ label, value, sub, trend, up, color, bg, border }) => (
  <div className={`rounded-2xl border ${border} ${bg} p-5 flex flex-col gap-2`}>
    <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
    <p className={`text-[30px] font-bold ${color}`}>{value}</p>
    <p className="text-[11px] text-gray-400">{sub}</p>
    <div className={`flex items-center gap-1 text-[11px] font-medium ${up ? "text-emerald-600" : "text-red-500"}`}>
      {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {trend}
    </div>
  </div>
);

const ChartCard = ({ title, subtitle, children, className = "" }) => (
  <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 ${className}`}>
    <div className="mb-4">
      <p className="text-[13px] font-semibold text-gray-900">{title}</p>
      {subtitle && <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>}
    </div>
    {children}
  </div>
);

const CONTEXT_TOPICS = [
  { id: "pipeline", label: "Pipeline Health", sublabel: "Volume & Flow", Icon: GitBranch, bg: "bg-violet-50", iconColor: "text-violet-400", border: "border-violet-100", dot: "bg-violet-300", prompt: "Give me a deep dive on pipeline health — volume, flow, and bottlenecks across stages." },
  { id: "conversion", label: "Conversion & Drop-off", sublabel: "Funnel Leaks", Icon: Filter, bg: "bg-rose-50", iconColor: "text-rose-400", border: "border-rose-100", dot: "bg-rose-300", prompt: "Analyze my funnel conversion rates and where candidates are dropping off." },
  { id: "speed", label: "Speed & Efficiency", sublabel: "Velocity", Icon: Zap, bg: "bg-amber-50", iconColor: "text-amber-400", border: "border-amber-100", dot: "bg-amber-300", prompt: "What's my hiring velocity? Break down time-to-hire and efficiency across stages." },
  { id: "sourcing", label: "Sourcing ROI", sublabel: "Channel Performance", Icon: Target, bg: "bg-emerald-50", iconColor: "text-emerald-400", border: "border-emerald-100", dot: "bg-emerald-300", prompt: "Which sourcing channels are performing best? Show me ROI by channel." },
  { id: "candidates", label: "Candidate Insights", sublabel: "Quality & Behavior", Icon: UserSearch, bg: "bg-sky-50", iconColor: "text-sky-400", border: "border-sky-100", dot: "bg-sky-300", prompt: "Give me insights on candidate quality, engagement patterns, and behavior trends." },
];

// ── Tab: Hiring Health ────────────────────────────────────────────────────────
function HiringHealth() {
  return (
    <div className="space-y-5">
      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        {hiringHealthKPIs.map((k, i) => <StatCard key={i} {...k} />)}
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-3 gap-4">
        <ChartCard title="Time to Fill Trend" subtitle="Avg. days from open to hired" className="col-span-1">
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={ttfTrendData}>
              <defs>
                <linearGradient id="ttfGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} domain={[20, 45]} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="days" stroke="#6366f1" strokeWidth={2.5} fill="url(#ttfGrad)" dot={{ fill: "#6366f1", r: 4, stroke: "#fff", strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-3 flex items-center gap-2 bg-emerald-50 rounded-xl px-3 py-2">
            <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
            <p className="text-[11px] font-semibold text-emerald-700">10 days faster than industry average</p>
          </div>
        </ChartCard>

        <ChartCard title="Open Roles by Department" subtitle="Active openings vs. recently filled" className="col-span-1">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={openRolesByDept} barCategoryGap="35%">
              <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="dept" tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="open" name="Open" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={18} />
              <Bar dataKey="filled" name="Filled" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={18} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-indigo-500" /><span className="text-[10px] text-gray-500">Open</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><span className="text-[10px] text-gray-500">Filled (30d)</span></div>
          </div>
        </ChartCard>

        <ChartCard title="Offer Acceptance Rate" subtitle="Accepted vs. declined offers monthly" className="col-span-1">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={offerData} barCategoryGap="40%">
              <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="accepted" name="Accepted" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={18} />
              <Bar dataKey="declined" name="Declined" fill="#f87171" radius={[4, 4, 0, 0]} maxBarSize={18} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><span className="text-[10px] text-gray-500">Accepted</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400" /><span className="text-[10px] text-gray-500">Declined</span></div>
          </div>
        </ChartCard>
      </div>

      {/* Urgent Roles Table */}
      <ChartCard title="Roles Needing Attention" subtitle="Longest open positions with risk indicators">
        <div className="space-y-2">
          {urgentRoles.map((r, i) => (
            <div key={i} className={`flex items-center gap-4 px-4 py-3 rounded-xl border ${r.risk === "high" ? "bg-red-50 border-red-100" : "bg-amber-50 border-amber-100"}`}>
              <div className={`w-2 h-2 rounded-full shrink-0 ${r.risk === "high" ? "bg-red-500" : "bg-amber-500"}`} />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-gray-900">{r.title}</p>
                <p className="text-[11px] text-gray-500">{r.dept}</p>
              </div>
              <div className="text-center">
                <p className={`text-[15px] font-bold ${r.risk === "high" ? "text-red-600" : "text-amber-600"}`}>{r.daysOpen}d</p>
                <p className="text-[10px] text-gray-400">Open</p>
              </div>
              <div className="text-center">
                <p className="text-[15px] font-bold text-gray-800">{r.applicants}</p>
                <p className="text-[10px] text-gray-400">Applicants</p>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${r.risk === "high" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                {r.risk === "high" ? "High Risk" : "Medium Risk"}
              </span>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}

// ── Tab: Recruiter Productivity ───────────────────────────────────────────────
function RecruiterProductivity() {
  return (
    <div className="space-y-5">
      {/* Summary KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Avg Screenings/Recruiter", value: "38.75", trend: "+12% vs last month", up: true, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100", sub: "Across 4 recruiters" },
          { label: "Avg Interviews/Recruiter", value: "16.75", trend: "+8% vs last month", up: true, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100", sub: "Per recruiter" },
          { label: "Avg Time to Fill", value: "30d", trend: "-4d vs last month", up: true, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", sub: "Team average" },
          { label: "Placements This Month", value: "17", trend: "+3 vs last month", up: true, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", sub: "Total hires closed" },
        ].map((k, i) => <StatCard key={i} {...k} />)}
      </div>

      {/* Recruiter Leaderboard + Trend */}
      <div className="grid grid-cols-5 gap-4">
        <ChartCard title="Recruiter Leaderboard" subtitle="Activity this month" className="col-span-2">
          <div className="space-y-3">
            {recruiterData.map((r, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${i === 0 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"}`}>
                  {i === 0 ? "🥇" : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[12px] font-semibold text-gray-800">{r.name}</p>
                    <span className={`text-[11px] font-bold ${r.score >= 90 ? "text-emerald-600" : r.score >= 80 ? "text-indigo-600" : "text-amber-600"}`}>{r.score}</span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div className={`h-full rounded-full ${r.score >= 90 ? "bg-emerald-500" : r.score >= 80 ? "bg-indigo-500" : "bg-amber-500"}`} style={{ width: `${r.score}%` }} />
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-gray-400">{r.screenings} screened</span>
                    <span className="text-[10px] text-gray-400">{r.interviews} interviewed</span>
                    <span className="text-[10px] text-gray-400">{r.placements} placed</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Weekly Screenings per Recruiter" subtitle="Volume trend over 4 weeks" className="col-span-3">
          <ResponsiveContainer width="100%" height={210}>
            <LineChart data={recruiterTrendData}>
              <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="sarah" name="Sarah M." stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }} />
              <Line type="monotone" dataKey="james" name="James K." stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: "#10b981", stroke: "#fff", strokeWidth: 2 }} />
              <Line type="monotone" dataKey="priya" name="Priya S." stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4, fill: "#f59e0b", stroke: "#fff", strokeWidth: 2 }} />
              <Line type="monotone" dataKey="alex" name="Alex T." stroke="#ec4899" strokeWidth={2.5} dot={{ r: 4, fill: "#ec4899", stroke: "#fff", strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-5 mt-2">
            {[{ name: "Sarah M.", c: "#6366f1" }, { name: "James K.", c: "#10b981" }, { name: "Priya S.", c: "#f59e0b" }, { name: "Alex T.", c: "#ec4899" }].map((l, i) => (
              <div key={i} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: l.c }} /><span className="text-[10px] text-gray-500">{l.name}</span></div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Task Completion + Recruiter Detail Table */}
      <div className="grid grid-cols-5 gap-4">
        <ChartCard title="Task Completion Rate" subtitle="% of assigned tasks completed" className="col-span-2">
          <div className="space-y-3">
            {taskCompletionData.map((t, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[12px] text-gray-700">{t.name}</p>
                  <p className="text-[12px] font-bold" style={{ color: t.fill }}>{t.value}%</p>
                </div>
                <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${t.value}%`, background: t.fill }} />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Recruiter Performance Detail" subtitle="This month's breakdown" className="col-span-3">
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Recruiter", "Screenings", "Interviews", "Offers", "Placed", "Avg TTF", "Score"].map(h => (
                    <th key={h} className="text-left pb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wide pr-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recruiterData.map((r, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-2.5 pr-3 font-semibold text-gray-800">{r.name}</td>
                    <td className="py-2.5 pr-3 text-gray-600">{r.screenings}</td>
                    <td className="py-2.5 pr-3 text-gray-600">{r.interviews}</td>
                    <td className="py-2.5 pr-3 text-gray-600">{r.offers}</td>
                    <td className="py-2.5 pr-3 font-semibold text-emerald-700">{r.placements}</td>
                    <td className="py-2.5 pr-3 text-gray-600">{r.avg_ttf}d</td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${r.score >= 90 ? "bg-emerald-100 text-emerald-700" : r.score >= 80 ? "bg-indigo-100 text-indigo-700" : "bg-amber-100 text-amber-700"}`}>{r.score}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}

// ── Tab: Funnel Conversion ────────────────────────────────────────────────────
function FunnelConversion() {
  return (
    <div className="space-y-5">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Applicants", value: "1,240", sub: "Last 90 days", trend: "+18% vs prior period", up: true, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
          { label: "Screening Rate", value: "39%", sub: "Applied → Screened", trend: "+4% vs prior period", up: true, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100" },
          { label: "Interview → Offer", value: "35.6%", sub: "Best stage conversion", trend: "+2.1% vs prior", up: true, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
          { label: "Overall Hire Rate", value: "1.9%", sub: "Applied → Hired", trend: "-0.2% vs prior", up: false, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
        ].map((k, i) => <StatCard key={i} {...k} />)}
      </div>

      {/* Funnel Visual + Drop Reasons */}
      <div className="grid grid-cols-5 gap-4">
        <ChartCard title="Hiring Funnel" subtitle="Stage-by-stage conversion" className="col-span-3">
          <div className="space-y-2">
            {funnelData.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <p className="text-[11px] text-gray-500 w-20 shrink-0 text-right">{s.stage}</p>
                <div className="flex-1 bg-gray-100 rounded-full h-7 relative overflow-hidden">
                  <div
                    className="h-full rounded-full flex items-center justify-end pr-3 transition-all"
                    style={{ width: `${s.pct}%`, minWidth: "40px", background: `linear-gradient(90deg, #6366f1, #8b5cf6)` }}>
                    <span className="text-white text-[11px] font-bold">{s.count}</span>
                  </div>
                </div>
                <p className="text-[11px] font-semibold text-gray-700 w-10 shrink-0">{s.pct}%</p>
                {i > 0 && (
                  <p className="text-[10px] text-red-400 w-14 shrink-0">
                    -{(100 - Math.round(s.count / funnelData[i - 1].count * 100))}% drop
                  </p>
                )}
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Drop-off Reasons" subtitle="Why candidates leave the pipeline" className="col-span-2">
          <div className="space-y-3">
            {dropReasonData.map((d, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[11px] text-gray-700">{d.reason}</p>
                  <p className="text-[11px] font-bold text-gray-800">{d.count}</p>
                </div>
                <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(d.count / 187) * 100}%`, background: d.color }} />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Conversion by Role + Source */}
      <div className="grid grid-cols-2 gap-4">
        <ChartCard title="Conversion Rate by Role" subtitle="Applied → Hired %">
          <div className="space-y-3">
            {convByRoleData.map((r, i) => (
              <div key={i} className="flex items-center gap-3">
                <p className="text-[11px] text-gray-600 w-28 shrink-0">{r.role}</p>
                <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                  <div className="h-full rounded-full bg-indigo-500 flex items-center justify-end pr-2" style={{ width: `${r.rate * 20}%` }}>
                    <span className="text-white text-[10px] font-bold">{r.rate}%</span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 w-16 shrink-0">{r.applied} applied</p>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Source → Hire Conversion" subtitle="Which channels actually convert to hires">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={sourceFunnelData} barCategoryGap="35%">
              <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="source" tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="applied" name="Applied" fill="#e0e7ff" radius={[4, 4, 0, 0]} maxBarSize={22} />
              <Bar dataKey="hired" name="Hired" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={22} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-indigo-200" /><span className="text-[10px] text-gray-500">Applied</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-indigo-600" /><span className="text-[10px] text-gray-500">Hired</span></div>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}

// ── Tab: Analytics ────────────────────────────────────────────────────────────
function Analytics() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        {/* Pipeline Funnel */}
        <ChartCard title="Pipeline Funnel" subtitle="Total candidates by stage">
          <h3 className="text-[28px] font-bold text-gray-900 mb-1">342</h3>
          <p className="text-[11px] text-gray-400 mb-4">Total active candidates</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={pipelineFunnelData}>
              <defs><linearGradient id="pipelineGrad2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} /><stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.6} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="stage" tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99,102,241,0.05)" }} />
              <Bar dataKey="count" fill="url(#pipelineGrad2)" radius={[6, 6, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* New Applications */}
        <ChartCard title="New Applications" subtitle="Weekly inflow trend">
          <h3 className="text-[28px] font-bold text-gray-900 mb-1">28</h3>
          <p className="text-[11px] text-gray-400 mb-4">Pending review this week</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={newApplicationsData}>
              <defs><linearGradient id="appGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f97316" stopOpacity={0.3} /><stop offset="100%" stopColor="#f97316" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="count" stroke="#f97316" strokeWidth={2.5} fill="url(#appGrad)" dot={{ fill: "#f97316", r: 4, stroke: "#fff", strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Source Breakdown */}
        <ChartCard title="Source Breakdown" subtitle="Where candidates come from">
          <h3 className="text-[28px] font-bold text-gray-900 mb-1">45%</h3>
          <p className="text-[11px] text-gray-400 mb-3">Direct applications (top source)</p>
          <ResponsiveContainer width="100%" height={130}>
            <RechartsPieChart>
              <defs>{sourceData.map((e, i) => <linearGradient key={i} id={`sg${i}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={e.color} stopOpacity={0.9} /><stop offset="100%" stopColor={e.color} stopOpacity={0.6} /></linearGradient>)}</defs>
              <Pie data={sourceData} cx="50%" cy="50%" innerRadius={40} outerRadius={62} paddingAngle={3} dataKey="value">
                {sourceData.map((e, i) => <Cell key={i} fill={`url(#sg${i})`} stroke="#fff" strokeWidth={2} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2">
            {sourceData.map((s, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-gray-50 rounded-full px-2.5 py-1 border border-gray-100">
                <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                <span className="text-[10px] text-gray-600 font-medium">{s.name} {s.value}%</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Monthly Trends */}
        <ChartCard title="Monthly Processing Trends" subtitle="JDs published vs resumes processed">
          <div className="flex items-baseline gap-4 mb-4">
            <div><span className="text-[24px] font-bold text-violet-600">23</span><span className="text-[11px] text-gray-400 ml-1">JDs</span></div>
            <div><span className="text-[24px] font-bold text-emerald-600">156</span><span className="text-[11px] text-gray-400 ml-1">Resumes</span></div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="jd" name="JDs" stroke="#8b5cf6" strokeWidth={2.5} dot={{ fill: "#8b5cf6", r: 4, stroke: "#fff", strokeWidth: 2 }} />
              <Line type="monotone" dataKey="resumes" name="Resumes" stroke="#10b981" strokeWidth={2.5} dot={{ fill: "#10b981", r: 4, stroke: "#fff", strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Applicants per Job */}
        <ChartCard title="Applicants per Job Posting" subtitle="Volume by active role">
          <h3 className="text-[28px] font-bold text-gray-900 mb-1">203</h3>
          <p className="text-[11px] text-gray-400 mb-4">Frontend Engineer (highest)</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={applicantsPerJobData} layout="vertical">
              <defs><linearGradient id="jobGrad2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} /><stop offset="100%" stopColor="#06b6d4" stopOpacity={0.6} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <YAxis dataKey="job" type="category" tick={{ fontSize: 10, fill: "#94a3b8" }} width={100} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(59,130,246,0.05)" }} />
              <Bar dataKey="count" fill="url(#jobGrad2)" radius={[0, 6, 6, 0]} maxBarSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
const TABS = [
  { key: "health", label: "Hiring Health", icon: Activity },
  { key: "productivity", label: "Recruiter Productivity", icon: Award },
  { key: "funnel", label: "Funnel Conversion", icon: Filter },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("health");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "Hi! I'm your analytics assistant. Ask me anything about your recruitment data." }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [activeContext, setActiveContext] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const hasInteracted = chatMessages.length > 1;

  const handleSelectContext = (topic) => {
    setActiveContext(topic);
    setChatMessages(prev => [
      ...prev,
      { role: "user", content: topic.prompt },
      { role: "assistant", content: `Sure! Let's deep dive into **${topic.label}**. Based on your current data, here's what I'm seeing...` }
    ]);
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { role: "user", content: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: "assistant", content: "Based on the data, your top performing source is direct applications at 45%. Your conversion rate from screening to interview is around 29%." }]);
    }, 500);
  };

  const currentTab = TABS.find(t => t.key === activeTab);

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F3F5]">
      {/* Header */}
      <div className="px-8 pt-6 pb-0 shrink-0">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-[22px] font-semibold text-gray-900">Analytics</h1>
            <p className="text-[13px] text-gray-500 mt-0.5">Hiring overview · Last 90 days</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-[12px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <Calendar className="w-3.5 h-3.5" /> Last 90 days
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-[12px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
            <button
              onClick={() => setIsChatOpen(true)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 text-white text-[12px] font-semibold hover:bg-blue-700 transition-colors shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> AI Deep Dive
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex items-center gap-0 border-b border-gray-200">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-5 py-3 text-[13px] font-medium border-b-2 transition-all ${activeTab === key ? "border-indigo-600 text-indigo-700 bg-white/60" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-white/40"}`}>
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}>
            {activeTab === "health" && <HiringHealth />}
            {activeTab === "productivity" && <RecruiterProductivity />}
            {activeTab === "funnel" && <FunnelConversion />}
            {activeTab === "analytics" && <Analytics />}
          </motion.div>
        </div>

        {/* AI Chat Sidebar */}
        {isChatOpen && (
          <div className="w-[380px] shrink-0 bg-white border-l border-gray-200 flex flex-col overflow-hidden my-2 mr-2 rounded-2xl shadow-lg">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-gray-900">Analytics Assistant</p>
                  <p className="text-[10px] text-gray-400">Ask about your data</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <Minimize2 className="w-3.5 h-3.5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-[12px] leading-relaxed ${msg.role === "user" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-900"}`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {!hasInteracted && (
                <div className="pt-2">
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide text-center mb-3">Choose a topic</p>
                  <motion.div
                    key={CONTEXT_TOPICS[slideIndex].id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`rounded-2xl border ${CONTEXT_TOPICS[slideIndex].border} ${CONTEXT_TOPICS[slideIndex].bg} p-5 flex flex-col items-center text-center gap-3 cursor-pointer hover:shadow-md transition-all`}
                    onClick={() => handleSelectContext(CONTEXT_TOPICS[slideIndex])}>
                    {(() => { const Icon = CONTEXT_TOPICS[slideIndex].Icon; return <Icon className={`w-6 h-6 ${CONTEXT_TOPICS[slideIndex].iconColor}`} />; })()}
                    <div>
                      <p className="text-[14px] font-semibold text-gray-800">{CONTEXT_TOPICS[slideIndex].label}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{CONTEXT_TOPICS[slideIndex].sublabel}</p>
                    </div>
                    <span className={`text-[11px] font-medium ${CONTEXT_TOPICS[slideIndex].iconColor}`}>Start deep dive →</span>
                  </motion.div>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <button onClick={() => setSlideIndex(i => (i - 1 + CONTEXT_TOPICS.length) % CONTEXT_TOPICS.length)} className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-gray-300">
                      <ChevronLeft className="w-3 h-3 text-gray-500" />
                    </button>
                    <div className="flex gap-1">
                      {CONTEXT_TOPICS.map((_, i) => (
                        <button key={i} onClick={() => setSlideIndex(i)} className={`rounded-full transition-all ${i === slideIndex ? "w-3.5 h-2 bg-indigo-500" : "w-2 h-2 bg-gray-200"}`} />
                      ))}
                    </div>
                    <button onClick={() => setSlideIndex(i => (i + 1) % CONTEXT_TOPICS.length)} className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-gray-300">
                      <ChevronRight className="w-3 h-3 text-gray-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-gray-100 shrink-0">
              <div className="flex gap-2">
                <Textarea
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendChat(); } }}
                  placeholder="Ask about metrics…"
                  className="resize-none text-[12px]"
                  rows={2} />
                <Button onClick={handleSendChat} size="icon" className="bg-blue-600 hover:bg-blue-700 rounded-xl shrink-0 h-9 w-9">
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}