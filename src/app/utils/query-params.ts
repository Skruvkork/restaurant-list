import qs from "qs";
import { ReadonlyURLSearchParams } from "next/navigation";

export type ActiveFilters = {
  ['category']?: string | string[];
  ['delivery-time']?: string | string[];
  ['price-range']?: string | string[];
}

export function isFilterActive(searchParams: ReadonlyURLSearchParams, groupId: string, filterValue: string | number) {
  const activeFilters: ActiveFilters = qs.parse(searchParams.toString());
  const value = typeof filterValue === 'number' ? filterValue.toString() : filterValue;

  const filter = activeFilters[groupId as keyof ActiveFilters];
  if (!filter) return false;

  if (Array.isArray(filter))
    return filter.includes(value);

  return filter === value;
}
