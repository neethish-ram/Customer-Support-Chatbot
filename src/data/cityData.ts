export interface CityData {
  location: string;
  // Weather
  meantemp: number;
  humidity: number;
  wind_speed: number;
  meanpressure: number;
  // Soil
  soilTemp: number;
  soilHumidity: number;
  moisture: number;
  soilType: string;
  cropType: string;
  nitrogen: number;
  potassium: number;
  phosphorous: number;
  fertilizer: string;
  // GPS approximate coords
  lat: number;
  lon: number;
}

// Approximate GPS coordinates for Indian cities
const cityCoords: Record<string, [number, number]> = {
  Ahmedabad: [23.0225, 72.5714], Bengaluru: [12.9716, 77.5946], Chennai: [13.0827, 80.2707],
  Coimbatore: [11.0168, 76.9558], Delhi: [28.7041, 77.1025], Hyderabad: [17.385, 78.4867],
  Jaipur: [26.9124, 75.7873], Kanpur: [26.4499, 80.3319], Kolkata: [22.5726, 88.3639],
  Lucknow: [26.8467, 80.9462], Mumbai: [19.076, 72.8777], Nagpur: [21.1458, 79.0882],
  Patna: [25.6093, 85.1376], Pune: [18.5204, 73.8567], Surat: [21.1702, 72.8311],
  Varanasi: [25.3176, 82.9739], Vijayawada: [16.5062, 80.6480], Visakhapatnam: [17.6868, 83.2185],
  Agra: [27.1767, 78.0081], Allahabad: [25.4358, 81.8463], Amritsar: [31.634, 74.8723],
  Aurangabad: [19.8762, 75.3433], Bareilly: [28.367, 79.4304], Bhopal: [23.2599, 77.4126],
  Bhubaneswar: [20.2961, 85.8245], Chandigarh: [30.7333, 76.7794], Dehradun: [30.3165, 78.0322],
  Dhanbad: [23.7957, 86.4304], Durgapur: [23.5204, 87.3119], Faridabad: [28.4089, 77.3178],
  Ghaziabad: [28.6692, 77.4538], Guntur: [16.3067, 80.4365], Guwahati: [26.1445, 91.7362],
  Gwalior: [26.2183, 78.1828], Hubli: [15.3647, 75.124], Indore: [22.7196, 75.8577],
  Jabalpur: [23.1815, 79.9864], Jalandhar: [31.326, 75.5762], Jammu: [32.7266, 74.857],
  Jodhpur: [26.2389, 73.0243], Kakinada: [16.9891, 82.2475], Kochi: [9.9312, 76.2673],
  Kollam: [8.8932, 76.6141], Kota: [25.2138, 75.8648], Kozhikode: [11.2588, 75.7804],
  Madurai: [9.9252, 78.1198], Mangalore: [12.9141, 74.856], Meerut: [28.9845, 77.7064],
  Moradabad: [28.8386, 78.7733], Mysore: [12.2958, 76.6394], Nanded: [19.1383, 77.321],
  Nashik: [20.0063, 73.7898], Nellore: [14.4426, 79.9865], Noida: [28.5355, 77.391],
  Pondicherry: [11.9416, 79.8083], Raipur: [21.2514, 81.6296], Rajahmundry: [17.0005, 81.8040],
  Rajkot: [22.3039, 70.8022], Ranchi: [23.3441, 85.3096], Rourkela: [22.2604, 84.8536],
  Salem: [11.6643, 78.146], Siliguri: [26.7271, 88.3953], Solapur: [17.6599, 75.9064],
  Srinagar: [34.0837, 74.7973], Thanjavur: [10.787, 79.1378], Thiruvananthapuram: [8.5241, 76.9366],
  Thrissur: [10.5276, 76.2144], Tiruchirappalli: [10.7905, 78.7047], Tirunelveli: [8.7139, 77.7567],
  Tirupati: [13.6288, 79.4192], Tiruppur: [11.1085, 77.3411], Udaipur: [24.5854, 73.7125],
  Ujjain: [23.1765, 75.7885], Vadodara: [22.3072, 73.1812], Vellore: [12.9165, 79.1325],
  Warangal: [17.9784, 79.5941], Aligarh: [27.8974, 78.088], Bikaner: [28.0229, 73.3119],
  Cuttack: [20.4625, 85.8828], Darbhanga: [26.1542, 85.8918], Erode: [11.341, 77.7172],
  Firozabad: [27.1591, 78.3957], Gorakhpur: [26.7606, 83.3732], Jalgaon: [21.0077, 75.5626],
  Kottayam: [9.5916, 76.5222], Latur: [18.4088, 76.5604], Muzaffarpur: [26.1209, 85.3647],
  Panipat: [29.3909, 76.9635], Sangli: [16.8524, 74.5815], Satna: [24.5801, 80.8322],
  Shivamogga: [13.9299, 75.568], Sikar: [27.6094, 75.1398], Tumkur: [13.3392, 77.1017],
  Tiruvannamalai: [12.2253, 79.0747], Ambala: [30.378, 76.7767], Haldwani: [29.2183, 79.5130],
  Dibrugarh: [27.4728, 94.9120], Jalna: [19.841, 75.8801],
};

