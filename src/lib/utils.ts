import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
