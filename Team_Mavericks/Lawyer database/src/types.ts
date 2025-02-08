export interface User {
  id: string;
  name: string;
  caseNumber: string;
  caseType: string;
  status: string;
  lastUpdated: string;
}

export interface Notification {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  status?: 'approved' | 'denied';
}

export interface CaseDetail {
  notices: string[];
  progress: string;
  documents: {
    name: string;
    url: string;
    uploadedAt: string;
  }[];
  reminders: {
    id: string;
    title: string;
    date: string;
    isCompleted: boolean;
  }[];
}