import EarthquakeInfoTable from '@/components/earthquake-info-table';
import { EarthquakeInfo, EarthquakeReport } from '@/modal/earthquake';

async function getData(month?: string) {
  try {
    const earthquakeInfoUrl = month
      ? `https://api-1.exptech.dev/api/v1/trem/month/${month}?key=`
      : `https://api-1.exptech.dev/api/v1/trem/list?key=`;

    const [earthquakeInfoRes, earthquakeReportRes] = await Promise.all([
      fetch(earthquakeInfoUrl, {
        next: { revalidate: 30 },
      }),
      fetch(`https://api-1.exptech.dev/api/v2/eq/report?limit=50&key=`, {
        next: { revalidate: 30 },
      }),
    ]);

    const earthquakeInfo = await earthquakeInfoRes.json() as Array<EarthquakeInfo>;
    const earthquakeReport = await earthquakeReportRes.json() as Array<EarthquakeReport>;

    return {
      earthquakeInfo,
      earthquakeReport,
    };
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {
      earthquakeInfo: [],
      earthquakeReport: [],
    };
  }
}

interface HomePageProps {
  searchParams: {
    page?: string;
    dev?: string;
    month?: string;
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { month } = searchParams;
  const data = await getData(month);

  return (
    <EarthquakeInfoTable
      initialData={data}
      page={searchParams.page ? parseInt(searchParams.page) : 1}
      dev={searchParams.dev === '1'}
      month={searchParams.month}
    />
  );
}

export const dynamic = 'force-dynamic';
export const revalidate = 30;
