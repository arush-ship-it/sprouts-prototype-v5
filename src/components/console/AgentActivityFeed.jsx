import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileCheck,
  Mail,
  Clock,
  Calendar,
  PlayCircle,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronUp,
  Users,
  MessageSquare } from
"lucide-react";

const activityFeed = [
{
  id: 1,
  agentName: "Outreach Automation",
  agentIcon: FileCheck,
  type: "stage_move",
  typeLabel: "Stage Move",
  typeColor: "bg-blue-50 text-blue-700 border-blue-200",
  dotColor: "bg-blue-500",
  time: "2 min ago",
  pendingApproval: true,
  description: "Moved 3 candidates from Applied → Interview",
  candidates: ["Maya Johnson", "Alex Chen", "Sarah Mitchell"],
  fromStage: "Applied",
  toStage: "Interview"
},
{
  id: 2,
  agentName: "Outreach Automation",
  agentIcon: Mail,
  type: "email_sent",
  typeLabel: "Email Sent",
  typeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
  dotColor: "bg-indigo-500",
  time: "8 min ago",
  pendingApproval: false,
  description: "Sent interview invite to 2 candidates",
  candidates: ["James Park", "Priya Sharma"],
  fromStage: null,
  toStage: null
},
{
  id: 3,
  agentName: "Smart Assessment",
  agentIcon: CheckCircle,
  type: "evaluation",
  typeLabel: "Evaluation",
  typeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  dotColor: "bg-emerald-500",
  time: "25 min ago",
  pendingApproval: false,
  description: "Evaluated 5 technical assessments — 3 passed",
  candidates: ["James Park (95%)", "Priya Sharma (88%)", "Lisa Brown (72%)"],
  fromStage: null,
  toStage: null
},
{
  id: 4,
  agentName: "Smart Assessment",
  agentIcon: CheckCircle,
  type: "stage_move",
  typeLabel: "Stage Move",
  typeColor: "bg-blue-50 text-blue-700 border-blue-200",
  dotColor: "bg-blue-500",
  time: "1 hour ago",
  pendingApproval: true,
  description: "5 candidates ready to advance to Offer — needs approval",
  candidates: ["James Park", "Priya Sharma", "Lisa Brown", "Marcus Rivera", "Aisha Patel"],
  fromStage: "Interview",
  toStage: "Offer"
},
{
  id: 5,
  agentName: "Scheduling Agent",
  agentIcon: Calendar,
  type: "scheduled",
  typeLabel: "Interview Scheduled",
  typeColor: "bg-amber-50 text-amber-700 border-amber-200",
  dotColor: "bg-amber-500",
  time: "2 hours ago",
  pendingApproval: false,
  description: "Scheduled interview for Lisa Brown on Mar 12, 2pm",
  candidates: ["Lisa Brown"],
  fromStage: null,
  toStage: null
},
{
  id: 6,
  agentName: "Outreach Automation",
  agentIcon: Clock,
  type: "reminder",
  typeLabel: "Reminder Sent",
  typeColor: "bg-gray-50 text-gray-600 border-gray-200",
  dotColor: "bg-gray-400",
  time: "3 hours ago",
  pendingApproval: false,
  description: "Sent deadline reminder to 4 candidates for pending assessments",
  candidates: ["Tom Willis", "Nina Patel", "David Kim", "Emma Scott"],
  fromStage: null,
  toStage: null
},
{
  id: 7,
  agentName: "Video Interview AI",
  agentIcon: PlayCircle,
  type: "evaluation",
  typeLabel: "Evaluation",
  typeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  dotColor: "bg-emerald-500",
  time: "4 hours ago",
  pendingApproval: false,
  description: "Analyzed video interview for Marcus Rivera — Strong communication",
  candidates: ["Marcus Rivera"],
  fromStage: null,
  toStage: null
},
{
  id: 8,
  agentName: "Outreach Automation",
  agentIcon: Mail,
  type: "auto_reject",
  typeLabel: "Auto Rejected",
  typeColor: "bg-red-50 text-red-600 border-red-200",
  dotColor: "bg-red-400",
  time: "5 hours ago",
  pendingApproval: false,
  description: "Auto-rejected 2 candidates — did not meet minimum criteria",
  candidates: ["John Doe", "Jane Smith"],
  fromStage: null,
  toStage: null
}];


