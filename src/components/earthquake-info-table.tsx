import { useEffect, useState } from 'react';

import { EarthquakeInfo } from '@/modal/earthquake-info';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
];

export default function EarthquakeInfoTable() {
  const [earthquakeInfo, setEarthquakeInfo] = useState<Array<EarthquakeInfo>>([]);

  useEffect(() => {
    if (!earthquakeInfo.length) return;
    console.log(earthquakeInfo);
  }, [earthquakeInfo]);

  useEffect(() => {
    const fetchEarthquakeInfo = async () => {
      const res = await fetch(`https://api-1.exptech.dev/api/v2/eq/report?limit=50&key=`);
      const ans = await res.json() as Array<EarthquakeInfo>;
      setEarthquakeInfo(ans);
    };
    void fetchEarthquakeInfo();
  }, []);

  return (
    <div>
      <div className="p-4 text-center text-3xl font-bold">
        TREM EEW
      </div>
      <div className="pr-4 pl-4">
        <Table className="w-full border-collapse border border-gray-300">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No.</TableHead>
              <TableHead>EventID</TableHead>
              <TableHead>發表單位</TableHead>
              <TableHead className="text-center">報數</TableHead>
              <TableHead className="text-center">檢知時刻</TableHead>
              <TableHead className="text-center">發震時刻(CWA)</TableHead>
              <TableHead className="text-center">震央地名</TableHead>
              <TableHead className="text-center">北緯</TableHead>
              <TableHead className="text-center">東經</TableHead>
              <TableHead className="text-center">深度</TableHead>
              <TableHead className="text-center">規模</TableHead>
              <TableHead className="text-center">預估最大震度</TableHead>
              <TableHead className="text-center">實測最大震度(CWA)</TableHead>
              <TableHead className="text-center">
                實測最大長周期
                <br />
                地震動階級
              </TableHead>
              <TableHead className="text-center">RTS</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="border border-gray-300">{invoice.invoice}</TableCell>
                <TableCell className="border border-gray-300">{invoice.paymentStatus}</TableCell>
                <TableCell className="border border-gray-300">{invoice.paymentMethod}</TableCell>
                <TableCell className="border border-gray-300 text-right">{invoice.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
          <TableCaption>Taiwan Real-time Earthquake Monitoring｜2025｜ExpTech Studio</TableCaption>
        </Table>
      </div>
    </div>
  );
}
