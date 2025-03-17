'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { EarthquakeInfo, EarthquakeReport } from '@/modal/earthquake';
import { findPageNumber, formatTime, getIntensityClass, getLpgmClass, intensity_list, mathPageDataLength, pagesEarthquakeQuantity } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { EnhancedPagination } from './enhanced-pagination';

interface MonthData {
  'year-month': string;
  'count': number;
}

interface EarthquakeInfoTableProps {
  initialData: {
    earthquakeInfo: EarthquakeInfo[];
    earthquakeReport: EarthquakeReport[];
  };
  page: number;
  dev: boolean;
  month?: string;
}

export default function EarthquakeInfoTable({ initialData, page, dev, month }: EarthquakeInfoTableProps) {
  const router = useRouter();
  const { earthquakeInfo, earthquakeReport } = initialData;
  const [monthList, setMonthList] = useState<MonthData[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(month || 'all');

  useEffect(() => {
    const fetchMonthData = async () => {
      try {
        const response = await fetch('https://api-1.exptech.dev/api/v1/trem/month?key=');
        const data = await response.json() as MonthData[];

        setMonthList(data);
      }
      catch (error) {
        console.error('Error fetching month data:', error);
      }
    };

    void fetchMonthData();
  }, []);

  const openNewWindow = (id: string) => {
    router.push(`/info?id=${id}${dev ? '&dev=1' : ''}${page != 1 ? `&page=${page}` : ''}${(selectedMonth && selectedMonth !== 'all') ? `&month=${selectedMonth}` : ''}`);
  };

  const devModButton = () => {
    const queryParams = new URLSearchParams();
    queryParams.set('page', page.toString());
    if (selectedMonth && selectedMonth !== 'all') queryParams.set('month', selectedMonth);
    if (!dev) queryParams.set('dev', '1');
    router.push(`?${queryParams.toString()}`);
  };

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
    const queryParams = new URLSearchParams();
    queryParams.set('page', '1');
    if (value && value !== 'all') queryParams.set('month', value);
    if (dev) queryParams.set('dev', '1');
    router.push(`?${queryParams.toString()}`);
  };

  const pageNumbers = findPageNumber(page, earthquakeInfo, dev);
  const pageMax = Math.ceil(mathPageDataLength(earthquakeInfo, dev) / 100);

  const findCwaEarthquake = (id: string) => {
    return earthquakeReport.find((data) => data.id === id);
  };

  return (
    <div>
      <div className="mb-4 mt-4 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <Checkbox id="devBotton" checked={dev} onClick={devModButton} />
          <label htmlFor="devBotton">Dev Mode</label>
        </div>

        <div className="w-64">
          <Select value={selectedMonth} onValueChange={handleMonthChange}>
            <SelectTrigger>
              <SelectValue placeholder="選擇月份" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>選擇月份</SelectLabel>
                <SelectItem value="all">近 100 次檢知</SelectItem>
                {monthList.map((month) => (
                  <SelectItem key={month['year-month']} value={month['year-month']}>
                    {month['year-month']}
                    {' '}
                    (
                    {month.count}
                    )
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="pl-8 pr-8">
        <Table className="w-full border-collapse border border-gray-500">
          <TableHeader>
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

            <TableRow className={`
              bg-primary
              hover:bg-primary
            `}
            >
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                報數
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                檢知時刻
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                發震時刻(CWA)
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
                實測最大震度(CWA)
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                實測最大長周期
                <br />
                地震動階級
              </TableHead>
              <TableHead className={`
                text-l border border-gray-500 text-center font-bold
              `}
              >
                RTS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagesEarthquakeQuantity(page, earthquakeInfo, dev).map((data, index) => (
              <TableRow key={data.ID}>
                <TableCell className="border border-gray-300 text-center">{index + 1}</TableCell>
                <TableCell
                  className={`
                    cursor-pointer border border-gray-300 text-center
                    text-primary underline
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
                <TableCell className="border border-gray-300 text-center">
                  {data.Cwa_id ? formatTime(findCwaEarthquake(data.Cwa_id)?.time ?? 0) : ''}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">{data.Loc}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.Lat.toFixed(2)}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.Lon.toFixed(2)}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.Depth}</TableCell>
                <TableCell className="border border-gray-300 text-center">{data.Mag.toFixed(1)}</TableCell>
                <TableCell className={`
                  border border-gray-300 text-center
                  ${getIntensityClass(data.Max)}
                `}
                >
                  {intensity_list[data.Max]}
                </TableCell>
                <TableCell
                  className={`
                    border border-gray-300 text-center
                    ${
              getIntensityClass(data.Cwa_id ? findCwaEarthquake(data.Cwa_id)?.int ?? 0 : 0)
              }
                  `}
                >
                  {data.Cwa_id ? intensity_list[findCwaEarthquake(data.Cwa_id)?.int ?? 0] : ''}
                </TableCell>
                <TableCell className={`
                  border border-gray-300 text-center
                  ${getLpgmClass(data.Lpgm)}
                `}
                >
                  {data.Lpgm > 0 ? data.Lpgm : ''}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">{data.Alarm ? 'TRUE' : ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption className="pb-4">Taiwan Real-time Earthquake Monitoring｜2025｜ExpTech Studio</TableCaption>
        </Table>

        <EnhancedPagination
          currentPage={page}
          pageMax={pageMax}
          pageNumbers={pageNumbers}
          onPageChange={(newPage) => {
            const queryParams = new URLSearchParams();
            queryParams.set('page', newPage.toString());
            if (selectedMonth && selectedMonth !== 'all') queryParams.set('month', selectedMonth);
            if (dev) queryParams.set('dev', '1');
            router.push(`?${queryParams.toString()}`);
          }}
        />
      </div>
    </div>
  );
}
