import type { LucideIcon } from "lucide-react";
import type { ObjectId } from "mongoose";

export interface Company {
  name: string;
  hr: string[];
  tags: string[];
  placed: boolean;
  completed: boolean;
}

export interface CompanyData {
  // specifically for admin
  name: string;
  hr: ObjectId[];
  shortlistedStudents: string[];
  selectedStudents: string[];
  completedStudents: string[];
  tags: string[];
}

export interface SidebarItemProps {
  icon: LucideIcon;
  text: string;
  isActive?: boolean;
  isExpanded?: boolean;
  onClick?: () => void;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType;
  href: string;
  fun: () => any | null | undefined;
}

export interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export interface DashboardMetric {
  id: string;
  label: string;
  value: number | string;
  change?: number;
}

export interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  type: "interview" | "review" | "practice" | "analytics";
}

export interface SidebarProps {
  isCollapsed: boolean; // Controls whether the sidebar is collapsed
  onToggle: () => void; // Function to toggle the collapse state
  isVisible?: boolean; // Controls visibility of the sidebar (used for smaller screens)
  onClose?: () => void; // Function to close the sidebar on smaller screens
}

export interface LoginForm {
  username: string; // or email for admin or hr
  password: string;
  keepSignedIn: boolean;
}

export interface SignUpForm {
  userType: "student" | "hr";
  name: string;
  username: string;
  email: string;
  password: string;
  branch?: string;
  section?: string;
  company?: string;
  collegeId?: string;
}

export interface ProfileField {
  label: string;
  value: string;
  type?: string;
  fullWidth?: boolean;
}

export interface Document {
  name: string;
  type: string;
  editable?: boolean;
}

export interface DocumentSectionProps {
  title: string;
  documents: Document[];
  showUpload?: boolean;
}

export interface studentRegisterInfoType {
  username: string;
  email: string;
  name: string;
  branch: string;
  section: string;
  password: string;
}

export interface HrRegisterInfoType {
  username: string;
  email: string;
  collegeId: string;
  name: string;
  company: string;
  password: string;
}

export interface Message {
  text: string;
  time: string;
  isUser: boolean;
}
export interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}
export interface Candidate {
  name: string;
  major: string;
  year: string;
  gpa: number;
  status: string;
}

export interface Feedback {
  companyName: string;
  type: string;
  comment: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Student {
  name: string;
  branch: string;
  admissionYear: number;
  status: "Pending" | "Selected" | "Completed" | string;
}

export interface StudentData {
  _id: string;
  name: string;
  section: string;
  branch: string;
  admissionYear: number;
  feedback: ObjectId[];
  companies: ObjectId[];
  placedAt: ObjectId[];
  email: string;
  status: "Pending" | "Selected" | "Completed" | string;
}

export interface Hr {
  _id: string;
  companyId:{ id: ObjectId, name: string }
  name: string;
  email: string;
}
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Repository {
  id: number;
  title: string;
  description: string;
  tags: string[];
  difficulty: Difficulty;
  stars: number;
  html_url: string;
}
