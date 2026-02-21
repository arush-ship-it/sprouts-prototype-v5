import React, { useState } from "react";
import {
  Users,
  FileText,
  TrendingUp,
  Mail,
  CheckSquare,
  Briefcase,
  Send,
  Sparkles,
  PieChart,
  Minimize2,
  Maximize2,
  Bell,
  Settings,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import TabSwitcher from "@/components/shared/TabSwitcher";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

const pipelineFunnelData = [
  { stage: "Applied", count: 342 },
  { stage: "Screening", count: 156 },
  { stage: "Assessment", count: 89 },
  { stage: "Interview", count: 45 },
  { stage: "Offer", count: 12 },
];

const monthlyData = [
  { month: "Jan", jd: 18, resumes: 120 },
  { month: "Feb", jd: 23, resumes: 156 },
  { month: "Mar", jd: 21, resumes: 142 },
  { month: "Apr", jd: 19, resumes: 134 },
];

const sourceData = [
  { name: "Direct", value: 45, color: "#6366f1" },
  { name: "LinkedIn", value: 35, color: "#8b5cf6" },
  { name: "Referral", value: 12, color: "#ec4899" },
  { name: "Others", value: 8, color: "#f59e0b" },
];

export default function Dashboard() {
  const [isChatMinimized, setIsChatMinimized] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your analytics assistant. Ask me anything about your recruitment data.",
    },
  ]);
  const [chatInput, setChatInput] = useState("");

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { role: "user", content: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Based on the data, your top performing source is direct applications at 45%. Your conversion rate from screening to interview is around 29%.",
        },
      ]);
    }, 500);
  };

  return (
    <div className="flex flex-col h-screen bg-[#FAFAFA]">
      {/* Top Navigation */}
      <div className="px-6 py-4 bg-[#FAFAFA] border-b border-gray-200">
        <div className="flex items-center justify-between">
          <TabSwitcher activePage="Dashboard" />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" className="h-9 gap-2">
              <User className="w-4 h-4" />
              <span className="text-[13px] font-medium">John Doe</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto px-8 pt-6 pb-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-[28px] font-bold text-gray-900 mb-2">
              Hiring Dashboard
            </h1>
            <p className="text-[14px] text-gray-500">
              Overview of all recruitment activities
            </p>
          </div>

          {/* Data Visualizations */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {/* Pipeline Funnel */}
            <div className="p-4 rounded-xl bg-white border border-gray-200">
              <h3 className="text-[14px] font-semibold text-gray-900 mb-4">
                Candidates in Pipeline Funnel
              </h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={pipelineFunnelData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="stage" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly Trends */}
            <div className="p-4 rounded-xl bg-white border border-gray-200">
              <h3 className="text-[14px] font-semibold text-gray-900 mb-4">
                JD & Resume Processing/Month
              </h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="jd" stroke="#8b5cf6" strokeWidth={2} name="JD" />
                  <Line type="monotone" dataKey="resumes" stroke="#10b981" strokeWidth={2} name="Resumes" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Source Breakdown */}
            <div className="p-4 rounded-xl bg-white border border-gray-200">
              <h3 className="text-[14px] font-semibold text-gray-900 mb-4">
                Application Source Breakdown
              </h3>
              <ResponsiveContainer width="100%" height={180}>
                <RechartsPieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 mt-3">
                {sourceData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] text-gray-600">{item.name} {item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {analyticsCards.map((card) => (
              <div
                key={card.id}
                className="p-5 rounded-xl bg-white border border-gray-200 hover:shadow-md transition-all"
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

        {/* Analytics Chat Panel */}
        <div
          className={`border-l border-gray-200 bg-white flex flex-col transition-all duration-300 ${
            isChatMinimized ? "w-[60px]" : "w-[380px]"
          }`}
        >
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            {!isChatMinimized ? (
              <>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold text-gray-900">
                      Analytics Assistant
                    </h3>
                    <p className="text-[11px] text-gray-500">Ask about your data</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => setIsChatMinimized(true)}
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 mx-auto"
                onClick={() => setIsChatMinimized(false)}
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          {!isChatMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-[12px] ${
                        msg.role === "user"
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <Textarea
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendChat();
                      }
                    }}
                    placeholder="Ask about metrics..."
                    className="resize-none text-[12px]"
                    rows={2}
                  />
                  <Button onClick={handleSendChat} size="icon" className="shrink-0 h-9 w-9">
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}