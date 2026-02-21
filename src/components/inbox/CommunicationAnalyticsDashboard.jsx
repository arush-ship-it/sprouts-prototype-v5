import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function CommunicationAnalyticsDashboard() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [timeFilter, setTimeFilter] = useState("7days");

  useEffect(() => {
    const timer = setTimeout(() => setIsExpanded(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Mock data
  const metrics = [
  {
    label: "Emails Sent",
    value: 142,
    trend: 12,
    positive: true,
    color: "bg-white border-gray-200",
    textColor: "text-blue-700"
  },
  {
    label: "Messages Sent",
    value: 58,
    trend: 5,
    positive: true,
    color: "bg-white border-gray-200",
    textColor: "text-indigo-700"
  },
  {
    label: "Pending Replies",
    value: 24,
    trend: -3,
    positive: false,
    color: "bg-white border-gray-200",
    textColor: "text-amber-700"
  },
  {
    label: "Unread Responses",
    value: 8,
    trend: 2,
    positive: true,
    color: "bg-white border-gray-200",
    textColor: "text-violet-700"
  },
  {
    label: "Failed Deliveries",
    value: 3,
    trend: -1,
    positive: true,
    color: "bg-white border-gray-200",
    textColor: "text-red-700"
  },
  {
    label: "Reply Rate",
    value: "68%",
    trend: 8,
    positive: true,
    color: "bg-white border-gray-200",
    textColor: "text-emerald-700"
  }];


  const sequenceData = [
  { name: "Active", value: 12, fill: "#10b981" },
  { name: "Completed", value: 28, fill: "#6366f1" },
  { name: "Paused", value: 5, fill: "#f59e0b" },
  { name: "Error", value: 2, fill: "#ef4444" }];


  const sequenceOverview = {
    active: 12,
    completed: 28,
    paused: 5,
    errors: 2,
    candidatesInSequences: 47
  };

  const sequenceTrendData = [
  { day: "Mon", active: 8, completed: 3, paused: 1, errors: 0 },
  { day: "Tue", active: 10, completed: 5, paused: 2, errors: 1 },
  { day: "Wed", active: 12, completed: 8, paused: 2, errors: 1 },
  { day: "Thu", active: 11, completed: 12, paused: 3, errors: 1 },
  { day: "Fri", active: 12, completed: 18, paused: 4, errors: 1 },
  { day: "Sat", active: 12, completed: 25, paused: 4, errors: 2 },
  { day: "Sun", active: 12, completed: 28, paused: 5, errors: 2 }];


  const actionRequired = [
  { label: "Candidates Awaiting Reply", count: 15, color: "bg-amber-50 text-amber-700" },
  { label: "Failed Sequence Steps", count: 3, color: "bg-red-50 text-red-700" },
  { label: "Follow-ups Due Today", count: 7, color: "bg-blue-50 text-blue-700" }];


  return (
    <div className="bg-white border-b border-gray-200">
      {/* Header */}
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-[15px] font-semibold text-gray-900">Communication Health</h2>
          <span className="text-[12px] text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
            {timeFilter === "7days" ? "Last 7 days" : timeFilter === "30days" ? "Last 30 days" : "Custom"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-0.5">
            <Button
              variant={timeFilter === "7days" ? "default" : "ghost"}
              size="sm"
              className="h-7 text-[11px] px-2"
              onClick={() => setTimeFilter("7days")}>

              7 days
            </Button>
            <Button
              variant={timeFilter === "30days" ? "default" : "ghost"}
              size="sm"
              className="h-7 text-[11px] px-2"
              onClick={() => setTimeFilter("30days")}>

              30 days
            </Button>
            <Button
              variant={timeFilter === "custom" ? "default" : "ghost"}
              size="sm"
              className="h-7 text-[11px] px-2"
              onClick={() => setTimeFilter("custom")}>

              Custom
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsExpanded(!isExpanded)}>

            {isExpanded ?
            <ChevronUp className="w-4 h-4" /> :

            <ChevronDown className="w-4 h-4" />
            }
          </Button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded &&
      <div className="px-8 pb-6 space-y-6">
          {/* KPI Cards */}
          <div>
            <h3 className="text-[12px] font-semibold text-gray-600 uppercase tracking-wider mb-3">
              Key Metrics
            </h3>
            <div className="grid grid-cols-6 gap-3">
              {metrics.map((metric, idx) =>
            <div
              key={idx}
              className={`p-4 rounded-lg border-2 cursor-pointer hover:shadow-sm transition-all ${metric.color}`}>

                  <p className="text-[11px] text-gray-600 mb-2 font-medium">{metric.label}</p>
                  <div className="flex items-end justify-between">
                    <span className={`text-[20px] font-bold ${metric.textColor}`}>
                      {metric.value}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {metric.positive ?
                  <TrendingUp className={`w-3 h-3 ${metric.textColor}`} /> :

                  <TrendingDown className={`w-3 h-3 ${metric.textColor}`} />
                  }
                      <span className={`text-[10px] font-semibold ${metric.textColor}`}>
                        {metric.positive ? "+" : ""}{metric.trend}%
                      </span>
                    </div>
                  </div>
                </div>
            )}
            </div>
          </div>

          {/* Sequence Overview */}
          <div className="space-y-4">
            {/* Top Row: Status Cards + Donut Chart Side by Side */}
            <div className="grid grid-cols-5 gap-6">
              {/* Left: Status Cards (40%) */}
              <div className="col-span-2">
                <h3 className="text-[12px] font-semibold text-gray-600 uppercase tracking-wider mb-3">
                  Sequence Overview
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-lg bg-emerald-50 border-2 border-emerald-200">
                    <p className="text-[11px] text-emerald-700 font-medium mb-1">Active</p>
                    <p className="text-[24px] font-bold text-emerald-700">{sequenceOverview.active}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-indigo-50 border-2 border-indigo-200">
                    <p className="text-[11px] text-indigo-700 font-medium mb-1">Completed</p>
                    <p className="text-[24px] font-bold text-indigo-700">{sequenceOverview.completed}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-amber-50 border-2 border-amber-200">
                    <p className="text-[11px] text-amber-700 font-medium mb-1">Paused</p>
                    <p className="text-[24px] font-bold text-amber-700">{sequenceOverview.paused}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-red-50 border-2 border-red-200">
                    <p className="text-[11px] text-red-700 font-medium mb-1">Errors</p>
                    <p className="text-[24px] font-bold text-red-700">{sequenceOverview.errors}</p>
                  </div>
                  <div className="col-span-2 p-4 rounded-lg bg-gray-50 border-2 border-gray-200">
                    <p className="text-[11px] text-gray-600 font-medium mb-1">In Sequences</p>
                    <p className="text-[24px] font-bold text-gray-900">{sequenceOverview.candidatesInSequences}</p>
                  </div>
                </div>
              </div>

              {/* Right: Donut Chart (60%) */}
              <div className="col-span-3">
                <h3 className="text-[12px] font-semibold text-gray-600 uppercase tracking-wider mb-3">
                  Current Distribution
                </h3>
                <div className="h-[240px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                      data={sequenceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value">

                        {sequenceData.map((entry, idx) =>
                      <Cell key={`cell-${idx}`} fill={entry.fill} />
                      )}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col gap-1.5 mt-2 text-[11px]">
                  {sequenceData.map((item, idx) =>
                <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }}></div>
                    <span className="text-gray-600">{item.name}</span>
                    <span className="font-semibold text-gray-900 ml-auto">{item.value}</span>
                  </div>
                )}
                </div>
              </div>
            </div>

          </div>

          {/* Action Required */}
          













          {/* 7-Day Trend Chart */}
          



















        </div>
      }
    </div>);

}