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
  Activity
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
  const alerts = data?.alerts || [
    {
      id: 'demo_1',
      type: 'success',
      category: 'Performance',
      message: 'System efficiency exceeds 15% target',
      timestamp: new Date().toISOString(),
      severity: 'info'
    },
    {
      id: 'demo_2',
      type: 'info',
      category: 'Solar',
      message: 'Solar generation optimal for current conditions',
      timestamp: new Date().toISOString(),
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
      case 'power':
        return <Zap className="h-4 w-4" />;
      case 'thermal':
        return <Thermometer className="h-4 w-4" />;
      case 'performance':
        return <Activity className="h-4 w-4" />;
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
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const criticalAlerts = alerts.filter((alert: Alert) => alert.severity === 'critical');
  const warningAlerts = alerts.filter((alert: Alert) => alert.severity === 'warning');
  const infoAlerts = alerts.filter((alert: Alert) => alert.severity === 'info');

  return (
    <Card className="glass-card">
      <Flex alignItems="center" className="space-x-2 mb-4">
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
        <Title className="text-xl font-bold">System Alerts & Notifications</Title>
        <Badge 
          color={criticalAlerts.length > 0 ? 'red' : warningAlerts.length > 0 ? 'yellow' : 'green'} 
          size="sm"
        >
          {alerts.length} Active
        </Badge>
      </Flex>

      {/* Alert Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
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
            alerts.slice(0, 8).map((alert: Alert, index: number) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className={`p-4 rounded-lg border ${getAlertBgClass(alert.severity)}`}
              >
                <Flex alignItems="start" className="space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getAlertIcon(alert.type, alert.severity)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <Flex alignItems="center" className="space-x-2 mb-1">
                      {getCategoryIcon(alert.category)}
                      <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {alert.category}
                      </Text>
                      <Badge color={getAlertColor(alert.severity)} size="xs">
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </Flex>
                    
                    <Text className="text-sm text-gray-800 dark:text-gray-200 mb-2">
                      {alert.message}
                    </Text>
                    
                    <Flex alignItems="center" className="space-x-2">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <Text className="text-xs text-gray-500">
                        {formatTimestamp(alert.timestamp)}
                      </Text>
                    </Flex>
                  </div>
                </Flex>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Alert Actions */}
      {alerts.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Flex justifyContent="between" alignItems="center">
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              Showing {Math.min(8, alerts.length)} of {alerts.length} alerts
            </Text>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors"
              >
                View All
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900/40 transition-colors"
              >
                Clear All
              </motion.button>
            </div>
          </Flex>
        </div>
      )}
    </Card>
  );
}
