"use client";

import { Card } from "@/components/ui/card";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  CreditCard,
  ArrowUpRight,
  ArrowDownRight 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalyticsCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: any;
  description: string;
}

function AnalyticsCard({ title, value, change, trend, icon: Icon, description }: AnalyticsCardProps) {
  return (
    <Card className="neu-card p-6 group hover:scale-[1.02] transition-transform">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className={cn(
            "flex items-center text-sm font-medium",
            trend === "up" ? "text-green-600" : "text-red-600"
          )}>
            {change}
            {trend === "up" ? (
              <ArrowUpRight className="h-4 w-4 ml-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 ml-1" />
            )}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </Card>
  );
}

export function AnalyticsGrid() {
  const analytics = [
    {
      title: "Total Revenue",
      value: "$24,780",
      change: "+15.3%",
      trend: "up" as const,
      icon: BarChart3,
      description: "Total gift card sales revenue"
    },
    {
      title: "Active Cards",
      value: "1,245",
      change: "+5.2%",
      trend: "up" as const,
      icon: CreditCard,
      description: "Currently active gift cards"
    },
    {
      title: "Customer Growth",
      value: "+342",
      change: "+12.4%",
      trend: "up" as const,
      icon: Users,
      description: "New customers this month"
    },
    {
      title: "Average Value",
      value: "$85",
      change: "+8.7%",
      trend: "up" as const,
      icon: TrendingUp,
      description: "Average gift card value"
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {analytics.map((item) => (
        <AnalyticsCard key={item.title} {...item} />
      ))}
    </div>
  );
}