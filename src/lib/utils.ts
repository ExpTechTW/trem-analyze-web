import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { EarthquakeReport } from '@/modal/earthquake-info';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function searchEq(id: string, eq_data: Array<EarthquakeReport>) {
  for (const eq of eq_data) {
    if (eq.id == id) return eq;
  }
  return null;
}
