"use client";

import { Card } from "@/components/ui/card";
import { useBusiness } from "@/hooks/use-business";
import { 
  TrendingUp, 
  CreditCard, 
  Users,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Percent,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricsGridProps {
  dateRange: [Date, Date];
}

export function MetricsGrid({ dateRange }: MetricsGridProps) {
  const { getAnalytics, isLoading } = useBusiness();

  const metrics = [
    {
      title: "Total Revenue",
      value: "$24,780",
      change: "+15.3%",
      trend: "up",
      icon: DollarSign,
      description: "Total gift card sales revenue"
    },
    {
      title: "Active Cards",
      value: "1,245",
      change: "+5.2%",
      trend: "up",
      icon: CreditCard,
      description: "Currently active gift cards"
    },
    {
      title: "Redemption Rate",
      value: "75%",
      change: "-2.1%",
      trend: "down",
      icon: Percent,
      description: "Gift card usage rate"
    },
    {
      title: "Average Value",
      value: "$85",
      change: "+8.7%",
      trend: "up",
      icon: TrendingUp,
      description: "Average gift card value"
    },
    {
      title: "New Customers",
      value: "342",
      change: "+12.4%",
      trend: "up",
      icon: Users,
      description: "First-time gift card buyers"
    },
    {
      title: "Transaction Volume",
      value: "2,890",
      change: "+9.3%",
      trend: "up",
      icon: Activity,
      description: "Total number of transactions"
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.title} className="neu-card group hover:scale-[1.02] transition-transform">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                <metric.icon className="h-5 w-5 text-primary" />
              </div>
              <div className={cn(
                "flex items-center text-sm font-medium",
                metric.trend === "up" ? "text-green-600" : "text-red-600"
              )}>
                {metric.change}
                {metric.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 ml-1" />
                )}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </p>
              <p className="text-2xl font-bold mt-1">{metric.value}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {metric.description}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}