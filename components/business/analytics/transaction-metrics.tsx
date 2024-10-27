"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useState } from "react";

const mockData = {
  daily: [
    { date: "Mon", sales: 2400, redemptions: 1800 },
    { date: "Tue", sales: 1398, redemptions: 1200 },
    { date: "Wed", sales: 9800, redemptions: 8000 },
    { date: "Thu", sales: 3908, redemptions: 3000 },
    { date: "Fri", sales: 4800, redemptions: 3800 },
    { date: "Sat", sales: 3800, redemptions: 2800 },
    { date: "Sun", sales: 4300, redemptions: 3300 }
  ],
  weekly: [
    { date: "Week 1", sales: 12400, redemptions: 10800 },
    { date: "Week 2", sales: 15398, redemptions: 12200 },
    { date: "Week 3", sales: 19800, redemptions: 16000 },
    { date: "Week 4", sales: 13908, redemptions: 11000 }
  ]
};

export function TransactionMetrics() {
  const [timeframe, setTimeframe] = useState<"daily" | "weekly">("daily");
  const [view, setView] = useState<"combined" | "sales" | "redemptions">("combined");

  return (
    <Card className="neu-card p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Transaction Analysis</h3>
          <div className="flex items-center gap-2">
            <Select value={timeframe} onValueChange={(value: "daily" | "weekly") => setTimeframe(value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={view} onValueChange={(value: "combined" | "sales" | "redemptions") => setView(value)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="combined">Combined</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="redemptions">Redemptions</TabsTrigger>
          </TabsList>

          <div className="h-[300px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData[timeframe]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border rounded-lg shadow-lg p-3">
                          <p className="text-sm font-medium">{payload[0].payload.date}</p>
                          {(view === "combined" || view === "sales") && (
                            <p className="text-sm text-primary">
                              Sales: ${payload[0].payload.sales}
                            </p>
                          )}
                          {(view === "combined" || view === "redemptions") && (
                            <p className="text-sm text-secondary">
                              Redemptions: ${payload[0].payload.redemptions}
                            </p>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                {(view === "combined" || view === "sales") && (
                  <Bar dataKey="sales" fill="hsl(var(--primary))" />
                )}
                {(view === "combined" || view === "redemptions") && (
                  <Bar dataKey="redemptions" fill="hsl(var(--secondary))" />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Tabs>
      </div>
    </Card>
  );
}