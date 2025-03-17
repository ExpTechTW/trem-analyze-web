import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { EarthquakeInfo } from '@/modal/earthquake';
import { Region } from '@/modal/region';

export function mathPageDataLength(data: Array<EarthquakeInfo>, dev: boolean) {
  return dev ? data.length : data.reduce((count, item) => count + (item.Alarm ? 1 : 0), 0);
}

export function findDataAlarm(data: Array<EarthquakeInfo>, dev: boolean): Array<EarthquakeInfo> {
  if (dev) return data;
  return data.filter((item) => item.Alarm);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(timestamp: number) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

export const intensity_list = ['0', '1', '2', '3', '4', '5弱', '5強', '6弱', '6強', '7'];

export function findLocationByCode(region: Region, code: number): string {
  for (const cityName in region) {
    const city = region[cityName];
    for (const districtName in city) {
      const town = city[districtName];
      if (town.code == code) {
        return `${cityName} ${districtName}`;
      }
    }
  }
  return '未知區域';
}

export function intensity_float_to_int(i: number) {
  return i < 0 ? 0 : i < 4.5 ? Math.round(i) : i < 5 ? 5 : i < 5.5 ? 6 : i < 6 ? 7 : i < 6.5 ? 8 : 9;
}

export function getIntensityClass(intensity: number) {
  return `intensity-${intensity}`;
}

export function getLpgmClass(intensity: number) {
  return `lpgm-${intensity}`;
}

export function pagesEarthquakeQuantity(page: number | null, data: EarthquakeInfo[], dev: boolean) {
  if (data.length === 0) return [];

  const pageNumber = Math.max(page ?? 1, 1);
  const maxPage = Math.ceil(mathPageDataLength(data, dev) / 10);
  const currentPage = Math.min(pageNumber, maxPage);
  const startIndex = (currentPage - 1) * 10;

  const filteredData = dev ? data : findDataAlarm(data, dev);

  return filteredData.slice(startIndex, startIndex + 10);
}

export function findPageNumber(page: number | null, data: EarthquakeInfo[], dev: boolean): number[] {
  const currentPage = Math.max(page ?? 1, 1);

  const totalItems = dev ? data.length : data.filter((item) => item.Alarm).length;
  const maxPage = Math.max(Math.ceil(totalItems / 10), 1);

  const clampedPage = Math.min(currentPage, maxPage);

  if (maxPage <= 5) return Array.from({ length: maxPage }, (_, i) => i + 1);

  if (clampedPage <= 3) return [1, 2, 3, 4, 5];

  if (clampedPage >= maxPage - 2) return [maxPage - 4, maxPage - 3, maxPage - 2, maxPage - 1, maxPage];

  return [clampedPage - 2, clampedPage - 1, clampedPage, clampedPage + 1, clampedPage + 2];
}

export function findPagePrevious(page: number) {
  return page - 1 <= 0 ? 1 : page - 1;
}

export function findPageNext(page: number, data: Array<EarthquakeInfo>, dev: boolean) {
  // HACK: 10占用
  const maxPage = Math.ceil(mathPageDataLength(data, dev) / 10);
  return page + 1 > maxPage ? maxPage : page + 1;
}

export function distance(latA: number, lngA: number): (latB: number, lngB: number) => number {
  return function (latB: number, lngB: number): number {
    const R = 6371.008;
    const toRadians = (degree: number) => (degree * Math.PI) / 180;

    const dLat = toRadians(latB - latA);
    const dLng = toRadians(lngB - lngA);
    const latARad = toRadians(latA);
    const latBRad = toRadians(latB);

    const a
      = Math.sin(dLat / 2) * Math.sin(dLat / 2)
        + Math.cos(latARad) * Math.cos(latBRad)
        * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };
}
