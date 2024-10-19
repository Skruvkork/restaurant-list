import Image from 'next/image';
import { FilterGroupOption } from './filter-group';
import { ToggleFilterFn } from './filters';

export type CategoryCardProps = FilterGroupOption & {
  image_url: string;
  onToggle: ToggleFilterFn;
};

export default function CategoryCard({ label, id, value, groupId, checked, image_url, onToggle }: CategoryCardProps) {
  const classes = checked ? 'bg-green text-white hover:opacity-80' : 'bg-white hover:bg-off-white';
  return (
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
        className={`${classes} relative shrink-0 w-40 h-20 py-4 px-3 cursor-pointer transition-colors rounded-lg border border-stroke`}
        htmlFor={id}
      >
        <Image
          src={image_url}
          alt={label}
          width={80}
          height={80}
          className="absolute top-0 right-[-10px]"
        />
        <span className='text-lg text-nowrap select-none'>{label}</span>
      </label>
    </>
  )
}
