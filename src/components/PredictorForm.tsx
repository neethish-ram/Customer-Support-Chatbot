import { useState } from "react";
import { MapPin, Search, RotateCcw, Navigation } from "lucide-react";

interface PredictorFormProps {
  locations: string[];
  onPredict: (input: { lat?: number; lon?: number; cityName?: string }) => void;
  onClear: () => void;
  error: string;
}

export function PredictorForm({ locations, onPredict, onClear, error }: PredictorFormProps) {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"gps" | "city">("city");
  const [gettingGps, setGettingGps] = useState(false);

  const handleSubmit = () => {
    if (!input.trim()) return;

    if (mode === "gps") {
      const cleaned = input.replace(/^GPS:/i, "").trim();
      const parts = cleaned.split(",").map(s => parseFloat(s.trim()));
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        onPredict({ lat: parts[0], lon: parts[1] });
      }
    } else {
      onPredict({ cityName: input.trim() });
    }
  };

  const handleUseGps = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser.");
      return;
    }
    setGettingGps(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(4);
        const lon = pos.coords.longitude.toFixed(4);
        setInput(`${lat},${lon}`);
        setMode("gps");
        setGettingGps(false);
      },
      () => {
        alert("Unable to get your location.");
        setGettingGps(false);
      }
    );
  };

  const handleClear = () => {
    setInput("");
    onClear();
  };

  return (
    <div className="glass-card rounded-xl p-6 space-y-4">
      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => { setMode("city"); setInput(""); }}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
            mode === "city"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          <MapPin className="inline w-4 h-4 mr-1 -mt-0.5" />
          City Name
        </button>
        <button
          onClick={() => { setMode("gps"); setInput(""); }}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
            mode === "gps"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          <Navigation className="inline w-4 h-4 mr-1 -mt-0.5" />
          GPS Coords
        </button>
      </div>

      {/* Input */}
      {mode === "city" ? (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="e.g. Delhi, Mumbai, Chennai..."
            list="city-list"
            className="w-full bg-secondary text-foreground rounded-lg pl-10 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <datalist id="city-list">
            {locations.map(loc => (
              <option key={loc} value={loc} />
            ))}
          </datalist>
        </div>
      ) : (
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="11.1021, 77.0269"
          className="w-full bg-secondary text-foreground rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
      )}

      {error && (
        <p className="text-destructive text-xs">{error}</p>
      )}

      {/* Actions */}
      <button
        onClick={handleSubmit}
        className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition-all active:scale-[0.98]"
      >
        Predict Yield
      </button>

      <div className="flex gap-2">
        {mode === "gps" && (
          <button
            onClick={handleUseGps}
            disabled={gettingGps}
            className="flex-1 border border-border text-foreground py-2.5 rounded-lg text-sm hover:bg-secondary transition-all"
          >
            {gettingGps ? "Getting GPS..." : "📍 Use My GPS"}
          </button>
        )}
        <button
          onClick={handleClear}
          className={`${mode === "gps" ? "flex-1" : "w-full"} border border-border text-foreground py-2.5 rounded-lg text-sm hover:bg-secondary transition-all flex items-center justify-center gap-1.5`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Clear
        </button>
      </div>
    </div>
  );
}
