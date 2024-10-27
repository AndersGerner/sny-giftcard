import { useState, useCallback } from 'react';
import { Store } from '@/lib/api/types';
import { mockStores } from '@/lib/mock-data';

interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: {
    latitude: number;
    longitude: number;
    radius: number;
  };
}

export function useSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});

  const searchStores = useCallback(async (
    query: string,
    filters: SearchFilters = {}
  ): Promise<Store[]> => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      let results = [...mockStores];

      // Apply text search
      if (query) {
        const searchTerm = query.toLowerCase();
        results = results.filter(store => 
          store.name.toLowerCase().includes(searchTerm) ||
          store.description.toLowerCase().includes(searchTerm) ||
          store.category.toLowerCase().includes(searchTerm)
        );
      }

      // Apply category filter
      if (filters.category) {
        results = results.filter(store => 
          store.category === filters.category
        );
      }

      // Apply location filter
      if (filters.location) {
        results = results.filter(store => {
          const distance = calculateDistance(
            filters.location!.latitude,
            filters.location!.longitude,
            store.location.latitude,
            store.location.longitude
          );
          return distance <= filters.location!.radius;
        });
      }

      return results;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    searchStores,
    filters,
    setFilters,
    isLoading
  };
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}