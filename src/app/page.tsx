"use client";

import { useState, useEffect } from 'react';
import { Card, Title, Text, Metric, Flex, Badge, Grid, ProgressBar } from '@tremor/react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Battery, 
  Sun, 
  Thermometer, 
  Activity, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Brain,
  Cloud,
  BarChart3
} from 'lucide-react';

import { LoginForm } from '@/components/LoginForm';
import { Navigation } from '@/components/Navigation';
import { DashboardHeader } from '@/components/DashboardHeader';
import { SolarMonitoring } from '@/components/SolarMonitoring';
import { BatterySystem } from '@/components/BatterySystem';
import { ThermalSystem } from '@/components/ThermalSystem';
import { AILoadManagement } from '@/components/AILoadManagement';
import { WeatherIntelligence } from '@/components/WeatherIntelligence';
import { SystemAlerts } from '@/components/SystemAlerts';
import { EfficiencyDashboard } from '@/components/EfficiencyDashboard';
import { TurbineMonitoring } from '@/components/TurbineMonitoring';
import { PowerConversion } from '@/components/PowerConversion';
import { PredictiveAnalytics } from '@/components/PredictiveAnalytics';
import { GridShiftingSystem } from '@/components/GridShiftingSystem';
import { DashboardOverview } from '@/components/DashboardOverview';
import { useRealTimeData } from '@/hooks/useRealTimeData';

interface User {
  username: string;
  role: string;
}

