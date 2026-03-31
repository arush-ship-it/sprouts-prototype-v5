import React, { useState } from "react";
import { Sparkles, X, Plus, BarChart2, Users, TrendingUp, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from
"recharts";

const matchData = [
{ label: "Skills Match", value: 6, max: 10, color: "#6366f1" },
{ label: "Industries Match", value: 7, max: 10, color: "#6366f1" },
{ label: "Attribute Match", value: 9, max: 10, color: "#6366f1" },
{ label: "Job Title Match", value: 5, max: 10, color: "#6366f1" }];


const INITIAL_SKILLS = ["API Design", "Database Proficiency", "Testing Strategy", "DevOps & Platform Mindset"];
const INITIAL_INDUSTRIES = ["FinTech", "Pharma.", "Web3"];
const INITIAL_JOB_TITLES = ["Staff Software Engineer", "Principal Software Engineer", "Lead Software Engineer", "Engineering Manager", "Head Of Engineering"];

export default function CandidateFitInsights({ onViewInsights, onSkip }) {
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [industries, setIndustries] = useState(INITIAL_INDUSTRIES);
  const [jobTitles, setJobTitles] = useState(INITIAL_JOB_TITLES);

  const removeTag = (list, setList, item) => setList(list.filter((i) => i !== item));

  const Tag = ({ label, onRemove }) =>
  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium bg-teal-50 text-teal-700 border border-teal-200">
      <button onClick={onRemove} className="text-teal-500 hover:text-teal-700">
        <X className="w-3 h-3" />
      </button>
      {label}
    </span>;


  return null;

























































































































































}