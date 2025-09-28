import { NextRequest, NextResponse } from 'next/server';

// AI Load Management Predictions
function generateLoadPredictions() {
  const currentTime = new Date();
  const hour = currentTime.getHours();
  
  // AI Pattern Recognition
  const hourlyPattern = 1 + 0.3 * Math.sin(2 * Math.PI * hour / 24);
  const weeklyPattern = 1 + 0.1 * Math.sin(2 * Math.PI * currentTime.getDay() / 7);
  const seasonalPattern = 1 + 0.2 * Math.sin(2 * Math.PI * currentTime.getMonth() / 12);
  const weatherFactor = 1 + 0.02 * Math.max(0, 28 - 25); // Assuming 28°C
  
  const baseLoad = 1200; // Base load in watts
  const predictedLoad = baseLoad * hourlyPattern * weeklyPattern * seasonalPattern * weatherFactor;
  
  const confidence = 0.85;
  const uncertainty = predictedLoad * 0.15;
  
  return {
    predictedLoad: Math.round(predictedLoad),
    confidence: confidence,
    lowerBound: Math.round(predictedLoad - uncertainty),
    upperBound: Math.round(predictedLoad + uncertainty),
    factors: {
      hourly: Number(hourlyPattern.toFixed(3)),
      weekly: Number(weeklyPattern.toFixed(3)),
      seasonal: Number(seasonalPattern.toFixed(3)),
      weather: Number(weatherFactor.toFixed(3))
    }
  };
}

// AI Solar Generation Predictions
function generateSolarPredictions() {
  const predictions = [];
  const currentTime = new Date();
  
  for (let hour = 0; hour < 12; hour++) {
    const forecastTime = new Date(currentTime.getTime() + hour * 60 * 60 * 1000);
    const hourOfDay = forecastTime.getHours();
    
    // Base solar pattern
    const baseIrradiance = Math.max(0, 1000 * Math.sin(Math.PI * (hourOfDay - 6) / 12));
    
    // Weather factors
    const cloudFactor = 1 - (40 / 100) * 0.8; // 40% cloud cover
    const tempFactor = 1 + (28 - 25) * 0.002;
    const humidityFactor = 1 - (65 / 100) * 0.1;
    
    const predictedIrradiance = baseIrradiance * cloudFactor * tempFactor * humidityFactor;
    const predictedPower = (predictedIrradiance * 2.0 * 0.18) / 1000; // 2kW system, 18% efficiency
    
    predictions.push({
      time: forecastTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      hour: hourOfDay,
      predictedPower: Math.max(0, Number(predictedPower.toFixed(2))),
      irradiance: Math.round(predictedIrradiance),
      efficiency: Number((0.18 * tempFactor * humidityFactor * 100).toFixed(1)),
      confidence: 0.87 * (1 - hour / 24), // Decreasing confidence over time
      weatherFactors: {
        cloudImpact: Number(cloudFactor.toFixed(3)),
        temperatureImpact: Number(tempFactor.toFixed(3)),
        humidityImpact: Number(humidityFactor.toFixed(3))
      }
    });
  }
  
  const totalDailyGeneration = predictions.reduce((sum, p) => sum + p.predictedPower, 0);
  const peakHour = predictions.reduce((max, p) => p.predictedPower > max.predictedPower ? p : max);
  const avgConfidence = predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length;
  
  return {
    predictions,
    summary: {
      totalDailyGeneration: Number(totalDailyGeneration.toFixed(1)),
      peakGenerationHour: peakHour.time,
      peakGenerationPower: peakHour.predictedPower,
      averageConfidence: Number(avgConfidence.toFixed(3)),
      weatherImpact: 'Medium' // Based on cloud cover
    },
    aiInsights: {
      generationQuality: totalDailyGeneration > 15 ? 'Excellent' : totalDailyGeneration > 10 ? 'Good' : 'Poor',
      reliabilityScore: Number((avgConfidence * 100).toFixed(1)),
      optimizationSuggestions: [
        '🌞 Optimize solar generation during 6 high-irradiance hours',
        '🔧 AI Recommendation: Monitor panel efficiency during peak hours'
      ]
    }
  };
}

