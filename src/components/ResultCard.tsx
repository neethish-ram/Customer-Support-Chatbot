import type { PredictionResult } from "@/lib/prediction";
import { TrendingUp, MapPin } from "lucide-react";

interface ResultCardProps {
  result: PredictionResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const yieldLevel =
    result.yieldKgHa >= 3500 ? "Excellent" :
    result.yieldKgHa >= 2500 ? "Good" :
    result.yieldKgHa >= 1500 ? "Moderate" : "Low";

  const yieldColor =
    result.yieldKgHa >= 3500 ? "text-primary" :
    result.yieldKgHa >= 2500 ? "text-accent-foreground" :
    result.yieldKgHa >= 1500 ? "text-foreground" : "text-destructive";

  return (
    <div className="glass-card glow-border rounded-xl p-6 text-center space-y-3 animate-pulse-glow">
      <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
        <MapPin className="w-4 h-4" />
        <span>{result.city.location}</span>
        {result.distanceKm !== undefined && (
          <span className="text-xs">({result.distanceKm} km away)</span>
        )}
      </div>

      <div className={`text-4xl font-display font-bold ${yieldColor}`}>
        {result.yieldKgHa.toLocaleString()}
        <span className="text-lg text-muted-foreground ml-1">kg/ha</span>
      </div>

      <div className="flex items-center justify-center gap-1.5">
        <TrendingUp className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-foreground">{yieldLevel} Yield</span>
      </div>

      <p className="text-xs text-muted-foreground">
        Crop: <span className="text-foreground font-medium">{result.city.cropType}</span>
        {" · "}
        Fertilizer: <span className="text-foreground font-medium">{result.city.fertilizer}</span>
      </p>
    </div>
  );
}
