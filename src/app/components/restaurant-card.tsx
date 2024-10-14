import StatusChip from "./status-chip"
import Chip from "./chip";
import Image from "next/image";

type RestaurantCardProps = {
  name: string;
  open: boolean;
  deliveryTimeMinutes: number;
  imageUrl: string;
}

const openingTime = '12 pm';

export default function RestaurantCard({ name, open, deliveryTimeMinutes, imageUrl }: RestaurantCardProps) {
  return (
    <li
      className="relative flex flex-col justify-between bg-white p-4 rounded-lg border border-stroke overflow-hidden min-w-64 h-[202px]"
    >
      <div className="flex space-x-1">
        <StatusChip open={open} />
        {open && <Chip label={`${deliveryTimeMinutes} min`} />}
      </div>
      <Image
        src={imageUrl}
        alt="Food image"
        width={140}
        height={140}
        className={`absolute top-[-30px] right-[-30px] ${!open && 'opacity-20'}`}
      />
      {!open &&
        <div className="self-center py-2 px-3 leading-none bg-off-white rounded border border-stroke z-10">
          Opens tomorrow at {openingTime}
        </div>
      }
      <div className={`flex justify-between align-bottom ${!open && 'opacity-20'}`}>
        <p className="text-2xl">{name}</p>
        <div className="flex items-center justify-center size-8 rounded-full bg-green text-white text-xl">→</div>
      </div>
    </li>
  )
}
