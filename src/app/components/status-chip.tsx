import Chip from "./chip";

type StatusChipProps = {
  open: boolean;
}

export default function StatusChip({ open }: StatusChipProps) {
  const label = open ? 'Open' : 'Closed';
  const color = open ? 'bg-green' : 'bg-black';
  return <Chip label={label} showIcon iconColor={color} />
}
