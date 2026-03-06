import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Users,
  Activity,
  SlidersHorizontal,
  Inbox,
  FileText,
  LayoutDashboard,
  FolderOpen,
  PlusCircle,
  Terminal,
  Settings as SettingsIcon,
  Bell as BellIcon } from
"lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
"@/components/ui/select";

const mainLinks = [
{ label: "Activity", icon: Activity, active: false, page: "Activity" },
{ label: "Talent", icon: Users, active: false, page: "Console" },
{ label: "Intelligence", icon: Activity, active: false, page: "Agents" },
{ label: "Inbox", icon: Inbox, active: false, page: "Inbox", unreadCount: 4 },
{ label: "Job Details", icon: FileText, active: false, page: "JobDetails" }];


const bottomLinks = [
{ label: "Dashboard", icon: LayoutDashboard, page: "Dashboard" },
{ label: "Talent Pool", icon: FolderOpen, page: "TalentPool" },
{ label: "Create Job", icon: PlusCircle, page: "CreateJob" },
{ label: "Console", icon: Terminal, page: "Console" }];


const jobs = [
{ id: 1, title: "Senior Product Designer", status: "Active" },
{ id: 2, title: "Frontend Engineer", status: "Active" },
{ id: 3, title: "Product Manager", status: "Active" },
{ id: 4, title: "Data Scientist", status: "Draft" }];


export default function SidebarNav({ activePage = "Console" }) {
  const [selectedJob, setSelectedJob] = useState("1");

  return (
    <aside className="bg-[#E5E7EB] mt-3 mr-3 mb-3 ml-3 pr-3 pl-3 rounded-xl w-[221px] flex flex-col fixed left-0 top-12 bottom-0 shrink-0 border-r border-gray-200 overflow-hidden">
      {/* Top: Brand + Job Selector + Main Links */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center gap-2.5 px-3 mb-6">
          


          




        </div>

        {/* Job Selector */}
        <div className="mb-6">
          <Select value={selectedJob} onValueChange={setSelectedJob}>
            <SelectTrigger className="bg-white text-[12px] px-3 py-2 rounded-[10px] flex items-center justify-between whitespace-nowrap border shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-full h-9 border-gray-200 hover:bg-gray-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {jobs.map((job) =>
              <SelectItem key={job.id} value={job.id.toString()} className="text-[12px]">
                  <div className="flex items-center justify-between w-full gap-2">
                    <span className="truncate">{job.title}</span>
                    <span className={`px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider rounded ${
                  job.status === "Active" ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-500/20 text-gray-400"}`
                  }>
                      {job.status}
                    </span>
                  </div>
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <nav className="flex flex-col gap-1">
          {mainLinks.map((link) =>
          <Link
            key={link.label}
            to={createPageUrl(link.page)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-all duration-200 group
                ${
            activePage === link.page ?
            "bg-indigo-100 text-indigo-900" :
            "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`
            }>

              <link.icon
              className={`w-[18px] h-[18px] transition-colors ${
              activePage === link.page ?
              "text-indigo-600" :
              "text-gray-500 group-hover:text-gray-700"}`
              } />

              {link.label}
            </Link>
          )}
        </nav>
      </div>

      {/* User Info Section */}
      

























      {/* Bottom: Icon-only nav */}
      























    </aside>);

}