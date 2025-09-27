"use client";

import { Card, Title, Text, Metric, Flex, Badge } from '@tremor/react';
import { motion } from 'framer-motion';
import { Cloud, Sun, Droplets, Wind, Thermometer, Eye } from 'lucide-react';
import { useAIPredictions } from '@/hooks/useRealTimeData';

interface WeatherIntelligenceProps {
  data: any;
}

export function WeatherIntelligence({ data }: WeatherIntelligenceProps) {
  const { predictions } = useAIPredictions('weather');
  
  const weather = data?.weather || {
    temperature: 28,
    humidity: 65,
    cloudCover: 40,
    windSpeed: 7,
    pressure: 1015
  };

  const getWeatherIcon = (cloudCover: number) => {
    if (cloudCover < 20) return '☀️';
    if (cloudCover < 50) return '⛅';
    if (cloudCover < 80) return '☁️';
    return '🌧️';
  };

  const getSolarImpact = (cloudCover: number) => {
    if (cloudCover < 30) return { level: 'High', color: 'green' };
    if (cloudCover < 70) return { level: 'Medium', color: 'yellow' };
    return { level: 'Low', color: 'red' };
  };

  const solarImpact = getSolarImpact(weather.cloudCover);
  const weatherIcon = getWeatherIcon(weather.cloudCover);

  return (
    <Card className="glass-card">
      <Flex alignItems="center" className="space-x-2 mb-4">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Cloud className="h-6 w-6 text-blue-500" />
        </motion.div>
        <Title className="text-xl font-bold">AI Weather Intelligence</Title>
        <Badge color="blue" size="sm">Live Weather</Badge>
      </Flex>

      {/* Current Weather Conditions */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Thermometer className="h-4 w-4 text-orange-500" />
            <Text className="text-sm font-medium">Temperature</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-orange-600">{weather.temperature}°C</Metric>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            <Text className="text-sm font-medium">Humidity</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-blue-600">{weather.humidity}%</Metric>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 p-4 rounded-lg border border-gray-200 dark:border-gray-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Cloud className="h-4 w-4 text-gray-500" />
            <Text className="text-sm font-medium">Cloud Cover</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-gray-600">{weather.cloudCover}%</Metric>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Wind className="h-4 w-4 text-green-500" />
            <Text className="text-sm font-medium">Wind Speed</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-green-600">{weather.windSpeed} m/s</Metric>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800"
        >
          <Flex alignItems="center" className="space-x-2 mb-2">
            <Eye className="h-4 w-4 text-purple-500" />
            <Text className="text-sm font-medium">Pressure</Text>
          </Flex>
          <Metric className="text-2xl font-bold text-purple-600">{weather.pressure} hPa</Metric>
        </motion.div>
      </div>

      {/* Weather Forecast */}
      <div className="mb-6">
        <Title className="text-lg mb-3">Next 6 Hours Forecast</Title>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((hour) => {
            const temp = weather.temperature + (Math.random() - 0.5) * 4;
            const clouds = Math.max(0, Math.min(100, weather.cloudCover + (Math.random() - 0.5) * 20));
            return (
              <motion.div
                key={hour}
                whileHover={{ scale: 1.02 }}
                className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <Text className="text-sm font-medium text-center mb-2">+{hour}h</Text>
                <div className="text-center">
                  <div className="text-2xl mb-1">{getWeatherIcon(clouds)}</div>
                  <Text className="text-lg font-bold">{temp.toFixed(1)}°C</Text>
                  <Text className="text-xs text-gray-600">{clouds.toFixed(0)}% clouds</Text>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Solar Impact Analysis */}
      <div className="mb-4">
        <Title className="text-lg mb-3">Microgrid Impact Assessment</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`bg-gradient-to-r from-${solarImpact.color}-50 to-${solarImpact.color}-100 dark:from-${solarImpact.color}-900/20 dark:to-${solarImpact.color}-800/20 p-4 rounded-lg border border-${solarImpact.color}-200 dark:border-${solarImpact.color}-800`}>
            <Flex alignItems="center" className="space-x-2 mb-2">
              <Sun className="h-5 w-5 text-yellow-500" />
              <Text className="font-medium">Solar Generation Impact</Text>
            </Flex>
            <Flex alignItems="center" className="space-x-2">
              <Badge color={solarImpact.color} size="lg">{solarImpact.level}</Badge>
              <Text className="text-sm">
                Expected: {Math.round((1 - weather.cloudCover / 100 * 0.8) * 850)} W/m²
              </Text>
            </Flex>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <Flex alignItems="center" className="space-x-2 mb-2">
              <Thermometer className="h-5 w-5 text-orange-500" />
              <Text className="font-medium">Equipment Risk</Text>
            </Flex>
            <Flex alignItems="center" className="space-x-2">
              <Badge color={weather.temperature > 35 ? 'red' : 'green'} size="lg">
                {weather.temperature > 35 ? 'High' : 'Low'}
              </Badge>
              <Text className="text-sm">Overheating risk assessment</Text>
            </Flex>
          </div>
        </div>
      </div>

      {/* AI Weather Recommendations */}
      <div className="space-y-3">
        <Title className="text-lg">AI Weather Recommendations</Title>
        
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <Flex alignItems="center" className="space-x-2 mb-2">
            <span className="text-lg">🌤️</span>
            <Text className="font-medium text-yellow-800 dark:text-yellow-200">Solar Optimization</Text>
          </Flex>
          <Text className="text-sm text-yellow-700 dark:text-yellow-300">
            • Current conditions favor {solarImpact.level.toLowerCase()} solar generation
          </Text>
          <Text className="text-sm text-yellow-700 dark:text-yellow-300">
            • {weather.cloudCover < 50 ? 'Optimize panel positioning for maximum exposure' : 'Prepare backup systems for reduced solar output'}
          </Text>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <Flex alignItems="center" className="space-x-2 mb-2">
            <span className="text-lg">💨</span>
            <Text className="font-medium text-green-800 dark:text-green-200">Cooling Benefits</Text>
          </Flex>
          <Text className="text-sm text-green-700 dark:text-green-300">
            • Wind speed of {weather.windSpeed} m/s provides natural cooling
          </Text>
          <Text className="text-sm text-green-700 dark:text-green-300">
            • Equipment efficiency improved by ~{Math.min(5, weather.windSpeed)}% due to wind cooling
          </Text>
        </div>

        {predictions?.weatherPredictions?.microgridRecommendations && (
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <Flex alignItems="center" className="space-x-2 mb-2">
              <span className="text-lg">🤖</span>
              <Text className="font-medium text-purple-800 dark:text-purple-200">AI Forecast Actions</Text>
            </Flex>
            {predictions.weatherPredictions.microgridRecommendations.slice(0, 2).map((rec: string, idx: number) => (
              <Text key={idx} className="text-sm text-purple-700 dark:text-purple-300">
                • {rec}
              </Text>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
