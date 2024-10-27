"use client";

import { Store } from './types';
import { mockStores } from './mock-data';

// Helper function to calculate distance between coordinates
function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
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

export async function searchStores(query: string): Promise<Store[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!query) return mockStores;
  
  return mockStores.filter(store => 
    store.name.toLowerCase().includes(query.toLowerCase()) ||
    store.description.toLowerCase().includes(query.toLowerCase()) ||
    store.category.toLowerCase().includes(query.toLowerCase())
  );
}

export async function getNearbyStores(
  latitude: number,
  longitude: number,
  radius: number = 10 // radius in kilometers
): Promise<Store[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockStores
    .map(store => ({
      ...store,
      distance: getDistance(
        latitude,
        longitude,
        store.location.latitude,
        store.location.longitude
      )
    }))
    .filter(store => store.distance <= radius)
    .sort((a, b) => (a.distance || 0) - (b.distance || 0));
}