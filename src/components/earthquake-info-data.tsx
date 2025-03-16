'use client';
import { Undo2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Progress } from '@/components/ui/progress';

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

export default function EarthquakeInfoData() {
  const router = useRouter();

  const openNewWindow = () => {
    void router.push(`./`);
  };

  return (
    <div>
      <div className="flex items-center justify-start p-1" onClick={() => openNewWindow()}>
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
          <a className="text-base font-medium text-white">返回主頁</a>
        </div>
      </div>

      <div className="text-l flex justify-center divide-x-1 py-8 text-center">
        <div className="px-8">
          <p className="font-bold">EventID</p>
          <p>測試</p>
        </div>
        <div className="px-8">
          <p className="font-bold">發表單位</p>
          <p>測試</p>
        </div>
        <div className="px-8">
          <p className="font-bold">檢知時刻</p>
          <p>測試</p>
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
                rowSpan={3}
                className="text-l border border-gray-500 text-center font-bold"
              >
                震後秒數
              </TableHead>
              <TableHead
                colSpan={17}
                className="text-l border border-gray-500 text-center font-bold"
              >
                數據分析
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
          </TableBody>
          <TableCaption>Taiwan Real-time Earthquake Monitoring｜2025｜ExpTech Studio</TableCaption>
        </Table>
      </div>
    </div>
  );
}