function ActivityRow({ item }) {
  const [expanded, setExpanded] = useState(false);
  const [approved, setApproved] = useState(null);
  const Icon = item.agentIcon;

  return (
    <div className={`bg-white rounded-xl border transition-all duration-200 ${item.pendingApproval && approved === null ? "border-orange-200 shadow-sm" : "border-gray-100"}`}>
      <div className="px-4 py-3.5 rounded-2xl flex items-start gap-3">
        {/* Dot */}
        <div className="flex flex-col items-center pt-1 gap-1 flex-shrink-0">
          <div className={`w-2 h-2 rounded-full ${item.dotColor}`} />
        </div>

        {/* Icon */}
        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-gray-500" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="text-[12px] font-semibold text-gray-900">{item.agentName}</span>
            <Badge variant="outline" className={`text-[10px] font-medium px-1.5 py-0 ${item.typeColor}`}>
              {item.typeLabel}
            </Badge>
            {item.pendingApproval && approved === null &&
            <Badge className="text-[10px] font-semibold bg-orange-50 text-orange-600 border border-orange-200 px-1.5 py-0">
                <AlertCircle className="w-2.5 h-2.5 mr-1" />
                Pending Approval
              </Badge>
            }
            {approved === "approved" &&
            <Badge className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0">Approved</Badge>
            }
            {approved === "rejected" &&
            <Badge className="text-[10px] bg-red-50 text-red-600 border border-red-200 px-1.5 py-0">Rejected</Badge>
            }
          </div>

          <p className="text-[12px] text-gray-600 mb-1">{item.description}</p>

          {item.fromStage && item.toStage &&
          <div className="flex items-center gap-1.5 mb-2">
              <Badge variant="outline" className="text-[10px] bg-gray-50 text-gray-600">{item.fromStage}</Badge>
              <ArrowRight className="w-3 h-3 text-gray-400" />
              <Badge variant="outline" className="text-[10px] bg-gray-50 text-gray-600">{item.toStage}</Badge>
            </div>
          }

          {/* Candidate chips */}
          {expanded &&
          <div className="flex flex-wrap gap-1 mt-1.5 mb-2">
              {item.candidates.map((c, i) =>
            <span key={i} className="text-[11px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">{c}</span>
            )}
            </div>
          }

          <div className="flex items-center gap-3 mt-1">
            <span className="text-[10px] text-gray-400">{item.time}</span>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-[11px] text-indigo-500 hover:text-indigo-700 flex items-center gap-0.5 transition-colors">
              {expanded ? "Hide" : `${item.candidates.length} candidate${item.candidates.length > 1 ? "s" : ""}`}
              {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* View Profile Button */}
        <button className="flex-shrink-0 text-[11px] font-medium text-gray-500 hover:text-indigo-600 border border-gray-200 hover:border-indigo-300 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap">
          View Profile
        </button>
        

















        
      </div>
    </div>);

}

export default function AgentActivityFeed() {
  const [filter, setFilter] = useState("all");

  const filterOptions = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending Approval" },
  { key: "stage_move", label: "Stage Moves" },
  { key: "email_sent", label: "Emails" },
  { key: "evaluation", label: "Evaluations" },
  { key: "scheduled", label: "Scheduled" }];


  const pendingCount = activityFeed.filter((a) => a.pendingApproval).length;

  const filtered = activityFeed.filter((item) => {
    if (filter === "all") return true;
    if (filter === "pending") return item.pendingApproval;
    return item.type === filter;
  });

  return (
    <div className="pb-6">
      {/* Summary bar */}
      <div className="flex items-center gap-3 mb-4">
        {pendingCount > 0 &&
        <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
            <AlertCircle className="w-4 h-4 text-orange-500" />
            <span className="text-[12px] font-semibold text-orange-700">{pendingCount} action{pendingCount > 1 ? "s" : ""} pending approval</span>
          </div>
        }
        <span className="text-[12px] text-gray-400 ml-auto">{activityFeed.length} events today</span>
      </div>

      {/* Filter pills */}
      

















      {/* Activity list */}
      <div className="flex flex-col gap-3">
        {filtered.map((item) =>
        <ActivityRow key={item.id} item={item} />
        )}
        {filtered.length === 0 &&
        <div className="text-center py-10 text-gray-400 text-[13px]">No activity matching this filter.</div>
        }
      </div>
    </div>);

}