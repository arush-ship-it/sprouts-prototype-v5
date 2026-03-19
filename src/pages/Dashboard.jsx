import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp, TrendingDown, Zap, Target, UserSearch, BarChart3,
  Activity, Award, Filter, Calendar, Download, Sparkles, Send,
  ChevronLeft, ChevronRight, GitBranch, Minimize2, ArrowRight,
  Clock, Users, CheckCircle, AlertTriangle, Info } from
"lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  AIInsightButton, AIInsightPanel, AnomalyBadge, useAIInsight
} from "@/components/dashboard/AIInsightPopover";
import {
  LineChart, Line, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis } from
"recharts";

// ── Data ─────────────────────────────────────────────────────────────────────

const ttfTrendData = [
{ month: "Sep", days: 38, target: 35 }, { month: "Oct", days: 34, target: 35 },
{ month: "Nov", days: 31, target: 35 }, { month: "Dec", days: 35, target: 35 },
{ month: "Jan", days: 30, target: 35 }, { month: "Feb", days: 28, target: 35 }];


const openRolesByDept = [
{ dept: "Engineering", open: 9, filled: 3 }, { dept: "Product", open: 4, filled: 2 },
{ dept: "Design", open: 3, filled: 1 }, { dept: "Sales", open: 5, filled: 4 },
{ dept: "Marketing", open: 3, filled: 2 }];


const offerData = [
{ month: "Sep", accepted: 7, declined: 2 }, { month: "Oct", accepted: 9, declined: 1 },
{ month: "Nov", accepted: 6, declined: 3 }, { month: "Dec", accepted: 8, declined: 1 },
{ month: "Jan", accepted: 10, declined: 2 }, { month: "Feb", accepted: 11, declined: 2 }];


const urgentRoles = [
{ title: "Staff Engineer – Backend", dept: "Engineering", daysOpen: 54, applicants: 23, risk: "high" },
{ title: "Senior Product Manager", dept: "Product", daysOpen: 41, applicants: 31, risk: "medium" },
{ title: "Head of Sales – APAC", dept: "Sales", daysOpen: 38, applicants: 12, risk: "high" },
{ title: "UX Lead", dept: "Design", daysOpen: 29, applicants: 18, risk: "medium" }];


const recruiterData = [
{ name: "Sarah M.", screenings: 48, interviews: 22, offers: 8, placements: 6, avg_ttf: 24, score: 94, color: "#6366f1" },
{ name: "James K.", screenings: 41, interviews: 18, offers: 6, placements: 5, avg_ttf: 27, score: 88, color: "#10b981" },
{ name: "Priya S.", screenings: 37, interviews: 15, offers: 5, placements: 4, avg_ttf: 31, score: 81, color: "#f59e0b" },
{ name: "Alex T.", screenings: 29, interviews: 12, offers: 3, placements: 2, avg_ttf: 38, score: 72, color: "#ec4899" }];


const recruiterTrendData = [
{ week: "W1", sarah: 12, james: 9, priya: 8, alex: 6 },
{ week: "W2", sarah: 14, james: 11, priya: 10, alex: 7 },
{ week: "W3", sarah: 11, james: 10, priya: 9, alex: 8 },
{ week: "W4", sarah: 15, james: 13, priya: 11, alex: 9 }];


const taskCompletionData = [
{ name: "Screenings Done", value: 85, fill: "#6366f1" },
{ name: "Follow-ups Sent", value: 72, fill: "#10b981" },
{ name: "Feedback Filed", value: 90, fill: "#f59e0b" },
{ name: "Offers Extended", value: 68, fill: "#ec4899" }];


const funnelData = [
{ stage: "Applied", count: 1240, pct: 100, color: "#6366f1", icon: "📥" },
{ stage: "Screened", count: 486, pct: 39, color: "#7c3aed", icon: "🔍" },
{ stage: "Assessment", count: 198, pct: 16, color: "#9333ea", icon: "📝" },
{ stage: "Interview", count: 87, pct: 7, color: "#a855f7", icon: "🎙️" },
{ stage: "Offer", count: 31, pct: 2.5, color: "#c084fc", icon: "📄" },
{ stage: "Hired", count: 24, pct: 1.9, color: "#e879f9", icon: "✅" }];


const dropReasonData = [
{ reason: "Withdrew Application", count: 187, color: "#f59e0b" },
{ reason: "Failed Assessment", count: 132, color: "#ef4444" },
{ reason: "Interview No-show", count: 68, color: "#f97316" },
{ reason: "Offer Declined", count: 22, color: "#ec4899" },
{ reason: "Background Check", count: 14, color: "#6366f1" }];


const sourceFunnelData = [
{ source: "LinkedIn", applied: 420, hired: 10, rate: 2.4, color: "#0a66c2" },
{ source: "Direct", applied: 380, hired: 9, rate: 2.4, color: "#6366f1" },
{ source: "Referral", applied: 180, hired: 6, rate: 3.3, color: "#10b981" },
{ source: "Indeed", applied: 160, hired: 3, rate: 1.9, color: "#f59e0b" },
{ source: "Others", applied: 100, hired: 1, rate: 1.0, color: "#94a3b8" }];


const convByRoleData = [
{ role: "Frontend Eng", applied: 203, hired: 8, rate: 3.9 },
{ role: "Product Designer", applied: 156, hired: 4, rate: 2.6 },
{ role: "Product Manager", applied: 89, hired: 3, rate: 3.4 },
{ role: "Backend Eng", applied: 134, hired: 5, rate: 3.7 }];


