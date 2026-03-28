import React from "react";
import { X, Bot, Linkedin, Globe, UserCheck, Zap, Award, Target, Briefcase, GraduationCap, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const sourceIcon = (source) => {
  if (source === "LinkedIn") return <Linkedin className="w-3.5 h-3.5" />;
  if (source === "Referral") return <UserCheck className="w-3.5 h-3.5" />;
  if (source === "Indeed") return <Zap className="w-3.5 h-3.5" />;
  return <Globe className="w-3.5 h-3.5" />;
};

const fitColor = (fit) => {
  if (fit === "Strong") return "bg-emerald-50 text-emerald-600 border-emerald-200";
  if (fit === "Good") return "bg-blue-50 text-blue-600 border-blue-200";
  return "bg-amber-50 text-amber-600 border-amber-200";
};

const scoreColor = (score) => {
  if (score >= 88) return "text-emerald-600";
  if (score >= 78) return "text-blue-600";
  return "text-amber-600";
};

// Static enrichment data per candidate (keyed by id)
const candidateDetails = {
  default: {
    description: "Experienced designer with a strong background in product and user experience design, skilled at translating complex requirements into intuitive interfaces.",
    experience: "5 years",
    skillMatch: { matched: 18, total: 23, skills: ["Figma", "Design Systems", "Prototyping", "User Research", "Wireframing"] },
    attributeMatch: { matched: 5, total: 6, attributes: ["Leadership", "Communication", "Problem Solving", "Collaboration", "Adaptability"] },
    agentProgress: [
      { name: "Outreach Agent", status: "completed", detail: "Warm email sent · Opened", active: true },
      { name: "Screening Bot", status: "in_progress", detail: "Resume parsed · Scoring in progress", active: true },
      { name: "Resume Parser", status: "pending", detail: "Queued", active: false },
    ],
  },
  c1: {
    description: "Alex is a seasoned Senior Product Designer at Stripe with 7 years of experience. Expert in design systems and cross-functional collaboration at scale.",
    experience: "7 years",
    skillMatch: { matched: 20, total: 23, skills: ["Figma", "Design Systems", "Prototyping", "User Research", "Accessibility"] },
    attributeMatch: { matched: 6, total: 6, attributes: ["Leadership", "Communication", "Problem Solving", "Collaboration", "Adaptability", "Initiative"] },
    agentProgress: [
      { name: "Outreach Agent", status: "completed", detail: "Warm email sent · Replied", active: true },
      { name: "Screening Bot", status: "completed", detail: "Score: 91% — Strong match", active: true },
      { name: "Resume Parser", status: "in_progress", detail: "Extracting work history…", active: false },
    ],
  },
  c14: {
    description: "Maya is a Lead Product Designer at Stripe, known for her mastery of Figma and human-centered design thinking. She has shipped products used by millions.",
    experience: "6 years",
    skillMatch: { matched: 22, total: 23, skills: ["Figma", "Design Systems", "Prototyping", "HCI", "Motion Design"] },
    attributeMatch: { matched: 6, total: 6, attributes: ["Leadership", "Communication", "Problem Solving", "Collaboration", "Adaptability", "Ownership"] },
    agentProgress: [
      { name: "Interview Scheduler", status: "completed", detail: "Interview scheduled · Mar 30, 2pm", active: true },
      { name: "Feedback Collector", status: "pending", detail: "Awaiting post-interview feedback", active: false },
    ],
  },
  c19: {
    description: "Daniel is a seasoned UX Lead at Meta with deep expertise in design leadership, enterprise-scale design systems, and stakeholder management.",
    experience: "9 years",
    skillMatch: { matched: 21, total: 23, skills: ["Figma", "Design Systems", "Prototyping", "User Research", "Leadership"] },
    attributeMatch: { matched: 6, total: 6, attributes: ["Leadership", "Communication", "Problem Solving", "Collaboration", "Ownership", "Strategic Thinking"] },
    agentProgress: [
      { name: "Offer Manager", status: "in_progress", detail: "Preparing offer letter · $165k", active: true },
    ],
  },
};

const getDetails = (candidateId) => candidateDetails[candidateId] || candidateDetails.default;

const statusIcon = (status) => {
  if (status === "completed") return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
  if (status === "in_progress") return <Clock className="w-3.5 h-3.5 text-blue-500 animate-pulse" />;
  return <AlertCircle className="w-3.5 h-3.5 text-gray-300" />;
};

const statusLabel = (status) => {
  if (status === "completed") return "Completed";
  if (status === "in_progress") return "In Progress";
  return "Pending";
};

const statusColor = (status) => {
  if (status === "completed") return "text-emerald-600";
  if (status === "in_progress") return "text-blue-600";
  return "text-gray-400";
};

export default function CandidateDetailPanel({ candidate, stageName, stageAgents, onClose }) {
  if (!candidate) return null;
  const details = getDetails(candidate.id);

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div
        className="bg-white w-[420px] h-full shadow-2xl border-l border-gray-100 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img src={candidate.avatar} alt={candidate.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="text-[14px] font-semibold text-gray-900">{candidate.name}</p>
              <p className="text-[11px] text-gray-400">{candidate.title}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">

          {/* Score + meta row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[13px] font-bold px-2.5 py-1 rounded-lg bg-gray-50 ${scoreColor(candidate.score)}`}>
              {candidate.score}% Match
            </span>
            <span className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border ${fitColor(candidate.fit)}`}>
              {candidate.fit} Fit
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg">
              {sourceIcon(candidate.source)} {candidate.source}
            </span>
            <span className="text-[11px] font-medium text-violet-600 bg-violet-50 px-2.5 py-1 rounded-lg">
              {stageName}
            </span>
          </div>

          {/* Brief Description */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">About</p>
            <p className="text-[13px] text-gray-700 leading-relaxed">{details.description}</p>
            <div className="mt-3 flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[12px] text-gray-500">{details.experience} experience</span>
            </div>
          </div>

          {/* Skill Match */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-500" />
                <p className="text-[12px] font-semibold text-gray-800">Skill Match</p>
              </div>
              <span className="text-[12px] font-bold text-indigo-600">{details.skillMatch.matched}/{details.skillMatch.total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
              <div
                className="h-1.5 rounded-full bg-indigo-500 transition-all"
                style={{ width: `${(details.skillMatch.matched / details.skillMatch.total) * 100}%` }}
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {details.skillMatch.skills.map((s) => (
                <span key={s} className="text-[10px] font-medium bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md">{s}</span>
              ))}
            </div>
          </div>

          {/* Attribute Match */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-orange-500" />
                <p className="text-[12px] font-semibold text-gray-800">Attribute Match</p>
              </div>
              <span className="text-[12px] font-bold text-orange-600">{details.attributeMatch.matched}/{details.attributeMatch.total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
              <div
                className="h-1.5 rounded-full bg-orange-400 transition-all"
                style={{ width: `${(details.attributeMatch.matched / details.attributeMatch.total) * 100}%` }}
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {details.attributeMatch.attributes.map((a) => (
                <span key={a} className="text-[10px] font-medium bg-orange-50 text-orange-600 px-2 py-0.5 rounded-md">{a}</span>
              ))}
            </div>
          </div>

          {/* Agent Progress */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Bot className="w-4 h-4 text-blue-500" />
              <p className="text-[12px] font-semibold text-gray-800">Agent Progress</p>
            </div>
            <div className="space-y-2.5">
              {details.agentProgress.map((agent) => (
                <div key={agent.name} className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">{statusIcon(agent.status)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] font-semibold text-gray-800">{agent.name}</p>
                      <span className={`text-[10px] font-medium ${statusColor(agent.status)}`}>{statusLabel(agent.status)}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5">{agent.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-100 shrink-0 flex gap-2">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold rounded-xl py-2 transition-colors">
            Move to Next Stage
          </button>
          <button className="px-4 py-2 text-[12px] font-medium text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}