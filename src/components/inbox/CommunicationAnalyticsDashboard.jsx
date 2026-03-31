import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, TrendingUp, TrendingDown, Mail, MessageSquare, Zap, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const RichTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white rounded-xl px-4 py-3 shadow-2xl text-[12px] border border-gray-700">
        <p className="font-semibold text-gray-300 mb-2">{label}</p>
        {payload.map((p, i) =>
        <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-gray-300">{p.name}:</span>
            <span className="font-bold text-white">{p.value}</span>
          </div>
        )}
      </div>);

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
{ day: "Sun", emails: 12, sequences: 6, replies: 8 }];


const sequenceData = [
{ name: "Active", value: 12, color: "#6366f1", icon: Zap },
{ name: "Completed", value: 28, color: "#10b981", icon: CheckCircle },
{ name: "Paused", value: 5, color: "#f59e0b", icon: Clock },
{ name: "Error", value: 2, color: "#ef4444", icon: AlertCircle }];


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
  { label: "Pending", value: "24", sub: "Awaiting reply", trend: "-3%", up: false, color: "text-amber-600", bg: "bg-amber-50", icon: Clock }];


  return (
    <div className="mx-8 my-5">
      {/* Header */}
      











      

      <AnimatePresence initial={false}>
        {isExpanded &&
        <motion.div
          key="content"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}>
            





































































































          
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}