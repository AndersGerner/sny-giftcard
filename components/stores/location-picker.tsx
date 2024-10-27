"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "@/hooks/use-location";
import { MapPin, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationPickerProps {
  onLocationUpdate: (location: { latitude: number; longitude: number }) => void;
  className?: string;
}

export function LocationPicker({ onLocationUpdate, className }: LocationPickerProps) {
  const [zipCode, setZipCode] = useState("");
  const { location, isLoading, updateLocation, updateLocationByZip } = useLocation();

  const handleAutoLocate = async () => {
    await updateLocation();
    if (location) {
      onLocationUpdate({
        latitude: location.latitude,
        longitude: location.longitude
      });
    }
  };

  const handleZipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.length === 5) {
      await updateLocationByZip(zipCode);
      if (location) {
        onLocationUpdate({
          latitude: location.latitude,
          longitude: location.longitude
        });
      }
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={handleAutoLocate}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Locating...
            </>
          ) : (
            <>
              <MapPin className="mr-2 h-4 w-4" />
              Use My Location
            </>
          )}
        </Button>
        
        <div className="flex-1">
          <form onSubmit={handleZipSubmit} className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="zipCode" className="sr-only">
                Zip Code
              </Label>
              <Input
                id="zipCode"
                placeholder="Enter ZIP code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                pattern="[0-9]*"
                maxLength={5}
                className="neu-input"
              />
            </div>
            <Button type="submit" disabled={zipCode.length !== 5 || isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Set"
              )}
            </Button>
          </form>
        </div>
      </div>

      {location && (
        <div className="text-sm text-muted-foreground text-center">
          {location.city ? (
            <>Currently showing stores near {location.city}, {location.state}</>
          ) : (
            <>Location set to coordinates: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</>
          )}
        </div>
      )}
    </div>
  );
}