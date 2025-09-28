"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Title, Text, Button, Badge } from '@tremor/react';
import { 
  Eye, EyeOff, Lock, User, Zap, Shield, AlertTriangle, 
  CheckCircle, Cpu, Activity, BarChart3, Users, Settings,
  Sun, Battery, Thermometer, Brain
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const features = [
  {
    icon: Sun,
    title: 'Solar Monitoring',
    description: 'Real-time PV performance tracking'
  },
  {
    icon: Battery,
    title: 'Battery Management',
    description: 'Advanced BESS monitoring & control'
  },
  {
    icon: Brain,
    title: 'AI Predictions',
    description: 'Machine learning forecasting'
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Comprehensive system insights'
  }
];

const demoUsers = [
  { 
    username: 'admin', 
    password: 'admin123', 
    role: 'admin', 
    name: 'System Administrator',
    description: 'Full system access & management',
    color: 'red'
  },
  { 
    username: 'operator', 
    password: 'operator123', 
    role: 'operator', 
    name: 'System Operator',
    description: 'Operational control & monitoring',
    color: 'blue'
  },
  { 
    username: 'viewer', 
    password: 'viewer123', 
    role: 'viewer', 
    name: 'System Viewer',
    description: 'Read-only dashboard access',
    color: 'green'
  },
];

export function EnhancedLoginPage() {
  const { login, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login({ username, password, role: '' });
    
    if (success) {
      setLoginSuccess(true);
    } else {
      setError('Invalid username or password');
    }
  };

  const handleDemoLogin = async (user: typeof demoUsers[0]) => {
    setUsername(user.username);
    setPassword(user.password);
    setError('');
    
    const success = await login({
      username: user.username,
      password: user.password,
      role: user.role
    });
    
    if (success) {
      setLoginSuccess(true);
    }
  };

  if (loginSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          </motion.div>
          <Title className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Login Successful!
          </Title>
          <Text className="text-gray-600 dark:text-gray-400">
            Redirecting to dashboard...
          </Text>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="flex min-h-screen">
        {/* Left Side - Features */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-3 mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="h-12 w-12 text-yellow-300" />
                </motion.div>
                <div>
                  <Title className="text-4xl font-bold text-white">
                    AI-Enhanced Microgrid
                  </Title>
                  <Text className="text-blue-100 text-lg">
                    Smart Energy Management System
                  </Text>
                </div>
              </div>

              <div className="space-y-6 mb-12">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <Text className="font-semibold text-white">{feature.title}</Text>
                        <Text className="text-blue-100 text-sm">{feature.description}</Text>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center space-x-2 mb-3">
                  <Activity className="h-5 w-5" />
                  <Text className="font-semibold">System Status</Text>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Text className="text-blue-100">Uptime</Text>
                    <Text className="font-semibold">99.9%</Text>
                  </div>
                  <div>
                    <Text className="text-blue-100">Active Users</Text>
                    <Text className="font-semibold">24/7</Text>
                  </div>
                  <div>
                    <Text className="text-blue-100">Data Points</Text>
                    <Text className="font-semibold">1M+</Text>
                  </div>
                  <div>
                    <Text className="text-blue-100">AI Models</Text>
                    <Text className="font-semibold">8 Active</Text>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 lg:hidden"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <Title className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Microgrid Control
              </Title>
              <Text className="text-gray-600 dark:text-gray-400">
                AI-Enhanced Energy Management
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass-card shadow-2xl">
                <div className="p-8">
                  <div className="flex items-center space-x-2 mb-6">
                    <Shield className="h-6 w-6 text-blue-500" />
                    <Title className="text-2xl font-bold">Secure Login</Title>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-3"
                      >
                        <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
                        <Text className="text-red-700 dark:text-red-300">{error}</Text>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Username
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                          placeholder="Enter your username"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                          placeholder="Enter your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center space-x-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            <span>Authenticating...</span>
                          </div>
                        ) : (
                          'Sign In to Dashboard'
                        )}
                      </Button>
                    </motion.div>
                  </form>

                  {/* Demo Accounts */}
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setShowDemo(!showDemo)}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      {showDemo ? 'Hide' : 'Show'} Demo Accounts
                    </button>
                    
                    <AnimatePresence>
                      {showDemo && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 space-y-3"
                        >
                          <Text className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Click any account below to login instantly:
                          </Text>
                          {demoUsers.map((user) => (
                            <motion.button
                              key={user.username}
                              whileHover={{ scale: 1.02, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleDemoLogin(user)}
                              disabled={isLoading}
                              className="w-full text-left p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-600"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    <Users className="h-5 w-5 text-gray-500" />
                                    <Text className="font-semibold text-gray-900 dark:text-white">
                                      {user.name}
                                    </Text>
                                  </div>
                                  <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    {user.description}
                                  </Text>
                                  <Text className="text-xs text-gray-500 dark:text-gray-500 font-mono">
                                    {user.username} / {user.password}
                                  </Text>
                                </div>
                                <Badge color={user.color as any} size="sm">
                                  {user.role}
                                </Badge>
                              </div>
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-8"
            >
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Activity className="h-4 w-4" />
                  <span>Reliable</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Brain className="h-4 w-4" />
                  <span>AI-Powered</span>
                </div>
              </div>
              <Text className="text-xs text-gray-400 dark:text-gray-500">
                © 2024 Microgrid Solutions. All rights reserved.
              </Text>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
