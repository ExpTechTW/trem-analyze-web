'use client';

import { Undo2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EarthquakeInfo, EarthquakeReport } from '@/modal/earthquake';
import { Region } from '@/modal/region';
import { StationList, StationReport } from '@/modal/station';
import { TremEew } from '@/modal/trem';
import { distance, findLocationByCode, findMaxInt, formatTime, getIntensityClass, getLpgmClass, intensity_float_to_int, intensity_list } from '@/lib/utils';

import { DialogDataMessage } from './warn-dialog';

interface EarthquakeDataProps {
  initialData: {
    earthquakeInfo: EarthquakeInfo;
    earthquakeReport: EarthquakeReport;
    region: Region;
    station: StationList;
    tremEew: TremEew[];
    stationReport: StationReport[];
  };
  dev: boolean;
}

function getStationInfoById(station: StationList, id: string) {
  if (!station || !id) return null;
  return station[id] ?? null;
}

function getLocMatch(text: string) {
  const match = /\(位於(.*?)\)/.exec(text);
  if (match) {
    return match[1];
  }
  return '';
}

export default function EarthquakeData({ initialData, dev }: EarthquakeDataProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams();

  const {
    earthquakeInfo,
    earthquakeReport,
    region,
    station,
    tremEew,
    stationReport,
  } = initialData;

  if (dev) params.set('dev', '1');
  if (searchParams.get('page')) params.set('page', searchParams.get('page') ?? '');
  if (searchParams.get('month')) params.set('month', searchParams.get('month') ?? '');

  return (
    <div>
      <DialogDataMessage />
      <div className="flex cursor-pointer items-center justify-start pl-2 pt-2">
        <a
          onClick={() => void router.push(`/?${params.toString()}`)}
          className={`
            flex items-center space-x-2 rounded-2xl bg-sky-400 px-3 py-1.5
            shadow-sm transition
            hover:bg-sky-500
          `}
        >
          <div className={`
            flex h-6 w-6 items-center justify-center rounded-full bg-blue-100
          `}
          >
            <Undo2 className="h-4 w-4 text-blue-700" />
          </div>
          <span className="text-base font-medium text-white">返回首頁</span>
        </a>
      </div>

      {earthquakeInfo.Cwa_id && (
        <div className="px-8 pb-4 pt-6">
          <Table className="w-full border-collapse border border-gray-300">
            <TableHeader>
              <TableRow className={`
                bg-primary
                hover:bg-primary
              `}
              >
                <TableHead
                  colSpan={8}
                  className={`
                    text-l border border-gray-500 text-center font-bold
                  `}
                >
                  CWA 地震報告
                </TableHead>
              </TableRow>
              <TableRow className={`
                bg-primary
                hover:bg-primary
              `}
              >
                <TableHead className={`
                  text-l border border-gray-500 text-center font-bold
                `}
                >
                  發生時刻
                </TableHead>
                <TableHead className={`
                  text-l border border-gray-500 text-center font-bold
                `}
                >
                  震央地名
                </TableHead>
                <TableHead className={`
                  text-l border border-gray-500 text-center font-bold
                `}
                >
                  北緯
                </TableHead>
                <TableHead className={`
                  text-l border border-gray-500 text-center font-bold
                `}
                >
                  東經
                </TableHead>
                <TableHead className={`
                  text-l border border-gray-500 text-center font-bold
                `}
                >
                  深度
                </TableHead>
                <TableHead className={`
                  text-l border border-gray-500 text-center font-bold
                `}
                >
                  規模
                </TableHead>
                <TableHead className={`
                  text-l border border-gray-500 text-center font-bold
                `}
                >
                  實測最大震度
                </TableHead>
                <TableHead className={`
                  text-l border border-gray-500 text-center font-bold
                `}
                >
                  網站
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow key="cwa">
                <TableCell className="border border-gray-300 text-center">{formatTime(earthquakeReport.time)}</TableCell>
                <TableCell className="border border-gray-300 text-center">{getLocMatch(earthquakeReport.loc ?? '')}</TableCell>
                <TableCell className="border border-gray-300 text-center">{earthquakeReport.lat}</TableCell>
                <TableCell className="border border-gray-300 text-center">{earthquakeReport.lon}</TableCell>
                <TableCell className="border border-gray-300 text-center">{earthquakeReport.depth}</TableCell>
                <TableCell className="border border-gray-300 text-center">
                  M
                  {earthquakeReport.mag.toFixed(1)}
                </TableCell>
                <TableCell className={`
                  border border-gray-300 text-center
                  ${getIntensityClass(findMaxInt(earthquakeReport.list))}
                `}
                >
                  {intensity_list[findMaxInt(earthquakeReport.list)]}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">
                  <a
                    href={`https://www.cwa.gov.tw/V8/C/E/EQ/EQ${earthquakeInfo.Cwa_id.split('-')[0]}-${earthquakeInfo.Cwa_id.split('-')[2]}-${earthquakeInfo.Cwa_id.split('-')[3]}.html`}
                    className="text-primary underline"
                  >
                    Link
                  </a>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}

      {earthquakeInfo.Cwa_id && (
        <div className="mx-8 my-3">
          <Progress value={100} className="h-1" />
        </div>
      )}

      <div className={`
        text-l flex max-w-full justify-center divide-x divide-gray-400
        overflow-hidden p-4 py-6 text-center
      `}
      >
        <div className="px-6">
          <p className="font-bold">EventID</p>
          <p>{formatTime(Number(earthquakeInfo.ID)).replaceAll('/', '').replaceAll(':', '').replace(' ', '')}</p>
        </div>
        <div className="px-6">
          <p className="font-bold">發表單位</p>
          <p>{`TREM(${earthquakeInfo.Source})`}</p>
        </div>
        <div className="px-6">
          <p className="font-bold">檢知時刻</p>
          <p>{formatTime(Number(earthquakeInfo.ID))}</p>
        </div>
      </div>

      <div className="pb-4 pl-8 pr-8">
        <Table className="w-full border-collapse border border-gray-300">
          <TableHeader>
            <TableRow className={`
              bg-primary
              hover:bg-primary
            `}
            >
              <TableHead
                colSpan={17}
                className="text-l border border-gray-500 text-center font-bold"
              >
                TREM EEW
              </TableHead>
            </TableRow>
            <TableRow className={`
              bg-primary
              hover:bg-primary
            `}
            >
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
                發表時刻
              </TableHead>
              <TableHead
                rowSpan={2}
                className="text-l border border-gray-500 text-center font-bold"
              >
                檢知經過秒數
              </TableHead>
              <TableHead
                rowSpan={2}
                className="text-l border border-gray-500 text-center font-bold"
              >
                震後秒數
              </TableHead>
              <TableHead
                colSpan={13}
                className="text-l border border-gray-500 text-center font-bold"
              >
                震源・EEW 資訊
              </TableHead>
            </TableRow>

            <TableRow className={`
              bg-primary
              hover:bg-primary
            `}
            >
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                發生時刻
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                震央地名
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                北緯
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                東經
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                深度
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                規模
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                預估最大震度
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                RTS
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                方法
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                原因
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                觸發
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                誤差△(km)
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                警報狀態
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tremEew.map((data, index) => (
              <TableRow key={index}>
                <TableCell className="border border-gray-300 text-center">{index + 1}</TableCell>
                <TableCell className="border border-gray-300 text-center">{formatTime(data.time)}</TableCell>
                <TableCell className="border border-gray-300 text-center">
                  {Math.round((data.time - tremEew[0].time) / 1000)}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">
                  {earthquakeReport.time ? Math.round((data.time - earthquakeReport.time) / 1000) : ''}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">{formatTime(data.eq.time)}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.eq.loc}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.eq.lat.toFixed(2)}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.eq.lon.toFixed(2)}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.eq.depth}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.eq.mag.toFixed(1)}</TableCell>
                <TableCell className={`
                  border border-gray-300 text-center
                  ${getIntensityClass(data.eq.max)}
                `}
                >
                  {intensity_list[data.eq.max]}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">{data.rts ? 'TRUE' : ''}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.detail ? 'EEW' : 'NSSPE'}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.reason}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.trigger}</TableCell>
                <TableCell className="border border-gray-300 text-center">
                  {earthquakeReport.time ? distance(data.eq.lat, data.eq.lon)(earthquakeReport.lat, earthquakeReport.lon).toFixed(1) : ''}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">{data.status === 1 ? 'TRUE' : ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mx-8 my-5">
        <Progress value={100} className="h-1" />
      </div>

      <div className="pl-8 pr-8 pt-4">
        <Table className="w-full border-collapse border border-gray-300">
          <TableHeader>
            <TableRow className={`
              bg-primary
              hover:bg-primary
            `}
            >
              <TableHead
                colSpan={18}
                className="text-l border border-gray-500 text-center font-bold"
              >
                TREM 測站紀錄數據
              </TableHead>
            </TableRow>
            <TableRow className={`
              bg-primary
              hover:bg-primary
            `}
            >
              <TableHead
                rowSpan={3}
                className="text-l border border-gray-500 text-center font-bold"
              >
                ID
              </TableHead>
              <TableHead
                rowSpan={3}
                className="text-l border border-gray-500 text-center font-bold"
              >
                Net
              </TableHead>
              <TableHead
                rowSpan={3}
                className="text-l border border-gray-500 text-center font-bold"
              >
                地名
              </TableHead>
              <TableHead
                colSpan={17}
                className="text-l border border-gray-500 text-center font-bold"
              >
                紀錄數據
              </TableHead>
            </TableRow>

            <TableRow className={`
              bg-primary
              hover:bg-primary
            `}
            >
              <TableHead
                colSpan={3}
                className="text-l border border-gray-500 text-center font-bold"
              >
                加速度
              </TableHead>
              <TableHead
                colSpan={3}
                className="text-l border border-gray-500 text-center font-bold"
              >
                速度
              </TableHead>
              <TableHead
                colSpan={6}
                className="text-l border border-gray-500 text-center font-bold"
              >
                最大值
              </TableHead>
              <TableHead
                colSpan={2}
                className="text-l border border-gray-500 text-center font-bold"
              >
                時間
              </TableHead>
              <TableHead
                className="text-l border border-gray-500 text-center font-bold"
              >
                檔案
              </TableHead>
            </TableRow>

            <TableRow className={`
              bg-primary
              hover:bg-primary
            `}
            >
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                加速度EW
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                加速度NS
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                加速度UD
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                速度EW
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                速度NS
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                速度UD
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                PGA
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                PGV
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                最大計測震度
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                最大震度階
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                SVA
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                LPGM
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                開始時間
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                結束時間
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                Zip
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stationReport.map((data, index) => (
              <TableRow key={index}>
                <TableCell className="border border-gray-300 text-center">{data.id}</TableCell>
                <TableCell className="border border-gray-300 text-center">
                  {getStationInfoById(station, data.id.toString())?.net}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">
                  {findLocationByCode(region, getStationInfoById(station, data.id.toString())?.info.at(-1)?.code ?? 0)}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">{data.ax}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.ay}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.az}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.vx}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.vy}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.vz}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.pga}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.pgv}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.i}</TableCell>
                <TableCell className={`
                  border border-gray-300 text-center
                  ${getIntensityClass(intensity_float_to_int(data.i))}
                `}
                >
                  {intensity_list[intensity_float_to_int(data.i)]}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">{data.sva}</TableCell>
                <TableCell className={`
                  border border-gray-300 text-center
                  ${getLpgmClass(data.lpgm)}
                `}
                >
                  {data.lpgm}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">{data.start}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.end}</TableCell>
                <TableCell className="border border-gray-300 text-center">
                  <a
                    href={`https://api-1.exptech.dev/file/trem_report/${data.ID}.zip`}
                    className={`
                      text-primary
                      hover:underline
                    `}
                  >
                    zip
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>Taiwan Real-time Earthquake Monitoring｜2025｜ExpTech Studio</TableCaption>
        </Table>
      </div>
    </div>
  );
}
