import { useState, useEffect, useCallback } from 'react';

interface MicrogridData {
  timestamp: string;
  solarOutput: number;
  tegOutput: number;
  totalGeneration: number;
  irradiance: number;
  batterySOC: number;
  batteryVoltage: number;
  batteryTemp: number;
  chargingRate: number;
  criticalLoad: number;
  nonCriticalLoad: number;
  totalLoad: number;
  hotWaterTemp: number;
  tegHotTemp: number;
  tegColdTemp: number;
  steamPressure: number;
  weather: {
    temperature: number;
    humidity: number;
    cloudCover: number;
    windSpeed: number;
    pressure: number;
  };
  efficiency: number;
  systemHealth: string;
  aiPredictions: {
    nextHourLoad: number;
    solarForecast: number;
    batteryRuntime: number;
    optimizationScore: number;
  };
  alerts: Array<{
    id: string;
    type: string;
    category: string;
    message: string;
    timestamp: string;
    severity: string;
  }>;
}

export function useRealTimeData(refreshInterval: number = 5000) {
  const [data, setData] = useState<MicrogridData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/microgrid-data', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const newData = await response.json();
      setData(newData);
      setLastUpdate(new Date());
      setError(null);
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to fetch microgrid data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up interval for real-time updates
    const interval = setInterval(fetchData, refreshInterval);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  // Manual refresh function
  const refresh = useCallback(() => {
    setIsLoading(true);
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    lastUpdate,
    refresh,
  };
}

// Hook for AI predictions
export function useAIPredictions(type: string = 'all', refreshInterval: number = 30000) {
  const [predictions, setPredictions] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPredictions = useCallback(async () => {
    try {
      const response = await fetch(`/api/ai-predictions?type=${type}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const newPredictions = await response.json();
      setPredictions(newPredictions);
      setError(null);
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to fetch AI predictions:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch predictions');
      setIsLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchPredictions();
    const interval = setInterval(fetchPredictions, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchPredictions, refreshInterval]);

  return {
    predictions,
    isLoading,
    error,
    refresh: fetchPredictions,
  };
}
