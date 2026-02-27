import React, { useState } from "react";
import { Send, Sparkles, Briefcase, MapPin, DollarSign, Clock, Bell, Settings, User, CheckCircle2, Circle, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TabSwitcher from "@/components/shared/TabSwitcher";
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
  { number: 1, label: "AI Generation", description: "Generate job description" },
  { number: 2, label: "Job Details", description: "Add company & job info" },
  { number: 3, label: "Publish", description: "Post your job" }];


  return (
    <div className="flex flex-col h-screen bg-[#FAFAFA]">
      {/* Top Navigation */}
      



















      <div className="flex flex-1 overflow-hidden flex-col">
        {/* Header */}
        <div className="bg-slate-50 px-8 py-4">
          <div className="flex items-center gap-2">
            <Link to={createPageUrl("Home")}>
              <ChevronLeft className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900" />
            </Link>
            <h1 className="text-gray-700 text-2xl font-semibold">Create Job</h1>
          </div>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - AI Chat */}
        <div className="bg-white px-1 rounded-2xl w-[420px] border-r border-gray-200 flex flex-col">
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
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="bg-slate-400 rounded-3xl w-8 h-8 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-[16px] font-semibold text-gray-900">
                AI Job Builder
              </h2>
            </div>
            <p className="text-[12px] text-gray-500">
              Tell me about the position and I'll create a compelling job posting
            </p>
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
        <div className="flex-1 overflow-y-auto">
          <div className="px-8 py-4 w-full">
            {/* Header with Back Button */}
            





            
            {/* Step 1: AI Generation - Preview */}
            {currentStep === 1 &&
              <div className="space-y-6 max-w-6xl mx-auto">
                <div className="bg-slate-50 px-8 rounded-2xl shadow-sm">
                  <div className="mb-6 pb-6 border-b border-gray-200">
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

                <div className="flex justify-end">
                  <Button onClick={() => setCurrentStep(2)} className="bg-indigo-600 hover:bg-indigo-700">
                    Continue to Job Details
                  </Button>
                </div>
              </div>
              }

            {/* Step 2: Job Details */}
            {currentStep === 2 &&
              <div className="space-y-6 max-w-6xl mx-auto">
              <div>
                <h2 className="text-[20px] font-semibold text-gray-900 mb-2">Job Details</h2>
                <p className="text-[13px] text-gray-500">Fill in the company and job information</p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-[13px] font-medium">Company Name</Label>
                    <Input
                        id="companyName"
                        value={jobDetails.companyName}
                        onChange={(e) => setJobDetails({ ...jobDetails, companyName: e.target.value })}
                        placeholder="Enter company name" />

                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle" className="text-[13px] font-medium">Job Title <span className="text-red-500">*</span></Label>
                    <Input
                        id="jobTitle"
                        value={jobDetails.jobTitle}
                        onChange={(e) => setJobDetails({ ...jobDetails, jobTitle: e.target.value })}
                        placeholder="Enter job title" />

                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jobType" className="text-[13px] font-medium">Job Type</Label>
                    <Select value={jobDetails.jobType} onValueChange={(val) => setJobDetails({ ...jobDetails, jobType: val })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="workplaceType" className="text-[13px] font-medium">Workplace Type</Label>
                    <Select value={jobDetails.workplaceType} onValueChange={(val) => setJobDetails({ ...jobDetails, workplaceType: val })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select workplace type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="onsite">On-site</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-[13px] font-medium">Department</Label>
                    <Input
                        id="department"
                        value={jobDetails.department}
                        onChange={(e) => setJobDetails({ ...jobDetails, department: e.target.value })}
                        placeholder="e.g. Engineering, Design" />

                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-[13px] font-medium">Location</Label>
                    <Input
                        id="location"
                        value={jobDetails.location}
                        onChange={(e) => setJobDetails({ ...jobDetails, location: e.target.value })}
                        placeholder="e.g. San Francisco, CA" />

                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="internalJobTitle" className="text-[13px] font-medium">Internal Job Title</Label>
                    <Input
                        id="internalJobTitle"
                        value={jobDetails.internalJobTitle}
                        onChange={(e) => setJobDetails({ ...jobDetails, internalJobTitle: e.target.value })}
                        placeholder="Internal reference" />

                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="headcount" className="text-[13px] font-medium">Headcount</Label>
                    <Input
                        id="headcount"
                        type="number"
                        value={jobDetails.headcount}
                        onChange={(e) => setJobDetails({ ...jobDetails, headcount: e.target.value })}
                        placeholder="Number of positions" />

                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jobGrade" className="text-[13px] font-medium">Job Grade</Label>
                    <Input
                        id="jobGrade"
                        value={jobDetails.jobGrade}
                        onChange={(e) => setJobDetails({ ...jobDetails, jobGrade: e.target.value })}
                        placeholder="e.g. L4, Senior" />

                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salary" className="text-[13px] font-medium">Salary Range</Label>
                    <Input
                        id="salary"
                        value={jobDetails.salary}
                        onChange={(e) => setJobDetails({ ...jobDetails, salary: e.target.value })}
                        placeholder="e.g. $120k - $180k" />

                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benefits" className="text-[13px] font-medium">Benefits</Label>
                  <Textarea
                      id="benefits"
                      value={jobDetails.benefits}
                      onChange={(e) => setJobDetails({ ...jobDetails, benefits: e.target.value })}
                      placeholder="Describe benefits and perks..."
                      rows={3} />

                </div>

                <div className="space-y-2">
                  <Label htmlFor="screeningQuestions" className="text-[13px] font-medium">Screening Questions</Label>
                  <Textarea
                      id="screeningQuestions"
                      value={jobDetails.screeningQuestions}
                      onChange={(e) => setJobDetails({ ...jobDetails, screeningQuestions: e.target.value })}
                      placeholder="Add questions for candidates..."
                      rows={3} />

                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Back
                </Button>
                <Button onClick={() => setCurrentStep(3)} className="bg-indigo-600 hover:bg-indigo-700">
                  Continue to Publish
                </Button>
              </div>
            </div>
              }

            {/* Step 3: Publish */}
            {currentStep === 3 &&
              <div className="space-y-6 max-w-6xl mx-auto">
              <div>
                <h2 className="text-[20px] font-semibold text-gray-900 mb-2">Publish Job</h2>
                <p className="text-[13px] text-gray-500">Choose where and how to publish your job</p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
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

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  Back
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Sparkles className="w-4 h-4 mr-2" />
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