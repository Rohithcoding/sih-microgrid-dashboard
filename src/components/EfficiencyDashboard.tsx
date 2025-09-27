"use client";

import { Card, Title, Text, Metric, Flex, Badge, ProgressBar } from '@tremor/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Award, Zap } from 'lucide-react';

interface EfficiencyDashboardProps {
  data: any;
}

export function EfficiencyDashboard({ data }: EfficiencyDashboardProps) {
  const efficiency = data?.efficiency || 18.5;
  const target15 = efficiency >= 15;
  const target30 = efficiency >= 30;
  
  const efficiencyData = [
    { name: 'Achieved', value: efficiency, color: '#10b981' },
    { name: 'Remaining to 30%', value: Math.max(0, 30 - efficiency), color: '#e5e7eb' },
  ];

  const componentEfficiency = [
    { name: 'Solar PV', efficiency: 18.5, target: 20, color: '#f59e0b' },
    { name: 'TEG', efficiency: 8.2, target: 10, color: '#8b5cf6' },
    { name: 'Inverter', efficiency: 96.5, target: 95, color: '#06b6d4' },
    { name: 'Battery', efficiency: 95.2, target: 95, color: '#10b981' },
  ];

  const getEfficiencyGrade = (eff: number) => {
    if (eff >= 25) return { grade: 'A+', color: 'emerald' };
    if (eff >= 20) return { grade: 'A', color: 'green' };
    if (eff >= 15) return { grade: 'B', color: 'yellow' };
    if (eff >= 10) return { grade: 'C', color: 'orange' };
    return { grade: 'D', color: 'red' };
  };

  const grade = getEfficiencyGrade(efficiency);

  return (
    <Card className="glass-card">
      <Flex alignItems="center" className="space-x-2 mb-4">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Target className="h-6 w-6 text-green-500" />
        </motion.div>
        <Title className="text-xl font-bold">System Efficiency Dashboard</Title>
        <Badge color={grade.color} size="sm">Grade {grade.grade}</Badge>
      </Flex>

      {/* Overall Efficiency Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <Text className="text-sm font-medium">Overall Efficiency</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-green-600">{efficiency}%</Metric>
          <ProgressBar value={efficiency} color="green" className="mt-2" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`bg-gradient-to-br ${target15 ? 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' : 'from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20'} p-4 rounded-lg border ${target15 ? 'border-green-200 dark:border-green-800' : 'border-red-200 dark:border-red-800'}`}
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Target className="h-4 w-4 text-blue-500" />
            <Text className="text-sm font-medium">15% Target</Text>
          </Flex>
          <Metric className={`text-2xl font-bold ${target15 ? 'text-green-600' : 'text-red-600'}`}>
            {target15 ? '✓ Achieved' : `${(15 - efficiency).toFixed(1)}% Gap`}
          </Metric>
          <Badge color={target15 ? 'green' : 'red'} size="xs" className="mt-2">
            {target15 ? 'Met' : 'Not Met'}
          </Badge>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`bg-gradient-to-br ${target30 ? 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' : 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20'} p-4 rounded-lg border ${target30 ? 'border-green-200 dark:border-green-800' : 'border-yellow-200 dark:border-yellow-800'}`}
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Award className="h-4 w-4 text-purple-500" />
            <Text className="text-sm font-medium">30% Stretch</Text>
          </Flex>
          <Metric className={`text-2xl font-bold ${target30 ? 'text-green-600' : 'text-yellow-600'}`}>
            {target30 ? '🏆 Achieved' : `${(30 - efficiency).toFixed(1)}% Gap`}
          </Metric>
          <Badge color={target30 ? 'green' : 'yellow'} size="xs" className="mt-2">
            {target30 ? 'Excellent' : 'Stretch Goal'}
          </Badge>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Zap className="h-4 w-4 text-blue-500" />
            <Text className="text-sm font-medium">Performance</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-blue-600">{grade.grade}</Metric>
          <Text className="text-xs text-gray-600 mt-1">System Grade</Text>
        </motion.div>
      </div>

      {/* Efficiency Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Efficiency Pie Chart */}
        <div>
          <Title className="text-lg mb-3">Efficiency Progress to 30% Target</Title>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={efficiencyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {efficiencyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-2">
            <Text className="text-sm text-gray-600">
              {efficiency}% of 30% target achieved
            </Text>
          </div>
        </div>

        {/* Component Efficiency */}
        <div>
          <Title className="text-lg mb-3">Component Efficiency Breakdown</Title>
          <div className="space-y-3">
            {componentEfficiency.map((component) => (
              <div key={component.name} className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                <Flex justifyContent="between" alignItems="center" className="mb-2">
                  <Text className="text-sm font-medium">{component.name}</Text>
                  <Badge 
                    color={component.efficiency >= component.target ? 'green' : 'yellow'} 
                    size="xs"
                  >
                    {component.efficiency}%
                  </Badge>
                </Flex>
                <ProgressBar 
                  value={component.efficiency} 
                  color={component.efficiency >= component.target ? 'green' : 'yellow'}
                  className="mb-1"
                />
                <Text className="text-xs text-gray-600">
                  Target: {component.target}% | 
                  Status: {component.efficiency >= component.target ? 'Met' : 'Below Target'}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Efficiency Insights */}
      <div className="space-y-3">
        <Title className="text-lg">Efficiency Analysis & Recommendations</Title>
        
        <div className={`bg-gradient-to-r ${target15 ? 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' : 'from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20'} p-4 rounded-lg border ${target15 ? 'border-green-200 dark:border-green-800' : 'border-red-200 dark:border-red-800'}`}>
          <Flex alignItems="center" className="space-x-2 mb-2">
            <span className="text-lg">{target15 ? '✅' : '⚠️'}</span>
            <Text className={`font-medium ${target15 ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
              15% Efficiency Target
            </Text>
          </Flex>
          <Text className={`text-sm ${target15 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
            {target15 
              ? '• Excellent! System exceeds minimum efficiency requirements'
              : `• System needs ${(15 - efficiency).toFixed(1)}% improvement to meet target`
            }
          </Text>
          <Text className={`text-sm ${target15 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
            {target15 
              ? '• Continue monitoring to maintain optimal performance'
              : '• Focus on solar panel cleaning and TEG optimization'
            }
          </Text>
        </div>

        <div className={`bg-gradient-to-r ${target30 ? 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' : 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20'} p-4 rounded-lg border ${target30 ? 'border-green-200 dark:border-green-800' : 'border-blue-200 dark:border-blue-800'}`}>
          <Flex alignItems="center" className="space-x-2 mb-2">
            <span className="text-lg">{target30 ? '🏆' : '🎯'}</span>
            <Text className={`font-medium ${target30 ? 'text-green-800 dark:text-green-200' : 'text-blue-800 dark:text-blue-200'}`}>
              30% Stretch Goal
            </Text>
          </Flex>
          <Text className={`text-sm ${target30 ? 'text-green-700 dark:text-green-300' : 'text-blue-700 dark:text-blue-300'}`}>
            {target30 
              ? '• Outstanding performance! System exceeds stretch goals'
              : `• ${(30 - efficiency).toFixed(1)}% improvement needed for stretch target`
            }
          </Text>
          <Text className={`text-sm ${target30 ? 'text-green-700 dark:text-green-300' : 'text-blue-700 dark:text-blue-300'}`}>
            {target30 
              ? '• System operating at world-class efficiency levels'
              : '• Consider advanced optimization techniques and component upgrades'
            }
          </Text>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
          <Flex alignItems="center" className="space-x-2 mb-2">
            <span className="text-lg">🤖</span>
            <Text className="font-medium text-purple-800 dark:text-purple-200">AI Optimization Suggestions</Text>
          </Flex>
          <Text className="text-sm text-purple-700 dark:text-purple-300">
            • Solar panels operating at {componentEfficiency[0].efficiency}% - consider cleaning schedule
          </Text>
          <Text className="text-sm text-purple-700 dark:text-purple-300">
            • TEG temperature differential optimal - maintain current thermal management
          </Text>
          <Text className="text-sm text-purple-700 dark:text-purple-300">
            • Battery and inverter efficiency excellent - no immediate action needed
          </Text>
        </div>
      </div>
    </Card>
  );
}
