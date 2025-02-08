// @ts-ignore
import React, { useState } from 'react';
import { Heart, Thermometer, Activity } from 'lucide-react';
import { DashboardCard } from '../DashboardCard';
import { WorkerHealth } from './WorkerTypes';

interface WorkerCardProps {
    worker: WorkerHealth;
    delay?: number;
}

export function WorkerCard({ worker, delay = 0 }: WorkerCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/30 p-6 animate-slide-in border border-gray-200 dark:border-gray-700"
    style={{ animationDelay: `${delay}ms` }}
>
    <div
        className="flex items-center justify-between mb-4 cursor-pointer"
    onClick={() => setIsExpanded(!isExpanded)}
>
    <div className="space-y-1">
    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
        BAND{worker.bandId} - {worker.name}
    </h3>
    {isExpanded && (
        <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
            <p>BID: {10000 + worker.bandId}</p>
    <p>Gender: {worker.gender}</p>
    <p>Age: {worker.age}</p>
    <p>Medical Conditions: {worker.medicalCondition}</p>
    </div>
    )}
    </div>
    <div className={`w-3 h-3 rounded-full ${
        worker.status === 'green' ? 'bg-green-500' :
            worker.status === 'yellow' ? 'bg-yellow-500' :
                'bg-red-500'
    }`} />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <DashboardCard
        title="Heart Rate"
    value={`${worker.heartRate} BPM`}
    icon={<Heart className="w-6 h-6" />}
    delay={delay + 100}
    />
    <DashboardCard
    title="Temperature"
    value={`${worker.bodyTemp}°C`}
    icon={<Thermometer className="w-6 h-6" />}
    delay={delay + 200}
    />
    <DashboardCard
    title="SpO2"
    value={`${worker.spo2}%`}
    icon={<Activity className="w-6 h-6" />}
    delay={delay + 300}
    />
    </div>
    </div>
);
}