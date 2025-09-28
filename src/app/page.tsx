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
  Cloud
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
// import { SolarPage } from '@/pages/SolarPage';
import { useRealTimeData } from '@/hooks/useRealTimeData';

interface User {
  username: string;
  role: string;
}

export default function MicrogridDashboard() {
  const { data, isLoading, error } = useRealTimeData();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [user, setUser] = useState<User | null>({ username: 'Public User', role: 'admin' }); // Default public access
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (credentials: { username: string; password: string; role: string }) => {
    setUser({ username: credentials.username, role: credentials.role });
    setShowDemoAccounts(false);
  };

  const handleLogout = () => {
    setUser({ username: 'Public User', role: 'admin' }); // Reset to public access instead of null
    setCurrentPage('dashboard');
    setShowDemoAccounts(false);
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  // Demo accounts data
  const demoAccounts = [
    { username: 'admin', password: 'admin123', role: 'admin', description: 'Full system access & controls', color: 'red' },
    { username: 'operator', password: 'operator123', role: 'operator', description: 'Operations & monitoring', color: 'blue' },
    { username: 'viewer', password: 'viewer123', role: 'viewer', description: 'Read-only dashboard access', color: 'green' }
  ];

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

      {/* Main Dashboard Sections */}
      <Grid numItemsSm={1} numItemsLg={2} className="gap-6">
        {/* Solar & Generation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SolarMonitoring data={data} />
        </motion.div>

        {/* Battery System */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <BatterySystem data={data} />
        </motion.div>
      </Grid>

      {/* Thermal & AI Systems */}
      <Grid numItemsSm={1} numItemsLg={2} className="gap-6">
        {/* Thermal System */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ThermalSystem data={data} />
        </motion.div>

        {/* AI Load Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <AILoadManagement data={data} />
        </motion.div>
      </Grid>

      {/* Weather Intelligence & Efficiency */}
      <Grid numItemsSm={1} numItemsLg={2} className="gap-6">
        {/* Weather Intelligence */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <WeatherIntelligence data={data} />
        </motion.div>

        {/* Efficiency Dashboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <EfficiencyDashboard data={data} />
        </motion.div>
      </Grid>

      {/* Advanced Monitoring Systems */}
      <Grid numItemsSm={1} numItemsLg={2} className="gap-6">
        {/* Turbine Monitoring */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <TurbineMonitoring data={data} />
        </motion.div>

        {/* Power Conversion */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <PowerConversion data={data} />
        </motion.div>
      </Grid>

      {/* Predictive Analytics */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <PredictiveAnalytics data={data} />
      </motion.div>

      {/* System Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        <SystemAlerts data={data} />
      </motion.div>

      {/* Footer */}
      <Card className="mt-8">
        <Flex justifyContent="between" alignItems="center">
          <Text className="text-sm text-gray-500">
            AI-Enhanced Microgrid Dashboard v2.0 | Last Updated: {currentTime.toLocaleTimeString()}
          </Text>
          <Badge color="emerald" size="sm">
            System Operational
          </Badge>
        </Flex>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation 
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onLogout={handleLogout}
          userRole={user?.role || 'admin'}
          onShowDemoAccounts={() => setShowDemoAccounts(true)}
          currentUser={user || { username: 'Public User', role: 'admin' }}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader 
            currentTime={currentTime}
            systemStatus={data?.systemHealth || 'operational'}
            showFeatureTabs={currentPage === 'dashboard'}
          />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
            {renderPage()}
          </main>
        </div>

        {/* Demo Accounts Modal */}
        {showDemoAccounts && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <Title className="text-xl font-bold text-gray-900 dark:text-white">Demo Accounts</Title>
                    <Text className="text-gray-600 dark:text-gray-400 mt-1">Try different access levels</Text>
                  </div>
                  <button
                    onClick={() => setShowDemoAccounts(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-3">
                  {demoAccounts.map((account) => (
                    <motion.button
                      key={account.username}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleLogin(account)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all hover:shadow-lg ${
                        account.color === 'red' ? 'border-red-200 hover:border-red-300 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:border-red-800' :
                        account.color === 'blue' ? 'border-blue-200 hover:border-blue-300 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:border-blue-800' :
                        'border-green-200 hover:border-green-300 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:border-green-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              account.color === 'red' ? 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200' :
                              account.color === 'blue' ? 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200' :
                              'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200'
                            }`}>
                              {account.role.toUpperCase()}
                            </span>
                            <span className="font-semibold text-gray-900 dark:text-white">{account.username}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{account.description}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Password: {account.password}</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Current:</strong> {user?.username || 'Public User'} ({user?.role || 'admin'})
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                    You can switch between accounts anytime or continue as public user
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
