'use client';

import { useState } from 'react';
import { stringify } from 'qs';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterGroup, { FilterGroupOption, FilterGroup as FilterGroupType } from './filter-group';
import { CategoryFilter, PriceRangeLevel } from '../types';
import { isFilterActive } from '../utils/query-params';

export type ToggleFilterFn = {
  (
    groupId: FilterGroupType['id'],
    optionId: FilterGroupOption['id'],
    checked: boolean
  ): void;
}

const filterGroups: FilterGroupType[] = [
  {
    id: 'delivery-time',
    name: 'Delivery time',
    options: [
      {
        label: '0-10 min',
        id: '0-10',
        groupId: 'delivery-time',
        value: '0-10',
        checked: false,
      },
      {
        label: '10-30 min',
        id: '10-30',
        groupId: 'delivery-time',
        value: '10-30',
        checked: false,
      },
      {
        label: '30-60 min',
        id: '30-60',
        groupId: 'delivery-time',
        value: '30-60',
        checked: false,
      },
      {
        label: '1 hour+',
        id: '60+',
        groupId: 'delivery-time',
        value: '60+',
        checked: false,
      }
    ]
  },
  {
    id: 'price-range',
    name: 'Price range',
    options: [
      {
        label: PriceRangeLevel[PriceRangeLevel.$],
        id: PriceRangeLevel[PriceRangeLevel.$],
        groupId: 'price-range',
        value: PriceRangeLevel.$,
        checked: false,
      },
      {
        label: PriceRangeLevel[PriceRangeLevel.$$],
        id: PriceRangeLevel[PriceRangeLevel.$$],
        groupId: 'price-range',
        value: PriceRangeLevel.$$,
        checked: false,
      },
      {
        label: PriceRangeLevel[PriceRangeLevel.$$$],
        id: PriceRangeLevel[PriceRangeLevel.$$$],
        groupId: 'price-range',
        value: PriceRangeLevel.$$$,
        checked: false,
      },
      {
        label: PriceRangeLevel[PriceRangeLevel.$$$$],
        id: PriceRangeLevel[PriceRangeLevel.$$$$],
        groupId: 'price-range',
        value: PriceRangeLevel.$$$$,
        checked: false,
      }
    ]
  }
];

type FiltersProps = {
  categories: CategoryFilter[];
}

export default function Filters({ categories }: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryGroup = {
    id: 'category',
    name: 'Food category',
    options: categories.map(({ id, name }) => (
      {
        id,
        label: name,
        groupId: 'category',
        value: id,
        checked: false,
      }
    ))
  };

  const filters = [categoryGroup, ...filterGroups].map((group) => ({
    ...group,
    options: group.options.map((option) => ({
      ...option,
      checked: isFilterActive(searchParams, group.id, option.value),
    })),
  }));

  const handleToggleFilters: ToggleFilterFn = (groupId, optionId, checked) => {
    const nextFilters = [...filters];
    const filter = nextFilters
      .find((group) => group.id === groupId)
      ?.options.find(option => option.id === optionId);

    if (filter) filter.checked = checked;

    updateSearchParams(nextFilters);
  }

  const updateSearchParams = (filterGroups: FilterGroupType[]) => {
    const groupValues = filterGroups.reduce(
      (groups, group) => {
        groups[group.id] = group.options
          .filter((option) => option.checked)
          .map((option) => option.value);
        return groups;
      },
      {} as { [key: string]: (string | number)[] },
    );

    const newSearchParams = new URLSearchParams(stringify(groupValues, { indices: false }));
    router.replace(`?${newSearchParams.toString()}`);
  }

  return (
    <aside className="px-6 shrink-0 sm:p-6 space-y-8 sm:bg-white sm:w-60 sm:rounded-lg sm:border sm:border-stroke">
      <h2 className="text-2xl hidden sm:block">Filter</h2>
      {
        filters.map(
          group => (
            <FilterGroup
              key={group.id}
              className={group.id !== 'delivery-time' ? 'hidden sm:block' : '' }
              {...group}
              onToggle={handleToggleFilters}
            />
          )
        )
      }
    </aside>
  )
}
