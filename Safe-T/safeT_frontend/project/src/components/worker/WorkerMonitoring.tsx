// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import React, { useEffect, useState } from 'react';
import { WorkerHealth } from './WorkerTypes';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { WorkerCard } from './WorkerCard';
import { SosAlert } from '../SosAlert';

export function WorkerMonitoring() {
    const [workers, setWorkers] = useState<WorkerHealth[]>([]);
    const [isSosActive, setIsSosActive] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://3b1vkr9w-8080.inc1.devtunnels.ms/admin/get-details");
                const data = await response.json();

                const updatedWorkers = Array.from({ length: 8 }, (_, i) => ({
                    id: i + 1,
                    bandId: i + 1,
                    name: `PERSON${i + 1}`,
                    gender: i % 2 === 0 ? 'MALE' : 'FEMALE' as const,
                    age: 20 + i + 1,
                    medicalCondition: i % 2 === 0 ? 'Hypertension' : 'Asthma',
                    heartRate: data.heartRate,
                    bodyTemp: data.bodyTemp,
                    spo2: data.spo2,
                    status: data.ledStatus === 0 ? 'green' : data.ledStatus === 1 ? 'yellow' : 'red' as const
                }));

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setWorkers(updatedWorkers);
                setIsSosActive(data.sos);

                if (data.sos) {
                    new Audio('https://www.soundjay.com/button/beep-07.wav').play().catch(console.error);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            <SosAlert
                isActive={isSosActive}
                message="Emergency Alert: Worker requires immediate assistance!"
            />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Worker Monitoring</h2>
            <div className="space-y-6">
                {workers.map((worker, index) => (
                    <WorkerCard
                        key={worker.id}
                        worker={worker}
                        delay={index * 200}
                    />
                ))}
            </div>
        </div>
    );
}