// Merged weather + soil data from CSVs
const rawData: Array<{
  loc: string; mt: number; hum: number; ws: number; mp: number;
  st: number; sh: number; moist: number; soil: string; crop: string;
  n: number; k: number; p: number; fert: string;
}> = [
  {loc:"Ahmedabad",mt:15.91,hum:85.87,ws:2.74,mp:59,st:26,sh:52,moist:38,soil:"Sandy",crop:"Maize",n:37,k:0,p:0,fert:"Urea"},
  {loc:"Bengaluru",mt:18.5,hum:77.22,ws:2.89,mp:1018.28,st:29,sh:52,moist:45,soil:"Loamy",crop:"Sugarcane",n:12,k:0,p:36,fert:"DAP"},
  {loc:"Chennai",mt:17.11,hum:81.89,ws:4.02,mp:1018.33,st:34,sh:65,moist:62,soil:"Black",crop:"rice",n:7,k:9,p:30,fert:"14-35-14"},
  {loc:"Coimbatore",mt:18.7,hum:70.05,ws:4.55,mp:1015.7,st:32,sh:62,moist:34,soil:"Red",crop:"Tobacco",n:22,k:0,p:20,fert:"28-28"},
  {loc:"Delhi",mt:18.39,hum:74.94,ws:3.3,mp:1014.33,st:28,sh:54,moist:46,soil:"Clayey",crop:"Paddy",n:35,k:0,p:0,fert:"Urea"},
  {loc:"Hyderabad",mt:19.32,hum:79.32,ws:8.68,mp:1011.77,st:26,sh:52,moist:35,soil:"Sandy",crop:"Barley",n:12,k:10,p:13,fert:"17-17-17"},
  {loc:"Jaipur",mt:14.71,hum:95.83,ws:10.04,mp:1011.38,st:25,sh:50,moist:64,soil:"Red",crop:"Cotton",n:9,k:0,p:10,fert:"20-20"},
  {loc:"Kanpur",mt:15.68,hum:83.53,ws:1.95,mp:1015.55,st:33,sh:64,moist:50,soil:"Loamy",crop:"Wheat",n:41,k:0,p:0,fert:"Urea"},
  {loc:"Kolkata",mt:14.57,hum:80.81,ws:6.54,mp:1015.95,st:30,sh:60,moist:42,soil:"Sandy",crop:"Millets",n:21,k:0,p:18,fert:"28-28"},
  {loc:"Lucknow",mt:12.11,hum:71.94,ws:9.36,mp:1016.89,st:29,sh:58,moist:33,soil:"Black",crop:"Oil seeds",n:9,k:7,p:30,fert:"14-35-14"},
  {loc:"Mumbai",mt:11,hum:72.11,ws:9.77,mp:1016.78,st:27,sh:54,moist:28,soil:"Clayey",crop:"Pulses",n:13,k:0,p:40,fert:"DAP"},
  {loc:"Nagpur",mt:11.79,hum:74.58,ws:6.63,mp:1016.37,st:31,sh:62,moist:48,soil:"Sandy",crop:"Maize",n:14,k:15,p:12,fert:"17-17-17"},
  {loc:"Patna",mt:13.24,hum:67.06,ws:6.44,mp:1017.53,st:25,sh:50,moist:65,soil:"Loamy",crop:"Cotton",n:36,k:0,p:0,fert:"Urea"},
  {loc:"Pune",mt:13.2,hum:74.28,ws:5.28,mp:1018.84,st:32,sh:62,moist:41,soil:"Clayey",crop:"Paddy",n:24,k:0,p:22,fert:"28-28"},
  {loc:"Surat",mt:16.43,hum:72.57,ws:3.63,mp:1018.13,st:26,sh:52,moist:31,soil:"Red",crop:"Ground Nuts",n:14,k:0,p:41,fert:"DAP"},
  {loc:"Varanasi",mt:14.65,hum:78.45,ws:10.38,mp:1017.15,st:31,sh:62,moist:49,soil:"Black",crop:"Sugarcane",n:10,k:13,p:14,fert:"17-17-17"},
  {loc:"Vijayawada",mt:11.72,hum:84.44,ws:8.04,mp:1018.39,st:33,sh:64,moist:34,soil:"Clayey",crop:"Pulses",n:38,k:0,p:0,fert:"Urea"},
  {loc:"Visakhapatnam",mt:13.04,hum:78.33,ws:6.03,mp:1021.96,st:25,sh:50,moist:39,soil:"Sandy",crop:"Barley",n:21,k:0,p:19,fert:"28-28"},
  {loc:"Agra",mt:14.62,hum:75.14,ws:10.34,mp:1022.81,st:28,sh:54,moist:65,soil:"Black",crop:"Cotton",n:39,k:0,p:0,fert:"Urea"},
  {loc:"Allahabad",mt:15.26,hum:66.47,ws:11.23,mp:1021.79,st:29,sh:58,moist:52,soil:"Loamy",crop:"Wheat",n:13,k:0,p:36,fert:"DAP"},
  {loc:"Amritsar",mt:15.39,hum:70.87,ws:13.7,mp:1020.48,st:30,sh:60,moist:44,soil:"Sandy",crop:"Millets",n:10,k:0,p:9,fert:"20-20"},
  {loc:"Aurangabad",mt:18.44,hum:76.24,ws:5.87,mp:1021.04,st:34,sh:65,moist:53,soil:"Loamy",crop:"Sugarcane",n:12,k:14,p:12,fert:"17-17-17"},
  {loc:"Bareilly",mt:18.12,hum:76,ws:6.75,mp:1019.82,st:35,sh:68,moist:33,soil:"Red",crop:"Tobacco",n:11,k:0,p:37,fert:"DAP"},
  {loc:"Bhopal",mt:18.35,hum:68.13,ws:3.39,mp:1018.87,st:28,sh:54,moist:37,soil:"Black",crop:"Millets",n:36,k:0,p:0,fert:"Urea"},
  {loc:"Bhubaneswar",mt:21,hum:69.96,ws:8.76,mp:1018.4,st:33,sh:64,moist:39,soil:"Clayey",crop:"Paddy",n:13,k:0,p:10,fert:"20-20"},
  {loc:"Chandigarh",mt:16.18,hum:91.64,ws:8.47,mp:1017.79,st:26,sh:52,moist:44,soil:"Sandy",crop:"Maize",n:23,k:0,p:20,fert:"28-28"},
  {loc:"Dehradun",mt:16.5,hum:77.04,ws:14.36,mp:1018.13,st:30,sh:60,moist:63,soil:"Red",crop:"Cotton",n:9,k:9,p:29,fert:"14-35-14"},
  {loc:"Dhanbad",mt:14.86,hum:82.77,ws:9.69,mp:1019.64,st:32,sh:62,moist:30,soil:"Loamy",crop:"Sugarcane",n:38,k:0,p:0,fert:"Urea"},
  {loc:"Durgapur",mt:15.67,hum:81.78,ws:10.29,mp:1017.39,st:37,sh:70,moist:32,soil:"Black",crop:"Oil seeds",n:12,k:0,p:39,fert:"DAP"},
  {loc:"Faridabad",mt:16.44,hum:77.56,ws:4.32,mp:1015.83,st:26,sh:52,moist:36,soil:"Clayey",crop:"Pulses",n:14,k:0,p:13,fert:"20-20"},
  {loc:"Ghaziabad",mt:16.13,hum:76,ws:4.63,mp:1015.5,st:29,sh:58,moist:40,soil:"Red",crop:"Ground Nuts",n:24,k:0,p:23,fert:"28-28"},
  {loc:"Guntur",mt:15.25,hum:78.63,ws:5.1,mp:1017.5,st:30,sh:60,moist:27,soil:"Loamy",crop:"Sugarcane",n:12,k:0,p:40,fert:"DAP"},
  {loc:"Guwahati",mt:17.09,hum:66.55,ws:3.03,mp:1018.91,st:34,sh:65,moist:38,soil:"Clayey",crop:"Paddy",n:39,k:0,p:0,fert:"Urea"},
  {loc:"Gwalior",mt:15.64,hum:78.18,ws:1.85,mp:1017.73,st:36,sh:68,moist:38,soil:"Sandy",crop:"Barley",n:7,k:9,p:30,fert:"14-35-14"},
  {loc:"Hubli",mt:18.7,hum:77.6,ws:9.82,mp:1014.4,st:26,sh:52,moist:48,soil:"Loamy",crop:"Wheat",n:23,k:0,p:19,fert:"28-28"},
  {loc:"Indore",mt:18.63,hum:77.63,ws:8.1,mp:1014.21,st:28,sh:54,moist:35,soil:"Black",crop:"Millets",n:41,k:0,p:0,fert:"Urea"},
  {loc:"Jabalpur",mt:16.89,hum:69.67,ws:9.04,mp:1016,st:30,sh:60,moist:61,soil:"Loamy",crop:"Cotton",n:8,k:10,p:31,fert:"14-35-14"},
  {loc:"Jalandhar",mt:15.13,hum:63.75,ws:7.64,mp:1016.13,st:37,sh:70,moist:37,soil:"Clayey",crop:"Paddy",n:12,k:0,p:41,fert:"DAP"},
  {loc:"Jammu",mt:15.7,hum:68.4,ws:4.08,mp:1015.6,st:25,sh:50,moist:26,soil:"Red",crop:"Ground Nuts",n:15,k:14,p:11,fert:"17-17-17"},
  {loc:"Jodhpur",mt:15.38,hum:68.38,ws:7.88,mp:1016.38,st:29,sh:58,moist:34,soil:"Sandy",crop:"Millets",n:15,k:0,p:37,fert:"DAP"},
  {loc:"Kakinada",mt:14.67,hum:71.78,ws:9.07,mp:1015.67,st:27,sh:54,moist:30,soil:"Clayey",crop:"Pulses",n:13,k:0,p:13,fert:"20-20"},
  {loc:"Kochi",mt:15.63,hum:64,ws:3.95,mp:1016.63,st:30,sh:60,moist:58,soil:"Loamy",crop:"Sugarcane",n:10,k:7,p:32,fert:"14-35-14"},
  {loc:"Kollam",mt:16.25,hum:70.38,ws:1.63,mp:1019.63,st:32,sh:62,moist:34,soil:"Red",crop:"Tobacco",n:22,k:0,p:24,fert:"28-28"},
  {loc:"Kota",mt:16.33,hum:67,ws:6.38,mp:1021.56,st:34,sh:65,moist:60,soil:"Black",crop:"Sugarcane",n:35,k:0,p:0,fert:"Urea"},
  {loc:"Kozhikode",mt:16.88,hum:65.5,ws:6.96,mp:1021.38,st:35,sh:67,moist:42,soil:"Sandy",crop:"Barley",n:10,k:0,p:35,fert:"DAP"},
  {loc:"Madurai",mt:17.57,hum:67.71,ws:5.56,mp:1020.57,st:38,sh:70,moist:48,soil:"Loamy",crop:"Wheat",n:8,k:8,p:28,fert:"14-35-14"},
  {loc:"Mangalore",mt:20.25,hum:56.75,ws:10.44,mp:1017.63,st:26,sh:52,moist:32,soil:"Black",crop:"Oil seeds",n:12,k:0,p:8,fert:"20-20"},
  {loc:"Meerut",mt:21.3,hum:64.4,ws:9.28,mp:1016.5,st:29,sh:58,moist:43,soil:"Clayey",crop:"Paddy",n:24,k:0,p:18,fert:"28-28"},
  {loc:"Moradabad",mt:21.13,hum:70.75,ws:6.25,mp:1016.25,st:30,sh:60,moist:29,soil:"Red",crop:"Ground Nuts",n:41,k:0,p:0,fert:"Urea"},
  {loc:"Mysore",mt:22.36,hum:66.09,ws:6.05,mp:1013,st:33,sh:64,moist:51,soil:"Sandy",crop:"Maize",n:5,k:9,p:29,fert:"14-35-14"},
  {loc:"Nanded",mt:23.38,hum:60.13,ws:6.94,mp:1005.38,st:34,sh:65,moist:31,soil:"Red",crop:"Tobacco",n:23,k:0,p:21,fert:"28-28"},
  {loc:"Nashik",mt:21.83,hum:69.42,ws:12.34,mp:1007.42,st:36,sh:68,moist:33,soil:"Black",crop:"Oil seeds",n:13,k:0,p:14,fert:"20-20"},
  {loc:"Nellore",mt:19.13,hum:57.13,ws:7.41,mp:1012.25,st:28,sh:54,moist:38,soil:"Clayey",crop:"Pulses",n:40,k:0,p:0,fert:"Urea"},
  {loc:"Noida",mt:18.63,hum:42.88,ws:14.35,mp:1015.25,st:30,sh:60,moist:47,soil:"Sandy",crop:"Barley",n:12,k:0,p:42,fert:"DAP"},
  {loc:"Pondicherry",mt:19.13,hum:40.38,ws:16.66,mp:1016.13,st:31,sh:62,moist:63,soil:"Red",crop:"Cotton",n:11,k:12,p:15,fert:"17-17-17"},
  {loc:"Raipur",mt:19,hum:50.43,ws:11.93,mp:1014.29,st:27,sh:53,moist:43,soil:"Black",crop:"Millets",n:23,k:0,p:24,fert:"28-28"},
  {loc:"Rajahmundry",mt:18.75,hum:59,ws:11.11,mp:1012.38,st:34,sh:65,moist:54,soil:"Loamy",crop:"Wheat",n:38,k:0,p:0,fert:"Urea"},
  {loc:"Rajkot",mt:19.88,hum:58.38,ws:5.1,mp:1014.25,st:29,sh:58,moist:37,soil:"Sandy",crop:"Millets",n:8,k:0,p:15,fert:"20-20"},
  {loc:"Ranchi",mt:23.33,hum:51.67,ws:3.91,mp:1013.11,st:25,sh:50,moist:56,soil:"Loamy",crop:"Sugarcane",n:11,k:13,p:15,fert:"17-17-17"},
  {loc:"Rourkela",mt:24.46,hum:47.92,ws:6.42,mp:1012.92,st:32,sh:62,moist:34,soil:"Red",crop:"Ground Nuts",n:15,k:0,p:37,fert:"DAP"},
  {loc:"Salem",mt:23.75,hum:54.25,ws:5.93,mp:1012.15,st:28,sh:54,moist:41,soil:"Clayey",crop:"Paddy",n:36,k:0,p:0,fert:"Urea"},
  {loc:"Siliguri",mt:20.5,hum:42.5,ws:7.41,mp:1010.63,st:30,sh:60,moist:49,soil:"Loamy",crop:"Wheat",n:13,k:0,p:9,fert:"20-20"},
  {loc:"Solapur",mt:19.13,hum:43.13,ws:8.35,mp:1010,st:34,sh:65,moist:64,soil:"Black",crop:"Cotton",n:24,k:0,p:20,fert:"28-28"},
  {loc:"Srinagar",mt:19.75,hum:41.25,ws:9.96,mp:1010.5,st:28,sh:54,moist:47,soil:"Sandy",crop:"Barley",n:5,k:18,p:15,fert:"10-26-26"},
  {loc:"Thanjavur",mt:20,hum:42.44,ws:9.67,mp:1010.33,st:27,sh:53,moist:35,soil:"Black",crop:"Oil seeds",n:37,k:0,p:0,fert:"Urea"},
  {loc:"Thiruvananthapuram",mt:22.63,hum:41.5,ws:6.03,mp:1007.38,st:36,sh:68,moist:62,soil:"Red",crop:"Cotton",n:15,k:0,p:40,fert:"DAP"},
  {loc:"Thrissur",mt:21.55,hum:52.73,ws:10.26,mp:1008.91,st:34,sh:65,moist:57,soil:"Black",crop:"Sugarcane",n:9,k:0,p:13,fert:"20-20"},
  {loc:"Tiruchirappalli",mt:20.79,hum:69.07,ws:8.34,mp:1007.36,st:29,sh:58,moist:55,soil:"Loamy",crop:"Sugarcane",n:8,k:8,p:33,fert:"14-35-14"},
  {loc:"Tirunelveli",mt:19.94,hum:67.75,ws:11.46,mp:1006.88,st:25,sh:50,moist:40,soil:"Clayey",crop:"Pulses",n:6,k:19,p:16,fert:"10-26-26"},
  {loc:"Tirupati",mt:18.53,hum:60.4,ws:5.57,mp:1009.8,st:30,sh:60,moist:38,soil:"Sandy",crop:"Millets",n:10,k:0,p:14,fert:"20-20"},
  {loc:"Tiruppur",mt:17.38,hum:56.63,ws:7.64,mp:1014.75,st:26,sh:52,moist:39,soil:"Clayey",crop:"Pulses",n:21,k:0,p:23,fert:"28-28"},
  {loc:"Udaipur",mt:17.44,hum:49.33,ws:9.06,mp:1014.89,st:31,sh:62,moist:32,soil:"Red",crop:"Tobacco",n:39,k:0,p:0,fert:"Urea"},
  {loc:"Ujjain",mt:18,hum:56.33,ws:4.52,mp:1016.56,st:34,sh:65,moist:48,soil:"Loamy",crop:"Wheat",n:23,k:0,p:19,fert:"28-28"},
  {loc:"Vadodara",mt:19.88,hum:54.75,ws:7.18,mp:1014.13,st:27,sh:53,moist:34,soil:"Black",crop:"Oil seeds",n:42,k:0,p:0,fert:"Urea"},
  {loc:"Vellore",mt:24,hum:49.2,ws:5.56,mp:1011.1,st:33,sh:64,moist:31,soil:"Red",crop:"Ground Nuts",n:13,k:0,p:39,fert:"DAP"},
  {loc:"Warangal",mt:20.9,hum:59.7,ws:11.49,mp:1010.7,st:29,sh:58,moist:42,soil:"Clayey",crop:"Paddy",n:9,k:10,p:22,fert:"14-35-14"},
  {loc:"Aligarh",mt:24.69,hum:46.31,ws:7.12,mp:1009.85,st:30,sh:60,moist:47,soil:"Sandy",crop:"Maize",n:22,k:0,p:21,fert:"28-28"},
  {loc:"Bikaner",mt:24.67,hum:52.28,ws:9.16,mp:1011.89,st:27,sh:53,moist:59,soil:"Loamy",crop:"Sugarcane",n:10,k:0,p:15,fert:"20-20"},
  {loc:"Cuttack",mt:23.33,hum:54.67,ws:10.08,mp:1012.56,st:26,sh:52,moist:36,soil:"Clayey",crop:"Pulses",n:7,k:16,p:20,fert:"10-26-26"},
  {loc:"Darbhanga",mt:25,hum:49,ws:9.26,mp:1011.75,st:34,sh:65,moist:63,soil:"Red",crop:"Cotton",n:14,k:0,p:38,fert:"DAP"},
  {loc:"Erode",mt:27.25,hum:45,ws:10.19,mp:1009.75,st:28,sh:54,moist:43,soil:"Clayey",crop:"Paddy",n:10,k:8,p:29,fert:"14-35-14"},
  {loc:"Firozabad",mt:28,hum:49.75,ws:3.49,mp:1008.88,st:30,sh:60,moist:40,soil:"Sandy",crop:"Millets",n:41,k:0,p:0,fert:"Urea"},
  {loc:"Gorakhpur",mt:28.92,hum:37.67,ws:10.03,mp:1010.58,st:29,sh:58,moist:65,soil:"Black",crop:"Cotton",n:14,k:0,p:35,fert:"DAP"},
  {loc:"Jalgaon",mt:26.5,hum:39.38,ws:10.43,mp:1009.88,st:26,sh:52,moist:59,soil:"Loamy",crop:"Sugarcane",n:11,k:0,p:9,fert:"20-20"},
  {loc:"Kottayam",mt:29.1,hum:37.1,ws:17.59,mp:1010.2,st:31,sh:62,moist:44,soil:"Sandy",crop:"Barley",n:21,k:0,p:28,fert:"28-28"},
  {loc:"Latur",mt:29.5,hum:38.63,ws:13.65,mp:1009.5,st:35,sh:67,moist:28,soil:"Clayey",crop:"Pulses",n:8,k:7,p:31,fert:"14-35-14"},
  {loc:"Muzaffarpur",mt:29.89,hum:40.67,ws:8.84,mp:1009,st:29,sh:58,moist:30,soil:"Red",crop:"Tobacco",n:13,k:17,p:16,fert:"10-26-26"},
  {loc:"Panipat",mt:31,hum:34.5,ws:13.2,mp:1007.13,st:27,sh:53,moist:30,soil:"Black",crop:"Millets",n:35,k:0,p:0,fert:"Urea"},
  {loc:"Sangli",mt:29.29,hum:36.86,ws:10.59,mp:1007.14,st:36,sh:68,moist:50,soil:"Loamy",crop:"Wheat",n:12,k:18,p:19,fert:"10-26-26"},
  {loc:"Satna",mt:30.63,hum:37.63,ws:6.95,mp:1007.5,st:29,sh:58,moist:61,soil:"Loamy",crop:"Cotton",n:11,k:0,p:38,fert:"DAP"},
  {loc:"Shivamogga",mt:31.38,hum:35.13,ws:9.04,mp:1005,st:30,sh:60,moist:26,soil:"Black",crop:"Oil seeds",n:8,k:9,p:30,fert:"14-35-14"},
  {loc:"Sikar",mt:29.75,hum:33.75,ws:9.26,mp:1004.25,st:34,sh:65,moist:45,soil:"Clayey",crop:"Paddy",n:6,k:19,p:21,fert:"10-26-26"},
  {loc:"Tumkur",mt:30.5,hum:29.75,ws:6.94,mp:1004.25,st:36,sh:68,moist:41,soil:"Red",crop:"Ground Nuts",n:41,k:0,p:0,fert:"Urea"},
  {loc:"Tiruvannamalai",mt:30.93,hum:31.87,ws:14.32,mp:1007.2,st:28,sh:54,moist:25,soil:"Sandy",crop:"Maize",n:9,k:10,p:30,fert:"14-35-14"},
  {loc:"Ambala",mt:29.23,hum:46,ws:14.38,mp:1005,st:25,sh:50,moist:32,soil:"Clayey",crop:"Pulses",n:24,k:0,p:19,fert:"28-28"},
  {loc:"Haldwani",mt:31.22,hum:26,ws:13.58,mp:1002.89,st:30,sh:60,moist:27,soil:"Red",crop:"Tobacco",n:4,k:17,p:17,fert:"10-26-26"},
  {loc:"Dibrugarh",mt:27,hum:29.88,ws:4.65,mp:1007.38,st:38,sh:72,moist:51,soil:"Loamy",crop:"Wheat",n:39,k:0,p:0,fert:"Urea"},
  {loc:"Jalna",mt:25.63,hum:29.38,ws:8.34,mp:1010.38,st:36,sh:60,moist:43,soil:"Sandy",crop:"Millets",n:15,k:0,p:41,fert:"DAP"},
];

export const cityDataList: CityData[] = rawData.map(d => {
  const coords = cityCoords[d.loc] || [20, 78];
  return {
    location: d.loc,
    meantemp: d.mt, humidity: d.hum, wind_speed: d.ws, meanpressure: d.mp,
    soilTemp: d.st, soilHumidity: d.sh, moisture: d.moist,
    soilType: d.soil, cropType: d.crop,
    nitrogen: d.n, potassium: d.k, phosphorous: d.p, fertilizer: d.fert,
    lat: coords[0], lon: coords[1],
  };
});

export const getLocations = () => cityDataList.map(c => c.location).sort();
