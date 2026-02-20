import React, { useState } from "react";
import JobHeader from "@/components/console/JobHeader";
import SubTabs from "@/components/console/SubTabs";
import CandidateList from "@/components/console/CandidateList";
import PipelineView from "@/components/console/PipelineView";
import PipelineBuilderModal from "@/components/console/PipelineBuilderModal";
import ActivityApprovalModal from "@/components/console/ActivityApprovalModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Workflow, AlertCircle } from "lucide-react";

export default function Console() {
  const [activeTab, setActiveTab] = useState("review");
  const [viewMode, setViewMode] = useState(activeTab === "pipeline" ? "pipeline" : "card");
  const [isPipelineBuilderOpen, setIsPipelineBuilderOpen] = useState(false);
  const [isActivityApprovalOpen, setIsActivityApprovalOpen] = useState(false);

  // Update view mode when tab changes
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    // Set default view for each tab
    setViewMode(newTab === "pipeline" ? "pipeline" : "card");
  };

  return (
    <div className="flex-1 min-h-screen bg-[#FAFAFA] overflow-auto">
      <JobHeader />
      <div className="relative">
        <SubTabs 
          activeTab={activeTab} 
          setActiveTab={handleTabChange}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        {/* Activity Approval Button */}
        <div className="absolute top-0 right-8 h-full flex items-center">
          <Button
            onClick={() => setIsActivityApprovalOpen(true)}
            variant="outline"
            size="sm"
            className="h-8 text-[12px] border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-700"
          >
            <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
            Activity Approval
            <Badge className="ml-2 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-orange-600">
              2
            </Badge>
          </Button>
        </div>
      </div>
      
      {/* Pipeline Builder Button - Only show in Pipeline tab */}
      {activeTab === "pipeline" && (
        <div className="px-8 pt-5 pb-3">
          <Button
            onClick={() => setIsPipelineBuilderOpen(true)}
            size="sm"
            className="h-8 text-[12px] bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
          >
            <Workflow className="w-3.5 h-3.5 mr-1.5" />
            Build Pipeline
          </Button>
        </div>
      )}

      {activeTab === "review" ? (
        <CandidateList activeTab={activeTab} viewMode={viewMode} />
      ) : (
        viewMode === "pipeline" ? (
          <PipelineView />
        ) : (
          <CandidateList activeTab={activeTab} viewMode={viewMode} />
        )
      )}

      <PipelineBuilderModal
        isOpen={isPipelineBuilderOpen}
        onClose={() => setIsPipelineBuilderOpen(false)}
      />
      <ActivityApprovalModal
        isOpen={isActivityApprovalOpen}
        onClose={() => setIsActivityApprovalOpen(false)}
      />
    </div>
  );
}