import type { CityData } from "@/data/cityData";
import { Thermometer, Droplets, Wind, Leaf } from "lucide-react";

interface CityDetailsProps {
  city: CityData;
}

export function CityDetails({ city }: CityDetailsProps) {
  const stats = [
    { icon: Thermometer, label: "Temperature", value: `${city.meantemp}°C`, sub: `Soil: ${city.soilTemp}°C` },
    { icon: Droplets, label: "Humidity", value: `${city.humidity}%`, sub: `Moisture: ${city.moisture}%` },
    { icon: Wind, label: "Wind Speed", value: `${city.wind_speed} km/h`, sub: `Pressure: ${city.meanpressure}` },
    { icon: Leaf, label: "Soil Type", value: city.soilType, sub: `N:${city.nitrogen} P:${city.phosphorous} K:${city.potassium}` },
  ];

  return (
    <div className="glass-card rounded-xl p-5 space-y-3">
      <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Environmental Data
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ icon: Icon, label, value, sub }) => (
          <div key={label} className="bg-secondary/50 rounded-lg p-3 space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Icon className="w-3.5 h-3.5" />
              <span className="text-xs">{label}</span>
            </div>
            <p className="font-display text-sm font-semibold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
