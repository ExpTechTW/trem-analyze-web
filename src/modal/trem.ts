export interface TremEew {
  status: 0 | 1 | 2;
  final: 0 | 1;
  rts: boolean;
  detail: 0 | 1;
  reason: 1 | 2 | 3 | 4 | 5;
  trigger: number;
  eq: {
    time: number;
    lon: number;
    lat: number;
    depth: number;
    mag: number;
    loc: string;
    max: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  };
  time: number;
}

//
