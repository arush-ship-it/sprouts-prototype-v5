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
    { name: "Resume Parser", status: "pending", detail: "Queued", active: false }]

  },
  c1: {
    description: "Alex is a seasoned Senior Product Designer at Stripe with 7 years of experience. Expert in design systems and cross-functional collaboration at scale.",
    experience: "7 years",
    skillMatch: { matched: 20, total: 23, skills: ["Figma", "Design Systems", "Prototyping", "User Research", "Accessibility"] },
    attributeMatch: { matched: 6, total: 6, attributes: ["Leadership", "Communication", "Problem Solving", "Collaboration", "Adaptability", "Initiative"] },
    agentProgress: [
    { name: "Outreach Agent", status: "completed", detail: "Warm email sent · Replied", active: true },
    { name: "Screening Bot", status: "completed", detail: "Score: 91% — Strong match", active: true },
    { name: "Resume Parser", status: "in_progress", detail: "Extracting work history…", active: false }]

  },
  c14: {
    description: "Maya is a Lead Product Designer at Stripe, known for her mastery of Figma and human-centered design thinking. She has shipped products used by millions.",
    experience: "6 years",
    skillMatch: { matched: 22, total: 23, skills: ["Figma", "Design Systems", "Prototyping", "HCI", "Motion Design"] },
    attributeMatch: { matched: 6, total: 6, attributes: ["Leadership", "Communication", "Problem Solving", "Collaboration", "Adaptability", "Ownership"] },
    agentProgress: [
    { name: "Interview Scheduler", status: "completed", detail: "Interview scheduled · Mar 30, 2pm", active: true },
    { name: "Feedback Collector", status: "pending", detail: "Awaiting post-interview feedback", active: false }]

  },
  c19: {
    description: "Daniel is a seasoned UX Lead at Meta with deep expertise in design leadership, enterprise-scale design systems, and stakeholder management.",
    experience: "9 years",
    skillMatch: { matched: 21, total: 23, skills: ["Figma", "Design Systems", "Prototyping", "User Research", "Leadership"] },
    attributeMatch: { matched: 6, total: 6, attributes: ["Leadership", "Communication", "Problem Solving", "Collaboration", "Ownership", "Strategic Thinking"] },
    agentProgress: [
    { name: "Offer Manager", status: "in_progress", detail: "Preparing offer letter · $165k", active: true }]

  }
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

export default function CandidateDetailPanel({ candidate, stageName, stageAgents, onClose, onMoveNext, onReject }) {
  if (!candidate) return null;
  const details = getDetails(candidate.id);

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      






























































































































      
    </div>);

}