'use client';

import { Card, Title, Text, Flex, Badge, Metric, ProgressBar, Grid } from '@tremor/react';
import { motion } from 'framer-motion';
import { 
  Sun, Battery, Thermometer, Gauge, Cpu, Grid3X3, Brain, CloudRain, 
  Activity, AlertTriangle, Zap, LineChart, Settings, Users, Shield, Clock,
  TrendingUp, BarChart3, Lightbulb, Wifi, Target, Wind, Droplets, 
  Power, Layers, Database, Monitor, Flame
} from 'lucide-react';

interface DashboardCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  metrics: {
    value: string | number;
    label: string;
    status: 'good' | 'warning' | 'critical';
  }[];
  onCardClick: (id: string) => void;
}

const DashboardCard = ({ 
  id, 
  title, 
  description, 
  icon: Icon, 
  color, 
  metrics, 
  onCardClick 
}: DashboardCardProps) => {
  const statusColors = {
    good: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    critical: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
  };

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      className="h-full"
    >
      <Card 
        className="h-full cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-opacity-50"
        onClick={() => onCardClick(id)}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className={`inline-flex items-center justify-center p-2 rounded-lg mb-3 ${statusColors[metrics[0]?.status || 'good']}`}>
              <Icon className="h-5 w-5" />
            </div>
            <Title className="text-lg font-semibold">{title}</Title>
            <Text className="text-sm text-gray-500 mt-1">{description}</Text>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-gray-500">{metric.label}</span>
              <span className={`font-medium ${
                metric.status === 'good' ? 'text-green-600 dark:text-green-400' :
                metric.status === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                'text-red-600 dark:text-red-400'
              }`}>
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

interface DashboardOverviewProps {
  onCardClick: (id: string) => void;
  currentTime: Date;
  systemStatus: string;
}

export function DashboardOverview({ onCardClick, currentTime, systemStatus }: DashboardOverviewProps) {
  const headerCards = [
    {
      id: 'ai-load',
      title: 'AI Load Management',
      subtitle: 'Smart optimization active',
      icon: Brain,
      color: 'bg-blue-500',
      accuracy: '94% accuracy forecasting'
    },
    {
      id: 'ai-predictions',
      title: 'AI Predictions',
      subtitle: '94% accuracy forecasting',
      icon: TrendingUp,
      color: 'bg-green-500',
      accuracy: '94% accuracy forecasting'
    },
    {
      id: 'weather',
      title: 'Weather Intelligence',
      subtitle: 'Real-time correlation',
      icon: CloudRain,
      color: 'bg-purple-500',
      accuracy: 'Real-time correlation'
    },
    {
      id: 'efficiency',
      title: 'System Optimization',
      subtitle: 'Continuous monitoring',
      icon: Settings,
      color: 'bg-orange-500',
      accuracy: 'Continuous monitoring'
    }
  ];

  const cards = [
    {
      id: 'solar',
      title: 'Solar Generation',
      description: 'PV performance & analytics',
      icon: Sun,
      color: 'orange',
      metrics: [
        { value: '24.5 kW', label: 'Current Output', status: 'good' as const },
        { value: '22.8%', label: 'Efficiency', status: 'good' as const },
        { value: 'Optimal', label: 'Status', status: 'good' as const }
      ]
    },
    {
      id: 'battery',
      title: 'Battery Storage (BESS)',
      description: 'Energy storage monitoring',
      icon: Battery,
      color: 'green',
      metrics: [
        { value: '78%', label: 'SOC Level', status: 'good' as const },
        { value: '42 kWh', label: 'Stored Energy', status: 'good' as const },
        { value: '35°C', label: 'Temperature', status: 'good' as const }
      ]
    },
    {
      id: 'thermal',
      title: 'Thermal System',
      description: 'Hot water & molten salts',
      icon: Thermometer,
      color: 'red',
      metrics: [
        { value: '485°C', label: 'Hot Water', status: 'warning' as const },
        { value: '520°C', label: 'Molten Salt', status: 'warning' as const },
        { value: 'Active', label: 'Status', status: 'good' as const }
      ]
    },
    {
      id: 'turbine',
      title: 'Steam Turbine',
      description: 'Turbine & condenser ops',
      icon: Gauge,
      color: 'blue',
      metrics: [
        { value: '18.2 kW', label: 'Power Output', status: 'good' as const },
        { value: '3200 RPM', label: 'Turbine Speed', status: 'good' as const },
        { value: '2.1 mm/s', label: 'Vibration', status: 'good' as const }
      ]
    },
    {
      id: 'power',
      title: 'Power Conversion',
      description: 'Inverter & hybrid control',
      icon: Cpu,
      color: 'purple',
      metrics: [
        { value: '98.2%', label: 'Inverter Eff.', status: 'good' as const },
        { value: '0.98', label: 'Power Factor', status: 'good' as const },
        { value: 'Optimal', label: 'Controller', status: 'good' as const }
      ]
    },
    {
      id: 'grid-shift',
      title: 'Grid Management',
      description: 'Auto grid shifting system',
      icon: Grid3X3,
      color: 'indigo',
      metrics: [
        { value: 'Islanded', label: 'Grid Status', status: 'good' as const },
        { value: '0.95', label: 'Power Factor', status: 'warning' as const },
        { value: 'Auto', label: 'Shift Mode', status: 'good' as const }
      ]
    },
    {
      id: 'ai-load',
      title: 'AI Load Management',
      description: 'Smart load optimization',
      icon: Brain,
      color: 'purple',
      metrics: [
        { value: '1.2 kW', label: 'Critical Load', status: 'good' as const },
        { value: '0.8 kW', label: 'Non-Critical', status: 'good' as const },
        { value: 'Active', label: 'AI Control', status: 'good' as const }
      ]
    },
    {
      id: 'weather',
      title: 'Weather Intelligence',
      description: 'Environmental monitoring',
      icon: CloudRain,
      color: 'cyan',
      metrics: [
        { value: '28°C', label: 'Temperature', status: 'good' as const },
        { value: '65%', label: 'Humidity', status: 'good' as const },
        { value: '40%', label: 'Cloud Cover', status: 'warning' as const }
      ]
    },
    {
      id: 'efficiency',
      title: 'System Efficiency',
      description: 'Performance metrics',
      icon: Target,
      color: 'green',
      metrics: [
        { value: '22.8%', label: 'Overall Eff.', status: 'good' as const },
        { value: '>15%', label: 'Target Met', status: 'good' as const },
        { value: 'Excellent', label: 'Health', status: 'good' as const }
      ]
    },
    {
      id: 'analytics',
      title: 'Predictive Analytics',
      description: 'AI-powered forecasting',
      icon: LineChart,
      color: 'indigo',
      metrics: [
        { value: '8.5h', label: 'Backup Time', status: 'good' as const },
        { value: '12%', label: 'Fault Risk', status: 'warning' as const },
        { value: '87%', label: 'Opt. Score', status: 'good' as const }
      ]
    },
    {
      id: 'ai-predictions',
      title: 'AI Predictions',
      description: 'Advanced ML forecasting',
      icon: Brain,
      color: 'purple',
      metrics: [
        { value: '94.2%', label: 'Accuracy', status: 'good' as const },
        { value: '8', label: 'Active Models', status: 'good' as const },
        { value: '12ms', label: 'Response Time', status: 'good' as const }
      ]
    },
    {
      id: 'alerts',
      title: 'System Alerts',
      description: 'Real-time monitoring',
      icon: AlertTriangle,
      color: 'red',
      metrics: [
        { value: '2', label: 'Active Alerts', status: 'warning' as const },
        { value: '15', label: 'Today Total', status: 'good' as const },
        { value: 'Live', label: 'Monitoring', status: 'good' as const }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Header matching the image design */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-xl p-6 shadow-lg text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center space-x-3 mb-4 lg:mb-0">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-yellow-300" />
              <div>
                <h1 className="text-2xl font-bold">AI-Enhanced Microgrid Dashboard</h1>
                <p className="text-blue-100 text-sm">Smart Energy Management & Monitoring System</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Wifi className="h-4 w-4" />
              <span className="text-sm">System Excellent</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} at {currentTime.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Header Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {headerCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.id}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="cursor-pointer"
                onClick={() => onCardClick(card.id)}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${card.color} bg-opacity-20`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{card.title}</h3>
                      <p className="text-xs text-blue-100 opacity-90">{card.subtitle}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Main Dashboard Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Complete Monitoring Systems</h2>
            <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Comprehensive real-time monitoring of all microgrid components
            </Text>
          </div>
          <div className="flex space-x-2">
            <Badge color="emerald" size="sm">
              12 Systems Active
            </Badge>
            <Badge color="blue" size="sm">
              All Operational
            </Badge>
          </div>
        </div>
        <Grid numItemsSm={1} numItemsMd={2} numItemsLg={4} className="gap-6">
          {cards.map((card) => (
            <DashboardCard 
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              icon={card.icon}
              color={card.color}
              metrics={card.metrics}
              onCardClick={onCardClick}
            />
          ))}
        </Grid>
      </div>
    </div>
  );
}
