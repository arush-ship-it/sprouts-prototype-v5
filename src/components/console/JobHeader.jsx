import React from "react";
import { MapPin, Clock, Briefcase, MoreHorizontal, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function JobHeader({ onActivityApprovalClick }) {
  return (
    <div className="my-5 px-6">
      <div className="pt-3 pl-2 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-gray-800 text-xl font-semibold tracking-tight">Senior Product Designer

            </h1>
            <span className="px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
              Active
            </span>
            <p className="text-[12px] text-gray-500">456 candidates</p>
          </div>













        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={onActivityApprovalClick}
            variant="outline"
            size="sm"
            className="h-8 text-[12px] border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-700">

            <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
            Activity Approval
            <Badge className="ml-2 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-orange-600">
              2
            </Badge>
          </Button>
          

          
        </div>
      </div>
    </div>);

}