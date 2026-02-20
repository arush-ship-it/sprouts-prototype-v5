import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Building, MapPin, DollarSign, Award } from "lucide-react";

export default function JobSidePanel() {
  return (
    <div className="w-[280px] bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* Job Details Section */}
        <div>
          <h3 className="text-[13px] font-semibold text-gray-900 mb-3">Job Details</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Building className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[11px] text-gray-500">Department</p>
                <p className="text-[12px] font-medium text-gray-900">Design</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[11px] text-gray-500">Location</p>
                <p className="text-[12px] font-medium text-gray-900">San Francisco, CA</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <DollarSign className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[11px] text-gray-500">Salary Range</p>
                <p className="text-[12px] font-medium text-gray-900">$120k - $160k</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Award className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[11px] text-gray-500">Experience</p>
                <p className="text-[12px] font-medium text-gray-900">5+ years</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-[13px] font-semibold text-gray-900 mb-3">Timeline</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[11px] text-gray-500">Posted</p>
                <p className="text-[12px] font-medium text-gray-900">5 days ago</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[11px] text-gray-500">Deadline</p>
                <p className="text-[12px] font-medium text-gray-900">15 days left</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hiring Team Section */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-[13px] font-semibold text-gray-900 mb-3">Hiring Team</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="Hiring Manager"
                className="w-7 h-7 rounded-full object-cover"
              />
              <div>
                <p className="text-[12px] font-medium text-gray-900">John Doe</p>
                <p className="text-[11px] text-gray-500">Hiring Manager</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                alt="Recruiter"
                className="w-7 h-7 rounded-full object-cover"
              />
              <div>
                <p className="text-[12px] font-medium text-gray-900">Jane Smith</p>
                <p className="text-[11px] text-gray-500">Recruiter</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-[13px] font-semibold text-gray-900 mb-3">Stats</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-gray-500">Total Candidates</span>
              <Badge variant="secondary" className="text-[11px] font-semibold">156</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-gray-500">In Review</span>
              <Badge variant="secondary" className="text-[11px] font-semibold">24</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-gray-500">Interviewed</span>
              <Badge variant="secondary" className="text-[11px] font-semibold">8</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-gray-500">Offers</span>
              <Badge variant="secondary" className="text-[11px] font-semibold">2</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}