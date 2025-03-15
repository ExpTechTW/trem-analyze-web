'use client';
import { useEffect, useState } from 'react';

import { EarthquakeInfo } from '@/modal/earthquake-info';
import EarthquakeInfoTable from '@/components/earthquake-info-table';

export default function HomePage() {
  const [earthquakeInfo, setEarthquakeInfo] = useState<Array<EarthquakeInfo>>([]);

  useEffect(() => {
    if (!earthquakeInfo.length) return;
    console.log(earthquakeInfo);
  }, [earthquakeInfo]);

  useEffect(() => {
    const fetchEarthquakeInfo = async () => {
      const res = await fetch(`https://api-1.exptech.dev/api/v2/eq/report?limit=50&key=`);
      const ans = await res.json() as Array<EarthquakeInfo>;
      setEarthquakeInfo(ans);
    };
    void fetchEarthquakeInfo();
  }, []);

  return (
    <EarthquakeInfoTable />
  );
}
