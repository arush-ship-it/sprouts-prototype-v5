import React, { useState } from "react";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Users,
  TrendingUp,
  Eye,
  UserPlus,
  Edit2,
  ChevronDown,
  ChevronUp,
  Activity,
  Target,
  CheckCircle2,
  ExternalLink,
  EyeOff,
  Trash2,
  Share2,
  XCircle } from
"lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import HiringTeam from "@/components/console/HiringTeam";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  Cell } from
"recharts";

const jobData = {
  title: "Senior Product Designer",
  department: "Design",
  location: "San Francisco, CA",
  type: "Full-time",
  salary: "$120k - $180k",
  postedDate: "Feb 15, 2026",
  status: "Active",
  description:
  "We're looking for a talented Senior Product Designer to join our team and help shape the future of our products. You'll work closely with cross-functional teams to create intuitive, user-centered designs.",
  requirements: [
  "5+ years of product design experience",
  "Strong portfolio showcasing UX/UI work",
  "Proficiency in Figma and design systems",
  "Experience with user research and testing"]

};

const stats = [
{ label: "Total Applicants", value: "156", icon: Users, color: "text-blue-600" },
{ label: "In Pipeline", value: "34", icon: TrendingUp, color: "text-violet-600" },
{ label: "In Review", value: "12", icon: Eye, color: "text-orange-600" },
{ label: "Interviews", value: "8", icon: UserPlus, color: "text-emerald-600" }];


const pipelineData = [
{ stage: "Applied", count: 156 },
{ stage: "Screening", count: 45 },
{ stage: "Assessment", count: 28 },
{ stage: "Interview", count: 15 },
{ stage: "Final", count: 8 },
{ stage: "Offer", count: 3 }];


const applicationTrend = [
{ date: "Feb 15", count: 12 },
{ date: "Feb 16", count: 18 },
{ date: "Feb 17", count: 25 },
{ date: "Feb 18", count: 31 },
{ date: "Feb 19", count: 38 },
{ date: "Feb 20", count: 32 }];


const activityLog = [
{ time: "2 hours ago", action: "Pipeline automation moved 3 candidates to Interview stage", user: "AI Agent" },
{ time: "5 hours ago", action: "Job posting updated", user: "Sarah Chen" },
{ time: "1 day ago", action: "15 new applications received", user: "System" },
{ time: "1 day ago", action: "Assessment template updated", user: "Mike Roberts" },
{ time: "2 days ago", action: "Job posted to LinkedIn", user: "System" },
{ time: "2 days ago", action: "Job created", user: "Sarah Chen" }];

const idealPersona = {
  overview: "A creative problem-solver with a passion for user-centered design and a track record of shipping impactful products at scale.",
  traits: [
  { label: "Experience Level", value: "Senior (5-8 years)" },
  { label: "Design Philosophy", value: "User-first, data-informed" },
  { label: "Work Style", value: "Collaborative, iterative" },
  { label: "Technical Skills", value: "Figma, design systems, prototyping" }],

  strengths: [
  "Strong visual and interaction design skills",
  "Proven ability to conduct user research and translate insights into design decisions",
  "Experience working in fast-paced, agile environments",
  "Excellent communication and stakeholder management skills"],

  cultureFit: "Someone who thrives in a collaborative environment, values feedback, and is passionate about creating beautiful, functional products that solve real user problems."
};


