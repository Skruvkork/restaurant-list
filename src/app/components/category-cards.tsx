'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { stringify } from 'qs';
import { CategoryFilter } from '../types';
import CategoryCard from './category-card';
import type { FilterGroupOption } from './filter-group';
import { ToggleFilterFn } from './filters';
import { isFilterActive } from '../utils/query-params';

type CategoryCardsProps = {
  categories: CategoryFilter[];
}

export default function CategoryCards({ categories }: CategoryCardsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const options: FilterGroupOption[] = categories.map(({ id, name, image_url }) => ({
    id: `top-bar-${id}`,
    image_url,
    groupId: 'top-bar-category',
    label: name,
    checked: isFilterActive(searchParams, 'category', id),
    value: id,
  }));

  const handleToggleFilters: ToggleFilterFn = (_groupId, optionId, checked) => {
    const nextOptions = [...options];
    const option = options.find(option => option.id === optionId);
    if (option) option.checked = checked;

    updateSearchParams(nextOptions);
  }

  const updateSearchParams = (filters: FilterGroupOption[]) => {
    const filterValues =  filters
      .filter((option) => option.checked)
      .map((option) => option.value);

    const newSearchParams = new URLSearchParams(
      stringify(
        { 'category': filterValues },
        { indices: false }
      )
    );
    router.replace(`?${newSearchParams.toString()}`);

  }

  return (
    <div className="flex gap-2.5 overflow-x-auto px-6 -mr-6 sm:-ml-0">
      {
        options.map(filter =>
          <CategoryCard
            key={filter.id}
            {...filter}
            image_url={filter.image_url || ''}
            onToggle={handleToggleFilters}
          />
        )
      }
    </div>
  )
}