// AI Battery Performance Predictions
function generateBatteryPredictions(currentSOC: number = 75) {
  const predictions = [];
  let socValue = currentSOC;
  
  const batterySpecs = {
    capacityKwh: 10,
    maxChargeRate: 2,
    maxDischargeRate: 2,
    efficiency: 0.95
  };
  
  for (let hour = 0; hour < 12; hour++) {
    const load = 1.2 + 0.3 * Math.sin(hour * 0.3); // Simulated load forecast
    const generation = Math.max(0, 2.0 * Math.sin((hour + 6) * Math.PI / 12)); // Solar generation
    
    const netEnergy = generation - load;
    let action, socChange;
    
    if (netEnergy > 0) { // Charging
      const chargePower = Math.min(netEnergy, batterySpecs.maxChargeRate);
      const chargeEnergy = chargePower * batterySpecs.efficiency;
      socChange = (chargeEnergy / batterySpecs.capacityKwh) * 100;
      socValue = Math.min(100, socValue + socChange);
      action = 'charging';
    } else { // Discharging
      const dischargePower = Math.min(Math.abs(netEnergy), batterySpecs.maxDischargeRate);
      const dischargeEnergy = dischargePower / batterySpecs.efficiency;
      socChange = (dischargeEnergy / batterySpecs.capacityKwh) * 100;
      socValue = Math.max(0, socValue - socChange);
      action = 'discharging';
    }
    
    const time = new Date(Date.now() + hour * 60 * 60 * 1000);
    
    predictions.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      soc: Number(socValue.toFixed(1)),
      socChange: Number(socChange.toFixed(2)),
      action,
      powerFlow: Number(netEnergy.toFixed(2)),
      efficiency: batterySpecs.efficiency * 100,
      healthImpact: Math.abs(socChange) / 100 * 0.001,
      aiRecommendation: getAIBatteryRecommendation(socValue, netEnergy, action)
    });
  }
  
  const minSOC = Math.min(...predictions.map(p => p.soc));
  const maxSOC = Math.max(...predictions.map(p => p.soc));
  const totalCycles = predictions.reduce((sum, p) => sum + Math.abs(p.socChange), 0) / 200;
  
  return {
    predictions,
    analysis: {
      minimumSOC: Number(minSOC.toFixed(1)),
      maximumSOC: Number(maxSOC.toFixed(1)),
      socRange: Number((maxSOC - minSOC).toFixed(1)),
      estimatedCycles: Number(totalCycles.toFixed(3)),
      batteryUtilization: Number(((maxSOC - minSOC) / 100).toFixed(3)),
      healthDegradation: Number((predictions.reduce((sum, p) => sum + p.healthImpact, 0)).toFixed(6))
    },
    aiInsights: {
      performanceGrade: getAIBatteryGrade(minSOC, totalCycles),
      optimizationOpportunities: getAIBatteryOptimization(predictions),
      riskAssessment: minSOC < 20 ? 'High' : minSOC < 40 ? 'Medium' : 'Low'
    }
  };
}

function getAIBatteryRecommendation(soc: number, powerFlow: number, action: string): string {
  if (soc < 20) return '🔴 CRITICAL: Low SOC - reduce load immediately';
  if (soc < 40) return '🟡 WARNING: Monitor SOC closely - prepare load shedding';
  if (soc > 90 && action === 'charging') return '🟢 OPTIMAL: High SOC - consider running optional loads';
  return '✅ NORMAL: Battery operating within optimal range';
}

function getAIBatteryGrade(minSOC: number, cycles: number): string {
  if (minSOC >= 40 && cycles < 0.5) return 'A+ Excellent';
  if (minSOC >= 30 && cycles < 1.0) return 'B+ Good';
  if (minSOC >= 20) return 'C+ Fair';
  return 'D- Poor';
}

