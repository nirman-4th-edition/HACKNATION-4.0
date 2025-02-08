import React, { useEffect, useState } from 'react';
import { Thermometer, Droplets, Gauge } from 'lucide-react';
import { DashboardCard } from './DashboardCard';

interface FactoryData {
  envTemp: number;
  humidity: number;
  aqi: number;
}

export function FactorySection() {
  const [factoryData, setFactoryData] = useState<FactoryData>({
    envTemp: 0,
    humidity: 0,
    aqi: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://3b1vkr9w-8080.inc1.devtunnels.ms/admin/get-details");
        const data = await response.json();

        setFactoryData({
          envTemp: data.envTemp,
          humidity: data.humidity,
          aqi: data.aqi
        });
      } catch (error) {
        console.error("Error fetching factory data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
      <div className="sticky top-4">
        <div className="space-y-6 bg-gray-100 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Factory Monitoring</h2>
          <div className="grid grid-cols-1 gap-6">
            <DashboardCard
                title="Temperature"
                value={`${factoryData.envTemp}°C`}
                icon={<Thermometer className="w-6 h-6" />}
                delay={100}
            />
            <DashboardCard
                title="Humidity"
                value={`${factoryData.humidity}%`}
                icon={<Droplets className="w-6 h-6" />}
                delay={200}
            />
            <DashboardCard
                title="Air Quality"
                value={factoryData.aqi.toString()}
                icon={<Gauge className="w-6 h-6" />}
                delay={300}
            />
          </div>
        </div>
      </div>
  );
}