"use client";

import { Card, Title, Text, Metric, Flex, Badge, ProgressBar } from '@tremor/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Zap, Settings, TrendingUp, Shield, Power } from 'lucide-react';

interface PowerConversionProps {
  data: any;
}

export function PowerConversion({ data }: PowerConversionProps) {
  // Simulate power conversion data
  const inverterEfficiency = data?.inverterEfficiency || 96.8;
  const hybridControllerStatus = data?.hybridControllerStatus || 'optimal';
  const powerFactor = data?.powerFactor || 0.98;
  const thd = data?.thd || 2.1; // Total Harmonic Distortion
  const dcVoltage = data?.dcVoltage || 385;
  const acVoltage = data?.acVoltage || 230;
  const frequency = data?.frequency || 50.02;

  // Generate power flow data
  const powerFlowData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    dcInput: 2000 + Math.sin(i * 0.3) * 800 + Math.random() * 200,
    acOutput: 1950 + Math.sin(i * 0.3) * 780 + Math.random() * 180,
    losses: 50 + Math.random() * 30,
  }));

  const getEfficiencyColor = (eff: number) => {
    if (eff >= 95) return 'green';
    if (eff >= 90) return 'yellow';
    return 'red';
  };

  const getControllerStatus = (status: string) => {
    switch (status) {
      case 'optimal': return { color: 'green', text: 'Optimal', icon: '✅' };
      case 'warning': return { color: 'yellow', text: 'Warning', icon: '⚠️' };
      case 'critical': return { color: 'red', text: 'Critical', icon: '🔴' };
      default: return { color: 'gray', text: 'Unknown', icon: '❓' };
    }
  };

  const controllerInfo = getControllerStatus(hybridControllerStatus);

  return (
    <Card className="glass-card">
      <Flex alignItems="center" className="space-x-2 mb-4">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Power className="h-6 w-6 text-purple-500" />
        </motion.div>
        <Title className="text-xl font-bold">Power Conversion & Control</Title>
        <Badge color="purple" size="sm">Active</Badge>
      </Flex>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <Text className="text-sm font-medium">Inverter Efficiency</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-green-600">{inverterEfficiency}%</Metric>
          <ProgressBar 
            value={inverterEfficiency} 
            color={getEfficiencyColor(inverterEfficiency)}
            className="mt-2"
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Settings className="h-4 w-4 text-blue-500" />
            <Text className="text-sm font-medium">Controller Status</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-blue-600">{controllerInfo.text}</Metric>
          <Badge color={controllerInfo.color} size="xs" className="mt-2">
            {controllerInfo.icon} {controllerInfo.text}
          </Badge>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Zap className="h-4 w-4 text-purple-500" />
            <Text className="text-sm font-medium">Power Factor</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-purple-600">{powerFactor}</Metric>
          <Text className="text-xs text-gray-600 mt-1">Leading/Lagging</Text>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Shield className="h-4 w-4 text-orange-500" />
            <Text className="text-sm font-medium">THD</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-orange-600">{thd}%</Metric>
          <Text className="text-xs text-gray-600 mt-1">Harmonic distortion</Text>
        </motion.div>
      </div>

      {/* Electrical Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">DC Input</Text>
          <Flex alignItems="center" justifyContent="between">
            <div>
              <Text className="text-lg font-bold text-blue-600">{dcVoltage}V</Text>
              <Text className="text-xs text-gray-600">Voltage</Text>
            </div>
            <div className="text-right">
              <Text className="text-lg font-bold text-green-600">5.2A</Text>
              <Text className="text-xs text-gray-600">Current</Text>
            </div>
          </Flex>
        </div>

        <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">AC Output</Text>
          <Flex alignItems="center" justifyContent="between">
            <div>
              <Text className="text-lg font-bold text-purple-600">{acVoltage}V</Text>
              <Text className="text-xs text-gray-600">RMS Voltage</Text>
            </div>
            <div className="text-right">
              <Text className="text-lg font-bold text-orange-600">{frequency}Hz</Text>
              <Text className="text-xs text-gray-600">Frequency</Text>
            </div>
          </Flex>
        </div>

        <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Protection Status</Text>
          <div className="space-y-1">
            <Flex alignItems="center" className="space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <Text className="text-xs">Overvoltage Protection</Text>
            </Flex>
            <Flex alignItems="center" className="space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <Text className="text-xs">Overcurrent Protection</Text>
            </Flex>
            <Flex alignItems="center" className="space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <Text className="text-xs">Temperature Protection</Text>
            </Flex>
          </div>
        </div>
      </div>

      {/* Power Flow Chart */}
      <div className="mb-6">
        <Title className="text-lg mb-3">24-Hour Power Conversion Profile</Title>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={powerFlowData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="hour" 
                tick={{ fontSize: 12 }}
                interval={2}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                label={{ value: 'Power (W)', angle: -90, position: 'insideLeft' }}
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
                dataKey="dcInput" 
                stackId="1"
                stroke="#3b82f6" 
                fill="url(#dcGradient)"
                name="DC Input"
              />
              <Area 
                type="monotone" 
                dataKey="acOutput" 
                stackId="2"
                stroke="#8b5cf6" 
                fill="url(#acGradient)"
                name="AC Output"
              />
              <defs>
                <linearGradient id="dcGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="acGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Control System Status */}
      <div className="space-y-3">
        <Title className="text-lg">Hybrid Controller Analysis</Title>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <Flex alignItems="center" className="space-x-2 mb-2">
            <span className="text-lg">⚡</span>
            <Text className="font-medium text-green-800 dark:text-green-200">Power Quality Excellent</Text>
          </Flex>
          <Text className="text-sm text-green-700 dark:text-green-300">
            • Inverter efficiency at {inverterEfficiency}% - exceeding 95% target
          </Text>
          <Text className="text-sm text-green-700 dark:text-green-300">
            • THD at {thd}% - well within IEEE 519 standards (&lt;5%)
          </Text>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <Flex alignItems="center" className="space-x-2 mb-2">
            <span className="text-lg">🔧</span>
            <Text className="font-medium text-blue-800 dark:text-blue-200">Control System Status</Text>
          </Flex>
          <Text className="text-sm text-blue-700 dark:text-blue-300">
            • MPPT algorithm tracking at 99.2% efficiency
          </Text>
          <Text className="text-sm text-blue-700 dark:text-blue-300">
            • Grid synchronization stable - frequency locked at {frequency}Hz
          </Text>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
          <Flex alignItems="center" className="space-x-2 mb-2">
            <span className="text-lg">🛡️</span>
            <Text className="font-medium text-purple-800 dark:text-purple-200">Protection Systems</Text>
          </Flex>
          <Text className="text-sm text-purple-700 dark:text-purple-300">
            • All protection relays operational and tested
          </Text>
          <Text className="text-sm text-purple-700 dark:text-purple-300">
            • Islanding detection active - response time &lt;2 seconds
          </Text>
        </div>
      </div>
    </Card>
  );
}