const pipelineFunnelData = [
{ stage: "Applied", count: 342 }, { stage: "Screening", count: 156 },
{ stage: "Assessment", count: 89 }, { stage: "Interview", count: 45 }, { stage: "Offer", count: 12 }];


const monthlyData = [
{ month: "Jan", jd: 18, resumes: 120 }, { month: "Feb", jd: 23, resumes: 156 },
{ month: "Mar", jd: 21, resumes: 142 }, { month: "Apr", jd: 19, resumes: 134 }];


const sourceData = [
{ name: "Direct", value: 45, color: "#6366f1" },
{ name: "LinkedIn", value: 35, color: "#8b5cf6" },
{ name: "Referral", value: 12, color: "#ec4899" },
{ name: "Others", value: 8, color: "#f59e0b" }];


const applicantsPerJobData = [
{ job: "Product Designer", count: 156 }, { job: "Frontend Eng", count: 203 },
{ job: "Product Manager", count: 89 }, { job: "Backend Eng", count: 134 }];


const CONTEXT_TOPICS = [
{ id: "pipeline", label: "Pipeline Health", sublabel: "Volume & Flow", Icon: GitBranch, bg: "bg-violet-50", iconColor: "text-violet-400", border: "border-violet-100", dot: "bg-violet-300", prompt: "Give me a deep dive on pipeline health — volume, flow, and bottlenecks across stages." },
{ id: "conversion", label: "Conversion & Drop-off", sublabel: "Funnel Leaks", Icon: Filter, bg: "bg-rose-50", iconColor: "text-rose-400", border: "border-rose-100", dot: "bg-rose-300", prompt: "Analyze my funnel conversion rates and where candidates are dropping off." },
{ id: "speed", label: "Speed & Efficiency", sublabel: "Velocity", Icon: Zap, bg: "bg-amber-50", iconColor: "text-amber-400", border: "border-amber-100", dot: "bg-amber-300", prompt: "What's my hiring velocity? Break down time-to-hire and efficiency across stages." },
{ id: "sourcing", label: "Sourcing ROI", sublabel: "Channel Performance", Icon: Target, bg: "bg-emerald-50", iconColor: "text-emerald-400", border: "border-emerald-100", dot: "bg-emerald-300", prompt: "Which sourcing channels are performing best? Show me ROI by channel." },
{ id: "candidates", label: "Candidate Insights", sublabel: "Quality & Behavior", Icon: UserSearch, bg: "bg-sky-50", iconColor: "text-sky-400", border: "border-sky-100", dot: "bg-sky-300", prompt: "Give me insights on candidate quality, engagement patterns, and behavior trends." }];


// ── Shared Components ─────────────────────────────────────────────────────────

const RichTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white rounded-xl px-4 py-3 shadow-2xl text-[12px] border border-gray-700">
        <p className="font-semibold text-gray-300 mb-2">{label}</p>
        {payload.map((entry, i) =>
        <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: entry.color || entry.fill }} />
            <span className="text-gray-300">{entry.name}:</span>
            <span className="font-bold text-white">{entry.value}</span>
          </div>
        )}
      </div>);

  }
  return null;
};

