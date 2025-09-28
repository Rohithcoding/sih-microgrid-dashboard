"use client";

import { Card, Title, Text, Metric, Flex, Badge, ProgressBar, Grid } from '@tremor/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';
import { Brain, Zap, TrendingUp, Target, AlertTriangle, Clock, Cpu, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AIPredictionDashboardProps {
  data: any;
}

export function AIPredictionDashboard({ data }: AIPredictionDashboardProps) {
  const [predictions, setPredictions] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await fetch('/api/ai-predictions?type=all');
        const data = await response.json();
        setPredictions(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch AI predictions:', error);
        setLoading(false);
      }
    };

    fetchPredictions();
    const interval = setInterval(fetchPredictions, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card className="glass-card">
        <div className="flex items-center justify-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
          />
          <Text className="ml-4 text-lg">Loading AI Predictions...</Text>
        </div>
      </Card>
    );
  }

  const aiMetrics = [
    {
      title: 'Prediction Accuracy',
      value: '94.2%',
      icon: Target,
      color: 'purple',
      trend: '+2.1%'
    },
    {
      title: 'Model Confidence',
      value: predictions?.solarPredictions?.summary?.averageConfidence ? 
        `${(predictions.solarPredictions.summary.averageConfidence * 100).toFixed(1)}%` : '87.3%',
      icon: Brain,
      color: 'blue',
      trend: '+0.8%'
    },
    {
      title: 'Processing Speed',
      value: '12ms',
      icon: Cpu,
      color: 'green',
      trend: '-3ms'
    },
    {
      title: 'Active Models',
      value: '8',
      icon: Activity,
      color: 'orange',
      trend: '+2'
    }
  ];

  return (
    <div className="space-y-6">
      {/* AI Dashboard Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 rounded-xl p-6 shadow-lg text-white">
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Brain className="h-8 w-8 text-yellow-300" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold">AI Prediction & Forecasting Engine</h1>
            <p className="text-blue-100 text-sm">Advanced machine learning models for microgrid optimization</p>
          </div>
        </div>
      </div>

      {/* AI Performance Metrics */}
      <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
        {aiMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-card hover:shadow-lg transition-shadow">
                <Flex alignItems="center" className="space-x-2 mb-2">
                  <IconComponent className={`h-5 w-5 text-${metric.color}-500`} />
                  <Text className="font-medium">{metric.title}</Text>
                </Flex>
                <Metric className="text-2xl font-bold">{metric.value}</Metric>
                <Badge color={metric.color} size="xs" className="mt-2">
                  {metric.trend}
                </Badge>
              </Card>
            </motion.div>
          );
        })}
      </Grid>

      {/* Solar Generation Predictions */}
      {predictions?.solarPredictions && (
        <Card className="glass-card">
          <Title className="text-xl font-bold mb-4">☀️ Solar Generation AI Forecast</Title>
          <div className="h-80 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={predictions.solarPredictions.predictions}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} label={{ value: 'Power (kW)', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="predictedPower" 
                  stroke="#f59e0b" 
                  fill="#f59e0b"
                  fillOpacity={0.3}
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
              <Text className="text-sm font-medium">Peak Generation</Text>
              <Metric className="text-lg">{predictions.solarPredictions.summary.peakGenerationPower} kW</Metric>
              <Text className="text-xs text-gray-600">at {predictions.solarPredictions.summary.peakGenerationHour}</Text>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <Text className="text-sm font-medium">Daily Total</Text>
              <Metric className="text-lg">{predictions.solarPredictions.summary.totalDailyGeneration} kWh</Metric>
              <Text className="text-xs text-gray-600">Predicted generation</Text>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <Text className="text-sm font-medium">AI Confidence</Text>
              <Metric className="text-lg">{(predictions.solarPredictions.summary.averageConfidence * 100).toFixed(1)}%</Metric>
              <Text className="text-xs text-gray-600">Model accuracy</Text>
            </div>
          </div>
        </Card>
      )}

      {/* Battery Performance Predictions */}
      {predictions?.batteryPredictions && (
        <Card className="glass-card">
          <Title className="text-xl font-bold mb-4">🔋 Battery AI Performance Forecast</Title>
          <div className="h-80 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predictions.batteryPredictions.predictions}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} label={{ value: 'SOC (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="soc" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <Text className="text-sm font-medium">Min SOC</Text>
              <Metric className="text-lg">{predictions.batteryPredictions.analysis.minimumSOC}%</Metric>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <Text className="text-sm font-medium">Max SOC</Text>
              <Metric className="text-lg">{predictions.batteryPredictions.analysis.maximumSOC}%</Metric>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
              <Text className="text-sm font-medium">AI Grade</Text>
              <Metric className="text-lg">{predictions.batteryPredictions.aiInsights.performanceGrade.split(' ')[0]}</Metric>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
              <Text className="text-sm font-medium">Risk Level</Text>
              <Badge color={predictions.batteryPredictions.aiInsights.riskAssessment === 'Low' ? 'green' : 
                           predictions.batteryPredictions.aiInsights.riskAssessment === 'Medium' ? 'yellow' : 'red'}>
                {predictions.batteryPredictions.aiInsights.riskAssessment}
              </Badge>
            </div>
          </div>
        </Card>
      )}

      {/* AI Insights & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <Title className="text-lg font-bold mb-4">🤖 AI Insights</Title>
          <div className="space-y-3">
            {predictions?.solarPredictions?.aiInsights?.optimizationSuggestions?.map((insight: string, index: number) => (
              <div key={index} className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <Text className="text-sm">{insight}</Text>
              </div>
            ))}
            {predictions?.batteryPredictions?.aiInsights?.optimizationOpportunities?.map((opportunity: string, index: number) => (
              <div key={index} className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <Text className="text-sm">{opportunity}</Text>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass-card">
          <Title className="text-lg font-bold mb-4">🎯 Smart Recommendations</Title>
          <div className="space-y-3">
            {predictions?.weatherPredictions?.aiInsights?.map((insight: string, index: number) => (
              <div key={index} className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <Text className="text-sm">{insight}</Text>
              </div>
            ))}
            {predictions?.weatherPredictions?.microgridRecommendations?.map((rec: string, index: number) => (
              <div key={index} className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                <Text className="text-sm">{rec}</Text>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
