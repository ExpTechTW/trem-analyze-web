export interface EarthquakeReport {
  id: string;
  lat: number;
  lon: number;
  depth: number;
  loc?: string;
  mag: number;
  time: number;
  list: {
    lat: number;
    lon: number;
    int: number;
  };
  int: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  trem: number;
  md5: string;
}

export interface EarthquakeInfo {
  ID: string;
  Serial: number;
  Source: string;
  Cwa_id: string | null;
  Loc: string;
  Lat: number;
  Lon: number;
  Depth: number;
  Mag: number;
  Max: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  Lpgm: number;
  Alarm: number;
  False_alarm: number;
  Cancel: number;
  Triggered: number;
  List: string;
}

export interface EarthquakeData extends EarthquakeReport {
  Source: string;
  Serial: number;
  Loc: string;
  Max: number;
  Lpgm: number;
  Alarm: number;
  url: string;
}
