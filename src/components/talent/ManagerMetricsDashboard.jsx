import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChevronDown, ChevronUp, Users, Clock } from "lucide-react";

const diversityData = [
  { name: "Female", value: 38, color: "#6366f1" },
  { name: "Male", value: 47, color: "#3b82f6" },
  { name: "Non-binary", value: 8, color: "#8b5cf6" },
  { name: "Undisclosed", value: 7, color: "#e2e8f0" },
];

const experienceData = [
  { name: "0–2 yrs", value: 18, color: "#fbbf24" },
  { name: "3–5 yrs", value: 32, color: "#34d399" },
  { name: "6–9 yrs", value: 28, color: "#60a5fa" },
  { name: "10+ yrs", value: 22, color: "#f87171" },
];

const timeToFillData = [
  { role: "Eng Lead", days: 34 },
  { role: "Product", days: 27 },
  { role: "Design", days: 21 },
  { role: "DevOps", days: 42 },
  { role: "Data", days: 30 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-lg px-3 py-2 text-[12px] shadow-md">
        <p className="font-semibold text-gray-800">{payload[0].name}</p>
        <p className="text-gray-500">{payload[0].value}{payload[0].unit || "%"}</p>
      </div>
    );
  }
  return null;
};

export default function ManagerMetricsDashboard() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 mb-4 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-gray-900">Manager Overview</span>
          <span className="text-[11px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">Live</span>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {expanded && (
        <div className="px-5 pb-5 grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">

          {/* Gender Diversity */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <Users className="w-3.5 h-3.5 text-indigo-500" />
              <p className="text-[12px] font-semibold text-gray-700">Gender Diversity</p>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie data={diversityData} cx="50%" cy="50%" innerRadius={32} outerRadius={52} dataKey="value" paddingAngle={2}>
                  {diversityData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
              {diversityData.map((d) => (
                <div key={d.name} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-[10px] text-gray-500">{d.name} {d.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Distribution */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <Users className="w-3.5 h-3.5 text-emerald-500" />
              <p className="text-[12px] font-semibold text-gray-700">Experience Levels</p>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie data={experienceData} cx="50%" cy="50%" innerRadius={32} outerRadius={52} dataKey="value" paddingAngle={2}>
                  {experienceData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
              {experienceData.map((d) => (
                <div key={d.name} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-[10px] text-gray-500">{d.name} {d.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Time to Fill */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <p className="text-[12px] font-semibold text-gray-700">Avg. Time-to-Fill (days)</p>
            </div>
            <ResponsiveContainer width="100%" height={130}>
              <BarChart data={timeToFillData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="role" tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ fontSize: 11, borderRadius: 8, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
                  cursor={{ fill: "rgba(251,191,36,0.08)" }}
                  formatter={(v) => [`${v} days`, "Avg. Time"]}
                />
                <Bar dataKey="days" fill="#fbbf24" radius={[4, 4, 2, 2]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}