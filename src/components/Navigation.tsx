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
  { id: 'ai-predictions', label: 'AI Predictions', icon: Brain, color: 'purple' },
  { id: 'alerts', label: 'Alert Management', icon: Bell, color: 'yellow' },
];

export function Navigation({ currentPage, onPageChange, onLogout, userRole }: NavigationProps) {
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
          className="p-3 bg-white shadow-lg rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          {isMobileOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
        </motion.button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-40 shadow-xl ${
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
              
              {/* Desktop collapse button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Menu className="h-5 w-5" />
              </motion.button>
              
              {/* Mobile close button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
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
                    className={`w-full flex items-center space-x-3 px-4 py-4 lg:py-3 rounded-lg transition-all duration-200 touch-manipulation ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700'
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

          {/* User Profile & Logout */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="space-y-2">
              {!isCollapsed && (
                <motion.div
                  variants={itemVariants}
                  animate={isCollapsed ? 'collapsed' : 'expanded'}
                  className="flex items-center space-x-3 px-3 py-2"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                    <div className="flex items-center space-x-2">
                      <Badge color="green" size="xs">{userRole}</Badge>
                      <span className="text-xs text-gray-500">Online</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onLogout}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Spacer */}
      <div className={`${isCollapsed ? 'lg:ml-20' : 'lg:ml-70'} transition-all duration-300`} />
    </>
  );
}