const StatCard = ({ label, value, sub, trend, up, color, icon: Icon, onClick, active, insightId, anomalyId, onOpenInsight }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`bg-white p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col gap-2 relative ${active ? "border-indigo-400 shadow-lg shadow-indigo-100" : "border-gray-100 hover:border-indigo-200 hover:shadow-md"}`}>
      <div className="flex items-start justify-between">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
        <div className="flex items-center gap-1.5">
          <AnimatePresence>
            {hovered && insightId && onOpenInsight && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                <AIInsightButton insightId={insightId} onOpen={onOpenInsight} />
              </motion.div>
            )}
          </AnimatePresence>
          {Icon && <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${active ? "bg-indigo-100" : "bg-gray-50"}`}><Icon className={`w-3.5 h-3.5 ${active ? "text-indigo-600" : "text-gray-400"}`} /></div>}
        </div>
      </div>
      <p className={`text-[28px] font-bold ${color}`}>{value}</p>
      <p className="text-[11px] text-gray-400">{sub}</p>
      <div className="flex items-center justify-between mt-auto">
        <div className={`flex items-center gap-1 text-[11px] font-semibold ${up ? "text-emerald-600" : "text-red-500"}`}>
          {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trend}
        </div>
        {anomalyId && onOpenInsight && (
          <AnomalyBadge insightId={anomalyId} onOpen={onOpenInsight} label="Anomaly" />
        )}
      </div>
    </motion.div>
  );
};


const ChartCard = ({ title, subtitle, children, className = "", action, insightId, anomalyId, onOpenInsight }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div className="flex items-start justify-between mb-4 shrink-0">
        <div>
          <p className="text-[13px] font-semibold text-gray-900">{title}</p>
          {subtitle && <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {anomalyId && onOpenInsight && (
            <AnomalyBadge insightId={anomalyId} onOpen={onOpenInsight} label="Anomaly" />
          )}
          <AnimatePresence>
            {hovered && insightId && onOpenInsight && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                <AIInsightButton insightId={insightId} onOpen={onOpenInsight} />
              </motion.div>
            )}
          </AnimatePresence>
          {action}
        </div>
      </div>
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
};


// ── Tab: Hiring Health ────────────────────────────────────────────────────────
function HiringHealth({ onOpenInsight }) {
  const [activeKPI, setActiveKPI] = useState(null);
  const [hoveredRole, setHoveredRole] = useState(null);

  const kpis = [
  { label: "Open Roles", value: "24", sub: "6 urgent", trend: "+4 this week", up: true, color: "text-blue-600", icon: Briefcase2, insightId: "kpi_openroles", anomalyId: "anomaly_high_risk_roles" },
  { label: "Avg. Time to Fill", value: "28d", sub: "Industry avg 42d", trend: "-6d vs last month", up: true, color: "text-emerald-600", icon: Clock, insightId: "kpi_ttf" },
  { label: "Offer Acceptance", value: "82%", sub: "Target: 85%", trend: "+3% vs last month", up: true, color: "text-violet-600", icon: CheckCircle, insightId: "kpi_offer", anomalyId: "anomaly_nov_decline" },
  { label: "Quality of Hire", value: "4.2/5", sub: "90-day review score", trend: "+0.3 vs Q3", up: true, color: "text-amber-600", icon: Award, insightId: "kpi_quality" }];


  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((k, i) =>
        <StatCard key={i} {...k} active={activeKPI === i} onClick={() => setActiveKPI(activeKPI === i ? null : i)} onOpenInsight={onOpenInsight} />
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <ChartCard title="Time to Fill" subtitle="Days vs. target (35d)" className="col-span-1" insightId="chart_ttf" onOpenInsight={onOpenInsight}>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={ttfTrendData}>
              <defs>
                <linearGradient id="ttfFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} domain={[20, 45]} />
              <Tooltip content={<RichTooltip />} />
              <Area type="monotone" dataKey="days" name="Actual" stroke="#6366f1" strokeWidth={2.5} fill="url(#ttfFill)" dot={{ fill: "#6366f1", r: 4, stroke: "#fff", strokeWidth: 2 }} activeDot={{ r: 6, fill: "#6366f1" }} />
              <Line type="monotone" dataKey="target" name="Target" stroke="#f87171" strokeWidth={1.5} strokeDasharray="5 4" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-0.5 bg-indigo-500" /><span className="text-[10px] text-gray-500">Actual</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-0.5 bg-red-400 border-t border-dashed" /><span className="text-[10px] text-gray-500">Target</span></div>
            <div className="ml-auto flex items-center gap-1.5 bg-emerald-50 rounded-full px-2.5 py-1">
              <TrendingDown className="w-3 h-3 text-emerald-600" />
              <span className="text-[10px] font-semibold text-emerald-700">14d under target</span>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Openings by Department" subtitle="Open vs. filled in last 30d" className="col-span-1" insightId="chart_openings" anomalyId="chart_openings" onOpenInsight={onOpenInsight}>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={openRolesByDept} barCategoryGap="30%" barGap={3}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="dept" tick={{ fontSize: 9, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <Tooltip content={<RichTooltip />} cursor={{ fill: "rgba(99,102,241,0.04)", radius: 6 }} />
              <Bar dataKey="open" name="Open" fill="#6366f1" radius={[5, 5, 0, 0]} maxBarSize={16} />
              <Bar dataKey="filled" name="Filled" fill="#10b981" radius={[5, 5, 0, 0]} maxBarSize={16} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-indigo-500" /><span className="text-[10px] text-gray-500">Open</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><span className="text-[10px] text-gray-500">Filled</span></div>
          </div>
        </ChartCard>

        <ChartCard title="Offer Acceptance" subtitle="Monthly accepted vs. declined" className="col-span-1" insightId="chart_offer" anomalyId="anomaly_nov_decline" onOpenInsight={onOpenInsight}>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={offerData} barCategoryGap="35%" barGap={3}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <Tooltip content={<RichTooltip />} cursor={{ fill: "rgba(16,185,129,0.04)", radius: 6 }} />
              <Bar dataKey="accepted" name="Accepted" fill="#10b981" radius={[5, 5, 0, 0]} maxBarSize={16} />
              <Bar dataKey="declined" name="Declined" fill="#fca5a5" radius={[5, 5, 0, 0]} maxBarSize={16} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><span className="text-[10px] text-gray-500">Accepted</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-300" /><span className="text-[10px] text-gray-500">Declined</span></div>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="🚨 Roles Needing Attention" subtitle="Longest open positions with risk signals" insightId="anomaly_high_risk_roles" anomalyId="anomaly_high_risk_roles" onOpenInsight={onOpenInsight}>
        <div className="space-y-2">
          {urgentRoles.map((r, i) =>
          <motion.div
            key={i}
            whileHover={{ x: 4 }}
            onHoverStart={() => setHoveredRole(i)}
            onHoverEnd={() => setHoveredRole(null)}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${r.risk === "high" ? "bg-red-50 border-red-100 hover:border-red-300" : "bg-amber-50 border-amber-100 hover:border-amber-300"}`}>
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${r.risk === "high" ? "bg-red-500 animate-pulse" : "bg-amber-400"}`} />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-gray-900">{r.title}</p>
                <p className="text-[11px] text-gray-500">{r.dept}</p>
              </div>
              {/* Days open bar */}
              <div className="w-28 hidden lg:block">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] text-gray-400">Days open</span>
                  <span className={`text-[11px] font-bold ${r.risk === "high" ? "text-red-600" : "text-amber-600"}`}>{r.daysOpen}d</span>
                </div>
                <div className="bg-white/60 rounded-full h-1.5 overflow-hidden">
                  <div className={`h-full rounded-full ${r.risk === "high" ? "bg-red-400" : "bg-amber-400"}`} style={{ width: `${r.daysOpen / 60 * 100}%` }} />
                </div>
              </div>
              <div className="text-center w-14">
                <p className="text-[15px] font-bold text-gray-800">{r.applicants}</p>
                <p className="text-[10px] text-gray-400">Applicants</p>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${r.risk === "high" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                {r.risk === "high" ? "⚠ High Risk" : "◐ Medium"}
              </span>
            </motion.div>
          )}
        </div>
      </ChartCard>
    </div>);

}

// Placeholder icon shim
const Briefcase2 = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>;

// ── Tab: Recruiter Productivity ───────────────────────────────────────────────
function RecruiterProductivity({ onOpenInsight }) {
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [metric, setMetric] = useState("screenings");

  const metricOptions = [
  { key: "screenings", label: "Screenings" },
  { key: "interviews", label: "Interviews" },
  { key: "placements", label: "Placements" }];


  const radarData = selectedRecruiter != null ? [
  { subject: "Screenings", value: Math.round(recruiterData[selectedRecruiter].screenings / 48 * 100) },
  { subject: "Interviews", value: Math.round(recruiterData[selectedRecruiter].interviews / 22 * 100) },
  { subject: "Offers", value: Math.round(recruiterData[selectedRecruiter].offers / 8 * 100) },
  { subject: "Placements", value: Math.round(recruiterData[selectedRecruiter].placements / 6 * 100) },
  { subject: "Speed", value: Math.round(24 / recruiterData[selectedRecruiter].avg_ttf * 100) },
  { subject: "Score", value: recruiterData[selectedRecruiter].score }] :
  [];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-4">
        {[
        { label: "Avg Screenings/Recruiter", value: "38.75", sub: "Across 4 recruiters", trend: "+12% vs last month", up: true, color: "text-indigo-600", icon: Users, insightId: "recruiter_productivity" },
        { label: "Avg Interviews/Recruiter", value: "16.75", sub: "Per recruiter", trend: "+8% vs last month", up: true, color: "text-violet-600", icon: Activity, insightId: "recruiter_productivity" },
        { label: "Avg Time to Fill", value: "30d", sub: "Team average", trend: "-4d vs last month", up: true, color: "text-emerald-600", icon: Clock, insightId: "kpi_ttf" },
        { label: "Placements This Month", value: "17", sub: "Total hires closed", trend: "+3 vs last month", up: true, color: "text-amber-600", icon: CheckCircle, insightId: "recruiter_productivity" }].
        map((k, i) => <StatCard key={i} {...k} onOpenInsight={onOpenInsight} />)}
      </div>

      <div className="grid grid-cols-5 gap-4">
        {/* Leaderboard */}
        <ChartCard title="Leaderboard" subtitle="Click a recruiter to explore" className="col-span-2" insightId="recruiter_productivity" onOpenInsight={onOpenInsight}>
          <div className="space-y-3">
            {recruiterData.map((r, i) =>
            <motion.div
              key={i}
              whileHover={{ x: 3 }}
              onClick={() => setSelectedRecruiter(selectedRecruiter === i ? null : i)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border-2 ${selectedRecruiter === i ? "border-indigo-300 bg-indigo-50" : "border-transparent hover:bg-gray-50"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0`} style={{ background: r.color + "22", color: r.color }}>
                  {i === 0 ? "🥇" : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[12px] font-semibold text-gray-800">{r.name}</p>
                    <span className="text-[11px] font-bold" style={{ color: r.color }}>{r.score}</span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${r.score}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-full rounded-full" style={{ background: r.color }} />
                  </div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] text-gray-400">{r.screenings} screened</span>
                    <span className="text-[10px] text-gray-400">{r.placements} placed</span>
                    <span className="text-[10px] text-gray-400">{r.avg_ttf}d avg</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </ChartCard>

        {/* Radar or Trend */}
        <ChartCard
          title={selectedRecruiter != null ? `${recruiterData[selectedRecruiter].name} – Performance` : "Weekly Activity Trend"}
          subtitle={selectedRecruiter != null ? "Multi-dimensional performance score" : "Screenings across all recruiters"}
          className="col-span-3"
          action={
          selectedRecruiter == null &&
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
                {metricOptions.map((m) =>
            <button key={m.key} onClick={() => setMetric(m.key)} className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all ${metric === m.key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>{m.label}</button>
            )}
              </div>

          }>
          <AnimatePresence mode="wait">
            {selectedRecruiter != null ?
            <motion.div key="radar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ResponsiveContainer width="100%" height={200}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#f1f5f9" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                    <Radar dataKey="value" stroke={recruiterData[selectedRecruiter].color} fill={recruiterData[selectedRecruiter].color} fillOpacity={0.2} strokeWidth={2} />
                    <Tooltip content={<RichTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </motion.div> :

            <motion.div key="line" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={recruiterTrendData}>
                    <defs>
                      {recruiterData.map((r, i) =>
                    <linearGradient key={i} id={`rGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={r.color} stopOpacity={0.15} />
                          <stop offset="100%" stopColor={r.color} stopOpacity={0} />
                        </linearGradient>
                    )}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
                    <Tooltip content={<RichTooltip />} />
                    {[{ key: "sarah", r: recruiterData[0] }, { key: "james", r: recruiterData[1] }, { key: "priya", r: recruiterData[2] }, { key: "alex", r: recruiterData[3] }].map(({ key, r }) =>
                  <Area key={key} type="monotone" dataKey={key} name={r.name} stroke={r.color} strokeWidth={2} fill={`url(#rGrad${recruiterData.indexOf(r)})`} dot={{ r: 3, fill: r.color, stroke: "#fff", strokeWidth: 1.5 }} activeDot={{ r: 5 }} />
                  )}
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex items-center gap-5 mt-2 flex-wrap">
                  {recruiterData.map((r, i) =>
                <div key={i} className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: r.color }} />
                      <span className="text-[10px] text-gray-500">{r.name}</span>
                    </div>
                )}
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </ChartCard>
      </div>

      {/* Task Completion */}
      <ChartCard title="Team Task Completion" subtitle="% completion across all task types this month" insightId="chart_completion" anomalyId="chart_completion" onOpenInsight={onOpenInsight}>
        <div className="grid grid-cols-4 gap-4">
          {taskCompletionData.map((t, i) =>
          <div key={i} className="relative">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[12px] font-semibold text-gray-700">{t.name}</p>
                <p className="text-[13px] font-bold" style={{ color: t.fill }}>{t.value}%</p>
              </div>
              <div className="bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${t.value}%` }}
                transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${t.fill}, ${t.fill}99)` }} />
              </div>
              <p className="text-[10px] text-gray-400 mt-1.5">{t.value >= 85 ? "✓ On track" : t.value >= 70 ? "◐ Near target" : "⚠ Behind"}</p>
            </div>
          )}
        </div>
      </ChartCard>
    </div>);

}

// ── Tab: Funnel Conversion ────────────────────────────────────────────────────
function FunnelConversion({ onOpenInsight }) {
  const [hoveredStage, setHoveredStage] = useState(null);
  const [selectedSource, setSelectedSource] = useState(null);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-4">
        {[
        { label: "Total Applicants", value: "1,240", sub: "Last 90 days", trend: "+18% vs prior", up: true, color: "text-indigo-600", icon: Users, insightId: "chart_source" },
        { label: "Screening Rate", value: "39%", sub: "Applied → Screened", trend: "+4% vs prior", up: true, color: "text-violet-600", icon: Filter, insightId: "chart_dropoff" },
        { label: "Interview → Offer", value: "35.6%", sub: "Best conversion stage", trend: "+2.1% vs prior", up: true, color: "text-emerald-600", icon: CheckCircle, insightId: "chart_dropoff" },
        { label: "Overall Hire Rate", value: "1.9%", sub: "Applied → Hired", trend: "-0.2% vs prior", up: false, color: "text-amber-600", icon: Target, insightId: "kpi_hirerate", anomalyId: "kpi_hirerate" }].
        map((k, i) => <StatCard key={i} {...k} onOpenInsight={onOpenInsight} />)}
      </div>

      <div className="grid grid-cols-5 gap-4">
        {/* Interactive Funnel */}
        <ChartCard title="Hiring Funnel" subtitle="Hover a stage for details" className="col-span-3" insightId="chart_dropoff" onOpenInsight={onOpenInsight}>
          <div className="space-y-1.5">
            {funnelData.map((s, i) => {
              const dropPct = i > 0 ? 100 - Math.round(s.count / funnelData[i - 1].count * 100) : 0;
              const isHovered = hoveredStage === i;
              return (
                <motion.div
                  key={i}
                  onHoverStart={() => setHoveredStage(i)}
                  onHoverEnd={() => setHoveredStage(null)}
                  className="flex items-center gap-3 group cursor-pointer"
                  whileHover={{ scale: 1.01 }}>
                  <p className="text-[11px] text-gray-500 w-20 shrink-0 text-right font-medium">{s.stage}</p>
                  <div className="flex-1 bg-gray-100 rounded-lg h-8 relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(s.pct, 3)}%` }}
                      transition={{ duration: 0.9, delay: i * 0.08, ease: "easeOut" }}
                      className={`h-full flex items-center justify-between px-3 transition-opacity ${isHovered ? "opacity-90" : "opacity-100"}`}
                      style={{ background: `linear-gradient(90deg, ${s.color}, ${s.color}cc)` }}>
                      <span className="text-white text-[11px] font-bold">{s.count.toLocaleString()}</span>
                      {s.pct > 15 && <span className="text-white/80 text-[10px]">{s.pct}%</span>}
                    </motion.div>
                  </div>
                  <div className="w-16 shrink-0 text-right">
                    {i > 0 ?
                    <span className="text-[10px] font-semibold text-red-400">-{dropPct}%</span> :

                    <span className="text-[10px] font-semibold text-indigo-500">100%</span>
                    }
                  </div>
                </motion.div>);

            })}
          </div>
          <AnimatePresence>
            {hoveredStage != null &&
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="mt-4 p-3 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center gap-3">
                <span className="text-lg">{funnelData[hoveredStage].icon}</span>
                <div>
                  <p className="text-[12px] font-semibold text-indigo-800">{funnelData[hoveredStage].stage} Stage</p>
                  <p className="text-[11px] text-indigo-600">{funnelData[hoveredStage].count.toLocaleString()} candidates · {funnelData[hoveredStage].pct}% of total pipeline</p>
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </ChartCard>

        {/* Drop-off Reasons */}
        <ChartCard title="Drop-off Reasons" subtitle="Why candidates exit the pipeline" className="col-span-2" insightId="chart_dropoff" anomalyId="chart_dropoff" onOpenInsight={onOpenInsight}>
          <div className="space-y-3">
            {dropReasonData.map((d, i) =>
            <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[11px] text-gray-700 font-medium">{d.reason}</p>
                  <p className="text-[11px] font-bold text-gray-800">{d.count}</p>
                </div>
                <div className="bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${d.count / 187 * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="h-full rounded-full"
                  style={{ background: d.color }} />
                </div>
              </div>
            )}
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Source Conversion — interactive */}
        <ChartCard title="Source → Hire Conversion" subtitle="Click a source to highlight" insightId="chart_source" onOpenInsight={onOpenInsight}>
          <div className="space-y-2.5 mb-4">
            {sourceFunnelData.map((s, i) =>
            <motion.div
              key={i}
              whileHover={{ x: 4 }}
              onClick={() => setSelectedSource(selectedSource === i ? null : i)}
              className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedSource === i ? "border-opacity-100 bg-opacity-10" : "border-gray-100 hover:border-gray-200"}`}
              style={selectedSource === i ? { borderColor: s.color, background: s.color + "11" } : {}}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                    <p className="text-[12px] font-semibold text-gray-800">{s.source}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-gray-400">{s.applied} applied</span>
                    <span className="text-[11px] font-bold" style={{ color: s.color }}>{s.hired} hired</span>
                    <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-gray-600 font-medium">{s.rate}%</span>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                  animate={{ width: `${s.hired / 10 * 100}%` }}
                  className="h-full rounded-full" style={{ background: s.color }} />
                </div>
              </motion.div>
            )}
          </div>
        </ChartCard>

        {/* Conversion by role */}
        <ChartCard title="Conversion Rate by Role" subtitle="Applied → Hired percentage">
          <div className="space-y-4">
            {convByRoleData.map((r, i) =>
            <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[12px] font-semibold text-gray-800">{r.role}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-400">{r.applied} apps</span>
                    <span className="text-[12px] font-bold text-indigo-600">{r.rate}%</span>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-full h-3 overflow-hidden relative">
                  <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${r.rate * 20}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, #6366f1, #a78bfa)` }}>
                  </motion.div>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-gray-400">{r.hired} hired</span>
                  <span className="text-[10px] text-gray-400">{r.applied - r.hired} not progressed</span>
                </div>
              </div>
            )}
          </div>
        </ChartCard>
      </div>
    </div>);

}

