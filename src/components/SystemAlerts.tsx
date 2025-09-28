"use client";

import { Card, Title, Text, Flex, Badge } from '@tremor/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  XCircle, 
  Clock,
  Zap,
  Battery,
  Thermometer,
  Activity,
  Grid3X3,
  Gauge,
  Brain,
  CloudRain,
  Settings,
  Cpu
} from 'lucide-react';

interface Alert {
  id: string;
  type: string;
  category: string;
  message: string;
  timestamp: string;
  severity: string;
}

interface SystemAlertsProps {
  data: any;
}

export function SystemAlerts({ data }: SystemAlertsProps) {
  // Comprehensive alert data matching the bell notification system
  const alerts = data?.alerts || [
    {
      id: 'alert_1',
      type: 'critical',
      category: 'Battery',
      message: 'Battery SOC critically low: 18% - Immediate action required',
      timestamp: new Date(Date.now() - 1 * 60 * 1000).toISOString(), // 1 min ago
      severity: 'critical'
    },
    {
      id: 'alert_2',
      type: 'warning',
      category: 'Thermal',
      message: 'Thermal system temperature elevated: 485°C',
      timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 min ago
      severity: 'warning'
    },
    {
      id: 'alert_3',
      type: 'warning',
      category: 'Solar',
      message: 'Solar generation below expected: 18.2kW (Expected: 24kW)',
      timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(), // 3 min ago
      severity: 'warning'
    },
    {
      id: 'alert_4',
      type: 'critical',
      category: 'Grid',
      message: 'Grid connection lost - Switching to islanded mode',
      timestamp: new Date(Date.now() - 4 * 60 * 1000).toISOString(), // 4 min ago
      severity: 'critical'
    },
    {
      id: 'alert_5',
      type: 'warning',
      category: 'Turbine',
      message: 'Turbine vibration levels elevated: 2.8 mm/s',
      timestamp: new Date(Date.now() - 6 * 60 * 1000).toISOString(), // 6 min ago
      severity: 'warning'
    },
    {
      id: 'alert_6',
      type: 'success',
      category: 'AI System',
      message: 'AI load optimization cycle completed successfully',
      timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(), // 8 min ago
      severity: 'info'
    },
    {
      id: 'alert_7',
      type: 'warning',
      category: 'Weather',
      message: 'Weather forecast: 70% cloud cover expected in 2 hours',
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 min ago
      severity: 'warning'
    },
    {
      id: 'alert_8',
      type: 'info',
      category: 'Maintenance',
      message: 'Predictive maintenance scheduled for TEG system',
      timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(), // 12 min ago
      severity: 'info'
    },
    {
      id: 'alert_9',
      type: 'warning',
      category: 'Power',
      message: 'Inverter efficiency dropped to 96.8% - Check cooling system',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 min ago
      severity: 'warning'
    },
    {
      id: 'alert_10',
      type: 'success',
      category: 'Performance',
      message: 'System efficiency exceeds 22% target - Optimal operation',
      timestamp: new Date(Date.now() - 18 * 60 * 1000).toISOString(), // 18 min ago
      severity: 'info'
    }
  ];

  const getAlertIcon = (type: string, severity: string) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return type === 'success' ? 
          <CheckCircle className="h-5 w-5 text-green-500" /> : 
          <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'battery':
        return <Battery className="h-4 w-4" />;
      case 'solar':
        return <Zap className="h-4 w-4" />;
      case 'power':
        return <Cpu className="h-4 w-4" />;
      case 'thermal':
        return <Thermometer className="h-4 w-4" />;
      case 'performance':
        return <Activity className="h-4 w-4" />;
      case 'grid':
        return <Grid3X3 className="h-4 w-4" />;
      case 'turbine':
        return <Gauge className="h-4 w-4" />;
      case 'ai system':
        return <Brain className="h-4 w-4" />;
      case 'weather':
        return <CloudRain className="h-4 w-4" />;
      case 'maintenance':
        return <Settings className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'red';
      case 'warning':
        return 'yellow';
      case 'info':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const getAlertBgClass = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800';
      case 'warning':
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800';
      case 'info':
        return 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-200 dark:border-gray-800';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const criticalAlerts = alerts.filter((alert: Alert) => alert.severity === 'critical');
  const warningAlerts = alerts.filter((alert: Alert) => alert.severity === 'warning');
  const infoAlerts = alerts.filter((alert: Alert) => alert.severity === 'info');

  return (
    <Card className="glass-card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 mb-6">
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ 
              scale: criticalAlerts.length > 0 ? [1, 1.1, 1] : 1,
              rotate: criticalAlerts.length > 0 ? [0, 5, -5, 0] : 0
            }}
            transition={{ 
              duration: criticalAlerts.length > 0 ? 2 : 0, 
              repeat: criticalAlerts.length > 0 ? Infinity : 0 
            }}
          >
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
          </motion.div>
          <Title className="text-lg sm:text-xl font-bold">System Alerts & Notifications</Title>
        </div>
        <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
          <Badge 
            color={criticalAlerts.length > 0 ? 'red' : 'gray'} 
            size="sm"
          >
            {criticalAlerts.length} Critical
          </Badge>
          <Badge 
            color={warningAlerts.length > 0 ? 'yellow' : 'gray'} 
            size="sm"
          >
            {warningAlerts.length} Warning
          </Badge>
          <Badge 
            color={infoAlerts.length > 0 ? 'green' : 'gray'} 
            size="sm"
          >
            {infoAlerts.length} Info
          </Badge>
        </div>
      </div>

      {/* Alert Summary - Mobile Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-4 rounded-lg border ${criticalAlerts.length > 0 ? 
            'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800' :
            'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-200 dark:border-gray-800'
          }`}
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <XCircle className={`h-4 w-4 ${criticalAlerts.length > 0 ? 'text-red-500' : 'text-gray-400'}`} />
            <Text className="text-sm font-medium">Critical</Text>
          </Flex>
          <Text className={`text-2xl font-bold ${criticalAlerts.length > 0 ? 'text-red-600' : 'text-gray-500'}`}>
            {criticalAlerts.length}
          </Text>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-4 rounded-lg border ${warningAlerts.length > 0 ? 
            'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800' :
            'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-200 dark:border-gray-800'
          }`}
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <AlertTriangle className={`h-4 w-4 ${warningAlerts.length > 0 ? 'text-yellow-500' : 'text-gray-400'}`} />
            <Text className="text-sm font-medium">Warning</Text>
          </Flex>
          <Text className={`text-2xl font-bold ${warningAlerts.length > 0 ? 'text-yellow-600' : 'text-gray-500'}`}>
            {warningAlerts.length}
          </Text>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-4 rounded-lg border ${infoAlerts.length > 0 ? 
            'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800' :
            'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-200 dark:border-gray-800'
          }`}
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <CheckCircle className={`h-4 w-4 ${infoAlerts.length > 0 ? 'text-green-500' : 'text-gray-400'}`} />
            <Text className="text-sm font-medium">Info/Success</Text>
          </Flex>
          <Text className={`text-2xl font-bold ${infoAlerts.length > 0 ? 'text-green-600' : 'text-gray-500'}`}>
            {infoAlerts.length}
          </Text>
        </motion.div>
      </div>

      {/* Alert List */}
      <div className="space-y-3">
        <Title className="text-lg">Recent Alerts</Title>
        
        <AnimatePresence>
          {alerts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
              <Text className="text-lg font-medium text-green-600">All Systems Normal</Text>
              <Text className="text-sm text-gray-500">No active alerts or warnings</Text>
            </motion.div>
          ) : (
            alerts.map((alert: Alert, index: number) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className={`p-3 sm:p-4 rounded-lg border ${getAlertBgClass(alert.severity)} border-l-4`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
                  <div className="flex items-center space-x-3 sm:flex-col sm:space-x-0 sm:space-y-1">
                    <div className="flex-shrink-0">
                      {getAlertIcon(alert.type, alert.severity)}
                    </div>
                    <div className="sm:hidden">
                      <Badge color={getAlertColor(alert.severity)} size="xs">
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <div className="flex items-center space-x-2 mb-1 sm:mb-0">
                        {getCategoryIcon(alert.category)}
                        <Text className="text-sm font-semibold text-gray-900 dark:text-white">
                          {alert.category}
                        </Text>
                        <div className="hidden sm:block">
                          <Badge color={getAlertColor(alert.severity)} size="xs">
                            {alert.severity.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{formatTimestamp(alert.timestamp)}</span>
                      </div>
                    </div>
                    
                    <Text className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                      {alert.message}
                    </Text>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Alert Actions - Mobile Responsive */}
      {alerts.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
            <div className="text-center sm:text-left">
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Showing all {alerts.length} alerts
              </Text>
              <Text className="text-xs text-gray-500 dark:text-gray-500">
                {criticalAlerts.length} critical, {warningAlerts.length} warning, {infoAlerts.length} info
              </Text>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-4 py-2 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors font-medium"
              >
                Export Alerts
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-4 py-2 text-sm bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-900/40 transition-colors font-medium"
              >
                Mark All Read
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
