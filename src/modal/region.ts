interface Town {
  code: number;
  lat: number;
  lon: number;
  site: number;
  area: string;
}

interface City {
  [districtName: string]: Town;
}

export interface Region {
  [cityName: string]: City;
}
