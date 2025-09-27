"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Title, Text, Button } from '@tremor/react';
import { Eye, EyeOff, Lock, User, Zap, Shield, AlertTriangle } from 'lucide-react';

interface LoginFormProps {
  onLogin: (credentials: { username: string; password: string; role: string }) => void;
}

const demoUsers = [
  { username: 'admin', password: 'admin123', role: 'admin', name: 'System Administrator' },
  { username: 'operator', password: 'operator123', role: 'operator', name: 'System Operator' },
  { username: 'viewer', password: 'viewer123', role: 'viewer', name: 'System Viewer' },
];

export function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check credentials
    const user = demoUsers.find(u => u.username === username && u.password === password);
    
    if (user) {
      onLogin({
        username: user.username,
        password: user.password,
        role: user.role
      });
    } else {
      setError('Invalid username or password');
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = (user: typeof demoUsers[0]) => {
    setUsername(user.username);
    setPassword(user.password);
    setTimeout(() => {
      onLogin({
        username: user.username,
        password: user.password,
        role: user.role
      });
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Zap className="h-8 w-8 text-white" />
            </div>
          </motion.div>
          <Title className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Microgrid Control Center
          </Title>
          <Text className="text-gray-600 dark:text-gray-400">
            AI-Enhanced Energy Management System
          </Text>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass-card shadow-2xl">
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Shield className="h-5 w-5 text-blue-500" />
                <Title className="text-xl">Secure Login</Title>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2"
                >
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <Text className="text-red-700 dark:text-red-300 text-sm">{error}</Text>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
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
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-lg"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Authenticating...</span>
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </motion.div>
              </form>

              {/* Demo Accounts */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowDemo(!showDemo)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {showDemo ? 'Hide' : 'Show'} Demo Accounts
                </button>
                
                {showDemo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-2"
                  >
                    <Text className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                      Click to login with demo accounts:
                    </Text>
                    {demoUsers.map((user) => (
                      <motion.button
                        key={user.username}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleDemoLogin(user)}
                        className="w-full text-left p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <Text className="text-sm font-medium">{user.name}</Text>
                            <Text className="text-xs text-gray-500">
                              {user.username} / {user.password}
                            </Text>
                          </div>
                          <div className={`px-2 py-1 rounded text-xs font-medium ${
                            user.role === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' :
                            user.role === 'operator' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                            'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                          }`}>
                            {user.role}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <Text className="text-sm text-gray-500 dark:text-gray-400">
            Secure • Reliable • AI-Powered
          </Text>
          <Text className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            © 2024 Microgrid Solutions. All rights reserved.
          </Text>
        </motion.div>
      </div>
    </div>
  );
}
