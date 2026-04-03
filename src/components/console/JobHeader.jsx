import React from "react";
import { MapPin, Clock, Briefcase, MoreHorizontal, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function JobHeader({ onActivityApprovalClick, jobData = {} }) {
  const { name = "Senior Product Designer", candidates = 456 } = jobData;
  return (
    <div className="my-5 px-6">
      <div className="mb-2 pt-2 pb-2 pl-2 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-gray-800 text-xl font-semibold tracking-tight">{name}

            </h1>
            <span className="px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
              Active
            </span>
            <p className="text-[12px] text-gray-500">{candidates} candidates</p>
          </div>













        </div>
        <div className="flex items-center gap-2">
          










          
          

          
        </div>
      </div>
    </div>);

}