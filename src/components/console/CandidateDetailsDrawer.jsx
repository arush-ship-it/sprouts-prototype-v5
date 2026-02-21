import React, { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  X,
  MapPin,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  Calendar,
  FileText,
  TrendingUp,
  Star,
  Send,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  ExternalLink,
  Target,
} from "lucide-react";

export default function CandidateDetailsDrawer({ candidate, isOpen, onClose }) {
  const [emailContent, setEmailContent] = useState("");

  if (!candidate) return null;

  const skillMatchPercentage = candidate.skillsMatch
    ? parseInt(candidate.skillsMatch.split("/")[0]) / parseInt(candidate.skillsMatch.split("/")[1]) * 100
    : 0;
  
  const attributeMatchPercentage = candidate.attributesMatch
    ? parseInt(candidate.attributesMatch.split("/")[0]) / parseInt(candidate.attributesMatch.split("/")[1]) * 100
    : 0;

  // Mock data
  const experiences = [
    {
      title: "Lead Product Designer",
      company: "Stripe",
      duration: "2022 - Present · 2 years",
      description: "Leading design for payment infrastructure products, managing team of 4 designers.",
    },
    {
      title: "Senior Product Designer",
      company: "Airbnb",
      duration: "2020 - 2022 · 2 years",
      description: "Designed core booking experience and search functionality.",
    },
  ];

  const education = [
    {
      degree: "MSc Computer Engineering",
      university: "University of California, Berkeley",
      year: "2018 - 2020",
    },
    {
      degree: "BSc Computer Science",
      university: "Stanford University",
      year: "2014 - 2018",
    },
  ];

  const evaluationScores = [
    { name: "Resume Screening", score: 92, status: "passed", date: "2 days ago" },
    { name: "Technical Assessment", score: 88, status: "passed", date: "1 day ago" },
    { name: "Culture Fit", score: 85, status: "passed", date: "5 hours ago" },
  ];

  const correspondence = [
    {
      type: "email",
      subject: "Interview Invitation - Senior Product Designer",
      date: "2 hours ago",
      status: "sent",
    },
    {
      type: "email",
      subject: "Application Received",
      date: "3 days ago",
      status: "opened",
    },
  ];

  const appliedRoles = [
    { role: "Senior Product Designer", status: "In Progress", date: "3 days ago" },
    { role: "Design Lead", status: "Rejected", date: "2 months ago" },
  ];

  const suggestedMatches = [
    { role: "Product Design Manager", match: 94, reason: "Strong leadership experience" },
    { role: "UX Director", match: 87, reason: "Strategic thinking skills" },
  ];

  const skills = [
    { name: "Figma", match: true },
    { name: "Sketch", match: true },
    { name: "Design Systems", match: true },
    { name: "Prototyping", match: true },
    { name: "User Research", match: true },
    { name: "Adobe XD", match: false },
  ];

  const attributes = [
    { name: "5+ years experience", match: true },
    { name: "SaaS background", match: true },
    { name: "Team management", match: true },
    { name: "Remote work", match: true },
    { name: "Design leadership", match: true },
    { name: "B2B focus", match: false },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[80vw] p-0 overflow-y-auto">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <img
                  src={candidate.avatar}
                  alt={candidate.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-[20px] font-semibold text-gray-900">
                      {candidate.name}
                    </h2>
                    {candidate.starred && (
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    )}
                  </div>
                  <p className="text-[14px] text-gray-600 mb-2">
                    {candidate.title} at {candidate.company}
                  </p>
                  <div className="flex items-center gap-3 text-[12px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {candidate.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      {candidate.experience}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[24px] font-bold text-indigo-600">
                    {candidate.score}
                  </div>
                  <p className="text-[11px] text-gray-500">AI Score</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* AI Fit Analysis */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100">
              <h3 className="text-[12px] font-semibold text-indigo-900 mb-2 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                AI Fit Analysis
              </h3>
              <p className="text-[11px] text-gray-700 leading-relaxed">
                Strong candidate with exceptional design leadership experience at top-tier companies. 
                Skill set aligns perfectly with job requirements, particularly in Figma, design systems, 
                and user research. Educational background from Berkeley demonstrates strong technical foundation. 
                Communication skills and portfolio quality are outstanding.
              </p>
            </div>
          </div>

          {/* Tabs Content */}
          <div className="flex-1 p-6 bg-gray-50">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
                <TabsTrigger value="communication">Communication</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview">
                <div className="grid grid-cols-2 gap-6">
                  {/* Left Column - Resume */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl p-5 border border-gray-200 sticky top-0">
                      <h3 className="text-[15px] font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-indigo-600" />
                        Resume
                      </h3>
                      
                      {/* Resume Content */}
                      <div className="space-y-4 mb-4">
                        {/* Summary */}
                        <div>
                          <h4 className="text-[12px] font-semibold text-gray-900 mb-2">Professional Summary</h4>
                          <p className="text-[11px] text-gray-600 leading-relaxed">
                            Creative and strategic product designer with 6+ years of experience crafting 
                            intuitive user experiences for high-growth tech companies. Proven track record 
                            in leading design teams and shipping products used by millions of users.
                          </p>
                        </div>

                        {/* Key Skills */}
                        <div>
                          <h4 className="text-[12px] font-semibold text-gray-900 mb-2">Key Skills</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {["Figma", "Sketch", "Design Systems", "Prototyping", "User Research", "Adobe Creative Suite", 
                              "Wireframing", "A/B Testing"].map((skill, idx) => (
                              <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-[10px]">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Experience Highlights */}
                        <div>
                          <h4 className="text-[12px] font-semibold text-gray-900 mb-2">Experience Highlights</h4>
                          <div className="space-y-2">
                            <div className="text-[11px]">
                              <p className="font-medium text-gray-900">Lead Product Designer • Stripe</p>
                              <p className="text-gray-500 text-[10px] mb-1">2022 - Present</p>
                              <ul className="list-disc list-inside text-gray-600 space-y-0.5">
                                <li>Led design for payment infrastructure products</li>
                                <li>Managed team of 4 designers</li>
                                <li>Increased user satisfaction by 32%</li>
                              </ul>
                            </div>
                            <div className="text-[11px]">
                              <p className="font-medium text-gray-900">Senior Product Designer • Airbnb</p>
                              <p className="text-gray-500 text-[10px] mb-1">2020 - 2022</p>
                              <ul className="list-disc list-inside text-gray-600 space-y-0.5">
                                <li>Designed core booking experience</li>
                                <li>Improved search functionality</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Education */}
                        <div>
                          <h4 className="text-[12px] font-semibold text-gray-900 mb-2">Education</h4>
                          <div className="space-y-1.5 text-[11px]">
                            <div>
                              <p className="font-medium text-gray-900">MSc Computer Engineering</p>
                              <p className="text-gray-600">UC Berkeley • 2018-2020</p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">BSc Computer Science</p>
                              <p className="text-gray-600">Stanford University • 2014-2018</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button variant="outline" size="sm" className="w-full">
                        <ExternalLink className="w-3.5 h-3.5 mr-2" />
                        View Full Resume PDF
                      </Button>
                    </div>
                  </div>

                  {/* Right Column - Other Details */}
                  <div className="space-y-6">
                    {/* Experience History */}
                    <div className="bg-white rounded-xl p-5 border border-gray-200">
                      <h3 className="text-[15px] font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-indigo-600" />
                        Experience History
                      </h3>
                      <div className="space-y-4">
                        {experiences.map((exp, idx) => (
                          <div key={idx} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                            <h4 className="text-[13px] font-semibold text-gray-900 mb-1">
                              {exp.title}
                            </h4>
                            <p className="text-[12px] text-gray-600 mb-1">{exp.company}</p>
                            <p className="text-[11px] text-gray-500 mb-2">{exp.duration}</p>
                            <p className="text-[11px] text-gray-600">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Education History */}
                    <div className="bg-white rounded-xl p-5 border border-gray-200">
                      <h3 className="text-[15px] font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-indigo-600" />
                        Education History
                      </h3>
                      <div className="space-y-3">
                        {education.map((edu, idx) => (
                          <div key={idx} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                            <h4 className="text-[13px] font-semibold text-gray-900 mb-1">
                              {edu.degree}
                            </h4>
                            <p className="text-[12px] text-gray-600">{edu.university}</p>
                            <p className="text-[11px] text-gray-500">{edu.year}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skill Match */}
                    <div className="bg-white rounded-xl p-5 border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[15px] font-semibold text-gray-900 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-emerald-600" />
                          Skill Match to Job Description
                        </h3>
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          {candidate.skillsMatch}
                        </Badge>
                      </div>
                      <Progress value={skillMatchPercentage} className="h-2 mb-4" />
                      <div className="grid grid-cols-2 gap-2">
                        {skills.map((skill, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center gap-2 p-2 rounded-lg text-[11px] ${
                              skill.match
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-gray-50 text-gray-500"
                            }`}
                          >
                            {skill.match ? (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5" />
                            )}
                            {skill.name}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Attribute Match */}
                    <div className="bg-white rounded-xl p-5 border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[15px] font-semibold text-gray-900 flex items-center gap-2">
                          <Target className="w-4 h-4 text-indigo-600" />
                          Attribute Match
                        </h3>
                        <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200">
                          {candidate.attributesMatch}
                        </Badge>
                      </div>
                      <Progress value={attributeMatchPercentage} className="h-2 mb-4" />
                      <div className="space-y-2">
                        {attributes.map((attr, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center gap-2 p-2 rounded-lg text-[11px] ${
                              attr.match
                                ? "bg-indigo-50 text-indigo-700"
                                : "bg-gray-50 text-gray-500"
                            }`}
                          >
                            {attr.match ? (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5" />
                            )}
                            {attr.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Evaluations Tab */}
              <TabsContent value="evaluations" className="space-y-4">
                {evaluationScores.map((evaluation, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-5 border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-[14px] font-semibold text-gray-900 mb-1">
                          {evaluation.name}
                        </h4>
                        <p className="text-[11px] text-gray-500">{evaluation.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-[20px] font-bold text-emerald-600">
                          {evaluation.score}
                        </div>
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
                          {evaluation.status}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={evaluation.score} className="h-2" />
                  </div>
                ))}
              </TabsContent>

              {/* Communication Tab */}
              <TabsContent value="communication" className="space-y-6">
                {/* Schedule Email */}
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h3 className="text-[15px] font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Send className="w-4 h-4 text-indigo-600" />
                    Send Email
                  </h3>
                  <Textarea
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    placeholder="Compose your email..."
                    className="resize-none text-[12px] mb-3"
                    rows={6}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Send className="w-3.5 h-3.5 mr-1.5" />
                      Send Now
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Calendar className="w-3.5 h-3.5 mr-1.5" />
                      Schedule
                    </Button>
                  </div>
                </div>

                {/* Correspondence History */}
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h3 className="text-[15px] font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-indigo-600" />
                    Correspondence History
                  </h3>
                  <div className="space-y-3">
                    {correspondence.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-gray-500" />
                            <p className="text-[12px] font-medium text-gray-900">
                              {item.subject}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-[9px]">
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.date}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-6">
                {/* Applied Roles */}
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h3 className="text-[15px] font-semibold text-gray-900 mb-4">
                    Applied Roles
                  </h3>
                  <div className="space-y-3">
                    {appliedRoles.map((role, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                      >
                        <div>
                          <p className="text-[12px] font-medium text-gray-900 mb-1">
                            {role.role}
                          </p>
                          <p className="text-[10px] text-gray-500">{role.date}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-[10px] ${
                            role.status === "In Progress"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-red-50 text-red-700 border-red-200"
                          }`}
                        >
                          {role.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggested Role Matches */}
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h3 className="text-[15px] font-semibold text-gray-900 mb-4">
                    Suggested Role Matches
                  </h3>
                  <div className="space-y-3">
                    {suggestedMatches.map((match, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[12px] font-medium text-gray-900">
                            {match.role}
                          </p>
                          <Badge className="bg-indigo-600 text-white text-[10px]">
                            {match.match}% match
                          </Badge>
                        </div>
                        <p className="text-[11px] text-gray-600">{match.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}