'use client';

import { Undo2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Progress } from '@/components/ui/progress';
import { EarthquakeInfo, EarthquakeReport } from '@/modal/earthquake';
import { Region } from '@/modal/region';
import { StationList, StationReport } from '@/modal/station';
import { TremEew } from '@/modal/trem';
import { distance, findLocationByCode, formatTime, getIntensityClass, getLpgmClass, intensity_float_to_int, intensity_list } from '@/lib/utils';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

export default function EarthquakeData() {
  const [earthquakeInfo, setEarthquakeInfo] = useState<EarthquakeInfo>();
  const [earthquakeReport, setEarthquakeReport] = useState<EarthquakeReport>();
  const [region, setRegion] = useState<Region>();
  const [station, setStation] = useState<StationList>();
  const [tremEew, setTremEew] = useState<Array<TremEew>>();
  const [stationReport, setStationReport] = useState<Array<StationReport>>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const toHomeWindow = () => {
    void router.push(`./${searchParams.get('dev') ? '?dev=1' : ''}`);
  };

  useEffect(() => {
    const id = searchParams.get('id');

    if (!id) return;

    const fetchEarthquakeData = async () => {
      const ans = await fetch(`https://api-1.exptech.dev/api/v1/trem/list/${id}?key=`);
      const res = await ans.json() as EarthquakeInfo;

      setEarthquakeInfo(res);
    };

    const fetchEarthquakeTremEew = async () => {
      const ans = await fetch(`https://api-1.exptech.dev/api/v1/trem/report/${id}`);
      const res = await ans.json() as Array<TremEew>;

      setTremEew(res);
    };

    const fetchRegion = async () => {
      const ans = await fetch(`https://raw.githack.com/ExpTechTW/API/master/resource/region.json`);
      const res = await ans.json() as Region;

      setRegion(res);
    };

    const fetchStation = async () => {
      const ans = await fetch(`https://api-1.exptech.dev/api/v1/trem/station`);
      const res = await ans.json() as StationList;

      setStation(res);
    };

    void fetchEarthquakeTremEew();
    void fetchEarthquakeData();
    void fetchRegion();
    void fetchStation();
  }, []);

  useEffect(() => {
    if (!earthquakeInfo) return;

    const fetchEarthquakeReport = async () => {
      const ans = await fetch(`https://api-1.exptech.dev/api/v2/eq/report/${earthquakeInfo.Cwa_id}?key=`);
      const res = await ans.json() as EarthquakeReport;

      setEarthquakeReport(res);
    };

    const fetchEarthquakeTremList = async () => {
      const ans = await fetch('https://api-1.exptech.dev/api/v1/trem/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ list: JSON.parse(earthquakeInfo.List) as object }),
      });
      const res = await ans.json() as Array<StationReport>;

      setStationReport(res);
    };

    void fetchEarthquakeTremList();
    void fetchEarthquakeReport();
  }, [earthquakeInfo]);

  const getStationInfoById = (id: string) => {
    if (!station) return null;
    for (const _id of Object.keys(station)) {
      if (_id == id) return station[id];
    }
    return null;
  };

  return (
    <div>
      <div className="flex cursor-pointer items-center justify-start pt-2 pl-2" onClick={() => toHomeWindow()}>
        <div className={`
          flex items-center space-x-2 rounded-md bg-sky-400 px-3 py-1.5
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
          <a className="text-base font-medium text-white">返回首頁</a>
        </div>
      </div>

      <div className="text-l flex justify-center divide-x-1 py-8 text-center">
        <div className="px-8">
          <p className="font-bold">EventID</p>
          <p>{earthquakeReport ? formatTime(Number(earthquakeInfo?.ID)).replaceAll('/', '').replaceAll(':', '').replace(' ', '') : '載入中'}</p>
        </div>
        <div className="px-8">
          <p className="font-bold">發表單位</p>
          <p>{earthquakeReport ? `TREM(${earthquakeInfo?.Source})` : '載入中'}</p>
        </div>
        <div className="px-8">
          <p className="font-bold">檢知時刻</p>
          <p>{earthquakeReport ? formatTime(Number(earthquakeInfo?.ID)) : '載入中'}</p>
        </div>
      </div>
      <div className="mx-8 my-3">
        <Progress value={100} className="h-1" />
      </div>
      <div className="p-4 text-center text-3xl font-bold">
        TREM EEW
      </div>
      <div className="pr-8 pb-8 pl-8">
        <Table className="w-full border-collapse border border-gray-300">
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
                震源・EEW資訊
              </TableHead>
            </TableRow>

            <TableRow className="bg-gray-300">
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
            {tremEew && earthquakeReport
              ? (
                  tremEew.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell className="border border-gray-300 text-center">
                        {index + 1}
                      </TableCell>
                      <TableCell className="border border-gray-300 text-center">
                        {formatTime(data.time)}
                      </TableCell>
                      <TableCell className="border border-gray-300 text-center">
                        {Math.round((data.time - tremEew[0].time) / 1000)}
                      </TableCell>
                      <TableCell className="border border-gray-300 text-center">
                        {earthquakeReport.time ? Math.round((data.time - earthquakeReport.time) / 1000) : ''}
                      </TableCell>
                      <TableCell className="border border-gray-300 text-center">
                        {formatTime(data.eq.time)}
                      </TableCell>
                      <TableCell className="border border-gray-300 text-center">
                        {data.eq.loc}
                      </TableCell>
                      <TableCell className="border border-gray-300 text-center">
                        {data.eq.lat}
                      </TableCell>
                      <TableCell className="border border-gray-300 text-center">
                        {data.eq.lon}
                      </TableCell>
                      <TableCell className="border border-gray-300 text-center">
                        {data.eq.depth}
                      </TableCell>
                      <TableCell className="border border-gray-300 text-center">
                        {data.eq.mag.toFixed(1)}
                      </TableCell>
                      <TableCell className={`
                        border border-gray-300 text-center
                        ${getIntensityClass(data.eq.max)}
                      `}
                      >
                        {intensity_list[data.eq.max]}
                      </TableCell>
                      <TableCell className="border border-gray-300 text-center">
                        {data.rts ? 'TRUE' : ''}
                      </TableCell>
                      <TableCell className="border border-gray-300 text-center">
                        {data.detail ? 'EEW' : 'NSSPE'}
                      </TableCell>
                      <TableCell className="border border-gray-300 text-center">
                        {data.reason}
                      </TableCell>
                      <TableCell className="border border-gray-300 text-center">
                        {data.trigger}
                      </TableCell>
                      <TableCell className="border border-gray-300 text-center">
                        {earthquakeReport.time ? distance(data.eq.lat, data.eq.lon)(earthquakeReport.lat, earthquakeReport.lon).toFixed(1) : ''}
                      </TableCell>
                      <TableCell className="border border-gray-300 text-center">
                        {data.status == 1 ? 'TRUE' : ''}
                      </TableCell>
                    </TableRow>
                  ))
                )
              : (
                  <TableRow>
                    <TableCell colSpan={17} className="text-center">無資料</TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>
      <div className="mx-8 my-5">
        <Progress value={100} className="h-1" />
      </div>
      <div className="p-4 text-center text-3xl font-bold">
        TREM 測站紀錄數據
      </div>
      <div className="pr-8 pb-8 pl-8">
        <Table className="w-full border-collapse border border-gray-300">
          <TableHeader>
            <TableRow className="bg-gray-300">
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

            <TableRow className="bg-gray-300">
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

            <TableRow className="bg-gray-300">
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
            {stationReport && station && region
              ? (
                  stationReport.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell className="border border-gray-300 text-center">{data.id}</TableCell>
                      <TableCell className="border border-gray-300 text-center">{getStationInfoById(data.id.toString())?.net}</TableCell>
                      <TableCell className="border border-gray-300 text-center">{findLocationByCode(region, getStationInfoById(data.id.toString())?.info.at(-1)?.code ?? 0)}</TableCell>
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
                            text-blue-500
                            hover:underline
                          `}
                        >
                          zip
                        </a>
                      </TableCell>
                    </TableRow>
                  ))
                )
              : (
                  <TableRow>
                    <TableCell colSpan={18} className="text-center">無資料</TableCell>
                  </TableRow>
                )}
          </TableBody>
          <TableCaption>Taiwan Real-time Earthquake Monitoring｜2025｜ExpTech Studio</TableCaption>
        </Table>
      </div>
    </div>
  );
}
