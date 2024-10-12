type ChipProps = {
  label: string;
  showIcon?: boolean;
  iconColor?: string;
  rounded?: boolean;
}

export default function Chip({ label, showIcon = false, iconColor = '', rounded = true }: ChipProps) {
  const classNames = `flex items-center leading-none py-2 px-3 border border-stroke ${rounded ? 'rounded-full' : 'rounded-2'}`
  const iconClassNames = `mr-1 size-2 rounded-full ${iconColor}`;

  return (
    <div className={classNames}>
      {showIcon && <span className={iconClassNames}></span>}
      <span>{label}</span>
    </div>
  )
}
