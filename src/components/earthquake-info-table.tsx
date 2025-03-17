'use client';

import { useRouter } from 'next/navigation';

import { EarthquakeInfo, EarthquakeReport } from '@/modal/earthquake';
import { findPageNext, findPageNumber, findPagePrevious, formatTime, getIntensityClass, getLpgmClass, intensity_list, mathPageDataLength, pagesEarthquakeQuantity } from '@/lib/utils';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Checkbox } from './ui/checkbox';

interface EarthquakeInfoTableProps {
  initialData: {
    earthquakeInfo: Array<EarthquakeInfo>;
    earthquakeReport: Array<EarthquakeReport>;
  };
  page: number;
  dev: boolean;
}

export default function EarthquakeInfoTable({ initialData, page, dev }: EarthquakeInfoTableProps) {
  const router = useRouter();
  const { earthquakeInfo, earthquakeReport } = initialData;

  const openNewWindow = (id: string) => {
    router.push(`/info?id=${id}${dev ? '&dev=1' : ''}`);
  };

  const nextPage = () => {
    router.push(`?page=${findPageNext(page, earthquakeInfo, dev)}${dev ? '&dev=1' : ''}`);
  };

  const previousPage = () => {
    router.push(`?page=${findPagePrevious(page)}${dev ? '&dev=1' : ''}`);
  };

  const numberPage = (id: number) => {
    router.push(`?page=${id}${dev ? '&dev=1' : ''}`);
  };

  const devModButton = () => {
    router.push(`?page=${page}${!dev ? '&dev=1' : ''}`);
  };

  const pageNumbers = findPageNumber(page, earthquakeInfo, dev);
  const pageMax = Math.ceil(mathPageDataLength(earthquakeInfo, dev) / 10);

  const findCwaEarthquake = (id: string) => {
    return earthquakeReport.find((data) => data.id === id);
  };

  return (
    <div>
      <div className="p-4 text-center text-3xl font-bold">
        TREM EEW
      </div>
      <div className="py-2 text-center font-bold">
        <Checkbox id="devBotton" checked={dev} onClick={devModButton} />
        <label htmlFor="devBotton">Dev Mode</label>
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
                <TableCell className="border border-gray-300 text-center">
                  {data.Cwa_id ? formatTime(findCwaEarthquake(data.Cwa_id)?.time ?? 0) : ''}
                </TableCell>
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
                  {data.Lpgm}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">{data.Alarm ? 'TRUE' : ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption className="pb-4">Taiwan Real-time Earthquake Monitoring｜2025｜ExpTech Studio</TableCaption>
        </Table>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={previousPage}
                className={page === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            <PaginationItem>
              {pageNumbers[0] !== 1 && <PaginationEllipsis />}
            </PaginationItem>
            {pageNumbers.map((pageNumber: number) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  onClick={() => numberPage(pageNumber)}
                  isActive={pageNumber === page}
                  className={pageNumber === page
                    ? `
                      bg-sky-500 text-white
                      hover:bg-sky-600
                    `
                    : ''}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              {page <= pageNumbers[pageNumbers.length - 1] - 2 && pageNumbers[pageNumbers.length - 1] !== pageMax && (
                <PaginationEllipsis />
              )}
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={nextPage}
                className={page === pageMax ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
