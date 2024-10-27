"use client";

import { Search } from "lucide-react";

interface StoreSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function StoreSearch({ value, onChange }: StoreSearchProps) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 transition-colors peer-focus:text-primary" />
      <input
        type="text"
        placeholder="Search stores..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="neu-input w-full pl-10 peer"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 via-secondary/20 to-primary/10 opacity-0 blur-xl transition-opacity peer-focus:opacity-100" />
    </div>
  );
}