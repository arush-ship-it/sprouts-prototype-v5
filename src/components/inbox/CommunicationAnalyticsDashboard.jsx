import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, TrendingUp, TrendingDown, Mail, MessageSquare, Zap, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const RichTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white rounded-xl px-4 py-3 shadow-2xl text-[12px] border border-gray-700">
        <p className="font-semibold text-gray-300 mb-2">{label}</p>
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-gray-300">{p.name}:</span>
            <span className="font-bold text-white">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const trendData = [
  { day: "Mon", emails: 18, sequences: 8, replies: 11 },
  { day: "Tue", emails: 22, sequences: 10, replies: 15 },
  { day: "Wed", emails: 19, sequences: 12, replies: 13 },
  { day: "Thu", emails: 25, sequences: 11, replies: 18 },
  { day: "Fri", emails: 28, sequences: 12, replies: 20 },
  { day: "Sat", emails: 16, sequences: 9, replies: 10 },
  { day: "Sun", emails: 12, sequences: 6, replies: 8 },
];

const sequenceData = [
  { name: "Active", value: 12, color: "#6366f1", icon: Zap },
  { name: "Completed", value: 28, color: "#10b981", icon: CheckCircle },
  { name: "Paused", value: 5, color: "#f59e0b", icon: Clock },
  { name: "Error", value: 2, color: "#ef4444", icon: AlertCircle },
];

const total = sequenceData.reduce((s, d) => s + d.value, 0);

export default function CommunicationAnalyticsDashboard() {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsExpanded(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const statCards = [
    { label: "Emails Sent", value: "58", sub: "Last 7 days", trend: "+12%", up: true, color: "text-indigo-600", bg: "bg-indigo-50", icon: Mail },
    { label: "Reply Rate", value: "68%", sub: "Avg. response", trend: "+4% vs prior", up: true, color: "text-emerald-600", bg: "bg-emerald-50", icon: MessageSquare },
    { label: "Sequences", value: "47", sub: "Candidates enrolled", trend: "+3 this week", up: true, color: "text-violet-600", bg: "bg-violet-50", icon: Zap },
    { label: "Pending", value: "24", sub: "Awaiting reply", trend: "-3%", up: false, color: "text-amber-600", bg: "bg-amber-50", icon: Clock },
  ];

  return (
    <div className="mx-8 my-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-slate-400 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-slate-800 text-sm font-semibold">Communication Health</h2>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all">
          {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}>
            <div className="space-y-4">

              {/* Stat Cards Row */}
              <div className="grid grid-cols-4 gap-3">
                {statCards.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{s.label}</p>
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${s.bg}`}>
                        <s.icon className={`w-3 h-3 ${s.color}`} />
                      </div>
                    </div>
                    <p className={`text-[24px] font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-[10px] text-gray-400">{s.sub}</p>
                    <div className={`flex items-center gap-1 text-[10px] font-semibold ${s.up ? "text-emerald-600" : "text-red-500"}`}>
                      {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {s.trend}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Area Chart + Sequence Status side by side */}
              <div className="grid grid-cols-5 gap-3">

                {/* 7-day area chart */}
                <div className="col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <p className="text-[13px] font-semibold text-gray-900 mb-0.5">7-Day Activity</p>
                  <p className="text-[11px] text-gray-400 mb-4">Emails, sequences, and replies over the week</p>
                  <ResponsiveContainer width="100%" height={130}>
                    <AreaChart data={trendData} margin={{ top: 0, right: 0, left: -28, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gEmail" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
                          <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="gSeq" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="gReply" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                      <Tooltip content={<RichTooltip />} />
                      <Area type="monotone" dataKey="emails" name="Emails" stroke="#6366f1" strokeWidth={2} fill="url(#gEmail)" dot={false} activeDot={{ r: 4 }} />
                      <Area type="monotone" dataKey="replies" name="Replies" stroke="#10b981" strokeWidth={2} fill="url(#gReply)" dot={false} activeDot={{ r: 4 }} />
                      <Area type="monotone" dataKey="sequences" name="Sequences" stroke="#8b5cf6" strokeWidth={1.5} fill="url(#gSeq)" dot={false} activeDot={{ r: 4 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="flex items-center gap-5 mt-3">
                    {[{ label: "Emails", color: "#6366f1" }, { label: "Replies", color: "#10b981" }, { label: "Sequences", color: "#8b5cf6" }].map((l, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                        <span className="text-[10px] text-gray-500">{l.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sequence Status */}
                <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <p className="text-[13px] font-semibold text-gray-900 mb-0.5">Sequence Status</p>
                  <p className="text-[11px] text-gray-400 mb-4">47 candidates enrolled</p>
                  <div className="space-y-3">
                    {sequenceData.map((s, i) => {
                      const pct = Math.round((s.value / total) * 100);
                      return (
                        <div key={i}>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-1.5">
                              <s.icon className="w-3 h-3" style={{ color: s.color }} />
                              <span className="text-[11px] font-medium text-gray-700">{s.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-bold text-gray-800">{s.value}</span>
                              <span className="text-[10px] text-gray-400">{pct}%</span>
                            </div>
                          </div>
                          <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                              className="h-full rounded-full"
                              style={{ background: s.color }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}