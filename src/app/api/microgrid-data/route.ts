import { NextRequest, NextResponse } from 'next/server';

// Simulate real-time microgrid data
function generateMicrogridData() {
  const now = new Date();
  const timeOfDay = now.getHours();
  
  // Solar generation based on time of day with weather and fault simulation
  const solarMultiplier = timeOfDay >= 6 && timeOfDay <= 18 
    ? Math.sin((timeOfDay - 6) * Math.PI / 12) 
    : 0;
  
  // Simulate low energy scenarios (20% chance of reduced generation)
  const weatherFactor = Math.random() > 0.8 ? 0.3 : 1; // Cloudy weather simulation
  const faultFactor = Math.random() > 0.95 ? 0.1 : 1; // Equipment fault simulation
  
  const solarOutput = Math.max(0, 2.5 * solarMultiplier * weatherFactor * faultFactor + (Math.random() - 0.5) * 0.2);
  
  // TEG output (more stable)
  const tegOutput = 0.6 + (Math.random() - 0.5) * 0.1;
  
  // Battery simulation
  const batterySOC = 65 + Math.sin(Date.now() / 100000) * 15 + (Math.random() - 0.5) * 5;
  
  // Load simulation
  const baseLoad = 1.2 + Math.sin(timeOfDay * Math.PI / 12) * 0.4;
  const criticalLoad = baseLoad * 0.6;
  const nonCriticalLoad = baseLoad * 0.4;
  
  // Thermal data
  const hotWaterTemp = 475 + (Math.random() - 0.5) * 25;
  const tegHotTemp = 520 + (Math.random() - 0.5) * 30;
  
  // Weather simulation
  const temperature = 25 + Math.sin(timeOfDay * Math.PI / 12) * 8 + (Math.random() - 0.5) * 3;
  const humidity = 60 + (Math.random() - 0.5) * 20;
  const cloudCover = 30 + (Math.random() - 0.5) * 40;
  
  // Calculate efficiency
  const totalGeneration = solarOutput + tegOutput;
  const efficiency = (totalGeneration / 3.0) * 100; // Assuming 3kW max capacity
  
  return {
    timestamp: now.toISOString(),
    
    // Power Generation
    solarOutput: Number(solarOutput.toFixed(2)),
    tegOutput: Number(tegOutput.toFixed(2)),
    totalGeneration: Number(totalGeneration.toFixed(2)),
    irradiance: Math.round(solarOutput * 400 + 50), // Approximate irradiance
    
    // Battery System
    batterySOC: Math.max(0, Math.min(100, Number(batterySOC.toFixed(1)))),
    batteryVoltage: Number((48 + (batterySOC - 50) * 0.1).toFixed(1)),
    batteryTemp: Number((25 + Math.random() * 10).toFixed(1)),
    chargingRate: totalGeneration > baseLoad ? Number(((totalGeneration - baseLoad) * 0.9).toFixed(2)) : 0,
    
    // Load Management
    criticalLoad: Number(criticalLoad.toFixed(2)),
    nonCriticalLoad: Number(nonCriticalLoad.toFixed(2)),
    totalLoad: Number((criticalLoad + nonCriticalLoad).toFixed(2)),
    
    // Thermal System
    hotWaterTemp: Number(hotWaterTemp.toFixed(1)),
    tegHotTemp: Number(tegHotTemp.toFixed(1)),
    tegColdTemp: Number((25 + Math.random() * 5).toFixed(1)),
    steamPressure: Number((2.5 + Math.random() * 0.5).toFixed(2)),
    
    // Turbine & Condenser
    turbineRPM: Math.round(1800 + Math.sin(Date.now() / 10000) * 100 + Math.random() * 50),
    vibrationLevel: Number((2 + Math.sin(Date.now() / 15000) * 0.5 + Math.random() * 0.3).toFixed(2)),
    condenserTemp: Number((32 + Math.random() * 8).toFixed(1)),
    turbineEfficiency: Number((85 + Math.sin(Date.now() / 20000) * 5 + Math.random() * 3).toFixed(1)),
    
    // Power Conversion & Control
    inverterEfficiency: Number((95 + Math.random() * 3).toFixed(1)),
    hybridControllerStatus: Math.random() > 0.9 ? 'warning' : 'optimal',
    powerFactor: Number((0.95 + Math.random() * 0.05).toFixed(3)),
    thd: Number((1.5 + Math.random() * 1).toFixed(1)),
    dcVoltage: Math.round(380 + Math.random() * 20),
    acVoltage: Math.round(230 + Math.random() * 10),
    frequency: Number((50 + (Math.random() - 0.5) * 0.1).toFixed(2)),
    
    // Predictive Analytics
    faultRisk: Math.round(5 + Math.random() * 20),
    
    // Grid Connection Data
    gridConnected: totalGeneration < 0.5 || batterySOC < 30 ? Math.random() > 0.3 : false,
    gridVoltage: 230 + (Math.random() - 0.5) * 20,
    gridFrequency: 50.0 + (Math.random() - 0.5) * 0.5,
    gridPowerImport: Math.max(0, baseLoad - totalGeneration),
    gridPowerExport: Math.max(0, totalGeneration - baseLoad),
    gridSyncStatus: totalGeneration < 0.5 ? 'synchronized' : 'islanded',
    
    // Energy Status Flags
    isLowEnergy: totalGeneration < 0.5,
    isEnergyShortage: (baseLoad - totalGeneration) > 0.5 || (batterySOC < 30 && totalGeneration < 1.0),
    energyDeficit: Math.max(0, baseLoad - totalGeneration),
    
    // Load Shedding Status
    loadSheddingLevel: (baseLoad - totalGeneration) > 1.0 ? 3 : 
                      (baseLoad - totalGeneration) > 0.6 ? 2 : 
                      (baseLoad - totalGeneration) > 0.3 ? 1 : 0,
    
    // Weather Data
    weather: {
      temperature: Number(temperature.toFixed(1)),
      humidity: Math.max(0, Math.min(100, Number(humidity.toFixed(1)))),
      cloudCover: Math.max(0, Math.min(100, Number(cloudCover.toFixed(1)))),
      windSpeed: Number((5 + Math.random() * 5).toFixed(1)),
      pressure: Number((1013 + (Math.random() - 0.5) * 10).toFixed(1))
    },
    
    // System Efficiency
    efficiency: Number(efficiency.toFixed(1)),
    systemHealth: efficiency > 15 ? 'excellent' : efficiency > 10 ? 'good' : 'warning',
    
    // AI Predictions
    aiPredictions: {
      nextHourLoad: Number((baseLoad * 1.1).toFixed(2)),
      solarForecast: timeOfDay < 18 ? Number((solarOutput * 1.2).toFixed(2)) : 0,
      batteryRuntime: batterySOC > 20 ? Math.round(batterySOC / 10) : 0,
      optimizationScore: Math.round(efficiency * 0.8 + 20)
    },
    
    // Alerts
    alerts: generateAlerts(batterySOC, hotWaterTemp, efficiency, totalGeneration, baseLoad)
  };
}

