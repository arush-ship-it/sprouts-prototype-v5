import React, { useState } from "react";
import {
  CheckCircle2,
  Bot,
  AlertCircle,
  Clock,
  ArrowRight,
  Eye,
  Check,
  X,
  Maximize2,
  ChevronRight,
  FileText,
  User,
  Video,
  Code,
  MessageSquare,
  CheckSquare,
  Brain,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

// Operations Agents Data
const approvals = [
  {
    id: 1,
    type: "stage_move",
    description: "3 candidates moved to Interview stage",
    candidates: ["Maya Johnson", "Alex Chen", "Sarah Mitchell"],
    timestamp: "1 hour ago",
    status: "pending",
  },
  {
    id: 2,
    type: "auto_reject",
    description: "5 candidates auto-rejected due to missing requirements",
    candidates: ["John Doe", "Jane Smith", "Mike Wilson", "Lisa Brown", "Tom Jones"],
    timestamp: "3 hours ago",
    status: "pending",
  },
];

const agents = [
  {
    id: 1,
    name: "Resume Screening Agent",
    status: "pending_approval",
    description: "Screened 12 candidates - awaiting approval",
    progress: 100,
    lastActivity: "2 minutes ago",
    decisionLog: [
      { time: "10:45 AM", action: "Analyzed resume for Maya Johnson", result: "Qualified - Strong match" },
      { time: "10:42 AM", action: "Analyzed resume for Alex Chen", result: "Qualified - Moderate match" },
      { time: "10:38 AM", action: "Analyzed resume for Sarah Mitchell", result: "Not qualified - Missing key skills" },
    ],
    candidatesPushed: [
      { id: 1, name: "Maya Johnson", decision: "Move to Interview", score: 92 },
      { id: 2, name: "Alex Chen", decision: "Move to Assessment", score: 78 },
      { id: 3, name: "Marcus Rashford", decision: "Move to Interview", score: 88 },
    ],
  },
  {
    id: 2,
    name: "Email Sequence Agent",
    status: "active",
    description: "Sending follow-up emails to 8 candidates",
    progress: 50,
    lastActivity: "5 minutes ago",
    decisionLog: [
      { time: "11:20 AM", action: "Sent follow-up to John Doe", result: "Email delivered" },
      { time: "11:15 AM", action: "Sent interview reminder to Jane Smith", result: "Email opened" },
    ],
    candidatesPushed: [],
  },
  {
    id: 3,
    name: "Skill Matching Agent",
    status: "completed",
    description: "Matched 23 candidates to job requirements",
    progress: 100,
    lastActivity: "1 hour ago",
    decisionLog: [
      { time: "9:30 AM", action: "Completed skill analysis batch", result: "23 profiles matched" },
      { time: "9:15 AM", action: "Started skill matching process", result: "Processing..." },
    ],
    candidatesPushed: [],
  },
  {
    id: 4,
    name: "Pipeline Movement Agent",
    status: "pending_approval",
    description: "5 candidates ready to advance - needs approval",
    progress: 100,
    lastActivity: "15 minutes ago",
    decisionLog: [
      { time: "11:05 AM", action: "Evaluated assessment scores", result: "5 candidates passed threshold" },
      { time: "11:00 AM", action: "Started pipeline review", result: "Analyzing candidates" },
    ],
    candidatesPushed: [
      { id: 4, name: "James Park", decision: "Move to Final Round", score: 95 },
      { id: 5, name: "Priya Sharma", decision: "Move to Final Round", score: 91 },
      { id: 6, name: "Daniel Wright", decision: "Move to Interview", score: 84 },
    ],
  },
];

const automations = [
  {
    id: 1,
    action: "Pipeline Movement",
    from: "Screening",
    to: "Assessment",
    candidates: ["James Park", "Priya Sharma"],
    reason: "Score threshold met (>85)",
    timestamp: "30 minutes ago",
    status: "pending_review",
  },
  {
    id: 2,
    action: "Auto-Qualification",
    from: "Applied",
    to: "Screening",
    candidates: ["Daniel Wright", "Lena Kim", "Marcus Rivera"],
    reason: "Required skills matched",
    timestamp: "1 hour ago",
    status: "pending_review",
  },
];

// Evaluation Agents Data
const assessments = [
  {
    id: 1,
    title: "Technical Assessment",
    type: "Mixed",
    stage: "Screening",
    questions: [
      { type: "MCQ", question: "What is React?", options: 4 },
      { type: "MCQ", question: "Explain JavaScript closures", options: 4 },
      { type: "Coding", question: "Implement a binary search algorithm", timeLimit: "30 min" },
      { type: "Descriptive", question: "Describe your experience with REST APIs", wordLimit: 300 },
    ],
    duration: "60 minutes",
    passingScore: 75,
    totalQuestions: 4,
  },
  {
    id: 2,
    title: "Behavioral Assessment",
    type: "Descriptive",
    stage: "Assessment",
    questions: [
      { type: "Descriptive", question: "Describe a time you faced a challenge at work", wordLimit: 400 },
      { type: "Descriptive", question: "How do you handle conflict in a team?", wordLimit: 400 },
      { type: "Descriptive", question: "What motivates you professionally?", wordLimit: 300 },
    ],
    duration: "45 minutes",
    passingScore: null,
    totalQuestions: 3,
  },
];

const interviews = [
  {
    id: 1,
    title: "Technical Interview - Round 1",
    type: "Live Interview",
    stage: "Interview",
    duration: "60 minutes",
    interviewers: ["Sarah Chen", "Mike Roberts"],
    conductionNotes: [
      "Review candidate's technical assessment results",
      "Ask about experience with React and Node.js",
      "Discuss system design for scalable applications",
      "Code review session - discuss past projects",
      "Ask about testing practices and CI/CD experience",
    ],
    feedbackForm: [
      { field: "Technical Skills", type: "rating", scale: 5 },
      { field: "Problem Solving", type: "rating", scale: 5 },
      { field: "Communication", type: "rating", scale: 5 },
      { field: "Cultural Fit", type: "rating", scale: 5 },
      { field: "Overall Comments", type: "text", required: true },
      { field: "Recommendation", type: "select", options: ["Strong Hire", "Hire", "Maybe", "No Hire"] },
    ],
  },
  {
    id: 2,
    title: "Hiring Manager Interview",
    type: "Live Interview",
    stage: "Interview",
    duration: "45 minutes",
    interviewers: ["Alex Johnson"],
    conductionNotes: [
      "Discuss candidate's career goals and motivations",
      "Review experience with team collaboration",
      "Discuss work style and remote work preferences",
      "Ask about expectations for the role",
      "Review compensation expectations",
    ],
    feedbackForm: [
      { field: "Leadership Potential", type: "rating", scale: 5 },
      { field: "Team Fit", type: "rating", scale: 5 },
      { field: "Communication Skills", type: "rating", scale: 5 },
      { field: "Comments", type: "text", required: true },
      { field: "Decision", type: "select", options: ["Proceed", "Hold", "Decline"] },
    ],
  },
];

const aiInterviews = [
  {
    id: 1,
    title: "AI Screening Interview",
    type: "AI Interview",
    stage: "Screening",
    purpose: "Initial screening to assess basic qualifications",
    duration: "15-20 minutes",
    questions: [
      "Tell me about your background and experience",
      "Why are you interested in this position?",
      "What are your salary expectations?",
      "When are you available to start?",
      "Do you have any questions about the role?",
    ],
    evaluationCriteria: [
      "Communication clarity",
      "Relevant experience",
      "Cultural alignment",
      "Availability and expectations",
    ],
  },
];

// Operations Agents Components
function ApprovalCard({ approval }) {
  return (
    <div className="p-5 rounded-xl bg-white border border-orange-200 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-gray-900 mb-1">
              {approval.description}
            </h3>
            <p className="text-[12px] text-gray-500">{approval.timestamp}</p>
          </div>
        </div>
        <span className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-orange-50 text-orange-700 border border-orange-200">
          Pending
        </span>
      </div>
      <div className="mb-4">
        <p className="text-[12px] text-gray-500 mb-2">Affected Candidates:</p>
        <div className="flex flex-wrap gap-1.5">
          {approval.candidates.map((name, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-[11px] font-medium rounded-md bg-gray-50 text-gray-700 border border-gray-200"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="sm" className="flex-1">
          <Check className="w-3.5 h-3.5 mr-1.5" />
          Approve
        </Button>
        <Button size="sm" variant="outline" className="flex-1">
          <X className="w-3.5 h-3.5 mr-1.5" />
          Reject
        </Button>
        <Button size="sm" variant="ghost">
          <Eye className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}

function AgentCard({ agent, onViewDetails }) {
  const statusColors = {
    active: "text-emerald-600 bg-emerald-50 border-emerald-200",
    completed: "text-blue-600 bg-blue-50 border-blue-200",
    idle: "text-gray-500 bg-gray-50 border-gray-200",
    pending_approval: "text-orange-600 bg-orange-50 border-orange-200",
  };

  const needsApproval = agent.status === "pending_approval";

  return (
    <div className="p-5 rounded-xl bg-white border border-gray-200 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-[14px] font-semibold text-gray-900 mb-1">
              {agent.name}
            </h3>
            <p className="text-[12px] text-gray-600">{agent.description}</p>
          </div>
        </div>
        <span
          className={`px-2 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md border ${
            statusColors[agent.status]
          }`}
        >
          {agent.status.replace("_", " ")}
        </span>
      </div>
      <div className="mb-3">
        <div className="flex justify-between text-[11px] text-gray-500 mb-1.5">
          <span>Progress</span>
          <span>{agent.progress}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${agent.progress}%` }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
          <Clock className="w-3 h-3" />
          Last activity: {agent.lastActivity}
        </p>
        <Button
          variant={needsApproval ? "default" : "outline"}
          size="sm"
          onClick={() => onViewDetails(agent)}
          className="h-7 text-[11px]"
        >
          {needsApproval ? (
            <>
              <AlertCircle className="w-3 h-3 mr-1" />
              Review
            </>
          ) : (
            <>
              <Maximize2 className="w-3 h-3 mr-1" />
              Details
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function AutomationCard({ automation }) {
  return (
    <div className="p-4 rounded-lg bg-white border border-blue-200 hover:shadow-sm transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h4 className="text-[13px] font-semibold text-gray-900">{automation.action}</h4>
            <p className="text-[11px] text-gray-500">{automation.timestamp}</p>
          </div>
        </div>
        <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-700 border-blue-200">
          Review
        </Badge>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="secondary" className="text-[10px]">{automation.from}</Badge>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <Badge variant="secondary" className="text-[10px]">{automation.to}</Badge>
      </div>
      <p className="text-[11px] text-gray-600 mb-2">Reason: {automation.reason}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {automation.candidates.map((name, idx) => (
          <span key={idx} className="px-2 py-0.5 text-[10px] rounded bg-gray-50 text-gray-700 border border-gray-200">
            {name}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" className="flex-1 h-7 text-[11px]">
          <Check className="w-3 h-3 mr-1" />
          Approve
        </Button>
        <Button size="sm" variant="outline" className="flex-1 h-7 text-[11px]">
          <X className="w-3 h-3 mr-1" />
          Reject
        </Button>
      </div>
    </div>
  );
}

// Evaluation Agents Components
function AssessmentCard({ assessment }) {
  const typeIcons = {
    MCQ: CheckSquare,
    Descriptive: MessageSquare,
    Coding: Code,
    Mixed: FileText,
  };
  const Icon = typeIcons[assessment.type] || FileText;

  return (
    <div className="p-5 rounded-xl bg-white border border-gray-200 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-gray-900 mb-1">
              {assessment.title}
            </h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px]">
                <MapPin className="w-3 h-3 mr-1" />
                {assessment.stage}
              </Badge>
              <Badge variant="secondary" className="text-[10px]">
                {assessment.type}
              </Badge>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[12px] text-gray-500">{assessment.duration}</p>
          {assessment.passingScore && (
            <p className="text-[11px] text-indigo-600 font-medium">
              Pass: {assessment.passingScore}%
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[13px] font-medium text-gray-700 mb-2">
          Questions ({assessment.totalQuestions}):
        </p>
        {assessment.questions.map((q, idx) => (
          <div key={idx} className="p-3 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="text-[9px] shrink-0 mt-0.5">
                {q.type}
              </Badge>
              <div className="flex-1">
                <p className="text-[12px] text-gray-900">{q.question}</p>
                {q.options && (
                  <p className="text-[10px] text-gray-500 mt-1">{q.options} options</p>
                )}
                {q.timeLimit && (
                  <p className="text-[10px] text-gray-500 mt-1">Time: {q.timeLimit}</p>
                )}
                {q.wordLimit && (
                  <p className="text-[10px] text-gray-500 mt-1">Max: {q.wordLimit} words</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InterviewCard({ interview }) {
  return (
    <div className="p-5 rounded-xl bg-white border border-gray-200 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
            <Video className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-gray-900 mb-1">
              {interview.title}
            </h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px]">
                <MapPin className="w-3 h-3 mr-1" />
                {interview.stage}
              </Badge>
              <Badge variant="secondary" className="text-[10px]">
                {interview.duration}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-[12px] font-medium text-gray-700 mb-2">Interviewers:</p>
        <div className="flex flex-wrap gap-1.5">
          {interview.interviewers.map((name, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-[11px] rounded-md bg-violet-50 text-violet-700 border border-violet-200"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-[12px] font-medium text-gray-700 mb-2">Conduction Notes:</p>
        <ul className="space-y-1.5">
          {interview.conductionNotes.map((note, idx) => (
            <li key={idx} className="text-[12px] text-gray-600 flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 shrink-0" />
              {note}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-[12px] font-medium text-gray-700 mb-2">Feedback Form:</p>
        <div className="space-y-1.5">
          {interview.feedbackForm.map((field, idx) => (
            <div key={idx} className="flex items-center justify-between text-[11px]">
              <span className="text-gray-600">{field.field}</span>
              <Badge variant="outline" className="text-[9px]">
                {field.type === "rating" ? `${field.scale} stars` : field.type}
                {field.required && " *"}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AIInterviewCard({ interview }) {
  return (
    <div className="p-5 rounded-xl bg-white border border-gray-200 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-gray-900 mb-1">
              {interview.title}
            </h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px]">
                <MapPin className="w-3 h-3 mr-1" />
                {interview.stage}
              </Badge>
              <Badge className="text-[10px] bg-gradient-to-r from-indigo-500 to-violet-600">
                AI-Powered
              </Badge>
            </div>
          </div>
        </div>
        <p className="text-[12px] text-gray-500">{interview.duration}</p>
      </div>

      <p className="text-[12px] text-gray-600 mb-4">{interview.purpose}</p>

      <div className="mb-4">
        <p className="text-[12px] font-medium text-gray-700 mb-2">AI Questions:</p>
        <ul className="space-y-1.5">
          {interview.questions.map((q, idx) => (
            <li key={idx} className="text-[12px] text-gray-600 flex items-start gap-2">
              <span className="text-indigo-600 font-medium shrink-0">{idx + 1}.</span>
              {q}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-[12px] font-medium text-gray-700 mb-2">Evaluation Criteria:</p>
        <div className="flex flex-wrap gap-1.5">
          {interview.evaluationCriteria.map((criterion, idx) => (
            <Badge key={idx} variant="secondary" className="text-[10px]">
              {criterion}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function Agents() {
  const [activeTab, setActiveTab] = useState("operations");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewDetails = (agent) => {
    setSelectedAgent(agent);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex-1 min-h-screen bg-[#FAFAFA]">
      <div className="px-8 pt-8 pb-6">
        <h1 className="text-[22px] font-semibold text-gray-900 mb-6">Agents</h1>

        {/* Main Tabs */}
        <div className="flex gap-2 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("operations")}
            className={`px-6 py-3 text-[14px] font-medium transition-colors ${
              activeTab === "operations"
                ? "text-indigo-700 border-b-2 border-indigo-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Operations Agents
          </button>
          <button
            onClick={() => setActiveTab("evaluation")}
            className={`px-6 py-3 text-[14px] font-medium transition-colors ${
              activeTab === "evaluation"
                ? "text-indigo-700 border-b-2 border-indigo-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Evaluation Agents
          </button>
        </div>

        {/* Operations Agents Tab */}
        {activeTab === "operations" && (
          <div className="space-y-6">
            {/* Active Agents */}
            <div>
              <h2 className="text-[16px] font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Bot className="w-5 h-5 text-indigo-600" />
                Active Agents
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {agents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} onViewDetails={handleViewDetails} />
                ))}
              </div>
            </div>

            {/* Automated Actions */}
            <div>
              <h2 className="text-[16px] font-semibold text-gray-900 mb-3">
                Recent Automated Actions
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {automations.map((automation) => (
                  <AutomationCard key={automation.id} automation={automation} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Evaluation Agents Tab */}
        {activeTab === "evaluation" && (
          <div className="space-y-6">
            {/* Assessments */}
            <div>
              <h2 className="text-[16px] font-semibold text-gray-900 mb-3">Assessments</h2>
              <div className="grid grid-cols-1 gap-4">
                {assessments.map((assessment) => (
                  <AssessmentCard key={assessment.id} assessment={assessment} />
                ))}
              </div>
            </div>

            {/* Interviews */}
            <div>
              <h2 className="text-[16px] font-semibold text-gray-900 mb-3">Live Interviews</h2>
              <div className="grid grid-cols-1 gap-4">
                {interviews.map((interview) => (
                  <InterviewCard key={interview.id} interview={interview} />
                ))}
              </div>
            </div>

            {/* AI Interviews */}
            <div>
              <h2 className="text-[16px] font-semibold text-gray-900 mb-3">AI Interviews</h2>
              <div className="grid grid-cols-1 gap-4">
                {aiInterviews.map((interview) => (
                  <AIInterviewCard key={interview.id} interview={interview} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Agent Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedAgent?.name}</DialogTitle>
          </DialogHeader>
          {selectedAgent && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-[13px] font-semibold text-gray-900 mb-2">Status</h3>
                <p className="text-[12px] text-gray-600">{selectedAgent.description}</p>
              </div>
              <div>
                <h3 className="text-[13px] font-semibold text-gray-900 mb-2">Decision Log</h3>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-2">
                    {selectedAgent.decisionLog.map((log, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <p className="text-[11px] text-gray-500 mb-1">{log.time}</p>
                        <p className="text-[12px] text-gray-900 font-medium">{log.action}</p>
                        <p className="text-[11px] text-gray-600 mt-1">{log.result}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              {selectedAgent.candidatesPushed.length > 0 && (
                <div>
                  <h3 className="text-[13px] font-semibold text-gray-900 mb-2">Candidates Pushed</h3>
                  <div className="space-y-2">
                    {selectedAgent.candidatesPushed.map((candidate) => (
                      <div key={candidate.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <div>
                          <p className="text-[12px] font-medium text-gray-900">{candidate.name}</p>
                          <p className="text-[11px] text-gray-500">{candidate.decision}</p>
                        </div>
                        <Badge variant="secondary">Score: {candidate.score}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  <Check className="w-4 h-4 mr-1.5" />
                  Approve All
                </Button>
                <Button variant="outline" className="flex-1">
                  <X className="w-4 h-4 mr-1.5" />
                  Reject All
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}