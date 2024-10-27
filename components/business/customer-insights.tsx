"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, TrendingUp, CreditCard } from "lucide-react";

export function CustomerInsights() {
  const topCustomers = [
    {
      name: "Alice Johnson",
      email: "alice@example.com",
      spent: 1250,
      cards: 5,
      avatar: "AJ"
    },
    {
      name: "Bob Smith",
      email: "bob@example.com",
      spent: 980,
      cards: 3,
      avatar: "BS"
    },
    {
      name: "Carol White",
      email: "carol@example.com",
      spent: 750,
      cards: 2,
      avatar: "CW"
    }
  ];

  return (
    <Card className="neu-card p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Customer Insights</h3>
          <Users className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <TrendingUp className="h-5 w-5 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">85%</p>
            <p className="text-sm text-muted-foreground">Retention Rate</p>
          </div>
          <div className="text-center">
            <Users className="h-5 w-5 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">342</p>
            <p className="text-sm text-muted-foreground">New Customers</p>
          </div>
          <div className="text-center">
            <CreditCard className="h-5 w-5 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">$85</p>
            <p className="text-sm text-muted-foreground">Avg. Purchase</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-4">Top Customers</h4>
          <ScrollArea className="h-[200px] pr-4">
            <div className="space-y-4">
              {topCustomers.map((customer) => (
                <div
                  key={customer.email}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>{customer.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {customer.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${customer.spent}</p>
                    <p className="text-sm text-muted-foreground">
                      {customer.cards} cards
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </Card>
  );
}