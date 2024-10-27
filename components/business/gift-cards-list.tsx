"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export function GiftCardsList() {
  // Mock data - replace with actual API data
  const giftCards = [
    {
      id: "1",
      code: "GIFT-1234",
      balance: 50.00,
      status: "active",
      purchaseDate: "2024-03-20",
    },
    // Add more mock gift cards
  ];

  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-4">
        {giftCards.map((card) => (
          <Card key={card.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">#{card.code}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(card.purchaseDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">${card.balance.toFixed(2)}</p>
                <Badge variant="outline" className="mt-1">
                  {card.status}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}