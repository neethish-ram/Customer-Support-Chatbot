import { useState } from "react";
import { predict, type PredictionResult } from "@/lib/prediction";
import { getLocations } from "@/data/cityData";
import { PredictorForm } from "@/components/PredictorForm";
import { ResultCard } from "@/components/ResultCard";
import { CityDetails } from "@/components/CityDetails";

const Index = () => {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState("");

  const handlePredict = (input: { lat?: number; lon?: number; cityName?: string }) => {
    setError("");
    const res = predict(input);
    if (!res) {
      setError("Location not found in our database. Try a different city or GPS coordinate.");
      setResult(null);
    } else {
      setResult(res);
    }
  };

  const handleClear = () => {
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-10 right-10 text-6xl opacity-10 animate-float">🌾</div>
        <div className="absolute bottom-10 left-10 text-4xl opacity-10 animate-float" style={{ animationDelay: "1s" }}>🌱</div>
      </div>

      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="text-5xl animate-float">🌾</div>
          <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">
            Crop Yield<br />
            <span className="text-gradient">Predictor</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter a location or GPS coordinates to predict crop yield (kg/ha)
          </p>
        </div>

        {/* Form */}
        <PredictorForm
          locations={getLocations()}
          onPredict={handlePredict}
          onClear={handleClear}
          error={error}
        />

        {/* Results */}
        {result && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ResultCard result={result} />
            <CityDetails city={result.city} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
