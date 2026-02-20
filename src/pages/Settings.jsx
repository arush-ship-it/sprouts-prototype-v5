import React, { useState } from "react";
import { User, Lock, Bell, Plug, Sliders, Building2, Users, CheckCircle, Briefcase, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";

const settingsCategories = [
  { id: "account", label: "Account Info", icon: User },
  { id: "password", label: "Change Password", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "control", label: "Control Panel", icon: Sliders },
  { id: "agency", label: "Agency", icon: Building2 },
  { id: "referrals", label: "Referrals", icon: Users },
  { id: "approvals", label: "Approvals", icon: CheckCircle },
  { id: "jobBoards", label: "Job Boards", icon: Briefcase },
  { id: "emailSettings", label: "Email Settings", icon: Mail },
  { id: "templates", label: "Templates", icon: FileText },
];

export default function Settings() {
  const [activeCategory, setActiveCategory] = useState("account");

  return (
    <div className="flex h-screen bg-[#FAFAFA]">
      {/* Left Panel */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-[18px] font-semibold text-gray-900">Settings</h2>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {settingsCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.label}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Right Panel - Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-4xl">
          {activeCategory === "account" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-[24px] font-semibold text-gray-900 mb-2">Account Information</h1>
                <p className="text-[14px] text-gray-600">Manage your account details and preferences</p>
              </div>

              <Card className="p-6 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" defaultValue="Acme Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="Admin" disabled />
                </div>
                <Button>Save Changes</Button>
              </Card>
            </div>
          )}

          {activeCategory === "password" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-[24px] font-semibold text-gray-900 mb-2">Change Password</h1>
                <p className="text-[14px] text-gray-600">Update your password to keep your account secure</p>
              </div>

              <Card className="p-6 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button>Update Password</Button>
              </Card>
            </div>
          )}

          {activeCategory === "notifications" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-[24px] font-semibold text-gray-900 mb-2">Notifications</h1>
                <p className="text-[14px] text-gray-600">Manage how you receive notifications</p>
              </div>

              <Card className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[14px] font-medium text-gray-900">Email Notifications</p>
                    <p className="text-[12px] text-gray-500">Receive notifications via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[14px] font-medium text-gray-900">New Candidates</p>
                    <p className="text-[12px] text-gray-500">Get notified when new candidates apply</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[14px] font-medium text-gray-900">Agent Activity</p>
                    <p className="text-[12px] text-gray-500">Updates about agent performance</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[14px] font-medium text-gray-900">Weekly Reports</p>
                    <p className="text-[12px] text-gray-500">Receive weekly summary reports</p>
                  </div>
                  <Switch />
                </div>
              </Card>
            </div>
          )}

          {activeCategory === "integrations" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-[24px] font-semibold text-gray-900 mb-2">Integrations</h1>
                <p className="text-[14px] text-gray-600">Connect your favorite tools and services</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-[15px] font-semibold text-gray-900">LinkedIn</h3>
                      <p className="text-[12px] text-gray-500 mt-1">Import candidates from LinkedIn</p>
                    </div>
                    <Switch />
                  </div>
                  <Button variant="outline" size="sm" className="w-full">Configure</Button>
                </Card>

                <Card className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-[15px] font-semibold text-gray-900">Slack</h3>
                      <p className="text-[12px] text-gray-500 mt-1">Get notifications in Slack</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Button variant="outline" size="sm" className="w-full">Configure</Button>
                </Card>

                <Card className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-[15px] font-semibold text-gray-900">Google Calendar</h3>
                      <p className="text-[12px] text-gray-500 mt-1">Sync interview schedules</p>
                    </div>
                    <Switch />
                  </div>
                  <Button variant="outline" size="sm" className="w-full">Configure</Button>
                </Card>

                <Card className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-[15px] font-semibold text-gray-900">Zoom</h3>
                      <p className="text-[12px] text-gray-500 mt-1">Create video interview links</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Button variant="outline" size="sm" className="w-full">Configure</Button>
                </Card>
              </div>
            </div>
          )}

          {activeCategory === "control" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-[24px] font-semibold text-gray-900 mb-2">Control Panel</h1>
                <p className="text-[14px] text-gray-600">Manage application settings and preferences</p>
              </div>

              <Card className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[14px] font-medium text-gray-900">AI Agent Auto-approval</p>
                    <p className="text-[12px] text-gray-500">Automatically approve AI agent actions</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[14px] font-medium text-gray-900">Candidate Auto-screening</p>
                    <p className="text-[12px] text-gray-500">Automatically screen incoming candidates</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[14px] font-medium text-gray-900">Email Templates</p>
                    <p className="text-[12px] text-gray-500">Use default email templates</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </Card>
            </div>
          )}

          {activeCategory === "agency" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-[24px] font-semibold text-gray-900 mb-2">Agency Settings</h1>
                <p className="text-[14px] text-gray-600">Configure your agency information</p>
              </div>

              <Card className="p-6 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="agencyName">Agency Name</Label>
                  <Input id="agencyName" placeholder="Enter agency name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agencyWebsite">Website</Label>
                  <Input id="agencyWebsite" type="url" placeholder="https://" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agencyDescription">Description</Label>
                  <Textarea id="agencyDescription" rows={4} placeholder="Describe your agency" />
                </div>
                <Button>Save Agency Info</Button>
              </Card>
            </div>
          )}

          {activeCategory === "referrals" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-[24px] font-semibold text-gray-900 mb-2">Referrals</h1>
                <p className="text-[14px] text-gray-600">Invite others and earn rewards</p>
              </div>

              <Card className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="referralLink">Your Referral Link</Label>
                    <div className="flex gap-2 mt-2">
                      <Input id="referralLink" value="https://app.sproutsai.com/ref/johndoe123" readOnly />
                      <Button variant="outline">Copy</Button>
                    </div>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <p className="text-[13px] text-indigo-900 font-medium mb-1">Referral Stats</p>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-[11px] text-indigo-700">Total Referrals</p>
                        <p className="text-[20px] font-semibold text-indigo-900">12</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-indigo-700">Rewards Earned</p>
                        <p className="text-[20px] font-semibold text-indigo-900">$240</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeCategory === "approvals" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-[24px] font-semibold text-gray-900 mb-2">Approvals</h1>
                <p className="text-[14px] text-gray-600">Manage approval workflows</p>
              </div>

              <Card className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[14px] font-medium text-gray-900">Candidate Advancement</p>
                    <p className="text-[12px] text-gray-500">Require approval to move candidates forward</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[14px] font-medium text-gray-900">Agent Actions</p>
                    <p className="text-[12px] text-gray-500">Approve automated agent actions</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[14px] font-medium text-gray-900">Job Posting</p>
                    <p className="text-[12px] text-gray-500">Approve before posting jobs</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </Card>
            </div>
          )}

          {activeCategory === "jobBoards" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-[24px] font-semibold text-gray-900 mb-2">Job Boards</h1>
                <p className="text-[14px] text-gray-600">Connect to job posting platforms</p>
              </div>

              <div className="space-y-3">
                <Card className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[15px] font-semibold text-gray-900">Indeed</h3>
                      <p className="text-[12px] text-gray-500 mt-1">Connected • Last synced 2 hours ago</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Disconnect</Button>
                      <Button size="sm">Settings</Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[15px] font-semibold text-gray-900">LinkedIn Jobs</h3>
                      <p className="text-[12px] text-gray-500 mt-1">Not connected</p>
                    </div>
                    <Button size="sm">Connect</Button>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[15px] font-semibold text-gray-900">Glassdoor</h3>
                      <p className="text-[12px] text-gray-500 mt-1">Not connected</p>
                    </div>
                    <Button size="sm">Connect</Button>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeCategory === "emailSettings" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-[24px] font-semibold text-gray-900 mb-2">Email Settings</h1>
                <p className="text-[14px] text-gray-600">Configure email sending and signatures</p>
              </div>

              <Card className="p-6 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="senderName">Sender Name</Label>
                  <Input id="senderName" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senderEmail">Sender Email</Label>
                  <Input id="senderEmail" type="email" defaultValue="john@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signature">Email Signature</Label>
                  <Textarea 
                    id="signature" 
                    rows={6}
                    defaultValue="Best regards,&#10;John Doe&#10;Talent Acquisition Manager&#10;Acme Inc."
                  />
                </div>
                <Button>Save Email Settings</Button>
              </Card>
            </div>
          )}

          {activeCategory === "templates" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-[24px] font-semibold text-gray-900 mb-2">Templates</h1>
                  <p className="text-[14px] text-gray-600">Manage email and message templates</p>
                </div>
                <Button>Create Template</Button>
              </div>

              <div className="space-y-3">
                <Card className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-[15px] font-semibold text-gray-900">Welcome Email</h3>
                      <p className="text-[12px] text-gray-500 mt-1">Sent to new applicants</p>
                      <p className="text-[11px] text-gray-400 mt-2">Last updated: 2 days ago</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">Delete</Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-[15px] font-semibold text-gray-900">Interview Invitation</h3>
                      <p className="text-[12px] text-gray-500 mt-1">Invite candidates to interviews</p>
                      <p className="text-[11px] text-gray-400 mt-2">Last updated: 1 week ago</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">Delete</Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-[15px] font-semibold text-gray-900">Rejection Email</h3>
                      <p className="text-[12px] text-gray-500 mt-1">Polite rejection message</p>
                      <p className="text-[11px] text-gray-400 mt-2">Last updated: 3 days ago</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">Delete</Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}