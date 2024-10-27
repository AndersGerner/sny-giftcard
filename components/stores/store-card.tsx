"use client";

import Image from "next/image";
import { Store } from "@/lib/api/types";
import { MapPin, Gift } from "lucide-react";

interface StoreCardProps {
  store: Store;
  onSelect: (store: Store) => void;
}

export function StoreCard({ store, onSelect }: StoreCardProps) {
  return (
    <div className="neu-card group">
      <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
        <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0 z-10" />
        <Image
          src={store.image}
          alt={store.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {store.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {store.description}
          </p>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
          <span className="truncate">{store.location.address}</span>
        </div>
        <button 
          onClick={() => onSelect(store)} 
          className="neu-button w-full group/btn"
        >
          <span className="flex items-center justify-center">
            <Gift className="w-4 h-4 mr-2 transition-transform group-hover/btn:scale-110" />
            View Gift Cards
          </span>
        </button>
      </div>
    </div>
  );
}