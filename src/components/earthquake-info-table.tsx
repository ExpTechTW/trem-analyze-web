import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { EarthquakeInfo, EarthquakeReport } from '@/modal/earthquake';
import { formatTime, getIntensityClass, getLpgmClass, intensity_list } from '@/lib/utils';

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
  const searchParams = useSearchParams();

  const router = useRouter();

  const openNewWindow = (id: string) => {
    void router.push(`/info?id=${id}${searchParams.get('dev') ? '&dev=1' : ''}`);
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
      const res = await fetch(`https://api-1.exptech.dev/api/v1/trem/list?key=`);
      const ans = await res.json() as Array<EarthquakeInfo>;
      setEarthquakeInfo(ans);
    };
    void fetchEarthquakeInfo();
  }, []);

  const findCwaEarthquake = (id: string) => {
    return earthquakeReport.find((data) => data.id == id);
  };

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
            {earthquakeInfo.filter((data) => searchParams.get('dev') || data.Alarm).map((data, index) => (
              <TableRow key={data.ID}>
                <TableCell className="border border-gray-300 text-center">{index + 1}</TableCell>
                <TableCell
                  className={`
                    cursor-pointer border border-gray-300 text-center
                    text-blue-700 underline
                  `}
                  onClick={() => openNewWindow(data.ID)}
                >
                  {formatTime(Number(data.ID))
                    .replaceAll('/', '')
                    .replaceAll(':', '')
                    .replace(' ', '')}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">{data.Source}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.Serial}</TableCell>
                <TableCell className="border border-gray-300 text-center">{formatTime(Number(data.ID))}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.Cwa_id ? formatTime(findCwaEarthquake(data.Cwa_id)?.time ?? 0) : ''}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.Loc}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.Lat}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.Lon}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.Depth}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.Mag.toFixed(1)}</TableCell>
                <TableCell className={`
                  border border-gray-300 text-center
                  ${getIntensityClass(data.Max)}
                `}
                >
                  {intensity_list[data.Max]}
                </TableCell>
                <TableCell className={`
                  border border-gray-300 text-center
                  ${getIntensityClass(data.Cwa_id ? findCwaEarthquake(data.Cwa_id)?.int ?? 0 : 0)}
                `}
                >
                  {data.Cwa_id ? intensity_list[findCwaEarthquake(data.Cwa_id)?.int ?? 0] : ''}
                </TableCell>
                <TableCell className={`
                  border border-gray-300 text-center
                  ${getLpgmClass(data.Lpgm)}
                `}
                >
                  {data.Lpgm}
                </TableCell>
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
