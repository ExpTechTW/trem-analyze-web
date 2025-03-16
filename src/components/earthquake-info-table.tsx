import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { EarthquakeData, EarthquakeInfo, EarthquakeReport } from '@/modal/earthquake';
import { formatTime, searchEq } from '@/lib/utils';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

export default function EarthquakeInfoTable() {
  const [earthquakeInfo, setEarthquakeInfo] = useState<Array<EarthquakeInfo>>([]);
  const [earthquakeReport, setEarthquakeReport] = useState<Array<EarthquakeReport>>([]);
  const [earthquakeData, setEarthquakeData] = useState<Array<EarthquakeData>>([]);

  const router = useRouter();

  const openNewWindow = (id: string) => {
    void router.push(`/info?id=${id}`);
  };

  useEffect(() => {
    const fetchEarthquakeReport = async () => {
      const res = await fetch(`https://api-1.exptech.dev/api/v2/eq/report?limit=50&key=`);
      const ans = await res.json() as Array<EarthquakeReport>;
      setEarthquakeReport(ans);
    };
    void fetchEarthquakeReport();
  }, []);

  useEffect(() => {
    const fetchEarthquakeInfo = async () => {
      const res = await fetch(`https://api-1.exptech.dev/api/v1/trem/list?key=undefined`);
      const ans = await res.json() as Array<EarthquakeInfo>;
      setEarthquakeInfo(ans);
    };
    void fetchEarthquakeInfo();
  }, []);

  useEffect(() => {
    if (!earthquakeInfo.length && !earthquakeReport.length) return;
    const earthquakeDataArray: Array<EarthquakeData> = [];
    for (const data of earthquakeInfo) {
      const eq = (data.Cwa_id) ? searchEq(data.Cwa_id, earthquakeReport) : null;
      if (!eq) continue;
      const for_data: EarthquakeData = {
        id: eq.id,
        Source: data.Source,
        Serial: data.Serial,
        time: eq.time,
        trem: eq.trem,
        Loc: data.Loc,
        lat: eq.lat,
        lon: eq.lon,
        depth: eq.depth,
        mag: data.Mag,
        Max: data.Max,
        int: eq.int,
        Lpgm: data.Lpgm,
        Alarm: data.Alarm,
        md5: eq.md5,
        url: data.ID,
      };
      earthquakeDataArray.push(for_data);
    }
    setEarthquakeData(earthquakeDataArray);
  }, [earthquakeInfo, earthquakeReport]);

  return (
    <div>
      <div className="p-4 text-center text-3xl font-bold">
        TREM EEW
      </div>
      <div className="pr-8 pl-8">
        <Table className="w-full border-collapse border border-gray-500">
          <TableHeader>
            <TableRow className="bg-gray-300">
              <TableHead
                rowSpan={2}
                className="text-l border border-gray-500 text-center font-bold"
              >
                No.
              </TableHead>
              <TableHead
                rowSpan={2}
                className="text-l border border-gray-500 text-center font-bold"
              >
                EventID
              </TableHead>
              <TableHead
                rowSpan={2}
                className="text-l border border-gray-500 text-center font-bold"
              >
                發表單位
              </TableHead>
              <TableHead
                colSpan={12}
                className="text-l border border-gray-500 text-center font-bold"
              >
                震源・EEW資訊
              </TableHead>
            </TableRow>

            <TableRow className="bg-gray-300">
              <TableHead
                className="text-l border border-gray-500 text-center font-bold"
              >
                報數
              </TableHead>
              <TableHead
                className="text-l border border-gray-500 text-center font-bold"
              >
                檢知時刻
              </TableHead>
              <TableHead
                className="text-l border border-gray-500 text-center font-bold"
              >
                發震時刻(CWA)
              </TableHead>
              <TableHead
                className="text-l border border-gray-500 text-center font-bold"
              >
                震央地名
              </TableHead>
              <TableHead
                className="text-l border border-gray-500 text-center font-bold"
              >
                北緯
              </TableHead>
              <TableHead
                className="text-l border border-gray-500 text-center font-bold"
              >
                東經
              </TableHead>
              <TableHead
                className="text-l border border-gray-500 text-center font-bold"
              >
                深度
              </TableHead>
              <TableHead
                className="text-l border border-gray-500 text-center font-bold"
              >
                規模
              </TableHead>
              <TableHead
                className="text-l border border-gray-500 text-center font-bold"
              >
                預估最大震度
              </TableHead>
              <TableHead
                className="text-l border border-gray-500 text-center font-bold"
              >
                實測最大震度(CWA)
              </TableHead>
              <TableHead
                className="text-l border border-gray-500 text-center font-bold"
              >
                實測最大長周期
                <br />
                地震動階級
              </TableHead>
              <TableHead
                className="text-l border border-gray-500 text-center font-bold"
              >
                RTS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {earthquakeData.map((data, index) => (
              <TableRow key={data.id}>
                <TableCell className="border border-gray-300 text-center">{index + 1}</TableCell>
                <TableCell className="border border-gray-300 text-center" onClick={() => openNewWindow(data.url)}>{data.id}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.Source}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.Serial}</TableCell>
                <TableCell className="border border-gray-300 text-center">{formatTime(data.time)}</TableCell>
                <TableCell className="border border-gray-300 text-center">{formatTime(data.trem)}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.Loc}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.lat}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.lon}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.depth}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.mag}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.Max}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.int}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.Lpgm}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.Alarm ? 'TRUE' : ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>Taiwan Real-time Earthquake Monitoring｜2025｜ExpTech Studio</TableCaption>
        </Table>
      </div>
    </div>
  );
}
