"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PerformanceChartProps {
  data: {
    date: string;
    sales: number;
    redemptions: number;
  }[];
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  const [metric, setMetric] = useState<"sales" | "redemptions">("sales");

  return (
    <Card className="neu-card p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Performance Overview</h3>
          <div className="flex gap-2">
            <Button
              variant={metric === "sales" ? "default" : "outline"}
              size="sm"
              onClick={() => setMetric("sales")}
            >
              Sales
            </Button>
            <Button
              variant={metric === "redemptions" ? "default" : "outline"}
              size="sm"
              onClick={() => setMetric("redemptions")}
            >
              Redemptions
            </Button>
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border rounded-lg shadow-lg p-3">
                        <p className="text-sm font-medium">
                          {new Date(payload[0].payload.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {metric === "sales" ? "Sales" : "Redemptions"}: $
                          {payload[0].value}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey={metric}
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}