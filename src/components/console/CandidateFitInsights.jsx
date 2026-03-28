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


  return (
    <div className="px-64 space-y-16">
      {/* Stats Row */}
      <div className="flex gap-3">
        <div className="bg-slate-50 p-4 rounded-xl flex-1 flex items-center gap-3">
          <div className="bg-[#ffffff] rounded-lg w-9 h-9 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <p className="text-indigo-700 text-base font-bold">182</p>
            <p className="text-[11px] text-indigo-500 font-medium">Candidates Applied</p>
          </div>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl flex-1 flex items-center gap-3">
          <div className="bg-[#ffffff] rounded-lg w-9 h-9 flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4 text-violet-600" />
          </div>
          <div>
            <p className="text-violet-700 text-base font-bold">119</p>
            <p className="text-[11px] text-violet-500 font-medium">Prospects Sourced</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white py-2 rounded-xl">
        <p className="text-[12px] font-semibold text-gray-500 mb-1 text-center">Analysed 301 Candidates</p>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={matchData} barSize={36}>
            <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              tickLine={false}
              axisLine={false} />
            <YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e2e8f0" }}
              cursor={{ fill: "rgba(99,102,241,0.05)" }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {matchData.map((entry, index) =>
              <Cell key={index} fill={index % 2 === 0 ? "#818cf8" : "#6366f1"} />
              )}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* CTA: View Insights or Skip */}
      {!showRecommendations &&
      <div className="pl-1 flex gap-3">
          <Button className="bg-blue-600 text-[#ffffff] px-4 py-2 text-xs font-medium rounded-md inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-9 flex-1 hover:bg-indigo-700 gap-1.5"

        onClick={() => {setShowRecommendations(true);onViewInsights?.();}}>
            <Sparkles className="w-3.5 h-3.5" />
            View Insights
          </Button>
          <Button
          variant="outline"
          className="flex-1 text-[12px] text-gray-500"
          onClick={onSkip}>
            Skip
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      }

      {/* AI Recommendations Panel */}
      {showRecommendations &&
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 px-4 py-3 flex items-center gap-3 border-b border-gray-100">
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-gray-800">AI Recommendation</p>
              <p className="text-[11px] text-gray-500">We've identified the following gaps in the candidates that've applied to the job</p>
            </div>
            <button onClick={() => setShowRecommendations(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-5">
            {/* Preferred Skills */}
            <div>
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-[13px] font-semibold text-gray-800">Preferred Skills</p>
                  <p className="text-[11px] text-gray-400">Focus on FinTech and E-commerce professionals for higher skill match</p>
                </div>
                




              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {skills.map((s) =>
              <Tag key={s} label={s} onRemove={() => removeTag(skills, setSkills, s)} />
              )}
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Preferred Industries */}
            <div>
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-[13px] font-semibold text-gray-800">Preferred Industries</p>
                  <p className="text-[11px] text-gray-400">Focus on FinTech and E-commerce professionals for higher skill match</p>
                </div>
                


              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {industries.map((i) =>
              <Tag key={i} label={i} onRemove={() => removeTag(industries, setIndustries, i)} />
              )}
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Preferred Job Titles */}
            <div>
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-[13px] font-semibold text-gray-800">Preferred Job Titles</p>
                  <p className="text-[11px] text-gray-400">Focus on FinTech and E-commerce professionals for higher skill match</p>
                </div>
                


              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {jobTitles.map((t) =>
              <Tag key={t} label={t} onRemove={() => removeTag(jobTitles, setJobTitles, t)} />
              )}
              </div>
            </div>

            {/* Apply Recommendations */}
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] mt-2" onClick={onSkip}>
              Apply Recommendations & Continue
            </Button>
          </div>
        </div>
      }
    </div>);

}