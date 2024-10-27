"use client";

import { useState, useEffect } from "react";
import { Store } from "@/lib/api/types";
import { StoreCard } from "@/components/stores/store-card";
import { StoreSearch } from "@/components/stores/store-search";
import { LocationPicker } from "@/components/stores/location-picker";
import { useToast } from "@/components/ui/use-toast";
import { useStores } from "@/hooks/use-stores";
import { useLocation } from "@/hooks/use-location";

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stores, setStores] = useState<Store[]>([]);
  const { toast } = useToast();
  const { searchStores, getNearbyStores, isLoading } = useStores();
  const { location } = useLocation();

  useEffect(() => {
    const loadStores = async () => {
      try {
        if (searchQuery) {
          const results = await searchStores(searchQuery);
          setStores(results);
        } else if (location) {
          const nearbyStores = await getNearbyStores(
            location.latitude,
            location.longitude
          );
          setStores(nearbyStores);
        } else {
          const allStores = await searchStores("");
          setStores(allStores);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load stores. Please try again.",
          variant: "destructive",
        });
      }
    };

    loadStores();
  }, [searchQuery, location]);

  const handleLocationUpdate = async (coords: { latitude: number; longitude: number }) => {
    try {
      const nearbyStores = await getNearbyStores(coords.latitude, coords.longitude);
      setStores(nearbyStores);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to find stores in your area.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 text-center mb-12">
          <h1 className="text-4xl font-bold">Discover Stores</h1>
          <p className="text-muted-foreground text-lg">
            Find and purchase gift cards from your favorite stores
          </p>
        </div>
        
        <div className="space-y-8 mb-12">
          <LocationPicker onLocationUpdate={handleLocationUpdate} />
          <StoreSearch value={searchQuery} onChange={setSearchQuery} />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="neu-card animate-pulse">
                <div className="h-48 bg-muted rounded-t-xl" />
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                  </div>
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-10 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {stores.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stores.map((store) => (
                  <StoreCard
                    key={store.id}
                    store={store}
                    onSelect={() => {}}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  {searchQuery 
                    ? `No stores found matching "${searchQuery}". Try a different search term.`
                    : "No stores found in your area. Try a different location."}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}