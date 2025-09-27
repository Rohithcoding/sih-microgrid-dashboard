"use client";

import { useState, useEffect } from 'react';
import { Card, Title, Text, Metric, Flex, Badge, ProgressBar } from '@tremor/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Power, 
  Zap, 
  AlertTriangle, 
  Shield, 
  Activity, 
  ArrowRightLeft,
  Battery,
  Sun,
  Grid3X3,
  CheckCircle,
  XCircle,
  Clock,
  Settings
} from 'lucide-react';

interface GridShiftingSystemProps {
  data: any;
}

interface GridStatus {
  isConnected: boolean;
  voltage: number;
  frequency: number;
  powerImport: number;
  powerExport: number;
  syncStatus: 'synchronized' | 'synchronizing' | 'disconnected';
}

interface LoadSheddingLevel {
  level: number;
  name: string;
  description: string;
  loadsAffected: string[];
  powerSaved: number;
}

const loadSheddingLevels: LoadSheddingLevel[] = [
  {
    level: 0,
    name: 'Normal Operation',
    description: 'All loads operational',
    loadsAffected: [],
    powerSaved: 0
  },
  {
    level: 1,
    name: 'Level 1 - Non-Critical',
    description: 'Disconnect non-essential loads',
    loadsAffected: ['Lighting (non-essential)', 'HVAC (comfort)', 'Entertainment systems'],
    powerSaved: 0.3
  },
  {
    level: 2,
    name: 'Level 2 - Moderate',
    description: 'Reduce moderate priority loads',
    loadsAffected: ['Water heating', 'Ventilation (partial)', 'Outdoor lighting'],
    powerSaved: 0.6
  },
  {
    level: 3,
    name: 'Level 3 - Critical Only',
    description: 'Emergency mode - critical loads only',
    loadsAffected: ['All non-critical systems', 'Backup systems only'],
    powerSaved: 1.2
  }
];

