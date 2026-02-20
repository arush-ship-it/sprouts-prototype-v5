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
      <JobHeader onActivityApprovalClick={() => setIsActivityApprovalOpen(true)} />
      <SubTabs 
        activeTab={activeTab} 
        setActiveTab={handleTabChange}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      
      {/* Pipeline Builder Button - Only show in Pipeline tab */}
      {activeTab === "pipeline" && (
        <div className="px-8 pt-5 pb-3 flex justify-end">
          <Button
            onClick={() => setIsPipelineBuilderOpen(true)}
            size="sm"
            className="h-8 text-[12px] bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
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