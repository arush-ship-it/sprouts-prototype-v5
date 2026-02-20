import React, { useState } from "react";
import { Send, Sparkles, Briefcase, MapPin, DollarSign, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function CreateJob() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'll help you create a job posting. What position are you hiring for?",
    },
  ]);
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
      "Excellent communication and collaboration skills",
    ],
    responsibilities: [
      "Lead design projects from concept to launch",
      "Create wireframes, prototypes, and high-fidelity designs",
      "Conduct user research and usability testing",
      "Collaborate with product and engineering teams",
      "Contribute to and maintain design system",
    ],
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
          content: "Great! I've updated the job posting based on your input.",
        },
      ]);
    }, 500);
  };

  return (
    <div className="flex h-screen bg-[#FAFAFA]">
      {/* Left Panel - AI Chat */}
      <div className="w-[420px] border-r border-gray-200 bg-white flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
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
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] ${
                  msg.role === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Describe the role, requirements, or make changes..."
              className="resize-none text-[13px]"
              rows={3}
            />
            <Button onClick={handleSend} size="icon" className="shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Panel - Generated Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-[24px] font-semibold text-gray-900">
              Job Preview
            </h1>
            <Button>
              <Sparkles className="w-4 h-4 mr-2" />
              Publish Job
            </Button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            {/* Job Header */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h2 className="text-[28px] font-bold text-gray-900 mb-3">
                {generatedJob.title}
              </h2>
              <div className="flex flex-wrap gap-4 text-[14px] text-gray-600">
                <span className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  {generatedJob.department}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {generatedJob.location}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {generatedJob.type}
                </span>
                <span className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  {generatedJob.salary}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-[18px] font-semibold text-gray-900 mb-3">
                About the Role
              </h3>
              <p className="text-[14px] text-gray-700 leading-relaxed">
                {generatedJob.description}
              </p>
            </div>

            {/* Requirements */}
            <div className="mb-6">
              <h3 className="text-[18px] font-semibold text-gray-900 mb-3">
                Requirements
              </h3>
              <ul className="space-y-2">
                {generatedJob.requirements.map((req, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-[14px] text-gray-700"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Responsibilities */}
            <div>
              <h3 className="text-[18px] font-semibold text-gray-900 mb-3">
                Responsibilities
              </h3>
              <ul className="space-y-2">
                {generatedJob.responsibilities.map((resp, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-[14px] text-gray-700"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}