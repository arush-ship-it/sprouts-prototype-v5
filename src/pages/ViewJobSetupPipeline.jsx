import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import RecommendedPipeline from "@/components/console/RecommendedPipeline";
import { createPageUrl } from "@/utils";

export default function ViewJobSetupPipeline() {
  const [showPipelineModal, setShowPipelineModal] = useState(false);

  // Extract job ID from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const jobId = urlParams.get("jobId") || "senior-product-designer";
  const jobTitle = urlParams.get("jobTitle") || "Senior Product Designer";

  const handleUsePipeline = (selectedPipeline) => {
    console.log("Using pipeline:", selectedPipeline);
    setShowPipelineModal(false);
    // Navigate to job details or console
    window.location.href = createPageUrl("Console");
  };

  return (
    <div className="flex h-[calc(100vh-48px)] bg-[#F2F3F5]">
      {/* Left Sidebar */}
      <div className="w-40 bg-white border-r border-gray-200 p-4 flex flex-col">
        <Button
          variant="ghost"
          size="sm"
          className="justify-start mb-6"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="space-y-2 text-sm">
          <div className="px-3 py-2 rounded-lg bg-gray-100 font-medium text-gray-900">
            Job Details
          </div>
          <div className="px-3 py-2 text-gray-600">Pipeline Setup</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold text-gray-900">{jobTitle}</h1>
            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
              ACTIVE
            </span>
          </div>
          <p className="text-gray-600">456 candidates</p>
        </div>

        {/* Pipeline Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Recommended Pipeline</h2>

          {showPipelineModal ? (
            <RecommendedPipeline
              onClose={() => setShowPipelineModal(false)}
              onUsePipeline={handleUsePipeline}
            />
          ) : (
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setShowPipelineModal(true)}
            >
              Setup Pipeline
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}