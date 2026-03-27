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
            size="sm" className="bg-orange-50 text-orange-700 px-2 text-xs font-medium rounded-lg inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-sm hover:text-accent-foreground h-8 border-orange-200 hover:bg-orange-100">
            

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