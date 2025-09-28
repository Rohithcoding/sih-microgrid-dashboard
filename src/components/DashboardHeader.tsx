"use client";

import { useState, useEffect } from 'react';
import { Card, Title, Text, Flex, Badge, Metric, ProgressBar } from '@tremor/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Activity, 
  Clock, 
  Wifi, 
  Brain, 
  Cloud, 
  TrendingUp, 
  Battery,
  Sun,
  Thermometer,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';

interface DashboardHeaderProps {
  currentTime: Date;
  systemStatus: string;
  showFeatureTabs?: boolean;
}

interface TabData {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  details: {
    title: string;
    metrics: Array<{
      label: string;
      value: string;
      unit?: string;
      status: 'good' | 'warning' | 'critical';
    }>;
    description: string;
  };
}

const tabsData: TabData[] = [
  {
    id: 'ai-load',
    label: 'AI Load Management',
    icon: Brain,
    color: 'purple',
    details: {
      title: 'AI Load Management System',
      metrics: [
        { label: 'Current Load', value: '1.4', unit: 'kW', status: 'good' },
        { label: 'Optimization Score', value: '87', unit: '%', status: 'good' },
        { label: 'Critical Load', value: '0.8', unit: 'kW', status: 'good' },
        { label: 'Non-Critical Load', value: '0.6', unit: 'kW', status: 'good' }
      ],
      description: 'AI system is actively optimizing load distribution and predicting demand patterns with 94% accuracy.'
    }
  },
  {
    id: 'energy-prediction',
    label: 'Energy Prediction',
    icon: TrendingUp,
    color: 'blue',
    details: {
      title: 'Energy Forecasting & Prediction',
      metrics: [
        { label: 'Next Hour Solar', value: '2.1', unit: 'kW', status: 'good' },
        { label: 'Battery Runtime', value: '8.5', unit: 'hrs', status: 'good' },
        { label: 'Load Forecast', value: '1.6', unit: 'kW', status: 'good' },
        { label: 'Prediction Accuracy', value: '94.2', unit: '%', status: 'good' }
      ],
      description: 'Advanced ML models provide accurate energy forecasting for optimal system planning and operation.'
    }
  },
  {
    id: 'weather-intelligence',
    label: 'Weather Intelligence',
    icon: Cloud,
    color: 'cyan',
    details: {
      title: 'Weather Intelligence & Correlation',
      metrics: [
        { label: 'Current Temperature', value: '28', unit: '°C', status: 'good' },
        { label: 'Cloud Cover', value: '40', unit: '%', status: 'good' },
        { label: 'Solar Impact', value: 'Medium', unit: '', status: 'warning' },
        { label: 'Wind Speed', value: '7', unit: 'm/s', status: 'good' }
      ],
      description: 'Real-time weather data correlation with solar generation and system performance optimization.'
    }
  },
  {
    id: 'system-optimization',
    label: 'System Optimization',
    icon: Activity,
    color: 'green',
    details: {
      title: 'Continuous System Optimization',
      metrics: [
        { label: 'Overall Efficiency', value: '18.5', unit: '%', status: 'good' },
        { label: 'Solar Efficiency', value: '18.5', unit: '%', status: 'good' },
        { label: 'Battery Health', value: '98', unit: '%', status: 'good' },
        { label: 'System Uptime', value: '99.9', unit: '%', status: 'good' }
      ],
      description: 'Continuous monitoring and optimization ensuring peak performance across all microgrid components.'
    }
  }
];

