import React from "react";
import {
  FileText,
  Video,
  Code,
  MessageSquare,
  CheckSquare,
  Brain,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
        <p className="text-[12px] font-medium text-gray-700 mb-2">Feedback Form Fields:</p>
        <div className="space-y-1.5">
          {interview.feedbackForm.map((field, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded bg-gray-50 border border-gray-200"
            >
              <span className="text-[11px] text-gray-900">{field.field}</span>
              <Badge variant="outline" className="text-[9px]">
                {field.type}
                {field.scale && ` (1-${field.scale})`}
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
    <div className="p-5 rounded-xl bg-white border border-emerald-200 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
            <Brain className="w-5 h-5 text-emerald-600" />
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
              <Badge className="text-[10px] bg-emerald-600">
                AI Powered
              </Badge>
            </div>
          </div>
        </div>
        <p className="text-[12px] text-gray-500">{interview.duration}</p>
      </div>

      <p className="text-[12px] text-gray-600 mb-4 italic">
        {interview.purpose}
      </p>

      <div className="mb-4">
        <p className="text-[12px] font-medium text-gray-700 mb-2">AI Questions:</p>
        <ul className="space-y-1.5">
          {interview.questions.map((q, idx) => (
            <li key={idx} className="text-[12px] text-gray-600 flex items-start gap-2">
              <span className="text-emerald-600 font-semibold shrink-0">{idx + 1}.</span>
              {q}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-[12px] font-medium text-gray-700 mb-2">Evaluation Criteria:</p>
        <div className="flex flex-wrap gap-1.5">
          {interview.evaluationCriteria.map((criteria, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-[11px] rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200"
            >
              {criteria}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Evaluation() {
  return (
    <div className="flex-1 min-h-screen bg-[#FAFAFA] overflow-auto">
      <div className="px-8 pt-8 pb-8">
        <div className="mb-8">
          <h1 className="text-[24px] font-semibold text-gray-900 mb-1">
            Evaluation Criteria
          </h1>
          <p className="text-[13px] text-gray-500">
            Assessments and interviews configured for this job
          </p>
        </div>

        {/* Assessments */}
        <div className="mb-8">
          <h2 className="text-[16px] font-semibold text-gray-900 mb-4">
            Assessments
          </h2>
          <div className="grid gap-4">
            {assessments.map((assessment) => (
              <AssessmentCard key={assessment.id} assessment={assessment} />
            ))}
          </div>
        </div>

        {/* AI Interviews */}
        <div className="mb-8">
          <h2 className="text-[16px] font-semibold text-gray-900 mb-4">
            AI Screening Interviews
          </h2>
          <div className="grid gap-4">
            {aiInterviews.map((interview) => (
              <AIInterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        </div>

        {/* Live Interviews */}
        <div>
          <h2 className="text-[16px] font-semibold text-gray-900 mb-4">
            Live Interviews
          </h2>
          <div className="grid gap-4">
            {interviews.map((interview) => (
              <InterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}