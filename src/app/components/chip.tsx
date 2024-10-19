type ChipProps = {
  label: string;
  showIcon?: boolean;
  iconColor?: string;
  rounded?: boolean;
  children?: React.ReactNode;
}

export default function Chip({
  label,
  showIcon = false,
  iconColor = '',
  rounded = true,
  children,
}: ChipProps) {
  const classNames = `
    inline-flex items-center leading-none py-2 px-3 overflow-hidden bg-white border border-stroke ${rounded ? 'rounded-full' : 'rounded-md'}`
  const iconClassNames = `mr-1 size-2 rounded-full ${iconColor}`;

  return (
    <div className={classNames}>
      {showIcon && <span className={iconClassNames}></span>}
      {children ? children : <span>{label}</span>}
    </div>
  )
}
