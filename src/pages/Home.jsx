import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Users,
  FileText,
  TrendingUp,
  Inbox,
  FileCheck,
  PieChart,
  Bell,
  Settings,
  BarChart3,
  Briefcase,
  PlusCircle,
  UserSquare2,
  ExternalLink,
  ArrowUpRight } from
"lucide-react";
import { Button } from "@/components/ui/button";
import TabSwitcher from "@/components/shared/TabSwitcher";

// Animated counter hook
function useCountUp(target, duration = 1000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const num = parseFloat(target);
    if (isNaN(num)) {setCount(target);return;}
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Number.isInteger(num) ? Math.round(eased * num) : (eased * num).toFixed(1));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return count;
}

// Mini sparkline bar chart
function MiniSparkline({ data, color }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-0.5 h-8">
      {data.map((v, i) =>
      <div
        key={i}
        className={`w-1.5 rounded-sm transition-all duration-300 ${color}`}
        style={{ height: `${v / max * 100}%`, opacity: i === data.length - 1 ? 1 : 0.4 + i / data.length * 0.5 }} />

      )}
    </div>);

}

// Pipeline fill bar
function PipelineBar({ value, total, color }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {setTimeout(() => setWidth(value / total * 100), 200);}, [value, total]);
  return (
    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
      <div className={`h-1.5 rounded-full transition-all duration-700 ease-out ${color}`} style={{ width: `${width}%` }} />
    </div>);

}

// Animated stat card
function StatCard({ stat }) {
  const num = parseFloat(stat.value);
  const animated = useCountUp(isNaN(num) ? 0 : num);
  const displayValue = isNaN(num) ? stat.value : Number.isInteger(num) ? animated : animated;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 cursor-default transition-all duration-200 ${hovered ? "shadow-md -translate-y-0.5 border-gray-200" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <div className={`${stat.iconBg} p-2 rounded-[10px] flex-shrink-0`}>
            <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
          </div>
          <div className="flex-1">
            <p className="text-gray-500 mb-1 text-xs">{stat.title}</p>
            <h3 className="text-gray-900 mb-1 text-xl font-bold">{displayValue}</h3>
            <div className="flex items-center gap-1">
              {stat.trend && <ArrowUpRight className="w-3 h-3 text-green-500" />}
              <p className={`text-[12px] ${stat.trend ? "text-green-500 font-medium" : "text-gray-400"}`}>{stat.subtitle}</p>
            </div>
          </div>
        </div>
        {stat.sparkline &&
        <div className="shrink-0">
            <MiniSparkline data={stat.sparkline} color={stat.sparklineColor || "bg-blue-400"} />
          </div>
        }
      </div>
    </div>);

}

