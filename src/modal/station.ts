export interface StationReport {
  ID: string;
  id: number;
  start: string;
  end: string;
  i: number;
  pga: number;
  pgv: number;
  sva: number;
  lpgm: number;
  sva30: number;
  ax: number;
  ay: number;
  az: number;
  vx: number;
  vy: number;
  vz: number;
}

interface StationInfo {
  code: number;
  lon: number;
  lat: number;
  time: string;
}

interface Station {
  net: 'SE-Net' | 'MS-Net';
  info: Array<StationInfo>;
  work: boolean;
}

export interface StationList {
  [id: string]: Station;
}
