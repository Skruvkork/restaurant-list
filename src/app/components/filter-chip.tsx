import Chip from './chip';
import { ToggleFilterFn } from './filters';

export type FilterChipProps = {
  label: string,
  id: string;
  value: string | number;
  groupId: string;
  checked: boolean;
  onToggle: ToggleFilterFn;
}

export default function FilterChip({
  label,
  id,
  value,
  groupId,
  checked,
  onToggle
}: FilterChipProps) {
  return (
    <Chip label={label} rounded={false}>
      <>
        <input
          id={id}
          type="checkbox"
          name={groupId}
          value={value}
          className="hidden"
          checked={checked}
          onChange={e => onToggle(groupId, id, e.target.checked)}
        />
        <label
          className={`${checked ? 'bg-green text-white hover:opacity-80' : ' hover:bg-off-white'} -my-2 -mx-3 py-2 px-3 cursor-pointer transition-colors text-nowrap`}
          htmlFor={id}
        >
          {label}
        </label>
      </>
    </Chip>
  );
}
