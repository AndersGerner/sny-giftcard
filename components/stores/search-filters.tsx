"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const CATEGORIES = [
  "Retail",
  "Dining",
  "Entertainment",
  "Fashion",
  "Electronics",
  "Beauty",
  "Home & Garden",
  "Sports",
];

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [distance, setDistance] = useState(10);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => {
      const newCategories = prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category];
      
      onFilterChange({
        categories: newCategories,
        priceRange,
        distance
      });
      return newCategories;
    });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    onFilterChange({
      categories: selectedCategories,
      priceRange: value,
      distance
    });
  };

  const handleDistanceChange = (value: number[]) => {
    setDistance(value[0]);
    onFilterChange({
      categories: selectedCategories,
      priceRange,
      distance: value[0]
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 500]);
    setDistance(10);
    onFilterChange({
      categories: [],
      priceRange: [0, 500],
      distance: 10
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
          {(selectedCategories.length > 0 || distance !== 10 || priceRange[0] !== 0 || priceRange[1] !== 500) && (
            <Badge variant="secondary" className="ml-2">
              {selectedCategories.length + (distance !== 10 ? 1 : 0) + (priceRange[0] !== 0 || priceRange[1] !== 500 ? 1 : 0)}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Search Filters</SheetTitle>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(category => (
                <Badge
                  key={category}
                  variant={selectedCategories.includes(category) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleCategoryToggle(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Price Range</h3>
            <div className="space-y-2">
              <Slider
                min={0}
                max={500}
                step={10}
                value={priceRange}
                onValueChange={handlePriceChange}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Distance</h3>
            <div className="space-y-2">
              <Slider
                min={1}
                max={50}
                step={1}
                value={[distance]}
                onValueChange={handleDistanceChange}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{distance} miles</span>
                <span>50 miles</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}