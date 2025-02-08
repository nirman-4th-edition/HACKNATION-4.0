import { StatCardProps } from '../types'; 

export function StatCard({ title, value, change, icon }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className="text-gray-600">{title}</div>
        {icon}
      </div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className="text-sm text-gray-500">{change}</div>
    </div>
  );
}