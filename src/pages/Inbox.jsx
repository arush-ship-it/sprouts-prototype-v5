import React, { useState } from "react";
import { Mail, Send, Clock, CheckCheck, Plus, Filter, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger } from
"@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import CommunicationAnalyticsDashboard from "@/components/inbox/CommunicationAnalyticsDashboard";

const activities = [
{
  id: 1,
  type: "email_sent",
  candidate: "Maya Johnson",
  subject: "Interview Invitation - Senior Product Designer",
  timestamp: "2 hours ago",
  status: "delivered"
},
{
  id: 2,
  type: "sequence_started",
  candidate: "Marcus Rashford",
  subject: "Warm Outreach Sequence Started",
  timestamp: "5 hours ago",
  status: "active"
},
{
  id: 3,
  type: "email_opened",
  candidate: "Sarah Mitchell",
  subject: "Re: Your Application - Senior Product Designer",
  timestamp: "1 day ago",
  status: "opened"
},
{
  id: 4,
  type: "email_replied",
  candidate: "Alex Chen",
  subject: "Re: Next Steps in Interview Process",
  timestamp: "1 day ago",
  status: "replied"
},
{
  id: 5,
  type: "sequence_completed",
  candidate: "James Park",
  subject: "Follow-up Sequence Completed",
  timestamp: "2 days ago",
  status: "completed"
},
{
  id: 6,
  type: "email_sent",
  candidate: "Emma Williams",
  subject: "Technical Assessment Details",
  timestamp: "2 days ago",
  status: "delivered"
},
{
  id: 7,
  type: "email_opened",
  candidate: "David Brown",
  subject: "Re: Interview Schedule Confirmation",
  timestamp: "3 days ago",
  status: "opened"
},
{
  id: 8,
  type: "email_replied",
  candidate: "Lisa Anderson",
  subject: "Re: Second Round Interview",
  timestamp: "3 days ago",
  status: "replied"
},
{
  id: 9,
  type: "sequence_started",
  candidate: "Michael Taylor",
  subject: "Welcome to Our Hiring Process",
  timestamp: "4 days ago",
  status: "active"
},
{
  id: 10,
  type: "email_sent",
  candidate: "Jennifer Martinez",
  subject: "Application Received - UX Designer",
  timestamp: "4 days ago",
  status: "delivered"
},
{
  id: 11,
  type: "email_opened",
  candidate: "Robert Garcia",
  subject: "Re: Portfolio Review Feedback",
  timestamp: "5 days ago",
  status: "opened"
},
{
  id: 12,
  type: "sequence_completed",
  candidate: "Jessica Lee",
  subject: "Onboarding Sequence Completed",
  timestamp: "5 days ago",
  status: "completed"
}];


function ActivityItem({ activity }) {
  const [hovered, setHovered] = useState(false);
  const [starred, setStarred] = useState(false);
  const getIcon = () => {
    switch (activity.type) {
      case "email_sent":
        return <Send className="w-4 h-4 text-blue-600" />;
      case "email_opened":
        return <Mail className="w-4 h-4 text-violet-600" />;
      case "email_replied":
        return <CheckCheck className="w-4 h-4 text-emerald-600" />;
      case "sequence_started":
      case "sequence_completed":
        return <Clock className="w-4 h-4 text-orange-600" />;
      default:
        return <Mail className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch (activity.status) {
      case "delivered":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "opened":
        return "bg-violet-50 text-violet-700 border-violet-200";
      case "replied":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "active":
      case "completed":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div
      className="bg-white px-4 py-4 rounded-xl flex items-center gap-3 border border-gray-200 hover:shadow-sm transition-all cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      <div className="p-2 rounded-lg bg-gray-50">{getIcon()}</div>
      <div className="flex-1 min-w-0 flex items-center gap-4">
        <p className="text-[13px] font-semibold text-gray-900 min-w-[140px]">
          {activity.candidate}
        </p>
        <p className="text-[12px] text-gray-600 flex-1 truncate">{activity.subject}</p>
        <span
          className={`inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md border ${getStatusColor()}`}>
          {activity.status}
        </span>
        <span className="text-[11px] text-gray-400 whitespace-nowrap min-w-[80px] text-right">
          {activity.timestamp}
        </span>
        <div className={`flex items-center gap-1.5 transition-opacity ${hovered ? "opacity-100" : "opacity-0"}`}>
          <button
            onClick={(e) => {e.stopPropagation();setStarred((v) => !v);}}
            className="p-1.5 rounded-lg hover:bg-yellow-50 transition-colors">

            <Star className={`w-4 h-4 ${starred ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`} />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 rounded-lg hover:bg-red-50 transition-colors">

            <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
          </button>
        </div>
      </div>
    </div>);

}

export default function Inbox() {
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isSequenceOpen, setIsSequenceOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Inbox");

  return (
    <div className="flex-1 min-h-screen bg-[#FAFAFA] overflow-auto">
      <div className="px-8">
        <div className="mt-8 mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-semibold text-gray-900 tracking-tight">
              Inbox
            </h1>
            <p className="text-[13px] text-gray-400 mt-1">
              All communications and sequences
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-3.5 h-3.5 mr-1.5" />
              Filters
            </Button>
            <Dialog open={isSequenceOpen} onOpenChange={setIsSequenceOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  New Sequence
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Sequence</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <Input placeholder="Sequence Name" />
                  <Textarea
                    placeholder="Sequence description..."
                    className="min-h-[100px]" />

                  <Button className="w-full">Create Sequence</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Send className="w-3.5 h-3.5 mr-1.5" />
                  Compose Email
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Compose Email</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <Input placeholder="To: candidate@example.com" />
                  <Input placeholder="Subject" />
                  <Textarea
                    placeholder="Write your message..."
                    className="min-h-[200px]" />

                  <div className="flex gap-2">
                    <Button className="flex-1">Send</Button>
                    <Button variant="outline" className="flex-1">
                      Save Draft
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <CommunicationAnalyticsDashboard />

      <div className="px-8 pb-6">
        {/* Tabs */}
        <div className="flex items-center justify-between mb-4 border-b border-gray-200">
          <div className="flex">
            {["Inbox", "Sent", "Starred"].map((tab) =>
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-[13px] font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab ?
              "border-blue-600 text-blue-600" :
              "border-transparent text-gray-500 hover:text-gray-700"}`
              }>
                {tab}
              </button>
            )}
          </div>
          <button className="bg-[#ffffff] text-gray-800 mb-1 px-3 py-1.5 text-sm font-medium rounded-lg flex items-center gap-1.5 border border-gray-200 hover:bg-gray-50 transition-colors">
            <Filter className="w-3.5 h-3.5" /> Filters
          </button>
        </div>
        {/* Activity List */}
        <div className="flex flex-col gap-2.5">
          {activities.map((activity) =>
          <ActivityItem key={activity.id} activity={activity} />
          )}
        </div>
      </div>
    </div>);

}