function generateAlerts(batterySOC: number, hotWaterTemp: number, efficiency: number, generation: number, load: number) {
  const alerts = [];
  const energyDeficit = load - generation;
  const isLowGeneration = generation < 0.5;
  
  // Critical energy shortage alert
  if (generation < 0.3) {
    alerts.push({
      id: 'energy_critical',
      type: 'critical',
      category: 'Grid Shift',
      message: `Critical energy shortage: ${generation.toFixed(2)}kW - Grid connection required`,
      timestamp: new Date().toISOString(),
      severity: 'critical'
    });
  }
  
  // Low energy generation alert
  if (isLowGeneration && generation > 0.3) {
    alerts.push({
      id: 'energy_low',
      type: 'warning',
      category: 'Grid Shift',
      message: `Low energy generation: ${generation.toFixed(2)}kW - Prepare for grid shift`,
      timestamp: new Date().toISOString(),
      severity: 'warning'
    });
  }
  
  // Energy deficit alert
  if (energyDeficit > 0.5) {
    alerts.push({
      id: 'energy_deficit',
      type: 'warning',
      category: 'Load Management',
      message: `Energy deficit: ${energyDeficit.toFixed(2)}kW - Load shedding recommended`,
      timestamp: new Date().toISOString(),
      severity: energyDeficit > 1.0 ? 'critical' : 'warning'
    });
  }
  
  // Battery low with low generation
  if (batterySOC < 30 && isLowGeneration) {
    alerts.push({
      id: 'battery_energy_critical',
      type: 'critical',
      category: 'Grid Shift',
      message: `Battery low (${batterySOC.toFixed(1)}%) with minimal generation - Immediate grid connection required`,
      timestamp: new Date().toISOString(),
      severity: 'critical'
    });
  } else if (batterySOC < 30) {
    alerts.push({
      id: 'battery_low',
      type: 'warning',
      category: 'Battery',
      message: `Battery SOC is low: ${batterySOC.toFixed(1)}%`,
      timestamp: new Date().toISOString(),
      severity: batterySOC < 20 ? 'critical' : 'warning'
    });
  }
  
  if (hotWaterTemp > 490) {
    alerts.push({
      id: 'thermal_high',
      type: 'warning',
      category: 'Thermal',
      message: `Hot water temperature elevated: ${hotWaterTemp.toFixed(1)}°C`,
      timestamp: new Date().toISOString(),
      severity: hotWaterTemp > 500 ? 'critical' : 'warning'
    });
  }
  
  if (efficiency < 15) {
    alerts.push({
      id: 'efficiency_low',
      type: 'warning',
      category: 'Performance',
      message: `System efficiency below target: ${efficiency.toFixed(1)}%`,
      timestamp: new Date().toISOString(),
      severity: efficiency < 10 ? 'critical' : 'warning'
    });
  }
  
  // Grid connection success alert
  if (generation < 0.5 && Math.random() > 0.7) {
    alerts.push({
      id: 'grid_connected',
      type: 'success',
      category: 'Grid Shift',
      message: 'Successfully connected to utility grid - Power supply stabilized',
      timestamp: new Date().toISOString(),
      severity: 'info'
    });
  }
  
  // Load shedding active alert
  const sheddingLevel = energyDeficit > 1.0 ? 3 : energyDeficit > 0.6 ? 2 : energyDeficit > 0.3 ? 1 : 0;
  if (sheddingLevel > 0) {
    alerts.push({
      id: 'load_shedding_active',
      type: 'warning',
      category: 'Load Management',
      message: `Load shedding Level ${sheddingLevel} active - Non-essential loads disconnected`,
      timestamp: new Date().toISOString(),
      severity: sheddingLevel >= 3 ? 'critical' : 'warning'
    });
  }
  
  // Add some positive alerts
  if (efficiency > 20 && generation > 2.0) {
    alerts.push({
      id: 'system_optimal',
      type: 'success',
      category: 'Performance',
      message: `System operating optimally: ${efficiency.toFixed(1)}% efficiency, ${generation.toFixed(2)}kW generation`,
      timestamp: new Date().toISOString(),
      severity: 'info'
    });
  }
  
  return alerts;
}

export async function GET(request: NextRequest) {
  try {
    const data = generateMicrogridData();
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error generating microgrid data:', error);
    return NextResponse.json(
      { error: 'Failed to generate microgrid data' },
      { status: 500 }
    );
  }
}
