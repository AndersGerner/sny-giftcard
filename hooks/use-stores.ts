"use client";

import { useState } from "react";
import { Store } from "@/lib/api/types";
import { mockStores } from "@/lib/mock-data";

export function useStores() {
  const [isLoading, setIsLoading] = useState(false);

  const searchStores = async (query: string): Promise<Store[]> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockStores.filter(store => 
        store.name.toLowerCase().includes(query.toLowerCase()) ||
        store.description.toLowerCase().includes(query.toLowerCase())
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getNearbyStores = async (lat: number, lng: number): Promise<Store[]> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockStores;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchStores,
    getNearbyStores,
    isLoading
  };
}