// ── Tab: Analytics ────────────────────────────────────────────────────────────
function Analytics({ onOpenInsight }) {
  const [activeSlice, setActiveSlice] = useState(null);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        <ChartCard title="Pipeline by Stage" subtitle="Active candidates right now" insightId="chart_dropoff" onOpenInsight={onOpenInsight}>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-[26px] font-bold text-gray-900">342</span>
            <span className="text-[11px] text-gray-400">total active</span>
          </div>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={pipelineFunnelData}>
              <defs>
                <linearGradient id="pgGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="stage" tick={{ fontSize: 9, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <Tooltip content={<RichTooltip />} cursor={{ fill: "rgba(99,102,241,0.05)", radius: 6 }} />
              <Bar dataKey="count" fill="url(#pgGrad)" radius={[6, 6, 0, 0]} maxBarSize={38} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Application Inflow" subtitle="Weekly new applications" insightId="kpi_openroles" onOpenInsight={onOpenInsight}>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-[26px] font-bold text-gray-900">28</span>
            <span className="text-[11px] text-gray-400">pending review</span>
          </div>
          <ResponsiveContainer width="100%" height={170}>
            <AreaChart data={[
            { week: "W1", count: 45 }, { week: "W2", count: 62 },
            { week: "W3", count: 38 }, { week: "W4", count: 28 }]
            }>
              <defs>
                <linearGradient id="appFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <Tooltip content={<RichTooltip />} />
              <Area type="monotone" dataKey="count" name="Applications" stroke="#f97316" strokeWidth={2.5} fill="url(#appFill)" dot={{ fill: "#f97316", r: 4, stroke: "#fff", strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Interactive Donut */}
        <ChartCard title="Source Breakdown" subtitle="Click a segment to focus" insightId="chart_source" onOpenInsight={onOpenInsight}>
          <div className="flex items-center justify-between">
            <ResponsiveContainer width={140} height={140}>
              <RechartsPieChart>
                <Pie
                  data={sourceData}
                  cx="50%" cy="50%"
                  innerRadius={42} outerRadius={64}
                  paddingAngle={3}
                  dataKey="value"
                  onMouseEnter={(_, i) => setActiveSlice(i)}
                  onMouseLeave={() => setActiveSlice(null)}>
                  {sourceData.map((e, i) =>
                  <Cell
                    key={i}
                    fill={e.color}
                    opacity={activeSlice == null || activeSlice === i ? 1 : 0.35}
                    stroke={activeSlice === i ? "#fff" : "none"}
                    strokeWidth={3} />
                  )}
                </Pie>
                <Tooltip content={<RichTooltip />} />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="flex-1 pl-3 space-y-2">
              {sourceData.map((s, i) =>
              <div
                key={i}
                onMouseEnter={() => setActiveSlice(i)}
                onMouseLeave={() => setActiveSlice(null)}
                className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform group-hover:scale-125" style={{ background: s.color }} />
                  <span className="text-[11px] text-gray-600 flex-1">{s.name}</span>
                  <span className="text-[11px] font-bold" style={{ color: s.color }}>{s.value}%</span>
                </div>
              )}
            </div>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ChartCard title="Monthly Processing Trends" subtitle="JDs published vs resumes processed">
          <div className="flex items-baseline gap-4 mb-4">
            <div><span className="text-[22px] font-bold text-violet-600">23</span><span className="text-[11px] text-gray-400 ml-1">JDs</span></div>
            <div><span className="text-[22px] font-bold text-emerald-600">156</span><span className="text-[11px] text-gray-400 ml-1">Resumes</span></div>
          </div>
          <ResponsiveContainer width="100%" height={170}>
            <LineChart data={monthlyData}>
              <defs>
                <linearGradient id="jdFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <Tooltip content={<RichTooltip />} />
              <Line type="monotone" dataKey="jd" name="JDs" stroke="#8b5cf6" strokeWidth={2.5} dot={{ fill: "#8b5cf6", r: 4, stroke: "#fff", strokeWidth: 2 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="resumes" name="Resumes" stroke="#10b981" strokeWidth={2.5} dot={{ fill: "#10b981", r: 4, stroke: "#fff", strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Applicants per Job" subtitle="Volume by active role">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-[26px] font-bold text-gray-900">203</span>
            <span className="text-[11px] text-gray-400">Frontend Engineer (peak)</span>
          </div>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={applicantsPerJobData} layout="vertical">
              <defs>
                <linearGradient id="jobH" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <YAxis dataKey="job" type="category" tick={{ fontSize: 10, fill: "#94a3b8" }} width={100} tickLine={false} axisLine={false} />
              <Tooltip content={<RichTooltip />} cursor={{ fill: "rgba(59,130,246,0.04)", radius: 6 }} />
              <Bar dataKey="count" fill="url(#jobH)" radius={[0, 6, 6, 0]} maxBarSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>);

}

// ── Main ──────────────────────────────────────────────────────────────────────
const TABS = [
{ key: "health", label: "Hiring Health", icon: Activity },
{ key: "productivity", label: "Recruiter Productivity", icon: Award },
{ key: "funnel", label: "Funnel Conversion", icon: Filter },
{ key: "analytics", label: "Analytics", icon: BarChart3 }];


export default function Dashboard() {
  const { activeInsight, openInsight, closeInsight } = useAIInsight();
  const [activeTab, setActiveTab] = useState("health");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined });
  const [selectedPreset, setSelectedPreset] = useState("Last 90 days");
  const datePickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
        setIsDatePickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const presets = [
    { label: "Last 7 days", days: 7 },
    { label: "Last 30 days", days: 30 },
    { label: "Last 90 days", days: 90 },
    { label: "Last 6 months", days: 180 },
    { label: "Last year", days: 365 },
  ];

  const applyPreset = (preset) => {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - preset.days);
    setDateRange({ from, to });
    setSelectedPreset(preset.label);
    setIsDatePickerOpen(false);
  };

  const dateLabel = dateRange.from && dateRange.to && selectedPreset === "Custom"
    ? `${format(dateRange.from, "MMM d")} – ${format(dateRange.to, "MMM d, yyyy")}`
    : selectedPreset;
  const [chatMessages, setChatMessages] = useState([
  { role: "assistant", content: "Hi! I'm your analytics assistant. Ask me anything about your recruitment data." }]
  );
  const [chatInput, setChatInput] = useState("");
  const [slideIndex, setSlideIndex] = useState(0);
  const [activeContext, setActiveContext] = useState(null);
  const hasInteracted = chatMessages.length > 1;

  const handleSelectContext = (topic) => {
    setActiveContext(topic);
    setChatMessages((prev) => [
    ...prev,
    { role: "user", content: topic.prompt },
    { role: "assistant", content: `Sure! Let's deep dive into **${topic.label}**. Based on your current data, here's what I'm seeing...` }]
    );
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { role: "user", content: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { role: "assistant", content: "Based on the data, your top performing source is direct applications at 45%. Your conversion rate from screening to interview is around 29%." }]);
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F3F5]">
      {/* Header */}
      <div className="px-8 pt-6 pb-0 shrink-0">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-[22px] font-semibold text-gray-900">Analytics Dashboard</h1>
            <p className="text-[13px] text-gray-500 mt-0.5">Hiring overview · Last 90 days</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative" ref={datePickerRef}>
              <button
                onClick={() => setIsDatePickerOpen((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] font-medium transition-colors ${isDatePickerOpen ? "border-indigo-400 bg-indigo-50 text-indigo-700" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}>
                <Calendar className="w-3.5 h-3.5" /> {dateLabel}
              </button>
              <AnimatePresence>
                {isDatePickerOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 z-50 bg-white rounded-2xl border border-gray-200 shadow-xl flex overflow-hidden">
                    {/* Presets */}
                    <div className="w-40 border-r border-gray-100 p-2 flex flex-col gap-0.5">
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide px-2 py-1.5">Presets</p>
                      {presets.map((p) => (
                        <button
                          key={p.label}
                          onClick={() => applyPreset(p)}
                          className={`text-left px-3 py-2 rounded-lg text-[12px] font-medium transition-colors ${selectedPreset === p.label ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50"}`}>
                          {p.label}
                        </button>
                      ))}
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={() => setSelectedPreset("Custom")}
                          className={`w-full text-left px-3 py-2 rounded-lg text-[12px] font-medium transition-colors ${selectedPreset === "Custom" ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50"}`}>
                          Custom range
                        </button>
                      </div>
                    </div>
                    {/* Calendar */}
                    <div className="p-3">
                      <CalendarPicker
                        mode="range"
                        selected={dateRange}
                        onSelect={(range) => {
                          setDateRange(range || { from: undefined, to: undefined });
                          setSelectedPreset("Custom");
                        }}
                        numberOfMonths={2}
                        className="text-[12px]"
                      />
                      <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-gray-100">
                        <button onClick={() => setIsDatePickerOpen(false)} className="px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50 rounded-lg">Cancel</button>
                        <button onClick={() => setIsDatePickerOpen(false)} className="px-3 py-1.5 text-[12px] font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Apply</button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-[12px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
            <button
              onClick={() => setIsChatOpen((v) => !v)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 text-white text-[12px] font-semibold hover:bg-blue-700 transition-colors shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> AI Deep Dive
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex items-center border-b border-gray-200">
          {TABS.map(({ key, label, icon: Icon }) =>
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-5 py-3 text-[13px] font-medium border-b-2 transition-all ${activeTab === key ? "border-indigo-600 text-indigo-700" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}>
              {activeTab === "health" && <HiringHealth onOpenInsight={openInsight} />}
              {activeTab === "productivity" && <RecruiterProductivity onOpenInsight={openInsight} />}
              {activeTab === "funnel" && <FunnelConversion onOpenInsight={openInsight} />}
              {activeTab === "analytics" && <Analytics onOpenInsight={openInsight} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* AI Chat Sidebar */}
        <AnimatePresence>
          {isChatOpen &&
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 380, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="shrink-0 bg-white border-l border-gray-200 flex flex-col overflow-hidden my-2 mr-2 rounded-2xl shadow-lg"
            style={{ height: "calc(100vh - 120px)", position: "sticky", top: 0, alignSelf: "flex-start" }}>
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
                {chatMessages.map((msg, idx) =>
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-[12px] leading-relaxed ${msg.role === "user" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-900"}`}>
                      {msg.content}
                    </div>
                  </div>
              )}

                {!hasInteracted &&
              <div className="pt-2">
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide text-center mb-3">Choose a topic</p>
                    <motion.div
                  key={CONTEXT_TOPICS[slideIndex].id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`rounded-2xl border ${CONTEXT_TOPICS[slideIndex].border} ${CONTEXT_TOPICS[slideIndex].bg} p-5 flex flex-col items-center text-center gap-3 cursor-pointer hover:shadow-md transition-all`}
                  onClick={() => handleSelectContext(CONTEXT_TOPICS[slideIndex])}>
                      {(() => {const Icon = CONTEXT_TOPICS[slideIndex].Icon;return <Icon className={`w-6 h-6 ${CONTEXT_TOPICS[slideIndex].iconColor}`} />;})()}
                      <div>
                        <p className="text-[14px] font-semibold text-gray-800">{CONTEXT_TOPICS[slideIndex].label}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{CONTEXT_TOPICS[slideIndex].sublabel}</p>
                      </div>
                      <span className={`text-[11px] font-medium ${CONTEXT_TOPICS[slideIndex].iconColor}`}>Start deep dive →</span>
                    </motion.div>
                    <div className="flex items-center justify-center gap-2 mt-3">
                      <button onClick={() => setSlideIndex((i) => (i - 1 + CONTEXT_TOPICS.length) % CONTEXT_TOPICS.length)} className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-gray-300">
                        <ChevronLeft className="w-3 h-3 text-gray-500" />
                      </button>
                      <div className="flex gap-1">
                        {CONTEXT_TOPICS.map((_, i) =>
                    <button key={i} onClick={() => setSlideIndex(i)} className={`rounded-full transition-all ${i === slideIndex ? "w-3.5 h-2 bg-indigo-500" : "w-2 h-2 bg-gray-200"}`} />
                    )}
                      </div>
                      <button onClick={() => setSlideIndex((i) => (i + 1) % CONTEXT_TOPICS.length)} className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-gray-300">
                        <ChevronRight className="w-3 h-3 text-gray-500" />
                      </button>
                    </div>
                  </div>
              }
              </div>

              <div className="p-3 border-t border-gray-100 shrink-0">
                <div className="flex gap-2">
                  <Textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {if (e.key === "Enter" && !e.shiftKey) {e.preventDefault();handleSendChat();}}}
                  placeholder="Ask about metrics…"
                  className="resize-none text-[12px]"
                  rows={2} />
                  <Button onClick={handleSendChat} size="icon" className="bg-blue-600 hover:bg-blue-700 rounded-xl shrink-0 h-9 w-9">
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>

      {/* Global AI Insight Panel */}
      <AnimatePresence>
        {activeInsight && (
          <AIInsightPanel insightId={activeInsight} onClose={closeInsight} />
        )}
      </AnimatePresence>
    </div>);

}