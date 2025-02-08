import React from 'react';
import { Users, ChevronRight } from 'lucide-react';
import type { User } from '../types';
import { useNavigate } from 'react-router-dom';

interface UserListProps {
  users: User[];
}

export function UserList({ users }: UserListProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => navigate(`/case/${user.id}`)}
          className="p-4 rounded-lg border bg-white hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-green-100 rounded-full">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-600">Case: {user.caseNumber}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-500">{user.caseType}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">Last updated: {user.lastUpdated}</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      ))}
    </div>
  );
}