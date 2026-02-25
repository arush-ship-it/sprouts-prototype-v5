import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Users,
  FileText,
  TrendingUp,
  Inbox,
  FileCheck,
  PieChart,
  Bell,
  Settings,
  BarChart3,
  Briefcase,
  PlusCircle,
  UserSquare2,
  ExternalLink } from
"lucide-react";
import { Button } from "@/components/ui/button";
import TabSwitcher from "@/components/shared/TabSwitcher";

export default function Home() {
  const stats = [
  {
    icon: Users,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
    title: "Applicants per Job Posting",
    value: "45.2",
    subtitle: "Average per posting"
  },
  {
    icon: FileText,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-50",
    title: "JD Processed This Month",
    value: "23",
    subtitle: "+12% from last month",
    trend: true
  },
  {
    icon: TrendingUp,
    iconColor: "text-green-500",
    iconBg: "bg-green-50",
    title: "Candidates in Pipeline",
    value: "342",
    subtitle: "Across all jobs"
  },
  {
    icon: Inbox,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    title: "New Applications",
    value: "28",
    subtitle: "To be reviewed"
  },
  {
    icon: FileCheck,
    iconColor: "text-pink-500",
    iconBg: "bg-pink-50",
    title: "Resumes Processed This Month",
    value: "156",
    subtitle: "+38% from last month",
    trend: true
  },
  {
    icon: PieChart,
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-50",
    title: "Application Source Breakdown",
    value: "Direct: 45%",
    subtitle: "LinkedIn: 35%, Others: 20%"
  }];


  const jobs = [
  {
    id: 1,
    title: "Senior Product Designer",
    department: "Design",
    applicants: 156,
    inPipeline: 34,
    status: "ACTIVE"
  },
  {
    id: 2,
    title: "Frontend Engineer",
    department: "Engineering",
    applicants: 203,
    inPipeline: 45,
    status: "ACTIVE"
  },
  {
    id: 3,
    title: "Product Manager",
    department: "Product",
    applicants: 89,
    inPipeline: 12,
    status: "ACTIVE"
  }];


  const recentActivity = [
  {
    id: 1,
    text: "3 candidates moved to interview stage",
    time: "1 hour ago"
  },
  {
    id: 2,
    text: "Resume screening completed for 12 applicants",
    time: "3 hours ago"
  },
  {
    id: 3,
    text: "5 candidates auto-qualified for screening",
    time: "6 hours ago"
  }];


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200">
        


      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-slate-700 text-3xl font-semibold">Hello Arush, Welcome Back!

            </h1>
            <Bell className="text-gray-700 lucide lucide-bell w-5 h-5 cursor-pointer hover:text-gray-600" />
            <Link to={createPageUrl("Settings")}>
              <Settings className="text-gray-700 lucide lucide-settings w-5 h-5 cursor-pointer hover:text-gray-600" />
            </Link>
          </div>
          <div className="my-1 flex items-center gap-2">
            <Link to={createPageUrl("Dashboard")}>
              <Button variant="outline" size="sm" className="gap-2 h-12 px-5 border-0">
                <BarChart3 className="w-5 h-5" />
                Analytics
              </Button>
            </Link>
            <Link to={createPageUrl("Console")}>
              <Button variant="outline" size="sm" className="gap-2 h-12 px-5 border-0">
                <Briefcase className="w-5 h-5" />
                Console
              </Button>
            </Link>
            <Link to={createPageUrl("CreateJob")}>
              <Button variant="outline" size="sm" className="gap-2 h-12 px-5 border-0">
                <PlusCircle className="w-5 h-5" />
                Create Job
              </Button>
            </Link>
            <Link to={createPageUrl("TalentPool")}>
              <Button variant="outline" size="sm" className="gap-2 h-12 px-5 border-0">
                <UserSquare2 className="w-5 h-5" />
                Talent Pool
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) =>
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3">
                <div className="bg-blue-50 p-2 rounded-[10px] flex-shrink-0">
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-500 mb-1 text-xs">{stat.title}</p>
                  <h3 className="text-gray-900 mb-1 text-2xl font-bold">{stat.value}</h3>
                  <p className="text-[12px] text-gray-400">{stat.subtitle}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* All Jobs */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-[18px] font-bold text-gray-900 mb-6">All Jobs</h2>
            <div className="space-y-4">
              {jobs.map((job) =>
              <div key={job.id} className="bg-[#ffffff] p-4 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-100 rounded-lg w-10 h-10 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <Link to={createPageUrl("Console") + `?jobId=${job.id}`}>
                        <h3 className="text-[15px] font-semibold text-gray-900 cursor-pointer hover:text-blue-600">{job.title}</h3>
                      </Link>
                      <p className="text-[12px] text-gray-500">{job.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-gray-900 text-base font-semibold">{job.applicants}</p>
                      <p className="text-[11px] text-gray-500">Applicants</p>
                    </div>
                    <div className="text-center">
                      <p className="text-blue-600 text-base font-semibold">{job.inPipeline}</p>
                      <p className="text-[11px] text-gray-500">In Pipeline</p>
                    </div>
                    <div className="px-3 py-1 bg-green-100 text-green-700 text-[11px] font-semibold rounded-md">
                      {job.status}
                    </div>
                    <Link to={createPageUrl("Console") + `?jobId=${job.id}`}>
                      
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-[18px] font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) =>
              <div key={activity.id} className="flex items-start gap-4">
                  <div className="bg-slate-200 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[14px] font-bold">✓</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] text-gray-900 font-medium">{activity.text}</p>
                    <p className="text-[12px] text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>);

}