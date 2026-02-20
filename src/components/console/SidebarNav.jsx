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
  Bell as BellIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
"@/components/ui/select";

const mainLinks = [
{ label: "Talent", icon: Users, active: false, page: "Console" },
{ label: "Agents", icon: Activity, active: false, page: "Agents" },
{ label: "Inbox", icon: Inbox, active: false, page: "Inbox" },
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
    <aside className="w-[260px] min-h-screen bg-[#0F1117] flex flex-col justify-between py-6 px-4 shrink-0">
      {/* Top: Brand + Job Selector + Main Links */}
      <div>
        <div className="flex items-center gap-2.5 px-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <Terminal className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold text-[15px] tracking-tight">Sprouts AI

          </span>
        </div>

        {/* Job Selector */}
        <div className="px-3 mb-6">
          <Select value={selectedJob} onValueChange={setSelectedJob}>
            <SelectTrigger className="w-full h-9 bg-white/5 border-white/10 text-white text-[12px] hover:bg-white/10">
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
            "bg-white/10 text-white" :
            "text-gray-400 hover:text-white hover:bg-white/[0.05]"}`
            }>

              <link.icon
              className={`w-[18px] h-[18px] transition-colors ${
              activePage === link.page ?
              "text-indigo-400" :
              "text-gray-500 group-hover:text-gray-300"}`
              } />

              {link.label}
            </Link>
          )}
        </nav>
      </div>

      {/* User Info Section */}
      <div className="border-t border-white/[0.06] pt-5 mt-6">
        <div className="flex items-center justify-between px-3 mb-5">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-semibold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">John Doe</p>
              <p className="text-[10px] text-gray-400 truncate">john@company.com</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Link
              to={createPageUrl("Settings")}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              <SettingsIcon className="w-4 h-4" />
            </Link>
            <button className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors relative">
              <BellIcon className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom: Icon-only nav */}
      <div className="pt-3">
        <div className="flex items-center justify-around">
          {bottomLinks.map((link) =>
          <Link
            key={link.label}
            to={createPageUrl(link.page)}
            className={`relative flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-200 group
                ${
            activePage === link.page ?
            "text-indigo-400" :
            "text-gray-500 hover:text-gray-300"}`
            }>

              {activePage === link.page &&
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-400" />
            }
              <link.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium tracking-wide">
                {link.label}
              </span>
            </Link>
          )}
        </div>
      </div>
    </aside>);

}