export default function MicrogridDashboard() {
  const { data, isLoading, error } = useRealTimeData();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [user, setUser] = useState<User>({ username: 'Demo User', role: 'admin' }); // Auto-login as admin
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showDemoInfo, setShowDemoInfo] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (credentials: { username: string; password: string; role: string }) => {
    setUser({ username: credentials.username, role: credentials.role });
  };

  const handleLogout = () => {
    setUser({ username: 'Demo User', role: 'admin' }); // Reset to demo user instead of null
    setCurrentPage('dashboard');
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
        <Text className="ml-4 text-lg">Loading AI-Enhanced Dashboard...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <Flex alignItems="center" className="space-x-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <Title>System Error</Title>
          </Flex>
          <Text className="mt-2">Failed to load dashboard data. Please refresh the page.</Text>
        </Card>
      </div>
    );
  }

  const renderPage = () => {
    if (currentPage === 'dashboard') {
      return (
        <div className="p-4 md:p-6">
          <DashboardOverview 
            onCardClick={handlePageChange}
            currentTime={currentTime}
            systemStatus="operational"
          />
        </div>
      );
    }
    
    switch (currentPage) {
      case 'solar':
        return (
          <div className="space-y-6 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Title className="text-3xl font-bold">Solar Generation & PV Monitoring</Title>
                <Text className="text-gray-600 mt-2">Real-time solar panel performance and generation analytics</Text>
              </div>
            </div>
            <SolarMonitoring data={data} />
          </div>
        );
      case 'battery':
        return (
          <div className="space-y-6 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Title className="text-3xl font-bold">Battery Energy Storage System</Title>
                <Text className="text-gray-600 mt-2">Advanced BESS monitoring and management</Text>
              </div>
            </div>
            <BatterySystem data={data} />
          </div>
        );
      case 'thermal':
        return (
          <div className="space-y-6 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Title className="text-3xl font-bold">Thermal System Monitoring</Title>
                <Text className="text-gray-600 mt-2">Hot water, molten salts, and steam generation</Text>
              </div>
            </div>
            <ThermalSystem data={data} />
          </div>
        );
      case 'turbine':
        return (
          <div className="space-y-6 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Title className="text-3xl font-bold">Turbine & Condenser Operation</Title>
                <Text className="text-gray-600 mt-2">Steam turbine performance and condenser monitoring</Text>
              </div>
            </div>
            <TurbineMonitoring data={data} />
          </div>
        );
      case 'power':
        return (
          <div className="space-y-6 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Title className="text-3xl font-bold">Power Conversion & Control</Title>
                <Text className="text-gray-600 mt-2">Inverter efficiency and hybrid controller management</Text>
              </div>
            </div>
            <PowerConversion data={data} />
          </div>
        );
      case 'grid-shift':
        return (
          <div className="space-y-6 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Title className="text-3xl font-bold">Automatic Grid Shifting System</Title>
                <Text className="text-gray-600 mt-2">Smart grid connection and load shedding management</Text>
              </div>
              <Badge color="red" size="lg">
                <Activity className="h-4 w-4 mr-1" />
                Emergency System
              </Badge>
            </div>
            <GridShiftingSystem data={data} />
          </div>
        );
      case 'ai-load':
        return (
          <div className="space-y-6 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Title className="text-3xl font-bold">AI Load Management</Title>
                <Text className="text-gray-600 mt-2">Smart load optimization and demand response</Text>
              </div>
            </div>
            <AILoadManagement data={data} />
          </div>
        );
      case 'weather':
        return (
          <div className="space-y-6 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Title className="text-3xl font-bold">Weather Intelligence</Title>
                <Text className="text-gray-600 mt-2">AI-powered weather correlation and forecasting</Text>
              </div>
            </div>
            <WeatherIntelligence data={data} />
          </div>
        );
      case 'efficiency':
        return (
          <div className="space-y-6 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Title className="text-3xl font-bold">Efficiency Dashboard</Title>
                <Text className="text-gray-600 mt-2">System efficiency tracking and optimization</Text>
              </div>
            </div>
            <EfficiencyDashboard data={data} />
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-6 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Title className="text-3xl font-bold">Predictive Analytics</Title>
                <Text className="text-gray-600 mt-2">AI-powered forecasting and fault prediction</Text>
              </div>
            </div>
            <PredictiveAnalytics data={data} />
          </div>
        );
      case 'alerts':
        return (
          <div className="space-y-6 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Title className="text-3xl font-bold">System Alerts & Notifications</Title>
                <Text className="text-gray-600 mt-2">Real-time alerts and system status monitoring</Text>
              </div>
            </div>
            <SystemAlerts data={data} />
          </div>
        );
      default:
        return (
          <div className="space-y-6 p-6">
            {/* Dashboard Header */}
            <DashboardHeader currentTime={currentTime} systemStatus="operational" />

            {/* Comprehensive Analysis Dashboard Title */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-xl p-6 shadow-lg text-white mb-6">
              <div className="flex items-center space-x-3">
                <BarChart3 className="h-8 w-8 text-yellow-300" />
                <div>
                  <h1 className="text-2xl font-bold">Complete System Analysis Dashboard</h1>
                  <p className="text-blue-100 text-sm">Real-time monitoring, analytics, and AI-powered insights</p>
                </div>
              </div>
            </div>

            {/* Key Performance Indicators */}
            <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="glass-card">
                  <Flex alignItems="center" className="space-x-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <Text>Total Generation</Text>
                  </Flex>
                  <Metric className="mt-2">{data?.totalGeneration || '2.4'} kW</Metric>
                  <Flex className="mt-2">
                    <Text className="truncate">Efficiency</Text>
                    <Badge color="emerald" size="xs">
                      {data?.efficiency || '18.5'}%
                    </Badge>
                  </Flex>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="glass-card">
                  <Flex alignItems="center" className="space-x-2">
                    <Battery className="h-5 w-5 text-green-500" />
                    <Text>Battery SOC</Text>
                  </Flex>
                  <Metric className="mt-2">{data?.batterySOC || '78'}%</Metric>
                  <ProgressBar 
                    value={data?.batterySOC || 78} 
                    className="mt-2" 
                    color="emerald"
                  />
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="glass-card">
                  <Flex alignItems="center" className="space-x-2">
                    <Sun className="h-5 w-5 text-orange-500" />
                    <Text>Solar Output</Text>
                  </Flex>
                  <Metric className="mt-2">{data?.solarOutput || '1.8'} kW</Metric>
                  <Flex className="mt-2">
                    <Text className="truncate">Irradiance</Text>
                    <Text>{data?.irradiance || '850'} W/m²</Text>
                  </Flex>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="glass-card">
                  <Flex alignItems="center" className="space-x-2">
                    <Brain className="h-5 w-5 text-purple-500" />
                    <Text>AI Status</Text>
                  </Flex>
                  <Metric className="mt-2">Active</Metric>
                  <Flex className="mt-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <Text className="ml-1">All Systems Optimal</Text>
                  </Flex>
                </Card>
              </motion.div>
            </Grid>

            {/* Primary Analysis Section - Solar & Battery */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <Title className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                🔋 Primary Energy Systems Analysis
              </Title>
              <Grid numItemsSm={1} numItemsLg={2} className="gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <SolarMonitoring data={data} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <BatterySystem data={data} />
                </motion.div>
              </Grid>
            </div>

            {/* Thermal & AI Intelligence Analysis */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <Title className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                🌡️ Thermal Systems & AI Intelligence
              </Title>
              <Grid numItemsSm={1} numItemsLg={2} className="gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <ThermalSystem data={data} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <AILoadManagement data={data} />
                </motion.div>
              </Grid>
            </div>

            {/* Environmental & Performance Analysis */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <Title className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                🌤️ Environmental Intelligence & Performance Metrics
              </Title>
              <Grid numItemsSm={1} numItemsLg={2} className="gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <WeatherIntelligence data={data} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <EfficiencyDashboard data={data} />
                </motion.div>
              </Grid>
            </div>

            {/* Advanced Mechanical Systems Analysis */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <Title className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                ⚙️ Advanced Mechanical & Power Systems
              </Title>
              <Grid numItemsSm={1} numItemsLg={2} className="gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <TurbineMonitoring data={data} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <PowerConversion data={data} />
                </motion.div>
              </Grid>
            </div>

            {/* Grid Management Analysis */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <Title className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                🔌 Grid Management & Emergency Systems
              </Title>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <GridShiftingSystem data={data} />
              </motion.div>
            </div>

            {/* Predictive Analytics & AI Insights */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <Title className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                🤖 AI-Powered Predictive Analytics & Forecasting
              </Title>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <PredictiveAnalytics data={data} />
              </motion.div>
            </div>

            {/* System Health & Alerts Analysis */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <Title className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                🚨 System Health Monitoring & Alert Analysis
              </Title>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <SystemAlerts data={data} />
              </motion.div>
            </div>

            {/* Comprehensive Footer */}
            <Card className="mt-8 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900">
              <Flex justifyContent="between" alignItems="center">
                <div>
                  <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    🚀 AI-Enhanced Microgrid Dashboard v2.0 - Complete Analysis View
                  </Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-400">
                    Last Updated: {currentTime.toLocaleTimeString()} | All Systems Monitored | Real-time Data Active
                  </Text>
                </div>
                <div className="flex space-x-2">
                  <Badge color="emerald" size="sm">
                    System Operational
                  </Badge>
                  <Badge color="blue" size="sm">
                    AI Active
                  </Badge>
                  <Badge color="purple" size="sm">
                    Analytics Live
                  </Badge>
                </div>
              </Flex>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      {/* Demo Info Banner */}
      {showDemoInfo && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
        >
          <div className="px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-semibold text-sm sm:text-base">🚀 Live Demo - AI Microgrid Dashboard</span>
              </div>
              <div className="text-xs sm:text-sm opacity-90">
                <span className="hidden sm:inline">•</span> No login required 
                <span className="mx-1">•</span> Full access enabled 
                <span className="mx-1">•</span> Real-time data simulation
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xs bg-white/20 px-2 py-1 rounded hidden sm:block">
                Efficiency: &gt;22% | Alerts: Live | Mobile: ✓
              </div>
              <button
                onClick={() => setShowDemoInfo(false)}
                className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
                aria-label="Close demo banner"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <Navigation 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
        onLogout={handleLogout} 
        userRole={user.role} 
      />
      <div className={`lg:ml-80 transition-all duration-300 ${showDemoInfo ? 'pt-16 sm:pt-12' : ''}`}>
        {renderPage()}
      </div>
    </div>
  );
}
