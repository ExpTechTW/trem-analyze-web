export interface EarthquakeInfo {
  id: string;
  lat: number;
  lon: number;
  depth: number;
  loc: string;
  mag: number;
  time: number;
  int: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  trem: number;
  md5: string;
}
