import { cityDataList, type CityData } from "@/data/cityData";

// Haversine distance in km
function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function findNearestCity(lat: number, lon: number): CityData {
  let nearest = cityDataList[0];
  let minDist = Infinity;
  for (const city of cityDataList) {
    const dist = haversine(lat, lon, city.lat, city.lon);
    if (dist < minDist) {
      minDist = dist;
      nearest = city;
    }
  }
  return nearest;
}

export function findCityByName(name: string): CityData | undefined {
  return cityDataList.find(c => c.location.toLowerCase() === name.toLowerCase());
}

// Replicates the Python synthetic yield formula
export function predictYield(city: CityData): number {
  // Get min/max for normalization from all cities
  const allN = cityDataList.map(c => c.nitrogen);
  const allP = cityDataList.map(c => c.phosphorous);
  const allK = cityDataList.map(c => c.potassium);

  const normalize = (val: number, arr: number[]) => {
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    return max > min ? (val - min) / (max - min) : 0;
  };

  const nNorm = normalize(city.nitrogen, allN);
  const pNorm = normalize(city.phosphorous, allP);
  const kNorm = normalize(city.potassium, allK);

  // Weather effects
  const tempEffect = Math.exp(-0.5 * ((city.meantemp - 25) / 5) ** 2);
  const humEffect = 1 - city.humidity / 100;

  // Synthetic yield (0-1 range before scaling)
  const rawYield =
    (0.6 * nNorm + 0.25 * pNorm + 0.15 * kNorm) * 0.7 +
    0.3 * tempEffect +
    0.1 * humEffect;

  // Scale to 1000-5000 kg/ha range
  const yieldValue = rawYield * 4000 + 1000;

  return Math.round(yieldValue * 100) / 100;
}

export interface PredictionResult {
  city: CityData;
  yieldKgHa: number;
  distanceKm?: number;
}

export function predict(input: { lat?: number; lon?: number; cityName?: string }): PredictionResult | null {
  let city: CityData | undefined;
  let distanceKm: number | undefined;

  if (input.cityName) {
    city = findCityByName(input.cityName);
  } else if (input.lat !== undefined && input.lon !== undefined) {
    city = findNearestCity(input.lat, input.lon);
    distanceKm = haversine(input.lat, input.lon, city.lat, city.lon);
  }

  if (!city) return null;

  return {
    city,
    yieldKgHa: predictYield(city),
    distanceKm: distanceKm ? Math.round(distanceKm * 10) / 10 : undefined,
  };
}
