"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Shield, ShieldAlert, Wifi, Clock, Server, Activity } from 'lucide-react';

const IoTMonitor = () => {
  interface Device {
    id: string;
    status: string;
  }

  const [monitorData, setMonitorData] = useState<{
    devices: Device[];
    authMetrics: {
      legitimateAuth: number;
      hackerAttempts: number;
      expiredRequests: number;
      replayAttacks: number;
    };
    events: any[];
  }>({
    devices: [],
    authMetrics: {
      legitimateAuth: 0,
      hackerAttempts: 0,
      expiredRequests: 0,
      replayAttacks: 0,
    },
    events: []
  });

  const [connected, setConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/ws');

    ws.onopen = () => {
      console.log('Connected to IoT Monitor');
      setConnected(true);
      setConnectionError(null);
    };

    ws.onclose = () => {
      console.log('Disconnected from IoT Monitor');
      setConnected(false);
      setConnectionError("Connection lost. Retrying...");
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        setMonitorData({
          devices: [],
          authMetrics: {
            legitimateAuth: 0,
            hackerAttempts: 0,
            expiredRequests: 0,
            replayAttacks: 0,
          },
          events: []
        });
      }, 5000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionError('Failed to connect to IoT Monitor');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMonitorData(data);
    };

    return () => {
      ws.close();
    };
  }, []);

  // Calculate auth history data for the line chart
  const authHistory = monitorData.events.reduce((acc: any, event: any) => {
    const hour = new Date(event.timestamp).getHours();
    if (!acc[hour]) {
      acc[hour] = { time: `${hour}:00`, legitimate: 0, failed: 0 };
    }
    if (event.type === 'LegitimateAuth') {
      if (event.success) {
        acc[hour].legitimate++;
      } else {
        acc[hour].failed++;
      }
    }
    return acc;
  }, {});

  const authHistoryData = Object.values(authHistory);

  // Connection status indicator
  const ConnectionStatus = () => (
    <div className={`flex items-center gap-2 ${connected ? 'text-green-500' : 'text-red-500'}`}>
      <Activity className="h-4 w-4" />
      <span className="text-sm">
        {connected ? 'Connected' : connectionError || 'Disconnected'}
      </span>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">IoT Security Monitor</h1>
        <ConnectionStatus />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Devices</p>
                <p className="text-2xl font-bold">{monitorData.devices.length}</p>
              </div>
              <Server className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Auth Success Rate</p>
                <p className="text-2xl font-bold">
                  {monitorData.authMetrics.legitimateAuth > 0
                    ? Math.round(
                        (monitorData.authMetrics.legitimateAuth /
                          Object.values(monitorData.authMetrics).reduce((a, b) => a + b, 0)) *
                          100
                      )
                    : 0}%
                </p>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Security Alerts</p>
                <p className="text-2xl font-bold">
                  {monitorData.authMetrics.hackerAttempts + monitorData.authMetrics.replayAttacks}
                </p>
              </div>
              <ShieldAlert className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Devices</p>
                <p className="text-2xl font-bold">
                  {monitorData.devices.filter(d => d.status === "authenticated").length}
                </p>
              </div>
              <Wifi className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Authentication History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={authHistoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="legitimate" stroke="#22c55e" name="Successful" />
                  <Line type="monotone" dataKey="failed" stroke="#ef4444" name="Failed" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Events Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[monitorData.authMetrics]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="legitimateAuth" fill="#22c55e" name="Legitimate" />
                  <Bar dataKey="hackerAttempts" fill="#ef4444" name="Hacker Attempts" />
                  <Bar dataKey="expiredRequests" fill="#eab308" name="Expired" />
                  <Bar dataKey="replayAttacks" fill="#dc2626" name="Replay Attacks" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Authentication Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Timestamp</th>
                  <th className="px-6 py-3">Device ID</th>
                  <th className="px-6 py-3">Event Type</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {monitorData.events.slice().reverse().map((event: any, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4">{event.deviceId}</td>
                    <td className="px-6 py-4">{event.type}</td>
                    <td className="px-6 py-4">
                      <span className={event.success ? 'text-green-500' : 'text-red-500'}>
                        {event.success ? 'Success' : 'Failed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IoTMonitor;