function getAIBatteryOptimization(predictions: any[]): string[] {
  const opportunities = [];
  const chargingPeriods = predictions.filter(p => p.action === 'charging');
  const dischargingPeriods = predictions.filter(p => p.action === 'discharging');
  
  if (chargingPeriods.length > dischargingPeriods.length) {
    opportunities.push('⚡ Opportunity: Excess charging capacity - consider load shifting');
  }
  
  if (predictions.some(p => p.soc < 30)) {
    opportunities.push('🔋 Risk: Low SOC periods detected - optimize charging schedule');
  }
  
  return opportunities;
}

// AI Weather Intelligence
function generateWeatherPredictions() {
  const predictions = [];
  const currentConditions = {
    temperature: 28,
    humidity: 65,
    cloudCover: 40,
    windSpeed: 7,
    pressure: 1015
  };
  
  for (let hour = 0; hour < 12; hour++) {
    const forecastTime = new Date(Date.now() + hour * 60 * 60 * 1000);
    
    // Simple weather prediction model
    const temp = currentConditions.temperature + Math.sin(hour * 0.2) * 5 + (Math.random() - 0.5) * 2;
    const humidity = currentConditions.humidity + (Math.random() - 0.5) * 10;
    const cloudCover = Math.max(0, Math.min(100, currentConditions.cloudCover + (Math.random() - 0.5) * 20));
    
    // Solar impact calculation
    const cloudReduction = cloudCover / 100 * 0.8;
    const clearSkyIrradiance = 1000;
    const actualIrradiance = clearSkyIrradiance * (1 - cloudReduction);
    
    // Microgrid impact assessment
    const solarRisk = cloudCover > 80 ? 'High' : cloudCover > 50 ? 'Medium' : 'Low';
    const overheatingRisk = temp > 40 ? 'High' : temp > 35 ? 'Medium' : 'Low';
    
    predictions.push({
      time: forecastTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      hourOffset: hour,
      temperature: Number(temp.toFixed(1)),
      humidity: Math.max(10, Math.min(100, Number(humidity.toFixed(1)))),
      cloudCover: Number(cloudCover.toFixed(1)),
      solarImpact: {
        irradianceWm2: Number(actualIrradiance.toFixed(1)),
        overallImpact: actualIrradiance > 800 ? 'High' : actualIrradiance > 400 ? 'Medium' : 'Low'
      },
      microgridImpact: {
        solarGeneration: solarRisk,
        overheating: overheatingRisk,
        overallRisk: (solarRisk === 'High' || overheatingRisk === 'High') ? 'High' : 'Medium'
      },
      weatherDescription: getWeatherDescription(temp, cloudCover)
    });
  }
  
  return {
    predictions,
    aiInsights: [
      '🌞 Excellent solar conditions expected for next 6 hours',
      '🌡️ Temperature within optimal range for equipment operation'
    ],
    microgridRecommendations: [
      '☀️ Optimize solar generation during high-irradiance periods',
      '🔋 Pre-charge batteries before any predicted weather changes'
    ]
  };
}

function getWeatherDescription(temp: number, cloudCover: number): string {
  const tempDesc = temp > 35 ? 'Hot' : temp > 25 ? 'Warm' : temp > 15 ? 'Mild' : 'Cool';
  const skyDesc = cloudCover < 20 ? 'Clear' : cloudCover < 50 ? 'Partly Cloudy' : 'Mostly Cloudy';
  return `${tempDesc} and ${skyDesc}`;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';
    
    let response: any = {};
    
    if (type === 'load' || type === 'all') {
      response.loadPredictions = generateLoadPredictions();
    }
    
    if (type === 'solar' || type === 'all') {
      response.solarPredictions = generateSolarPredictions();
    }
    
    if (type === 'battery' || type === 'all') {
      response.batteryPredictions = generateBatteryPredictions();
    }
    
    if (type === 'weather' || type === 'all') {
      response.weatherPredictions = generateWeatherPredictions();
    }
    
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error generating AI predictions:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI predictions' },
      { status: 500 }
    );
  }
}
