interface Town {
  code: number;
  lat: number;
  lon: number;
  site: number;
  area: string;
}

type City = Record<string, Town>;

export type Region = Record<string, City>;