export default function JobDetails() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [editedJob, setEditedJob] = useState({ ...jobData });
  const [isEditPersonaOpen, setIsEditPersonaOpen] = useState(false);
  const [editedPersona, setEditedPersona] = useState({ ...idealPersona });
  const [unpublishedPlatforms, setUnpublishedPlatforms] = useState([]);

  const toggleUnpublish = (platform) => {
    setUnpublishedPlatforms((prev) =>
    prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const handleSave = () => {
    setIsEditDialogOpen(false);
  };

  const handleCancel = () => {
    setEditedJob({ ...jobData });
    setIsEditDialogOpen(false);
  };

  const handleSavePersona = () => {
    setIsEditPersonaOpen(false);
  };

  const handleCancelPersona = () => {
    setEditedPersona({ ...idealPersona });
    setIsEditPersonaOpen(false);
  };

  return (
    <div className="flex-1 min-h-screen bg-[#FAFAFA] overflow-auto">
      <div className="bg-[#F2F3F5] pt-8 pb-8 px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-[24px] font-semibold text-gray-900 tracking-tight">
                  {jobData.title}
                </h1>
                <span className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                  {jobData.status}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-[13px] text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  {jobData.department}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {jobData.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {jobData.type}
                </span>
                <span className="flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5" />
                  {jobData.salary}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                <Share2 className="w-3.5 h-3.5" />
                Share
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                <XCircle className="w-3.5 h-3.5" />
                Close Job
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
              <button className="bg-blue-600 text-[#ffffff] px-4 py-1.5 text-sm font-medium rounded-lg border border-gray-200 hover:bg-blue-700 transition-colors">
                Job Health Report
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        
















        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Pipeline Funnel */}
          <div className="p-6 rounded-2xl bg-white">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[14px] font-semibold text-gray-900">Pipeline Overview</h3>
              <span className="text-[11px] text-gray-400 font-medium">By stage</span>
            </div>
            <p className="text-[11px] text-gray-400 mb-4">Candidate distribution across hiring stages</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={pipelineData} barCategoryGap="35%">
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.95} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="stage" tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 500 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 10, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.12)', padding: '8px 12px' }}
                  cursor={{ fill: 'rgba(99,102,241,0.06)' }} />
                <Bar dataKey="count" fill="url(#barGrad)" radius={[8, 8, 3, 3]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Application Trend */}
          <div className="p-6 rounded-2xl bg-white">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[14px] font-semibold text-gray-900">Application Trend</h3>
              <span className="text-[11px] text-emerald-500 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">+{applicationTrend[applicationTrend.length - 1].count - applicationTrend[0].count} this week</span>
            </div>
            <p className="text-[11px] text-gray-400 mb-4">Daily application volume over time</p>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={applicationTrend}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 500 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 10, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.12)', padding: '8px 12px' }}
                  cursor={{ stroke: '#10b981', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area type="monotone" dataKey="count" stroke="#10b981" strokeWidth={2.5} fill="url(#areaGrad)" dot={{ r: 4, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Posted On Section */}
        <div className="bg-white mb-6 px-4 py-4 rounded-2xl">
          <h3 className="text-[16px] font-semibold text-gray-900 mb-4">Posted On</h3>
          <div className="flex flex-col gap-3">
            {[
            { platform: "LinkedIn", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png", url: "https://linkedin.com/jobs/view/senior-product-designer" },
            { platform: "Indeed", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Indeed_logo.png", url: "https://indeed.com/job/senior-product-designer" },
            { platform: "Company Website", logo: null, url: "https://company.com/careers/senior-product-designer" }].
            map((posting) =>
            <div key={posting.platform} className={`flex items-center justify-between p-3 rounded-lg border bg-gray-50 transition-all ${unpublishedPlatforms.includes(posting.platform) ? "border-red-100 bg-red-50 opacity-60" : "border-gray-100"}`}>
                <div className="flex items-center gap-3">
                  {posting.logo ?
                <img src={posting.logo} alt={posting.platform} className="w-6 h-6 rounded object-contain" /> :

                <div className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center">
                      <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                    </div>
                }
                  <div>
                    <span className="text-[13px] font-medium text-gray-900">{posting.platform}</span>
                    {unpublishedPlatforms.includes(posting.platform) &&
                  <span className="ml-2 text-[11px] text-red-500 font-medium">Unpublished</span>
                  }
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {!unpublishedPlatforms.includes(posting.platform) &&
                <a href={posting.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[12px] font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                      View Posting
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                }
                  <button
                  onClick={() => toggleUnpublish(posting.platform)}
                  className={`flex items-center gap-1.5 text-[12px] font-medium transition-colors ${unpublishedPlatforms.includes(posting.platform) ? "text-emerald-600 hover:text-emerald-800" : "text-red-400 hover:text-red-600"}`}>
                    <EyeOff className="w-3.5 h-3.5" />
                    {unpublishedPlatforms.includes(posting.platform) ? "Republish" : "Unpublish"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Job Details */}
        <div className="p-6 rounded-xl bg-white border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] font-semibold text-gray-900">
              Job Description
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditDialogOpen(true)}
              className="h-8">
              <Edit2 className="w-3.5 h-3.5 mr-1.5" />
              Edit
            </Button>
          </div>
          <p className="text-[13px] text-gray-600 leading-relaxed mb-6 pb-6 border-b border-gray-100">
            {editedJob.description}
          </p>
          
          <h3 className="text-[16px] font-semibold text-gray-900 mb-3">
            Requirements
          </h3>
          <ul className="space-y-2">
            {editedJob.requirements.map((req, idx) =>
            <li
              key={idx}
              className="text-[13px] text-gray-600 flex items-start gap-2">
                <span className="text-emerald-600 mt-1">•</span>
                {req}
              </li>
            )}
          </ul>
        </div>

        {/* Ideal Persona Section */}
        <div className="p-6 rounded-xl bg-white border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-600" />
              <h3 className="text-[16px] font-semibold text-gray-900">
                Ideal Persona
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditPersonaOpen(true)}
              className="h-8">
              <Edit2 className="w-3.5 h-3.5 mr-1.5" />
              Edit
            </Button>
          </div>
          
          <p className="text-[13px] text-gray-600 leading-relaxed mb-6 pb-6 border-b border-gray-100">
            {idealPersona.overview}
          </p>

          <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-100">
            {idealPersona.traits.map((trait, idx) =>
            <div key={idx}>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  {trait.label}
                </p>
                <p className="text-[13px] text-gray-900 font-medium">
                  {trait.value}
                </p>
              </div>
            )}
          </div>

          <div className="mb-6 pb-6 border-b border-gray-100">
            <h4 className="text-[13px] font-semibold text-gray-900 mb-3">
              Key Strengths
            </h4>
            <ul className="space-y-2">
              {idealPersona.strengths.map((strength, idx) =>
              <li key={idx} className="text-[13px] text-gray-600 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                  {strength}
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold text-gray-900 mb-2">
              Culture Fit
            </h4>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              {idealPersona.cultureFit}
            </p>
          </div>
        </div>

        {/* Hiring Team Section */}
        <div className="mb-6">
          <HiringTeam />
        </div>

        {/* Activity Log (Collapsible) */}
        <Collapsible open={isActivityOpen} onOpenChange={setIsActivityOpen}>
          <div className="p-4 rounded-xl bg-white border border-gray-200">
            <CollapsibleTrigger className="flex items-center justify-between w-full group">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-gray-400" />
                <h3 className="text-[14px] font-semibold text-gray-900">
                  System Activity Log
                </h3>
                <span className="text-[11px] text-gray-400">
                  ({activityLog.length} events)
                </span>
              </div>
              {isActivityOpen ?
              <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-gray-600" /> :

              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              }
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="space-y-2">
                {activityLog.map((log, idx) =>
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                    <div className="flex-1">
                      <p className="text-[12px] text-gray-900">{log.action}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-gray-400">{log.time}</span>
                        <span className="text-[10px] text-gray-400">•</span>
                        <span className="text-[10px] text-gray-500">{log.user}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </div>

      {/* Edit Job Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Job Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={editedJob.title}
                  onChange={(e) => setEditedJob({ ...editedJob, title: e.target.value })} />

              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={editedJob.department}
                  onChange={(e) => setEditedJob({ ...editedJob, department: e.target.value })} />

              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={editedJob.location}
                  onChange={(e) => setEditedJob({ ...editedJob, location: e.target.value })} />

              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Job Type</Label>
                <Input
                  id="type"
                  value={editedJob.type}
                  onChange={(e) => setEditedJob({ ...editedJob, type: e.target.value })} />

              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary">Salary Range</Label>
              <Input
                id="salary"
                value={editedJob.salary}
                onChange={(e) => setEditedJob({ ...editedJob, salary: e.target.value })} />

            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                value={editedJob.description}
                onChange={(e) => setEditedJob({ ...editedJob, description: e.target.value })}
                className="min-h-[120px]" />

            </div>
            <div className="space-y-2">
              <Label>Requirements</Label>
              {editedJob.requirements.map((req, idx) =>
              <Input
                key={idx}
                value={req}
                onChange={(e) => {
                  const newReqs = [...editedJob.requirements];
                  newReqs[idx] = e.target.value;
                  setEditedJob({ ...editedJob, requirements: newReqs });
                }}
                className="mb-2" />

              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Persona Dialog */}
      <Dialog open={isEditPersonaOpen} onOpenChange={setIsEditPersonaOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Ideal Persona</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="overview">Overview</Label>
              <Textarea
                id="overview"
                value={editedPersona.overview}
                onChange={(e) => setEditedPersona({ ...editedPersona, overview: e.target.value })}
                className="min-h-[80px]" />
            </div>

            <div className="space-y-2">
              <Label>Key Traits</Label>
              {editedPersona.traits.map((trait, idx) =>
              <div key={idx} className="grid grid-cols-2 gap-2">
                  <Input
                  placeholder="Label"
                  value={trait.label}
                  onChange={(e) => {
                    const newTraits = [...editedPersona.traits];
                    newTraits[idx] = { ...newTraits[idx], label: e.target.value };
                    setEditedPersona({ ...editedPersona, traits: newTraits });
                  }} />
                  <Input
                  placeholder="Value"
                  value={trait.value}
                  onChange={(e) => {
                    const newTraits = [...editedPersona.traits];
                    newTraits[idx] = { ...newTraits[idx], value: e.target.value };
                    setEditedPersona({ ...editedPersona, traits: newTraits });
                  }} />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Key Strengths</Label>
              {editedPersona.strengths.map((strength, idx) =>
              <Input
                key={idx}
                value={strength}
                onChange={(e) => {
                  const newStrengths = [...editedPersona.strengths];
                  newStrengths[idx] = e.target.value;
                  setEditedPersona({ ...editedPersona, strengths: newStrengths });
                }}
                className="mb-2" />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cultureFit">Culture Fit</Label>
              <Textarea
                id="cultureFit"
                value={editedPersona.cultureFit}
                onChange={(e) => setEditedPersona({ ...editedPersona, cultureFit: e.target.value })}
                className="min-h-[80px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelPersona}>
              Cancel
            </Button>
            <Button onClick={handleSavePersona}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>);

}