export default function Home() {
  const stats = [
  {
    icon: Users,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
    title: "Applicants per Job Posting",
    value: "45.2",
    subtitle: "Average per posting",
    sparkline: [28, 32, 38, 35, 40, 43, 45],
    sparklineColor: "bg-blue-400"
  },
  {
    icon: FileText,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-50",
    title: "JD Processed This Month",
    value: "23",
    subtitle: "+12% from last month",
    trend: true,
    sparkline: [10, 14, 16, 18, 20, 21, 23],
    sparklineColor: "bg-purple-400"
  },
  {
    icon: TrendingUp,
    iconColor: "text-green-500",
    iconBg: "bg-green-50",
    title: "Candidates in Pipeline",
    value: "342",
    subtitle: "Across all jobs",
    sparkline: [200, 240, 260, 290, 310, 330, 342],
    sparklineColor: "bg-green-400"
  },
  {
    icon: Inbox,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    title: "New Applications",
    value: "28",
    subtitle: "To be reviewed",
    sparkline: [10, 15, 18, 22, 20, 25, 28],
    sparklineColor: "bg-orange-400"
  },
  {
    icon: FileCheck,
    iconColor: "text-pink-500",
    iconBg: "bg-pink-50",
    title: "Resumes Processed This Month",
    value: "156",
    subtitle: "+38% from last month",
    trend: true,
    sparkline: [60, 80, 100, 115, 130, 145, 156],
    sparklineColor: "bg-pink-400"
  },
  {
    icon: PieChart,
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-50",
    title: "Application Source Breakdown",
    value: "Direct: 45%",
    subtitle: "LinkedIn: 35%, Others: 20%"
  }];


  const jobs = [
  {
    id: 1,
    title: "Senior Product Designer",
    department: "Design",
    applicants: 156,
    inPipeline: 34,
    status: "ACTIVE"
  },
  {
    id: 2,
    title: "Frontend Engineer",
    department: "Engineering",
    applicants: 203,
    inPipeline: 45,
    status: "ACTIVE"
  },
  {
    id: 3,
    title: "Product Manager",
    department: "Product",
    applicants: 89,
    inPipeline: 12,
    status: "ACTIVE"
  }];


  const recentActivity = [
  {
    id: 1,
    text: "3 candidates moved to interview stage",
    time: "1 hour ago"
  },
  {
    id: 2,
    text: "Resume screening completed for 12 applicants",
    time: "3 hours ago"
  },
  {
    id: 3,
    text: "5 candidates auto-qualified for screening",
    time: "6 hours ago"
  }];


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200">
        


      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="px-1 flex items-center gap-3">
            <h1 className="text-slate-700 text-2xl font-semibold">Hello Arush, Welcome to SproutsAI!

            </h1>
            
            <Link to={createPageUrl("Settings")}>
              
            </Link>
          </div>
          

























        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => <StatCard key={index} stat={stat} />)}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* All Jobs */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-gray-800 mb-6 text-base font-semibold">All Jobs</h2>
            <div className="space-y-3">
              {jobs.map((job) => {
                const [hovered, setHovered] = useState(false);
                return (
                  <div
                    key={job.id}
                    className={`bg-[#fcfcfc] p-4 rounded-lg border transition-all duration-200 ${hovered ? "border-blue-100 shadow-sm bg-blue-50/20" : "border-transparent"}`}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`rounded-lg w-10 h-10 flex items-center justify-center transition-colors duration-200 ${hovered ? "bg-blue-50" : "bg-slate-50"}`}>
                          <Briefcase className={`w-5 h-5 transition-colors duration-200 ${hovered ? "text-blue-500" : "text-zinc-500"}`} />
                        </div>
                        <div>
                          <Link to={createPageUrl("Console") + `?jobId=${job.id}`}>
                            <h3 className="text-gray-800 text-base font-medium cursor-pointer hover:text-blue-600">{job.title}</h3>
                          </Link>
                          <p className="text-[12px] text-gray-500">{job.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <p className="text-gray-900 text-base font-semibold">{job.applicants}</p>
                          <p className="text-[11px] text-gray-500">Applicants</p>
                        </div>
                        <div className="text-center min-w-[70px]">
                          <p className="text-blue-600 text-base font-semibold">{job.inPipeline}</p>
                          <p className="text-[11px] text-gray-500">In Pipeline</p>
                          <PipelineBar value={job.inPipeline} total={job.applicants} color="bg-blue-400" />
                        </div>
                        <div className="px-3 py-1 bg-green-100 text-green-700 text-[11px] font-semibold rounded-md">
                          {job.status}
                        </div>
                      </div>
                    </div>
                  </div>);

              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-gray-800 mb-6 text-base font-semibold">Pending Approvals</h2>
            <div className="space-y-4 relative">
              <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gray-100" />
              {recentActivity.map((activity, idx) => {
                const [hovered, setHovered] = useState(false);
                return (
                  <div
                    key={activity.id}
                    className={`flex items-start gap-4 relative transition-all duration-200 ${hovered ? "translate-x-0.5" : ""}`}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}>

                    <div className={`rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 border-2 transition-all duration-200 z-10 ${hovered ? "bg-blue-500 border-blue-500" : "bg-white border-slate-200"}`}>
                      <span className={`text-[13px] font-bold transition-colors duration-200 ${hovered ? "text-white" : "text-slate-400"}`}>✓</span>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className={`text-[14px] font-medium transition-colors duration-200 ${hovered ? "text-blue-600" : "text-gray-900"}`}>{activity.text}</p>
                      <p className="text-[12px] text-gray-400 mt-0.5">{activity.time}</p>
                    </div>
                  </div>);

              })}
            </div>
          </div>
        </div>
      </div>
    </div>);

}