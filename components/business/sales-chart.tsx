"use client";

import { useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SalesChartProps {
  dateRange: [Date, Date];
}

export function SalesChart({ dateRange }: SalesChartProps) {
  const [view, setView] = useState<"revenue" | "volume">("revenue");
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly">("daily");

  // Mock data - replace with actual API data
  const data = [
    { date: "Mar 1", revenue: 4000, volume: 120 },
    { date: "Mar 2", revenue: 3000, volume: 98 },
    { date: "Mar 3", revenue: 2000, volume: 75 },
    { date: "Mar 4", revenue: 2780, volume: 89 },
    { date: "Mar 5", revenue: 1890, volume: 65 },
    { date: "Mar 6", revenue: 2390, volume: 82 },
    { date: "Mar 7", revenue: 3490, volume: 110 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant={view === "revenue" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("revenue")}
          >
            Revenue
          </Button>
          <Button
            variant={view === "volume" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("volume")}
          >
            Volume
          </Button>
        </div>
        <Select value={timeframe} onValueChange={(value: "daily" | "weekly" | "monthly") => setTimeframe(value)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => view === "revenue" ? `$${value}` : value.toString()}
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background border rounded-lg shadow-lg p-3">
                      <p className="text-sm font-medium">{payload[0].payload.date}</p>
                      <p className="text-sm text-muted-foreground">
                        {view === "revenue" 
                          ? `$${payload[0].value}`
                          : `${payload[0].value} cards`}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey={view}
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}