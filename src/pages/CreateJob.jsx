import React, { useState } from "react";
import { Send, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import JobDetailsForm from "@/components/createjob/JobDetailsForm";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function CreateJob() {
  const [currentStep, setCurrentStep] = useState(1);
  const [messages, setMessages] = useState([
  {
    role: "assistant",
    content: "Hi! I'll help you create a job posting. What position are you hiring for?"
  }]
  );
  const [input, setInput] = useState("");
  const [generatedJob, setGeneratedJob] = useState({
    title: "Senior Product Designer",
    department: "Design",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $180k",
    description:
    "We're looking for a talented Senior Product Designer to join our team and help shape the future of our products. You'll work closely with cross-functional teams to create intuitive, user-centered designs that solve real problems for our users.",
    requirements: [
    "5+ years of product design experience",
    "Strong portfolio showcasing UX/UI work",
    "Proficiency in Figma and design systems",
    "Experience with user research and testing",
    "Excellent communication and collaboration skills"],

    responsibilities: [
    "Lead design projects from concept to launch",
    "Create wireframes, prototypes, and high-fidelity designs",
    "Conduct user research and usability testing",
    "Collaborate with product and engineering teams",
    "Contribute to and maintain design system"]

  });

  const [jobDetails, setJobDetails] = useState({
    companyName: "",
    jobTitle: "",
    jobType: "",
    workplaceType: "",
    department: "",
    location: "",
    internalJobTitle: "",
    headcount: "",
    jobGrade: "",
    salary: "",
    benefits: "",
    screeningQuestions: ""
  });

  const [publishSettings, setPublishSettings] = useState({
    visibility: "public",
    duration: "30",
    platforms: []
  });

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "Great! I've updated the job posting based on your input."
      }]
      );
    }, 500);
  };

  const steps = [
  { number: 1, label: "Job Details", description: "Add company & job info" },
  { number: 2, label: "AI Generation", description: "Generate job description" },
  { number: 3, label: "Publish", description: "Post your job" }];


  return (
    <div className="flex flex-col h-screen bg-[#FAFAFA]">
      {/* Top Navigation */}
      



















      <div className="flex flex-1 overflow-hidden flex-col">
        {/* Header */}
        







        
        <div className="flex flex-1 overflow-hidden px-4 py-4 gap-4">
        {/* Left Panel - AI Chat */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm w-[380px] shrink-0 flex flex-col overflow-hidden">
          <div className="pt-5 pr-3 pb-4 pl-3 border-b border-gray-200">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="bg-slate-400 rounded-3xl w-8 h-8 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-[16px] font-semibold text-gray-900">
                AI Job Builder
              </h2>
            </div>
            


          </div>
          {/* Progress Bar - Integrated into left panel */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between gap-2">
              {steps.map((step, idx) =>
                <React.Fragment key={step.number}>
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    currentStep > step.number ? "bg-emerald-500" :
                    currentStep === step.number ? "bg-indigo-600" : "bg-gray-200"}`
                    }>
                      {currentStep > step.number ?
                      <CheckCircle2 className="w-4 h-4 text-white" /> :

                      <span className={`text-[12px] font-semibold ${
                      currentStep === step.number ? "text-white" : "text-gray-500"}`
                      }>{step.number}</span>
                      }
                    </div>
                    <div className="min-w-0">
                      <p className={`text-[11px] font-semibold truncate ${
                      currentStep >= step.number ? "text-gray-900" : "text-gray-400"}`
                      }>{step.label}</p>
                    </div>
                  </div>
                  




                </React.Fragment>
                )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, idx) =>
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] ${
                  msg.role === "user" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-900"}`
                  }>
                  {msg.content}
                </div>
              </div>
              )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="relative">
              <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Describe the role, requirements, or make changes..." className="bg-transparent text-[13px] pr-12 px-3 py-2 rounded-2xl flex min-h-[60px] w-full border border-input shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"

                  rows={3} />
              <Button
                  onClick={handleSend}
                  size="icon" className="bg-blue-600 text-primary-foreground text-sm font-medium rounded-[20px] inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow hover:bg-primary/90 absolute right-2 bottom-2 h-8 w-8">

                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel - Step Content */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="h-full flex flex-col">
            {/* Header with Back Button */}
            





            
            {/* Step 2: AI Generation - Preview */}
            {currentStep === 2 &&
              <div className="flex flex-col h-full">
              <div className="px-6 pt-5 pb-4 border-b border-gray-100 shrink-0">
                <h2 className="text-[16px] font-semibold text-gray-900">AI Generated Preview</h2>
                <p className="text-[12px] text-gray-400 mt-0.5">Review and refine the generated job posting</p>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              <div className="mx-auto space-y-6 max-w-3xl">
                <div className="bg-slate-50 px-3 rounded-2xl shadow-sm">
                  <div className="mb-6 border-b border-gray-200">
                    <h2 className="text-gray-900 mb-3 text-base font-semibold">{generatedJob.title}</h2>
                    

















                  </div>

                  <div className="mb-6">
                    <h3 className="text-[18px] font-semibold text-gray-900 mb-3">About the Role</h3>
                    <p className="text-[14px] text-gray-700 leading-relaxed">{generatedJob.description}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-[18px] font-semibold text-gray-900 mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {generatedJob.requirements.map((req, idx) =>
                      <li key={idx} className="flex items-start gap-3 text-[14px] text-gray-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                          {req}
                        </li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-[18px] font-semibold text-gray-900 mb-3">Responsibilities</h3>
                    <ul className="space-y-2">
                      {generatedJob.responsibilities.map((resp, idx) =>
                      <li key={idx} className="flex items-start gap-3 text-[14px] text-gray-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                          {resp}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

              </div>
              </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-100 shrink-0 flex justify-end">
                <Button onClick={() => setCurrentStep(3)} className="bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] px-5">
                  Continue to Publish
                </Button>
              </div>
              </div>
              }

            {/* Step 1: Job Details */}
            {currentStep === 1 &&
              <JobDetailsForm
                jobDetails={jobDetails}
                setJobDetails={setJobDetails}
                onContinue={() => setCurrentStep(2)}
              />
            }

            {/* Step 3: Publish */}
            {currentStep === 3 &&
              <div className="flex flex-col h-full">
              <div className="px-6 pt-5 pb-4 border-b border-gray-100 shrink-0">
                <h2 className="text-[16px] font-semibold text-gray-900">Publish Job</h2>
                <p className="text-[12px] text-gray-400 mt-0.5">Choose where and how to post your job</p>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="space-y-6 max-w-2xl">
              <div className="bg-gray-50 rounded-2xl p-5 space-y-6">
                <div className="space-y-4">
                  <Label className="text-[13px] font-medium">Visibility</Label>
                  <div className="flex gap-3">
                    <button
                        onClick={() => setPublishSettings({ ...publishSettings, visibility: "public" })}
                        className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                        publishSettings.visibility === "public" ?
                        "border-indigo-600 bg-indigo-50" :
                        "border-gray-200 hover:border-gray-300"}`
                        }>
                      <p className="font-semibold text-[14px] text-gray-900 mb-1">Public</p>
                      <p className="text-[12px] text-gray-500">Visible to everyone</p>
                    </button>
                    <button
                        onClick={() => setPublishSettings({ ...publishSettings, visibility: "private" })}
                        className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                        publishSettings.visibility === "private" ?
                        "border-indigo-600 bg-indigo-50" :
                        "border-gray-200 hover:border-gray-300"}`
                        }>
                      <p className="font-semibold text-[14px] text-gray-900 mb-1">Private</p>
                      <p className="text-[12px] text-gray-500">Only visible to invited candidates</p>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-[13px] font-medium">Duration (days)</Label>
                  <Select value={publishSettings.duration} onValueChange={(val) => setPublishSettings({ ...publishSettings, duration: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-[13px] font-medium">Post to Platforms</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {["LinkedIn", "Indeed", "Glassdoor", "Company Website"].map((platform) =>
                      <button
                        key={platform}
                        onClick={() => {
                          const platforms = publishSettings.platforms.includes(platform) ?
                          publishSettings.platforms.filter((p) => p !== platform) :
                          [...publishSettings.platforms, platform];
                          setPublishSettings({ ...publishSettings, platforms });
                        }}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                        publishSettings.platforms.includes(platform) ?
                        "border-indigo-600 bg-indigo-50" :
                        "border-gray-200 hover:border-gray-300"}`
                        }>
                        <p className="font-semibold text-[14px] text-gray-900">{platform}</p>
                      </button>
                      )}
                  </div>
                </div>
              </div>

              </div>
              </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-100 shrink-0 flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>Back</Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-[13px] px-5">
                  <Sparkles className="w-4 h-4" />
                  Publish Job
                </Button>
              </div>
            </div>
              }

          </div>
        </div>
        </div>
      </div>
    </div>);

}