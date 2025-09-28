"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
  role: 'admin' | 'operator' | 'viewer';
  name: string;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { username: string; password: string; role: string }) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const rolePermissions = {
  admin: [
    'view_dashboard',
    'view_solar',
    'view_battery',
    'view_thermal',
    'view_turbine',
    'view_power',
    'view_grid',
    'view_ai_load',
    'view_weather',
    'view_efficiency',
    'view_analytics',
    'view_ai_predictions',
    'view_alerts',
    'manage_system',
    'configure_settings',
    'manage_users'
  ],
  operator: [
    'view_dashboard',
    'view_solar',
    'view_battery',
    'view_thermal',
    'view_turbine',
    'view_power',
    'view_grid',
    'view_ai_load',
    'view_weather',
    'view_efficiency',
    'view_analytics',
    'view_ai_predictions',
    'view_alerts',
    'manage_system'
  ],
  viewer: [
    'view_dashboard',
    'view_solar',
    'view_battery',
    'view_thermal',
    'view_weather',
    'view_efficiency',
    'view_analytics',
    'view_alerts'
  ]
};

const demoUsers = [
  { 
    username: 'admin', 
    password: 'admin123', 
    role: 'admin' as const, 
    name: 'System Administrator',
    permissions: rolePermissions.admin
  },
  { 
    username: 'operator', 
    password: 'operator123', 
    role: 'operator' as const, 
    name: 'System Operator',
    permissions: rolePermissions.operator
  },
  { 
    username: 'viewer', 
    password: 'viewer123', 
    role: 'viewer' as const, 
    name: 'System Viewer',
    permissions: rolePermissions.viewer
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem('microgrid_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('microgrid_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: { username: string; password: string; role: string }): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = demoUsers.find(
      u => u.username === credentials.username && u.password === credentials.password
    );
    
    if (foundUser) {
      const userData: User = {
        username: foundUser.username,
        role: foundUser.role,
        name: foundUser.name,
        permissions: foundUser.permissions
      };
      
      setUser(userData);
      localStorage.setItem('microgrid_user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('microgrid_user');
  };

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) || false;
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    hasPermission,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { rolePermissions };
