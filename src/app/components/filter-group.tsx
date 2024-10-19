import { Filter } from '../types';
import FilterChip, { FilterChipProps } from './filter-chip';
import { ToggleFilterFn } from './filters';

export type FilterGroup = Pick<Filter, 'id' | 'name'> & {
  options: FilterGroupOption[];
}

export type FilterGroupOption = Pick<
  FilterChipProps,
  'id' | 'label' | 'value' | 'groupId' | 'checked'
> & {
  image_url?: string;
};

type FilterGroupProps = FilterGroup & {
  className: string;
  onToggle: ToggleFilterFn;
};

export default function FilterGroup({ id, name, options, className, onToggle }: FilterGroupProps) {
  return (
    <fieldset className={className}>
      <legend className="uppercase font-semibold leading-none opacity-40 mb-2 sm:mb-4">{name}</legend>
      <div className="flex gap-2 flex-wrap">
        {
          options.map(
            filter => <FilterChip key={filter.id} {...filter} groupId={id} onToggle={onToggle} />
          )
        }
      </div>

    </fieldset>
  )
}
