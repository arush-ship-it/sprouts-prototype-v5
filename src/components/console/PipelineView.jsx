import React, { useState } from "react";
import { Users, ChevronDown, Bot, Linkedin, Globe, UserCheck, Zap, AlertCircle, Mail, ChevronRight, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import CandidateDetailPanel from "./CandidateDetailPanel";

const initialStages = [
{
  id: "1",
  name: "In Review",
  agents: [
  { name: "Outreach Agent", active: true, stack: [{ key: "outreach", label: "Outreach", processing: 5, queued: 4, done: 3 }] },
  { name: "Screening Bot", active: true, stack: [{ key: "screening", label: "Screening", processing: 3, queued: 6, done: 3 }] },
  { name: "Resume Parser", active: false, stack: [{ key: "resume", label: "Resume Parse", processing: 0, queued: 12, done: 0 }] }],

  candidates: [
  { id: "c1", name: "Alex Chen", title: "Senior Product Designer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", score: 91, source: "LinkedIn", fit: "Strong", agentStatus: "in_progress" },
  { id: "c2", name: "Priya Sharma", title: "UX Designer", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face", score: 78, source: "Referral", fit: "Good", agentStatus: "no_agent" },
  { id: "c3", name: "David Wilson", title: "Product Designer", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face", score: 85, source: "Direct", fit: "Strong", agentStatus: "done" },
  { id: "c4", name: "Sophie Martinez", title: "UI Designer", avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face", score: 79, source: "LinkedIn", fit: "Good", agentStatus: "needs_approval" },
  { id: "c5", name: "Ryan Thompson", title: "Lead Designer", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face", score: 88, source: "Indeed", fit: "Strong", agentStatus: "in_progress" },
  { id: "c6", name: "Olivia Brown", title: "Visual Designer", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face", score: 82, source: "Referral", fit: "Good", agentStatus: "needs_approval" },
  { id: "c7", name: "Lucas Garcia", title: "Product Designer", avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop&crop=face", score: 90, source: "LinkedIn", fit: "Strong", agentStatus: "done" },
  { id: "c8", name: "Isabella Lopez", title: "UX Researcher", avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=100&h=100&fit=crop&crop=face", score: 76, source: "Direct", fit: "Moderate", agentStatus: "no_agent" },
  { id: "c9", name: "Noah Anderson", title: "Senior Designer", avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&h=100&fit=crop&crop=face", score: 84, source: "Indeed", fit: "Good", agentStatus: "in_progress" },
  { id: "c10", name: "Ava Taylor", title: "Product Designer", avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop&crop=face", score: 81, source: "LinkedIn", fit: "Good", agentStatus: "done" },
  { id: "c11", name: "Ethan Davis", title: "Design Lead", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&h=100&fit=crop&crop=face", score: 87, source: "Referral", fit: "Strong", agentStatus: "needs_approval" },
  { id: "c12", name: "Mia Robinson", title: "UX Designer", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face", score: 83, source: "Direct", fit: "Good", agentStatus: "no_agent" }]

},
{
  id: "2",
  name: "Assessment",
  agents: [
  { name: "Assessment Agent", active: true, stack: [
    { key: "invite_criteria", label: "Invite Criteria", processing: 3, queued: 5, done: 8 },
    { key: "invite_email", label: "Invite Email", processing: 2, queued: 3, done: 6 },
    { key: "assessment", label: "Assessment", processing: 1, queued: 4, done: 4 },
    { key: "filter_criteria", label: "Filter Criteria", processing: 1, queued: 2, done: 3 }]
  }],

  candidates: [
  { id: "c13", name: "James Park", title: "Senior Product Designer", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", score: 82, source: "LinkedIn", fit: "Good" }]

},
{
  id: "3",
  name: "Interview",
  agents: [
  { name: "Interview Scheduler", active: true, stack: [{ key: "scheduling", label: "Scheduling", processing: 2, queued: 1, done: 0 }] },
  { name: "Feedback Collector", active: false, stack: [{ key: "feedback", label: "Feedback", processing: 0, queued: 3, done: 0 }] }],

  candidates: [
  { id: "c14", name: "Maya Johnson", title: "Lead Product Designer", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", score: 94, source: "Referral", fit: "Strong" },
  { id: "c15", name: "Sarah Mitchell", title: "Product Designer", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", score: 87, source: "LinkedIn", fit: "Strong" },
  { id: "c16", name: "Emma Collins", title: "Design Manager", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face", score: 85, source: "Direct", fit: "Good" }]

},
{
  id: "4",
  name: "Technical",
  agents: [
  { name: "Code Challenge", active: false, stack: [{ key: "challenge", label: "Challenge", processing: 0, queued: 1, done: 0 }] },
  { name: "Technical Interviewer", active: true, stack: [{ key: "tech_interview", label: "Tech Interview", processing: 1, queued: 0, done: 0 }] }],

  candidates: [
  { id: "c17", name: "Marcus Rivera", title: "Sr. Designer", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face", score: 89, source: "Indeed", fit: "Strong" }]

},
{
  id: "5",
  name: "Final Round",
  agents: [{ name: "Executive Interviewer", active: true, stack: [{ key: "exec", label: "Exec Interview", processing: 1, queued: 0, done: 0 }] }],
  candidates: [
  { id: "c18", name: "Lena Kim", title: "Product Designer II", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face", score: 92, source: "Referral", fit: "Strong" }]

},
{
  id: "6",
  name: "Offer",
  agents: [{ name: "Offer Manager", active: true, stack: [{ key: "offer", label: "Offer", processing: 1, queued: 0, done: 0 }] }],
  candidates: [
  { id: "c19", name: "Daniel Wright", title: "UX Lead", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", score: 96, source: "LinkedIn", fit: "Strong" }]

}];


const sourceIcon = (source) => {
  if (source === "LinkedIn") return <Linkedin className="w-3 h-3" />;
  if (source === "Referral") return <UserCheck className="w-3 h-3" />;
  if (source === "Indeed") return <Zap className="w-3 h-3" />;
  return <Globe className="w-3 h-3" />;
};

const fitColor = (fit) => {
  if (fit === "Strong") return "bg-emerald-50 text-emerald-600";
  if (fit === "Good") return "bg-blue-50 text-blue-600";
  return "bg-amber-50 text-amber-600";
};

const scoreColor = (score) => {
  if (score >= 88) return "text-emerald-600 bg-emerald-50";
  if (score >= 78) return "text-blue-600 bg-blue-50";
  return "text-amber-600 bg-amber-50";
};

const agentStatusStyle = (status) => {
  if (status === "no_agent")      return { border: "border-red-300",    bg: "bg-white" };
  if (status === "in_progress")   return { border: "border-blue-300",   bg: "bg-white" };
  if (status === "done")          return { border: "border-emerald-300", bg: "bg-white" };
  if (status === "needs_approval") return { border: "border-rose-200",  bg: "bg-rose-50/60" };
  return { border: "border-gray-100", bg: "bg-white" };
};

const agentStatusBadge = (status) => {
  if (status === "no_agent")       return { label: "No agent", color: "text-red-500 bg-red-50" };
  if (status === "in_progress")    return { label: "In progress", color: "text-blue-500 bg-blue-50" };
  if (status === "done")           return { label: "Done", color: "text-emerald-600 bg-emerald-50" };
  if (status === "needs_approval") return { label: "Needs approval", color: "text-rose-600 bg-rose-50" };
  return null;
};

function CandidatePipelineCard({ candidate, stageName, provided, snapshot, onClick }) {
  const { border, bg } = agentStatusStyle(candidate.agentStatus);
  const badge = agentStatusBadge(candidate.agentStatus);

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={onClick}
      className={`p-3 rounded-xl border transition-all cursor-grab active:cursor-grabbing select-none ${bg} ${
      snapshot.isDragging ?
      "border-blue-300 shadow-lg ring-2 ring-blue-100 rotate-1 scale-105" :
      `${border} hover:shadow-sm`}`
      }>
      
      {/* Top row */}
      <div className="flex items-center gap-2.5 mb-2.5">
        <img src={candidate.avatar} alt={candidate.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-semibold text-gray-900 truncate">{candidate.name}</p>
          <p className="text-[10px] text-gray-400 truncate">{candidate.title}</p>
        </div>
        <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md shrink-0 ${scoreColor(candidate.score)}`}>
          {candidate.score}%
        </span>
      </div>

      {/* Tags row */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {/* Stage */}
        <span className="flex items-center gap-1 text-[10px] font-medium text-violet-600 bg-violet-50 px-2 py-0.5 rounded-md">
          {stageName}
        </span>
        {/* Fit */}
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${fitColor(candidate.fit)}`}>
          {candidate.fit} fit
        </span>
        {/* Source */}
        <span className="flex items-center gap-1 text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
          {sourceIcon(candidate.source)} {candidate.source}
        </span>
        {/* Agent status badge */}
        {badge && (
          <span className={`ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-md ${badge.color}`}>
            {badge.label}
          </span>
        )}
      </div>
    </div>);

}

export default function PipelineView() {
  const [stages, setStages] = useState(initialStages);
  const [expandedStageId, setExpandedStageId] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);
  const [vetoModal, setVetoModal] = useState(null); // { candidate, fromStage, toStage }
  const [vetoReason, setVetoReason] = useState("");
  const [emailDraft, setEmailDraft] = useState("");
  const [emailCopied, setEmailCopied] = useState(false);
  const [vetoStep, setVetoStep] = useState(1); // 1 = reason, 2 = email draft

  // Stage-specific reasons keyed by destination stage name
  const STAGE_REASONS = {
    "Assessment": [
      { value: "strong_resume", label: "Strong Resume Match", desc: "Profile closely aligns with JD requirements" },
      { value: "skills_verified", label: "Skills Verified", desc: "Key skills confirmed through screening" },
      { value: "culture_positive", label: "Culture Alignment", desc: "Initial signals of strong cultural fit" },
      { value: "fast_track", label: "Fast-Track Candidate", desc: "Exceptional profile warrants expedited review" },
      { value: "other", label: "Other", desc: "Reason not listed above" },
    ],
    "Interview": [
      { value: "assessment_passed", label: "Assessment Passed", desc: "Scored above threshold in assessment" },
      { value: "strong_answers", label: "Strong Responses", desc: "Demonstrated clear domain knowledge" },
      { value: "portfolio_impressive", label: "Impressive Portfolio", desc: "Work samples exceeded expectations" },
      { value: "referral_override", label: "Referral / Endorsement", desc: "Internal referral or strong endorsement" },
      { value: "other", label: "Other", desc: "Reason not listed above" },
    ],
    "Technical": [
      { value: "interview_strong", label: "Strong Interview", desc: "Performed well in behavioral and role interviews" },
      { value: "communication_fit", label: "Communication & Fit", desc: "Excellent clarity and interpersonal skills" },
      { value: "domain_depth", label: "Deep Domain Knowledge", desc: "Demonstrated strong subject matter expertise" },
      { value: "other", label: "Other", desc: "Reason not listed above" },
    ],
    "Final Round": [
      { value: "tech_passed", label: "Technical Bar Met", desc: "Passed coding or technical evaluation" },
      { value: "problem_solving", label: "Strong Problem Solving", desc: "Exceptional analytical thinking demonstrated" },
      { value: "system_design", label: "System Design Skills", desc: "Solid architecture and design instincts" },
      { value: "other", label: "Other", desc: "Reason not listed above" },
    ],
    "Offer": [
      { value: "top_candidate", label: "Top Candidate", desc: "Ranked highest across all evaluation criteria" },
      { value: "exec_approved", label: "Executive Approval", desc: "Endorsed by hiring manager or leadership" },
      { value: "competitive_offer", label: "Competitive Offer Needed", desc: "Strong candidate requiring fast-tracked offer" },
      { value: "other", label: "Other", desc: "Reason not listed above" },
    ],
    // Default fallback — also used for moves to "In Review" or unknown stages
    "default": [
      { value: "reconsider", label: "Reconsider Profile", desc: "Re-evaluating candidate for this stage" },
      { value: "pipeline_reorder", label: "Pipeline Reorder", desc: "Restructuring the hiring flow" },
      { value: "skill_gap", label: "Skill Gap", desc: "Candidate lacks key skills for current stage" },
      { value: "salary", label: "Salary Expectation", desc: "Compensation expectations don't align" },
      { value: "culture", label: "Cultural Fit", desc: "Misalignment with team values or working style" },
      { value: "experience", label: "Insufficient Experience", desc: "Below minimum seniority required" },
      { value: "location", label: "Location / Relocation", desc: "Unable to meet location requirements" },
      { value: "other", label: "Other", desc: "Reason not listed above" },
    ],
  };

  const getVetoReasons = (toStage) => STAGE_REASONS[toStage] || STAGE_REASONS["default"];

  const EMAIL_TEMPLATES = {
    // Advancing reasons
    strong_resume: (name, to) => `Hi ${name},\n\nGreat news — after reviewing your application, we're excited to move you forward to the ${to} stage. Your profile is a strong match for what we're looking for, and we'd love to keep the momentum going.\n\nWe'll be in touch shortly with next steps.\n\nWarm regards,\nThe Recruiting Team`,
    skills_verified: (name, to) => `Hi ${name},\n\nWe've reviewed your screening and are pleased to move you to the ${to} stage. Your skills align well with our requirements and we're excited to learn more.\n\nExpect to hear from us soon.\n\nWarm regards,\nThe Recruiting Team`,
    culture_positive: (name, to) => `Hi ${name},\n\nBased on our initial conversations, we're moving you forward to the ${to} stage. We see a strong potential for cultural alignment and look forward to exploring this further.\n\nWarm regards,\nThe Recruiting Team`,
    fast_track: (name, to) => `Hi ${name},\n\nYour profile has impressed us and we'd like to fast-track your application to the ${to} stage. We're eager to continue the process.\n\nWe'll reach out with details shortly.\n\nWarm regards,\nThe Recruiting Team`,
    assessment_passed: (name, to) => `Hi ${name},\n\nCongratulations — you've successfully passed the assessment stage! We're pleased to invite you to the ${to} stage of our process.\n\nOur team will be reaching out soon to schedule.\n\nWarm regards,\nThe Recruiting Team`,
    strong_answers: (name, to) => `Hi ${name},\n\nYour responses during the assessment demonstrated strong domain knowledge. We're excited to move you forward to the ${to} stage.\n\nLook out for a scheduling invite shortly.\n\nWarm regards,\nThe Recruiting Team`,
    portfolio_impressive: (name, to) => `Hi ${name},\n\nWe were really impressed by your portfolio and work samples. We'd love to move you to the ${to} stage to continue the conversation.\n\nWarm regards,\nThe Recruiting Team`,
    referral_override: (name, to) => `Hi ${name},\n\nBased on a strong internal endorsement, we'd like to move your application to the ${to} stage. We're looking forward to connecting with you.\n\nWarm regards,\nThe Recruiting Team`,
    interview_strong: (name, to) => `Hi ${name},\n\nYou did great in your interview! We're excited to progress your application to the ${to} stage.\n\nWe'll follow up shortly with next steps.\n\nWarm regards,\nThe Recruiting Team`,
    communication_fit: (name, to) => `Hi ${name},\n\nYour communication style and overall fit came through clearly in our conversations. We'd like to move you forward to the ${to} stage.\n\nWarm regards,\nThe Recruiting Team`,
    domain_depth: (name, to) => `Hi ${name},\n\nYour depth of expertise really stood out. We're happy to advance your application to the ${to} stage.\n\nWarm regards,\nThe Recruiting Team`,
    tech_passed: (name, to) => `Hi ${name},\n\nYou met our technical bar — well done! We're excited to move you to the ${to} stage of the process.\n\nWarm regards,\nThe Recruiting Team`,
    problem_solving: (name, to) => `Hi ${name},\n\nYour analytical thinking and problem-solving approach impressed the team. We're moving you forward to the ${to} stage.\n\nWarm regards,\nThe Recruiting Team`,
    system_design: (name, to) => `Hi ${name},\n\nYour system design skills were a highlight of our evaluation. We're pleased to advance you to the ${to} stage.\n\nWarm regards,\nThe Recruiting Team`,
    top_candidate: (name, to) => `Hi ${name},\n\nWe're thrilled to let you know that you've been selected as a top candidate. We're moving you to the ${to} stage and look forward to making this official.\n\nWarm regards,\nThe Recruiting Team`,
    exec_approved: (name, to) => `Hi ${name},\n\nFollowing leadership review, we're excited to move your application to the ${to} stage. We're looking forward to next steps.\n\nWarm regards,\nThe Recruiting Team`,
    competitive_offer: (name, to) => `Hi ${name},\n\nWe'd like to move quickly and bring you to the ${to} stage. You've been a standout throughout this process and we're committed to making this work.\n\nWarm regards,\nThe Recruiting Team`,
    // Downward / reject reasons
    reconsider: (name, to) => `Hi ${name},\n\nThank you for your patience. We're revisiting the structure of our hiring process and have moved your application back to the ${to} stage for reconsideration. This is not a reflection on your performance.\n\nWe'll be in touch soon.\n\nWarm regards,\nThe Recruiting Team`,
    pipeline_reorder: (name, to) => `Hi ${name},\n\nWe're making some internal adjustments to our hiring pipeline. Your application has been moved to the ${to} stage. This does not impact your standing as a candidate.\n\nWarm regards,\nThe Recruiting Team`,
    skill_gap: (name) => `Hi ${name},\n\nThank you for going through our process. After careful consideration, we've decided not to move forward as we're looking for a stronger match in some key technical areas critical to this role.\n\nWe appreciate your effort and encourage you to apply for future opportunities.\n\nWarm regards,\nThe Recruiting Team`,
    salary: (name) => `Hi ${name},\n\nThank you for your time throughout the process. Unfortunately, we're unable to proceed as there's a gap between your compensation expectations and our current budget.\n\nWe hope to stay in touch for future opportunities.\n\nWarm regards,\nThe Recruiting Team`,
    culture: (name) => `Hi ${name},\n\nThank you for the time you invested in our process. After thoughtful consideration, we feel this role may not be the ideal fit given our current team dynamics — this is a reflection of role fit, not your abilities.\n\nWe encourage you to explore other opportunities with us.\n\nWarm regards,\nThe Recruiting Team`,
    experience: (name) => `Hi ${name},\n\nThank you for applying. While your profile is impressive, we've decided to move forward with candidates whose experience level more closely aligns with the seniority required for this role.\n\nWe'd love to reconnect as your career grows.\n\nWarm regards,\nThe Recruiting Team`,
    location: (name) => `Hi ${name},\n\nThank you for your interest. Unfortunately, we require candidates who can meet our location or travel requirements for this position and are unable to move forward.\n\nWe wish you the very best.\n\nWarm regards,\nThe Recruiting Team`,
    other: (name) => `Hi ${name},\n\nThank you for the time you've invested in our process. After careful consideration, we've decided not to move forward at this time.\n\nWe truly appreciate your interest and wish you all the best.\n\nWarm regards,\nThe Recruiting Team`,
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceStageIdx = stages.findIndex((s) => s.id === source.droppableId);
    const destStageIdx = stages.findIndex((s) => s.id === destination.droppableId);

    const movedCandidate = stages[sourceStageIdx].candidates[source.index];
    const fromStageName = stages[sourceStageIdx].name;
    const toStageName = stages[destStageIdx].name;

    // Show veto modal
    setVetoModal({ candidate: movedCandidate, fromStage: fromStageName, toStage: toStageName, sourceIdx: sourceStageIdx, destIdx: destStageIdx, sourceIdx: source.index, destIdx: destination.index });
    setVetoReason("");
    setEmailDraft("");
    setEmailCopied(false);
    setVetoStep(1);
  };

  const handleVetoConfirm = () => {
    if (!vetoModal) return;
    const newStages = stages.map((s) => ({ ...s, candidates: [...s.candidates] }));
    const [movedCandidate] = newStages[vetoModal.sourceIdx].candidates.splice(vetoModal.sourceIdx, 1);
    newStages[vetoModal.destIdx].candidates.splice(vetoModal.destIdx, 0, movedCandidate);
    setStages(newStages);
    setVetoModal(null);
  };

  const handleVetoCancel = () => {
    setVetoModal(null);
    setVetoReason("");
    setEmailDraft("");
    setVetoStep(1);
  };

  const handleReasonNext = () => {
    if (!vetoReason) return;
    const template = EMAIL_TEMPLATES[vetoReason];
    const firstName = vetoModal.candidate.name.split(" ")[0];
    setEmailDraft(template ? template(firstName, vetoModal.toStage) : "");
    setVetoStep(2);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailDraft);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <div className="px-8 pt-5 pb-8">
      {selectedCandidate &&
      <CandidateDetailPanel
        candidate={selectedCandidate}
        stageName={selectedStage?.name}
        stageAgents={selectedStage?.agents}
        onClose={() => {setSelectedCandidate(null);setSelectedStage(null);}} />

      }

      {/* Veto Modal */}
      {vetoModal &&
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            {/* Header */}
            <div className="flex items-start gap-3 p-5 border-b border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-[15px] font-semibold text-gray-900">Override Agent Action?</h2>
                <p className="text-[12px] text-gray-500 mt-0.5">Moving <span className="font-medium text-gray-700">{vetoModal.candidate.name}</span> from <span className="font-medium">{vetoModal.fromStage}</span> → <span className="font-medium text-amber-600">{vetoModal.toStage}</span></p>
              </div>
              {/* Step indicator */}
              <div className="flex items-center gap-1.5 shrink-0">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${vetoStep >= 1 ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-400"}`}>1</div>
                <div className={`w-4 h-px ${vetoStep >= 2 ? "bg-amber-400" : "bg-gray-200"}`} />
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${vetoStep >= 2 ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-400"}`}>2</div>
              </div>
            </div>

            {/* Step 1: Reason */}
            {vetoStep === 1 && (
              <div className="p-5">
                <p className="text-[12px] font-semibold text-gray-700 mb-3">Select a reason for the override <span className="text-red-500">*</span></p>
                <div className="space-y-2">
                  {getVetoReasons(vetoModal.toStage).map((r) => (
                    <button
                      key={r.value}
                      onClick={() => setVetoReason(r.value)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl border transition-all ${
                        vetoReason === r.value
                          ? "border-amber-400 bg-amber-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full border-2 shrink-0 ${vetoReason === r.value ? "border-amber-500 bg-amber-500" : "border-gray-300"}`} />
                        <p className={`text-[12px] font-semibold ${vetoReason === r.value ? "text-amber-700" : "text-gray-800"}`}>{r.label}</p>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5 pl-5">{r.desc}</p>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-4">
                  <Button variant="outline" onClick={handleVetoCancel} className="flex-1 text-[13px]">Cancel</Button>
                  <Button
                    onClick={handleReasonNext}
                    disabled={!vetoReason}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-[13px] disabled:opacity-40"
                  >
                    Next <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Email Draft */}
            {vetoStep === 2 && (
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <p className="text-[12px] font-semibold text-gray-700">Candidate Email Draft</p>
                  <span className="ml-auto text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium border border-blue-100">Auto-generated</span>
                </div>
                <div className="relative">
                  <textarea
                    value={emailDraft}
                    onChange={(e) => setEmailDraft(e.target.value)}
                    rows={9}
                    className="w-full text-[12px] text-gray-700 leading-relaxed bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 resize-none focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
                  />
                  <button
                    onClick={handleCopyEmail}
                    className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-medium text-gray-400 hover:text-blue-600 bg-white border border-gray-200 px-2 py-1 rounded-lg transition-colors"
                  >
                    {emailCopied ? <><Check className="w-3 h-3 text-emerald-500" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                  </button>
                </div>
                <p className="text-[11px] text-gray-400 mt-2">You can edit the draft above before confirming.</p>
                <div className="flex gap-3 mt-4">
                  <Button variant="outline" onClick={() => setVetoStep(1)} className="flex-1 text-[13px]">Back</Button>
                  <Button onClick={handleVetoConfirm} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-[13px]">
                    Confirm Override
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      }

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages.map((stage) =>
          <div key={stage.id} className="flex-shrink-0 w-[280px] flex flex-col gap-3">

              {/* Stage Header */}
              <button
              onClick={() => setExpandedStageId(expandedStageId === stage.id ? null : stage.id)}
              className="w-full bg-white text-slate-600 px-4 py-2.5 rounded-xl border-2 border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors">
              
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="text-[13px] font-bold">{stage.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold px-2 py-0.5 rounded-md bg-white/60">
                    {stage.candidates.length}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${expandedStageId === stage.id ? "rotate-180" : ""}`} />
                </div>
              </button>

              {/* Agents Section - Expanded */}
              {expandedStageId === stage.id &&
            <div className="bg-white rounded-xl p-3 border border-gray-100 space-y-2">
                  
                  {stage.agents.map((agent) =>
              <div key={agent.name} className="bg-[hsl(var(--background))] px- py-2.5 rounded-lg space-y-2">
                      {/* Agent header */}
                      <div className="flex items-center gap-2">
                        <div className={`rounded-full w-6 h-6 flex items-center justify-center shrink-0 ${agent.active ? "bg-blue-50" : "bg-gray-100"}`}>
                          <Bot className={`w-3 h-3 ${agent.active ? "text-blue-500" : "text-gray-400"}`} />
                        </div>
                        <p className="text-[11px] font-semibold text-gray-800 flex-1 truncate">{agent.name}</p>
                        <div className="flex items-center gap-1 shrink-0">
                          <div className={`w-1.5 h-1.5 rounded-full ${agent.active ? "bg-emerald-400 animate-pulse" : "bg-gray-300"}`} />
                          <span className={`text-[10px] font-medium ${agent.active ? "text-emerald-600" : "text-gray-400"}`}>
                            {agent.active ? "Active" : "Idle"}
                          </span>
                        </div>
                      </div>
                      {/* Stack breakdown */}
                      <div className="mt-1 space-y-3">
                        {agent.stack.map((item) =>
                  <div key={item.key} className="bg-gray-50 rounded-lg px-3 py-2">
                            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{item.label}</p>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="flex items-center gap-1 text-[10px] font-medium bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md">
                                <span className="font-bold">{item.processing}</span> processing
                              </span>
                              <span className="flex items-center gap-1 text-[10px] font-medium bg-amber-50 text-amber-600 px-2 py-0.5 rounded-md">
                                <span className="font-bold">{item.queued}</span> queued
                              </span>
                              <span className="flex items-center gap-1 text-[10px] font-medium bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md">
                                <span className="font-bold">{item.done}</span> done
                              </span>
                            </div>
                          </div>
                  )}
                      </div>
                    </div>
              )}
                  <Link
                to="/Agents" className="bg-blue-50 text-blue-600 mt-1 px-16 py-2 text-xs font-medium rounded-lg flex items-center justify-between w-full hover:bg-blue-100 transition-colors">View Full Activity



              </Link>
                </div>
            }

              {/* Droppable candidates list */}
              <Droppable droppableId={stage.id}>
                {(provided, snapshot) =>
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`flex flex-col gap-2 min-h-[60px] rounded-xl p-1 transition-colors ${
                snapshot.isDraggingOver ? "bg-blue-50/60" : ""}`
                }>
                
                    {stage.candidates.map((candidate, idx) =>
                <Draggable key={candidate.id} draggableId={candidate.id} index={idx}>
                        {(provided, snapshot) =>
                  <CandidatePipelineCard
                    candidate={candidate}
                    stageName={stage.name}
                    provided={provided}
                    snapshot={snapshot}
                    onClick={() => {setSelectedCandidate(candidate);setSelectedStage(stage);}} />

                  }
                      </Draggable>
                )}
                    {provided.placeholder}
                    {stage.candidates.length === 0 && !snapshot.isDraggingOver &&
                <div className="text-[11px] text-gray-300 text-center py-4">Drop here</div>
                }
                  </div>
              }
              </Droppable>

            </div>
          )}
        </div>
      </DragDropContext>
    </div>);

}