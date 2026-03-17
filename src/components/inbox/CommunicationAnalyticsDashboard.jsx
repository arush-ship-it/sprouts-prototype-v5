import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, TrendingUp, TrendingDown, Mail, MessageSquare, Zap } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const COLORS = {
  active: { start: "#6366f1", end: "#818cf8" },
  completed: { start: "#06b6d4", end: "#22d3ee" },
  paused: { start: "#f59e0b", end: "#fbbf24" },
  error: { start: "#ef4444", end: "#f87171" }
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm border border-slate-100 rounded-2xl shadow-lg px-4 py-3">
        <p className="text-[11px] font-semibold text-slate-500 mb-2">{label}</p>
        {payload.map((p, i) =>
        <div key={i} className="flex items-center gap-2 text-[11px]">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-slate-600">{p.name}:</span>
            <span className="font-bold text-slate-900">{p.value}</span>
          </div>
        )}
      </div>);

  }
  return null;
};

export default function CommunicationAnalyticsDashboard() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [timeFilter, setTimeFilter] = useState("7days");

  useEffect(() => {
    const timer = setTimeout(() => setIsExpanded(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const breakdownData = [
  { label: "Emails", value: 58, icon: Mail, color: "#6366f1" },
  { label: "Messages", value: 42, icon: MessageSquare, color: "#06b6d4" },
  { label: "Sequences", value: 42, icon: Zap, color: "#10b981" }];


  const sequenceData = [
  { name: "Active", value: 12, startColor: "#6366f1", endColor: "#818cf8" },
  { name: "Completed", value: 28, startColor: "#06b6d4", endColor: "#22d3ee" },
  { name: "Paused", value: 5, startColor: "#f59e0b", endColor: "#fbbf24" },
  { name: "Error", value: 2, startColor: "#ef4444", endColor: "#f87171" }];


  const trendData = [
  { day: "Mon", active: 8, completed: 3, paused: 1 },
  { day: "Tue", active: 10, completed: 5, paused: 2 },
  { day: "Wed", active: 12, completed: 8, paused: 2 },
  { day: "Thu", active: 11, completed: 12, paused: 3 },
  { day: "Fri", active: 12, completed: 18, paused: 4 },
  { day: "Sat", active: 12, completed: 25, paused: 4 },
  { day: "Sun", active: 12, completed: 28, paused: 5 }];


  const total = sequenceData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="mx-8 my-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-slate-400 rounded-xl w-8 h-8 from-indigo-500 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-200">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-slate-800 text-sm font-semibold">Communication Health</h2>
            
          </div>
        </div>
        <div className="flex items-center gap-2">
          












          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all">

            {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
      {isExpanded &&
      <motion.div
        key="dashboard-content"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
      <div className="space-y-4">
          {/* Unified Top Row: KPIs + Donut merged */}
          <div className="bg-white px-3 py-3 rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-slate-100">
            <div className="grid grid-cols-5 gap-6">

              {/* Left: KPI + Breakdown */}
              <div className="col-span-2 space-y-4">
                {/* Total Sent - Hero Metric */}
                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Total Sent</p>
                  <p className="text-[42px] font-black text-slate-800 leading-none">142</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-emerald-500" />
                      <span className="text-[10px] font-semibold text-emerald-500">+12%</span>
                    </div>
                    <span className="text-[11px] text-slate-400">Reply rate: <strong className="text-slate-700">68%</strong></span>
                  </div>
                  {/* Mini breakdown pills */}
                  <div className="flex items-center gap-2 mt-3">
                    {breakdownData.map((b, i) =>
                  <div key={i} className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-2.5 py-1">
                        <b.icon className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-700">{b.value}</span>
                      </div>
                  )}
                  </div>
                </div>

                {/* Secondary KPIs */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Pending</p>
                    <p className="text-[28px] font-black text-slate-800 leading-none">24</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <TrendingDown className="w-3 h-3 text-amber-500" />
                      <span className="text-[10px] font-semibold text-amber-500">-3%</span>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Unread</p>
                    <p className="text-[28px] font-black text-slate-800 leading-none">8</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <TrendingUp className="w-3 h-3 text-violet-500" />
                      <span className="text-[10px] font-semibold text-violet-500">+2%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="col-span-1 flex flex-col items-center justify-center gap-6">
                <div className="w-px h-full bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
              </div>

              {/* Right: Sequence Distribution Donut */}
              <div className="px-2 py-3 col-span-2">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-4">Sequence Status</p>
                <div className="flex items-center gap-6">
                  <div className="relative flex-shrink-0">
                    <svg width={0} height={0}>
                      <defs>
                        {sequenceData.map((d, i) =>
                      <linearGradient key={i} id={`grad-${i}`} x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor={d.startColor} />
                            <stop offset="100%" stopColor={d.endColor} />
                          </linearGradient>
                      )}
                      </defs>
                    </svg>
                    <div style={{ width: 140, height: 140 }} className="relative">
                      <ResponsiveContainer width={140} height={140}>
                        <PieChart>
                          <Pie
                          data={sequenceData}
                          cx="50%"
                          cy="50%"
                          innerRadius={42}
                          outerRadius={64}
                          paddingAngle={3}
                          dataKey="value"
                          strokeWidth={0}>

                            {sequenceData.map((entry, idx) =>
                          <Cell key={idx} fill={`url(#grad-${idx})`} />
                          )}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      {/* Center label */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <p className="text-[22px] font-black text-slate-800 leading-none">{total}</p>
                        <p className="text-[9px] text-slate-400 font-medium mt-0.5">total</p>
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex flex-col gap-3 flex-1">
                    {sequenceData.map((item, idx) => {
                    const pct = Math.round(item.value / total * 100);
                    return (
                      <div key={idx} className="flex items-center gap-2.5">
                          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: `linear-gradient(135deg, ${item.startColor}, ${item.endColor})` }} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="text-[11px] text-slate-600 font-medium">{item.name}</span>
                              <span className="text-[11px] font-bold text-slate-800">{item.value}</span>
                            </div>
                            <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                              <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${item.startColor}, ${item.endColor})` }} />

                            </div>
                          </div>
                        </div>);

                  })}
                  </div>
                </div>

                {/* Candidates in sequences */}
                <div className="mt-4 rounded-xl bg-gradient-to-r from-cyan-50 to-indigo-50 border border-cyan-100 px-4 py-3 flex items-center justify-between">
                  <p className="text-[11px] text-slate-500 font-medium">Candidates in sequences</p>
                  <p className="text-[20px] font-black text-indigo-700">47</p>
                </div>

                {/* View All Sequences Button */}
                <button className="bg-slate-50 text-[12px] mt-3 px-4 py-2.5 font-semibold rounded-xl w-full flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
                  <Zap className="w-3.5 h-3.5" />
                  View All Sequences
                </button>
              </div>
            </div>
          </div>

          {/* 7-Day Trend */}
          <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-slate-100 p-6">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-4">7-Day Activity Trend</p>
            <div className="h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                  <defs>
                    <linearGradient id="areaActive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="areaCompleted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="areaPaused" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="completed" name="Completed" stroke="#06b6d4" strokeWidth={2} fill="url(#areaCompleted)" dot={false} />
                  <Area type="monotone" dataKey="active" name="Active" stroke="#6366f1" strokeWidth={2} fill="url(#areaActive)" dot={false} />
                  <Area type="monotone" dataKey="paused" name="Paused" stroke="#f59e0b" strokeWidth={1.5} fill="url(#areaPaused)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </motion.div>
      }
      </AnimatePresence>
    </div>);

}