"use client";

import { Card, Title, Text, Metric, Flex, Badge, ProgressBar } from '@tremor/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Battery, Zap, Thermometer, Activity, TrendingUp } from 'lucide-react';

interface BatterySystemProps {
  data: any;
}

export function BatterySystem({ data }: BatterySystemProps) {
  // Generate sample SOC trend data
  const socTrendData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    soc: 65 + Math.sin(i * 0.5) * 15 + Math.random() * 5,
    charging: Math.max(0, Math.sin((i - 8) * Math.PI / 8) * 2),
  }));

  const batterySOC = data?.batterySOC || 78;
  const batteryVoltage = data?.batteryVoltage || 48.2;
  const batteryTemp = data?.batteryTemp || 28.5;
  const chargingRate = data?.chargingRate || 1.2;

  const getSOCColor = (soc: number) => {
    if (soc >= 70) return 'emerald';
    if (soc >= 40) return 'yellow';
    return 'red';
  };

  const getBatteryIcon = (soc: number) => {
    if (soc >= 75) return '🔋';
    if (soc >= 50) return '🔋';
    if (soc >= 25) return '🪫';
    return '🪫';
  };

  return (
    <Card className="glass-card">
      <Flex alignItems="center" className="space-x-2 mb-4">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Battery className="h-6 w-6 text-green-500" />
        </motion.div>
        <Title className="text-xl font-bold">Battery Energy Storage System</Title>
        <Badge color="green" size="sm">BESS Active</Badge>
      </Flex>

      {/* Battery Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <span className="text-2xl">{getBatteryIcon(batterySOC)}</span>
            <Text className="text-sm font-medium">State of Charge</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-green-600">{batterySOC}%</Metric>
          <ProgressBar 
            value={batterySOC} 
            color={getSOCColor(batterySOC)}
            className="mt-2"
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Zap className="h-4 w-4 text-blue-500" />
            <Text className="text-sm font-medium">Voltage</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-blue-600">{batteryVoltage}V</Metric>
          <Text className="text-xs text-gray-600 mt-1">Nominal: 48V</Text>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Thermometer className="h-4 w-4 text-orange-500" />
            <Text className="text-sm font-medium">Temperature</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-orange-600">{batteryTemp}°C</Metric>
          <Text className="text-xs text-gray-600 mt-1">Optimal range</Text>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <TrendingUp className="h-4 w-4 text-purple-500" />
            <Text className="text-sm font-medium">Power Flow</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-purple-600">
            {chargingRate > 0 ? '+' : ''}{chargingRate} kW
          </Metric>
          <Text className="text-xs text-gray-600 mt-1">
            {chargingRate > 0 ? 'Charging' : chargingRate < 0 ? 'Discharging' : 'Idle'}
          </Text>
        </motion.div>
      </div>

      {/* SOC Trend Chart */}
      <div className="mb-6">
        <Title className="text-lg mb-3">24-Hour SOC & Charging Profile</Title>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={socTrendData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="hour" 
                tick={{ fontSize: 12 }}
                interval={2}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                domain={[0, 100]}
                label={{ value: 'SOC (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="soc" 
                stroke="#10b981" 
                fill="url(#socGradient)"
                strokeWidth={3}
                name="SOC %"
              />
              <defs>
                <linearGradient id="socGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Battery Health & Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Battery Health</Text>
          <Flex alignItems="center" className="space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <Text className="text-sm font-bold text-green-600">Excellent (98%)</Text>
          </Flex>
          <Text className="text-xs text-gray-600 mt-1">Cycle count: 1,247</Text>
        </div>

        <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estimated Runtime</Text>
          <Flex alignItems="center" className="space-x-2">
            <Activity className="h-4 w-4 text-blue-500" />
            <Text className="text-sm font-bold text-blue-600">
              {data?.aiPredictions?.batteryRuntime || 8} hours
            </Text>
          </Flex>
          <Text className="text-xs text-gray-600 mt-1">At current load</Text>
        </div>

        <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Efficiency</Text>
          <Flex alignItems="center" className="space-x-2">
            <TrendingUp className="h-4 w-4 text-purple-500" />
            <Text className="text-sm font-bold text-purple-600">95.2%</Text>
          </Flex>
          <Text className="text-xs text-gray-600 mt-1">Round-trip efficiency</Text>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <Flex alignItems="center" className="space-x-2 mb-2">
          <span className="text-lg">🤖</span>
          <Text className="font-medium">AI Battery Insights</Text>
        </Flex>
        <div className="space-y-1">
          <Text className="text-sm">• Battery performing optimally with 95%+ efficiency</Text>
          <Text className="text-sm">• Recommended charging during peak solar hours (10 AM - 3 PM)</Text>
          <Text className="text-sm">• Current SOC provides {data?.aiPredictions?.batteryRuntime || 8}h backup at normal load</Text>
        </div>
      </div>
    </Card>
  );
}
