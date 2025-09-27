"use client";

import { Card, Title, Text, Metric, Flex, Badge } from '@tremor/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Brain, Zap, Target, TrendingUp } from 'lucide-react';
import { useAIPredictions } from '@/hooks/useRealTimeData';

interface AILoadManagementProps {
  data: any;
}

export function AILoadManagement({ data }: AILoadManagementProps) {
  const { predictions } = useAIPredictions('load');
  
  const criticalLoad = data?.criticalLoad || 0.8;
  const nonCriticalLoad = data?.nonCriticalLoad || 0.6;
  const totalLoad = criticalLoad + nonCriticalLoad;
  const totalGeneration = data?.totalGeneration || 2.4;
  
  const loadData = [
    { name: 'Critical', value: criticalLoad, color: '#ef4444' },
    { name: 'Non-Critical', value: nonCriticalLoad, color: '#f59e0b' },
    { name: 'Available', value: Math.max(0, totalGeneration - totalLoad), color: '#10b981' },
  ];

  const aiScore = data?.aiPredictions?.optimizationScore || 85;
  const predictedLoad = predictions?.loadPredictions?.predictedLoad || 1450;
  const confidence = predictions?.loadPredictions?.confidence || 0.85;

  return (
    <Card className="glass-card">
      <Flex alignItems="center" className="space-x-2 mb-4">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Brain className="h-6 w-6 text-purple-500" />
        </motion.div>
        <Title className="text-xl font-bold">AI Load Management</Title>
        <Badge color="purple" size="sm">AI Active</Badge>
      </Flex>

      {/* AI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Brain className="h-4 w-4 text-purple-500" />
            <Text className="text-sm font-medium">AI Prediction</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-purple-600">{Math.round(predictedLoad)}W</Metric>
          <Text className="text-xs text-gray-600 mt-1">Confidence: {Math.round(confidence * 100)}%</Text>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Target className="h-4 w-4 text-blue-500" />
            <Text className="text-sm font-medium">Optimization</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-blue-600">{aiScore}%</Metric>
          <Text className="text-xs text-gray-600 mt-1">AI Score</Text>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Zap className="h-4 w-4 text-green-500" />
            <Text className="text-sm font-medium">Load Balance</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-green-600">
            {totalGeneration > totalLoad ? 'Surplus' : 'Deficit'}
          </Metric>
          <Text className="text-xs text-gray-600 mt-1">
            {Math.abs(totalGeneration - totalLoad).toFixed(2)} kW
          </Text>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <TrendingUp className="h-4 w-4 text-orange-500" />
            <Text className="text-sm font-medium">Efficiency</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-orange-600">
            {Math.round((totalGeneration / (totalLoad + 0.1)) * 100)}%
          </Metric>
          <Text className="text-xs text-gray-600 mt-1">Power utilization</Text>
        </motion.div>
      </div>

      {/* Load Distribution Chart */}
      <div className="mb-6">
        <Title className="text-lg mb-3">Real-time Load Distribution</Title>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={loadData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} label={{ value: 'Power (kW)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="space-y-3">
        <Title className="text-lg">AI Smart Recommendations</Title>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <Flex alignItems="center" className="space-x-2 mb-2">
            <span className="text-lg">🤖</span>
            <Text className="font-medium text-green-800 dark:text-green-200">Load Optimization Active</Text>
          </Flex>
          <Text className="text-sm text-green-700 dark:text-green-300">
            • System operating at optimal efficiency with current load distribution
          </Text>
          <Text className="text-sm text-green-700 dark:text-green-300">
            • {totalGeneration > totalLoad ? 'Surplus power available - consider running optional loads' : 'Monitor battery SOC for load shedding decisions'}
          </Text>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <Flex alignItems="center" className="space-x-2 mb-2">
            <span className="text-lg">📊</span>
            <Text className="font-medium text-blue-800 dark:text-blue-200">Next Hour Forecast</Text>
          </Flex>
          <Text className="text-sm text-blue-700 dark:text-blue-300">
            • Predicted load: {Math.round(predictedLoad)}W (±{Math.round(predictedLoad * 0.15)}W)
          </Text>
          <Text className="text-sm text-blue-700 dark:text-blue-300">
            • Solar forecast: {data?.aiPredictions?.solarForecast || 2.1} kW expected
          </Text>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
          <Flex alignItems="center" className="space-x-2 mb-2">
            <span className="text-lg">⚡</span>
            <Text className="font-medium text-purple-800 dark:text-purple-200">Smart Actions</Text>
          </Flex>
          <Text className="text-sm text-purple-700 dark:text-purple-300">
            • AI Priority Scoring: Critical loads protected, non-critical optimized
          </Text>
          <Text className="text-sm text-purple-700 dark:text-purple-300">
            • Battery runtime: {data?.aiPredictions?.batteryRuntime || 8} hours at current consumption
          </Text>
        </div>
      </div>
    </Card>
  );
}
