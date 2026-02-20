import React, { useState } from "react";
import { MapPin, Clock, Briefcase, MoreHorizontal, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const jobs = [
  { id: 1, title: "Senior Product Designer", department: "Design", location: "San Francisco, CA", status: "Active", posted: "5 days ago" },
  { id: 2, title: "Frontend Engineer", department: "Engineering", location: "Remote", status: "Active", posted: "3 days ago" },
  { id: 3, title: "Product Manager", department: "Product", location: "New York, NY", status: "Active", posted: "1 week ago" },
  { id: 4, title: "Data Scientist", department: "Analytics", location: "Austin, TX", status: "Draft", posted: "2 weeks ago" },
];

export default function JobHeader() {
  const [selectedJob, setSelectedJob] = useState("1");
  const currentJob = jobs.find(j => j.id.toString() === selectedJob) || jobs[0];

  return (
    <div className="px-8 pt-8 pb-0">
      {/* Job Selector */}
      <div className="mb-4">
        <Select value={selectedJob} onValueChange={setSelectedJob}>
          <SelectTrigger className="w-[400px] h-10 text-[13px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {jobs.map((job) => (
              <SelectItem key={job.id} value={job.id.toString()} className="text-[13px]">
                <div className="flex items-center justify-between w-full gap-3">
                  <span className="font-medium">{job.title}</span>
                  <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full ${
                    job.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-gray-50 text-gray-600"
                  }`}>
                    {job.status}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-[22px] font-semibold text-gray-900 tracking-tight">
              {currentJob.title}
            </h1>
            <span className={`px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider rounded-full ${
              currentJob.status === "Active" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-gray-50 text-gray-600 border border-gray-200"
            }`}>
              {currentJob.status}
            </span>
          </div>
          <div className="flex items-center gap-5 mt-2.5 text-[13px] text-gray-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              {currentJob.department}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {currentJob.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Posted {currentJob.posted}
            </span>
          </div>
        </div>
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}