export function DashboardHeader({ currentTime, systemStatus, showFeatureTabs = false }: DashboardHeaderProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [alerts, setAlerts] = useState<Array<{ id: string; message: string; severity: string; category: string; timestamp: string }>>([]);
  const [showAlerts, setShowAlerts] = useState(false);

  // Fetch alerts from API every 5 seconds with graceful fallback examples
  useEffect(() => {
    let mounted = true;
    const sampleAlerts = () => ([
      {
        id: 'sample_efficiency_low',
        message: 'System efficiency below optimal threshold (22%).',
        severity: 'warning',
        category: 'Performance',
        timestamp: new Date().toISOString(),
      },
      {
        id: 'sample_energy_deficit',
        message: 'Energy deficit detected: Load exceeds generation by 0.45 kW.',
        severity: 'warning',
        category: 'Load Management',
        timestamp: new Date().toISOString(),
      },
      {
        id: 'sample_grid_connected',
        message: 'Connected to utility grid. Supply stabilized.',
        severity: 'info',
        category: 'Grid Shift',
        timestamp: new Date().toISOString(),
      },
    ]);

    const fetchAlerts = async () => {
      try {
        const res = await fetch('/api/microgrid-data', { cache: 'no-store' });
        const json = await res.json();
        if (!mounted) return;
        const apiAlerts = Array.isArray(json?.alerts) ? json.alerts : [];
        setAlerts((apiAlerts.length ? apiAlerts : sampleAlerts()).slice(0, 6));
      } catch (e) {
        if (!mounted) return;
        setAlerts(sampleAlerts());
      }
    };

    fetchAlerts();
    const id = setInterval(fetchAlerts, 5000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'emerald';
      case 'warning': return 'yellow';
      case 'critical': return 'red';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <Activity className="h-4 w-4" />;
      case 'warning': return <Activity className="h-4 w-4" />;
      case 'critical': return <Activity className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getMetricStatusColor = (status: 'good' | 'warning' | 'critical') => {
    switch (status) {
      case 'good': return 'text-green-600 dark:text-green-400';
      case 'warning': return 'text-yellow-600 dark:text-yellow-400';
      case 'critical': return 'text-red-600 dark:text-red-400';
    }
  };

  const handleTabClick = (tabId: string) => {
    if (activeTab === tabId) {
      setActiveTab(null);
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="gradient-bg text-white border-0 shadow-2xl">
        <div className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="relative z-10">
            <Flex justifyContent="between" alignItems="center" className="mb-4">
              <div className="flex-1 min-w-0">
                <Flex alignItems="center" className="space-x-2 sm:space-x-3 mb-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-300" />
                  </motion.div>
                  <div className="min-w-0 flex-1">
                    <Title className="text-lg sm:text-2xl lg:text-3xl font-bold text-white mb-1 truncate">
                      AI-Enhanced Microgrid Dashboard
                    </Title>
                    <Text className="text-blue-100 text-sm sm:text-base lg:text-lg hidden sm:block">
                      Smart Energy Management & Monitoring System
                    </Text>
                    <Text className="text-blue-100 text-xs sm:hidden">
                      Smart Energy Management
                    </Text>
                  </div>
                </Flex>
              </div>
              
              <div className="text-right space-y-2">
                <div className="flex w-full flex-row justify-end items-center space-x-3 relative">
                  <Wifi className="h-4 w-4 text-green-300" />

                  {/* Alerts bell */}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAlerts((s) => !s)}
                      className="relative p-2 rounded-lg hover:bg-white/10 border border-white/20"
                      aria-label="View alerts"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.3 21a1.7 1.7 0 0 0 3.4 0" />
                      </svg>
                      {alerts.length > 0 && (
                        <span className="absolute -top-1 -right-1 inline-flex h-4 min-w-4 px-1 items-center justify-center text-[10px] rounded-full bg-red-500 text-white">
                          {Math.min(alerts.length, 9)}
                        </span>
                      )}
                    </motion.button>

                    {/* Alerts dropdown */}
                    <AnimatePresence>
                      {showAlerts && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-80 sm:w-80 max-w-[90vw] bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50"
                        >
                          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">System Alerts</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Recent notifications</p>
                          </div>
                          <div className="max-h-80 overflow-auto py-2">
                            {alerts.map((a) => (
                              <div key={a.id} className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{a.category}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{a.message}</p>
                                    <p className="text-[10px] text-gray-400 mt-1">{new Date(a.timestamp).toLocaleTimeString()}</p>
                                  </div>
                                  <span className={`ml-3 px-2 py-0.5 text-[10px] rounded-full ${
                                    a.severity === 'critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300' :
                                    a.severity === 'warning' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300' :
                                    'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                                  }`}>
                                    {a.severity}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-800 text-right">
                            <button onClick={() => setShowAlerts(false)} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Close</button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Badge color={getStatusColor(systemStatus)} size="lg">
                    <Flex alignItems="center" className="space-x-1">
                      {getStatusIcon(systemStatus)}
                      <span>System {systemStatus.charAt(0).toUpperCase() + systemStatus.slice(1)}</span>
                    </Flex>
                  </Badge>
                </div>

                <Flex alignItems="center" justifyContent="end" className="space-x-2">
                  <Clock className="h-4 w-4 text-blue-200" />
                  <Text className="text-blue-100 font-medium text-xs sm:text-sm">
                    <span className="hidden sm:inline">
                      {currentTime.toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      })}
                    </span>
                    <span className="sm:hidden">
                      {currentTime.toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </Text>
                </Flex>
              </div>
            </Flex>
            
            {/* Interactive Feature Tabs - Only show on dashboard */}
            {showFeatureTabs && (
              <div className="mt-6">
                {/* Mobile Toggle Button */}
                <div className="md:hidden mb-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="w-full bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 flex items-center justify-between"
                  >
                    <Text className="text-blue-100 text-sm font-medium">System Features</Text>
                    {isMobileMenuOpen ? 
                      <ChevronUp className="h-4 w-4 text-white" /> : 
                      <ChevronDown className="h-4 w-4 text-white" />
                    }
                  </motion.button>
                </div>

                {/* Desktop Tabs / Mobile Dropdown */}
                <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${isMobileMenuOpen ? 'block' : 'hidden'} md:grid`}>
                  {tabsData.map((tab, index) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    
                    return (
                      <motion.div
                        key={tab.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTabClick(tab.id)}
                        className={`bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 cursor-pointer transition-all duration-200 ${
                          isActive ? 'bg-white/20 border-white/40 shadow-lg' : 'hover:bg-white/15'
                        }`}
                      >
                        <Flex alignItems="center" className="space-x-2 mb-2">
                          <Icon className="h-4 w-4 text-white" />
                          <Text className="text-blue-100 text-sm font-medium">{tab.label}</Text>
                          {isActive ? 
                            <ChevronUp className="h-3 w-3 text-white ml-auto" /> : 
                            <ChevronDown className="h-3 w-3 text-white ml-auto" />
                          }
                        </Flex>
                        <Text className="text-white text-xs">
                          {tab.id === 'ai-load' && 'Smart optimization active'}
                          {tab.id === 'energy-prediction' && '94% accuracy forecasting'}
                          {tab.id === 'weather-intelligence' && 'Real-time correlation'}
                          {tab.id === 'system-optimization' && 'Continuous monitoring'}
                        </Text>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Tab Details Modal/Expandable Section - Only show on dashboard */}
      <AnimatePresence>
        {showFeatureTabs && activeTab && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <Card className="glass-card border border-white/20 shadow-2xl">
              {(() => {
                const tab = tabsData.find(t => t.id === activeTab);
                if (!tab) return null;
                
                const Icon = tab.icon;
                
                return (
                  <div className="p-6">
                    {/* Header */}
                    <Flex alignItems="center" justifyContent="between" className="mb-6">
                      <Flex alignItems="center" className="space-x-3">
                        <div className={`p-3 rounded-lg bg-${tab.color}-100 dark:bg-${tab.color}-900/20`}>
                          <Icon className={`h-6 w-6 text-${tab.color}-600 dark:text-${tab.color}-400`} />
                        </div>
                        <div>
                          <Title className="text-2xl font-bold text-gray-900 dark:text-white">
                            {tab.details.title}
                          </Title>
                          <Text className="text-gray-600 dark:text-gray-400 mt-1">
                            {tab.details.description}
                          </Text>
                        </div>
                      </Flex>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setActiveTab(null)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <X className="h-5 w-5 text-gray-500" />
                      </motion.button>
                    </Flex>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      {tab.details.metrics.map((metric, index) => (
                        <motion.div
                          key={metric.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                        >
                          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {metric.label}
                          </Text>
                          <Flex alignItems="baseline" className="space-x-1">
                            <Metric className={`text-2xl font-bold ${getMetricStatusColor(metric.status)}`}>
                              {metric.value}
                            </Metric>
                            {metric.unit && (
                              <Text className="text-sm text-gray-500 dark:text-gray-400">
                                {metric.unit}
                              </Text>
                            )}
                          </Flex>
                          
                          {/* Status Indicator */}
                          <div className="mt-2">
                            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              metric.status === 'good' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                              metric.status === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                              'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                            }`}>
                              <div className={`w-2 h-2 rounded-full mr-1 ${
                                metric.status === 'good' ? 'bg-green-500' :
                                metric.status === 'warning' ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`} />
                              {metric.status === 'good' ? 'Normal' : 
                               metric.status === 'warning' ? 'Warning' : 'Critical'}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Additional Information */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <Flex alignItems="center" className="space-x-2 mb-2">
                        <Activity className="h-4 w-4 text-blue-500" />
                        <Text className="font-medium text-blue-800 dark:text-blue-200">System Status</Text>
                      </Flex>
                      <Text className="text-sm text-blue-700 dark:text-blue-300">
                        All systems operating within normal parameters. Real-time monitoring active with automatic alerts enabled.
                      </Text>
                    </div>
                  </div>
                );
              })()}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
