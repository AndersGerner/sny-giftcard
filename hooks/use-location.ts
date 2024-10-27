"use client";

import { useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";

export interface Location {
  latitude: number;
  longitude: number;
  zipCode?: string;
  city?: string;
  state?: string;
}

export function useLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getGeolocation = useCallback(async (): Promise<Location | null> => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      // Get address details from coordinates
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${coords.latitude}+${coords.longitude}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`
      );
      const data = await response.json();

      if (data.results?.[0]?.components) {
        const components = data.results[0].components;
        return {
          ...coords,
          zipCode: components.postcode,
          city: components.city,
          state: components.state
        };
      }

      return coords;
    } catch (error) {
      console.error('Geolocation error:', error);
      return null;
    }
  }, []);

  const updateLocation = async () => {
    setIsLoading(true);
    try {
      const newLocation = await getGeolocation();
      if (newLocation) {
        setLocation(newLocation);
        toast({
          title: "Location Updated",
          description: newLocation.city 
            ? `Located in ${newLocation.city}, ${newLocation.state}`
            : "Location successfully updated",
        });
      } else {
        toast({
          title: "Location Error",
          description: "Please enter your zip code manually",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateLocationByZip = async (zipCode: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${zipCode}&countrycode=us&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`
      );
      const data = await response.json();

      if (data.results?.[0]) {
        const { lat, lng } = data.results[0].geometry;
        const components = data.results[0].components;
        
        const newLocation = {
          latitude: lat,
          longitude: lng,
          zipCode,
          city: components.city,
          state: components.state
        };

        setLocation(newLocation);
        toast({
          title: "Location Updated",
          description: `Located in ${components.city}, ${components.state}`,
        });
      } else {
        toast({
          title: "Invalid Zip Code",
          description: "Please enter a valid US zip code",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update location",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    location,
    isLoading,
    updateLocation,
    updateLocationByZip
  };
}