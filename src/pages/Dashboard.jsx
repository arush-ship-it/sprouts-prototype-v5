import React, { useState } from "react";
import {
  Users,
  FileText,
  TrendingUp,
  Mail,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Calendar,
  BarChart3,
  PieChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const analyticsCards = [
  {
    id: 1,
    title: "Applicants per Job Posting",
    value: "45.2",
    subtitle: "Average per posting",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: 2,
    title: "JD Processed This Month",
    value: "23",
    subtitle: "+12% from last month",
    icon: FileText,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    id: 3,
    title: "Candidates in Pipeline",
    value: "342",
    subtitle: "Across all jobs",
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    id: 4,
    title: "New Applications",
    value: "28",
    subtitle: "To be reviewed",
    icon: CheckSquare,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    id: 5,
    title: "Resumes Processed This Month",
    value: "156",
    subtitle: "+18% from last month",
    icon: FileText,
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    id: 6,
    title: "Application Source Breakdown",
    value: "Direct: 45%",
    subtitle: "LinkedIn: 35%, Others: 20%",
    icon: PieChart,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

const jobs = [
  {
    id: 1,
    title: "Senior Product Designer",
    department: "Design",
    applicants: 156,
    inPipeline: 34,
    status: "Active",
  },
  {
    id: 2,
    title: "Frontend Engineer",
    department: "Engineering",
    applicants: 203,
    inPipeline: 45,
    status: "Active",
  },
  {
    id: 3,
    title: "Product Manager",
    department: "Product",
    applicants: 89,
    inPipeline: 12,
    status: "Active",
  },
];

const messages = [
  {
    id: 1,
    candidate: "Maya Johnson",
    subject: "Interview Follow-up",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    candidate: "Alex Chen",
    subject: "Application Status Inquiry",
    time: "5 hours ago",
    unread: true,
  },
  {
    id: 3,
    candidate: "Sarah Mitchell",
    subject: "Thank You Note",
    time: "1 day ago",
    unread: false,
  },
];

const activities = [
  {
    id: 1,
    type: "approval",
    description: "3 candidates moved to interview stage",
    time: "1 hour ago",
  },
  {
    id: 2,
    type: "agent",
    description: "Resume screening completed for 12 applicants",
    time: "3 hours ago",
  },
  {
    id: 3,
    type: "automation",
    description: "5 candidates auto-qualified for screening",
    time: "5 hours ago",
  },
];

export default function Dashboard() {
  const [currentCard, setCurrentCard] = useState(0);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % analyticsCards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) =>
      prev === 0 ? analyticsCards.length - 1 : prev - 1
    );
  };

  const visibleCards = [
    analyticsCards[currentCard],
    analyticsCards[(currentCard + 1) % analyticsCards.length],
    analyticsCards[(currentCard + 2) % analyticsCards.length],
  ];

  return (
    <div className="flex-1 min-h-screen bg-[#FAFAFA] overflow-auto">
      <div className="px-8 pt-8 pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[28px] font-bold text-gray-900 mb-2">
            Hiring Dashboard
          </h1>
          <p className="text-[14px] text-gray-500">
            Overview of all recruitment activities
          </p>
        </div>

        {/* Analytics Carousel */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-semibold text-gray-900">
              Key Metrics
            </h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={prevCard}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={nextCard}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {visibleCards.map((card) => (
              <div
                key={card.id}
                className="p-6 rounded-xl bg-white border border-gray-200 hover:shadow-md transition-all"
              >
                <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center mb-4`}>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <h3 className="text-[13px] text-gray-500 font-medium mb-1">
                  {card.title}
                </h3>
                <p className="text-[32px] font-bold text-gray-900 mb-1">
                  {card.value}
                </p>
                <p className="text-[12px] text-gray-400">{card.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* All Jobs */}
        <div className="mb-6">
          <h2 className="text-[18px] font-semibold text-gray-900 mb-4">
            All Jobs
          </h2>
          <div className="space-y-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between p-5 rounded-xl bg-white border border-gray-200 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold text-gray-900">
                      {job.title}
                    </h3>
                    <p className="text-[12px] text-gray-400">{job.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-[20px] font-bold text-gray-900">
                      {job.applicants}
                    </p>
                    <p className="text-[11px] text-gray-400">Applicants</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[20px] font-bold text-indigo-600">
                      {job.inPipeline}
                    </p>
                    <p className="text-[11px] text-gray-400">In Pipeline</p>
                  </div>
                  <span className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                    {job.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid: Messages & Activity */}
        <div className="grid grid-cols-2 gap-6">
          {/* All Messages */}
          <div>
            <h2 className="text-[18px] font-semibold text-gray-900 mb-4">
              Recent Messages
            </h2>
            <div className="space-y-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-200 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-[13px] font-semibold text-gray-900">
                        {msg.candidate}
                      </p>
                      <span className="text-[11px] text-gray-400 whitespace-nowrap">
                        {msg.time}
                      </span>
                    </div>
                    <p className="text-[12px] text-gray-600 truncate">
                      {msg.subject}
                    </p>
                    {msg.unread && (
                      <span className="inline-block w-2 h-2 rounded-full bg-indigo-600 mt-1" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Tasks/Activity */}
          <div>
            <h2 className="text-[18px] font-semibold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-2">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-200 hover:shadow-sm transition-all"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shrink-0">
                    <CheckSquare className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] text-gray-900 mb-1">
                      {activity.description}
                    </p>
                    <span className="text-[11px] text-gray-400">
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}