export function GridShiftingSystem({ data }: GridShiftingSystemProps) {
  const [gridStatus, setGridStatus] = useState<GridStatus>({
    isConnected: false,
    voltage: 230,
    frequency: 50.0,
    powerImport: 0,
    powerExport: 0,
    syncStatus: 'disconnected'
  });
  
  const [currentSheddingLevel, setCurrentSheddingLevel] = useState(0);
  const [isAutoShiftEnabled, setIsAutoShiftEnabled] = useState(true);
  const [shiftingInProgress, setShiftingInProgress] = useState(false);
  const [lastShiftTime, setLastShiftTime] = useState<Date | null>(null);

  // Calculate energy availability
  const totalGeneration = (data?.solarOutput || 0) + (data?.tegOutput || 0);
  const totalLoad = data?.totalLoad || 1.4;
  const batterySOC = data?.batterySOC || 75;
  const energyDeficit = totalLoad - totalGeneration;
  const isLowEnergy = totalGeneration < 0.5; // Less than 0.5kW generation
  const isBatteryLow = batterySOC < 30;
  const isEnergyShortage = energyDeficit > 0.5 || (isBatteryLow && isLowEnergy);

  // Auto grid shifting logic
  useEffect(() => {
    if (!isAutoShiftEnabled) return;

    const shouldShiftToGrid = isEnergyShortage || isLowEnergy;
    const shouldActivateLoadShedding = energyDeficit > 0.3;

    if (shouldShiftToGrid && !gridStatus.isConnected && !shiftingInProgress) {
      initiateGridShift();
    }

    if (shouldActivateLoadShedding) {
      const requiredLevel = energyDeficit > 1.0 ? 3 : energyDeficit > 0.6 ? 2 : 1;
      if (requiredLevel > currentSheddingLevel) {
        setCurrentSheddingLevel(requiredLevel);
      }
    } else if (currentSheddingLevel > 0 && !isEnergyShortage) {
      // Gradually restore loads when energy is available
      setTimeout(() => {
        setCurrentSheddingLevel(Math.max(0, currentSheddingLevel - 1));
      }, 5000);
    }
  }, [totalGeneration, totalLoad, batterySOC, isAutoShiftEnabled]);

  const initiateGridShift = async () => {
    setShiftingInProgress(true);
    setGridStatus(prev => ({ ...prev, syncStatus: 'synchronizing' }));
    
    // Simulate grid synchronization process
    setTimeout(() => {
      setGridStatus({
        isConnected: true,
        voltage: 230 + Math.random() * 10,
        frequency: 50.0 + (Math.random() - 0.5) * 0.2,
        powerImport: Math.max(0, energyDeficit),
        powerExport: 0,
        syncStatus: 'synchronized'
      });
      setShiftingInProgress(false);
      setLastShiftTime(new Date());
    }, 3000);
  };

  const disconnectFromGrid = () => {
    setGridStatus({
      isConnected: false,
      voltage: 0,
      frequency: 0,
      powerImport: 0,
      powerExport: 0,
      syncStatus: 'disconnected'
    });
  };

  const manualLoadShedding = (level: number) => {
    setCurrentSheddingLevel(level);
  };

  const getShiftingStatus = () => {
    if (shiftingInProgress) return { status: 'Shifting to Grid', color: 'yellow', icon: ArrowRightLeft };
    if (gridStatus.isConnected) return { status: 'Grid Connected', color: 'blue', icon: Grid3X3 };
    if (isEnergyShortage) return { status: 'Energy Shortage', color: 'red', icon: AlertTriangle };
    return { status: 'Microgrid Mode', color: 'green', icon: CheckCircle };
  };

  const shiftingStatusInfo = getShiftingStatus();
  const StatusIcon = shiftingStatusInfo.icon;

  return (
    <div className="space-y-6">
      {/* Main Grid Shifting Status */}
      <Card className="glass-card">
        <Flex alignItems="center" className="space-x-2 mb-4">
          <motion.div
            animate={{ 
              rotate: shiftingInProgress ? 360 : 0,
              scale: isEnergyShortage ? [1, 1.1, 1] : 1
            }}
            transition={{ 
              rotate: { duration: 2, repeat: shiftingInProgress ? Infinity : 0, ease: "linear" },
              scale: { duration: 1, repeat: Infinity }
            }}
          >
            <StatusIcon className={`h-6 w-6 text-${shiftingStatusInfo.color}-500`} />
          </motion.div>
          <Title className="text-xl font-bold">Automatic Grid Shifting System</Title>
          <Badge color={shiftingStatusInfo.color} size="sm">
            {shiftingStatusInfo.status}
          </Badge>
        </Flex>

        {/* Energy Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg border ${
              totalGeneration > 1 ? 
              'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' :
              'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
            }`}
          >
            <Flex alignItems="center" className="space-x-2 mb-2">
              <Sun className="h-4 w-4 text-orange-500" />
              <Text className="text-sm font-medium">Generation</Text>
            </Flex>
            <Metric className={`text-2xl font-bold ${
              totalGeneration > 1 ? 'text-green-600' : 'text-red-600'
            }`}>
              {totalGeneration.toFixed(2)} kW
            </Metric>
            <Text className="text-xs text-gray-600 mt-1">
              {isLowEnergy ? 'Low Generation' : 'Normal'}
            </Text>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg border ${
              energyDeficit <= 0 ? 
              'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' :
              'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
            }`}
          >
            <Flex alignItems="center" className="space-x-2 mb-2">
              <Activity className="h-4 w-4 text-blue-500" />
              <Text className="text-sm font-medium">Load Demand</Text>
            </Flex>
            <Metric className="text-2xl font-bold text-blue-600">
              {totalLoad.toFixed(2)} kW
            </Metric>
            <Text className="text-xs text-gray-600 mt-1">
              Deficit: {energyDeficit > 0 ? `+${energyDeficit.toFixed(2)}` : energyDeficit.toFixed(2)} kW
            </Text>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg border ${
              batterySOC > 50 ? 
              'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' :
              batterySOC > 30 ? 
              'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' :
              'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
            }`}
          >
            <Flex alignItems="center" className="space-x-2 mb-2">
              <Battery className="h-4 w-4 text-green-500" />
              <Text className="text-sm font-medium">Battery SOC</Text>
            </Flex>
            <Metric className={`text-2xl font-bold ${
              batterySOC > 50 ? 'text-green-600' : 
              batterySOC > 30 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {batterySOC}%
            </Metric>
            <Text className="text-xs text-gray-600 mt-1">
              {isBatteryLow ? 'Low Battery' : 'Normal'}
            </Text>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg border ${
              gridStatus.isConnected ? 
              'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' :
              'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800'
            }`}
          >
            <Flex alignItems="center" className="space-x-2 mb-2">
              <Grid3X3 className="h-4 w-4 text-blue-500" />
              <Text className="text-sm font-medium">Grid Import</Text>
            </Flex>
            <Metric className="text-2xl font-bold text-blue-600">
              {gridStatus.powerImport.toFixed(2)} kW
            </Metric>
            <Text className="text-xs text-gray-600 mt-1">
              {gridStatus.isConnected ? 'Connected' : 'Disconnected'}
            </Text>
          </motion.div>
        </div>

        {/* Grid Connection Status */}
        {gridStatus.isConnected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6"
          >
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <Title className="text-lg mb-3">Grid Connection Details</Title>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">Voltage</Text>
                  <Text className="text-lg font-bold text-blue-600">{gridStatus.voltage.toFixed(1)}V</Text>
                </div>
                <div>
                  <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">Frequency</Text>
                  <Text className="text-lg font-bold text-blue-600">{gridStatus.frequency.toFixed(2)}Hz</Text>
                </div>
                <div>
                  <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">Sync Status</Text>
                  <Badge color={gridStatus.syncStatus === 'synchronized' ? 'green' : 'yellow'} size="sm">
                    {gridStatus.syncStatus}
                  </Badge>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Control Buttons */}
        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAutoShiftEnabled(!isAutoShiftEnabled)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isAutoShiftEnabled 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
            }`}
          >
            <Flex alignItems="center" className="space-x-2">
              <Settings className="h-4 w-4" />
              <span>Auto Shift: {isAutoShiftEnabled ? 'ON' : 'OFF'}</span>
            </Flex>
          </motion.button>

          {!gridStatus.isConnected && !shiftingInProgress && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={initiateGridShift}
              className="px-4 py-2 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 rounded-lg font-medium transition-colors"
            >
              <Flex alignItems="center" className="space-x-2">
                <ArrowRightLeft className="h-4 w-4" />
                <span>Manual Grid Shift</span>
              </Flex>
            </motion.button>
          )}

          {gridStatus.isConnected && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={disconnectFromGrid}
              className="px-4 py-2 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 rounded-lg font-medium transition-colors"
            >
              <Flex alignItems="center" className="space-x-2">
                <XCircle className="h-4 w-4" />
                <span>Disconnect Grid</span>
              </Flex>
            </motion.button>
          )}
        </div>
      </Card>

      {/* Load Shedding Control */}
      <Card className="glass-card">
        <Flex alignItems="center" className="space-x-2 mb-4">
          <Shield className="h-6 w-6 text-orange-500" />
          <Title className="text-xl font-bold">Load Shedding Management</Title>
          <Badge color={currentSheddingLevel > 0 ? 'red' : 'green'} size="sm">
            Level {currentSheddingLevel}
          </Badge>
        </Flex>

        <div className="space-y-4">
          {loadSheddingLevels.map((level) => (
            <motion.div
              key={level.level}
              whileHover={{ scale: 1.01 }}
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                currentSheddingLevel === level.level
                  ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
                  : 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={() => manualLoadShedding(level.level)}
            >
              <Flex alignItems="center" justifyContent="between" className="mb-2">
                <div>
                  <Text className="font-medium text-gray-900 dark:text-white">{level.name}</Text>
                  <Text className="text-sm text-gray-600 dark:text-gray-400">{level.description}</Text>
                </div>
                <div className="text-right">
                  <Text className="text-sm font-medium">Power Saved</Text>
                  <Text className="text-lg font-bold text-orange-600">{level.powerSaved} kW</Text>
                </div>
              </Flex>
              
              {level.loadsAffected.length > 0 && (
                <div className="mt-3">
                  <Text className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Affected Systems:
                  </Text>
                  <div className="flex flex-wrap gap-1">
                    {level.loadsAffected.map((load, index) => (
                      <Badge key={index} color="gray" size="xs">
                        {load}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Card>

      {/* System Alerts */}
      <AnimatePresence>
        {(isEnergyShortage || shiftingInProgress) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="glass-card border-l-4 border-l-red-500">
              <Flex alignItems="center" className="space-x-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <Title className="text-lg text-red-700 dark:text-red-300">
                  {shiftingInProgress ? 'Grid Shifting in Progress' : 'Energy Shortage Alert'}
                </Title>
              </Flex>
              
              <div className="space-y-2">
                {shiftingInProgress && (
                  <Text className="text-sm text-gray-700 dark:text-gray-300">
                    🔄 Synchronizing with utility grid... ETA: 30 seconds
                  </Text>
                )}
                {isLowEnergy && (
                  <Text className="text-sm text-gray-700 dark:text-gray-300">
                    ⚡ Low energy generation detected ({totalGeneration.toFixed(2)} kW)
                  </Text>
                )}
                {isBatteryLow && (
                  <Text className="text-sm text-gray-700 dark:text-gray-300">
                    🔋 Battery SOC is low ({batterySOC}%) - Grid backup recommended
                  </Text>
                )}
                {energyDeficit > 0 && (
                  <Text className="text-sm text-gray-700 dark:text-gray-300">
                    📊 Energy deficit: {energyDeficit.toFixed(2)} kW - Load shedding level {currentSheddingLevel} active
                  </Text>
                )}
              </div>

              {lastShiftTime && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <Flex alignItems="center" className="space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <Text className="text-xs text-gray-500">
                      Last grid shift: {lastShiftTime.toLocaleTimeString()}
                    </Text>
                  </Flex>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
