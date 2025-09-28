"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Sun, 
  Battery, 
  Thermometer, 
  Brain, 
  Cloud, 
  Cog, 
  Zap, 
  TrendingUp,
  AlertTriangle,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Shield,
  BarChart3,
  Activity,
  Grid3X3,
  Gauge,
  LineChart,
  Cpu,
  CloudRain,
  Target,
  Bell,
  Users,
  Lock
} from 'lucide-react';
import { Badge } from '@tremor/react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
  userRole: string;
  onShowDemoAccounts: () => void;
  currentUser: { username: string; role: string };
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard Overview', icon: Home, color: 'blue' },
  { id: 'solar', label: 'Solar Generation', icon: Sun, color: 'orange' },
  { id: 'battery', label: 'Battery Storage', icon: Battery, color: 'green' },
  { id: 'thermal', label: 'Thermal Management', icon: Thermometer, color: 'red' },
  { id: 'turbine', label: 'Turbine Operations', icon: Gauge, color: 'blue' },
  { id: 'power', label: 'Power Electronics', icon: Cpu, color: 'purple' },
  { id: 'grid-shift', label: 'Grid Management', icon: Grid3X3, color: 'red' },
  { id: 'ai-load', label: 'Load Intelligence', icon: Brain, color: 'purple' },
  { id: 'weather', label: 'Weather Analytics', icon: CloudRain, color: 'cyan' },
  { id: 'efficiency', label: 'Performance Metrics', icon: Target, color: 'green' },
  { id: 'analytics', label: 'Predictive Analytics', icon: LineChart, color: 'indigo' },
  { id: 'alerts', label: 'Alert Management', icon: Bell, color: 'yellow' },
];

export function Navigation({ currentPage, onPageChange, onLogout, userRole, onShowDemoAccounts, currentUser }: NavigationProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const allMenuItems = menuItems;

  const sidebarVariants = {
    expanded: { width: '280px' },
    collapsed: { width: '80px' }
  };

  const itemVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -20 }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.button>
      </div>

      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        className={`fixed left-0 top-0 h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 z-30 shadow-xl ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } transition-transform duration-300`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <motion.div
                  variants={itemVariants}
                  animate={isCollapsed ? 'collapsed' : 'expanded'}
                  className="flex items-center space-x-3"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-gray-900 dark:text-white">Microgrid</h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Control Center</p>
                  </div>
                </motion.div>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Menu className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-3">
              {allMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onPageChange(item.id);
                      setIsMobileOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? `text-${item.color}-500` : ''}`} />
                    
                    {!isCollapsed && (
                      <motion.div
                        variants={itemVariants}
                        animate={isCollapsed ? 'collapsed' : 'expanded'}
                        className="flex-1 text-left"
                      >
                        <span className="text-sm font-medium">{item.label}</span>
                      </motion.div>
                    )}
                    
                    {isActive && !isCollapsed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>
          </div>

          {/* User Profile & Controls */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="space-y-2">
              {!isCollapsed && (
                <motion.div
                  variants={itemVariants}
                  animate={isCollapsed ? 'collapsed' : 'expanded'}
                  className="flex items-center space-x-3 px-3 py-2"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentUser.username === 'Public User' 
                      ? 'bg-gradient-to-br from-gray-400 to-gray-600' 
                      : 'bg-gradient-to-br from-green-400 to-blue-500'
                  }`}>
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {currentUser.username}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        color={currentUser.username === 'Public User' ? 'gray' : 'green'} 
                        size="xs"
                      >
                        {userRole}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {currentUser.username === 'Public User' ? 'Guest' : 'Online'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Demo Accounts Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onShowDemoAccounts}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <Users className="h-5 w-5" />
                {!isCollapsed && <span className="text-sm font-medium">Demo Accounts</span>}
              </motion.button>
              
              {/* Logout/Reset Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onLogout}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                {!isCollapsed && (
                  <span className="text-sm font-medium">
                    {currentUser.username === 'Public User' ? 'Reset' : 'Logout'}
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Demo Accounts Floating Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-30">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onShowDemoAccounts}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg flex items-center space-x-2"
        >
          <Users className="h-5 w-5" />
          <span className="text-sm font-medium">Demo</span>
        </motion.button>
      </div>

      {/* Main Content Spacer */}
      <div className={`${isCollapsed ? 'lg:ml-20' : 'lg:ml-70'} transition-all duration-300`} />
    </>
  );
}
