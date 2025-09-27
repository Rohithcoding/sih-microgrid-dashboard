"use client";

import { Card, Title, Text, Metric, Flex, Badge, ProgressBar } from '@tremor/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Thermometer, Droplets, Gauge } from 'lucide-react';

interface ThermalSystemProps {
  data: any;
}

export function ThermalSystem({ data }: ThermalSystemProps) {
  const hotWaterTemp = data?.hotWaterTemp || 475;
  const tegHotTemp = data?.tegHotTemp || 520;
  const tegColdTemp = data?.tegColdTemp || 28;
  const steamPressure = data?.steamPressure || 2.7;

  const thermalData = Array.from({ length: 12 }, (_, i) => ({
    time: `${i + 1}h`,
    hotWater: 470 + Math.sin(i * 0.5) * 15 + Math.random() * 10,
    tegHot: 515 + Math.sin(i * 0.3) * 20 + Math.random() * 15,
  }));

  const getTempStatus = (temp: number, min: number, max: number) => {
    if (temp < min) return { color: 'blue', status: 'Low' };
    if (temp > max) return { color: 'red', status: 'High' };
    return { color: 'green', status: 'Optimal' };
  };

  const hotWaterStatus = getTempStatus(hotWaterTemp, 450, 500);
  const tegStatus = getTempStatus(tegHotTemp, 500, 550);

  return (
    <Card className="glass-card">
      <Flex alignItems="center" className="space-x-2 mb-4">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Thermometer className="h-6 w-6 text-red-500" />
        </motion.div>
        <Title className="text-xl font-bold">Thermal System Monitoring</Title>
        <Badge color="orange" size="sm">High Temp</Badge>
      </Flex>

      {/* Temperature Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Thermometer className="h-4 w-4 text-red-500" />
            <Text className="text-sm font-medium">Hot Water Tank</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-red-600">{hotWaterTemp}°C</Metric>
          <Badge color={hotWaterStatus.color} size="xs" className="mt-2">
            {hotWaterStatus.status}
          </Badge>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Thermometer className="h-4 w-4 text-orange-500" />
            <Text className="text-sm font-medium">TEG Hot Side</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-orange-600">{tegHotTemp}°C</Metric>
          <Badge color={tegStatus.color} size="xs" className="mt-2">
            {tegStatus.status}
          </Badge>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            <Text className="text-sm font-medium">TEG Cold Side</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-blue-600">{tegColdTemp}°C</Metric>
          <Text className="text-xs text-gray-600 mt-1">ΔT: {tegHotTemp - tegColdTemp}°C</Text>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Gauge className="h-4 w-4 text-purple-500" />
            <Text className="text-sm font-medium">Steam Pressure</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-purple-600">{steamPressure} bar</Metric>
          <ProgressBar value={(steamPressure / 5) * 100} color="purple" className="mt-2" />
        </motion.div>
      </div>

      {/* Thermal Trend Chart */}
      <div className="mb-4">
        <Title className="text-lg mb-3">Thermal Performance Trends</Title>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={thermalData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Line type="monotone" dataKey="hotWater" stroke="#ef4444" strokeWidth={3} name="Hot Water" />
              <Line type="monotone" dataKey="tegHot" stroke="#f97316" strokeWidth={3} name="TEG Hot" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">Molten Salt Flow</Text>
          <Flex alignItems="center" className="mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <Text className="text-sm">Normal Flow Rate</Text>
          </Flex>
        </div>

        <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">Steam Generation</Text>
          <Flex alignItems="center" className="mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <Text className="text-sm">Active & Stable</Text>
          </Flex>
        </div>

        <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">Safety Systems</Text>
          <Flex alignItems="center" className="mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <Text className="text-sm">All Systems OK</Text>
          </Flex>
        </div>
      </div>
    </Card>
  );
}
