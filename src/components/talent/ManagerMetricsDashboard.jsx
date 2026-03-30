import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChevronDown, ChevronUp, Users, Clock } from "lucide-react";

const diversityData = [
{ name: "Female", value: 38, color: "#6366f1" },
{ name: "Male", value: 47, color: "#3b82f6" },
{ name: "Non-binary", value: 8, color: "#8b5cf6" },
{ name: "Undisclosed", value: 7, color: "#e2e8f0" }];


const experienceData = [
{ name: "0–2 yrs", value: 18, color: "#fbbf24" },
{ name: "3–5 yrs", value: 32, color: "#34d399" },
{ name: "6–9 yrs", value: 28, color: "#60a5fa" },
{ name: "10+ yrs", value: 22, color: "#f87171" }];


const timeToFillData = [
{ role: "Eng Lead", days: 34 },
{ role: "Product", days: 27 },
{ role: "Design", days: 21 },
{ role: "DevOps", days: 42 },
{ role: "Data", days: 30 }];


const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-lg px-3 py-2 text-[12px] shadow-md">
        <p className="font-semibold text-gray-800">{payload[0].name}</p>
        <p className="text-gray-500">{payload[0].value}{payload[0].unit || "%"}</p>
      </div>);

  }
  return null;
};

export default function ManagerMetricsDashboard() {
  const [expanded, setExpanded] = useState(true);

  return null;
































































































}