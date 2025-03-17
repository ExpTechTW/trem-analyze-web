import { notFound } from 'next/navigation';

import EarthquakeData from '@/components/earthquake-data-table';
import { EarthquakeInfo, EarthquakeReport } from '@/modal/earthquake';
import { Region } from '@/modal/region';
import { StationList, StationReport } from '@/modal/station';
import { TremEew } from '@/modal/trem';

async function getData(id: string) {
  if (!id) {
    return null;
  }

  try {
    const [earthquakeInfoRes, tremEewRes, regionRes, stationRes] = await Promise.all([
      fetch(`https://api-1.exptech.dev/api/v1/trem/list/${id}?key=`, { next: { revalidate: 30 } }),
      fetch(`https://api-1.exptech.dev/api/v1/trem/report/${id}`, { next: { revalidate: 30 } }),
      fetch(`https://raw.githack.com/ExpTechTW/API/master/resource/region.json`, { next: { revalidate: 3600 } }),
      fetch(`https://api-1.exptech.dev/api/v1/trem/station`, { next: { revalidate: 3600 } }),
    ]);

    const earthquakeInfo = await earthquakeInfoRes.json() as EarthquakeInfo;
    const tremEew = await tremEewRes.json() as Array<TremEew>;
    const region = await regionRes.json() as Region;
    const station = await stationRes.json() as StationList;

    const earthquakeReportRes = await fetch(
      `https://api-1.exptech.dev/api/v2/eq/report/${earthquakeInfo.Cwa_id}?key=`,
      { next: { revalidate: 30 } },
    );
    const earthquakeReport = await earthquakeReportRes.json() as EarthquakeReport;

    const stationReportRes = await fetch('https://api-1.exptech.dev/api/v1/trem/info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ list: JSON.parse(earthquakeInfo.List) as object }),
      next: { revalidate: 30 },
    });
    const stationReport = await stationReportRes.json() as Array<StationReport>;

    return {
      earthquakeInfo,
      earthquakeReport,
      region,
      station,
      tremEew,
      stationReport,
    };
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

interface InfoPageProps {
  searchParams: Promise<{
    id?: string;
    dev?: string;
  }>;
}

export default async function InfoPage({ searchParams }: InfoPageProps) {
  const params = await searchParams;
  const data = await getData(params.id || '');

  if (!data) {
    notFound();
  }

  return (
    <EarthquakeData
      initialData={data}
      dev={params.dev === '1'}
    />
  );
}

export const dynamic = 'force-dynamic';
export const revalidate = 30;
