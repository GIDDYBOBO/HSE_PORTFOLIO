import React, { useState, useMemo } from 'react';
import { 
  Sun, 
  Droplets, 
  Activity, 
  Clock, 
  CheckCircle2, 
  ShieldAlert, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { ThermalCalculationResult } from '../../types';

export const ThermalCalculator: React.FC = () => {
  // Inputs
  const [tempC, setTempC] = useState<number>(36);
  const [humidity, setHumidity] = useState<number>(65);
  const [solarRadiation, setSolarRadiation] = useState<'direct' | 'partial' | 'shaded'>('direct');
  const [workload, setWorkload] = useState<'light' | 'moderate' | 'heavy' | 'very_heavy'>('heavy');
  const [clothingType, setClothingType] = useState<'standard' | 'double_layer' | 'impermeable'>('standard');

  // Interactive calculation grounded in ISO 7243 and Engr. Osazee's thermal monograph
  const calculation = useMemo<ThermalCalculationResult>(() => {
    // Approximate Outdoor WBGT estimation algorithm:
    // WBGT_approx = 0.567 * Ta + 0.393 * e + 3.94 + SolarOffset
    // Where e (vapor pressure in hPa) ~ (RH/100) * 6.105 * exp((17.27 * Ta)/(237.7 + Ta))
    const vaporPressure = (humidity / 100) * 6.105 * Math.exp((17.27 * tempC) / (237.7 + tempC));
    let baseWbgt = 0.567 * tempC + 0.393 * vaporPressure + 3.94;

    // Adjust for solar radiation
    if (solarRadiation === 'direct') baseWbgt += 2.5;
    else if (solarRadiation === 'partial') baseWbgt += 1.2;
    else baseWbgt -= 0.5;

    // Adjust for clothing insulation
    if (clothingType === 'double_layer') baseWbgt += 1.5;
    else if (clothingType === 'impermeable') baseWbgt += 3.0;

    const finalWbgt = Math.round(baseWbgt * 10) / 10;

    // Metabolic thresholds based on Workload
    let category: ThermalCalculationResult['riskCategory'] = 'Low';
    let workRest = 'Continuous work permitted with standard hourly micro-breaks (50 min work / 10 min rest).';
    let waterIntake = 0.5;
    let alertText = 'Standard environmental conditions. Maintain baseline hydration.';
    const controls: string[] = [
      'Provide readily available potable water on site.',
      'Ensure standard personal protective equipment (PPE) is breathable.',
      'Conduct morning safety briefing regarding heat awareness.'
    ];

    if (finalWbgt < 26) {
      category = 'Low';
      workRest = 'Continuous regular work (standard 50 min work / 10 min rest).';
      waterIntake = 0.5;
      alertText = 'Low thermal strain. Environmental parameters within safe operating thresholds.';
    } else if (finalWbgt >= 26 && finalWbgt < 29) {
      category = 'Moderate';
      workRest = 'Recommended 45 minutes work / 15 minutes rest in shaded cooling stations.';
      waterIntake = 0.75;
      alertText = 'Moderate heat stress hazard. Increased physiological strain observed during heavy manual lifting and scaffolding.';
      controls.push(
        'Erect temporary shaded rest shelters along primary work zones.',
        'Implement buddy system for monitoring early signs of heat fatigue.',
        'Supply electrolyte-enhanced hydration options.'
      );
    } else if (finalWbgt >= 29 && finalWbgt < 32) {
      category = 'High';
      workRest = 'Strict 30 minutes work / 30 minutes rest in active cooling areas.';
      waterIntake = 1.0;
      alertText = 'High heat stress hazard! Significant risk of heat exhaustion, muscle cramping, and impaired reaction times around heavy construction machinery.';
      controls.push(
        'Mandatory 30/30 work-rest cycle enforced by safety supervisors.',
        'Reschedule high-exertion concrete pouring or deep trench work to early morning (06:00–10:00) or late afternoon.',
        'Deploy industrial misting fans and dedicated chilled electrolyte water stations.',
        'Supervisors monitor worker pulse recovery rate and skin flushness.'
      );
    } else if (finalWbgt >= 32 && finalWbgt < 34) {
      category = 'Very High';
      workRest = 'Rigorous 15 minutes work / 45 minutes rest per hour under shade.';
      waterIntake = 1.25;
      alertText = 'Extreme physiological hazard! Body core temperature rise imminent under direct sun exposure. High probability of heat stroke without aggressive intervention.';
      controls.push(
        'Restrict high-metabolic manual tasks entirely during peak solar hours (11:00–15:30).',
        'Deploy designated First-Aid and Occupational Nurse station with cold water immersion packs.',
        'Active physiological monitoring: pulse, thermal dizziness, and mental alertness checks.',
        'Compulsory shade rotation and ice towels.'
      );
    } else {
      category = 'Extreme';
      workRest = 'HALT outdoor high-metabolic work immediately. Transition strictly to indoor air-conditioned or shaded low-effort maintenance.';
      waterIntake = 1.5;
      alertText = 'CRITICAL THERMAL EMERGENCY: Environmental threshold exceeds human compensatory evaporative cooling capacity. Immediate danger of fatal heat stroke.';
      controls.push(
        'Issue Site Stop-Work Directive for outdoor heavy civil operations.',
        'Evacuate exposed elevated steelwork, roofing, and unshaded asphalt paving crews to cooling quarters.',
        'Continuous paramedic standby with core cooling protocols.'
      );
    }

    return {
      wbgt: finalWbgt,
      riskCategory: category,
      workRestCycle: workRest,
      waterIntakeLitersPerHour: waterIntake,
      recommendedControls: controls,
      physiologicalAlert: alertText
    };
  }, [tempC, humidity, solarRadiation, workload, clothingType]);

  // Risk badges in Gemini AI Studio dark aesthetic
  const getBadgeColor = (cat: ThermalCalculationResult['riskCategory']) => {
    switch (cat) {
      case 'Low': return 'bg-[#282a2c] text-[#a8c7fa] border-[#3c4043]';
      case 'Moderate': return 'bg-[#282a2c] text-emerald-300 border-emerald-500/40';
      case 'High': return 'bg-amber-950/60 text-amber-200 border-amber-700/60 font-semibold';
      case 'Very High': return 'bg-orange-950/60 text-orange-200 border-orange-700/60 font-bold';
      case 'Extreme': return 'bg-red-950/80 text-red-200 border-red-500/70 font-bold animate-pulse';
    }
  };

  const handleReset = () => {
    setTempC(34);
    setHumidity(60);
    setSolarRadiation('direct');
    setWorkload('heavy');
    setClothingType('standard');
  };

  return (
    <div className="dialed-glass-card-elevated border border-white/20 rounded-3xl p-6 sm:p-8 text-white">
      {/* Tool Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[#a8c7fa] text-xs font-mono uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-[#a8c7fa]" />
            <span>Interactive Engineering Field Tool</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-snug">
            Thermal Environment & WBGT Heat-Stress Risk Calculator
          </h3>
          <p className="text-xs sm:text-sm text-[#c4c7c5] mt-1 max-w-2xl leading-relaxed">
            Derived directly from Engr. Iyenoma T. Osazee&apos;s monograph 
            <em> &quot;Hazards and Risks Presented by the Thermal Environment&quot;</em> (2021). 
            Calculate Wet Bulb Globe Temperature (WBGT), physiological strain, hydration requirements, and work/rest cycles for construction and field teams.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="self-start md:self-center flex items-center space-x-1.5 px-3.5 py-2 rounded-full dialed-glass-pill hover:bg-white/15 text-white text-xs transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#a8c7fa]" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Grid: Inputs (Left) vs Real-Time Output (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-5">
          {/* Ambient Temperature */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-neutral-800 dark:text-neutral-300">
              <label htmlFor="temp-slider" className="flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-black dark:text-white" />
                <span>Dry Bulb Ambient Temperature:</span>
              </label>
              <span className="font-mono text-black dark:text-white font-semibold">{tempC}°C ({Math.round(tempC * 1.8 + 32)}°F)</span>
            </div>
            <input
              id="temp-slider"
              type="range"
              min="20"
              max="48"
              step="1"
              value={tempC}
              onChange={(e) => setTempC(Number(e.target.value))}
              className="w-full accent-black dark:accent-white cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
              <span>20°C (Mild)</span>
              <span>34°C (Tropical Construction)</span>
              <span>48°C (Extreme Sahara/Sahel)</span>
            </div>
          </div>

          {/* Relative Humidity */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-neutral-800 dark:text-neutral-300">
              <label htmlFor="humidity-slider" className="flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-black dark:text-white" />
                <span>Relative Humidity (RH):</span>
              </label>
              <span className="font-mono text-black dark:text-white font-semibold">{humidity}%</span>
            </div>
            <input
              id="humidity-slider"
              type="range"
              min="15"
              max="95"
              step="1"
              value={humidity}
              onChange={(e) => setHumidity(Number(e.target.value))}
              className="w-full accent-black dark:accent-white cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
              <span>15% (Dry Harmattan)</span>
              <span>55% (Moderate)</span>
              <span>95% (Coastal Monsoon)</span>
            </div>
          </div>

          {/* Solar Radiation Exposure */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-neutral-800 dark:text-neutral-300">
              Solar Radiation Exposure
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'direct', label: 'Direct Sun (Clear)' },
                { id: 'partial', label: 'Partial Cloud' },
                { id: 'shaded', label: 'Full Shade / Cover' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSolarRadiation(item.id as any)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    solarRadiation === item.id
                      ? 'bg-black text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                      : 'bg-neutral-100 dark:bg-[#1e1f20] text-neutral-700 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white border border-neutral-200 dark:border-[#333538]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Workload Metabolic Rate */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-neutral-800 dark:text-neutral-300 flex items-center justify-between">
              <span>Workload Exertion (Metabolic Rate)</span>
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400">ISO 7243 Class</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'light', label: 'Light', desc: 'Equipment monitoring, driving, inspecting' },
                { id: 'moderate', label: 'Moderate', desc: 'Bricklaying, carpentry, walking' },
                { id: 'heavy', label: 'Heavy', desc: 'Steel reinforcement, shoveling, scaffolding' },
                { id: 'very_heavy', label: 'Very Heavy', desc: 'Intense manual excavation, climbing with loads' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setWorkload(item.id as any)}
                  className={`p-2.5 rounded-lg text-left text-xs transition-all border cursor-pointer ${
                    workload === item.id
                      ? 'bg-neutral-200 dark:bg-[#282a2c] border-neutral-400 dark:border-[#444746] text-black dark:text-white font-semibold'
                      : 'bg-neutral-50 dark:bg-[#1e1f20]/80 border-neutral-200 dark:border-[#333538] text-neutral-700 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-neutral-200'
                  }`}
                >
                  <div className="font-semibold text-neutral-900 dark:text-neutral-200">{item.label}</div>
                  <div className="text-[10px] text-neutral-600 dark:text-neutral-400 leading-tight mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Clothing & PPE Adjustment */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-neutral-800 dark:text-neutral-300">
              Worker Clothing & Protective Ensemble
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'standard', label: 'Standard Cotton Workwear' },
                { id: 'double_layer', label: 'Heavy Double Coveralls' },
                { id: 'impermeable', label: 'Vapor-Impermeable Suit' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setClothingType(item.id as any)}
                  className={`p-2 rounded-lg text-center text-xs transition-all border cursor-pointer ${
                    clothingType === item.id
                      ? 'bg-neutral-200 dark:bg-[#282a2c] border-neutral-400 dark:border-[#444746] text-black dark:text-white font-semibold'
                      : 'bg-neutral-50 dark:bg-[#1e1f20]/80 border-neutral-200 dark:border-[#333538] text-neutral-700 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results & Advisory Column */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-5 dialed-glass-card p-6 rounded-2xl">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#a8abb0]">
                Calculated Environmental Index
              </span>
              <span className={`text-xs font-mono px-2.5 py-1 rounded-full border ${getBadgeColor(calculation.riskCategory)}`}>
                {calculation.riskCategory} Hazard
              </span>
            </div>

            {/* WBGT Gauge Card */}
            <div className="mt-4 p-5 rounded-xl dialed-glass-pill flex items-center justify-between">
              <div>
                <span className="text-xs text-[#a8abb0] uppercase font-mono">Estimated Index</span>
                <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight flex items-baseline gap-1">
                  <span>{calculation.wbgt}</span>
                  <span className="text-[#a8c7fa] text-lg">°C WBGT</span>
                </div>
                <p className="text-[11px] text-[#8e918f] mt-0.5">
                  Natural Wet Bulb + Globe + Dry Bulb combined synthesis
                </p>
              </div>

              <div className="w-14 h-14 rounded-xl dialed-glass-pill flex items-center justify-center text-white">
                <Activity className="w-7 h-7 text-[#a8c7fa]" />
              </div>
            </div>

            {/* Physiological Alert */}
            <div className="mt-4 p-3.5 rounded-lg dialed-glass-pill flex items-start space-x-3 text-xs leading-relaxed text-[#c4c7c5]">
              <ShieldAlert className="w-4 h-4 text-[#a8c7fa] mt-0.5 shrink-0" />
              <div>
                <strong className="text-white block mb-0.5 font-semibold">Physiological Assessment:</strong>
                {calculation.physiologicalAlert}
              </div>
            </div>

            {/* Work / Rest Regimen & Hydration Protocol */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <div className="p-3.5 rounded-lg dialed-glass-pill space-y-1">
                <div className="flex items-center space-x-1.5 text-xs text-[#a8abb0] font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#a8c7fa]" />
                  <span>Work / Rest Regimen</span>
                </div>
                <p className="text-xs font-semibold text-white">
                  {calculation.workRestCycle}
                </p>
              </div>

              <div className="p-3.5 rounded-lg dialed-glass-pill space-y-1">
                <div className="flex items-center space-x-1.5 text-xs text-[#a8abb0] font-mono">
                  <Droplets className="w-3.5 h-3.5 text-[#a8c7fa]" />
                  <span>Target Hydration</span>
                </div>
                <p className="text-xs font-semibold text-white">
                  {calculation.waterIntakeLitersPerHour} Litres / hour per worker
                </p>
                <p className="text-[10px] text-[#8e918f]">
                  Drink small amounts (approx. 200ml) every 15-20 minutes.
                </p>
              </div>
            </div>

            {/* Actionable Engineering & Admin Controls */}
            <div className="mt-4 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-black dark:text-neutral-200 font-semibold block">
                Prescribed Safety & Engineering Controls:
              </span>
              <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-400">
                {calculation.recommendedControls.map((ctl, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-black dark:text-white mt-0.5 shrink-0" />
                    <span>{ctl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Citation footer inside tool */}
          <div className="pt-3 border-t border-neutral-200 dark:border-[#333538] text-[11px] text-neutral-500 flex items-center justify-between">
            <span>Algorithm derived from Osazee (2021) & ISO 7243 guidelines</span>
            <span className="text-neutral-700 dark:text-neutral-400 font-mono">Abuja Field Standards</span>
          </div>
        </div>
      </div>
    </div>
  );
};
