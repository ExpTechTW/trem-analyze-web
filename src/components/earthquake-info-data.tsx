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
  return (
    <div>
      <div className="text-l flex justify-around px-160 py-8 text-center">
        <div>
          <p className="font-bold">EventID</p>
          <p>測試</p>
        </div>
        <div>
          <p className="font-bold">發表單位</p>
          <p>測試</p>
        </div>
        <div>
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
            <TableRow>
              <TableHead
                rowSpan={2}
                className="border border-gray-300 text-center"
              >
                No.
              </TableHead>
              <TableHead
                rowSpan={2}
                className="border border-gray-300 text-center"
              >
                發表時刻
              </TableHead>
              <TableHead
                rowSpan={2}
                className="border border-gray-300 text-center"
              >
                檢知經過秒數
              </TableHead>
              <TableHead
                rowSpan={2}
                className="border border-gray-300 text-center"
              >
                震後秒數
              </TableHead>
              <TableHead
                colSpan={13}
                className="border border-gray-300 text-center"
              >
                震源・EEW資訊
              </TableHead>
            </TableRow>

            <TableRow>
              <TableHead className="border border-gray-300 text-center">發生時刻</TableHead>
              <TableHead className="border border-gray-300 text-center">震央地名</TableHead>
              <TableHead className="border border-gray-300 text-center">北緯</TableHead>
              <TableHead className="border border-gray-300 text-center">東經</TableHead>
              <TableHead className="border border-gray-300 text-center">深度</TableHead>
              <TableHead className="border border-gray-300 text-center">規模</TableHead>
              <TableHead className="border border-gray-300 text-center">預估最大震度</TableHead>
              <TableHead className="border border-gray-300 text-center">RTS</TableHead>
              <TableHead className="border border-gray-300 text-center">方法</TableHead>
              <TableHead className="border border-gray-300 text-center">原因</TableHead>
              <TableHead className="border border-gray-300 text-center">觸發</TableHead>
              <TableHead className="border border-gray-300 text-center">誤差△(km)</TableHead>
              <TableHead className="border border-gray-300 text-center">警報狀態</TableHead>
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
            <TableRow>
              <TableHead
                rowSpan={3}
                className="border border-gray-300 text-center"
              >
                ID
              </TableHead>
              <TableHead
                rowSpan={3}
                className="border border-gray-300 text-center"
              >
                Net
              </TableHead>
              <TableHead
                rowSpan={3}
                className="border border-gray-300 text-center"
              >
                地名
              </TableHead>
              <TableHead
                rowSpan={3}
                className="border border-gray-300 text-center"
              >
                震後秒數
              </TableHead>
              <TableHead
                colSpan={17}
                className="border border-gray-300 text-center"
              >
                數據分析
              </TableHead>
            </TableRow>

            <TableRow>
              <TableHead
                colSpan={3}
                className="border border-gray-300 text-center"
              >
                加速度
              </TableHead>
              <TableHead
                colSpan={3}
                className="border border-gray-300 text-center"
              >
                速度
              </TableHead>
              <TableHead
                colSpan={6}
                className="border border-gray-300 text-center"
              >
                最大值
              </TableHead>
              <TableHead
                colSpan={2}
                className="border border-gray-300 text-center"
              >
                時間
              </TableHead>
              <TableHead
                className="border border-gray-300 text-center"
              >
                檔案
              </TableHead>
            </TableRow>

            <TableRow>
              <TableHead className="border border-gray-300 text-center">加速度EW</TableHead>
              <TableHead className="border border-gray-300 text-center">加速度NS</TableHead>
              <TableHead className="border border-gray-300 text-center">加速度UD</TableHead>
              <TableHead className="border border-gray-300 text-center">速度EW</TableHead>
              <TableHead className="border border-gray-300 text-center">速度NS</TableHead>
              <TableHead className="border border-gray-300 text-center">速度UD</TableHead>
              <TableHead className="border border-gray-300 text-center">PGA</TableHead>
              <TableHead className="border border-gray-300 text-center">PGV</TableHead>
              <TableHead className="border border-gray-300 text-center">最大計測震度</TableHead>
              <TableHead className="border border-gray-300 text-center">最大震度階</TableHead>
              <TableHead className="border border-gray-300 text-center">SVA</TableHead>
              <TableHead className="border border-gray-300 text-center">LPGM</TableHead>
              <TableHead className="border border-gray-300 text-center">開始時間</TableHead>
              <TableHead className="border border-gray-300 text-center">結束時間</TableHead>
              <TableHead className="border border-gray-300 text-center">Zip</TableHead>
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
