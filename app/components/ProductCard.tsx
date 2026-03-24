import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard({ id, name, brand, price, imageUrl }: ProductCardProps) {
  return (
    <Link href={`/`} className="group block">
      <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{brand}</p>
        <h3 className="text-sm font-medium text-black line-clamp-2 mb-2">{name}</h3>
        <p className="text-sm font-bold text-black">₩{price.toLocaleString()}</p>
      </div>
    </Link>
  );
}
