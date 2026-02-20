import React from "react";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Users,
  TrendingUp,
  Eye,
  UserPlus,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const jobData = {
  title: "Senior Product Designer",
  department: "Design",
  location: "San Francisco, CA",
  type: "Full-time",
  salary: "$120k - $180k",
  postedDate: "Feb 15, 2026",
  status: "Active",
  description:
    "We're looking for a talented Senior Product Designer to join our team and help shape the future of our products. You'll work closely with cross-functional teams to create intuitive, user-centered designs.",
  requirements: [
    "5+ years of product design experience",
    "Strong portfolio showcasing UX/UI work",
    "Proficiency in Figma and design systems",
    "Experience with user research and testing",
  ],
};

const stats = [
  { label: "Total Applicants", value: "156", icon: Users, color: "text-blue-600" },
  { label: "In Pipeline", value: "34", icon: TrendingUp, color: "text-violet-600" },
  { label: "In Review", value: "12", icon: Eye, color: "text-orange-600" },
  { label: "Interviews", value: "8", icon: UserPlus, color: "text-emerald-600" },
];

const pipelineData = [
  { stage: "Applied", count: 156 },
  { stage: "Screening", count: 45 },
  { stage: "Assessment", count: 28 },
  { stage: "Interview", count: 15 },
  { stage: "Final", count: 8 },
  { stage: "Offer", count: 3 },
];

const applicationTrend = [
  { date: "Feb 15", count: 12 },
  { date: "Feb 16", count: 18 },
  { date: "Feb 17", count: 25 },
  { date: "Feb 18", count: 31 },
  { date: "Feb 19", count: 38 },
  { date: "Feb 20", count: 32 },
];

export default function JobDetails() {
  return (
    <div className="flex-1 min-h-screen bg-[#FAFAFA] overflow-auto">
      <div className="px-8 pt-8 pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-[24px] font-semibold text-gray-900 tracking-tight">
                {jobData.title}
              </h1>
              <div className="flex items-center gap-4 mt-2 text-[13px] text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  {jobData.department}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {jobData.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {jobData.type}
                </span>
                <span className="flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5" />
                  {jobData.salary}
                </span>
              </div>
            </div>
            <span className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
              {jobData.status}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white border border-gray-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-[28px] font-bold text-gray-900">{stat.value}</p>
              <p className="text-[12px] text-gray-400 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Pipeline Funnel */}
          <div className="p-6 rounded-xl bg-white border border-gray-200">
            <h3 className="text-[16px] font-semibold text-gray-900 mb-4">
              Pipeline Overview
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="stage"
                  tick={{ fontSize: 11 }}
                  stroke="#999"
                />
                <YAxis tick={{ fontSize: 11 }} stroke="#999" />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Application Trend */}
          <div className="p-6 rounded-xl bg-white border border-gray-200">
            <h3 className="text-[16px] font-semibold text-gray-900 mb-4">
              Application Trend
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={applicationTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11 }}
                  stroke="#999"
                />
                <YAxis tick={{ fontSize: 11 }} stroke="#999" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-white border border-gray-200">
            <h3 className="text-[16px] font-semibold text-gray-900 mb-3">
              Job Description
            </h3>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              {jobData.description}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-gray-200">
            <h3 className="text-[16px] font-semibold text-gray-900 mb-3">
              Requirements
            </h3>
            <ul className="space-y-2">
              {jobData.requirements.map((req, idx) => (
                <li
                  key={idx}
                  className="text-[13px] text-gray-600 flex items-start gap-2"
                >
                  <span className="text-emerald-600 mt-1">•</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}