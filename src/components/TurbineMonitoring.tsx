"use client";

import { Card, Title, Text, Metric, Flex, Badge, ProgressBar } from '@tremor/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Cog, Gauge, Thermometer, Activity, AlertTriangle } from 'lucide-react';

interface TurbineMonitoringProps {
  data: any;
}

export function TurbineMonitoring({ data }: TurbineMonitoringProps) {
  // Simulate turbine data
  const turbineRPM = data?.turbineRPM || 1850;
  const vibrationLevel = data?.vibrationLevel || 2.3;
  const condenserTemp = data?.condenserTemp || 35;
  const turbineEfficiency = data?.turbineEfficiency || 87.5;

  // Generate performance data
  const performanceData = Array.from({ length: 12 }, (_, i) => ({
    time: `${i + 1}h`,
    rpm: 1800 + Math.sin(i * 0.3) * 100 + Math.random() * 50,
    vibration: 2 + Math.sin(i * 0.5) * 0.5 + Math.random() * 0.3,
    efficiency: 85 + Math.sin(i * 0.2) * 5 + Math.random() * 3,
  }));

  const getVibrationStatus = (level: number) => {
    if (level < 2) return { color: 'green', status: 'Normal', icon: '✅' };
    if (level < 4) return { color: 'yellow', status: 'Elevated', icon: '⚠️' };
    return { color: 'red', status: 'Critical', icon: '🔴' };
  };

  const getRPMStatus = (rpm: number) => {
    if (rpm >= 1750 && rpm <= 1900) return { color: 'green', status: 'Optimal' };
    if (rpm >= 1600 && rpm <= 2000) return { color: 'yellow', status: 'Acceptable' };
    return { color: 'red', status: 'Critical' };
  };

  const vibrationStatus = getVibrationStatus(vibrationLevel);
  const rpmStatus = getRPMStatus(turbineRPM);

  return (
    <Card className="glass-card">
      <Flex alignItems="center" className="space-x-2 mb-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Cog className="h-6 w-6 text-blue-500" />
        </motion.div>
        <Title className="text-xl font-bold">Turbine & Condenser Operation</Title>
        <Badge color="blue" size="sm">Active</Badge>
      </Flex>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Cog className="h-4 w-4 text-blue-500" />
            <Text className="text-sm font-medium">Turbine RPM</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-blue-600">{turbineRPM}</Metric>
          <Badge color={rpmStatus.color} size="xs" className="mt-2">
            {rpmStatus.status}
          </Badge>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Activity className="h-4 w-4 text-orange-500" />
            <Text className="text-sm font-medium">Vibration</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-orange-600">{vibrationLevel} mm/s</Metric>
          <Badge color={vibrationStatus.color} size="xs" className="mt-2">
            {vibrationStatus.status}
          </Badge>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-cyan-200 dark:border-cyan-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Thermometer className="h-4 w-4 text-cyan-500" />
            <Text className="text-sm font-medium">Condenser Temp</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-cyan-600">{condenserTemp}°C</Metric>
          <Text className="text-xs text-gray-600 mt-1">Water cooling</Text>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Gauge className="h-4 w-4 text-green-500" />
            <Text className="text-sm font-medium">Efficiency</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-green-600">{turbineEfficiency}%</Metric>
          <ProgressBar value={turbineEfficiency} color="green" className="mt-2" />
        </motion.div>
      </div>

      {/* Performance Chart */}
      <div className="mb-6">
        <Title className="text-lg mb-3">Turbine Performance Trends</Title>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <YAxis 
                yAxisId="rpm"
                orientation="left"
                tick={{ fontSize: 12 }} 
                label={{ value: 'RPM', angle: -90, position: 'insideLeft' }} 
              />
              <YAxis 
                yAxisId="vibration"
                orientation="right"
                tick={{ fontSize: 12 }} 
                label={{ value: 'Vibration (mm/s)', angle: 90, position: 'insideRight' }} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Line 
                yAxisId="rpm"
                type="monotone" 
                dataKey="rpm" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="RPM"
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                yAxisId="vibration"
                type="monotone" 
                dataKey="vibration" 
                stroke="#f97316" 
                strokeWidth={3}
                name="Vibration"
                dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bearing Health</Text>
          <Flex alignItems="center" className="space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <Text className="text-sm font-bold text-green-600">Excellent</Text>
          </Flex>
          <Text className="text-xs text-gray-600 mt-1">Temperature: 45°C</Text>
        </div>

        <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Lubrication System</Text>
          <Flex alignItems="center" className="space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <Text className="text-sm font-bold text-green-600">Normal Flow</Text>
          </Flex>
          <Text className="text-xs text-gray-600 mt-1">Pressure: 2.8 bar</Text>
        </div>

        <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Generator Coupling</Text>
          <Flex alignItems="center" className="space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <Text className="text-sm font-bold text-green-600">Aligned</Text>
          </Flex>
          <Text className="text-xs text-gray-600 mt-1">No misalignment detected</Text>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <Flex alignItems="center" className="space-x-2 mb-2">
          <span className="text-lg">🔧</span>
          <Text className="font-medium">Turbine AI Analysis</Text>
        </Flex>
        <div className="space-y-1">
          <Text className="text-sm">
            {vibrationStatus.icon} Vibration levels {vibrationStatus.status.toLowerCase()} - {vibrationLevel < 3 ? 'no maintenance required' : 'schedule inspection'}
          </Text>
          <Text className="text-sm">
            ⚙️ RPM within optimal range - turbine operating efficiently at {turbineEfficiency}%
          </Text>
          <Text className="text-sm">
            🌡️ Condenser temperature optimal for current ambient conditions
          </Text>
        </div>
      </div>
    </Card>
  );
}
