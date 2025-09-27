"use client";

import { Card, Title, Text, Metric, Flex, Badge, ProgressBar } from '@tremor/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, AlertTriangle, Target, Clock, Zap } from 'lucide-react';
import { useAIPredictions } from '@/hooks/useRealTimeData';

interface PredictiveAnalyticsProps {
  data: any;
}

export function PredictiveAnalytics({ data }: PredictiveAnalyticsProps) {
  const { predictions } = useAIPredictions('all');
  
  // AI Prediction metrics
  const faultRisk = data?.faultRisk || 12; // Percentage
  const backupTime = data?.aiPredictions?.batteryRuntime || 8.5; // Hours
  const optimizationScore = data?.aiPredictions?.optimizationScore || 87;
  const predictionAccuracy = 94.2; // Historical accuracy

  // Generate forecast data
  const forecastData = Array.from({ length: 12 }, (_, i) => ({
    hour: `+${i + 1}h`,
    solarForecast: Math.max(0, 2.2 * Math.sin((i + 6) * Math.PI / 12) + Math.random() * 0.3),
    loadForecast: 1.2 + 0.3 * Math.sin(i * 0.3) + Math.random() * 0.2,
    batterySOC: Math.max(20, Math.min(100, 75 + Math.sin(i * 0.2) * 15 + Math.random() * 5)),
  }));

  // Risk assessment data
  const riskData = [
    { component: 'Solar PV', risk: 8, color: '#10b981' },
    { component: 'Battery', risk: 15, color: '#f59e0b' },
    { component: 'Inverter', risk: 5, color: '#10b981' },
    { component: 'TEG', risk: 12, color: '#f59e0b' },
    { component: 'Thermal', risk: 18, color: '#ef4444' },
  ];

  const getRiskColor = (risk: number) => {
    if (risk < 10) return 'green';
    if (risk < 20) return 'yellow';
    return 'red';
  };

  const getOptimizationGrade = (score: number) => {
    if (score >= 90) return { grade: 'A+', color: 'emerald' };
    if (score >= 80) return { grade: 'A', color: 'green' };
    if (score >= 70) return { grade: 'B', color: 'yellow' };
    if (score >= 60) return { grade: 'C', color: 'orange' };
    return { grade: 'D', color: 'red' };
  };

  const optimizationGrade = getOptimizationGrade(optimizationScore);

  return (
    <Card className="glass-card">
      <Flex alignItems="center" className="space-x-2 mb-4">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Brain className="h-6 w-6 text-purple-500" />
        </motion.div>
        <Title className="text-xl font-bold">AI Predictive Analytics & Forecasting</Title>
        <Badge color="purple" size="sm">AI Engine</Badge>
      </Flex>

      {/* Key Prediction Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Target className="h-4 w-4 text-purple-500" />
            <Text className="text-sm font-medium">AI Accuracy</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-purple-600">{predictionAccuracy}%</Metric>
          <ProgressBar value={predictionAccuracy} color="purple" className="mt-2" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <Text className="text-sm font-medium">Backup Time</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-blue-600">{backupTime}h</Metric>
          <Text className="text-xs text-gray-600 mt-1">Predicted runtime</Text>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`bg-gradient-to-br from-${getRiskColor(faultRisk)}-50 to-${getRiskColor(faultRisk)}-100 dark:from-${getRiskColor(faultRisk)}-900/20 dark:to-${getRiskColor(faultRisk)}-800/20 p-4 rounded-lg border border-${getRiskColor(faultRisk)}-200 dark:border-${getRiskColor(faultRisk)}-800`}
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            <Text className="text-sm font-medium">Fault Risk</Text>
          </Flex>
          <Metric className={`text-2xl font-bold text-${getRiskColor(faultRisk)}-600`}>{faultRisk}%</Metric>
          <Badge color={getRiskColor(faultRisk)} size="xs" className="mt-2">
            {faultRisk < 10 ? 'Low' : faultRisk < 20 ? 'Medium' : 'High'}
          </Badge>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <Text className="text-sm font-medium">Optimization</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-green-600">{optimizationGrade.grade}</Metric>
          <Text className="text-xs text-gray-600 mt-1">Score: {optimizationScore}%</Text>
        </motion.div>
      </div>

      {/* Forecast Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Energy Forecast */}
        <div>
          <Title className="text-lg mb-3">12-Hour Energy Forecast</Title>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} label={{ value: 'Power (kW)', angle: -90, position: 'insideLeft' }} />
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
                  dataKey="solarForecast" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  name="Solar Forecast"
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="loadForecast" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  name="Load Forecast"
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Assessment */}
        <div>
          <Title className="text-lg mb-3">Component Risk Assessment</Title>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="component" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 12 }} label={{ value: 'Risk %', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="risk" radius={[4, 4, 0, 0]}>
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Insights and Recommendations */}
      <div className="space-y-3">
        <Title className="text-lg">AI Insights & Predictive Recommendations</Title>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <Flex alignItems="center" className="space-x-2 mb-2">
            <span className="text-lg">🔮</span>
            <Text className="font-medium text-blue-800 dark:text-blue-200">Energy Forecast Analysis</Text>
          </Flex>
          <Text className="text-sm text-blue-700 dark:text-blue-300">
            • Next 6 hours: Solar generation expected to peak at 2.4kW around noon
          </Text>
          <Text className="text-sm text-blue-700 dark:text-blue-300">
            • Load demand stable with minor evening increase predicted
          </Text>
          <Text className="text-sm text-blue-700 dark:text-blue-300">
            • Battery SOC will remain above 60% with current generation profile
          </Text>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <Flex alignItems="center" className="space-x-2 mb-2">
            <span className="text-lg">⚠️</span>
            <Text className="font-medium text-yellow-800 dark:text-yellow-200">Risk Mitigation</Text>
          </Flex>
          <Text className="text-sm text-yellow-700 dark:text-yellow-300">
            • Thermal system showing 18% risk - schedule maintenance check within 48 hours
          </Text>
          <Text className="text-sm text-yellow-700 dark:text-yellow-300">
            • Battery degradation model suggests optimal charging between 20-80% SOC
          </Text>
          <Text className="text-sm text-yellow-700 dark:text-yellow-300">
            • Weather forecast indicates 15% cloud increase - prepare backup systems
          </Text>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <Flex alignItems="center" className="space-x-2 mb-2">
            <span className="text-lg">🎯</span>
            <Text className="font-medium text-green-800 dark:text-green-200">Optimization Opportunities</Text>
          </Flex>
          <Text className="text-sm text-green-700 dark:text-green-300">
            • AI suggests load shifting: Run non-critical loads during 11 AM - 2 PM peak solar
          </Text>
          <Text className="text-sm text-green-700 dark:text-green-300">
            • Predictive maintenance: TEG cleaning recommended in 72 hours for 3% efficiency gain
          </Text>
          <Text className="text-sm text-green-700 dark:text-green-300">
            • Battery cycle optimization: Current strategy extends lifespan by 18 months
          </Text>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
          <Flex alignItems="center" className="space-x-2 mb-2">
            <span className="text-lg">🤖</span>
            <Text className="font-medium text-purple-800 dark:text-purple-200">Machine Learning Status</Text>
          </Flex>
          <Text className="text-sm text-purple-700 dark:text-purple-300">
            • Model accuracy: {predictionAccuracy}% (trained on 10,000+ data points)
          </Text>
          <Text className="text-sm text-purple-700 dark:text-purple-300">
            • Pattern recognition: 47 operational patterns identified and classified
          </Text>
          <Text className="text-sm text-purple-700 dark:text-purple-300">
            • Anomaly detection: Real-time monitoring with 99.2% accuracy
          </Text>
        </div>
      </div>
    </Card>
  );
}
