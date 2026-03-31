import React, { useState } from "react";
import { Edit2, Trash2, Plus, Save, CheckCircle, Clock, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
"@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter } from
"@/components/ui/dialog";

const permissionOptions = [
{ value: "view", label: "View Only" },
{ value: "edit", label: "Edit Job Details" },
{ value: "manage_candidates", label: "Manage Candidates" },
{ value: "full_access", label: "Full Access" }];


export default function HiringTeam() {
  const [teamMembers, setTeamMembers] = useState([
  { id: 1, name: "Sarah Chen", email: "sarah.chen@company.com", permission: "full_access", stats: { screened: 48, interviews: 22, placements: 6, avgTtf: 24 } },
  { id: 2, name: "Mike Roberts", email: "mike.roberts@company.com", permission: "edit", stats: { screened: 41, interviews: 18, placements: 5, avgTtf: 27 } },
  { id: 3, name: "Jessica Taylor", email: "jessica.taylor@company.com", permission: "manage_candidates", stats: { screened: 37, interviews: 15, placements: 4, avgTtf: 31 } }]
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", email: "", permission: "view" });
  const [editingId, setEditingId] = useState(null);

  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      setTeamMembers([
      ...teamMembers,
      {
        id: Date.now(),
        ...newMember
      }]
      );
      setNewMember({ name: "", email: "", permission: "view" });
      setIsAddDialogOpen(false);
    }
  };

  const handleRemoveMember = (id) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
  };

  const handleUpdatePermission = (id, newPermission) => {
    setTeamMembers(
      teamMembers.map((member) =>
      member.id === id ? { ...member, permission: newPermission } : member
      )
    );
  };

  const getPermissionLabel = (value) => {
    return permissionOptions.find((opt) => opt.value === value)?.label || value;
  };

  return null;




























































































































































}