"use client";

import { Card, Title, Text, Metric, Flex, Badge, ProgressBar } from '@tremor/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Sun, Zap, TrendingUp, Eye } from 'lucide-react';

interface SolarMonitoringProps {
  data: any;
}

export function SolarMonitoring({ data }: SolarMonitoringProps) {
  // Generate sample chart data
  const chartData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    solar: Math.max(0, 2.5 * Math.sin((i - 6) * Math.PI / 12) + Math.random() * 0.3),
    teg: 0.6 + Math.random() * 0.2,
  }));

  const solarOutput = data?.solarOutput || 1.8;
  const tegOutput = data?.tegOutput || 0.6;
  const irradiance = data?.irradiance || 850;
  const efficiency = data?.efficiency || 18.5;

  const getEfficiencyColor = (eff: number) => {
    if (eff >= 20) return 'emerald';
    if (eff >= 15) return 'yellow';
    return 'red';
  };

  return (
    <Card className="glass-card">
      <Flex alignItems="center" className="space-x-2 mb-4">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Sun className="h-6 w-6 text-orange-500" />
        </motion.div>
        <Title className="text-xl font-bold">Solar Generation & PV Monitoring</Title>
        <Badge color="blue" size="sm">Live</Badge>
      </Flex>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Sun className="h-4 w-4 text-orange-500" />
            <Text className="text-sm font-medium">Solar Output</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-orange-600">{solarOutput} kW</Metric>
          <Text className="text-xs text-gray-600 mt-1">Peak: 2.5 kW</Text>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Zap className="h-4 w-4 text-purple-500" />
            <Text className="text-sm font-medium">TEG Output</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-purple-600">{tegOutput} kW</Metric>
          <Text className="text-xs text-gray-600 mt-1">Stable generation</Text>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Eye className="h-4 w-4 text-blue-500" />
            <Text className="text-sm font-medium">Irradiance</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-blue-600">{irradiance}</Metric>
          <Text className="text-xs text-gray-600 mt-1">W/m²</Text>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <Text className="text-sm font-medium">Efficiency</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-green-600">{efficiency}%</Metric>
          <ProgressBar 
            value={efficiency} 
            color={getEfficiencyColor(efficiency)}
            className="mt-2"
          />
        </motion.div>
      </div>

      {/* Performance Chart */}
      <div className="mb-4">
        <Title className="text-lg mb-3">24-Hour Generation Profile</Title>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="hour" 
                tick={{ fontSize: 12 }}
                interval={2}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                label={{ value: 'Power (kW)', angle: -90, position: 'insideLeft' }}
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
                type="monotone" 
                dataKey="solar" 
                stroke="#f59e0b" 
                strokeWidth={3}
                name="Solar PV"
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="teg" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                name="TEG"
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">Solar Concentrator</Text>
          <Flex alignItems="center" className="mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <Text className="text-sm">Aligned & Tracking</Text>
          </Flex>
        </div>

        <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">PV Panel Status</Text>
          <Flex alignItems="center" className="mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <Text className="text-sm">Clean & Operational</Text>
          </Flex>
        </div>

        <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">TEG System</Text>
          <Flex alignItems="center" className="mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <Text className="text-sm">Optimal ΔT: 495°C</Text>
          </Flex>
        </div>
      </div>
    </Card>
  );
}
