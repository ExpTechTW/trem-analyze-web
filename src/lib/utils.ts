import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { EarthquakeInfo } from '@/modal/earthquake';
import { Region } from '@/modal/region';

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

export function pagesEarthquakeQuantity(page: number | null, data: EarthquakeInfo[]) {
  const arrayData: EarthquakeInfo[] = [];

  if (data.length === 0) return [];

  page = page ?? 1;

  const maxPage = Math.ceil(data.length / 10);

  page = Math.min(page, maxPage);

  const startIndex = (page - 1) * 10;
  const endIndex = startIndex + 10;
  arrayData.push(...data.slice(startIndex, endIndex));
  return arrayData;
};

export function findPageNumber(page: number | null, data: Array<EarthquakeInfo>): number[] {
  page = page ?? 1;

  const maxPage = Math.ceil(data.length / 10);
  page = Math.min(page, maxPage);

  if (maxPage <= 5) {
    return Array.from({ length: maxPage }, (_, i) => i + 1);
  }

  if (page <= 3) {
    return Array.from({ length: Math.min(5, maxPage) }, (_, i) => i + 1);
  }

  const start = Math.max(1, page - 2);
  const end = Math.min(maxPage, page + 2);

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export function findPagePrevious(page: number) {
  // const maxPage = Math.ceil(data.length / 10);
  return page - 1 > 0 ? 1 : page - 1;
}

export function findPageNext(page: number, data: Array<EarthquakeInfo>) {
  const maxPage = Math.ceil(data.length / 10);
  return page + 1 > maxPage ? maxPage : page + 1;
}
